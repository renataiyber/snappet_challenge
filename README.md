#Snappet Challenge

## Setup
Node version should be 14+

- ``npm install``
- create ``.env`` file in the ``root`` of the project with LOGIN_USERNAME and LOGIN_PASSWORD variables (view ``.env.sample`` file for references)
- ``npm run cypress:open``

## Create Mochaawesome reports

- ``npm run generate-report-files``
- ``npm run mochawesome-merge-utility``
- ``npm run mochawesome-marge``
- open ``mochawesome-report/mochawesome.html`` in your browser
