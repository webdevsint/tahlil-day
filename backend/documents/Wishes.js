const data = require("./Wishes.json");
const { nanoid } = require("nanoid");
const path = require("path");
const fs = require("fs");

const database = data.db;

// Model
class Entry {
  constructor(wisher, wish) {
    this.id = nanoid();
    this.wisher = wisher;
    this.wish = wish;
  }
}

// Adding new entry
const addEntry = (wisher, wish) => {
  database.push(new Entry(wisher, wish));
};

// Remove an item
const removeEntry = (index) => {
  database.splice(index, 1);
};

// Updates database
const save = () => {
  let newDb = {
    db: database,
  };

  fs.writeFileSync(
    path.resolve(__dirname, "Wishes.json"),
    JSON.stringify(newDb, null, 2)
  );
};

module.exports = {
  database,
  addEntry,
  removeEntry,
  save,
};
