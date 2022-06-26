import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    movies: any[] = [];
    populars: Object[] = [];
    key: string = 'MovieId';
    search: string = "";

    constructor(
        private http: HttpClient,
        private router : Router,
        private storage: Storage
    ) { }

    ngOnInit() {
        this.storage.create();
    }

    ionViewWillEnter() {
        
        this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=80dc6bc3081126b2474d867cca8bd68d&language=fr-FR&page=1')
        .pipe(
          map(response => response['results'])
        )
        .subscribe(data => {
            this.populars = data
        });
    }
    navToMovie(id) {
        this.storage.set('MovieId', id)
        // console.log(id)
        this.router.navigate(['/movie']);
    }

    searchMovie(research){
        this.http.get('https://api.themoviedb.org/3/search/movie?api_key=80dc6bc3081126b2474d867cca8bd68d&language=fr-FR&page=1&include_adult=false&query=' + research)
        .pipe(
          map(response => response['results'])
        )
        .subscribe(data => {
            this.populars = data
        });
    }
}
