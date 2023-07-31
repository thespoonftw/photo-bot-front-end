
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

  static async getUsers() {
    const response = await fetch('user');
    const json = await response.json();
    return new Users(json);
  }

  static async getVoteLevel(userId, photoId) {
    const response = await fetch(`voteLevel?userId=${userId}&photoId=${photoId}`);
    return await response.json();
  }

  static async putVote(photoId, userId, level) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        photoId: photoId,
        userId: userId,
        level: level,
      }),
    };
    await fetch('vote', requestOptions);
    return;
  }
}

