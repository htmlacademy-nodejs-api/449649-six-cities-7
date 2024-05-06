import got from 'got';
import { Command } from './command.interface.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';
import { TMockServerData } from '../../shared/types/mock-server-data.types.js';

export class GenerateCommand implements Command {
  private initialData: TMockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);
    const queue = [];
    for (let i = 0; i < offerCount; i++) {
      queue.push(tsvFileWriter.write(tsvOfferGenerator.generate()));
    }

    await Promise.all(queue);
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    if (!count || isNaN(Number(count))) {
      throw new Error('Invalid count provided. Please provide a valid number.');
    }
    const offerCount = Number.parseInt(count, 10);

    if (!filepath || typeof filepath !== 'string' || filepath.trim() === '') {
      throw new Error('Invalid filepath provided. Please provide a valid filepath.');
    }

    if (!url || typeof url !== 'string' || !url.startsWith('http://') && !url.startsWith('https://')) {
      throw new Error('Invalid URL provided. Please provide a valid URL.');
    }

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      console.error(getErrorMessage(error));
    }
  }
}
