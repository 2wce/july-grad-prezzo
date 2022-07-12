# RubberDucking Self Assessment (RDSA)

## Overview

The purpose of this document is to provide teams with the ability to continuously self-assess the health and compliance of their project throughout the development phase. Additionally it provides future developers with context into the maturity and compliance of the respective project. Ideally all standards should be complied with. In the case where they aren't, this document will serve as a point of reference for remediation.

### How to use this document?

Firstly this document (RDSA.md) should live in the root of all repositories where project-related work resides.  
Under the [**Checklist**](#checklist) heading you will find a list of SovTech standards and best practices presented in the form of questions.

Each standard/question should be marked according to the following key:

- 🟢 completed - the standard has been complied with
- 🔴 incomplete - the standard has **not** been complied with
- 🟡 not applicable - the standard is **not** applicable

##### Assessment Method

This a self-assessment document, and should be updated periodically by all developers in the team, together. It is the responsibility of the team to ensure that this document is updated and that standards are complied with.

During each round of self-assessment, this document should be updated, a PR should be created and any relevant comments should be made in the PR by the team. For example, if the repo does not belong in the correct project on Bitbucket, it should be stated in the PR that a request to an admin has been made to move it.

##### Assessment Frequency

Self-assessments should be conducted frequently, at least once per sprint. The onus and accountability is on the team to ensure that this is kept up to date and complied with where applicable.

## Checklist

#### Repository

- 🔴 Has this document (RDSA.md) been added to the root of this repo?
- 🔴 Is this repo in the correct project?
- 🔴 Do only the necessary people have access to this repo?
- 🔴 Are branch permissions setup?
- 🔴 Is pushing directly to master forbidden?
- 🔴 Have default reviewers been cofigured?
- 🔴 Is anything committed that shouldn’t be: .env files, dependencies like vendor or node_modules?
- 🔴 Does the `.gitignore` file cover common should-not-be-committed files?
- 🔴 Is the default PR template found in CONTRIBUTING.md being used?
- 🔴 Are the `master` and `develop` branches present?
- 🔴 Has this repo's default branch been set to `develop`?
- 🔴 Has this repo been connected to Slack?
- 🔴 Are notifications being sent to a project-specific monitor channel on Slack?
- 🔴 Is this repo connected to a Jira project?

#### Contributing

- 🔴 Is there a CONTRIBUTING.md file in this repo?
- 🔴 Does the CONTRIBUTING.md file list the SovTech commit guidelines?
- 🔴 Are the Angular commit message guidelines being followed?
- 🔴 Does the CONTRIBUTING.md file list the SovTech Gitflow and PR guidelines?
- 🔴 Is the correct Gitflow and PR guidelines being followed?
- 🔴 Are PRs being reviewed?
- 🔴 Have default reviewers been configured?
- 🔴 Are review checks in place in order to prevent merging without approval?
- 🔴 Is pushing directly to the `master` and `develop` branch disallowed and enforced within this repo's settings?

#### Documentation

- 🔴 Is there a README.md file present in this repo?
- 🔴 Is the README based on the SovTech README template?
- 🔴 Does the README contain a description of this repo's purpose?
- 🔴 Does the README describe the necessary steps required to bootsrap this project?
- 🔴 Is there a section in the README outlining the tech stack used?
- 🔴 Is there a basic architecture diagram in the README?
- 🔴 Are complex pieces of logic documented and/or accompanied by flow-diagrams within the README?
- 🔴 Are there JSDocs or the equivalent generated `/docs` directory?
- 🔴 Are complex bits of code well documented and are methods documented?
- 🔴 Is CHANGELOG.md kept in this repo?

#### Dependencies

- 🔴 Are all dependencies not specified in `package.json`, required for local development listed in the README?
- 🔴 Is a conventional package manager such as NPM being used?
- 🔴 Is this repo's preferred package manager specified in the README?
- 🔴 Does the README detail how dependencies should be installed?
- 🔴 Does the README detail any obscure or unconventional dependencies and why/how they're used?
- 🔴 Is there only one lockfile, either `package-lock.json` or `yarn.lock`?
- 🔴 Is a supported/preferred version of Node specified in the README or `package.json`?
- 🔴 Are only necessary dependencies included in the `package.json` file?
- 🔴 Are dependencies up to date?
- 🔴 Have all vulnerable dependencies been patched?
- 🔴 Have all dependency licenses been vetted to ensure no contravention?

#### Environments

- 🔴 Is this repo configured such that a local environment can easily be run?
- 🔴 Does the README detail how a local environment can be run?
- 🔴 Does the README detail necessary environment variables?
- 🔴 Is an example dotenv file present in this repo?
- 🔴 Is the example dotenv file up to date?
- 🔴 Are the 3 standard environments; DEV, UAT and PROD present?
- 🔴 Is each environment detailed and documented within the README?
- 🔴 Does the README detail how a PROD environment can be setup?
- 🔴 Does the README detail how an environment can be removed/destroyed?
- 🔴 Are environments managed using code, i.e. Infrastructure as Code (IaC)?

#### Pipelines

- 🔴 Is Bitbucket Pipelines being used for continuous integration and continuous deployment?
- 🔴 Is a bitbucket-pipelines.yml file present and configured in this repo?
- 🔴 Is the SovTech standard Docker image being used?
- 🔴 Is caching setup for Docker images and build dependencies?
- 🔴 Are environment variables being managed from within the repository settings?
- 🔴 Are sensitive environment variables stored securely (locked)?
- 🔴 Is there a step for each environment (DEV, UAT, PROD)?
- 🔴 Is the SovTech coverage reporter (SovCov) configured and a step within the pipeline?

#### Testing

- 🔴 Has a test runner been setup and configured for each type of test?
- 🔴 Does this repo have unit tests?
- 🔴 Does this repo have integration tests?
- 🔴 Does this repo have end-to-end tests?
- 🔴 Is the testing process documented within README?
- 🔴 Have pre-push git-hooks been setup to run tests before code is checked-in remotely?
- 🔴 Do tests run automatically during a build, within a pipeline?

#### Versioning

- 🔴 Is semantic versioning being followed?
- 🔴 Is the SovTech standard semantic-release configuration present and configured?
- 🔴 Does versioning occur automatically, within the pipeline?
- 🔴 Does a new version get tagged and released when code is merged in the `develop` branch?
- 🔴 Is the CHANGELOG.md file updated automatically after a new version has been released?
- 🔴 Is the versioning process detailed in the README?

#### Deployments

- 🔴 Are deployments made automatically?
- 🔴 Are tests required to pass before a deploy can be made?
- 🔴 Is the pipeline configured to make deploys?
- 🔴 Does the `develop` branch deploy to the DEV environment?
- 🔴 Does the `master` branch deploy to the PROD environment?
- 🔴 Does the README detail the deployment process?
- 🔴 Does the README detail how a deployment can be rolled back?
- 🔴 Does the README detail how a deployment to a specific environment?
- 🔴 Are cache invalidations executed post-deployment?
- 🔴 Are the correct environment variables being set for environment specific deploys?
- 🔴 For PROD deploys are sourcemaps omitted?

#### Networking

- 🔴 Are all key DNS records/hostnames listed in the README?
- 🔴 Does the README detail how DNS records can be managed?
- 🔴 Are all specific networking configurations detailed in the README?
- 🔴 Are Elastic-IPs detailed in the README?
- 🔴 Are all API Gateways and Proxies detailed in the README?
- 🔴 Is a CDN being used to cache static content?
- 🔴 Are instructions to manage the CDN detailed in the README?

#### Security

- 🔴 Are TLS/SSL certificates setup for all Internet-facing services?
- 🔴 Are instructions around managing TLS/SSL certificates detailed in the README?
- 🔴 Is the certificate renewal process detailed in the README?
- 🔴 Does the infrastructure lie within a VPC?
- 🔴 Are all the ingress/egress network rules tuned to only allow necessary access?
- 🔴 Are all the necessary keys/hashes set to sensible defaults?
- 🔴 Is a standard password hashing algorithm being used?
- 🔴 Are instance access instructions detailed in the README?
- 🔴 Do all web api calls which deal with sensitive information require authentication?
- 🔴 Do web api calls only return information associated to the authenticated user who made the requests?

#### Infrastructure

- 🔴 Does the README detail this infrastructure requirements and configuration?

#### Database

- 🔴 Are DB backups enabled?
- 🔴 Is the DB and snapshots encrypted at rest?
- 🔴 Are the DB passwords stored securely and not in code?
- 🔴 Is public access to the DB restricted?
- 🔴 Is the DB restoration process detailed in the README?

#### Errors

- 🔴 Does the code follow good error-handling practices?
- 🔴 Are error messages descriptive and meaningful?
- 🔴 Do end-users see formatted error messages and not stacktraces?
- 🔴 Are runtime errors captured using Bugsnag?
- 🔴 Are source maps being uploaded to Bugsnag?
- 🔴 Does the team have access to Bugsnag?
- 🔴 Is Bugsnag connected to this repo's respective monitor channel on Slack?
- 🔴 Are solutions to common errors detailed within the README's troubleshooting section?

#### Logging

- 🔴 Are errors being logged?
- 🔴 Are logs stored within AWS Cloudwatch?
- 🔴 Is the log data conducive to debugging?
- 🔴 Is only key event or relevant information being logged, is over-logging avoided?
- 🔴 Do the logs follow a certain structure and is it consistent throughout the codebase?
- 🔴 Is the logging process detailed in the README?

#### Secrets

- 🔴 Are secrets stored securely, outside of the source-code?
- 🔴 Are necessary secrets (not values) detailed in the README?
- 🔴 Is the location and owner of the secrets specified in the README?
- 🔴 Is viewing/editing secrets access-controlled and audit-logged?

#### Scripts

- 🔴 Does the `package.json` file have scripts defined for development and testing?
- 🔴 Are any other defined scripts detailed in the README?

#### Code

- 🔴 Is the code well-structured and easy to reason about?
- 🔴 Are linters present and configured appropriately?
- 🔴 Is a code standard followed and is it specified in the README?
- 🔴 Are large parts of code commented-our or dead code avoided?

#### Services

- 🔴 Are all services detailed in the README?
- 🔴 For each service, is the owner, price, usage and access instructions detailed in the README?
- 🔴 For any service that SovTech has setup/subscribed to - has it been requested and cleared through Product Advance?

## Meta

| Version | Author                       | Date       |
| ------- | ---------------------------- | ---------- |
| 0.0.2   | Yatin Badal <yatin@sov.tech> | 17/03/2020 |
