import axios from 'axios';
import { CUSTOMER_PROFILE_GET_SUCCESS, 
    CUSTOMER_PROFILE_GET_FAILED, 
    CUSTOMER_PROFILE_UPDATE_SUCCESS, 
    CUSTOMER_PROFILE_UPDATE_FAILED,  } from "./actions";
import backend from '../../components/common/serverDetails';

export function getCustomerSuccess(customer) {    
    console.log("Sending Customer Get Success Action")
    return {
        type: CUSTOMER_PROFILE_GET_SUCCESS,
        customer
    }
}

export function getCustomerFailed() {    
    console.log("Sending Customer Get Failed Action")
    return {
        type: CUSTOMER_PROFILE_GET_FAILED
    }
}

export function getCustomer(customerId) {
    console.log("customerActions -> updateCustomer -> method entered");
    return dispatch => {
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.get(`${backend}/customers/${customerId}`)
            .then(response => {
                console.log("Status Code : ",response.status, "Response JSON : ",response.data);
                if (response.status === 200 && response.data) {
                    console.log("Fetching Customer details success!", response.data);
                    dispatch(getCustomerSuccess(response.data));
                } else {
                    console.log("Fetching Customer details failed!");
                    dispatch(getCustomerFailed());
                }
            })
            .catch((error) => {
                console.log("Fetching Customer details failed!", error);
                dispatch(getCustomerFailed());
            });
    }
}

export function getCustomerUpdateAboutSuccess(customer) {    
    console.log("Sending Customer updateCustomer Success Action")
    return {
        type: CUSTOMER_PROFILE_UPDATE_SUCCESS,
        customer
    }
}

export function getCustomerUpdateAboutFailed() {    
    console.log("Sending Customer updateCustomer Failed Action")
    return {
        type: CUSTOMER_PROFILE_UPDATE_FAILED
    }
}
export function updateAboutCustomer(data) {
    console.log("customerActions -> updateCustomer -> method entered");
    return dispatch => {
        axios.defaults.withCredentials = true;
        axios.put(`${backend}/customers/profile/${data.id}`, data)
            .then(response => {
                console.log("customerActions -> updateCustomer -> Customer update status code : ",response.status, "Response JSON : ",response.data);
                if (response.status === 200) {
                    dispatch(getCustomerUpdateAboutSuccess(response.data));
                    
                } else {
                    console.log("customerActions -> updateCustomer -> Customer update failed!");
                    dispatch(getCustomerUpdateAboutFailed());
                }
            })
            .catch((error) => {
                console.log("customerActions -> updateCustomer -> Customer update Failed!", error);
                dispatch(getCustomerUpdateAboutFailed());
            });
    }
}