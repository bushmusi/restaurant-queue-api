import mongoose, { ConnectOptions } from 'mongoose';

const dbOptions: ConnectOptions = {   
  authSource: 'admin', 
};

const dbURL = 'mongodb://mongodb:27017/restaurant-queue';

async function connectToDatabase() {
  try {
    await mongoose.connect(dbURL, dbOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default connectToDatabase;
