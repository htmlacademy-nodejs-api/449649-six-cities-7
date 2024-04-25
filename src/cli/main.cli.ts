import { ImportCommand } from './commands/import.command.js';
import { CLIApplication, HelpCommand, VersionCommand } from './index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand()
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
