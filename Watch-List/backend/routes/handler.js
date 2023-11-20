// import modules
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require("mongoose");


router.use(bodyParser.urlencoded({extended:false}));

// axios
const axios = require('axios');
//uri
const uri = "mongodb+srv://admin-abdul:JwbicnYkUThiBJke@cluster0.t8dv668.mongodb.net/node_movieapp?retryWrites=true&w=majority"

// Connecting to db
async function connect(){
    try{
        await mongoose.connect(uri)
        console.error("Connected to MongoDB");

    } catch (err){
        console.error(err);
    }
}
connect();

// defining db schema
const movieSchema = new mongoose.Schema({
    title:String,
    status:String,
    rating:Number,
    review:String,
    imageUrl:String
});

const Movie = mongoose.model("Movie", movieSchema);

// watch-list route
router.get('/watch-list', async (req, res) => {
    const movies = await Movie.find({});
    res.send(movies);
});

// top-ten route
router.get('/top-ten', async (req, res) => {
    const movies = await Movie.find({}).sort({rating: -1}).limit(12);
    res.send(movies);
});

// getting img url through IMDB api by name
async function getUrl(title){
    const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/auto-complete',
    params: {q: title},
    headers: {
      'X-RapidAPI-Key': 'bb00e0aaa9msh7d9f2efeca9f5d2p126532jsn41991b975e03',
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
  };
  
  // request to api using axios
  try {
      const response = await axios.request(options);
      console.log(response.data.d[0].i.imageUrl);
      return(response.data.d[0].i.imageUrl);
  } catch (error) {
      console.error(error);
      return(error)
  }

}

// addMovie route
router.post('/addMovie', async (req, res) => {
    
    // check if movie already in db
    const movie = await Movie.where({title: req.body.title}).findOne();

    if (movie) {
        console.log(movie) 
        console.log("Movie already in your list!") 
        return res.send("Movie already in your list!");
     } else {
        // get image url through api
        const url = await getUrl(req.body.title)

    // add movie to db
    const newMovie = new Movie({
        title: req.body.title,
        status: req.body.status,
        rating: req.body.rating,
        review: req.body.review,
        imageUrl: url
        
    });
    console.log(newMovie);
    newMovie.save();

    return res.send("200");
    } 
})

// updateMovie route
router.post('/updateMovie', async (req, res) => {

    console.log(req.body);
    
    // make the update.. if failed.. item not in db
    const updateRes = await Movie.updateOne({title: req.body.title}, {$set:{status: req.body.status, rating: req.body.rating, review: req.body.review}});
    //console.log(updateRes);
    console.log(updateRes.matchedCount);
    
    if (updateRes.matchedCount = 0 ) {
        return res.send("Update failed!");
    } else {
        console.log("Update Complete");
        return res.send("Update Successfully!");
    }
    

})

// deleteMovie route
router.post('/deleteMovie', async (req, res) => {
    console.log("Deleting item");
    console.log(req.body);
    const deleteRes = await Movie.deleteOne({title: req.body.title});
    console.log(deleteRes.deletedCount);
    
    // make the delete request .. if failed.. item not in db
    if (deleteRes.deletedCount = 0 ) {
        return res.send("Delete failed!");
    } else {
        console.log("Delete Complete");
        return res.send("Movie Deleted!");
    }

})

// function to populateDB  manually.. with random rating - define mobies to use
async function populateDB(){
for (let i = 0; i < mobies.length; i++) {
    const url = await getUrl(mobies[i].title)

    const newMovie = new Movie({
        title: mobies[i].title,
        status: "Completed",
        rating: Math.floor(Math.random() * 10),
        review: "",
        imageUrl: url
        
    });
    console.log(newMovie);
    newMovie.save();
  }
}

// populateDB();

module.exports = router;