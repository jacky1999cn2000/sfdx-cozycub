# utility commands 

list:
	sfdx force:org:list

openDEV:
	sfdx force:org:open

openTEST:
	sfdx force:org:open -u cozycub-TEST

openPackaging:
	sfdx force:org:open -u cozycub-PACKAGING

# push & pull for development

push:
	sfdx force:source:push -f -u CozyCubDev

pull:
	sfdx force:source:pull -f -u CozyCubDev

# rebuild dev scratch org based on local metadata in sfdx-source 

rebuild:
	./dev-tools/rebuild-scratch-org.sh

# deploy metadata to packaging org and create beta

deploy:
	./dev-tools/deploy-mdapi-source.sh

packaging:
	sfdx force:package1:version:create -u cozycub-PACKAGING --packageid 033f4000000AOjQ --name "Dora" --description "Dora"

# rebuild test scratch org and install package in it

install:
	./dev-tools/install-beta-package.sh

# uninstall:
# 	./dev-tools/uninstall-beta-package.sh
# You're trying to uninstall a first-generation managed package, ID: 04tf4000003OIRI. You can uninstall this package type only in the Salesforce user interface.

# P.S.
# for shell scripts to work, remember to run "chmod +x the_file_name", such as "chmod +x ./dev-tools/deploy-mdapi-source.sh"