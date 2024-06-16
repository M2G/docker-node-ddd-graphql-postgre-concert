import type IArtist from 'core/artists';

interface IConcert {
  concert_id: number;
  type: string;
  uri: string;
  display_name: string;
  status: string;
  popularity: string;
  datetime: string;
  city: string;
  lng: number;
  lat: number;
  artist: IArtist;
}

export default IConcert;
