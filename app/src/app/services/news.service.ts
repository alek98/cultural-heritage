import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private fns: AngularFireFunctions,
    private firestore: AngularFirestore,
  ) { }

  addNews(news: News) {
    const callable = this.fns.httpsCallable<News>('addNews');
    return callable(news).toPromise();
  }
}
