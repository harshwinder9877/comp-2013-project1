
import type { ClothingProduct } from "../data/data";
import CheckoutCard from "./CheckoutCard";

interface CheckoutContainerProps {
    checkoutList: ClothingProduct[];
    handleRemoveFromCheckout: (id: number) => void;
    handleEmptyCheckout: () => void;
}

export default function CheckoutContainer({
    checkoutList,
    handleRemoveFromCheckout,
    handleEmptyCheckout
}: CheckoutContainerProps) {

    const totalItems = checkoutList.reduce(
        (total, product) => total + product.itemQuantity,
        0
    );

    const grandTotal = checkoutList.reduce(
        (total, product) =>
            total + product.price * product.itemQuantity,
        0
    );

    return (
        <div className="checkoutContainer" id="checkout">

            <h2>Your Shopping Cart</h2>

            <div className="checkoutSummary">

                <p>Total Items: {totalItems}</p>

                <h3>
                    Grand Total: ${grandTotal.toFixed(2)}
                </h3>

            </div>

            {checkoutList.length === 0 && (
                <p>Your checkout is empty. Start shopping!</p>
            )}

            <div className="checkoutList">

                {checkoutList.map((product) => (
                    <CheckoutCard
                        key={product.id}
                        product={product}
                        handleRemoveFromCheckout={handleRemoveFromCheckout}
                    />
                ))}

            </div>

            <button
                onClick={handleEmptyCheckout}
                disabled={checkoutList.length === 0}
            >
                Empty Checkout
            </button>

        </div>
    );
}
