public class GameSetupController {

    @AuraEnabled
    public static String createGame(String name, Integer round, Decimal bet){
  
        cozycub__Game__c game = new cozycub__Game__c();
        game.Name = name;
        game.cozycub__Round__c = round;
        game.cozycub__Bet__c = bet;
        game.cozycub__PlayedRounds__c = 0;
        game.cozycub__Finished__c = false;

        try{
            insert game;
        }catch(Exception ex){
            System.debug('***exception while creating game');
            System.debug('***error: '+ex.getMessage());
            return ex.getMessage();
        }

        return 'success';
    }

}
