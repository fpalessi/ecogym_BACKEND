import mongoose from "mongoose";

const connect = async () => {
  const dbUri: string = process.env.MONGO_URI as string;

  try {
    await mongoose.connect(dbUri);
    console.log("Db Connected");
  } catch (error) {
    console.log("Coudnt connect");
    process.exit(1);
  }
};

export default connect;
