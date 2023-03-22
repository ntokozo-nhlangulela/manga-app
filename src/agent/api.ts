import axios, { AxiosResponse } from 'axios';

const responseBody = <T>(response: AxiosResponse<T>) => response?.data;

const requests = {
    get: <T>(url: string) => axios.get(url).then(responseBody)

}

const MangaApis = {
    getAllMangas: () => requests.get('https://api.mangadex.org/manga/?includes[]=author&includes[]=cover_art'),
    getMangaDetails: (mangaId: string) => requests.get(`https://api.mangadex.org/manga/${mangaId}/feed`),
    viewManga: (chapterId: string) => requests.get(`https://api.mangadex.org/at-home/server/${chapterId}`)
}

export default MangaApis;