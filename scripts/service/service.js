"use strict";function service1(){var router=express.Router();router.get("/",function(req,res){var teste=res.json({message:"hooray! welcome to our api!"});console.log(teste)}),app.use("/api",router)}Object.defineProperty(exports,"__esModule",{value:!0});var express=require("express"),app=express();exports.service1=service1;
//# sourceMappingURL=service.js.map