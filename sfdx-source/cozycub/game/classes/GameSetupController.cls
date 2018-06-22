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
    public static String playGame(String gameId, String name, Integer round, Integer currentRound, Decimal bet, String players_string){

        Map<String, Object> result;
        String new_players_strings;

        if(players_string == null){

            result = initializePlayers(round);
            new_players_strings = (String)result.get('players_string');

        }else{

            Players players = (Players)JSON.deserialize(players_string, Players.class);
            result = updatePlayers(gameId, name, round, currentRound, bet, players);
            new_players_strings = (String)result.get('players_string');
        }

        return new_players_strings;
    }

    @TestVisible private static Map<String, Object> initializePlayers(Integer round){

        System.debug('***initializePlayers');

        Map<String, Object> result = new Map<String, Object>();

        List<cozycub__Player__c> playerList = [SELECT Id, Name, cozycub__Money__c FROM cozycub__Player__c];

        Players players = new Players();
        List<Player> pList = new List<Player>();

        for(cozycub__Player__c player : playerList){
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
            pList.add(p);
        }

        players.pList = pList;

        String players_string = JSON.serialize(players);
        System.debug('***players_string '+players_string);

        result.put('players_string', players_string);

        return result;
    }

    @TestVisible private static Map<String, Object> updatePlayers(String gameId, String name, Integer round, Integer currentRound, Decimal bet, Players players){
        
        System.debug('***updatePlayers');

        Map<String, Object> result = new Map<String, Object>();

       /* 
        somehow, the component passed in non-string parameters are not exactly the same type
        when use player.rounds[currentRound] would cause "java.math.BigDecimal cannot be cast to java.lang.Integer" error 
        so need to convert it to its type explicitly...debugged this the whole night...
       */
       currentRound = Integer.valueOf(currentRound);

       // each player cast dice for current round (if rounds is null, then initialize it)
       for(Player player : players.pList){
           player.dice = castDice();
       }

       Set<String> winnerSet = new Set<String>();
       Integer largestDiceSum = 0;

       for(Player player : players.pList){

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

       Decimal winnerPrize = ((bet * players.pList.size() - bet * winnerSet.size())/winnerSet.size()).setScale(2, RoundingMode.HALF_UP);

        for(Player player : players.pList){

            if(winnerSet.contains(player.name)){
                player.emotion = 'happy';
                player.money += winnerPrize;
                player.rounds[currentRound] = 1;
            }else{
                player.emotion = 'sad';
                player.money -= bet;
                player.rounds[currentRound] = 0;
            }

        }

        String players_string = JSON.serialize(players);
        System.debug('***players_string '+players_string);

        result.put('players_string', players_string);

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
        Players & Player classes were used to serialize/deserialize data and passed bewteen lightning component and apex classes
    */
    public class Players{
        public List<Player> pList;
    }

    public class Player{
        public String playerId;
        public String name;
        public Decimal money;
        public String emotion;
        public List<Integer> dice;
        public List<Integer> rounds;
    }

}
