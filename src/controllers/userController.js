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

async function deleteUser(req, res) {
  try {
    userModel.destroy({
      where: { id: req.params.id },
    });
    const user = await userModel.findByPk(req.params.id);
    if (user === null) {
      res.status(404).json({
        status: 404,
        msg: "There's no user with this id",
      });
    }
    res.status(200).json({
      status: 200,
      msg: "User Deleted",
    });
  } catch (error) {}
}
async function updateUser(req, res) {
  try {
    const payload = req.body;
    const id = req.params.id;
    const { name, tempatLahir, date } = payload;
    const user = await userModel.findByPk(id);
    await userModel.update(
      {
        name,
        tempatLahir,
        date,
      },
      { where: { id: id } }
    );
    if (user === null || id === null) {
      res.status(404).json({
        status: "fail",
        msg: "There's no user with this id",
      });
    }
    res.status(201).json({
      status: "Success",
      msg: "Update user berhasil",
      data: req.body,
    });
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "There is a problem",
    });
    console.log(error);
  }
}
async function updatePasswordUser(req, res) {
  try {
    const payload = req.body;
    const { email, oldpassword, newpassword } = payload;
    const user = await userModel.findOne({ where: { email: email } });
    await userModel.update(
      {
        password: newpassword,
      },
      { where: { email: email } }
    );
    console.log(user);
    console.log(user.password);
    if (user === null ) {
      res.status(404).json({
        status: "fail",
        msg: "There's no user with this email",
      });
    }
    if (req.email !== email) {
      res.status(403).json({
        status: "Fail",
        msg: "This email isn't yours",
      });
    }
    if (oldpassword !== user?.password) {
      res.status(403).json({
        status: "Fail",
        msg: "password lama tidak cocok",
      });
    }
    if (newpassword === user?.password) {
      res.status(403).json({
        status: "Fail",
        msg: "password sudah pernah digunakan",
      });
    }

    res.status(201).json({
      status: "Success",
      msg: "Update user berhasil",
    });

    console.log(req.id);
  } catch (error) {
    res.status(403).json({
      status: "Fail",
      msg: "There is a problem",
    });
    console.log(error);
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
