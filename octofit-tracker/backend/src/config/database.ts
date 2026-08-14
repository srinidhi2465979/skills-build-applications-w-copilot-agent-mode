import mongoose from 'mongoose';
import config from './index';

/**
 * Connect to the octofit_db database
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      retryWrites: true,
      w: 'majority',
    });
    console.log(`✓ Connected to MongoDB at ${config.MONGODB_URI}`);
    console.log(`✓ Running in ${config.ENVIRONMENT} environment`);
    console.log(`✓ Base URL: ${config.BASE_URL}`);
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✓ Disconnected from MongoDB');
  } catch (error) {
    console.error('✗ MongoDB disconnection error:', error);
  }
};

export default mongoose;
