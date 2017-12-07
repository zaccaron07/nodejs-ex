import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

module.exports = app => {
    app.use(cors({
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type"]
	}));
	app.use(express.static("public"));
    app.use(bodyParser.json({limit:1024102420, type:'application/json'}));
};