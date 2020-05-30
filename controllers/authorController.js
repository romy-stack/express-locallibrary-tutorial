var Author=require('../models/author');

var async=require('async');
var Book=require('../models/book');
const{body,validationResult}=require('express-validator/check');
const{sanitizeBody}=require('express-validator/filter');
//Display list of all authors
exports.author_list=function(req,res,next){
  Author.find().populate('author').sort([['family_name','ascending']])
  .exec(function(err,list_authors){
      if(err){return next(err);}
      res.render('author_list',{title:'Author List',author_list:list_authors});
  });

};
//Display details of specific authors
exports.author_detail=function(req,res,next){
  async.parallel({
   author:function(callback){
       Author.findById(req.params.id).exec(callback)
   },
    author_books:function(callback){
        Book.find({'author':req.params.id},'title summary')
    },
},function(err,results){
if (err) return next (err);

if(results.author==null){
  var err=new Error('Author not found');
  err.status=404;
  return next(err);
}
 
 
res.render('author_detail',{title:'Author Detail',author:results.author,author_books:results.author_books})
});
}

//handle  author create form on get
exports.author_create_get=function(req,res){
    res.send('Not implemented -create post')
}
//handle  author create form on post
exports.author_create_post=function(req,res){
    res.send('Not implemented -create post')
}
//handle  author delete form on get
exports.author_delete_get=function(req,res){
    res.send('Not implemented -delete get')
}
//handle  author delete form on post
exports.author_delete_post=function(req,res){
    res.send('Not implemented -delete post')
}

//display  author update form on get
exports.author_update_get=function(req,res){
    res.send('Not implemented -delete get')
}
//handle  author update form on post
exports.author_update_post=function(req,res){
    res.send('Not implemented -delete post')
}



