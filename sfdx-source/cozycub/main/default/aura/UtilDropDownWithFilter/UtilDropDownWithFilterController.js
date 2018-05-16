({
    init : function(component, event, helper) {
        component.set('v.options', component.get('v.originalOptions'));
    },

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

    onblur : function(component, event, helper) {
        var target = event.currentTarget.parentElement.parentElement;
        target.setAttribute('aria-expanded','false');
        target.className = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-combobox-picklist';
    },

    onkeydown : function(component, event, helper) {
       var target = event.currentTarget;
       var text = target.value;
       var originalOptions = component.get('v.originalOptions');
       var filteredOptions = originalOptions.filter(function(option) {
           return option.label.indexOf(text) != -1;
       });
       component.set('v.options', filteredOptions);
    },

    optionClicked : function(component, event, helper) {
        var target = event.currentTarget;
        component.set('v.options', component.get('v.originalOptions'));
        component.set('v.selectedLabel', target.getAttribute('data-label'));
        component.set('v.selectedValue', target.getAttribute('data-value'));
    }
})
