import { Map, List, fromJS } from 'immutable';

const initialState = Map({
    globalToast: Map({}),
    flights: List([])
});

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GLOBAL_TOAST':
            return state.set('globalToast', fromJS(action.payload));

        case 'CLEAR_GLOBAL_TOAST':
            return state.set('globalToast', Map({}));

        case 'ADD_FLIGHT':
            return state.update('flights', flightsList => flightsList.push(fromJS(action.payload)));
        default:
            return state
    }
}