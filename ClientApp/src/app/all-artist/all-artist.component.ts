import { FormGroup, FormArray } from '@angular/forms';
import { ArtistService } from './../artist.service';
import { Artist } from './artist.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-all-artist',
  templateUrl: './all-artist.component.html',
  styleUrls:['./all-artist.component.css']
})
export class AllArtistComponent implements OnInit{
  public artists: Artist[];
  public pagination: number[] = [];
  public pageItems: Artist[];
  public sortedArtists: Artist[];
  public page: number = 1;
  private numberOfRecordsPerPage: number = 25;
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
    console.log(this.pageItems);
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

////////////////////////////////Pagination///////////////////// Establishes the number of pages needed and adds numbers to an array based on artist count
artistsRendering(){
  this.art.getArtists().subscribe(result => {
    this.artists = result;
    // this.pageItems = result;
    this.paginationMethod(this.artists.length);
  }, error => console.error(error));
}

artistSorting(artist: FormGroup){
  console.log("In artistSorting \n","This is this.artists \n", this.artists, "This is this.pageItems \n", this.pageItems, "This is this.page \n", this.page)
  let genres = artist.value.artistGenres;
  let languages = artist.value.artistLanguages;
  const allArtists = this.artists;
  let genreMatchingArtists: Artist[]= [];
  let filteredArtists : Artist[] = [];

  if(genres.length == 0 && languages.length == 0){
    this.paginationMethod(this.artists.length);
  }
  else if(genres.length > 0 && languages.length == 0){

    for(let i = 0; i < allArtists.length; i++){
      for(let genreIndex = 0; genreIndex < genres.length; genreIndex++){
        if(allArtists[i].genres.includes(genres[genreIndex])){
          genreMatchingArtists.push(allArtists[i]);
          break
        }
      }
    }
    if(genreMatchingArtists.length == 0){
      this.sortedArtists = genreMatchingArtists;
      this.paginationMethod(this.artists.length);
    }
    else{
      this.sortedArtists = genreMatchingArtists;
      this.sortedPaginationMethod(this.sortedArtists.length);
    }
  }
  else if(genres.length == 0 && languages.length > 0){
    let languageMatchingArtists: Artist[]= [];
    for(let i = 0; i < allArtists.length; i++){
      for(let languageIndex = 0; languageIndex < languages.length; languageIndex++){
        if(allArtists[i].languages.includes(languages[languageIndex])){
          languageMatchingArtists.push(allArtists[i]);
          break
        }
      }
    }
    if(languageMatchingArtists.length == 0){
      this.sortedArtists = languageMatchingArtists;
      this.paginationMethod(this.artists.length);
    }
    else{
      this.sortedArtists = languageMatchingArtists;
      this.sortedPaginationMethod(this.sortedArtists.length);
    }
  }
  else{


    for(let i = 0; i < allArtists.length; i++){
      for(let genreIndex = 0; genreIndex < genres.length; genreIndex++){
        if(allArtists[i].genres.includes(genres[genreIndex])){
          genreMatchingArtists.push(allArtists[i]);
          break
        }
      }
    }
    console.log("Genre-matching Artists \n", genreMatchingArtists);
    for(let index = 0; index < genreMatchingArtists.length; index++){
      for(let languageIndex = 0; languageIndex < languages.length; languageIndex++){
        if(genreMatchingArtists[index].languages.includes(languages[languageIndex])){
          filteredArtists.push(genreMatchingArtists[index]);
          break
        }
      }
    }
    console.log("Artists who fit genre and languages \n", filteredArtists);
    if(filteredArtists.length == 0){
      this.sortedArtists = filteredArtists;
      this.paginationMethod(this.artists.length);
    }
    else{
      this.sortedArtists = filteredArtists;
      this.sortedPaginationMethod(this.sortedArtists.length);
    }
  }
}

paginationMethod(artistCount : number){
  const numberOfPages: number = Math.ceil(artistCount / this.numberOfRecordsPerPage);
  console.log("In paginationMethod \n","This is this.artists \n", this.artists, "This is this.pageItems \n", this.pageItems, "This is this.page \n", this.page)

  // console.log("The number of pages \n", numberOfPages)
  this.pagination = [1, numberOfPages];
  this.turnPage(1);

}
sortedPaginationMethod(artistCount : number){
  const numberOfPages: number = Math.ceil(artistCount / this.numberOfRecordsPerPage);
  console.log("In sortedPaginationMethod \n","This is this.artists \n", this.artists, "This is this.pageItems \n", this.pageItems, "This is this.page \n", this.page)

  // console.log("The number of pages \n", numberOfPages)
  this.pagination = [1, numberOfPages];
  this.sortedPageTurn(1);

}

turnPage(pageNumber: number){
  this.page = pageNumber;
  console.log("In turnPage \n","This is this.artists \n", this.artists, "This is this.pageItems \n", this.pageItems, "This is this.page \n", this.page)

  let artists = this.artists;
  let artistsPerPage = this.numberOfRecordsPerPage;
  let start = ((this.page-1) * artistsPerPage);
  let end = (start + (artistsPerPage - 1));
  let artistsForPage: Artist[] = [];

  for(start; start <= end; start++){
    if(start < artists.length){
      artistsForPage.push(artists[start]);
    }
    else{
      break;
    }

    this.pageItems = artistsForPage;
  }
}
sortedPageTurn(pageNumber: number){
  this.page = pageNumber;
    console.log("In sortedPageTurn \n","This is this.artists \n", this.artists, "This is this.pageItems \n", this.pageItems, "This is this.page \n", this.page)

    let artists = this.sortedArtists;
    let artistsPerPage = this.numberOfRecordsPerPage;
    let start = ((this.page-1) * artistsPerPage);
    let end = (start + (artistsPerPage - 1));
    let artistsForPage: Artist[] = [];

    for(start; start < end; start++){
      if(start < artists.length){
        artistsForPage.push(artists[start]);
      }
      else{
        break;
      }

      this.pageItems = artistsForPage;
    }
}


//////////////////////////////////////////Page Change////////////////////////// Controls which records are shown on each page, based on index





////////////////////////////////////Pagination Management////////////////// Manages the gradual shift in page numbers by recalling pagination methods

inputManager(event){
    if(parseInt(event.target.value) > 0 && parseInt(event.target.value) < this.pagination[1]){
      this.page = parseInt(event.target.value);
      this.turnPage(this.page);
    }
    else if(event.target.value == ''){
      this.turnPage(this.page);
    }
    else{
      this.page = this.pagination[1];
      this.turnPage(this.page);
    }

}


}


