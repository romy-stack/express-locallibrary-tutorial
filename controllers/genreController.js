var genre=require('../models/genre');
var mongoose=require('mongoose');
var Book=require('../models/book')
var async=require('async');
const validator=require('express-validator');
exports.genre_list=function(req,res,next){
  genre.find().populate('genre').sort([['name','ascending']])
  .exec(function(err,list_genre){
     if(err){return next(err);}
     res.render('genre_list',{title:'Genre List',genre_list:list_genre})
  });
};

exports.genre_detail=function(req,res,next){
  // var id=mongoose.Types.ObjectId(red.params.id);
  async.parallel({
    genre:function(callback){
      genre.findById(req.params.id).exec(callback);
    },
    genre_books:function(callback){
      Book.find({'genre':req.params.id})
      .exec(callback);
    },
  },function(err,results){
      if(err){return next(err);}
      if(results.genre==null){//no result
        var err=new Error('Genre not found');
        err.status=404;
        return next(err);

      }
      res.render('genre_detail',{title:'Genre Detail',genre:results.genre,genre_books:results.genre_books});
    
    
  });
};

  exports.genre_delete_get=function(req,res){
    res.send('NOT implemented:genre delete get');
  };
  exports.genre_delete_post=function(req,res){
    res.send('NOT implemented:genre delete post');
  };

  exports.genre_create_get=function(req,res,next){
    res.render('genre_form',{title:'Create Genre'}); 
  };
  exports.genre_create_post=function(req,res){
   validator.body('name','Genre name required').trim().isLength({min:1}),
  
   validator.sanitizeBody('name').escape(),
  (req,res,next)=>{
    const errors=validator.validationResult(req);

    var genre=new genre(
       {name:req.body.name}
    );
 

  if(!errors.isEmpty()){
    res.render('genre_form',{title:'Create Genre',genre:genre,errors:errors.array()});
    return;
  }else{
genre.findOne({'name':req.body.name}).exec(function(err,found_genre){
  if(err){return next(err);}
  if(found_genre){
      res.redirect(found_genre.url);
  }
  else{
    genre.save(function(){
      if(err){return next(err);}
      res.redirect(genre.url);
    });
  }
})
}
}
  }; 
  
  exports.genre_edit_get=function(req,res){
    res.send('NOT implemented:genre create get');
  };
  exports.genre_edit_post=function(req,res){
    res.send('NOT implemented:genre create post');
  };
