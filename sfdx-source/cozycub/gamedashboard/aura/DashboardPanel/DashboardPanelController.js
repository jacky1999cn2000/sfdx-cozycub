({
    flip : function(component, event, helper) {
        var card = component.find('card');
        if($A.util.hasClass(card, "flipper")){
            $A.util.removeClass(card, 'flipper');
        }else{
            $A.util.addClass(card, 'flipper');
        }
    }
})
