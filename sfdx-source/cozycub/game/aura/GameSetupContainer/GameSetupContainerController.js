({
    init: function(component, event, helper) {

        console.log('AuraPromise is loaded...');

    },

    playersChanged: function(component, event, helper) {
        console.log('playersChanged...');

        var gameId = component.get("v.gameId");
        var name = component.get("v.name");
        var round = component.get("v.round");
        var currentRound = component.get("v.currentRound");
        var bet = component.get("v.bet");

        console.log('currentRound: ', currentRound);

        // if there are still remaining round, then play the next round
        if(currentRound != round){
            console.log('currentRound NOT equals to round');

            setTimeout($A.getCallback(function(){
                console.log('start timer...');
                var action = component.get('c.playGame');
                action.setParams({'gameId': gameId, 'name': name, 'round': round, 'currentRound': currentRound, 'bet': bet, 'players_string': component.get('v.players')});
                AuraPromise.serverSideCall(action, component).then(function(players) {
                    console.log('updated players ', players);
                    component.set('v.currentRound', currentRound+1);
                    component.set('v.players', players);
                }).catch(function(error) {
                    console.log('Error: ' + error);
                });
            }), 3000);

        }else{
            console.log('currentRound equals to round');
            console.log('firing game event...');
            var gameEvent = component.getEvent("GameEvent");
            if(gameEvent != null) {
                gameEvent.setParam("status", 'end game');
                // fire the event
                gameEvent.fire(); 
            }          
        }

    },

    handleGameEvent : function(component, event, helper) {
        console.log('handleGameEvent...');

        var status = event.getParam("status");

        if(status == 'new game'){
            console.log('new game...');

            var gameId = event.getParam("gameId");
            var name = event.getParam("name");
            var round = event.getParam("round");
            var currentRound = event.getParam("currentRound");
            var bet = event.getParam("bet");
    
            console.log('gameId: ', gameId);
            console.log('name: ', name);
            console.log('round: ', round);
            console.log('currentRound: ', currentRound);
            console.log('bet: ', bet);
    
            component.set('v.gameId', gameId);
            component.set('v.name', name);
            component.set('v.round', round);
            component.set('v.currentRound', currentRound);
            component.set('v.bet', bet);
    
            component.set('v.gameon', true);
    
            var action = component.get('c.playGame');
            action.setParams({'gameId': gameId, 'name': name, 'round': round, 'currentRound': currentRound, 'bet': bet, 'players_string': null});
            AuraPromise.serverSideCall(action, component).then(function(players) {
                console.log('initial players '+players);
                component.set('v.players', players);
            }).catch(function(error) {
                console.log('Error: ' + error);
            });
        }else{
            console.log('end game...');

            component.set('v.gameId', '');
            component.set('v.name', '');
            component.set('v.round', 0);
            component.set('v.currentRound', 0);
            component.set('v.bet', 0);

            setTimeout($A.getCallback(function(){
                component.set('v.gameon', false);
            }), 3000);

        }
    }
})

