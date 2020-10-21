import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import navbar from './common/navbar';
import landHere from './common/landingPage';

import customerLogin from './customer/CustomerLogin';
import customerSignup from './customer/CustomerSignup';
import customerHome from './customer/CustomerHome';
import customerProfile from './customer/CustomerProfile';

import restaurantHome from './restaurant/RestaurantHome';
import restaurantLogin from './restaurant/RestaurantLogin';
import restaurantSignup from './restaurant/RestaurantSignup';
import restaurantProfileUpdate from './restaurant/RestaurantProfileUpdate';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={navbar}/>
                <Route path="/home" component={landHere}/>

                <Route path="/c_login" component={customerLogin}/>
                <Route path="/c_signup" component={customerSignup}/>
                <Route path="/customer/home" component={customerHome}/>
                <Route path="/c_profile" component={customerProfile}/>

                <Route path="/r_login" component={restaurantLogin}/>
                <Route path="/r_signup" component={restaurantSignup}/>
                <Route path="/r_home" component={restaurantHome}/>
                <Route path="/r_profile" component={restaurantProfileUpdate}/>
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;