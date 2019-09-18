import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';

const development = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 4000;
const appName = process.env.APP;

const server = express();

if (development) {
  server.use(morgan('dev'));
} else {
  server.use(morgan('combined'));
}

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(methodOverride());

server.use(`/${appName}`, express.static(path.resolve(__dirname, appName)));
server.use(`/${appName}/*`, (req, res) => {
  res.sendFile(path.resolve(__dirname, appName, 'index.html'));
});

server.listen(port, () => console.log(`Server listening on port ${port}, ${process.env.NODE_ENV} mode.`));

export default server;
