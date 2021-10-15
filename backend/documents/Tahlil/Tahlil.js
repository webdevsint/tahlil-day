const data=require('./data.json'),{nanoid:nanoid}=require("nanoid"),path=require("path"),fs=require("fs"),database=data.db;

class Entry {
    constructor(wisher, wish) {
      this.id = nanoid();
      this.wisher = wisher;
      this.wish = wish;
    }
  }

  const addEntry = (wisher, wish) => {
    database.push(new Entry(wisher, wish));
  };

const removeEntry=e=>{database.splice(e,1)},save=()=>{let e={db:database};fs.writeFileSync(path.resolve(__dirname,"data.json"),JSON.stringify(e,null,2))};module.exports={database:database,addEntry:addEntry,removeEntry:removeEntry,save:save};