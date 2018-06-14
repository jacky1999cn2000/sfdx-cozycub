({
    init: function(component, event, helper) {

        console.log('AuraPromise is loaded...');

        var action = component.get('c.playGame');
        AuraPromise.serverSideCall(action, component).then(function(players) {
            component.set('v.players', players);
        }).catch(function(error) {
            console.log('Error: ' + error);
        });

    },

    handleGameEvent : function(component, event, helper) {
        console.log('handleGameEvent...');

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

        component.set('v.gameon', currentRound != round);
        component.set('v.interval', true);

        // if there are still remaining round, then play the next round
        if(currentRound != round){
            setTimeout(function(){
                console.log('timer!!!');
                var action = component.get('c.playGame');
                action.setParams({'gameId': gameId, 'name': name, 'round': round, 'currentRound': currentRound, 'bet': bet, 'players_string': component.get('v.players')});
                AuraPromise.serverSideCall(action, component).then(function(players) {
                    console.log('return@@@');
                    // component.set('v.players', players);
                }).catch(function(error) {
                    console.log('Error: ' + error);
                });
            }, 2000);
        }
    }
})

