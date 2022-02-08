const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    UserSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    });
UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    }
});


exports.User = mongoose.model('User', UserSchema);



