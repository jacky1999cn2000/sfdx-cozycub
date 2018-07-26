({
    init : function(component, event, helper) {
        var round = component.get('v.round');
        var suffix;
        if(round == 1){
            suffix = 'st';
        }else if(round == 2){
            suffix = 'nd';
        }else{
            suffix = 'th';
        }
        component.set('v.suffix', suffix);
    }
})
