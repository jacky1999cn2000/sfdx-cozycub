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
    },

    onmouseenter : function(component, event, helper) {
        var rn_elem = component.find('rn_elem');

        if(!$A.util.hasClass(rn_elem, "animated bounce")){
            $A.util.addClass(rn_elem, 'animated bounce'); 
        }
    },

    onmouseout : function(component, event, helper) {
        var rn_elem = component.find('rn_elem');
        
        if($A.util.hasClass(rn_elem, "animated bounce")){
            $A.util.removeClass(rn_elem, 'animated bounce');
        }
    }
})
