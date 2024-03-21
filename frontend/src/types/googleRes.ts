export interface IGoogleSearchResponse {
  items: IImage[],
  searchInformation: {
    formattedSearchTime: string
  },
  spelling?: {
    correctedQuery?: string
  }
  
}

export interface IImage {
  link: string,
}
