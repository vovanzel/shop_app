import {useContext} from "react";
import {ShopContext} from "../Context/Context";

function Item(props) {
    const {
        mainId,
        displayName,
        displayDescription,
        price,
        granted
    } = props;

    const displayPrice = price.regularPrice;

    const {addToCart} = useContext(ShopContext);

    return (
        <div className="card" id={mainId}>
            <div className="card-image">
                <img src={granted[0].images.full_background} alt={displayName} />
            </div>
            <div className="card-content">
                <span className="card-title">{displayName}</span>
                <p>{displayDescription}</p>
            </div>
            <div className="card-action">
                <button
                    className='btn'
                    onClick={() => addToCart({mainId, displayName, displayPrice})}
                >
                    Купить
                </button>
                <span className='right' style={{fontSize: '1.8rem'}}>{displayPrice} руб.</span>
            </div>
        </div>
    )

}

export {Item}