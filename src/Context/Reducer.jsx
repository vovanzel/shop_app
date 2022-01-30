export function reducer(state, {type, payload}) {
    switch (type) {
        case 'SET_ITEMS':
            return {
                ...state,
                items: payload || [],
                loading: false
            };
        case 'ADD_TO_CART': {

            const itemIndex = state.order.findIndex(
                (orderItem) => orderItem.mainId === payload.mainId
            );

            let newOrder = null;
            if (itemIndex < 0) {
                const newItem = {
                    ...payload,
                    quantity: 1,
                };
                newOrder = [...state.order, newItem];
            } else {
                newOrder = state.order.map((orderItem, index) => {
                    if (index === itemIndex) {
                        return {
                            ...orderItem,
                            quantity: orderItem.quantity + 1,
                        }
                    } else {
                        return orderItem
                    }
                })
            }

            return {
                ...state,
                order: newOrder,
                alertName: payload.displayName
            }
        }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                order: state.order.filter((el) => el.id !== payload.mainId),
            };
        case 'CLOSE_ALERT':
            return {
                ...state,
                alertName: ''
            };
        case 'INCREMENT_QUANTITY':
            return {
                ...state,
                order: state.order.map((orderItem) => {
                    if (orderItem.id === payload.mainId) {
                        return {
                            ...orderItem,
                            quantity: orderItem.quantity + 1,
                        }
                    } else {
                        return orderItem;
                    }
                }),
            };
        case 'DECREMENT_QUANTITY':
            return {
                ...state,
                order: state.order.map((orderItem) => {
                    if (orderItem.id === payload.mainId) {
                        return {
                            ...orderItem,
                            quantity: orderItem.quantity >=2 ? orderItem.quantity - 1 : 1,
                        }
                    } else {
                        return orderItem;
                    }
                }),
            };
        case 'TOGGLE_CART':
            return {
                ...state,
                isCartShow: !state.isCartShow
            };
        default:
            return state;
    }
}