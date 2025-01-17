document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const searchButton = document.querySelector(".my-inverted-button");

    // API base endpoint
    const apiBaseUrl = "https://db-teb-api.onrender.com/product/all?search=";

    // Click event for the search button
    if (searchButton) {
        searchButton.addEventListener("click", () => {
            // Get the input field value
            const searchText = searchInput.value.trim();
            // Construct the full URL
            const apiUrl = apiBaseUrl + encodeURIComponent(searchText);

            // Call the API
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    // data should have a 'products' property or something similar
                    const { products } = data;
                    allProducts = products;
                    // Call displayProducts with the new array
                    const categorySelect = document.getElementById("categorySelect");
                    const selectedCategory = categorySelect.value;

                    // Filter products by category
                    let filteredProducts;
                    if (selectedCategory === "all") {
                        filteredProducts = products; // Show all products
                    } else {
                        filteredProducts = products.filter((product) =>
                            Array.isArray(product.categories) &&
                            product.categories.includes(selectedCategory)
                        );
                    }

                    // Get the current sorting order
                    const sortSelect = document.getElementById("sortSelect");
                    const selectedOrder = sortSelect.value;

                    // Sort the filtered products
                    const sortedProducts = sortProducts(filteredProducts, selectedOrder);
                    displayProducts(sortedProducts);
                    saveOriginalOrder();
                })
                .catch((error) => {
                    console.error("Error fetching search results:", error);
                });
        });
    }
});
const searchInput = document.getElementById("searchInput");
function cleanString(input) {
    // Trim whitespace, remove special characters, and ensure the string is lowercase
    return input
        .value // Get the input value
        .trim() // Remove leading/trailing whitespace
        .replace(/[^\w\s]/gi, "") // Remove special characters except spaces
        .replace(/\s+/g, " "); // Replace multiple spaces with a single space
}