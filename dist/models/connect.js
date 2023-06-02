"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connectDatabase = async () => {
    try {
        await (0, mongoose_1.connect)(process.env.MONGODB_URI || '', {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
        });
        console.log(`Mongodb connected with server`);
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }
};
exports.default = connectDatabase;
