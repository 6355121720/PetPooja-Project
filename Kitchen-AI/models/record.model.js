// import {Schema, model} from 'mongoose'

// const recordSchema = new Schema({
//     'itemSet': [{
//         type: Schema.Types.ObjectId,
//         ref: "Item",
//         required: false
//     }],
//     'isWaste': {
//         type: Boolean,
//         default: false
//     }
// }, {'timestamps': true})

// const Record = model("Record", recordSchema)

// export default Record


import { Schema, model } from "mongoose";

const itemSchema = new Schema({
    name: { type: String, required: true },  // Item name (e.g., "apple")
    quantity: { type: Number, required: true, default: 1 }  // Quantity (e.g., 2)
});

const recordSchema = new Schema({
    items: [itemSchema],  // Array of items
    isWaste: { type: Boolean, default: false }  // Indicates if the items are spoiled/wasted
}, { timestamps: true });

const Record = model("Record", recordSchema);

export default Record;
