
import { useState } from "react";
import { products, type ClothingProduct } from "../data/data";
import Navbar from "./NavBar";
import ItemsContainer from "./ItemsContainer";
import CheckoutContainer from "./CheckoutContainer";

export default function ThriftApp() {

    const [productsList, setProductsList] =
        useState<ClothingProduct[]>(products);

    const [checkoutList, setCheckoutList] =
        useState<ClothingProduct[]>([]);

    const handleAddToCheckout = (id: number, quantity: number) => {

        const selectedProduct = productsList.find(
            (product) => product.id === id
        );

        if (!selectedProduct) {
            return;
        }

        if (quantity <= 0 || quantity > selectedProduct.quantity) {
            return;
        }

        const existingProduct = checkoutList.find(
            (product) => product.id === id
        );

        if (existingProduct) {
            setCheckoutList((prevList) =>
                prevList.map((product) =>
                    product.id === id
                        ? {
                            ...product,
                            itemQuantity: product.itemQuantity + quantity
                        }
                        : product
                )
            );
        } else {
            setCheckoutList((prevList) => [
                ...prevList,
                {
                    ...selectedProduct,
                    itemQuantity: quantity
                }
            ]);
        }

        setProductsList((prevList) =>
            prevList.map((product) =>
                product.id === id
                    ? {
                        ...product,
                        quantity: product.quantity - quantity
                    }
                    : product
            )
        );
    };

    const handleRemoveFromCheckout = (id: number) => {

        const selectedProduct = checkoutList.find(
            (product) => product.id === id
        );

        if (!selectedProduct) {
            return;
        }

        setProductsList((prevList) =>
            prevList.map((product) =>
                product.id === id
                    ? {
                        ...product,
                        quantity: product.quantity + selectedProduct.itemQuantity
                    }
                    : product
            )
        );

        setCheckoutList((prevList) =>
            prevList.filter((product) => product.id !== id)
        );
    };

    const handleEmptyCheckout = () => {

        setProductsList((prevList) =>
            prevList.map((product) => {

                const checkoutProduct = checkoutList.find(
                    (item) => item.id === product.id
                );

                if (checkoutProduct) {
                    return {
                        ...product,
                        quantity: product.quantity + checkoutProduct.itemQuantity
                    };
                }

                return product;
            })
        );

        setCheckoutList([]);
    };

    return (
        <div>
            <Navbar
    cartCount={checkoutList.reduce(
        (total, product) => total + product.itemQuantity,
        0
    )}
/>

            <div id="products">
                <ItemsContainer
                    productsList={productsList}
                    handleAddToCheckout={handleAddToCheckout}
                />
            </div>

            <div id="checkout">
                <CheckoutContainer
                    checkoutList={checkoutList}
                    handleRemoveFromCheckout={handleRemoveFromCheckout}
                    handleEmptyCheckout={handleEmptyCheckout}
                />
            </div>
        </div>
    );
}
