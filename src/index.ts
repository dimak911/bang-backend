import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import mongoose from 'mongoose';

import { runSeeders } from './seeder';
import 'dotenv/config';
import { SetupSocketServer } from './config/socket.config';
import { DB_PASSWORD, DB_USER, MONGODB_URI } from './config';

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const server = createServer(app);

app.get('/', async (req, res) => {
  res.send('Works!');
});

const io = SetupSocketServer(server);

async function run() {
  await mongoose.connect(MONGODB_URI, {
    auth: {
      username: DB_USER,
      password: DB_PASSWORD,
    },
  });

  console.log(
    '\x1b[32m%s\x1b[0m',
    'You successfully connected to MongoDB! 👨‍🚀👨‍🚀👨‍🚀👨‍🚀👨‍🚀👨‍🚀👨‍🚀👨‍🚀👨‍🚀',
  );

  runSeeders(mongoose.connection.db);

  server.listen(PORT, () => {
    console.log(
      '\x1b[32m%s\x1b[0m',
      `Server running at port ${PORT} 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀`,
    );
  });
}

run().catch(console.dir);
