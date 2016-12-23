var express = require('express');
var router = express.Router();

var blogCrtl = require('../controllers/blog');

/* GET home page. */
router.post('/blog',blogCrtl.newBlog);
router.get('/blog',blogCrtl.getBlog);
router.get('/blog/:blogid',blogCrtl.getIdBlog);
router.put('/blog/:blogid',blogCrtl.updateBlog);
router.delete('/blog/:blogid',blogCrtl.deleteBlog);

module.exports = router;
