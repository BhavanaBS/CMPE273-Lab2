import axios from 'axios';
import { CUSTOMER_PROFILE_GET, CUSTOMER_PROFILE_UPDATE} from "./actions";
import backend from '../../components/common/serverDetails';

export const getCustomer = (customerId) => dispatch => {
    console.log("customerActions -> updateCustomer -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.get(`${backend}/profiles/customers/${customerId}`)
    .then(response => response.data)
        .then(customer => dispatch({
            type: CUSTOMER_PROFILE_GET,
            payload: customer
        }))
        .catch(error => {
            console.log(error);
        });
}

export const updateCustomerProfile = (data) => dispatch => {
    console.log("customerActions -> updateCustomer -> method entered");
    axios.defaults.headers.common['authorization']= localStorage.getItem('token');
    axios.put(`${backend}/customers/profile/update/`, data)
    .then(response => response.data)
    .then(data => {
        console.log('response.data : ', data)
        return dispatch({
            type: CUSTOMER_PROFILE_UPDATE,
            payload: data
        })
        })
        .catch(error => {
            console.log(error);
        });
}