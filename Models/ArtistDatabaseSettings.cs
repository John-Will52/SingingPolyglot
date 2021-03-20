using System;

namespace SingingPolyglot.Models
{
    public class ArtistDatabaseSettings : IArtistDatabaseSettings
    {
        public string ArtistsCollectionName {get; set;}
        public string ConnectionString {get; set;}
        public string DatabaseName {get; set;}
    }
    public interface IArtistDatabaseSettings
    {
        string ArtistsCollectionName {get; set;}
        string ConnectionString {get; set;}
        string DatabaseName {get; set;}
    }
}