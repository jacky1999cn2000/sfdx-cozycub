({
    toggle : function(component, event, helper) {
        var target = event.currentTarget;
        if(target.getAttribute('aria-expanded') == 'true'){
            target.setAttribute('aria-expanded','false');
            target.className = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-combobox-picklist';
        }else{
            target.setAttribute('aria-expanded','true');
            target.className = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-combobox-picklist slds-is-open';
        }
    },

    outfocus : function(component, event, helper) {
        var target = event.currentTarget.parentElement.parentElement;
        target.setAttribute('aria-expanded','false');
        target.className = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-combobox-picklist';
    },


    optionClicked : function(component, event, helper) {
        var target = event.currentTarget;
        component.set('v.selectedLabel', target.getAttribute('data-label'));
        component.set('v.selectedValue', target.getAttribute('data-value'));
    }
})
