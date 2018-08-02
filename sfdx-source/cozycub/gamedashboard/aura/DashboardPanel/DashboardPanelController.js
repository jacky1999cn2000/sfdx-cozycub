({
    nameChange : function(component, event, helper) {

        console.log('nameChange');

        var round = component.get('v.round');
        var rounds = component.get('v.rounds');
   
        rounds = [];

        for(var i = 1; i <= round; i++){
            rounds.push(i);
        }

        component.set('v.rounds', rounds);
    },

    selectedRoundChanged: function(component, event, helper) {

        console.log('selectedRoundChanged');

    },

    flip : function(component, event, helper) {
        var card = component.find('card');
        if($A.util.hasClass(card, "flipper")){
            $A.util.removeClass(card, 'flipper');
        }else{
            $A.util.addClass(card, 'flipper');
        }
    }
})
