import axios from 'axios';
import { RESTAURANT_EVENTS_GET, RESTAURANT_EVENT_POST} from '../action/actions';
import backend from '../../components/common/serverDetails';

export const postRestaurantEvent = (data) => dispatch => {
    console.log("eventActions -> postRestaurantEvent -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.post(`${backend}/events/restaurants`, data)
    .then(response => dispatch({
        type: RESTAURANT_EVENT_POST,
        payload: response.data,
        status: 'RESTAURANT_EVENT_POST_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('eventActions -> postRestaurantEvent data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_EVENT_POST,
                payload: error.response.data,
                status: 'RESTAURANT_EVENT_POST_FAILED'
            });
        }
    });
}

export const getRestaurantEvents = (restaurant_id) => dispatch => {
    console.log("eventActions -> getRestaurantEvents -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/events/restaurants/${restaurant_id}`)
    .then(response => {
        if (response.data) {
            if (response.data === 'NO_EVENTS') {
                return { noRecord: true };
            }
            else {
                return { eventsList: response.data };
            }
        }
    })
    .then(events => dispatch({
        type: RESTAURANT_EVENTS_GET,
        payload: events,
        status: 'RESTAURANT_EVENTS_GET_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('eventActions -> getRestaurantEvents data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: RESTAURANT_EVENTS_GET,
                payload: error.response.data,
                status: 'RESTAURANT_EVENTS_GET_ERROR'
            });
        }
    });
}