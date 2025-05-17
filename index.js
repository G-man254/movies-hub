import express from "express";
import {fileURLToPath} from "url";
import path from "path";

let app = express();

let port = 4000;

//construct path to html file
let __fileName = fileURLToPath(import.meta.url);
console.log({__fileName});

let __dirName = path.dirname(__fileName);
console.log({__dirName});

//set up templating
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirName, "public")));

//Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirName, "public", "index.html"));
    // res.send('Home page')
});

//route for movies
app.get('/movie', async(req, res) => {
    // res.sendFile(path.join(__dirName, "public", "movie.html"));
    let movieResponse = await fetch("https://api.themoviedb.org/3/discover/movie", {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
          },
    });
    let movieData = await movieResponse.json();
    console.log({movieData});
    res.render("movies", { data: movieData.results });
    // res.json(movieData);

    // res.send('Home page')
});

//route each movie
app.get("/movie/:id", async (req, res) =>{
    let id = req.params.id;
    // if (!/^\d+$/.test(id)) {
    //     return res.status(400).send("Invalid movie ID.");
    //   }
    //   next();
    // if (!id || typeof id !== 'string' || id.length < 1 || id.includes('.')) {
    //     return res.status(400).send("Invalid movie ID.");
    // };      
    console.log({id});
    let movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzIzNzUyN2JhMzZjYzk1MDYxODQ5NTUzN2E4NWVmZiIsIm5iZiI6MTczOTYxMDAwMC44OTQsInN1YiI6IjY3YjA1NzkwNGZkZGZkNTJlMzM1YWIzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.az51CIFJYlpLrpM08lzZ7JGc6U74M5g0sZnEK6x6nIg',
          },
    });
    let movie = await movieResponse.json();
    console.log({movie});
    res.render("movie", {data: movie});
});

//route for series
app.get('/series', async(req, res) => {
    // res.sendFile(path.join(__dirName, "public", "movie.html"));
    let seriesResponse = await fetch("https://api.themoviedb.org/3/discover/tv", {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzIzNzUyN2JhMzZjYzk1MDYxODQ5NTUzN2E4NWVmZiIsIm5iZiI6MTczOTYxMDAwMC44OTQsInN1YiI6IjY3YjA1NzkwNGZkZGZkNTJlMzM1YWIzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.az51CIFJYlpLrpM08lzZ7JGc6U74M5g0sZnEK6x6nIg'
          }
    });
    let seriesData = await seriesResponse.json();
    console.log({seriesData});
    res.render("series", { data: seriesData.results });
    // res.json(movieData);

    // res.send('Home page')
});

//route for individual series
app.get("/series/:id", async (req, res) =>{
    let id = req.params.id;
    // if (!/^\d+$/.test(id)) {
    //     return res.status(400).send("Invalid movie ID.");
    //   }
    //   next();
    // if (!id || typeof id !== 'string' || id.length < 1 || id.includes('.')) {
    //     return res.status(400).send("Invalid movie ID.");
    // };      
    console.log({id});
    let seriesResponse = await fetch(`https://api.themoviedb.org/3/tv/${id}`, {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzIzNzUyN2JhMzZjYzk1MDYxODQ5NTUzN2E4NWVmZiIsIm5iZiI6MTczOTYxMDAwMC44OTQsInN1YiI6IjY3YjA1NzkwNGZkZGZkNTJlMzM1YWIzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.az51CIFJYlpLrpM08lzZ7JGc6U74M5g0sZnEK6x6nIg',
          },
    });
    let series = await seriesResponse.json();
    console.log({series});
    res.render("seriesOne", {data: series});
});

//app.get('/series', (req, res) => {
    //res.sendFile(path.join(__dirName, "public", "series.html"));
    // res.send('Home page')
//});

//link static files
app.use(express.static("public"));
// app.use(express.static(path.join(__dirName, "public")));


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
  