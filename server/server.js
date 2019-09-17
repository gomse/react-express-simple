import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';

const development = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 4000;

const server = express();

if (development) {
  server.use(morgan('dev'));
} else {
  server.use(morgan('combined'));
}

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(methodOverride());

server.listen(port, () => console.log(`Server listening on port ${port}, ${process.env.NODE_ENV} mode.`));

export default server;
