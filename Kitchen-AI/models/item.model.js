import {Schema, model} from 'mongoose'


const itemSchema = Schema({
    name: {
        required: true,
        type: String
    },
    quantity:{
        type: Number,
        default: 0
    },
}, {
    timestamp: true
})

const Item = model("Item", itemSchema)

export default Item