# devops

* setup devhub & scratch orgs
    * [apply for a temp devhub](https://developer.salesforce.com/promotions/orgs/dx-signup)
    * [delete existing/expired devhub - delete all files](https://salesforce.stackexchange.com/questions/181780/removing-old-hub-org-or-non-scratch-org-from-salesforce-dx-org-list)
    * connect CLI to devhub: `sfdx force:auth:web:login -d -a DevHub`
    * create scratch org:
        * `sfdx force:org:create -s -f config/project-scratch-def.json -a CozyCubDev`
    * [link a namespece to devhub](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_reg_namespace.htm)

* orgs for this project
    * devhub org
        * username: jay.zhao.sfdc999.2@gmail.com
        * password: ba7**H
        * connect CLI to packaging org: `sfdx force:auth:web:login -d -a DevHub`

    * packaging org
        * username: jay.zhao.sfdc999.packaging@gmail.com
        * password: ba7**H
        * connect CLI to packaging org: `sfdx force:auth:web:login -a cozycub-PACKAGING`

    * test org
        * username: jay.zhao.sfdc999.test@gmail.com
        * password: ba7**H
        * connect CLI to packaging org: `sfdx force:auth:web:login -a cozycub-TEST`

* dev facilitators
    * continous push: run `npx nodemon`
    * pull: run `make pull` 

* data export
    * command 
    `sfdx force:data:tree:export --query "SELECT cozycub__Bet__c,cozycub__Finished__c,cozycub__Round__c,Id,Name FROM cozycub__Game__c ORDER BY CREATEDDATE" --prefix data --outputdir data --plan`

* data import
    * [how to use refs](https://www.linkedin.com/pulse/salesforce-dx-export-data-jean-noel-casassus/)
    * if records <= 200 (maximum is 200 per batch), use the standard method:
        * in `cozycub__Round_Dashboard__c`'s plan json file, use the following content:
        ```
        [
            {
                "sobject": "cozycub__Player__c",
                "saveRefs": true,
                "resolveRefs": false,
                "files": [
                    "data-cozycub__Player__cs.json"
                ]
            },
            {
                "sobject": "cozycub__Game__c",
                "saveRefs": true,
                "resolveRefs": false,
                "files": [
                    "data-cozycub__Game__cs.json"
                ]
            },
            {
                "sobject": "cozycub__Round_Dashboard__c",
                "saveRefs": false,
                "resolveRefs": true,
                "files": [
                    "data-cozycub__Round_Dashboard__cs.json"
                ]
            }
        ]
        ```
        * run the following command for data import (rebuild.sh) - this would first import Player records, then Game records, and then Round_Dashboard records
        ```
        (cd $PROJECT_ROOT && exec sfdx force:data:tree:import \
                               --plan ./data/data-cozycub__Round_Dashboard__c-plan.json \
                               --targetusername $SCRATCH_ORG_ALIAS \
                               --loglevel error)
        ``` 
    * if records > 200 (which is our use case for `cozycub__Round_Dashboard__c` records) - we can't use the solution above since each command would re-insert Player/Game records, therefore, I used the following method:
        * in `cozycub__Round_Dashboard__c`'s plan json file, use the following content:
        ```
        [
            {
                "sobject": "cozycub__Round_Dashboard__c",
                "saveRefs": false,
                "resolveRefs": false,
                "files": [
                    "data-cozycub__Round_Dashboard_batch1__cs.json"
                ]
            }
        ]
        ```
        * in `cozycub__Round_Dashboard__c`'s data json file, use dummy values for `cozycub__Game_Id__c` and `cozycub__Player_Id__c`:
        ```
         {
            "attributes": {
                "type": "cozycub__Round_Dashboard__c",
                "referenceId": "cozycub__Round_Dashboard__cRef1"
            },
            "cozycub__Dice__c": "1|5|6",
            "cozycub__Game_Id__c": "@Game__cRef1",
            "cozycub__Game_Name__c": "Las Vegas World Series Gx1",
            "cozycub__Money__c": -20,
            "cozycub__Player_Id__c": "@Player__cRef2",
            "cozycub__Player_Name__c": "Summer",
            "cozycub__Round__c": 1
        }
        ```
        * in `rebuild-scratch-org` script, added step 7 to run anonymous apex to update `cozycub__Game_Id__c` and `cozycub__Player_Id__c` fields
            * the anonymous apex would start a batch job 
            * the batch class was put under `unpackaged` folder, so it won't be included in final package (only for testing usage)
        

* tips
    * [use nodemon to auto save/push](https://ntotten.com/2018/01/17/using-nodemon-to-autopush-sfdx-project-changes/)
    * [remove already added hidden directory from git](https://stackoverflow.com/questions/35026376/git-to-ignore-a-hidden-directory-in-the-local-repo)

* resources
    * sfdx-falcon:
        * [sfdx-falcon-template](https://github.com/sfdx-isv/sfdx-falcon-template)
        * [sfdx-falcon-demo](https://github.com/sfdx-isv/sfdx-falcon-demo)
        * [SFDriveWealth_SFDX](https://github.com/jrattanpal/SFDriveWealth_SFDX)

    * sfdx project explain:
        * [two-sfdx-project-folder-structure-questions](https://salesforce.stackexchange.com/questions/204998/two-sfdx-project-folder-structure-questions)
        * [how-to-use-sfdx-forcesourcepull-with-folders-other-than-main-default](https://salesforce.stackexchange.com/questions/206847/how-to-use-sfdx-forcesourcepull-with-folders-other-than-main-default-where)

    * youtube:
        * [Salesforce DX 201 - Advanced Implementation for ISVs](https://www.youtube.com/watch?v=xLjY-j5pf6c)
        * [ISVs Adopting Salesforce DX with Managed Packages](https://www.youtube.com/watch?v=lTTbymAAtAg)
        * [How Everyone Can Leverage Salesforce DX Packaging](https://www.youtube.com/watch?v=Prlurg2ORnU)