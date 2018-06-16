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
            {"pList":[{"sad":"abott","name":"Abbot J","money":42.00,"happy":"abotttttt","emotion":"calm","dice":[0,0,0],"calm":"abottt"},{"sad":"jackttttt","name":"Jack L","money":42.00,"happy":"jackt","emotion":"calm","dice":[0,0,0],"calm":"jackttt"},{"sad":"kevintttttttt","name":"Kevin D","money":42.00,"happy":"kevinttttt","emotion":"calm","dice":[0,0,0],"calm":"kevintt"},{"sad":"helenttttt","name":"Helen W","money":42.00,"happy":"helent","emotion":"calm","dice":[0,0,0],"calm":"helenttttttt"},{"sad":"samtttt","name":"Sam S","money":42.00,"happy":"samt","emotion":"calm","dice":[0,0,0],"calm":"samtt"},{"sad":"agtt","name":"Agata L","money":42.00,"happy":"agtttttt","emotion":"calm","dice":[0,0,0],"calm":"agtttt"},{"sad":"gawett","name":"Grace E","money":42.00,"happy":"gawetttttt","emotion":"calm","dice":[0,0,0],"calm":"gawettt"},{"sad":"qe","name":"Olivia Z","money":42.00,"happy":"qetttt","emotion":"calm","dice":[0,0,0],"calm":"qett"},{"sad":"bedfttt","name":"William P","money":42.00,"happy":"bedf","emotion":"calm","dice":[0,0,0],"calm":"bedfttttt"},{"sad":"sfaaftttttt","name":"Sharif O","money":42.00,"happy":"sfaafttt","emotion":"calm","dice":[0,0,0],"calm":"sfaaf"}]}
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
