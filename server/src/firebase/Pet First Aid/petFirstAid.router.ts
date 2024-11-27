
const express = require("express");
const { getPetFirstAid } = require("./petFirstAid.controller"); 

const router = express.Router();


router.get("/pet-first-aid", getPetFirstAid);


export default router;
