({
    onkeyup : function(component, event, helper) {
        var target = event.currentTarget;
        var keyword = target.value;
        component.set('v.keyword', keyword);

        var spinning = component.get('v.spinning');
        if(!spinning){
            component.set('v.spinning', true);
        }
        setTimeout(function(){
            component.set('v.spinning', false);
        }, 500);
    }
})
