var BookInstance=require('../models/bookinstance');
var async=require('async');
//Display list of all BookInstances.
exports.bookinstance_list=function(req,res,next){
  BookInstance.find().populate('book').exec(function(err,list_bookinstances){
  if(err){return next(err);}
     //successful, so render
     res.render('bookinstance_list',{title:'Book Instance List',bookinstance_list:list_bookinstances})
  })
};

//Display detail page for a specific BookInstance.
exports.bookinstance_detail=function(req,res,next){
 BookInstance.findById(req.params.id).populate(book).exec(function(err,bookinstance){
     if(err){return next(err);}
     if(bookinstance==null){
         var err=new Error("Book Copy not found");
         err.status=404;
         return next(err);
     } 
     res.send('bookinstance_detail',{title:'Copy:'+bookinstance.title,bookinstance:bookinstance})
 })
    //   res.send('NOT implemented:Bookinstance detail:'+req.params.id);
};

exports.bookinstance_create_get=function(req,res){
    res.send('NOT implemented:Bookinstance create GET');
};

exports.bookinstance_create_post=function(req,res){
    res.send('NOT implemented:Bookinstance create GET');
};

exports.bookinstance_delete_get=function(req,res){
    res.send('NOT implemented:Bookinstance delete GET');
};
exports.bookinstance_delete_post=function(req,res){
    res.send('NOT implemented:Bookinstance delete POST');
};

exports.bookinstance_update_get=function(req,res){
    res.send('NOT implemented:Bookinstance update GET');
};
exports.bookinstance_update_post=function(req,res){
    res.send('NOT implemented:Bookinstance update POST');
};