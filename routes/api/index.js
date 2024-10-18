const router=require('express').Router();
const noteRouters=require('./notes');

router.use('/notes', noteRouters);

module.exports=router;