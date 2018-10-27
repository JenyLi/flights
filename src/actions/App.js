export const setGlobalToast = (payload) => dispatch => {
    dispatch({
        type: 'SET_GLOBAL_TOAST',
        payload
    })
};

export const clearGlobalToast = () => dispatch => {
    dispatch({
        type: 'CLEAR_GLOBAL_TOAST'
    })
};

export const addFlight = (payload) => dispatch => {
    dispatch({
        type: 'ADD_FLIGHT',
        payload
    })
};