import express, { Request, Response, Router } from 'express';
import Table from '../models/Table';
import CustomerQueue from '../models/CustomerQueue';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tables' });
  }
});

router.post('/add-tables', async (req, res) => {
  try {
    const { numTables, numChairsPerTable } = req.body;

    if (!Number.isInteger(numTables) || !Number.isInteger(numChairsPerTable) || numTables <= 0 || numChairsPerTable <= 0) {
      return res.status(400).json({ error: 'Invalid input. Please provide valid numbers for numTables and numChairsPerTable.' });
    }

    const tablesData = [];
    await Table.deleteMany({});
    await CustomerQueue.deleteMany({});

    for (let i = 1; i <= numTables; i++) {
      const tableName = `table_${i}`;
      const tableData = {
        table_name: tableName,
        num_chair: numChairsPerTable,
        allocated: 0,
        left: numChairsPerTable,
      };
      tablesData.push(tableData);
    }

    const insertedData = await Table.insertMany(tablesData);

    res.json({ message: 'Tables added successfully', data: insertedData });
  } catch (error) {
    console.error('Error adding tables:', error);
    res.status(500).json({ error: 'Error adding tables' });
  }
});

export default router;