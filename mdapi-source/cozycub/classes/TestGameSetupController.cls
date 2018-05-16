@isTest
private class TestGameSetupController {
    @isTest static void testAll(){
        Test.startTest();
        GameSetupController dummyc = new GameSetupController();
        Test.stopTest();
    }
}
