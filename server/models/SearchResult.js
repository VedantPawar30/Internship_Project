const mongoose =require('mongoose');

const searchResults =new mongoose.Schema({
    keyword :{
        type:String,
        required:true,
        unique: true, 
        lowercase: true, 
        trim: true
    },

    wikiData :{
        type: Object
    },

    newsData :{
        type:Array
    },

    redditData :{
        type:Array
    },

    productData :{
        type:Array
    },

    lastUpdated :{
        type:Date,
        default: Date.now(),
    }
})


searchResults.index({ lastUpdated: 1}, {expireAfterSeconds: 86400 });

module.exports =mongoose.model('SearchResult',searchResults);