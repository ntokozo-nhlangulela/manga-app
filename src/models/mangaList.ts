export default interface MangaList {
    mangaId: string,
    title: string,
    description: string,
    year: number,
    status: string,
    author: string,
    version: number,
    fileName: string,
    rating?: string,
    state?: string
}
