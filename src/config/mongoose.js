import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI

class Database {
    connection

    constructor() {
        if (mongoUri) {
            this.connection = mongoose.connect(mongoUri,
                {},
                ()=>{
                    console.log("connected to mongodb")
                })
        } else {
            console.log("Failed to connect to MongoDB")
        }
    }
}

export default new Database()