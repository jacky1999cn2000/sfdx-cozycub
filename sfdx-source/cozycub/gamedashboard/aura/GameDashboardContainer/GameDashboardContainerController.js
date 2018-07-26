({
    init : function(component, event, helper) {

        /*
            I'd like to query all games from backend to frontend so that I can apply dynamic filtering later; 
            in order to do it, I used AuraPromise.while() here - it worked fine for test data (82 records);
            however, it sometimes seemed not very stable (would stuck) - probably better to use lightning event in real scenario?
        */

       var originalList = [];
       var filteredList = [];

        var action = component.get('c.getGames');
        action.setParams({'limitValue': 200, 'offsetValue': 0});

        AuraPromise.serverSideCall(action, component).while(
            function(result){
                return result.hasMore;
            },
            function(result){

                var game_array = JSON.parse(result.games);

                for(var i = 0; i < game_array.length; i++){
                    originalList.push(game_array[i]);
                    filteredList.push(game_array[i]);
                }

                component.set('v.originalList', originalList);
                component.set('v.filteredList', filteredList);
                component.set('v.endIndex', filteredList.length < 12 ? filteredList.length : 12);

                action.setParams({'limitValue': 200, 'offsetValue': result.offset});
                return AuraPromise.serverSideCall(action, component);
            }
        )
        .then(function(result) {
            
            var game_array = JSON.parse(result.games);

            for(var i = 0; i < game_array.length; i++){
                originalList.push(game_array[i]);
                filteredList.push(game_array[i]);
            }

            component.set('v.originalList', originalList);
            component.set('v.filteredList', filteredList);
            component.set('v.endIndex', filteredList.length < 12 ? filteredList.length : 12);
            component.set('v.totalPages', Math.ceil(filteredList.length/12));

        }).catch(function(error) {
            console.log('Error: ' + error);
        });
        
    },

    keywordChanged : function(component, event, helper) {

        console.log('keywordChanged');

        var keyword = component.get('v.keyword');
        var originalList = component.get('v.originalList');

        component.set('v.spinning', true);

        var filteredList = originalList.filter(function(game) {
            return game.name.toUpperCase().indexOf(keyword.toUpperCase()) != -1;
        });

        component.set('v.filteredList', filteredList);
        component.set('v.totalPages', Math.ceil(filteredList.length/12));
    }
})
