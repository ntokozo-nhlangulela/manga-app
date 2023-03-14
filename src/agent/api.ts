//ToDo: All API's will be saved on this file
import axios, { AxiosResponse } from 'axios';

const responseBody = <T>(response: AxiosResponse<T>) => response?.data;

const requests = {
    get: <T>(url: string) => axios.get(url).then(responseBody)
}

const MangaApis = {
    //Get list of all mangas 
    getAllMangas: () => requests.get('https://api.mangadex.org/manga/'),

    //Get Manga Chapters API -> need to use this on details screen 
    getMangaDetails: (mangaId: string) => requests.get(`https://api.mangadex.org/manga/${mangaId}/feed`)
}

export default MangaApis;