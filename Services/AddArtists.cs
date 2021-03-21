using System;
using System.Collections.Generic;
using SingingPolyglot.Models;

namespace SingingPolyglot.Services
{
    public class AddArtists
    {
        public string[] genres = {"R&B","Pop","Rap/Hip-hop","Rock","Soul","Classical","Metal","Techno","EDM","Jazz"};
        public string[] languages  = {"English","Spanish","French","German","Russian", "Japanese", "Korean", "Chinese", "Turkish", "Italian","Arabic"};
        public string[] countries  = {"England","Spain", "Mexico", "Puerto Rico", "France", "Belgium", "Nigeria", "Ivory Coast", "Argentina", "Germany", "Austria", "Russia", "Ukraine", "Belarus", "Japan", "Korea", "China", "Taiwan", "Turkey", "Italy", "Saudi Arabia", "Egypt", "Algeria"};

        private Random randomGenres = new Random();
        private Random randomLanguages = new Random();
        private Random randomCountry = new Random();

        private readonly ArtistService _artistService;

       public AddArtists(ArtistService artistService)
       {
           _artistService = artistService;
       }

        public void Add10000Artists(){
            Artist randomArtist = new Artist();
            for(int i = 0; i < 10000; i++)
            {
                randomArtist.Name = "Artist " + i.ToString();
                randomArtist.Country = countries[randomCountry.Next(0, 22)];
                randomArtist.Genres = new List<string>();
                randomArtist.Genres.Add(genres[randomGenres.Next(0, 2)]);
                randomArtist.Genres.Add(genres[randomGenres.Next(3, 6)]);
                randomArtist.Genres.Add(genres[randomGenres.Next(7, 9)]);
                randomArtist.Languages = new List<string>();
                randomArtist.Languages.Add(languages[randomLanguages.Next(0, 3)]);
                randomArtist.Languages.Add(languages[randomLanguages.Next(4, 7)]);
                randomArtist.Languages.Add(languages[randomLanguages.Next(8, 10)]);
                randomArtist.Description = randomArtist.Name + " makes good music that you will enjoy.";
                randomArtist.DateAdded = DateTime.Now;

                _artistService.AddArtist(randomArtist);
                System.Console.WriteLine(randomArtist.Name + " was added to db.");
            }
        }

    }
    
}