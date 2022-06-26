import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
    selector: 'app-top',
    templateUrl: 'top.page.html',
    styleUrls: ['top.page.scss'],
})
export class TopPage implements OnInit {
    movies: any[] = [];
    tops: Object[] = [];
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
        
        this.http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=80dc6bc3081126b2474d867cca8bd68d&language=fr-FR&page=1')
        .pipe(
          map(response => response['results'])
        )
        .subscribe(data => {
            this.tops = data
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
            this.tops = data
        });
    }

}

