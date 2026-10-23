import mongoose from 'mongoose';

export const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    console.error('MONGO_URL is missing. Set it in the Render environment variables.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: 'to-do_db',
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
