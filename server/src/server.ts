import { config } from './config/config';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

const router = express()

mongoose
    .connect(config.mongo.url)
    .then(() => {
        console.log('Connected to mongoDB')
        startServer()
    })
    .catch((err) => {
        console.log("Unable to connect to:")
        console.log(err)
    });


const startServer = () => {
    router.use((req, res, next) => {
        console.log(`Incoming method: [${req.method}] - url: [${req.url}] IP: [${req.socket.remoteAddress}]`)

        res.on('finish', () => {
            console.log(`Incoming method: [${req.method}] - url: [${req.url}] IP: [${req.socket.remoteAddress}] - status: [${res.statusCode}]`)
        })

        next();
    })

    router.use(express.urlencoded({ extended: true }))
    router.use(express.json())

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if(req.method == 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GEt');
            return res.status(200).json({})
        }
        next()
    })
}