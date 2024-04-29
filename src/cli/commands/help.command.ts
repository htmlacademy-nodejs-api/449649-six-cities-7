
import { Command } from './command.interface.js';
import chalk from 'chalk';
export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.log(`
        ${chalk.green('Программа для подготовки данных для REST API сервера.')}
        ${chalk.yellow('Пример:')}
            cli.js --<command> [--arguments]
        ${chalk.yellow('Команды:')}
            --version:                   ${chalk.cyan('# выводит номер версии приложения')}
            --help:                      ${chalk.cyan('# выводит информацию о приложении и доступных командах')}
            --import <path>:             ${chalk.cyan('# импортирует данные из TSV по указанному пути')}
            --generate <n> <path> <url>  ${chalk.cyan('# генерирует n количество тестовых данных из указанного пути в формате TSV и отправляет их на указанный URL')}
    `);
  }
}
