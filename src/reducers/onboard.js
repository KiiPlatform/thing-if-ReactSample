import { onboardActions } from '../actions/onboard'
export default (previousState = 0, action) => {
    switch (action.type) {
        case onboardActions.ONBOARD_REQUEST:
            return {
                ...previousState,
                isLoading: true,
                error: null,
            }
        case onboardActions.ONBOARD_SUCCEEDED:
            return {
                ...previousState,
                isLoading: false,
                error: null,
            }
        case onboardActions.ONBOARD_FAILED:
            return {
                ...previousState,
                isLoading: false,
                error: action.error,
            }
        default:
            return previousState
    }

}