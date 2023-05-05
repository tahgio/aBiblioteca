export type BookStatusList = 'Lido' | 'Lendo' | 'Quero Ler' | 'Em Espera' | 'Abandonado'

export interface BookModel {
  pages: number,
  rating: number,
  genre: string,
  title: string,
  author:string,  
  tags: string[],
  status: BookStatusList,
  year: number,
  cover: string,
  id?: string,
}