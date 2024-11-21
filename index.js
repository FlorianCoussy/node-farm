const fs = require("fs");
const http = require("http");
const url = require("url");

const PORT = 8000;

const products = fs.readFileSync(`${__dirname}/models/data.json`, "UTF-8");
const overviewView = fs.readFileSync(`${__dirname}/views/overview.html`, "UTF-8");
const productView = fs.readFileSync(`${__dirname}/views/product-page.html`, "UTF-8");

const server = http.createServer((req, res) => {
  const { url: path } = req;

  if (path === "/" || path === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(overviewView);
  } else if (path === "/product") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(productView);
  } else if (path === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(products);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Page not found!</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});