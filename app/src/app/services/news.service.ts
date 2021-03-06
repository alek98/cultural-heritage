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
    // sorting collection by last modified date
    // showing the last modified news first
    const itemsCollection = this.firestore.collection<News>('news', 
      ref => ref.orderBy('lastModifiedAt', 'desc'));

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

  deleteNews(news: News) {
    const callable = this.fns.httpsCallable<News>('deleteNews');
    return callable(news).toPromise();
  }
}
