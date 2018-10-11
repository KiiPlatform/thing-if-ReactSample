export const thingStateActions = {
  CURRENT_STATE_REQUEST: 'CURRENT_STATE_REQUEST',
  CURRENT_STATE_SUCCEEDED: 'CURRENT_STATE_SUCCEEDED',
  CURRENT_STATE_FAILED: 'CURRENT_STATE_FAILED',
}

export function currentStateRequest (thingID, token) {
  return {
    type: thingStateActions.CURRENT_STATE_REQUEST,
    payload: { thingID, token }
  }
}

export function currentStateSucceeded (currentState) {
  return {
    type: thingStateActions.CURRENT_STATE_SUCCEEDED,
    payload: { currentState },
  }
}

export function currentStateFailed (error) {
  return {
    type: thingStateActions.CURRENT_STATE_FAILED,
    error: error
  }
}
