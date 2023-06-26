module.exports = {
    mutipleToClient: function (mongooses) {
        return mongooses.map((mongoose) => {
            let data = mongoose.toObject();
            data.id = data._id;
            delete data._id;
            return data;
        });
    },
    toClient: function (mongoose) {
        let data = mongoose.toObject();
        data.id = data._id;
        delete data._id;
        return data;
    },
};
