var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.0.1:27017/";




MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("SingingPolyglot");
  setInterval(() => {
    let genres = ["R&B","Pop","Rap/Hip-hop","Rock","Soul","Classical","Metal","Techno","EDM","Jazz"];
    let languages  = ["English","Spanish","French","German","Russian", "Japanese", "Korean", "Chinese", "Turkish", "Italian","Arabic"];
    let countries  = ["England","Spain", "Mexico", "Puerto Rico", "France", "Belgium", "Nigeria", "Ivory Coast", "Argentina", "Germany", "Austria", "Russia", "Ukraine", "Belarus", "Japan", "Korea", "China", "Taiwan", "Turkey", "Italy", "Saudi Arabia", "Egypt", "Algeria"];
    // let randomGenres = Math.floor(Math.random() * (genres.length-1))
    // let randomGenres2 = Math.floor(Math.random() * (genres.length-1))
    // let randomGenres3 = Math.floor(Math.random() * (genres.length-1))
    // let randomLanguages = Math.floor(Math.random() *(languages.length-1) )
    // let randomLanguages2 = Math.floor(Math.random() *(languages.length-1) )
    // let randomLanguages3 = Math.floor(Math.random() *(languages.length-1) )
    // let randomCountry = Math.floor(Math.random() * (countries.length-1))
    let randomArtist = {};
    for(let i = 0; i < 10500; i++){
        let randomGenres = Math.floor(Math.random() * (genres.length-1))
        let randomGenres2 = Math.floor(Math.random() * (genres.length-1))
        let randomGenres3 = Math.floor(Math.random() * (genres.length-1))
        let randomLanguages = Math.floor(Math.random() *(languages.length-1) )
        let randomLanguages2 = Math.floor(Math.random() *(languages.length-1) )
        let randomLanguages3 = Math.floor(Math.random() *(languages.length-1) )
        let randomCountry = Math.floor(Math.random() * (countries.length-1))
        let randomNum = Math.floor(Math.random() * 10001);

        randomArtist.Name = "Artist " + i;
        randomArtist.Country = countries[randomCountry];
        randomArtist.Genres = [];
        randomArtist.Genres.push(genres[randomGenres]);
        randomArtist.Genres.push(genres[randomGenres2]);
        randomArtist.Genres.push(genres[randomGenres3]);
        randomArtist.Languages = [];
        randomArtist.Languages.push(languages[randomLanguages]);
        randomArtist.Languages.push(languages[randomLanguages2]);
        randomArtist.Languages.push(languages[randomLanguages3]);
        randomArtist.Description = randomArtist.Name + " makes good music that you will enjoy.";
    }
      dbo.collection("Artists").insertOne(randomArtist, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        // db.close();
        });

      console.log(randomArtist.Name + " was added to db.");
    }, 500);
  });