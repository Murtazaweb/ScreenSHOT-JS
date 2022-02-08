const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    directorySchema = new Schema({
        endpoint: {
            type: String,
            required: true
        },
        _username:{
            type:Schema.Types.ObjectId,
            ref: "User"
        }
       
    }, {
        timestamps: true,
    });


module.exports = mongoose.model('directory', directorySchema);



