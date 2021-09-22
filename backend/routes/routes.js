const express = require("express");
const aes256 = require("aes256");
const router = express.Router();
const path = require("path");
require("dotenv").config();

const config = require("../dbconfig");
const documents = require("../documents/documents");

class Import {
  constructor(document) {
    const {
      database,
      addEntry,
      removeEntry,
      save,
    } = require(`../documents/${document}.js`);
    this.database = database;
    this.addEntry = addEntry;
    this.removeEntry = removeEntry;
    this.save = save;
  }
}

if (
  config.collection === "" ||
  documents.includes(config.collection) === false
) {
  console.log("Document not found!");
  process.exit(0);
}

let persons = new Import(config.collection);

const apiKey = process.env.API_KEY;
const key = process.env.KEY;

// GUI overview
router.get("/", (req, res) => {
  if (
    req.query.document === "" ||
    documents.includes(req.query.document) === false
  ) {
    console.log("Document not found!");
    res.status(500).send("Document not found!");
  } else {
    persons = new Import(req.query.document);
    if (req.query.api_key === "" || req.query.api_key !== apiKey) {
      res.status(400).send("Invalid API Key!");
    } else {
      const response = [];
      // Decrypting the values
      persons.database.forEach((item) => {
        class Decryption {
          constructor(text) {
            const encryptedText = text;
            this.decryptedText = aes256.decrypt(key, encryptedText);
          }
        }
        const wisher = new Decryption(item.wisher).decryptedText;
        const wish = new Decryption(item.wish).decryptedText;

        const object = {
          id: item.id,
          wisher: wisher,
          wish: wish,
        };

        response.push(object);
      });

      res.render("index", { database: response });
    }
  }
});

// Database API
router.get("/api", (req, res) => {
  if (
    req.query.document === "" ||
    documents.includes(req.query.document) === false
  ) {
    console.log("Document not found!");
    res.status(500).send("Document not found!");
  } else {
    if (req.query.api_key === "" || req.query.api_key !== apiKey) {
      res.status(400).send("Invalid API Key!");
    } else {
      const response = [];
      // Decrypting the values
      persons.database.forEach((item) => {
        class Decryption {
          constructor(text) {
            const encryptedText = text;
            this.decryptedText = aes256.decrypt(key, encryptedText);
          }
        }
        const wisher = new Decryption(item.wisher).decryptedText;
        const wish = new Decryption(item.wish).decryptedText;

        const object = {
          id: item.id,
          wisher: wisher,
          wish: wish,
        };

        response.push(object);
      });

      res.json(response);
    }
  }
});

// Adding a new entry
router.get("/add", (req, res) => {
  if (
    req.query.document === "" ||
    documents.includes(req.query.document) === false
  ) {
    console.log("Document not found!");
    res.status(500).send("Document not found!");
  } else {
    if (req.query.api_key === "" || req.query.api_key !== apiKey) {
      res.status(400).send("Invalid API Key!");
    } else {
      res.render("add", { apiKey, document: req.query.document });
    }
  }
});

router.post("/add", (req, res) => {
  if (
    req.query.document === "" ||
    documents.includes(req.query.document) === false
  ) {
    console.log("Document not found!");
    res.status(500).send("Document not found!");
  } else {
    if (req.query.api_key === "" || req.query.api_key !== apiKey) {
      res.status(400).send("Invalid API Key!");
    } else {
      class Encryption {
        constructor(text) {
          const plainText = text;
          const nameBuffer = Buffer.from(plainText);
          this.encryptedText = aes256.encrypt(key, plainText);
        }
      }
      const wisher = new Encryption(req.body.wisher).encryptedText;
      const wish = new Encryption(req.body.wish).encryptedText;

      persons.addEntry(wisher, wish);
      persons.save();

      res.send("entry added!");
    }
  }
});

// Removing an entry
router.get("/remove", (req, res) => {
  if (req.query.api_key === "" || req.query.api_key !== apiKey) {
    res.status(400).send("Invalid API Key!");
  } else {
    res.sendFile("remove.html", {
      root: path.resolve(__dirname, "../", "views"),
    });
  }
});

router.delete("/remove", (req, res) => {
  if (req.query.api_key === "" || req.query.api_key !== apiKey) {
    res.status(400).send("Invalid API Key!");
  } else {
    persons.removeEntry(req.query.index);
    persons.save();

    res.send("Entry deleted!");
  }
});

module.exports = router;
