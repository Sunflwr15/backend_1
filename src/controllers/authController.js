const userModel = require("../models").users;
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../mail");
require("dotenv").config;

async function register(req, res) {
  try {
    const payload = req.body;
    const { name, email, password, role } = payload;
    // let hashPassword = await bcrypt.hashSync(password, 10);
    await userModel.create({
      name,
      email,
      password,
      role
    });
    res.json({
      status: "Success",
      msg: "You have been registered",
    });
  } catch (error) {
    res.status(403).json({
      status: "Failed",
      msg: "Failure",
    });
    console.log(error);
  }
}

async function login(req, res) {
  try {
    const payload = req.body;
    const { email, password } = payload;
    const user = await userModel.findOne({
      where: {
        email: email,
      },
    });
    if (user === null) {
      res.status(403).json({
        status: "Failed",
        msg: "Email tidak ditemukan, silahkan daftar",
      });
    }
    if (password === null || password !== user.password) {
      res.status(403).json({
        status: "Failed",
        msg: "Email & password tidak cocok",
      });
    }
    // const verify = await bcrypt.compareSync(password, user.password);
    // if (!verify) {
    //   res.status(403).json({
    //     status: "Failed",
    //     msg: "Email & password tidak cocok",
    //   });
    // }
    const token = jwt.sign(
      {
        id: user?.id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SCRIPT,
      { expiresIn: "7d" }
    );
    res.json({
      status: "Success",
      msg: "Logged in",
      token: token,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      msg: "Something went wrong",
      error: error,
    });
  }
}

async function lupaPassword(req, res) {
  try {
    const { email } = req.body;

    // Find User
    const user = await userModel.findOne({ where: { email: email } });
    if (user === null) {
      res.json({
        status: "Fail",
        msg: "User tidak ditemukan",
      });
    }
    // Find Token
    const currentToken = await forgotPasswordModel.findOne({
      where: {
        userId: user.id,
      },
    });
    if (currentToken !== null) {
      forgotPasswordModel.destroy({ where: { userId: user.id } });
    }
    const token = crypto.randomBytes(32).toString("hex"); // Membuat Token
    const date = new Date();
    const expire = date.setHours(date.getHours() + 1);

    await forgotPasswordModel.create({
      userId: user.id,
      token: token,
      expiredDate: dayjs(expire).format("YYYY-MM-DD HH:mm:ss"),
    });

    ///
    const link = `${process.env.MAIL_CLIENT_URL}reset-password/${user.id}/${token}`;
    const context = {
      link,
    };
    const sendMail = await sendEmail(email, "Lupa Password", "Forgot", context);
    if (sendMail === "Success") {
      res.json({
        status: "Success",
        msg: "Silahkan Periksa Email Masuk",
      });
    } else {
      res.status(400).json({
        status: "Fail",
        msg: "Email tidak terkirim, silahkan gunakan email terdaftar.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Fail",
    });
  }
}

async function resetPasswordByMail(req, res) {
  try {
    const { id, token } = req.params;
    const { newpassword } = req.body;
    const user = await forgotPasswordModel.findOne({
      where: { userId: id, token: token },
    });

    if (user === null) {
      res.json({
        status: "Fail",
        msg: "Token & Id Undefined",
      });
    }
    let userExpired = user.expiredDate;
    let expire = dayjs(Date());
    let difference = expire.diff(userExpired, "hour");
    if (difference !== 0) {
      res.json({
        status: "Fail",
        msg: "Token has expired",
      });
    }
    await userModel.update(
      {
        password: newpassword,
      },
      { where: { id: user.userId } }
    );

    await forgotPasswordModel.destroy({
      where: { userId: user.userId },
    });
    res.json({
      status: "Success",
      msg: "Password berhasil diubah",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Fail",
    });
  }
}

module.exports = { register, login, lupaPassword, resetPasswordByMail };
