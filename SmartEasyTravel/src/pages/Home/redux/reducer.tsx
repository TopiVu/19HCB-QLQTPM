import { PlainAction } from 'redux-typed-actions'
import { GetTour, GetTourFailed, GetTourSuccess } from './actions'

const initialState = {
  dataTours: [],
  refreshing: false,
}

export function homeReducer(state = initialState, action: PlainAction) {
  switch (action.type) {
    case GetTour.type:
      return {
        ...state,
        refreshing: true
      }
    case GetTourSuccess.type:
      return {
        ...state,
        refreshing: false,
        dataTours: action.payload.data,
      }
    case GetTourFailed.type:
      return {
        ...state,
        refreshing: true
      }
    default:
      return state
  }
}
