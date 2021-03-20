using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SingingPolyglot.Models;
using SingingPolyglot.Services;

namespace SingingPolyglot.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArtistController : ControllerBase
    {
       private readonly ArtistService _artistService;

       public ArtistController(ArtistService artistService)
       {
           _artistService = artistService;
       }

        
        [HttpGet]
        public ActionResult<List<Artist>> GetAllArtists() => _artistService.GetAllArtists();


        [HttpGet ("{id}", Name = "GetArtist")]
        public ActionResult<Artist> GetThisArtist(string id)
        {   
            Artist artist = _artistService.GetArtist(id);
            if(artist == null)
            {
                return NotFound();
            }
            return artist;
        }
        [HttpPost]
        public ActionResult<Artist> NewArtist(Artist newArtist)
        {   
            _artistService.AddArtist(newArtist);
            return CreatedAtRoute("GetArtist", new {id = newArtist.Id }, newArtist);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(string id){
            var artist = _artistService.GetArtist(id);

            if (artist == null)
            {
                return NotFound();
            }

            _artistService.DeleteArtist(artist.Id);

            return NoContent();
        }
        // public ActionResult<Artist> NewArtist(Artist newArtist)
        // {   
        //     System.Console.WriteLine(newArtist);
        //     // return CreatedAtRoute("GetArtist", new {id=newArtist.Id.ToString()}, newArtist);

            
        // }
        
    }
}
