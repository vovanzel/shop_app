import {useEffect, useContext} from "react";
import {ShopContext} from "../Context/Context";

function Alert() {
    const { alertName: name = '', closeAlert} = useContext(ShopContext);

    useEffect(() => {
        const timerId = setTimeout(closeAlert, 3000);

        return () => {
            clearTimeout(timerId);
        }
        //eslint-disable-next-line
    }, [name])

    return (
        <div id='toast-container'>
            <div className='toast'>{name} добавлен в корзину</div>
        </div>
    )
}

export {Alert}