import mongoose from 'mongoose';
// checked
let isConnected = false; // in order to help track the connections

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true); // to prevent errors in console

  if (isConnected) {
    console.log('=> MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'prompt_this',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // if the connection is successful, then we will set isConnected to true
    isConnected = true;
    console.log('=> MongoDB Connected!');
  } catch (error) {
    console.log('=> MongoDB connection error: ', error);
  }
};
