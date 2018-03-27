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
        component.set("v.step", component.get("v.step") - 1);
        console.log('back: ', component.get("v.step"));
    },

    next : function(component, event, helper) {
        component.set("v.step", component.get("v.step") + 1);
        console.log('next: ', component.get("v.step"));
    }
})
