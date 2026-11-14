
import { useState } from "react";
import type { ClothingProduct } from "../data/data";
import ItemCard from "./ItemCard";

interface ItemsContainerProps {
    productsList: ClothingProduct[];
    handleAddToCheckout: (id: number, quantity: number) => void;
}

export default function ItemsContainer({
    productsList,
    handleAddToCheckout
}: ItemsContainerProps) {

    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = Array.from(
        new Set(productsList.map((product) => product.category))
    );

    const filteredProducts = productsList.filter((product) => {

        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchText.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="itemsContainer">

            <h2>Available Products</h2>

            <div className="filterControls">

                <input
                    type="text"
                    placeholder="Search clothing..."
                    value={searchText}
                    onChange={(event) =>
                        setSearchText(event.target.value)
                    }
                />

                <select
                    value={selectedCategory}
                    onChange={(event) =>
                        setSelectedCategory(event.target.value)
                    }
                >
                    <option value="All">All Categories</option>

                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

            </div>

            <p>
                Products found: {filteredProducts.length}
            </p>

            {filteredProducts.length === 0 && (
                <p>No products found.</p>
            )}

            <div className="productsList">

                {filteredProducts.map((product) => (
                    <ItemCard
                        key={product.id}
                        product={product}
                        handleAddToCheckout={handleAddToCheckout}
                    />
                ))}

            </div>

        </div>
    );
}
