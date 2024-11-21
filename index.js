const fs = require("fs");
const http = require("http");
const url = require("url");
const generateView = require("./utils/generateView");

const PORT = 8000;

const products = fs.readFileSync(`${__dirname}/models/data.json`, "UTF-8");
const productsObj = JSON.parse(products);

const overviewView = fs.readFileSync(`${__dirname}/views/overview.html`, "UTF-8");
const productPageView = fs.readFileSync(`${__dirname}/views/product-page.html`, "UTF-8");
const productRecordView = fs.readFileSync(`${__dirname}/views/product-record.html`, "UTF-8");

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  switch (pathname) {
    case "/":
    case "/overview":
      res.writeHead(200, { "Content-Type": "text/html" });
      const productsView = generateView(productRecordView, productsObj);
      res.end(overviewView.replace("{products}", productsView));
      break;
    case "/product":
      res.writeHead(200, { "Content-Type": "text/html" });
      const [productDetailsView] = generateView(productPageView, [productsObj[query.id]]);
      res.end(productDetailsView);
      break;
    case "/api":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(productsObj);
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Page not found!</h1>");
  }
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
