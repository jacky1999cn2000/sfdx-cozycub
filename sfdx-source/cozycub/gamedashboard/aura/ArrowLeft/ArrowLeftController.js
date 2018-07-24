({
    back : function(component, event, helper) {
        console.log('back');

        var startIndex = component.get('v.startIndex');
        var endIndex = component.get('v.endIndex');

        component.set('v.startIndex ', startIndex - 12);
        component.set('v.endIndex ', endIndex - 12);
    }
})
