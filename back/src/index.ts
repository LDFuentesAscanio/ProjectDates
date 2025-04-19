import { PORT } from './config/env';
import server from './server';

server.listen(PORT, () => {
  console.log(`server listen on port: ${PORT}`);
});
