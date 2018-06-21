({
    init: function(component, event, helper) {

        var emotion = component.get('v.emotion');
        var avatar = component.find('avatar');

        if(emotion == 'happy'){
            $A.util.addClass(avatar, 'animated infinite bounce');
        }else if(emotion == 'sad'){
            $A.util.addClass(avatar, 'animated infinite shake');
        }
    
        setTimeout(function(){
            $A.util.removeClass(avatar, 'animated infinite shake');
        }, 500);

    },
})
