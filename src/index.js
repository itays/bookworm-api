import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import auth from './routes/auth';
import dotenv from 'dotenv';
dotenv.config();

/* Database */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL);
const monDb = mongoose.connection;
monDb.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that is running');
});

monDb.on('open', () => {
  console.info('Connected to mongodb:');
});

const app = express();

app.use(bodyParser.json());
app.use('/api/auth', auth);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('running on localhost:8080'));
