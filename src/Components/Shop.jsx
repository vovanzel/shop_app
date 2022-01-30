import { useEffect, useContext} from "react";
import {API_KEY, API_URL} from "../config";
import {ShopContext} from "../Context/Context";
import {Preloader} from "./Preloader";
import {ItemsList} from "./ItemsList";
import {Cart} from "./Cart";
import {CartList} from "./CartList";
import {Alert} from "./Alert";

function Shop() {
    const { loading, order, isCartShow, alertName, setItems } = useContext(ShopContext);

    useEffect(() => {
        fetch(API_URL, {headers: {'Authorization': API_KEY}})
            .then(response => response.json())
            .then((data) => {
                setItems(data.shop);
            });
        //eslint-disable-next-line
    }, [])

    return <main className='container content'>
        <Cart quantity={order.length}/>
        {loading ? <Preloader/> : <ItemsList/>}
        {isCartShow && (<CartList order={order}/>)}
        {alertName && <Alert name={alertName}/>}
    </main>
}

export {Shop}