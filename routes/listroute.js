const express=require('express');
const router=express.Router();
const{createList, deleteList}=require('../controllers/lists');

router.route('/').post(createList);
router.route('/:id').delete(deleteList)

module.exports=router;