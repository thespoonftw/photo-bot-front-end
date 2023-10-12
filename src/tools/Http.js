
import { Users } from "tools/Users";

export class Http {

  static async getAlbumDict() {
    const response = await fetch('album');
    const json = await response.json();
    return json.reduce((x, album) => {
      x[album.id] = album;
      return x;
    }, {});
  }

  static async getAlbumList() {
    const response = await fetch('albumList');
    return await response.json();
  }

  static async getPhotosByUser(userId) {
    const response = await fetch('photosByUser/' + userId);
    return await response.json();
  }

  static async getAlbumData(album_url) {
    const response = await fetch('album/' + album_url); 
    return await response.json();
  }

  static async getTrashPhotos() {
    const response = await fetch('trash'); 
    return await response.json();
  }

  static async getUsers() {
    const response = await fetch('user');
    const json = await response.json();
    return new Users(json);
  }

  static async getVoteLevel(userId, photoId) {
    const response = await fetch(`voteLevel?userId=${userId}&photoId=${photoId}`);
    return await response.json();
  }

  static async sendToTrash(photoId) {
    const response = await this.post(`trash/${photoId}`);
    return;
  }

  static async setAlbumDate(albumId, year, month) {
    console.log("testing!");
    const response = await this.post('album_date', {
      albumId: albumId,
      year: year,
      month: month,
    });
    return;
  }

  static async deletePhoto(userId, photoId) {
    const response = await this.post('delete_photo', {
      userId: userId,
      photoId: photoId,
    });
    return;
  }

  static async tryLogIn(userId, password) {
    const response = await this.post('login', {
      userId: userId,
      password: password,
    });
    const json = await response.json();
    return json.isSuccessful;
  }

  static async putVote(photoId, userId, level) {
    const response = await this.post('vote', {
      photoId: photoId,
      userId: userId,
      level: level,
    });
    return;
  }

  static async post(path) {
    const requestOptions = {
      method: 'POST'
    };
    return fetch(path, requestOptions);
  }

  static async post(path, object) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object),
    };
    return fetch(path, requestOptions);
  }
}

