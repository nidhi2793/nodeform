const http = require("http");
const fs = require("fs");
let msg = "";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("message.txt", { encoding: "utf-8" }, (err, data) => {
      console.log(err);
      res.write("<html>");
      res.write("<head><title>Enter Message</title></head>");
      res.write(
        `<body><h1>${data}<h1> </br> <form action='/message' method='POST'><input type='text' name='message'/><button type='submit'>Send</button></form></body>`
      );
      res.write("</html");
      return res.end();
    });
  }
  if (req.url === "/message" && req.method == "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
      msg = message;
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
});

server.listen(4000);
