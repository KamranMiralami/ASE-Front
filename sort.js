document.addEventListener("DOMContentLoaded", () => {
    // Listen for changes in the sort dropdown
    sortSelect.addEventListener("change", () => {
        const categorySelect = document.getElementById("categorySelect");
        const selectedCategory = categorySelect.value;

        // Filter products by category
        let filteredProducts;
        if (selectedCategory === "all") {
            filteredProducts = allProducts; // Show all products
        } else {
            filteredProducts = allProducts.filter((product) =>
                Array.isArray(product.categories) &&
                product.categories.includes(selectedCategory)
            );
        }

        // Get the current sorting order
        const sortSelect = document.getElementById("sortSelect");
        const selectedOrder = sortSelect.value;

        // Sort the filtered products
        const sortedProducts = sortProducts(filteredProducts, selectedOrder);

        // Display the sorted and filtered products
        displayProducts(sortedProducts);
    });
});
const sortSelect = document.getElementById("sortSelect");
const productsSection = document.getElementById("productsSection");
// Store the initial product order
let originalOrder = [];

// Function to save the initial product order
function saveOriginalOrder() {
    originalOrder = Array.from(productsSection.children); // Save the original product elements
}
// Function to sort products
function sortProducts(products, order) {
    if (order === "none") {
        return products; // No sorting, return as is
    }

    return [...products].sort((a, b) => {
        const priceA = parseFloat(
            a.price.toString().replace(/[^\d.]/g, "")
        );
        const priceB = parseFloat(
            b.price.toString().replace(/[^\d.]/g, "")
        );

        return order === "asc" ? priceA - priceB : priceB - priceA;
    });
}
