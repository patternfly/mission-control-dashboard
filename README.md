This is project uses [PatternFly](https://patternfly.org/) and [Next.js](https://nextjs.org/) to build a CI Dashboard for monitoring build status.

## Getting Started

To get started you will need to have node.js version 20.0.0 or higher installed on your machine. You can download node.js [here](https://nodejs.org/en/download/).

After installing node.js you should enable corepack by running `corpack enable` in your terminal.

## Building and development
The following commands can be run in the root of the project:
```bash
yarn install # Install dependencies

yarn start # Runs the development server

yarn build # Builds the app for production

yarn lint # Lints the code
```

## Environment Variables
In order to run the app you will need to create a `.env.local` file in the root of the project and add the following environment variables:

```bash
GH_TOKEN= # Github token for accessing the Github API
```

To get a Github token you can follow the instructions [here](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token).

## Github Repositiories
Currently the github repositories are hardcoded in the `app/ReleaseStatusTable.tsx` file. In the future this will be moved to a configuration file (e.g. environment variable).

After starting the development server. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
