const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            process.env.DATABASE_URL ||
                'mongodb+srv://quyen090401:123456a@@cluster0.atvuf3c.mongodb.net/?retryWrites=true&w=majority',
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
