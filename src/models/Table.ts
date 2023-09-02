import mongoose, { Schema, Document } from 'mongoose';

interface ITable extends Document {
  table_name: string;
  num_chair: number;
  allocated: number;
  left: number;
}

const tableSchema = new Schema<ITable>({
  table_name: String,
  num_chair: Number,
  allocated: Number,
  left: Number,
});

const Table = mongoose.model<ITable>('Table', tableSchema);

export default Table;
