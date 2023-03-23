export type Birdhouse = {
  ubidValue: string
  name: string
  longitude: number
  latitude: number
  lastOccupationUpdate: string
}

export type Meta = {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface Registration {
  value: string
  birdhouse?: Birdhouse
}

export interface RegistrationResponse {
  items: Registration[]
  meta: Meta
}

export interface Occupancy {
  id: string
  eggs: number
  birds: number
  created_at: string
}

export interface OccupancyResponse {
  items: Occupancy[]
  meta: Meta
}

export interface OccupancyItem {
  value: string
  items: Occupancy[]
}

export interface OccupancyStore {
  data: OccupancyItem[]
  meta: Meta
}
