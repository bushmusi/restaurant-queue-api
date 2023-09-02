import express, { Application } from 'express';
import connectToDatabase from './db'; 
import bodyParser from 'body-parser';
import tablesRoutes from './routes/tables';
import customerQueueRoutes from './routes/customerQueue';

const app: Application = express();
const port: number = 3001;

connectToDatabase().then(() => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
  app.use(bodyParser.json());
  app.use('/api/tables', tablesRoutes);
  app.use('/api/customer-queues', customerQueueRoutes);


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
