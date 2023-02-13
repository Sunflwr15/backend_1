const productModel = require("../models").product;

async function getProduk(req, res) {
  try {
    const produk = productModel.findAll();
    console.log(produk);
    res.json({
      status: "success",
      msg: "item ditemukan",
      jumlah_data: produk.length,
      data: produk,
    });
  } catch (error) {
    res.status(403).json({
      status: "fail",
      msg: "item tidak ditemukan",
    });
  }
}

async function postProduk(req, res) {
  try {
    const payload = req.body;
    const { nama, harga, stok, deskripsi, lokasi } = payload;
    const product = await productModel.create({
      name: nama,
      price: harga,
      stock: stok,
      deskripsi: deskripsi,
      location: lokasi,
    });
    res.status(201).json({
      status: 201,
      msg: "Succes",
      data: payload,
    });
  } catch (error) {}
}
module.exports = { getProduk, postProduk };
