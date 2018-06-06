({
    init: function(component, event, helper) {

        switch(component.get('v.emotion')){
            case 'happy':
                component.set('v.avatar', component.get('v.happy'));
                break;
            case 'sad':
                component.set('v.avatar', component.get('v.sad'));
                break;
            default:
                component.set('v.avatar', component.get('v.calm'));
        }

    },
})
