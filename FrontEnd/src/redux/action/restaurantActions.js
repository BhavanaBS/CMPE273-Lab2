import axios from 'axios';
import { 
        RESTAURANT_PROFILE_GET_SUCCESS,
        RESTAURANT_PROFILE_GET_FAILED,
        RESTAURANT_PROFILE_UPDATE_SUCCESS,
        RESTAURANT_PROFILE_UPDATE_FAILED  } from "./actions";
import backend from '../../components/common/serverDetails';


export function getRestaurantSuccess(restaurant) {    
    console.log("Sending Restaurant Get Success Action")
    return {
        type: RESTAURANT_PROFILE_GET_SUCCESS,
        restaurant
    }
}

export function getRestaurantFailed() {    
    console.log("Sending Restaurant Get Failed Action")
    return {
        type: RESTAURANT_PROFILE_GET_FAILED
    }
}

export function updateRestaurantSuccess(restaurant) {
    console.log("Restaurant Update Action Creator", restaurant)
    return {
      type: RESTAURANT_PROFILE_UPDATE_SUCCESS,
      restaurant
    };
}

export function updateRestaurantFailed() {
    console.log("Restaurant Signup Failure Action Creator")
    return {
      type: RESTAURANT_PROFILE_UPDATE_FAILED
    };
}

export function getRestaurant(restaurantId) {
    return dispatch => {
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.get(`${backend}/restaurants/${restaurantId}`)
            .then(response => {
                console.log("Status Code : ",response.status, "Response JSON : ",response.data);
                if (response.status === 200 && response.data) {
                    console.log("Fetching restaurant details success!", response.data);
                    dispatch(getRestaurantSuccess(response.data));
                } else {
                    console.log("Fetching restaurant details failed!");
                    dispatch(getRestaurantFailed());
                }
            })
            .catch((error) => {
                console.log("Fetching restaurant details failed!", error);
                dispatch(getRestaurantFailed());
            });
    }
}

export function updateRestaurant(data) {
    console.log("restaurantActions -> updateRestaurant -> method entered");
    return dispatch => {
        axios.defaults.withCredentials = true;
        axios.put(`${backend}/restaurants/${data.id}`, data)
            .then(response => {
                console.log("restaurantActions -> updateRestaurant -> Restaurant update status code : ",response.status, "Response JSON : ",response.data);
                if (response.status === 200) {
                    dispatch(updateRestaurantSuccess(response.data));
                    
                } else {
                    console.log("restaurantActions -> updateRestaurant -> Restaurant update failed!");
                    dispatch(updateRestaurantFailed());
                }
            })
            .catch((error) => {
                console.log("restaurantActions -> updateRestaurant -> Restaurant update Failed!", error);
                dispatch(updateRestaurantFailed());
            });
    }
}
