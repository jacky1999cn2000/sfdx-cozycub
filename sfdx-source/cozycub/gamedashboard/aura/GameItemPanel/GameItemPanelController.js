({
    handleSelectionEvent : function(component, event, helper) {
        var gameId = event.getParam("gameId");
        component.set('v.selectedGameId',gameId);
    }
})
