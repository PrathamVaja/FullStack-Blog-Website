import mongoose from "mongoose";

const mongodb_connection =  async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Blog");
        console.log('mongodb connected')
    } catch (error) {
        console.log(error)
    }
}


export default mongodb_connection