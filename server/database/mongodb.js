import mongoose from 'mongoose';

async function connect(){
    await mongoose.connect(
        'mongodb+srv://bitfumes:bitfumes123@bitfumes-mern.mcu6ng2.mongodb.net/?retryWrites=true&w=majority'
        )
    console.log("mongodb connected")
}

export default connect