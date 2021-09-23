# wdio7-typescript-example

##### Table of Contents

[1 - Description](#description)  
[2 - Installation](#installation)  
[3 - Run tests by different levels](#different_levels)  
[4 - Enable\Disable Report Portal sending](#report_portal_sending)  
[5 - Run only one test scenario](#one_test_scenario)

<a name="description"/>

## 1 - Description

- webdriverIO ver.7: https://webdriver.io/
- Typescript: https://www.typescriptlang.org/
- Report Portal: https://reportportal.io/

<a name="installation"/>

## 2 - Installation

- Project requires [Node.js](https://nodejs.org/) v14+ to run.
- Execute the scripts

```sh
1. npm i
2. npm test (to run all the tests)
```

<a name="different_levels"/>

## 3 - Run tests by different levels

```sh
npm run test:smoke -> to run the Smoke test
npm run test:criticalPath -> to run the Critical Path test
npm run test:extended -> to run the Extended tests
```

<a name="report_portal_sending"/>

## 4 - How to enable/disable sending to Report Portal

```sh
RP_SEND=true npm test -> to send results to Report Portal
```

<a name="one_test_scenario"/>

## 5 - How to run only one test scenario using jira ID

```sh
npm test -- --mochaOpts.grep BLMBMON-10824
```
