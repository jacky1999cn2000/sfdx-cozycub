({
    newChallenge : function(component, event, helper) {
        var challengecreator = component.find('challengecreator');
        if (challengecreator) {
            challengecreator.open();
        }
    }
})