import {useContext} from "react";
import {ShopContext} from "../Context/Context";

function CartItem(props) {
    const {
        mainId,
        displayName,
        displayPrice,
        quantity,
    } = props;

    const { removeFromCart, incQuantity, decQuantity } = useContext(ShopContext);

    return (
        <li className="collection-item cart-item">
            {displayName}
            <i className="material-icons cart-icon" onClick={() => incQuantity(mainId)}>add</i>
            x{quantity}
            <i className="material-icons cart-icon" onClick={() => decQuantity(mainId)}>remove</i>
            = {displayPrice * quantity} руб.
            <span
                className="secondary-content"
                onClick={() => removeFromCart(mainId)}
            >
                <i className="material-icons cart-delete">close</i>
            </span>
        </li>
    )
}

export {CartItem}