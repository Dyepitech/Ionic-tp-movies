import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-actors',
    templateUrl: './actors.page.html',
    styleUrls: ['./actors.page.scss'],
})
export class ActorsPage implements OnInit {

    constructor(
        private http: HttpClient,
        private router: Router,
        private storage: Storage
    ) { }

    ActorId: string = "";
    actor: any = [];
    movies: any;

    ngOnInit() {
        this.storage.create();
        this.storage.get('ActorId').then(actor => {
            this.ActorId = actor
            this.http.get('https://api.themoviedb.org/3/person/' + this.ActorId + '?api_key=80dc6bc3081126b2474d867cca8bd68d&language=fr-FR')
                .pipe(
                    map(response => response)
                )
                .subscribe(actor => {
                    this.actor = actor
                })
        });

        this.storage.get('ActorId').then(actor => {
            this.ActorId = actor
            this.http.get('https://api.themoviedb.org/3/person/' + this.ActorId + '/movie_credits?api_key=80dc6bc3081126b2474d867cca8bd68d&language=fr-FR')
                .pipe(
                    map(response => response['cast'])
                )
                .subscribe(movie => {
                    this.movies = movie
                    console.log(this.movies)
                })
        });
    }
    navToMovie(id) {
        this.storage.set('MovieId', id)
        this.router.navigate(['/movie']);
    }

}
