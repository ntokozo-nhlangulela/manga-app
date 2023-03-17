//ToDo: All API's will be saved on this file
import axios, { AxiosResponse } from 'axios';

const responseBody = <T>(response: AxiosResponse<T>) => response?.data;

const requests = {
    get: <T>(url: string) => axios.get(url).then(responseBody)

}

const MangaApis = {
    //Get list of all mangas 
    getAllMangas: () => requests.get('https://api.mangadex.org/manga/?includes[]=author&includes[]=cover_art'),

    //Get Manga Chapters API -> need to use this on details screen 
    getMangaDetails: (mangaId: string) => requests.get(`https://api.mangadex.org/manga/${mangaId}/feed`),


    //getMangaCover: () => requests.get('https://api.mangadex.org/manga/?includes[]=cover_art')
}
//https://uploads.mangadex.org/covers/5d45f791-69ec-4288-908c-2293afdee640/cbd388cd-6f47-4557-914d-ca1a0245ad52.jpg

export default MangaApis;