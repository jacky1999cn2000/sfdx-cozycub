({
    playersChanged: function(component, event, helper) {

        var upperPlayers = [];
        var lowerPlayers = [];

        var players = component.get('v.players');

        // players string would be empty before game was created
        if(players == ''){
            return;
        }

        /*
            This is what players string looks like:
            [{"rounds":[0,0,-1],"playerId":"a01190000035U8mAAE","name":"Summer","money":-530.66,"emotion":"sad","dice":[3,3,5]},{"rounds":[0,1,-1],"playerId":"a01190000035U8nAAE","name":"Ricky","money":1027.67,"emotion":"happy","dice":[4,6,6]},{"rounds":[0,0,-1],"playerId":"a01190000035U8oAAE","name":"Richard","money":-11.17,"emotion":"sad","dice":[4,6,2]},{"rounds":[0,0,-1],"playerId":"a01190000035U8pAAE","name":"Oscar","money":-533.17,"emotion":"sad","dice":[5,2,2]},{"rounds":[0,0,-1],"playerId":"a01190000035U8qAAE","name":"Jeff","money":35.50,"emotion":"sad","dice":[6,1,6]},{"rounds":[0,0,-1],"playerId":"a01190000035U8rAAE","name":"Gonzalez","money":304.66,"emotion":"sad","dice":[1,3,1]},{"rounds":[0,0,-1],"playerId":"a01190000035U8lAAE","name":"Yolanda","money":211.34,"emotion":"sad","dice":[4,6,5]},{"rounds":[1,0,-1],"playerId":"a01190000035U8sAAE","name":"Diva","money":436.83,"emotion":"sad","dice":[6,6,3]},{"rounds":[0,0,-1],"playerId":"a01190000035U8tAAE","name":"Bo","money":-557.00,"emotion":"sad","dice":[5,2,5]},{"rounds":[0,0,-1],"playerId":"a01190000035U8uAAE","name":"Alex","money":36.00,"emotion":"sad","dice":[3,2,2]}]
        */
       var players_array = JSON.parse(players);

        for(var i = 0; i < players_array.length/2; i++){
            upperPlayers.push(players_array[i]);
        }

        for(var i = players_array.length/2; i < players_array.length; i++){
            lowerPlayers.push(players_array[i]);
        }

        component.set('v.upperPlayers', upperPlayers);
        component.set('v.lowerPlayers', lowerPlayers);
    },
})
