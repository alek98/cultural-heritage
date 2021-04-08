import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map } from 'rxjs/operators';
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

  getNews() {
    const itemsCollection = this.firestore.collection<News>('news');
    return itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as News;
        const id = a.payload.doc.id;
        data.id = id;
        return data;
      }))
    )
  }

  editNews(news: News) {
    const callable = this.fns.httpsCallable<News>('editNews');
    return callable(news).toPromise();
  }
}
