//Setting up database
import Dexie from "dexie";

class WordDatabase extends Dexie {
    lastUpdate: Dexie.Table<ILastUpdate, number>
    word: Dexie.Table<IWord, number>; // number = type of the primkey
    category: Dexie.Table<ICategory, number>;
    search: Dexie.Table<ISearch,number>;
    constructor() {
        super("WordDatabase");
        this.version(1).stores({
            lastUpdate: "LastUpdate",
            category: "CategoryID,Title,IsFree,LastUpdate,Status",
            word: "WordID,CategoryID,Fa,Ar,ReferTo,Dialect,LastUpdate,CustomOrder",
            search:"++id,WordID,Word"
        });
        this.lastUpdate = this.table("lastUpdate");
            this.word = this.table("word");
        this.category = this.table("category");
        this.search = this.table("search");
    }
}

let db = new WordDatabase()

export default db;

declare global {
    interface ILastUpdate { LastUpdate: number }
    interface IWord {
        WordID: number,
        CategoryID: number,
        Fa: string,
        Ar: string,
        ReferTo: number,
        Example: string,
        Type: number,
        Dialect: number,
        LastUpdate: number,
        SoundVersiona: number,
        Status: string,
    }
    interface ICategory {
        CategoryID: number,
        Title: string,
        Icon: string,
        CustomOrder: number,
        IsFree: number,
        LastUpdate: number,
        SoundVersion: number,
        Status: number
    }
    interface ISearch {
        // id:number,
        WordID: number,
        Word: string,
    }
    // type ISearchItem = Omit<ISearch, 'id'>

}
