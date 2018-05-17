listAll:
	sfdx force:org:list

openDEV:
	sfdx force:org:open

openTEST:
	sfdx force:org:open -u CozyCubTest

pushToDev:
	sfdx force:source:push -f -u CozyCubDev

pushToTest:
	sfdx force:source:push -f -u CozyCubTest
	
# for shell scripts to work, remember to run "chmod +x the_file_name", such as "chmod +x ./dev-tools/deploy-mdapi-source.sh"

rebuildDev:
	./dev-tools/rebuild-scratch-org.sh

pushToPackaging:
	./dev-tools/deploy-mdapi-source.sh

createBeta:
	sfdx force:package1:version:create -u cozycub-PACKAGING --packageid 033f4000000AOjQ --name "Dora" --description "Dora"