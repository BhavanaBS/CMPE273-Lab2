import React, { Component } from 'react';
import { Container, Alert } from "react-bootstrap";
import Dish from "./Dish";
import { getMenu, deleteDish } from "../../redux/action/menuActions";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

class RestaurantMenuView extends Component {
    constructor(props) {
        super(props);
        this.setState({ 
            categories: ["Main Course", "Salads", "Appetizer", "Desserts", "Beverages"],
        });
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.setState({
            categories: ["Main Course", "Salads", "Appetizer", "Desserts", "Beverages"],
        });
        this.props.getMenu();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dishes) {
            var { dishes } = nextProps;

            if(dishes.noRecord){
                this.setState({
                    noRecord: true,
                });
            } else {
                console.log('RestaurantMenuView -> componentWillReceiveProps -> dishes : ', dishes);
                this.setState({
                    dishes: dishes,
                    activePage: 1
                });
            }
        }
        if (nextProps.deleteDishStatus && nextProps.deleteDishStatus !== this.props.deleteDishStatus) {
            var { deleteDishStatus } = nextProps;
            this.setState({
                deleteDishStatus: deleteDishStatus
            })
            this.props.getMenu();
        }
    }

    deleteDish = (e) => {
        this.props.deleteDish (e.target.name);
    };

    dishesView = (category) => {
        var categoriesView = [], dishes, dish, categoryHtml;
        if (this.state && this.state.dishes && this.state.dishes.length > 0) {
            dishes = this.state.dishes.filter(dish => dish.category === category);
            if (dishes.length > 0) {
                categoryHtml = <h3><br/>{category}</h3>;
                categoriesView.push(categoryHtml);
                for (var i = 0; i < dishes.length; i++) {
                    dish = <Dish dish={dishes[i]} deleteDish={this.deleteDish}/>;
                    categoriesView.push(dish);
                }
            }
            return categoriesView;
        }
    };

    changePage = (e) => {
        let page = this.state.activePage;
        if (e.target.text === ">" && page !== parseInt(e.target.name)) {
            page += 1;
        } else if (e.target.text === "<" && page !== parseInt(e.target.name)) {
            page -= 1;
        } else {
            page = parseInt(e.target.name);
        }
        this.setState({
            activePage: page
        });
    };

    render() {
        let message = null,
            category,
            menuRender = [],
            pagesBar = null,
            itemsToShow = 1,
            active = 1;

        if (this.state && !this.state.dishes) {
            message = <Alert variant="warning">Dishes not added to the menu yet</Alert>;
        }
        
        if (this.state && this.state.categories && this.state.categories.length > 0) {
            console.log('The categories are : ', this.state.categories);
            for (var i = 0; i < this.state.categories.length; i++) {
                category = this.dishesView(this.state.categories[i]);
                menuRender.push(category);
            }
        }

        if (this.state && this.state.deleteDishStatus) {
            if (this.state.deleteDishStatus === 'DISH_DELETED') {
                message = <Alert variant="success">Dish Deleted Successfully</Alert>;
            } else {
                message = <Alert variant="error">Dish Deletion Failed</Alert>;
            }
        }

        return (
            <Container className="justify-content">
                <br />
                <center><h2>Menu</h2></center>
                {message}

                {menuRender}
                {pagesBar}
            </Container>
        );
    }
}

RestaurantMenuView.propTypes = {
    dishes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    dishes: state.menuState.dishes,
    status: state.menuState.status,
    deleteDishStatus: state.menuState.deleteDishStatus,
});

function mapDispatchToProps(dispatch) {
    return {
        getMenu: () => dispatch(getMenu()),
        deleteDish: (dish_id) => dispatch(deleteDish(dish_id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMenuView);
