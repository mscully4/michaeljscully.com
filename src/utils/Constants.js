export const API_BASE = 'https://9h14ty7403.execute-api.us-east-2.amazonaws.com/dev'
export const API_DESTINATIONS = `${API_BASE}/destinations`
export const API_PLACES = `${API_BASE}/places`
export const API_PHOTOS = `${API_BASE}/photos`
export const API_ALBUMS = `${API_BASE}/albums`

//Mapping Constants
export const GOOGLE_MAPS_API_KEY = 'AIzaSyAk_bN5yfkLuUzptVXIHWs59YdFmI_TjAc'
export const DEFAULT_CENTER = { lat: 33.7490, lng: -84.3880 }
export const GRANULARITY_CUTOFF = 8
export const DISTANCE_FROM_CITY = 200 /*miles*/
export const DISTANCE_FROM_PLACE = 200 /*miles*/

export const HOME_API_URL = 'https://w3zz6ii5d1.execute-api.us-east-2.amazonaws.com/dev/photos'

//Destination Type Mapping
export const DESTINATION_TYPE_MAPPING = {
    NP: "National Park",
    NM: "National Monument",
    C: "City"
}