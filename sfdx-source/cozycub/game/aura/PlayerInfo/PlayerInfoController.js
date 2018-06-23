({
    init: function(component, event, helper) {

        var emotion = component.get('v.emotion');
        var avatar = component.find('avatar');

        if(emotion == 'calm'){
            if($A.util.hasClass(avatar, "animated infinite bounce")){
                $A.util.removeClass(avatar, 'animated infinite bounce');
            }
    
            if($A.util.hasClass(avatar, "animated infinite shake")){
                $A.util.removeClass(avatar, 'animated infinite shake');
            }
        }

        if(emotion == 'happy'){
            $A.util.addClass(avatar, 'animated infinite bounce');  
            setTimeout(function(){
                if($A.util.hasClass(avatar, "animated infinite bounce")){
                    $A.util.removeClass(avatar, 'animated infinite bounce');
                }
            }, 500);
        }else if(emotion == 'sad'){
            $A.util.addClass(avatar, 'animated infinite shake');
            setTimeout(function(){
                if($A.util.hasClass(avatar, "animated infinite shake")){
                    $A.util.removeClass(avatar, 'animated infinite shake');
                }
            }, 500);
        }
    },
})
