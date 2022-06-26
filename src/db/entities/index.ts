import { createConnection, getRepository, Connection } from 'typeorm/browser';
import { Group } from './group';
import { Member } from './member';
import { Pay } from './pay';
import { Bill } from './bill';
import { Dutch } from './dutch';

const connectDB = async () => {
  return await createConnection({
    type: 'react-native',
    database: 'donjo',
    location: 'default',
    logging: ['error', 'query', 'schema'],
    synchronize: true,
    entities: [Member, Group, Pay, Bill, Dutch],
  });
}

export {
  Group,
  Member,
  Pay,
  Bill,
  Dutch
}

export default connectDB;
