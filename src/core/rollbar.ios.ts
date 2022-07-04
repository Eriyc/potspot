import {Client, Configuration} from 'rollbar-react-native';
const config = new Configuration('f08e92b0b7444355ac7b98427c6a3db4', {
  endpoint: 'https://api.rollbar.com/api/1/item/',
  logLevel: 'info',
  payload: {
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: '0.ios',
      },
    },
  },
});
export const rollbar = new Client(config);
