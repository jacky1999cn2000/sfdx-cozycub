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

        String result = '';

        if(players_string == null){
            
            System.debug('***initialize players_string');

            List<cozycub__Player__c> playerList = [SELECT Id, Name, cozycub__Money__c, cozycub__Calm__c,cozycub__Happy__c, cozycub__Sad__c FROM cozycub__Player__c];

            Players players = new Players();
            List<Player> pList = new List<Player>();

            for(cozycub__Player__c player : playerList){
                Player p = new Player();
                p.name = player.Name;
                p.money = player.cozycub__Money__c;
                p.emotion = 'calm';
                p.calm = player.cozycub__Calm__c;
                p.happy = player.cozycub__Happy__c;
                p.sad = player.cozycub__Sad__c;
                p.dice = new List<Integer>{0,0,0};
                pList.add(p);
            }

            players.pList = pList;

            result = JSON.serialize(players);
            System.debug('***result '+result);
        
            return result;
        }else{

            System.debug('***update players_string');

        }
        return '';
    }

    public class Players{
        public List<Player> pList;
    }

    public class Player{
        public String name;
        public Decimal money;
        public String emotion;
        public String calm;
        public String happy;
        public String sad;
        public List<Integer> dice;
    }

}
