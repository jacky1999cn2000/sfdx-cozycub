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
        // if(currentRound != round){
        //     var action = component.get('c.createGame');
        //     action.setParams({'name': name, 'round': round, 'bet': bet});
        //     AuraPromise.serverSideCall(action, component).then(function(result) {
        //         if(result == 'success'){
        //             console.log('firing game event...');
        //             var gameEvent = component.getEvent("GameEvent");
        //             if(gameEvent != null) {
        //                 gameEvent.setParam("gameon", true);
        //                 gameEvent.setParam("name", name);
        //                 gameEvent.setParam("round", round);
        //                 gameEvent.setParam("currentRound", 0);
        //                 gameEvent.setParam("bet", bet);

        //                 // hide component
        //                 var nextbtn = component.find('nextbtn');
        //                 $A.util.removeClass(nextbtn, 'hidden');
        //                 var savebtn = component.find('backbtn');
        //                 $A.util.addClass(savebtn, 'hidden');
        //                 var savebtn = component.find('savebtn');
        //                 $A.util.addClass(savebtn, 'hidden');

        //                 var modalbox = component.find('modalbox');
        //                 var modalbackdrop = component.find('modalbackdrop');
        //                 $A.util.removeClass(modalbox, 'slds-fade-in-open'); 
        //                 $A.util.removeClass(modalbackdrop,'slds-backdrop--open');

        //                 // fire the event
        //                 gameEvent.fire();                            
        //             }
        //         }else{
        //             console.log('Error: ' + result);
        //         }
        //     }).catch(function(error) {
        //         console.log('Error: ' + error);
        //     });
        // }
    }
})

