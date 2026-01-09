import superadminModel from "./models/superadminModel.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// (2) Databse Connection
const connectDb = async () => {
  try {
    const connect_db = await mongoose.connect(process.env.DATABASE_URL);
    console.log(
      "Database Connected Sucessfully : ",
      connect_db.connection.host,
      ":",
      connect_db.connection.port,
      ", Database :",
      connect_db.connection.name
    );
  } catch (error) {
    console.log("Database Error: ", error.message);
  }
};

// (3) CreateSuperadmins and loaded into database
const createSuperAdmins = async () => {
  const superadminsList = [
    {
      username: "Mohamed",
      email: "mdirreef@gmail.com",
      role: "superadmin",
      password: "123",
    },
    {
      username: "Mohan",
      email: "mohan@gmail.com",
      role: "superadmin",
      password: "1234",
    },
  ];

  try {
    await Promise.all(       //await and Promise.all() will wait until the map get over and then it move to
      superadminsList.map(async (superadmin) => {
        let email = superadmin.email;
        let isExisting = await superadminModel.findOne({ email });
        if (isExisting) {
          return console.log(
            "Not Added: This Superadmin Id is Already Stored - ",
            superadmin.username
          );
          
        }
        let newSuperAdmin = {
          ...superadmin,
          password: await bcrypt.hash(superadmin.password, 10),
        };
        let newSuperAdminModel = new superadminModel(newSuperAdmin);
        return await newSuperAdminModel.save();
      })
    );
  } catch (error) {
    return console.error("Superadmin Error: ", error);
  }
};

// (1)
async function main() {
  await connectDb(); //2
  await createSuperAdmins(); //3
  console.log("Superadmins data successfully loaded"); //4
  mongoose.connection.close(); //5 - close the mongoose connection
  process.exit(0); //6 exit
}

main(); // this will run first 1
