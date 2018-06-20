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
            {"pList":[{"rounds":[-1,-1,-1,-1],"playerId":"a010v000002Kv0WAAS","name":"Yolanda","money":42.00,"emotion":"calm","dice":[0,0,0]},{"rounds":[-1,-1,-1,-1],"playerId":"a010v000002Kv0XAAS","name":"Summer","money":42.00,"emotion":"calm","dice":[0,0,0]},{"rounds":[-1,-1,-1,-1],"playerId":"a010v000002Kv0YAAS","name":"Ricky","money":42.00,"emotion":"calm","dice":[0,0,0]},{"rounds":[-1,-1,-1,-1],"playerId":"a010v000002Kv0ZAAS","name":"Richard","money":42.00,"emotion":"calm","dice":[0,0,0]},{"rounds":[-1,-1,-1,-1],"playerId":"a010v000002Kv0aAAC","name":"Oscar","money":42.00,"emotion":"calm","dice":[0,0,0]},{"rounds":[-1,-1,-1,-1],"playerId":"a010v000002Kv0bAAC","name":"Jeff","money":42.00,"emotion":"calm","dice":[0,0,0]},{"rounds":[-1,-1,-1,-1],"playerId":"a010v000002Kv0cAAC","name":"Gonzalez","money":42.00,"emotion":"calm","dice":[0,0,0]},{"rounds":[-1,-1,-1,-1],"playerId":"a010v000002Kv0dAAC","name":"Diva","money":42.00,"emotion":"calm","dice":[0,0,0]},{"rounds":[-1,-1,-1,-1],"playerId":"a010v000002Kv0eAAC","name":"Bo","money":42.00,"emotion":"calm","dice":[0,0,0]},{"rounds":[-1,-1,-1,-1],"playerId":"a010v000002Kv0fAAC","name":"Alex","money":42.00,"emotion":"calm","dice":[0,0,0]}]}
        */
        var players_object = JSON.parse(players);
        var players_array = players_object.pList;

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
