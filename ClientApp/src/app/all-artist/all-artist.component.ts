import { FormGroup, FormArray } from '@angular/forms';
import { ArtistService } from './../artist.service';
import { Artist } from './artist.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';




@Component({
  selector: 'app-all-artist',
  templateUrl: './all-artist.component.html',
  styleUrls:['./all-artist.component.css']
})
export class AllArtistComponent implements OnInit{
  public numberOfArtists: string;
  public page: number = 1;
  public artists: Artist[];
  public sortedArtists: Artist [];
  public genres: string[] = ["R&B","Pop","Rap/Hip-hop","Rock","Soul","Classical","Metal","Techno","EDM","Jazz"];
  public languages: string[] = ["English","Spanish","French","German","Russian", "Japanese", "Korean", "Chinese", "Turkish", "Italian","Arabic"];
  constructor(private art: ArtistService, private ROUTER: Router) {
    this.artistsRenderings();
  }
  artistSort = new FormGroup({
    artistGenres: new FormArray([]),
    artistLanguages: new FormArray([])
  })
  ngOnInit(){

    // this.paginationRenderer(this.artists.length);
  }

  artistsRenderings(){
    this.art.getArtists().subscribe(result => {
      this.artists = result;
      this.numberOfArtists = result.length.toString();
    }, error => console.error(error));
  }

  artistSorting(artist: FormGroup){
    let genres = artist.value.artistGenres;
    let languages = artist.value.artistLanguages;
    const allArtists = this.artists;
    let genreMatchingArtists: Artist[]= [];
    let filteredArtists : Artist[] = [];
    for(let i = 0; i < allArtists.length; i++){
      for(let genreIndex = 0; genreIndex < genres.length; genreIndex++){
        if(allArtists[i].genres.includes(genres[genreIndex])){
          console.log(allArtists[i].name);
          genreMatchingArtists.push(allArtists[i]);
          break
        }
      }
  }
  for(let index = 0; index < genreMatchingArtists.length; index++){
    for(let languageIndex = 0; languageIndex < languages.length; languageIndex++){
        if(genreMatchingArtists[index].languages.includes(languages[languageIndex])){
            filteredArtists.push(genreMatchingArtists[index]);
            break
        }
    }
  }
    this.sortedArtists = filteredArtists;
}

  onGenreCheck(event){
    if(event.srcElement.checked == true){
      this.artistSort.controls.artistGenres.value.push(event.srcElement.attributes[4].nodeValue);
    }
    else if (event.srcElement.checked == false){
      for(let i =0; i < this.artistSort.controls.artistGenres.value.length; i++){
        if(event.srcElement.attributes[4].nodeValue == this.artistSort.controls.artistGenres.value[i]){
          delete this.artistSort.controls.artistGenres.value[i];
          this.artistSort.controls.artistGenres.value.splice(i,1);
        }
      };
    }
    console.log(this.artistSort.controls.artistGenres.value);

  }
  onLanguageCheck(event){
    if(event.srcElement.checked == true){
      this.artistSort.controls.artistLanguages.value.push(event.srcElement.attributes[4].nodeValue);
    }
    else if (event.srcElement.checked == false){
      for(let i =0; i < this.artistSort.controls.artistLanguages.value.length; i++){
        if(event.srcElement.attributes[4].nodeValue == this.artistSort.controls.artistLanguages.value[i]){
          delete this.artistSort.controls.artistLanguages.value[i];
          this.artistSort.controls.artistLanguages.value.splice(i,1);
        }
      };
    }
    console.log(this.artistSort.controls.artistLanguages.value);
  }

  paginationRenderer(records : number){
    const numberOfDocsPerPage = 5;
    const numberOfPages = records % numberOfDocsPerPage;
    const array: number[] = [];
    for(let i = 0; i < this.artists.length; i++){
      array.push(i);
    }
    this.pagination = array;
    console.log(array);

  }



}


