import { useEffect, useState } from 'react'

type CartItem = {
    id: number,
    productid: number,
    amount: number,


}

type Props = {}
export default function CarList({ }: Props) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    //after the first run we want to go and get the data
    //and then rerender again

    useEffect(

        () => {
            const asyncFunction = async () => {

                const response = await fetch("http://localhost:3000/Products")
                const data = await response.json();
                setCartItems(data);
            }
            asyncFunction()
        }, [])   //run once after the first render (twice in dev mode)
    return (
        <table>
            <tbody>
                <tr>
                    <thead>
                        <td>productid</td>
                        <td>amount</td>

                    </thead>

                </tr>
                {cartItems.map(item => (
                    <tr key={item.id}>
                        <td>{item.productid}</td>
                        <td>{item.amount}</td>
                    </tr>


                )) }

            </tbody>
        </table>
    )
}