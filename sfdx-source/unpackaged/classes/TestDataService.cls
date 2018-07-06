public class TestDataService implements Database.Batchable<sObject> {

    
    public Database.QueryLocator start(Database.BatchableContext bc) {
        String query = 'SELECT cozycub__Game_Id__c,cozycub__Game_Name__c,cozycub__Player_Id__c,cozycub__Player_Name__c,Id,Name FROM cozycub__Round_Dashboard__c';
        return Database.getQueryLocator(query);
    }
    
    public void execute(Database.BatchableContext bc, List<cozycub__Round_Dashboard__c> records){
        List<cozycub__Game__c> gameList = [SELECT Id,Name FROM cozycub__Game__c];
        List<cozycub__Player__c> playerList = [SELECT Id,Name FROM cozycub__Player__c];

        Map<String, String> gameIdNameMap = new Map<String, String>();
        Map<String, String> playerIdNameMap = new Map<String, String>();

        for(cozycub__Game__c game : gameList){
          gameIdNameMap.put(game.Name, game.Id);
        }

        for(cozycub__Player__c player : playerList){
          playerIdNameMap.put(player.Name, player.Id);
        }

        for(cozycub__Round_Dashboard__c rd : records){
          rd.cozycub__Game_Id__c = gameIdNameMap.get(rd.cozycub__Game_Name__c);
          rd.cozycub__Player_Id__c = playerIdNameMap.get(rd.cozycub__Player_Name__c);
        }

        update records;
    }    
    
    public void finish(Database.BatchableContext bc){
        // execute any post-processing operations
    }   

}