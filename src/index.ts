import 'reflect-metadata';
import * as core from '@actions/core';
import cli, { GlobalErrorHandler } from '@ced/cli-dev';

GlobalErrorHandler.set();

const run = async () => {
  const cliToken = core.getInput('cli-token') || process.env['CED_CLI_TOKEN'];
  const sourceEnvironment =
    core.getInput('source-environment') ||
    process.env['CED_SOURCE_ENVIRONMENT'];
  const ephemeralEnvironment =
    core.getInput('ephemeral-environment') ||
    process.env['CED_EPHEMERAL_ENVIRONMENT'];
  const path = core.getInput('path') || process.env['CED_PROJECT_PATH'];

  if (!cliToken) {
    throw new Error(
      `Missing CED CLI token. Provide a CLI token by "cli-token" input parameter or define a variable "CED_CLI_TOKEN".`
    );
  }

  if (!sourceEnvironment) {
    throw new Error(`Missing source-enironment`);
  }

  if (!ephemeralEnvironment) {
    throw new Error(`Missing ephemeral-enironment`);
  }

  console.log(`Source Environment: ${sourceEnvironment}`);
  console.log(`Ephemeral Environment: ${ephemeralEnvironment}`);

  const commands = cli({
    token: cliToken,
    workingPath: path,
    config: {
      useConsoleSpinner: false,
    },
  });

  const environments = await commands.listEnvironments().run();
  console.log(`Existing environments: ${environments.join(', ')}`);

  if (!environments.some((x) => x.name === ephemeralEnvironment)) {
    await commands
      .cloneEnvironment()
      .run(sourceEnvironment, ephemeralEnvironment, undefined, true);
  }

  await commands.pushSource().run();
};

run();
