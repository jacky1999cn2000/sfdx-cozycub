({
    open : function(component, event, helper) {
        var modalbox = component.find('modalbox');
        var modalbackdrop = component.find('modalbackdrop');
        $A.util.addClass(modalbox, 'slds-fade-in-open'); 
        $A.util.addClass(modalbackdrop,'slds-backdrop--open');
    },

    close : function(component, event, helper) {
        var modalbox = component.find('modalbox');
        var modalbackdrop = component.find('modalbackdrop');
        $A.util.removeClass(modalbox, 'slds-fade-in-open'); 
        $A.util.removeClass(modalbackdrop,'slds-backdrop--open');
    },

    back : function(component, event, helper) {
        component.set('v.step', component.get('v.step') - 1);
        if(component.get('v.step') < 4){
            var nextbtn = component.find('nextbtn');
            $A.util.removeClass(nextbtn, 'hidden');
        }
        if(component.get('v.step') == 0){
            var backbtn = component.find('backbtn');
            $A.util.addClass(backbtn, 'hidden');
        }
    },

    next : function(component, event, helper) {
        component.set('v.step', component.get('v.step') + 1);
        if(component.get('v.step') > 0){
            var backbtn = component.find('backbtn');
            $A.util.removeClass(backbtn, 'hidden');
        }
        if(component.get('v.step') == 4){
            var nextbtn = component.find('nextbtn');
            $A.util.addClass(nextbtn, 'hidden');
        }
    }
})
