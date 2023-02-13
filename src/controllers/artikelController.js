const artikelModel = require("../models").artikel;
const { Op } = require("sequelize");

async function getArtikel(req, res) {
  try {
    // const { id } = req.id;
    const { title, dari_tahun, sampai_tahun   } = req.query;
    const data = await artikelModel.findAll({
      attributes: [
        "id",
        ["userId", "user_id"],
        ["title", "judul"],
        ["year", "tahun"],
        ["description", "deskripsi"],
      ],
      where: {
        year: { [Op.between]: [dari_tahun, sampai_tahun] },
      },
    });
    console.log(data);
    // console.log(id);
    res.status(201).json({
      status: "Success",
      msg: "Data Ditemukan ",
      jumlah_data: data.length,
      data: data,
      // query: title,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      msg: "Data Tidak Ditemukan ",
      //   data: artikel,
    });
    console.log(error);
  }
}

// async function getArtikel(req, res) {
//   try {
//     // const { id } = req.id;
//     const data = await artikelModel.findAll({ where: { userID: req.id } });
//     console.log(data);
//     // console.log(id);
//     res.status(201).json({
//       status: "Success",
//       msg: "Data Ditemukan ",
//       jumlah_data: data.length,
//       data: data,
//     });
//   } catch (error) {
//     res.status(404).json({
//       status: "fail",
//       msg: "Data Tidak Ditemukan ",
//       //   data: artikel,
//     });
//     console.log(error);
//   }
// }

async function updateArtikel(req, res) {
  try {
    const id = req.params.id;
    const artikel = await artikelModel.findOne({
      where: { id: id },
    });
    const payload = req.body;
    const { title, description, year } = payload;
    await artikelModel.update(
      {
        title,
        description,
        year,
      },
      { where: { id: id } }
    );

    console.log(req.id);
    // console.log(id);
    if (artikel === null) {
      res.json({
        status: "Fail",
        msg: "Tidak ada artikel dengan id ini",
      });
    } else if (artikel.userID !== req.id) {
      res.json({
        status: "Fail",
        msg: "Artikel ini bukan ditulis oleh anda, anda tidak dapat mengubahnya",
      });
    } else {
      res.status(200).json({
        status: "Success",
        msg: "Data Diubah",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function deleteArtikel(req, res) {
  try {
    const id = req.params.id;
    const artikel = await artikelModel.findOne({
      where: { id: id },
    });
    console.log(req.id);
    // console.log(id);
    if (artikel === null) {
      res.json({
        status: "Fail",
        msg: "Tidak ada artikel dengan id ini",
      });
    } else if (artikel.userID !== req.id) {
      res.json({
        status: "Fail",
        msg: "Artikel ini bukan ditulis oleh anda, anda tidak dapat menghapusnya",
      });
    } else {
      artikelModel.destroy(artikel);
      res.status(200).json({
        status: "Success",
        msg: "Data Terhapus",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function createArtikel(req, res) {
  try {
    const payload = req.body;
    const { title, year, description } = payload;
    await artikelModel.create({
      title,
      year,
      description,
      userID: req.id,
    });
    res.status(201).json({
      status: "Success",
      msg: "Your article has been posted",
      data: payload,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      msg: "Something went wrong",
      err: error,
    });
  }
}

async function createInBulk(req, res) {
  try {
    const { payload } = req.body;
    payload.map((items, index) => {
      items.userID = req.id;
    });

    await artikelModel.bulkCreate(payload);
    res.status(201).json({
      status: "Success",
      msg: "Your article has been posted",
      payload,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      msg: "Something went wrong",
      err: error,
    });
  }
}

async function createMulti(req, res) {
  try {
    const { payload } = req.body;
    let success = 0;
    let fail = 0;
    let jumlah = payload.length;
    await Promise.all(
      payload.map(async (items, index) => {
        try {
          await artikelModel.create({
            title: items.title,
            year: items.year,
            description: items.description,
            userID: req.id,
          });
          success = success + 1;
        } catch (error) {
          fail = fail + 1;
        }
      })
    );
    res.status(201).json({
      status: "Success",
      msg: `Success post ${success} articles from ${jumlah} articles with ${fail} fail`,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      msg: "Something went wrong",
      err: error,
    });
  }
}
async function deleteMulti(req, res) {
  try {
    const { payload } = req.body;
    let success = 0;
    let fail = 0;
    let jumlah = payload.length;
    await Promise.all(
      payload.map(async (items, index) => {
        try {
          const title = await artikelModel.findOne({
            where: { id: items.id },
          });
          if (title.userID !== req.id) {
            return (fail = fail + 1);
          }
          success = success + 1;
          await artikelModel.destroy({
            where: { id: items.id },
          });
          console.log(title);
        } catch (error) {
          console.log(error);
        }
      })
    );
    res.status(200).json({
      status: "Success",
      msg: `Success delete ${success} articles from ${jumlah} articles with ${fail} fail`,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      msg: "Something went wrong",
      err: error,
    });
  }
}

module.exports = {
  createArtikel,
  getArtikel,
  deleteArtikel,
  deleteMulti,
  updateArtikel,
  createInBulk,
  createMulti,
};
