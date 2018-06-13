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

    @AuraEnabled
    public static String getPlayers(){
  
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

        String players_string = JSON.serialize(players);

        System.debug('***players_string '+players_string);
        
        return players_string;
    }

    public class Game{
        public Id id;
        public String name;
        public Integer round;
        public Integer currentRound;
        public Decimal bet;
        public Players players;
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
