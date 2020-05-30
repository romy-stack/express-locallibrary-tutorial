var mongoose=require('mongoose');
var moment=require('moment');
var Schema=mongoose.Schema;
var BookSchema=new Schema(
    {
        title:{type:String,required:true},
        author:{type:Schema.Types.ObjectId,ref:'Author',required:true},
        summary:{type:String,required:true},
        isbn:{type:String,required:true},
        genre:[{type:Schema.Types.ObjectId,ref:'Genre'}]
    }
);

//Virtual for book's URL
BookSchema.virtual('url').get(function(){


    return '/catalog/book/'+this._id;
});

BookSchema.virtual('bookdate').get(function(){
    return this.date_of_birth?moment(this.date_of_birth).format('YYYY-MM-DO'):'';
})
module.exports=mongoose.model('Book',BookSchema);