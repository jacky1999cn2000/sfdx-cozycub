({
    playersChanged: function(component, event, helper) {
        var upperPlayers = [];
        var lowerPlayers = [];

        var players = component.get('v.players');
        console.log('players ',players);

        for(var i = 0; i < players.length/2; i++){
            upperPlayers.push(players[i]);
        }

        for(var i = players.length/2; i < players.length; i++){
            lowerPlayers.push(players[i]);
        }

        component.set('v.upperPlayers', upperPlayers);
        component.set('v.lowerPlayers', lowerPlayers);
    },
})
