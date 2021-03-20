import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ArtistService } from './../artist.service';
import { Artist } from '../all-artist/artist.interface';
import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls:['./add-artist.component.css']
})
export class AddArtistComponent  {
  public newArtist: Artist = {
    id:'',
    name: '',
    country: '',
    genres: [],
    languages:[],
    description:''
  }
  public artistForm = new FormGroup({
    artistName: new FormControl(''),
    artistCountry: new FormControl(''),
    artistGenres: new FormArray([]),
    artistLanguages: new FormArray([]),
    artistDescription : new FormControl(''),
  })
  public genres: string[] = ["R&B","Pop","Rap/Hip-hop","Rock","Soul","Classical","Metal","Techno","EDM","Jazz"];
  public languages: string[] = ["English","Spanish","French","German","Russian", "Japanese", "Korean", "Chinese", "Turkish", "Italian","Arabic"];

  constructor( private art: ArtistService, private ROUTER: Router) {

  }

  addArtist(artist :FormGroup){
    console.log(artist.value);
    this.newArtist.name = artist.value.artistName;
    this.newArtist.country = artist.value.artistCountry;
    this.newArtist.genres = artist.value.artistGenres;
    this.newArtist.languages = artist.value.artistLanguages;
    this.newArtist.description = artist.value.artistDescription;
    console.log(this.newArtist);
    this.art.postArtist(this.newArtist).subscribe((data: Artist) => {
      console.log(data);
      this.newArtist = data;
    })

    this.ROUTER.navigate(['/']);
  }


  cancel(){
    this.ROUTER.navigate(['/']);
  }

  onGenreCheck(event){
    if(event.srcElement.checked == true){
      this.artistForm.controls.artistGenres.value.push(event.srcElement.attributes[4].nodeValue);
    }
    else if (event.srcElement.checked == false){
      for(let i =0; i < this.artistForm.controls.artistGenres.value.length; i++){
        if(event.srcElement.attributes[4].nodeValue == this.artistForm.controls.artistGenres.value[i]){
          delete this.artistForm.controls.artistGenres.value[i];
          this.artistForm.controls.artistGenres.value.splice(i,1);
        }
      };
    }
    console.log(this.artistForm.controls.artistGenres.value);

  }
  onLanguageCheck(event){
    if(event.srcElement.checked == true){
      this.artistForm.controls.artistLanguages.value.push(event.srcElement.attributes[4].nodeValue);
    }
    else if (event.srcElement.checked == false){
      for(let i =0; i < this.artistForm.controls.artistLanguages.value.length; i++){
        if(event.srcElement.attributes[4].nodeValue == this.artistForm.controls.artistLanguages.value[i]){
          delete this.artistForm.controls.artistLanguages.value[i];
          this.artistForm.controls.artistLanguages.value.splice(i,1);
        }
      };
    }
    console.log(this.artistForm.controls.artistLanguages.value);
  }

}


