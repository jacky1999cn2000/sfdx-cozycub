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

        Map<String, String> result = new Map<String, String>();

        round = Integer.valueOf(round);

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
        result.put('players', players_string);
        result.put('errorMessage','');

        return result;

    }

    @AuraEnabled
    public static Map<String, String> endGame(String gameId, String old_players_string){
        
        System.debug('***endGame');
        
        Map<String, String> result = new Map<String, String>();

        List<Player> playerList = (List<Player>)JSON.deserialize(old_players_string, List<Player>.class);
        for(Player p : playerList){
            p.emotion = 'calm';
            p.rounds = new List<Integer>();
        }

        String players_string = JSON.serialize(playerList);
        System.debug('***players_string '+players_string);

        // update game sObject to mark it finished
        cozycub__Game__c game = [SELECT Id, cozycub__Finished__c FROM cozycub__Game__c WHERE Id =: gameId];
        game.cozycub__Finished__c = true;

        // update players sObjects to reflect each player's new money status
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
            System.debug('***game or playerObjectList update failure');
            System.debug('***error: '+ex.getMessage());

            result.put('status','error');
            result.put('errorMessage',ex.getMessage());

            return result;
        }

        result.put('status','success');
        result.put('players', players_string);
        result.put('errorMessage','');

        return result;

    }

    @AuraEnabled
    public static Map<String, String> playGame(String gameId, String name, Integer currentRound, Decimal bet, String old_players_string){

        System.debug('***playGame');

        Map<String, String> result = new Map<String, String>();

        currentRound = Integer.valueOf(currentRound);

        List<Player> playerList = (List<Player>)JSON.deserialize(old_players_string, List<Player>.class);
   
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

        List<cozycub__Round_Dashboard__c> roundList = new List<cozycub__Round_Dashboard__c>();

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

        // insert round
        try{
            insert roundList;
        }catch(Exception ex){
            System.debug('***roundList insert failure');
            System.debug('***error: '+ex.getMessage());

            result.put('status','error');
            result.put('errorMessage',ex.getMessage());

            return result;
        }

        result.put('status','success');
        result.put('players', players_string);
        result.put('errorMessage','');

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
