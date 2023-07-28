
import { Users } from "tools/Users";

export class Http {

  static async getAlbums() {
    const response = await fetch('album');
    return await response.json();
  }

  static async getPhotosByUser(userId) {
    const response = await fetch('photosByUser/' + userId);
    return await response.json();
  }

  static async getAlbumData(album_url) {
    console.log(album_url);
    const response = await fetch('album/' + album_url); 
    const json = await response.json();
    console.log(json);   
    return json;
  }

  static async getUsers() {
    const response = await fetch('user');
    const json = await response.json();
    return new Users(json);
  }  
}

