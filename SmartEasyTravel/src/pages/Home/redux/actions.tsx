import { defineAction } from 'redux-typed-actions'

export const GetTour = defineAction<any>('GET_TOUR')
export const GetTourSuccess = defineAction<any>('GET_TOUR_SUCCESS')
export const GetTourFailed = defineAction<any>('GET_TOUR_FAILED')
