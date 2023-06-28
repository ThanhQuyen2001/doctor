const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://quyen090401:123456a%40@cluster0.atvuf3c.mongodb.net/doctor',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            },
        );
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
