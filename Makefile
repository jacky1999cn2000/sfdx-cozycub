listAll:
	sfdx force:org:list

openDEV:
	sfdx force:org:open

openTEST:
	sfdx force:org:open -u CozyCubTest

pushToDev:
	sfdx force:source:push -f -u CozyCubDev

pushToTest:
	sfdx force:source:push -f -u 
	
# for shell scripts to work, remember to run "chmod +x the_file_name", such as "chmod +x ./dev-tools/deploy-mdapi-source.sh"