const mongoose = require('mongoose');

async function connect() {
    try {
        const uri =
            process.env.DATABASE_URL ||
            'mongodb+srv://quyen090401:123456a@@cluster0.atvuf3c.mongodb.net/doctor';
        console.log(uri, 'uri');
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!', error);
    }
}

module.exports = { connect };
