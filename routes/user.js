const {update,deleteUser,GetUser, GetAll}=require('../controllers/users');

const express=require('express');

const router=express.Router();

router.route('/:id').put(update).delete(deleteUser).get(GetUser);
router.route('/').get(GetAll);


module.exports=router;