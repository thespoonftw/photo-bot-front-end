
export const Http = {

  async getAllPhotos() {
    const response = await fetch('album');
    return await response.json();
  },

  async getAlbumData(album_url) {
    console.log(album_url);
    const response = await fetch('album/' + album_url); 
    const json = await response.json();
    console.log(json);   
    return json;
  }

}
