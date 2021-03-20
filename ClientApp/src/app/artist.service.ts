import { Artist } from './all-artist/artist.interface';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ArtistService {



  constructor(private HTTP: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }


  getArtists() {
    return this.HTTP.get<Artist[]>(this.baseUrl + 'api/artist');
  }

  postArtist(newArtist: Artist) {
    console.log(newArtist);
    return this.HTTP.post<Artist>(this.baseUrl + 'api/artist', newArtist);
  }

  showArtist(id: string) {
    return this.HTTP.get<Artist>(this.baseUrl + `api/artist/${id}`)
  }
  deleteArtist(id:string) {
    return this.HTTP.delete(this.baseUrl+ `api/artist/${id}`)
  }

}
