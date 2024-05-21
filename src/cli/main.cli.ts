#!/usr/bin/env node
import 'reflect-metadata';
import { ImportCommand } from './commands/import.command.js';
import { CLIApplication, GenerateCommand, HelpCommand, VersionCommand } from './index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand()
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
