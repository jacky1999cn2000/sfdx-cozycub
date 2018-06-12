({
    init: function(component, event, helper) {
        component.set('v.players', '[{"name":"Abbot J","money":"42","emotion":"calm","calm":"abottt","happy":"abotttttt","sad":"abott","dice":[3,1,5]},{"name":"Jack L","money":"42","emotion":"happy","calm":"jackttt","happy":"jackt","sad":"jackttttt","dice":[3,1,5]},{"name":"Kevin D","money":"42","emotion":"sad","calm":"kevintt","happy":"kevinttttt","sad":"kevintttttttt","dice":[3,1,5]},{"name":"Helen W","money":"42","emotion":"sad","calm":"helenttttttt","happy":"helent","sad":"helenttttt","dice":[3,1,5]},{"name":"Sam S","money":"42","emotion":"happy","calm":"samtt","happy":"samt","sad":"samtttt","dice":[3,1,5]},{"name":"Agata L","money":"42","emotion":"calm","calm":"agtttt","happy":"agtttttt","sad":"agtt","dice":[3,1,5]},{"name":"Grace E","money":"42","emotion":"happy","calm":"gawettt","happy":"gawetttttt","sad":"gawett","dice":[3,1,5]},{"name":"William P","money":"42","emotion":"happy","calm":"bedfttttt","happy":"bedf","sad":"bedfttt","dice":[3,1,5]},{"name":"Sharif O","money":"42","emotion":"sad","calm":"sfaaf","happy":"sfaafttt","sad":"sfaaftttttt","dice":[3,1,5]},{"name":"Olivia Z","money":"42","emotion":"sad","calm":"qett","happy":"qetttt","sad":"qe","dice":[3,1,5]}]');
    },

    handleEvent : function(component, event, helper) {
        console.log('handle event...');
        var gameon = event.getParam("gameon");
        var name = event.getParam("name");
        var round = event.getParam("round");
        var bet = event.getParam("bet");
        console.log('gameon ',gameon);
        console.log('name ',name);
        console.log('round ',round);
        console.log('bet ',bet);
    }
})

