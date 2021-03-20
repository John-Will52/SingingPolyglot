using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SingingPolyglot.Models
{
    public class Artist
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id {get; set;}
        public string Name {get; set;}
        public string Description {get; set;}
        public List<string> Genres {get; set;}
        public string Country {get; set;}
        public List<Artist> RelatedArtists {get; set;}
        public List<string> Languages {get; set;}
        public string PhotoLink {get; set;}
        public DateTime DateAdded {get; set;}
        public DateTime DateUpdated => DateTime.Now;
        // use the following or use their APIs
        // public string SpotifyLink {get;set;}
        // public string YoutubeLink {get; set;}
        // public string AppleMusicLink {get; set;}
    }
}
