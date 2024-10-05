export interface Location {
    city: string
    country: string
    data: Daum[]
  }
  
  export interface Daum {
    id: string
    name: string
    difficulty: string
    estTime: number
    rating: number
    city: string
    state: string
    country: string
    assets: Asset[]
  }
  
  export interface Asset {
    id: string
    url: string
    width: number
    height: number
  }
  