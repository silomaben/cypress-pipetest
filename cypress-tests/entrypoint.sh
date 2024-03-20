#!/bin/bash

echo "** Starting container..."
# Run Cypress tests
npm run cy:run


echo "** Copying test reports..."
# Copy files after tests run
cp -r /app/cypress/reports/html /var/jenkins_home/

echo "** Copying complete."

echo "** Container execution finished."