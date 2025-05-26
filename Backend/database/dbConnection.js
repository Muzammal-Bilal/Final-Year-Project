import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"Lung_Cancer_Detection_System"
    }).then(()=>{
        console.log("Database connected successfully")
    }).catch(err=>{
        console.log(`Error occured while connecting to database ${err}`)
    })
}

