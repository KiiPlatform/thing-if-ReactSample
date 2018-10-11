import { thingStateActions } from '../actions/thingState'
export default (previousState = 0, action) => {
  switch (action.type) {
    case thingStateActions.CURRENT_STATE_REQUEST:
      return {
        ...previousState,
        isLoading: true,
        error: null,
      }
    case thingStateActions.CURRENT_STATE_SUCCEEDED:
      return {
        ...previousState,
        isLoading: false,
        error: null,
        currentState: action.payload.currentState,
      }
    case thingStateActions.CURRENT_STATE_FAILED:
      return {
        ...previousState,
        isLoading: false,
        error: action.error,
      }
    default:
      return previousState
  }
}
