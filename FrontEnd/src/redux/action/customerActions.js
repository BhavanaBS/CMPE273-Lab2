import axios from 'axios';
import { CUSTOMER_PROFILE_GET, CUSTOMER_PROFILE_UPDATE} from "./actions";
import backend from '../../components/common/serverDetails';

export const getCustomer = (customerId) => dispatch => {
    console.log("customerActions -> getCustomer -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/profiles/customers/${customerId}`)
    .then(response => dispatch({
        type: CUSTOMER_PROFILE_GET,
        payload: response.data
    }))
    .catch(error => {
        console.log ('customerActions -> getCustomer data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMER_PROFILE_GET,
                payload: error.response.data
            });
        }
    });
}

export const updateCustomerProfile = (data) => dispatch => {
    console.log("customerActions -> updateCustomer -> method entered");
    let customerId = localStorage.getItem('customer_id');
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.put(`${backend}/profiles/customers/${customerId}`, data)
    .then(response => dispatch({
        type: CUSTOMER_PROFILE_UPDATE,
        payload: response.data,
        status: 'CUSTOMER_UPDATE_SUCCESSFUL'
    }))
    .catch(error => {
        console.log ('customerActions -> updateCustomerProfile data from error call : ', error);
        if (error.response && error.response.data) {
            return dispatch({
                type: CUSTOMER_PROFILE_UPDATE,
                payload: error.response.data,
                status: 'CUSTOMER_UPDATE_FAILED'
            });
        }
    });
}