import { createOrderActions, orderDetailsActions, orderPayActions, orderDeliverActions, myOrdersActions, listOrdersActions } from "../slices/orderSlices";
import { cartActions } from '../slices/cartSlices';

export const createOrder = (order) => {
    return async (dispatch, getState) => {
        dispatch(createOrderActions.createOrderRequest());

        const { login: { user } } = getState();

        const response = await fetch(`/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify(order)
        })
        const json = await response.json();
        
        if(!response.ok) {
            dispatch(createOrderActions.createOrderFail(json.message));
        } else if(response.ok) {
            dispatch(createOrderActions.createOrderSuccess(json));
            dispatch(cartActions.clearCartItems());
        }
    }
};

export const getOrderDetails = (id) => {
    return async (dispatch, getState) => {
        dispatch(orderDetailsActions.orderDetailsRequest());

        const { login: { user } } = getState();

        const response = await fetch(`/api/orders/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        if(!response.ok) {
            dispatch(orderDetailsActions.orderDetailsFail(json.message));
        } else if(response.ok) {
            dispatch(orderDetailsActions.orderDetailsSuccess(json));
        }
    }
};

export const payOrder = (id, paymentResult) => {
    return async (dispatch, getState) => {
        dispatch(orderPayActions.orderPayRequest());

        const { login: { user } } = getState();

        const response = await fetch(`/api/orders/${id}/pay`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify(paymentResult)
        })
        const json = await response.json();
        if(!response.ok) {
            dispatch(orderPayActions.orderPayFail(json.message));
        } else if(response.ok) {
            dispatch(orderPayActions.orderPaySuccess(json));
        }
    }
};

export const deliverOrder = (order) => {
    return async (dispatch, getState) => {
        dispatch(orderDeliverActions.orderDeliverRequest());

        const { login: { user } } = getState();

        const response = await fetch(`/api/orders/${order._id}/deliver`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({})
        })
        const json = await response.json();
        if(!response.ok) {
            dispatch(orderDeliverActions.orderDeliverFail(json.message));
        } else if(response.ok) {
            dispatch(orderDeliverActions.orderDeliverSuccess(json));
        }
    }
};

export const listMyOrders = () => {
    return async (dispatch, getState) => {
        dispatch(myOrdersActions.myOrdersRequest());

        const { login: { user } } = getState();

        const response = await fetch(`/api/orders/myorders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
        })
        const json = await response.json();
        if(!response.ok) {
            dispatch(myOrdersActions.myOrdersFail(json.message));
        } else if(response.ok) {
            dispatch(myOrdersActions.myOrdersSuccess(json));
        }
    }
};

export const listOrders = () => {
    return async (dispatch, getState) => {
        dispatch(listOrdersActions.listOrdersRequest());

        const { login: { user } } = getState();

        const response = await fetch(`/api/orders`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            },
        })
        const json = await response.json();
        if(!response.ok) {
            dispatch(listOrdersActions.listOrdersFail(json.message));
        } else if(response.ok) {
            dispatch(listOrdersActions.listOrdersSuccess(json));
        }
    }
};

