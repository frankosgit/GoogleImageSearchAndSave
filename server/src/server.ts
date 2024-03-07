import { config } from './config/config';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

const router = express()

mongoose
.connect(config.mongo.url)
.then(() => {
    console.log('connected')
})
.catch((err) => {
    console.log(err)
})