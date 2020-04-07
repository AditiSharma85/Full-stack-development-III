const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        event: {
            type: String
        },
        sender: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

let Event = mongoose.model("EventIn", eventSchema);

module.exports = Event;
