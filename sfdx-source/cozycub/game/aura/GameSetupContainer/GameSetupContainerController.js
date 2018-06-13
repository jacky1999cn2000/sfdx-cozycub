({
    init: function(component, event, helper) {

        var action = component.get('c.getPlayers');
        AuraPromise.serverSideCall(action, component).then(function(players_string) {
            var players_object = JSON.parse(players_string);
            var players_array = players_object.pList;
            component.set('v.players', players_array);
        }).catch(function(error) {
            console.log('Error: ' + error);
        });

    },

    handleGameEvent : function(component, event, helper) {
        console.log('handleGameEvent...');
        
        var gameon = event.getParam("gameon");
        var name = event.getParam("name");
        var round = event.getParam("round");
        var bet = event.getParam("bet");

        component.set('v.name',name);
        component.set('v.round',round);
        component.set('v.bet',bet);
        component.set('v.gameon',gameon);
    }
})

