//Setting up database
import Dexie from "dexie";

class WordDatabase extends Dexie {
  lastUpdate: Dexie.Table<ILastUpdate, number>;
  word: Dexie.Table<IWord, number>; // number = type of the primkey
  category: Dexie.Table<ICategory, number>;
  bookmark: Dexie.Table<IBookmark, number>;
  constructor() {
    super("WordDatabase");
    this.version(1).stores({
      lastUpdate: "++id,LastUpdate",
      category: "CategoryID,Title,IsFree,LastUpdate,Status,CustomOrder",
      word: "WordID,CategoryID,Fa,Ar,ReferTo,Dialect,LastUpdate,CustomOrder",
      bookmark: "++id,WordID",
    });
    this.lastUpdate = this.table("lastUpdate");
    this.word = this.table("word");
    this.category = this.table("category");
    this.bookmark = this.table("bookmark");
  }
}

let db = new WordDatabase();

export default db;

declare global {
  interface ILastUpdate {
    LastUpdate: number;
  }
  interface IWord {
    WordID: number;
    CategoryID: number;
    Fa: string;
    Ar: string;
    ReferTo: number;
    Example: string;
    Type: number;
    Dialect: number;
    LastUpdate: number;
    SoundVersiona: number;
    Status: string;
  }
  interface ICategory {
    CategoryID: number;
    Title: string;
    Icon: string;
    CustomOrder: number;
    IsFree: number;
    LastUpdate: number;
    SoundVersion: number;
    Status: number;
  }
  interface IBookmark {
    WordID: number;
  }
}
