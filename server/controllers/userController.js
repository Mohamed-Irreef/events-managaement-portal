import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import superadminModel from "../models/superadminModel.js";
import nodemailer from "nodemailer";

export const userRegister = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ status: false, message: "Missing Details" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ status: false, message: "User already exist" });
    }
    const hassedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, email, password: hassedPassword, role };
    const newUserModel = new userModel(newUser);
    await newUserModel.save();
    res
      .status(201)
      .json({ status: true, role, message: "Registration Successfull" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Registration Error" });
  }
};

export const userLogin = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ status: false, message: "Missing Details" });
  }
  try {
    const user =
      (await userModel.findOne({ email })) ||
      (await superadminModel.findOne({ email }));
    if (!user) {
      return res.status(409).json({ status: false, message: "User not exist" });
    }
    if (user.role !== role) {
      return res
        .status(409)
        .json({ status: false, message: `you are not ${role}` });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(409)
        .json({ status: 409, message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    return res
      .status(200)
      .json({ status: true, message: "Loggedin Successfull", role });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Login Error" });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(400)
        .json({ status: false, message: "Token not found", attempt: "logout" });
    }
    res.clearCookie("token");
    res.status(200).json({ status: true, message: "logged out" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Logout Error" });
  }
};

export const getAllStudents = async (req, res) => {
  const allUsers = await userModel.find();
  if (!allUsers) {
    return res
      .status(409)
      .json({ status: false, message: "No Students data found" });
  }
  try {
    const studentsList = allUsers.filter((user) => {
      if (user.role === "student") {
        return user;
      }
    });

    const alteredStudentsList = studentsList.map((student) => {
      return {
        _id: student._id,
        username: student.username,
        email: student.email,
        password: "********",
        role: student.role,
      };
    });

    res
      .status(200)
      .json({
        status: true,
        message: "User data fetched Successfully",
        students: alteredStudentsList,
      });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Logout Error" });
  }
};

export const getAllAdmins = async (req, res) => {
  const allUsers = await userModel.find();
  if (!allUsers) {
    return res
      .status(409)
      .json({ status: false, message: "No Admins data fonund" });
  }
  try {
    const adminsList = allUsers.filter((user) => {
      if (user.role === "admin") {
        return user;
      }
    });

    const alteredAdminList = adminsList.map((admin) => {
      return {
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        password: "* * * * * * * *",
        role: admin.role,
      };
    });
    res
      .status(200)
      .json({
        status: true,
        message: "User data fetched Successfully",
        admins: alteredAdminList,
      });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Logout Error" });
  }
};

export const getSingleAdmin = async (req, res) => {
  const id = req.params.id;
  // console.log('Single admin id: ',id);
  if (!id) {
    return res.status(409).json({ status: false, message: "Invalid admin Id" });
  }
  try {
    const user = await userModel.findById({ _id: id });

    if (!user || user.role !== "admin") {
      return res.status(409).json({ status: false, message: "No User Exist" });
    }

    const alteredAdmin = {
      _id: user._id,
      username: user.username,
      email: user.email,
      password: "******",
      role: user.role,
    };
    res
      .status(200)
      .json({
        status: true,
        message: "Admin Data fetched Successfully",
        admin: alteredAdmin,
      });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Admin Fetch Error" });
  }
};

export const updateSingleAdmin = async (req, res) => {
  const { username, email, password, role } = req.body;
  const id = req.params.id;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ status: false, message: "Missing Details" });
  }

  const user = await userModel.findById({ _id: id });
  if (!user || user.role !== "admin") {
    return res
      .status(409)
      .json({ status: false, message: "No User Exist, Post failed" });
  }
  // const isEmailExist = await userModel.findOne({email});
  // if(isEmailExist){
  //     return res.status(409).json({status: false, message: 'The same Email Already Exist, Post failed'});
  // }
  try {
    if (password.includes("*")) {
      const pwdGen1 = String(Math.floor(1 + Math.random() * 9));
      const pwdGen2 = String(Math.floor(10 + Math.random() * 90));
      const pwdGen3 = String(Math.floor(100 + Math.random() * 900));
      const finalPwd = `@${pwdGen1}#${pwdGen2}&${pwdGen3}`;
      const hassedPassword = await bcrypt.hash(finalPwd, 10);
      const alteredAdmin = {
        username,
        email,
        password: hassedPassword,
        role,
      };
      const updatedAdmin = await userModel.findByIdAndUpdate(id, alteredAdmin);
      await updatedAdmin.save();

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SENDER_MAIL,
        to: alteredAdmin.email,
        subject: "Password Has been Changed by Super Admin",
        text: `Hi ${alteredAdmin.username} (Admin), Super Admin of Edunex Portal has changed your password. your new password is ${finalPwd}, Dont Share with anyone. For any queries please contact your super admin. Don't Reply to this mail. Thank you so much`,
      };
      await transporter.sendMail(mailOptions);

      return res
        .status(200)
        .json({
          status: 200,
          message: `Admin changes updated and new password : ${finalPwd}`,
        });
    }
    const hassedPassword = await bcrypt.hash(password, 10);
    const alteredAdmin = {
      username,
      email,
      password: hassedPassword,
      role,
    };
    const updatedAdmin = await userModel.findByIdAndUpdate(id, alteredAdmin);
    await updatedAdmin.save();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_MAIL,
      to: alteredAdmin.email,
      subject: "Your Bio has been Updated - Edunex Super Admin",
      text: `Hi ${alteredAdmin.username} (Admin), Super Admin of Edunex Portal has updated your data. your password is ${password}, Dont Share with anyone. For any queries please contact your super admin. Don't Reply to this mail. Thank you so much`,
    };
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({
        status: 200,
        message: `Admin changes updated and New Password : ${password}`,
      });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Admin Update Error" });
  }
};

