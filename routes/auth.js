const express=require('express');
const register = require('../controllers/register');
const login = require('../controllers/login')

const router=express.Router();

//REGISTER 
router.route('/register').post(register);

//LOGIN
router.route('/login').post(login);

module.exports=router;