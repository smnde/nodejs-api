import express from "express";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT;
const database = process.env.DB_DATABASE;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const accessToken = process.env.ACCESS_TOKEN;

export { app, port, database, dbUsername, dbPassword, dbHost, express, accessToken };