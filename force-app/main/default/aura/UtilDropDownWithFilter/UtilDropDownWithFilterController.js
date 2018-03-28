({
    optionClicked : function(component, event, helper) {
        console.log('component ',component);
        console.log('event ',event);
        console.log('helper ',helper);
        var target = event.target;
        // var name = target.get('v.name');
        console.log('option clicked ',target.attributes);
        console.log('option clicked ',target.name);
        
    }
})
