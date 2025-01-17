document.addEventListener("DOMContentLoaded", () => {
    // API endpoint for fetching categories
    const apiUrl = "https://db-teb-api.onrender.com/category/all";

    // Select the dropdown element where categories will be displayed
    const categorySelect = document.getElementById("categorySelect");

    // Fetch categories from the API
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Check if categories exist in the response
            const { categories } = data;

            if (Array.isArray(categories) && categories.length > 0) {
                // Initialize category options with a default option
                let categoryOptions = `<option value="all" selected>همه دسته‌بندی‌ها</option>`;
                console.log(categories);
                // Loop through the categories and create <option> elements
                categories.forEach((category) => {
                    categoryOptions += `<option value="${category._id}">${category.catName}</option>`;
                });

                // Insert the options into the select dropdown
                if (categorySelect) {
                    categorySelect.innerHTML = categoryOptions;
                }
            } else {
                let categoryOptions = `<option value="all" selected>--</option>`;
                // Insert the options into the select dropdown
                if (categorySelect) {
                    categorySelect.innerHTML = categoryOptions;
                }
                console.error("No categories found in the response.");
            }
        })
        .catch((error) => {
            console.error("Error fetching categories:", error);
            if (categorySelect) {
                categorySelect.innerHTML =
                    "<option disabled>خطایی در بارگذاری دسته‌بندی‌ها رخ داده است</option>";
            }
        });
});
