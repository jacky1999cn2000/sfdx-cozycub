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
        * username: jay.zhao.sfdc999_1@gmail.com
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

* tips
    * [use nodemon to auto save/push](https://ntotten.com/2018/01/17/using-nodemon-to-autopush-sfdx-project-changes/)
    * [remove already added hidden directory from git](https://stackoverflow.com/questions/35026376/git-to-ignore-a-hidden-directory-in-the-local-repo)

* resources
    ​* sfdx-falcon:
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