listAll:
	sfdx force:org:list

openDEV:
	sfdx force:org:open

openTEST:
	sfdx force:org:open -u CozyCubTest1

pushToTest:
	sfdx force:source:push -f -u CozyCubTest1