import app from "./app.js";
// import "./.env"
import connectDB from "./db/db.js"
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });


connectDB()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        console.log(process.env.PORT)
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .then(() =>{
        cloudinary.v2.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key : process.env.CLOUD_API_KEY,
            api_secret : process.env.CLOUD_API_SECRET,
        })
    })
    .catch((err) => {
        console.error(err);
    });