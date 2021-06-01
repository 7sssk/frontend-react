import * as express from 'express';
import { join } from 'path';

const app = express();

app.use(express.static(join(__dirname, '..', 'react')));

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
