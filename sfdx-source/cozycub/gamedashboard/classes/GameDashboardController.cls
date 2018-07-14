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
}
