import mongoose, { Schema, Document } from 'mongoose';

interface ICustomerQueue extends Document {
  name: string;
  queueNumber: number;
};


const customerQueueSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  queueNumber: {
    type: Number,
    required: true,
  },
});

const CustomerQueue = mongoose.model<ICustomerQueue>('CustomerQueue', customerQueueSchema);

export default CustomerQueue;