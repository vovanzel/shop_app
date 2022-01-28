function CartItem(props) {
    const {
        mainId,
        displayName,
        displayPrice,
        quantity,
        removeFromCart = Function.prototype,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype
    } = props;

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