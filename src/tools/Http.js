
class Http {

  static async getAllPhotos() {
    const response = await fetch('album');
    return await response.json();
  }

  static async getAlbumData(album_url) {
    console.log(album_url);
    const response = await fetch('album/' + album_url); 
    const json = await response.json();
    console.log(json);   
    return json;
  }

  static async getAllUsers() {
    const response = await fetch('user');
    return await response.json();
  }  
}

export default Http;