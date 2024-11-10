import { useEffect, useState } from 'react'

type Product = {
    productid: number,
    name: string,
    price: number,
    quantity: number
}


type Props = {}
export default function ProductList({ }: Props) {
    const [products, setProducts] = useState<Product[]>([])

    //after the first run we want to go and get the data
    //and then rerender again

    useEffect(

        () => {
            const asyncFunction = async () => {

                const response = await fetch("http://localhost:3000/Products")
                const data = await response.json();
                setProducts(data);
            }
            asyncFunction()
        }, [])   //run once after the first render (twice in dev mode)


    const addToCart = async (productId: number) => {
        const newCartItem = {
            productId: productId,
            amount: 1
        }

        const response = await fetch(' http://localhost:3000/cart', {
            method: 'POST',

            body: JSON.stringify({ newCartItem }),
            headers: { 'Content-Type': 'application/json' }


        })



    }

    return (




        <div className='d-flex flex-wrap gap 3'>


            {products.map(product =>
                <div className='flex flex-grow-1' key={product.productid}>
                    <div className='card'>
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>

                            <button className="btn btn-success" onClick={() => addToCart(product.productid)}>${product.price.toFixed(2)}</button>
                        </div>


                    </div>

                </div>

            )}



        </div>









    )

}








