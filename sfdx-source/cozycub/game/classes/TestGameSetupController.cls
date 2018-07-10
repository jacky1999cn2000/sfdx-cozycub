@isTest
private class TestGameSetupController {
    @isTest static void testCreateGame(){

        Map<String, String> result = new Map<String, String>();

        Test.startTest();
        result = GameSetupController.createGame('Test Game', 10, 29.99);
        Test.stopTest();

        System.assertEquals('success', result.get('status'));
    }

    @isTest static void testInitializeGame(){

        Map<String, String> result = new Map<String, String>();

        Test.startTest();
        result = GameSetupController.initializeGame(10);
        Test.stopTest();

        System.assertEquals('success', result.get('status'));
    }

    @isTest static void testPlayGame(){

        Map<String, String> result = new Map<String, String>();

        Map<String, String> createGameresult = GameSetupController.createGame('Test Game', 10, 29.99);
        Map<String, String> initializeGameResult = GameSetupController.initializeGame(10);
        String gameId = createGameresult.get('id');
        String players_string = initializeGameResult.get('players');

        Test.startTest();
        result = GameSetupController.playGame(gameId, 'Test Game', 1, 29.99, players_string);
        Test.stopTest();

        System.assertEquals('success', result.get('status'));
    }

    @isTest static void testEndGame(){

        Map<String, String> result = new Map<String, String>();

        Map<String, String> createGameresult = GameSetupController.createGame('Test Game', 10, 29.99);
        Map<String, String> initializeGameResult = GameSetupController.initializeGame(10);
        String gameId = createGameresult.get('id');
        String players_string = initializeGameResult.get('players');

        Test.startTest();
        result = GameSetupController.endGame(gameId, players_string);
        Test.stopTest();

        System.assertEquals('success', result.get('status'));
    }

    @testSetup static void createPlayers(){
        List<cozycub__Player__c> playerList = new List<cozycub__Player__c>();
        List<String> nameList = new List<String>{'Test1','Test2','Test3','Test4','Test5','Test6','Test7','Test8','Test9','Test10'};

        for(String name : nameList){
            cozycub__Player__c player = new cozycub__Player__c();
            player.Name = name;
            player.cozycub__Money__c = 42;
            playerList.add(player);
        }

        insert playerList;
    }
}
