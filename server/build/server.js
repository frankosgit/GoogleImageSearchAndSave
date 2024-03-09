"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./routes/User"));
const router = (0, express_1.default)();
mongoose_1.default
    .connect(config_1.config.mongo.url)
    .then(() => {
    console.log('Connected to mongoDB');
    startServer();
})
    .catch((err) => {
    console.log("Unable to connect to:");
    console.log(err);
});
const startServer = () => {
    router.use((req, res, next) => {
        console.log(`Incoming method: [${req.method}] - url: [${req.url}] IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            console.log(`Incoming method: [${req.method}] - url: [${req.url}] IP: [${req.socket.remoteAddress}] - status: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GEt');
            return res.status(200).json({});
        }
        next();
    });
    router.use('/user', User_1.default);
    /* healthcheck */
    router.get('/ping', (req, res, next) => {
        res.status(200).json({ message: 'pong' });
    });
    /* error handling */
    router.use((req, res, next) => {
        const error = new Error('not found');
        console.log(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => console.log(`server is up and running on ${config_1.config.server.port}`));
};
