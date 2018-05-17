# devops

* packaging org
    * username: jay.zhao.sfdc999.packaging@gmail.com
    * password: ba7**H
    * connect CLI to packaging org: `sfdx force:auth:web:login -a cozycub-PACKAGING`

* test org
    * username: jay.zhao.sfdc999.test@gmail.com
    * password: ba7**H
    * connect CLI to packaging org: `sfdx force:auth:web:login -a cozycub-TEST`

* setup devhub & scratch orgs
    * [apply for a temp devhub](https://developer.salesforce.com/promotions/orgs/dx-signup)
    * [delete existing/expired devhub - delete all files](https://salesforce.stackexchange.com/questions/181780/removing-old-hub-org-or-non-scratch-org-from-salesforce-dx-org-list)
    * connect CLI to devhub: `sfdx force:auth:web:login -d -a DevHub`
    * create scratch org:
        * `sfdx force:org:create -s -f config/project-scratch-def.json -a CozyCubDev`
    * [link a namespece to devhub](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_reg_namespace.htm)

* tips
    * [use nodemon to auto save/push](https://ntotten.com/2018/01/17/using-nodemon-to-autopush-sfdx-project-changes/)
    * [remove already added hidden directory from git](https://stackoverflow.com/questions/35026376/git-to-ignore-a-hidden-directory-in-the-local-repo)