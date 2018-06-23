({
    init: function(component, event, helper) {
        console.log('AuraPromise is loaded...');
        console.log('animated is loaded...');
    },

    playersChanged: function(component, event, helper) {
        console.log('playersChanged...');

        var gameId = component.get("v.gameId");
        var name = component.get("v.name");
        var round = component.get("v.round");
        var currentRound = component.get("v.currentRound");
        var bet = component.get("v.bet");
        var players_string = component.get("v.players");

        if(currentRound != round){
            console.log('next round...');

            setTimeout($A.getCallback(function(){
                var action = component.get('c.playGame');
                action.setParams({'gameId': gameId, 'name': name, 'currentRound': currentRound, 'bet': bet, 'old_players_string': players_string});

                AuraPromise.serverSideCall(action, component).then(function(result) {
                    if(result.status == 'success'){
                        console.log('updated players ', result.players);
                        component.set('v.currentRound', currentRound + 1);
                        component.set('v.players', result.players);
                    }else{
                        console.log('Error: ' + result.errorMessage);
                    }
                }).catch(function(error) {
                    console.log('Error: ' + error);
                });
            }), 3000);

        }else{
            console.log('end game...');

            setTimeout($A.getCallback(function(){
                var action = component.get('c.endGame');
                action.setParams({'gameId': gameId, 'old_players_string': players_string});

                AuraPromise.serverSideCall(action, component).then(function(result) {
                    if(result.status == 'success'){
                        component.set('v.gameId', '');
                        component.set('v.name', '');
                        component.set('v.round', 0);
                        component.set('v.currentRound', 0);
                        component.set('v.bet', 0);
                        component.set('v.players', result.players);
                        component.set('v.gameon', false);
                    }else{
                        console.log('Error: ' + result.errorMessage);
                    }
                }).catch(function(error) {
                    console.log('Error: ' + error);
                });
            }), 3000);
       
        }

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

        component.set('v.gameon', true);

        console.log('initalize game...');

        var action = component.get('c.initializeGame');
        action.setParams({'round': round});

        AuraPromise.serverSideCall(action, component).then(function(result) {
            if(result.status == 'success'){
                console.log('initial players ', result.players);
                component.set('v.players', result.players);
            }else{
                console.log('Error: ' + result.errorMessage);
            }
        }).catch(function(error) {
            console.log('Error: ' + error);
        });
    }
})

