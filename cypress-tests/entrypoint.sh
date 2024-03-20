#!/bin/bash

# Run Cypress tests
npm run cy:run

# Copy files after tests run
cp -r /app/cypress/reports/html /var/jenkins_home/