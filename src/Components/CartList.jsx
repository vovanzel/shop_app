import {CartItem} from "./CartItem";
import {useContext} from "react";
import {ShopContext} from "../Context/Context";

function CartList() {
    const { order = [], handleCartShow } = useContext(ShopContext);

    const totalPrice = order.reduce((sum, el) => {
        return sum + el.displayPrice * el.quantity
    }, 0)

    return (
        <div className='cart-wrap'>
            <ul className="collection cart-list">
                <li className="collection-item active">Корзина</li>
                {
                    order.length ? order.map(item => (
                        <CartItem
                            key={item.mainId}
                            {...item}
                        />
                    )) : (<li className="collection-item">Корзина пуста</li>)
                }
                <li className="collection-item active">
                    Общая стоимость: {totalPrice} руб.
                </li>
                <li className="collection-item">
                    <button className="btn">Оформить</button>
                </li>
                <i className="material-icons cart-close" onClick={handleCartShow}>close</i>
            </ul>
        </div>
    )
}

export {CartList}