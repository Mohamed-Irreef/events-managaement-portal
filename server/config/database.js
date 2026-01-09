import mongoose from "mongoose";


const connectDb = async () => {
  try {
    const connect_db = await mongoose.connect(process.env.DATABASE_URL);
    console.log('Database Connected Sucessfully : ', connect_db.connection.host,':',connect_db.connection.port, ', Database :', connect_db.connection.name);
  } catch (error) {
    console.log('Database Error: ', error.message);
    
  }
};

export default connectDb;