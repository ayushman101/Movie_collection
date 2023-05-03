const express=require('express');
const router=express.Router();

const {createMovie,updateMovie, getMovie, getAllMovies, deleteMovie, getRandom}=require('../controllers/Movie')

router.route('/').post(createMovie).get(getAllMovies);
router.route('/find/:id').put(updateMovie).get(getMovie).delete(deleteMovie);
router.route('/random').get(getRandom)

module.exports=router;