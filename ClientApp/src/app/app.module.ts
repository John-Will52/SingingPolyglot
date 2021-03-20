import { ArtistService } from './artist.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule} from 'ngx-pagination';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AllArtistComponent } from './all-artist/all-artist.component';
import { AddArtistComponent } from './add-artist/add-artist.component';
import { ThisArtistComponent } from './this-artist/this-artist.component';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AllArtistComponent,
    AddArtistComponent,
    ThisArtistComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: '', component: AllArtistComponent, pathMatch: 'full' },
      { path: 'add', component: AddArtistComponent },
      { path: 'artist/:id', component: ThisArtistComponent },
    ])
  ],
  providers: [ArtistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
