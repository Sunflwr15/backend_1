const port = 1505;
const host = "localhost";
const exp = require("./hello.js");
const http = require("http");
const moment = require("moment");
const dayjs = require("dayjs");
const server = http.createServer((req, res) => {
  const url = req.url;
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (url === "/") {
    res.write(
      JSON.stringify({
        status: 200,
        response: {
          saying: exp.greet,
        },
      })
    );
  }
  if (url === "/dayjs") {
    res.write(
      JSON.stringify({
        status: 200,
        response: {
          dayJS: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        },
      })
    );
  }
  res.end();
});
//   .listen(port, host, () => {
//       console.log(`Server Running at http://${host}:${port}`);
//   });

server.listen(port, host, () => {
  console.log(`Server is Running at http://${host}:${port}`);
});
