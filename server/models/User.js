import mongoose from 'mongoose';
const { Schema } = mongoose; 

const UserSchema = new Schema({
    FirstName: {type: String, required:['first name field required']},
    LastName: { type: String, required:['last name field required']},
    email: { type: String, required:['email required'] },
    password: { type: String, required:['password required'] }
},
{timestamps: true}
)

export default new mongoose.model('User', UserSchema);
