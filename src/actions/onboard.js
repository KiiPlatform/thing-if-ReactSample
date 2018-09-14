export const onboardActions = {
  ONBOARD_REQUEST: 'ONBOARD_REQUEST',
  ONBOARD_SUCCEEDED: 'ONBOARD_SUCCEEDED',
  ONBOARD_FAILED: 'ONBOARD_FAILED',
}

export function onboardRequest (userID, token, requestObj) {
  return {
    type: onboardActions.ONBOARD_REQUEST,
    payload: {
      userID: userID,
      token: token,
      requestObj: requestObj,
    }
  }
}

export function onboardSucceeded () {
  return {
    type: onboardActions.ONBOARD_SUCCEEDED,
  }
}

export function onboardFailed (error) {
  return {
    type: onboardActions.ONBOARD_FAILED,
    error: error
  }
}
