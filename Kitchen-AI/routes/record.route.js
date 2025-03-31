import {Router} from 'express'
// import authMiddleware from '../middleware/auth.js'
import Record from '../models/record.model.js'

const router = Router();

// Helper function to fetch records within a time range
const getRecordsByTimeRange = async (startDate, endDate) => {
    try {
        const records = await Record.find({
            createdAt: { $gte: startDate, $lt: endDate }
        });

        const itemQuantityMap = {};

        records.forEach(record => {
            record.items.forEach(({ name, quantity }) => {
                if (!itemQuantityMap[name]) {
                    itemQuantityMap[name] = { quantity: 0, isWaste: false };
                }
                itemQuantityMap[name].quantity += quantity;

                if (record.isWaste) {
                    itemQuantityMap[name].isWaste = true;
                }
            });
        });

        return itemQuantityMap;
    } catch (error) {
        console.error("❌ Error fetching records:", error);
        throw error;
    }
};


// Helper function to get start date
const getStartDate = (days) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);
    startDate.setHours(0, 0, 0, 0);
    return startDate;
};

// 📌 Get Records for 1 Week
router.post('/weekrecord', async (req, res) => {
    try {
        const startDate = getStartDate(7);
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        const itemQuantityMap = await getRecordsByTimeRange(startDate, endDate);
        res.status(200).json(itemQuantityMap);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// 📌 Get Records for 1 Month
router.post('/monthrecord', async (req, res) => {
    try {
        const startDate = getStartDate(30);
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        const itemQuantityMap = await getRecordsByTimeRange(startDate, endDate);
        res.status(200).json(itemQuantityMap);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// 📌 Get Records for 1 Year
router.post('/yearrecord', async (req, res) => {
    try {
        const startDate = getStartDate(365);
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        const itemQuantityMap = await getRecordsByTimeRange(startDate, endDate);
        // console.log(itemQuantityMap)
        res.status(200).json({itemQuantityMap});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.post('/todayrecord', async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        const itemQuantityMap = await getRecordsByTimeRange(startDate, endDate);
        // console.log(itemQuantityMap)
        res.status(200).json({data:itemQuantityMap});
    } catch (error) {
        res.status(500).json({ message: error });
    }
});



router.post("/putrecord", async (req, res) => {
    try {
        console.log('putrecord');
        let { itemsData: requestData, isWaste } = req.body;

        console.log("Received Data:", requestData, isWaste); 

        // ✅ Handle missing requestData
        if (!requestData || typeof requestData !== 'object') {
            return res.status(400).json({ message: "Invalid itemsData format" });
        }

        // ✅ Ensure requestData.items exists before accessing it
        requestData = requestData.items || {};

        // Convert input JSON to array of objects [{ name: "apple", quantity: 2 }, ...]
        const itemsArray = Object.entries(requestData).map(([name, quantity]) => ({
            name,
            quantity
        }));

        console.log("Processed Items Array:", itemsArray);

        // ✅ Handle empty array case
        if (itemsArray.length === 0) {
            return res.status(400).json({ message: "No valid items found" });
        }

        // Create a new record
        const newRecord = new Record({
            items: itemsArray,
            isWaste // Boolean value indicating if it's waste or fresh
        });

        // Save to DB
        await newRecord.save();

        res.status(201).json({ message: "✅ Record saved successfully", data: newRecord });
    } catch (error) {
        console.error("🚨 Error saving record:", error);
        res.status(500).json({ message: "Server error" });
    }
});



export default router