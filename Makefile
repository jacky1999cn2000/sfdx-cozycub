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