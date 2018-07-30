# development

* [use "onmousedown" event rather than "onclick" event for select's option item click event since input's "onblur" event would be called before "onclick" event and after "onmousedown" event - UtilDropDownWithFilterController component](https://stackoverflow.com/questions/15196352/prevent-onblur-code-to-execute-if-clicked-on-submit-button/15196689#15196689)

* [Platform Events and Lightning Components](https://andyinthecloud.com/2017/11/12/platform-events-and-lightning-components/)

* [Build an Instant Notification App](https://trailhead.salesforce.com/projects/workshop-platform-events)

* [How to Use Custom Font In Lightning Component Using Static Resource](http://sfdcmonkey.com/2017/06/22/custom-font-lightning-component-static-resource/)

* [Grid System](https://www.lightningdesignsystem.com/utilities/grid/)

* [Random Number](https://developer.salesforce.com/blogs/developer-relations/2013/07/selecting-random-numbers-and-records-on-the-force-com-platform-part-1.html)

* Click "Stack Trace" to locate where the error occurred, then open file via "Sources" tab to see the actual code
    * ![alt text](https://github.com/jacky1999cn2000/sfdx-cozycub/blob/master/notes/images/1.png "screenshot")

* Somehow, when calling @Aura method from client, the passed in Integer parameters are not exactly the same type, and using "currentRound != round" or "player.rounds[currentRound]" would cause "Internal Salesforce.com Error" or "java.math.BigDecimal cannot be cast to java.lang.Integer" error; Therefore, need to convert it to its type explicitly (wierdly is, decimal seemed working fine).

    * client-side 
    ```
     var action = component.get('c.playGame');
     action.setParams({'gameId': gameId, 'name': name, 'currentRound': currentRound, 'bet': bet, 'old_players_string': players_string});
    ```

    * server-side
    ```
    @AuraEnabled
    public static Map<String, String> playGame(String gameId, String name, Integer currentRound, Decimal bet, String old_players_string){

        currentRound = Integer.valueOf(currentRound);

        ...

        player.rounds[currentRound] = 1;
    }
    ```

* [Figure out which element you are applying the custom css](https://salesforce.stackexchange.com/questions/147153/lightning-icon-color-is-not-changing-using-the-fill-css)

* [flip image](https://davidwalsh.name/css-flip)

* [lightning container](https://developer.salesforce.com/blogs/2018/04/lightning-container-component-building-components-with-react-angular-and-other-libraries.html)