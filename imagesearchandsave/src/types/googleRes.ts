export interface IGoogleSearchResponse {
    items: IImage[]
  }
  
export interface IImage {
    title:string,
    link: string,
    displayLink: string
}