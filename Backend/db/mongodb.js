import mongoose from "mongoose";

const mongodb_connection =  async () => {
    try {
        await mongoose.connect(
          "mongodb+srv://pratham:Vaja1234@cluster0.a9ji1gh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log('mongodb connected')
    } catch (error) {
        console.log(error)
    }
}


export default mongodb_connection