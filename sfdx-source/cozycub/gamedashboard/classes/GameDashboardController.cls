public class GameDashboardController {
    
    @AuraEnabled
    public static Map<String, Object> getGames(Integer limitValue, Integer offsetValue){

        System.debug('***getGames');

        limitValue = Integer.valueOf(limitValue);
        offsetValue = Integer.valueOf(offsetValue);

        Map<String, Object> result = new Map<String, Object>();

        List<cozycub__Game__c> gameObjectList = [SELECT Id, Name, cozycub__Bet__c, cozycub__Round__c FROM cozycub__Game__c LIMIT : limitValue OFFSET : offsetValue];

        System.debug('***gameObjectList '+gameObjectList.size());

        List<Game> gameList = new List<Game>();

        for(cozycub__Game__c game : gameObjectList){
            Game g = new Game();
            g.gameId = game.Id;
            g.name = game.Name;
            g.bet = game.cozycub__Bet__c;
            g.round = game.cozycub__Round__c;
            gameList.add(g);
        }

        String games_string = JSON.serialize(gameList);
        System.debug('***games_string '+games_string);

        result.put('status','success');
        result.put('games', games_string);
        result.put('hasMore', gameList.size() == limitValue);
        result.put('offset', offsetValue + limitValue);
        result.put('errorMessage','');

        return result;
    }

    /*
        Game classes was used to serialize/deserialize data and passed bewteen lightning component and apex classes
    */

    public class Game {
        public String gameId;
        public String name;
        public Decimal bet;
        public Decimal round;
    }

    /*
        Round classes was used to serialize/deserialize data and passed bewteen lightning component and apex classes
    */

    @AuraEnabled
    public static Map<String, Object> getRounds(String gameId){

        System.debug('***getRounds');

        Map<String, Object> result = new Map<String, Object>();

        List<cozycub__Round_Dashboard__c> roundObjectList = [SELECT cozycub__Dice__c,cozycub__Game_Name__c,cozycub__Player_Name__c, cozycub__Money__c,cozycub__Round__c FROM cozycub__Round_Dashboard__c WHERE cozycub__Game_Id__c =: gameId];

        System.debug('***roundObjectList '+roundObjectList.size());

        List<Round> roundList = new List<Round>();

        Map<String, Decimal> totalMoneyByPlayer = new Map<String, Decimal>();

        for(cozycub__Round_Dashboard__c round : roundObjectList){
            Round r = new Round();
            r.dice = round.cozycub__Dice__c;
            r.playerName = round.cozycub__Player_Name__c;
            r.money = round.cozycub__Money__c;
            r.round = (Integer)round.cozycub__Round__c;
            roundList.add(r);

            if(totalMoneyByPlayer.get(round.cozycub__Player_Name__c) == null){
                totalMoneyByPlayer.put(round.cozycub__Player_Name__c, round.cozycub__Money__c);
            }else{
                totalMoneyByPlayer.put(round.cozycub__Player_Name__c, totalMoneyByPlayer.get(round.cozycub__Player_Name__c) + round.cozycub__Money__c);
            }
        }

        for(String playerName : totalMoneyByPlayer.keySet()){
            Round r = new Round();
            r.dice = null;
            r.playerName = playerName;
            r.money = totalMoneyByPlayer.get(playerName);
            r.round = 0;
            roundList.add(r);
        }

        String rounds_string = JSON.serialize(roundList);
        System.debug('***rounds_string '+rounds_string);

        result.put('status','success');
        result.put('rounds', rounds_string);
        result.put('errorMessage','');

        return result;
    }   

    public class Round {
        public String dice;
        public String playerName;
        public Decimal money;
        public Integer round;
    }
}
