const userModel = require("../models").users;
async function getUser(req, res) {
  try {
    const user = await userModel.findAll();
    res.json({
      status: "success",
      msg: "Data Ditemukan",
      jumlah: user.length,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "fail",
      msg: "Failure",
    });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await userModel.findByPk(id);
    if (user === null) {
      res.status(404).json({
        status: "fail",
        msg: "There's no user with this id",
      });
    }
    res.json({
      status: "success",
      msg: "Data Ditemukan",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
}
async function getUserByParams(req, res) {
  try {
    const { email } = req.params;
    const user = await userModel.findOne({ where: { email: email } });
    // if (user === null) {
    //   res.status(404).json({
    //     status: "fail",
    //     msg: "There's no user with this id",
    //   });
    // }
    res.json({
      status: "success",
      msg: "Data Ditemukan",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
}

async function createUser(req, res) {
  try {
    const payload = req.body;
    let { name, email, tempatLahir, date } = payload;
    const userCreate = await userModel.create({
      name: name,
      email: email,
      isActive: true,
      tempatLahir: tempatLahir,
      date: date,
    });

    res.status(201).json({
      status: 201,
      msg: "Success",
      data: payload,
    });
  } catch (error) {
    res.status(403).json({
      status: 403,
      msg: "Fail",
      error: error.message,
    });
  }
}


module.exports = {
  getUser,
  createUser,
  deleteUser,
  getUserById,
  getUserByParams,
  updateUser,
  updatePasswordUser,
};
