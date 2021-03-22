import { ArtistService } from './../artist.service';
import { Artist } from '../all-artist/artist.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-add-artist',
  templateUrl: './this-artist.component.html',
  styleUrls:['./this-artist.component.css']
})
export class ThisArtistComponent implements OnInit{
  public artist: Artist = {
    id:"",
    name:"",
    country: "",
    genres: [],
    languages: [],
    description: ""

  };

  constructor(private art: ArtistService, private ROUTE: ActivatedRoute, private ROUTER: Router) {

  }

  ngOnInit(){
    this.ROUTE.params.subscribe((params: Params) =>{
      this.artistRendering(params['id']);
    })

  }

  artistRendering(id: string){
    this.art.showArtist(id).subscribe((data: Artist) => {
      this.artist = data;
    }, error => console.error(error));
  }
  deleteArtist(id: string){
    this.art.deleteArtist(id).subscribe();
    this.ROUTER.navigate(['/']);
  }


}




