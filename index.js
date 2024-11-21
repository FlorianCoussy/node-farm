const fs = require("fs");
const http = require("http");

const PORT = 8000;

const products = fs.readFileSync(`${__dirname}/models/data.json`, "UTF-8");
const productsObj = JSON.parse(products);

const overviewView = fs.readFileSync(`${__dirname}/views/overview.html`, "UTF-8");
const productPageView = fs.readFileSync(`${__dirname}/views/product-page.html`, "UTF-8");
const productRecordView = fs.readFileSync(`${__dirname}/views/product-record.html`, "UTF-8");

const generateView = (template, placeholders, data) => {
  return data.map((product) => {
    let recordView = template;
    for ([placeholder] of placeholders) {
      const placeholderKey = placeholder.substring(1, placeholder.length-1);
      recordView = recordView.replace(placeholder, product[placeholderKey]);
    }
    return recordView;
  });
}

const server = http.createServer((req, res) => {
  const { url: path } = req;

  switch (path) {
    case "/":
    case "/overview":
      res.writeHead(200, { "Content-Type": "text/html" });
      const placeholders = Array.from(productRecordView.matchAll(/{\w*}/g));
      const productsView = generateView(productRecordView, placeholders, productsObj);
      res.end(overviewView.replace("{products}", productsView));
      break;
    case "/product":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(productPageView);
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

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});