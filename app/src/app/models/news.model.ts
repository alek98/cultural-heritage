import firebase from 'firebase/app';

export interface News {
  heading: string,
  content: string,
  chName: string,
  id?: string,
  lastModifiedAt?: firebase.firestore.Timestamp,
}