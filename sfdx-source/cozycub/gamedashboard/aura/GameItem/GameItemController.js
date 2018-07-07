({
    init : function(component, event, helper) {

        var selected = component.get('v.selected');
        var bet = component.get('v.bet');
        var moneybags = component.get('v.moneybags');
        var card = component.find('card');

        if(bet <= 10){
            moneybags = [1];
        }else if(bet <= 20){
            moneybags = [1,2];
        }else if(bet <= 30){
            moneybags = [1,2,3];
        }else if(bet <= 40){
            moneybags = [1,2,3,4];
        }else{
            moneybags = [1,2,3,4,5];
        }

        if(selected){
            if(!$A.util.hasClass(card, "selected")){
                $A.util.addClass(card, 'selected'); 
            }           
        }else{
            if($A.util.hasClass(card, "selected")){
                $A.util.removeClass(card, 'selected');
            }
        }

        component.set('v.moneybags',moneybags);

    }
})
