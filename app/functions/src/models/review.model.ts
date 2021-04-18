import firebase from 'firebase/app';

export interface Review {
  rating: number,
  content: string,
  userDisplayName: string,
  chId: string,
  id?: string,
  createdAt?: firebase.firestore.Timestamp,
}