export const getSingleStudent = async (req, res) => {
  const id = req.params.id;
  // console.log('Single student id: ',id);
  if (!id) {
    return res
      .status(409)
      .json({ status: false, message: "Invalid Student Id" });
  }
  try {
    const user = await userModel.findById({ _id: id });
    if (!user || user.role !== "student") {
      return res
        .status(409)
        .json({ status: false, message: "No student Exist" });
    }
    const alteredStudent = {
      _id: user._id,
      username: user.username,
      email: user.email,
      password: "******",
      role: user.role,
    };
    res
      .status(200)
      .json({
        status: true,
        message: "student Data fetched Successfully",
        student: alteredStudent,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "student Fetch Error" });
  }
};

// UPDATE SINGLE STUDENT
export const updateSingleStudent = async (req, res) => {
  const { username, email, password, role } = req.body;
  const id = req.params.id;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ status: false, message: "Missing Details" });
  }

  const user = await userModel.findById({ _id: id });
  if (!user || user.role !== "student") {
    return res
      .status(409)
      .json({ status: false, message: "No User Exist, Post failed" });
  }

  // const isEmailExist = await userModel.findOne({email});
  // if(isEmailExist){
  //     return res.status(409).json({status: false, message: 'The same Email Already Exist, Post failed'});
  // }
  try {
    if (password.includes("*")) {
      const pwdGen1 = String(Math.floor(1 + Math.random() * 9));
      const pwdGen2 = String(Math.floor(10 + Math.random() * 90));
      const pwdGen3 = String(Math.floor(100 + Math.random() * 900));
      const finalPwd = `@${pwdGen1}#${pwdGen2}&${pwdGen3}`;
      const hassedPassword = await bcrypt.hash(finalPwd, 10);
      const alteredStudent = {
        username,
        email,
        password: hassedPassword,
        role,
      };
      const updatedStudent = await userModel.findByIdAndUpdate(
        id,
        alteredStudent
      );
      await updatedStudent.save();

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SENDER_MAIL,
        to: alteredStudent.email,
        subject: "Password Has been Changed by Edunex Management",
        text: `Hi ${alteredStudent.username} (Student), Edunex Portal Management has changed your password. your new password is ${finalPwd}, Dont Share with anyone. For any queries please contact your super admin or superadmin. Don't Reply to this mail. Thank you so much`,
      };
      await transporter.sendMail(mailOptions);

      return res
        .status(200)
        .json({
          status: 200,
          message: `Student changes updated and new password : ${finalPwd}`,
        });
    }

    const hassedPassword = await bcrypt.hash(password, 10);
    const alteredStudent = {
      username,
      email,
      password: hassedPassword,
      role,
    };
    const updatedStudent = await userModel.findByIdAndUpdate(
      id,
      alteredStudent
    );
    await updatedStudent.save();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_MAIL,
      to: alteredStudent.email,
      subject: "Your Bio has been Updated - Edunex Management",
      text: `Hi ${alteredStudent.username} (Student), Edunex Portal Management has updated your data. your password is ${password}, Dont Share with anyone. For any queries please contact your super admin. Don't Reply to this mail. Thank you so much`,
    };
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({
        status: 200,
        message: `Student changes updated and new password : ${password}`,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Student Update Error" });
  }
};

export const adminDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteAdmin = await userModel.findByIdAndDelete({ _id: id });

    if (!deleteAdmin) {
      return res
        .status(404)
        .json({ status: false, message: "Admin not found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Admin Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Admin Deletion Error" });
  }
};

export const studentDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteStudent = await userModel.findByIdAndDelete({ _id: id });

    if (!deleteStudent) {
      return res
        .status(404)
        .json({ status: false, message: "Student not found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Student Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Student Deletion Error" });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userData =
      (await userModel.findById({ _id: id })) ||
      (await superadminModel.findById({ _id: id }));
    return res
      .status(200)
      .json({
        status: true,
        message: "single user data fetched successfully",
        user: {
          username: userData.username,
          role: userData.role,
          email: userData.email,
        },
      });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "User fetch Error" });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const userCounts = await userModel.countDocuments();
    const adminsCounts = await userModel.countDocuments({ role: "admin" });
    const studentsCounts = await userModel.countDocuments({ role: "student" });
    const superadminsCounts = await superadminModel.countDocuments({
      role: "superadmin",
    });
    return res
      .status(200)
      .json({
        status: true,
        message: "Dashboard fetched successfully",
        counts: { userCounts, adminsCounts, studentsCounts, superadminsCounts },
      });
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Count fetch Error" });
  }
};

