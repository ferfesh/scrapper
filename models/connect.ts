import { connect } from "mongoose";

const connectDatabase = async () => {
  try {
    await connect(process.env.MONGODB_URI || '', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    console.log(`Mongodb connected with server`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default connectDatabase;