import { createConnection, DataSource } from 'typeorm';
import { Group } from './group';
import { Member } from './member';
import { Pay } from './pay';
import { Bill } from './bill';
import { Dutch } from './dutch';

class Source {
  private source;
  constructor() {
    this.source = new DataSource({
      type: 'react-native',
      database: 'donjo',
      location: 'default',
      logging: ['error', 'query', 'schema'],
      synchronize: true,
      // dropSchema: true,
      migrationsRun: false,
      entities: [Member, Group, Pay, Bill, Dutch],
    });
  };
  async init() {
    await this.source.initialize()
      .then(() => {
          console.log("Data Source has been initialized!")
      })
      .catch((err) => {
          console.error("Error during Data Source initialization", err)
      });

    return this.source;
  }
  getAppDataSource() {
    return this.source;
  }
}

const AppDataSource = new Source();
AppDataSource.init();

export {
  Group,
  Member,
  Pay,
  Bill,
  Dutch,
}

export default AppDataSource.getAppDataSource();
