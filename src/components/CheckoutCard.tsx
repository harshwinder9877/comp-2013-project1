
import type { ClothingProduct } from "../data/data";

interface CheckoutCardProps {
    product: ClothingProduct;
    handleRemoveFromCheckout: (id: number) => void;
}

export default function CheckoutCard({
    product,
    handleRemoveFromCheckout
}: CheckoutCardProps) {

    return (
        <div className="checkoutCard">

            <img
                src={product.image}
                alt={product.name}
            />

            <div className="checkoutDetails">

                <h3>{product.name}</h3>

                <p>
                    Price: ${product.price.toFixed(2)}
                </p>

                <p>
                    Quantity: {product.itemQuantity}
                </p>

                <p>
                    Subtotal: $
                    {(product.price * product.itemQuantity).toFixed(2)}
                </p>

                <button
                    onClick={() => handleRemoveFromCheckout(product.id)}
                >
                    Remove
                </button>

            </div>

        </div>
    );
}
