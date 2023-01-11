const greet = "hello";

function angka(value) {
  if (value !== 5) {
    return `${value}, itu bukan angka 5`;
  } else {
    return `ini angka ${value}`;
  }
}

const cek = (value) => {
  if (value % 2 === 0){
      return `${value} adalah angka genap`
  } else {
      return `${value} adalah angka ganjil`
  }
};
module.exports = { greet, angka, cek };
