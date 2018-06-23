public class GameSetupController {

    @AuraEnabled
    public static Map<String, String> createGame(String name, Integer round, Decimal bet){
        
        Map<String, String> result = new Map<String, String>();

        cozycub__Game__c game = new cozycub__Game__c();
        game.Name = name;
        game.cozycub__Round__c = round;
        game.cozycub__Bet__c = bet;
        game.cozycub__Finished__c = false;

        try{
            insert game;
        }catch(Exception ex){
            System.debug('***exception while creating game');
            System.debug('***error: '+ex.getMessage());

            result.put('status','error');
            result.put('errorMessage',ex.getMessage());

            return result;
        }

        result.put('status','success');
        result.put('id', game.Id);
        result.put('errorMessage','');

        return result;
    }

    @AuraEnabled
    public static Map<String, String> initializeGame(Integer round){

        System.debug('***initializeGame');

        round = Integer.valueOf(round);

        Map<String, String> result = new Map<String, String>();

        List<cozycub__Player__c> playerObjectList = [SELECT Id, Name, cozycub__Money__c FROM cozycub__Player__c];

        List<Player> playerList = new List<Player>();

        for(cozycub__Player__c player : playerObjectList){
            Player p = new Player();
            p.playerId = player.Id;
            p.name = player.Name;
            p.money = player.cozycub__Money__c;
            p.emotion = 'calm';
            p.dice = new List<Integer>{1,1,1};
            p.rounds = new List<Integer>();
            for(Integer i = 0; i < round; i++){
                p.rounds.add(-1);
            }
            playerList.add(p);
        }

        String players_string = JSON.serialize(playerList);
        System.debug('***players_string '+players_string);

        result.put('status','success');
        result.put('players_string', players_string);
        result.put('errorMessage','');

        return result;

    }

    // @AuraEnabled
    // public static String endGame(String gameId, String name, Integer round, Integer currentRound, Decimal bet, String players_string){
        
    // }

    @AuraEnabled
    public static String playGame(String gameId, String name, Integer round, Integer currentRound, Decimal bet, String players_string){

        System.debug('***playGame');

        /* 
        somehow, the component passed in Integer parameters are not exactly the same type
        when use "currentRound != round" or "player.rounds[currentRound]" would cause "Internal Salesforce.com Error" or "java.math.BigDecimal cannot be cast to java.lang.Integer" error 
        so need to convert it to its type explicitly...
        wierdly is, decimal seemed working fine
        debugged this the whole night...
       */
        round = Integer.valueOf(round);
        currentRound = Integer.valueOf(currentRound);

        Map<String, Object> result;
        String new_players_strings;

        if(players_string == null){

            System.debug('***initialize players');

            result = initializePlayers(round);
            new_players_strings = (String)result.get('players_string');

        }else{

            if(currentRound != round){

                System.debug('***playing round');

                List<Player> playerList = (List<Player>)JSON.deserialize(players_string, List<Player>.class);
                result = updatePlayers(gameId, name, round, currentRound, bet, playerList);
                new_players_strings = (String)result.get('players_string');

                System.debug('***new_players_strings '+new_players_strings);

                // game going on, insert round
                List<cozycub__Round_Dashboard__c> roundList = (List<cozycub__Round_Dashboard__c>)result.get('roundList');

                System.debug('***roundList '+roundList);

                try{
                    insert roundList;
                }catch(Exception ex){
                    System.debug('***roundList insert failure');
                    System.debug('***error: '+ex.getMessage());
                }

            }else{

                System.debug('***ending game');

                List<Player> playerList = (List<Player>)JSON.deserialize(players_string, List<Player>.class);
                for(Player p : playerList){
                    p.emotion = 'calm';
                    p.rounds = new List<Integer>();
                }

                new_players_strings = JSON.serialize(playerList);

                // game over, update game & players sObjects
                cozycub__Game__c game = [SELECT Id, cozycub__Finished__c FROM cozycub__Game__c WHERE Id =: gameId];
                game.cozycub__Finished__c = true;
           
                Map<Id, Decimal> playerIdMoneyMap = new Map<Id,Decimal>();
                for(Player p : playerList){
                    playerIdMoneyMap.put(Id.valueOf(p.playerId), p.money);
                }

                List<cozycub__Player__c> playerObjectList = [SELECT Id, cozycub__Money__c FROM cozycub__Player__c WHERE Id IN : playerIdMoneyMap.keySet()];
                for(cozycub__Player__c player : playerObjectList){
                    player.cozycub__Money__c = playerIdMoneyMap.get(player.Id);
                }

                try{
                    update game;
                    update playerObjectList;
                }catch(Exception ex){
                    System.debug('***game or playerList update failure');
                    System.debug('***error: '+ex.getMessage());
                }
                
            }
            
        }

        return new_players_strings;
    }

    @TestVisible private static Map<String, Object> initializePlayers(Integer round){

        System.debug('***initializePlayers');

        Map<String, Object> result = new Map<String, Object>();

        List<cozycub__Player__c> playerObjectList = [SELECT Id, Name, cozycub__Money__c FROM cozycub__Player__c];

        List<Player> playerList = new List<Player>();

        for(cozycub__Player__c player : playerObjectList){
            Player p = new Player();
            p.playerId = player.Id;
            p.name = player.Name;
            p.money = player.cozycub__Money__c;
            p.emotion = 'calm';
            p.dice = new List<Integer>{1,1,1};
            p.rounds = new List<Integer>();
            for(Integer i = 0; i < round; i++){
                p.rounds.add(-1);
            }
            playerList.add(p);
        }

        String players_string = JSON.serialize(playerList);
        System.debug('***players_string '+players_string);

        result.put('players_string', players_string);

        return result;
    }

    @TestVisible private static Map<String, Object> updatePlayers(String gameId, String name, Integer round, Integer currentRound, Decimal bet, List<Player> playerList){
        
        System.debug('***updatePlayers');

        Map<String, Object> result = new Map<String, Object>();

        List<cozycub__Round_Dashboard__c> roundList = new List<cozycub__Round_Dashboard__c>();

       // each player cast dice for current round (if rounds is null, then initialize it)
       for(Player player : playerList){
           player.dice = castDice();
       }

       Set<String> winnerSet = new Set<String>();
       Integer largestDiceSum = 0;

       for(Player player : playerList){

            Integer diceSum = 0;

            for(Integer die : player.dice){
                diceSum += die;
            }

            if(diceSum > largestDiceSum){
                largestDiceSum = diceSum;
                winnerSet.clear();
                winnerSet.add(player.name);
            }else if(diceSum == largestDiceSum){
                winnerSet.add(player.name);
            }

       }

       Decimal winnerPrize = ((bet * playerList.size() - bet * winnerSet.size())/winnerSet.size()).setScale(2);
       System.debug('***winnerPrize '+winnerPrize);

        for(Player player : playerList){

            if(winnerSet.contains(player.name)){
                player.emotion = 'happy';
                player.money += winnerPrize;
                player.rounds[currentRound] = 1;
            }else{
                player.emotion = 'sad';
                player.money -= bet;
                player.rounds[currentRound] = 0;
            }

            // add round info for each player into round list
            cozycub__Round_Dashboard__c roundInfo = new cozycub__Round_Dashboard__c();
            roundInfo.cozycub__Game_Id__c = gameId;
            roundInfo.cozycub__Game_Name__c = name;
            roundInfo.cozycub__Player_Id__c = player.playerId;
            roundInfo.cozycub__Player_Name__c = player.name;
            roundInfo.cozycub__Round__c = currentRound + 1;
            roundInfo.cozycub__Money__c = player.emotion == 'happy' ? winnerPrize : 0 - bet;
            roundInfo.cozycub__Dice__c = String.join(player.dice, '|');
            roundList.add(roundInfo);

        }

        String players_string = JSON.serialize(playerList);
        System.debug('***players_string '+players_string);

        result.put('players_string', players_string);
        result.put('roundList', roundList);

        return result;
    }

    @TestVisible private static List<Integer> castDice(){
        List<Integer> dice = new List<Integer>();
        for(Integer i = 0; i < 3; i++){
            // produce a random number bewteen 1 - 6 
            Integer rand = Math.mod(Math.round(Math.random() * 100), 6) + 1;
            dice.add(rand);
        }
        return dice;
    }


    /*
        Player classes was used to serialize/deserialize data and passed bewteen lightning component and apex classes
    */

    public class Player{
        public String playerId;
        public String name;
        public Decimal money;
        public String emotion;
        public List<Integer> dice;
        public List<Integer> rounds;
    }

}
