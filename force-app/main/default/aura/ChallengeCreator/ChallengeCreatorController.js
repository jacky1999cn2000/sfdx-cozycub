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
    }
})
