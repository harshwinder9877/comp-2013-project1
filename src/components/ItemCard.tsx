
import { useState } from "react";
import type { ClothingProduct } from "../data/data";

interface ItemCardProps {
    product: ClothingProduct;
    handleAddToCheckout: (id: number, quantity: number) => void;
}

export default function ItemCard({
    product,
    handleAddToCheckout
}: ItemCardProps) {

    const [itemQuantity, setItemQuantity] = useState(0);

    const handleIncrease = () => {
        if (itemQuantity < product.quantity) {
            setItemQuantity(itemQuantity + 1);
        }
    };

    const handleDecrease = () => {
        if (itemQuantity > 0) {
            setItemQuantity(itemQuantity - 1);
        }
    };

    const handleAdd = () => {
        if (itemQuantity > 0 && itemQuantity <= product.quantity) {
            handleAddToCheckout(product.id, itemQuantity);
            setItemQuantity(0);
        }
    };

    return (
        <div className="itemCard">

            <h3>{product.name}</h3>

            <img
                src={product.image}
                alt={product.name}
            />

            <p>Fit: {product.fit}</p>
            <p>Category: {product.category}</p>
            <p>Color: {product.color}</p>
            <p>Description: {product.description}</p>
            <p>Size: {product.size}</p>

            <p>Price: ${product.price.toFixed(2)}</p>

            <p>Available Stock: {product.quantity}</p>

            <div className="quantityControls">

                <button
                    onClick={handleDecrease}
                    disabled={itemQuantity === 0}
                >
                    -
                </button>

                <span>{itemQuantity}</span>

                <button
                    onClick={handleIncrease}
                    disabled={itemQuantity >= product.quantity}
                >
                    +
                </button>

            </div>

            <button
                onClick={handleAdd}
                disabled={itemQuantity === 0}
            >
                Add to Checkout
            </button>

        </div>
    );
}
