import {useState, useEffect} from "react";
import {API_KEY, API_URL} from "../config";
import {Preloader} from "./Preloader";
import {ItemsList} from "./ItemsList";
import {Cart} from "./Cart";
import {CartList} from "./CartList";
import {Alert} from "./Alert";

function Shop() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isCartShow, setCartShow] = useState(false)
    const [alertName, setAlertName] = useState('');

    const addToCart = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.mainId === item.mainId);

        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    }
                } else {
                    return orderItem
                }
            })

            setOrder(newOrder)
        }

        setAlertName(item.displayName);

    };

    const removeFromCart = (itemId) => {
        const newOrder = order.filter((el) => el.mainId !== itemId);
        setOrder(newOrder);
    }

    const handleCartShow = () => {
        setCartShow(!isCartShow);
    }

    const incQuantity = (id) => {
        setOrder(order.map((orderItem) => {
            if (orderItem.mainId === id) {
                return {
                    ...orderItem,
                    quantity: orderItem.quantity + 1,
                }
            } else {
                return orderItem;
            }
        }));
    }

    const decQuantity = (id) => {
        setOrder(order.map((orderItem) => {
            if (orderItem.mainId === id) {
                return {
                    ...orderItem,
                    quantity: orderItem.quantity >=2 ? orderItem.quantity - 1 : 1,
                }
            } else {
                return orderItem;
            }
        }));
    }

    const CloseAlert = () => {
        setAlertName('');
    }

    useEffect(() => {
        fetch(API_URL, {headers: {'Authorization': API_KEY}})
            .then(response => response.json())
            .then((data) => {
                data.shop && setItems(data.shop);
                setLoading(false);
            });
    }, [])

    return <main className='container content'>
        <Cart quantity={order.length} handleCartShow={handleCartShow}/>
        {loading ? <Preloader/> : <ItemsList items={items} addToCart={addToCart}/>}
        {isCartShow && (
            <CartList
                handleCartShow={handleCartShow}
                removeFromCart={removeFromCart}
                incQuantity={incQuantity}
                decQuantity={decQuantity}
                order={order}
            />
        )}

        {
            alertName && <Alert name={alertName} closeAlert={CloseAlert}/>
        }
    </main>
}

export {Shop}