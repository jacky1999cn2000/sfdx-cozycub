#!/bin/sh
####################################################################################################
#
# FILENAME:     rebuild-scratch-org
#
# PURPOSE:      Deletes then recreates a scratch org based on the SFDX source in this project.
#
# DESCRIPTION:  Executing this script will first delete the exisisting test scratch org for
#               this project (if it exists), then create a new one using the source and config
#               information defined in your dev-tools/lib/local-config.sh file.
#
# INSTRUCTIONS: Execute the following command from the root of your SFDX project directory.
#               ./dev-tools/install-beta-package
#
#### LOAD SHARED FUNCTIONS LIBRARY #################################################################
#
if [ ! -r `dirname $0`/lib/shared-functions.sh ]; then
  echo "\nFATAL ERROR: `tput sgr0``tput setaf 1`Could not load dev-tools/lib/shared-functions.sh.  File not found.\n"
  exit 1
fi
source `dirname $0`/lib/shared-functions.sh
#
#
#### CONFIRM SCRIPT EXECUTION ######################################################################
#
confirmScriptExecution "Do you want to INSTALL a package into the specified sandbox org?"
#
#
#### CREATE LOCAL VARIABLES ########################################################################
#
# No local variables are used by this script.
#
#
#### SCRATCH ORG SETUP (DELETE/CREATE/PUSH) ########################################################
#
# 0. Reset the Step Message counter and set the TOTAL STEPS to 4.
resetStepMsgCounter 2

# 1. Attempt to install the specified package into the target subscriber org.
echoStepMsg "Attempt to install package $PACKAGE_VERSION_ID into the org aliased as $TEST_ORG_ALIAS"
echo \
"Executing sfdx force:package:install \\
                --id $PACKAGE_VERSION_ID \\
                --wait 15 \\
                --publishwait 10 \\
                --targetusername $TEST_ORG_ALIAS \\
                --loglevel error\n"
(cd $PROJECT_ROOT && exec sfdx force:package:install \
                                --id $PACKAGE_VERSION_ID \
                                --wait 15 \
                                --publishwait 10 \
                                --targetusername $TEST_ORG_ALIAS \
                                --loglevel error)

# Check if the previous command executed successfully. If not, abort this script.
if [ $? -ne 0 ]; then
  echoErrorMsg "Package installation was not successful."
fi

# 2. List all of the packages installed in the target subscriber org.
echoStepMsg "List all packages installed in $TEST_ORG_ALIAS"
echo "List of packages currently installed in $TEST_ORG_ALIAS.\n"
(cd $PROJECT_ROOT && exec sfdx force:package:installed:list \
                                --targetusername $TEST_ORG_ALIAS \
                                --loglevel error)
#
#
#### ECHO CLOSING MESSAGE ##########################################################################
#
echoScriptCompleteMsg \
"Package installation script complete"

exit 0

##END##