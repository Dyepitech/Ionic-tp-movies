import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})

export class MoviePage implements OnInit {

    constructor(
        private http: HttpClient,
        private router : Router,
        private storage: Storage
    ) { }

    MovieId :string = "";
    movies: any = [];
    actors: any = [];

    ngOnInit(){

    }

    ionViewWillEnter() {
        this.storage.create();
        this.storage.get('MovieId').then(movie => {
            this.MovieId = movie
            this.http.get('https://api.themoviedb.org/3/movie/' + this.MovieId + '?api_key=80dc6bc3081126b2474d867cca8bd68d&language=fr-FR')
            .pipe(
            map(response => response)
            )
            .subscribe(movie => {
            this.movies = movie
            })
        });
        this.storage.get('MovieId').then(movie => {
            this.MovieId = movie
            this.http.get('https://api.themoviedb.org/3/movie/' + this.MovieId + '?api_key=80dc6bc3081126b2474d867cca8bd68d&language=fr-FR&append_to_response=credits')
            .pipe(
            map(response => response['credits']['cast'])
            )
            .subscribe(actor => {
            this.actors = actor
            })
        });
    }
    navToActor(id) {
        this.storage.set('ActorId', id)
        this.router.navigate(['/actors']);
    }

}
