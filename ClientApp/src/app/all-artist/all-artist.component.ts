import { FormGroup, FormArray } from '@angular/forms';
import { ArtistService } from './../artist.service';
import { Artist } from './artist.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import {NgxPaginationModule} from 'ngx-pagination';




@Component({
  selector: 'app-all-artist',
  templateUrl: './all-artist.component.html',
  styleUrls:['./all-artist.component.css']
})
export class AllArtistComponent implements OnInit{
  public artists: Artist[];
  public pagination: number[] = [];
  public pageItems: Artist[] = [];
  public sortedArtists: Artist[];
  private numberOfRecordsPerPage: number = 10;
  public genres: string[] = ["R&B","Pop","Rap/Hip-hop","Rock","Soul","Classical","Metal","Techno","EDM","Jazz"];
  public languages: string[] = ["English","Spanish","French","German","Russian", "Japanese", "Korean", "Chinese", "Turkish", "Italian","Arabic"];

  constructor(private art: ArtistService, private ROUTER: Router) {

  }
  artistSort = new FormGroup({
    artistGenres: new FormArray([]),
    artistLanguages: new FormArray([])
  })
  ngOnInit(){
    this.artistsRendering();
    // this.paginationMethod();
  }

  artistsRendering(){
    this.art.getArtists().subscribe(result => {
      this.artists = result;
      this.paginationMethod(result.length);
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
    this.sortedPaginationMethod(filteredArtists.length);
}

  onGenreCheck(event){
    const artistGenres = this.artistSort.controls.artistGenres.value;
    const value = event.srcElement.attributes[4].nodeValue;
    if(event.srcElement.checked == true){
      artistGenres.push(value);
    }
    else if (event.srcElement.checked == false){
      for(let i =0; i < artistGenres.length; i++){
        if(value == artistGenres[i]){
          delete artistGenres[i];
          artistGenres.splice(i,1);
        }
      };
    }
    console.log(artistGenres);

  }
  onLanguageCheck(event){
    const artistLanguages = this.artistSort.controls.artistLanguages.value;
    const value = event.srcElement.attributes[4].nodeValue
    if(event.srcElement.checked == true){
      artistLanguages.push(value);
    }
    else if (event.srcElement.checked == false){
      for(let i =0; i < artistLanguages.length; i++){
        if(value == artistLanguages[i]){
          delete artistLanguages[i];
          artistLanguages.splice(i,1);
        }
      };
    }
    console.log(artistLanguages);
  }

  paginationMethod(artistCount : number){
    console.log(artistCount);
    const pagesArray: number[] = []


    const numberOfPages: number = Math.ceil(artistCount / this.numberOfRecordsPerPage);
    for(let num = 1; num <= numberOfPages; num++){
      pagesArray.push(num);
    }
    this.pagination = pagesArray;
    this.turnPage(1);
  }

  turnPage(pageNumber: number){
    const artists = this.artists;
    const perPage = this.numberOfRecordsPerPage;
    let start = ((pageNumber-1) * perPage);
    let end = (start + (perPage - 1));
    const artistsForPage: Artist[] = [];

    for(start; start <= end; start++){
      artistsForPage.push(artists[start]);
      if(start == artists.length - 1){
        break

      }
    }
    this.pageItems = artistsForPage;
  }

  sortedPaginationMethod(artistCount : number){
    console.log(artistCount);
    const pagesArray: number[] = []

    const numberOfPages: number = Math.ceil(artistCount / this.numberOfRecordsPerPage);
    for(let num = 1; num <= numberOfPages; num++){
      pagesArray.push(num);
    }
    this.pagination = pagesArray;
    this.sortedPageTurn(1);
  }

  sortedPageTurn(pageNumber: number){
    const artists = this.sortedArtists;
    const perPage = this.numberOfRecordsPerPage;
    let start = ((pageNumber-1) * perPage);
    let end = (start + (perPage - 1));
    const artistsForPage: Artist[] = [];

    for(start; start <= end; start++){
      artistsForPage.push(artists[start]);
      if(start == artists.length - 1){
        break

      }
    }
    this.pageItems = artistsForPage;
  }

}


