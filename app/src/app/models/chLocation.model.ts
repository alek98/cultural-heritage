export interface chLocation {
  city: string,
  country: string,
  street: string,
  geopoint: {
    latitude: number,
    longitude: number,
  }
}