const documents = require("../documents");
const fs = require("fs");

const name = "Tahlil";
const imports = fs.readFileSync("../utils/imports.txt", "utf8");
const functions = fs.readFileSync("../utils/functions.txt", "utf8");

const template = `\n\nclass Entry {
    constructor(wisher, wish) {
      this.id = nanoid();
      this.wisher = wisher;
      this.wish = wish;
    }
  }

  const addEntry = (wisher, wish) => {
    database.push(new Entry(wisher, wish));
  };\n\n`;

const document = imports + template + functions;

if (documents.includes(name) === true) {
  console.log("Document already exists!");
} else {
  documents.push(name);
  console.log(documents);

  (() => {
    fs.mkdir(name, () => {
      fs.writeFileSync(`./${name}/${name}.js`, document);
      fs.writeFileSync(`./${name}/data.json`, `{"db":[]}`);
      fs.writeFileSync(
        "../documents.js",
        `const documents=[${documents
          .map((i) => `'${i}'`)
          .join(",")}];module.exports=documents;`
      );
    });
  })();

  console.log("Document created!");
}
