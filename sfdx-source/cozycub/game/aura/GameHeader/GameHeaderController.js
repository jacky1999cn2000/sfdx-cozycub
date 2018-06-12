({
    newGame : function(component, event, helper) {
        var gamecreator = component.find('gamecreator');
        if (gamecreator) {
            gamecreator.open();
        }
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
