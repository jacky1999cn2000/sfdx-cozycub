({
    open : function(component, event, helper) {
        component.set('v.showModal', true);
        var modalbox = component.find('modalbox');
        var modalbackdrop = component.find('modalbackdrop');
        $A.util.addClass(modalbox, 'slds-fade-in-open'); 
        $A.util.addClass(modalbackdrop,'slds-backdrop--open');
    },

    close : function(component, event, helper) {
        // set to initial status
        component.set('v.showModal', false);
        component.set('v.step', 0);
        component.set('v.name', '');
        component.set('v.round', '');
        component.set('v.bet', '');
        
        var nextbtn = component.find('nextbtn');
        $A.util.removeClass(nextbtn, 'hidden');
        var savebtn = component.find('backbtn');
        $A.util.addClass(savebtn, 'hidden');
        var savebtn = component.find('savebtn');
        $A.util.addClass(savebtn, 'hidden');

        var modalbox = component.find('modalbox');
        var modalbackdrop = component.find('modalbackdrop');
        $A.util.removeClass(modalbox, 'slds-fade-in-open'); 
        $A.util.removeClass(modalbackdrop,'slds-backdrop--open');
    },

    save : function(component, event, helper) {
        // create game
        console.log('creating game...');   

        var name = component.get('v.name');
        var round = component.get('v.round');
        var bet = component.get('v.bet');

        // set to initial status 
        component.set('v.showModal', false);
        component.set('v.step', 0);
        component.set('v.name', '');
        component.set('v.round', '');
        component.set('v.bet', '');

        var action = component.get('c.createGame');
        action.setParams({'name': name, 'round': round, 'bet': bet});
        AuraPromise.serverSideCall(action, component).then(function(result) {
            if(result == 'success'){
                console.log('firing game event...');
                var gameEvent = component.getEvent("GameEvent");
                if(gameEvent != null) {
                    gameEvent.setParam("gameon", true);
                    gameEvent.setParam("name", name);
                    gameEvent.setParam("round", round);
                    gameEvent.setParam("bet", bet);

                    // hide component
                    var nextbtn = component.find('nextbtn');
                    $A.util.removeClass(nextbtn, 'hidden');
                    var savebtn = component.find('backbtn');
                    $A.util.addClass(savebtn, 'hidden');
                    var savebtn = component.find('savebtn');
                    $A.util.addClass(savebtn, 'hidden');

                    var modalbox = component.find('modalbox');
                    var modalbackdrop = component.find('modalbackdrop');
                    $A.util.removeClass(modalbox, 'slds-fade-in-open'); 
                    $A.util.removeClass(modalbackdrop,'slds-backdrop--open');

                    // fire the event
                    gameEvent.fire();                            
                }
            }else{
                console.log('Error: ' + result);
            }
        }).catch(function(error) {
            console.log('Error: ' + error);
        });
    },

    back : function(component, event, helper) {
        component.set('v.step', component.get('v.step') - 1);
        if(component.get('v.step') < 3){
            var nextbtn = component.find('nextbtn');
            $A.util.removeClass(nextbtn, 'hidden');

            var savebtn = component.find('savebtn');
            $A.util.addClass(savebtn, 'hidden');
        }
        if(component.get('v.step') == 0){
            var backbtn = component.find('backbtn');
            $A.util.addClass(backbtn, 'hidden');
        }
    },

    next : function(component, event, helper) {
        // perform validation 
        var field;
        if(component.get('v.step') == 0){
            field = component.find('name');
            field.showHelpMessageIfInvalid();
        }else if(component.get('v.step') == 1){
            field = component.find('round');
            field.showHelpMessageIfInvalid();
        }else if(component.get('v.step') == 2){
            field = component.find('bet');
            field.showHelpMessageIfInvalid();
        }
        if(!field.get('v.validity').valid){
            return;
        }

        component.set('v.step', component.get('v.step') + 1);
        if(component.get('v.step') > 0){
            var backbtn = component.find('backbtn');
            $A.util.removeClass(backbtn, 'hidden');
        }
        if(component.get('v.step') == 3){
            var nextbtn = component.find('nextbtn');
            $A.util.addClass(nextbtn, 'hidden');

            var savebtn = component.find('savebtn');
            $A.util.removeClass(savebtn, 'hidden');
        }
    }
})
