using SingingPolyglot.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace SingingPolyglot.Services
{
    public class ArtistService
    {

        private readonly IMongoCollection<Artist> _artists;

        public ArtistService (IArtistDatabaseSettings settings)
        {
            var client= new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _artists = database.GetCollection<Artist>(settings.ArtistsCollectionName);
        }

        public List<Artist> GetAllArtists() => _artists.Find(artist => true).ToList();
            
        public Artist GetArtist(string id) => _artists.Find<Artist>(artist => artist.Id == id).FirstOrDefault();

        public Artist AddArtist(Artist artist)
        {     
            _artists.InsertOne(artist);
            return artist;
        }
        public void DeleteArtist(string id) => _artists.DeleteOne(artist => artist.Id == id);

        
    }
}