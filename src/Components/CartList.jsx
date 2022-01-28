import {CartItem} from "./CartItem";

function CartList(props) {
    const {
        order = [],
        handleCartShow = Function.prototype,
        removeFromCart = Function.prototype,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype
    } = props;

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
                            removeFromCart={removeFromCart}
                            incQuantity={incQuantity}
                            decQuantity={decQuantity}
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