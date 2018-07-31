({
    init : function(component, event, helper) {

        /*
            I'd like to query all games from backend to frontend so that I can apply dynamic filtering later; 
            in order to do it, I used AuraPromise.while() here - it worked fine for test data (82 records);
            however, it sometimes seemed not very stable (would stuck) - probably better to use lightning event in real scenario?
        */

       var originalGameList = [];
       var filteredGameList = [];

        var action = component.get('c.getGames');
        action.setParams({'limitValue': 200, 'offsetValue': 0});

        AuraPromise.serverSideCall(action, component).while(
            function(result){
                return result.hasMore;
            },
            function(result){

                var game_array = JSON.parse(result.games);

                for(var i = 0; i < game_array.length; i++){
                    originalGameList.push(game_array[i]);
                    filteredGameList.push(game_array[i]);
                }

                component.set('v.originalGameList', originalGameList);
                component.set('v.filteredGameList', filteredGameList);
                component.set('v.endIndex', filteredGameList.length < 12 ? filteredGameList.length : 12);

                action.setParams({'limitValue': 200, 'offsetValue': result.offset});
                return AuraPromise.serverSideCall(action, component);
            }
        )
        .then(function(result) {
            
            var game_array = JSON.parse(result.games);

            for(var i = 0; i < game_array.length; i++){
                originalGameList.push(game_array[i]);
                filteredGameList.push(game_array[i]);
            }

            filteredGameList.sort(function(a, b){
                if(a['name'].toUpperCase() > b['name'].toUpperCase()){
                    return 1;
                }else if(a['name'].toUpperCase() < b['name'].toUpperCase()){
                    return -1;
                }
                return 0;
            });

            component.set('v.originalGameList', originalGameList);
            component.set('v.filteredGameList', filteredGameList);
            component.set('v.startIndex', 0);
            component.set('v.endIndex', 12);
            component.set('v.totalPages', Math.ceil(filteredGameList.length/12));

        }).catch(function(error) {
            console.log('Error: ' + error);
        });
        
    },

    keywordChanged : function(component, event, helper) {

        console.log('keywordChanged');

        var keyword = component.get('v.keyword');
        var originalGameList = component.get('v.originalGameList');

        component.set('v.spinning', true);

        var filteredGameList = originalGameList.filter(function(game) {
            return game.name.toUpperCase().indexOf(keyword.toUpperCase()) != -1;
        });

        filteredGameList.sort(function(a, b){
            if(a['name'].toUpperCase() > b['name'].toUpperCase()){
                return 1;
            }else if(a['name'].toUpperCase() < b['name'].toUpperCase()){
                return -1;
            }
            return 0;
        });

        component.set('v.filteredGameList', filteredGameList);
        component.set('v.startIndex', 0);
        component.set('v.endIndex', 12);
        component.set('v.totalPages', Math.ceil(filteredGameList.length/12));
    },

    handleSelectionEvent : function(component, event, helper) {
        var gameId = event.getParam("gameId");
        var name = event.getParam("name");
        var round = event.getParam("round");
        var bet = event.getParam("bet");
        var eventType = event.getParam("eventType");

        if(eventType == 'game'){
            component.set('v.selectedGameId',gameId);
            component.set('v.name',name);
            component.set('v.round',round);
            component.set('v.bet',bet);
        }
    }
})
