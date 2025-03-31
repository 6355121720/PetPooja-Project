import mongoose from 'mongoose'


const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/kitchen`)
        console.log('MongoDB successfully Connected!')
    } catch(err){
        console.log(err)
    }
}


export default connectDB