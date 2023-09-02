import express, { Request, Response, Router } from 'express';
import CustomerQueue from '../models/CustomerQueue'; 
import Table from '../models/Table';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const customerQueues = await CustomerQueue.find();
    res.json(customerQueues);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching CustomerQueue records' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const customerQueue = await CustomerQueue.findById(req.params.id);
    if (!customerQueue) {
      return res.status(404).json({ error: 'CustomerQueue not found' });
    }
    res.json(customerQueue);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching CustomerQueue record' });
  }
});

router.post('/add-headcount', async (req: Request, res: Response) => {
  try {
    const { headCount } = req.body;

    const numTables = await Table.countDocuments();

    const firstTable = await Table.findOne();
    const numChairsPerTable = firstTable?.num_chair || 0;

    const totalSeats = numTables * numChairsPerTable;

    let tablesNeeded = Math.ceil(headCount / numChairsPerTable);

    await CustomerQueue.deleteMany({});

    let numberOfCustomersInQueue = 0;

    if (headCount < totalSeats) {
      tablesNeeded = Math.max(Math.ceil(headCount / numChairsPerTable), 1);
    } else {
      numberOfCustomersInQueue = headCount - totalSeats;
    }

    const tables = await Table.find().limit(tablesNeeded);
    console.log({
      tables
    })

    if (numberOfCustomersInQueue === 0) {
      const aloneCustomer = headCount % numChairsPerTable;

      if (aloneCustomer > 0) {
        tables.forEach(async (table, index) => {
          if (index === tables.length - 1) {
            await Table.updateOne({ _id: table._id }, { allocated: aloneCustomer, left:  numChairsPerTable - aloneCustomer });
          } else {
            await Table.updateOne({ _id: table._id }, { allocated: numChairsPerTable, left: 0 });
          }
        });
      } else {
        tables.forEach(async (table, index) => {
          await Table.updateOne({ _id: table._id }, { allocated: numChairsPerTable, left: 0 });
        });
      }
    } else {
      await Table.updateMany({}, { allocated: numChairsPerTable, left: 0 });

      const lastCustomerQueue = await CustomerQueue.findOne({}, {}, { sort: { queueNumber: -1 } });
      const lastQueueNumber = lastCustomerQueue ? lastCustomerQueue.queueNumber : 0;

      for (let i = 1; i <= numberOfCustomersInQueue; i++) {
        const queueNumber = lastQueueNumber + i;
        const customerName = `customer_${queueNumber}`;

        await CustomerQueue.create({ name: customerName, queueNumber });
      }
    }

    res.json({ message: 'Headcount added successfully' });
  } catch (error) {
    console.error('Error adding headcount:', error);
    res.status(500).json({ error: 'Error adding headcount' });
  }
});

export default router;