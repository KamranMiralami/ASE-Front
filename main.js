document.addEventListener("DOMContentLoaded", () => {
    // آدرس API
    const apiUrl = "https://db-teb-api.onrender.com/product/all";

    // انتخاب المان اصلی نمایش محصولات
    const productsSection = document.getElementById("productsSection");
    // انتخاب المنت <select> برای دسته‌بندی‌ها
    const categorySelect = document.getElementById("categorySelect");


    // دریافت داده محصولات
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // چک می‌کنیم که داده حاوی آرایه products باشد
            const { products } = data;
            allProducts = products; // ذخیره در متغیر سراسری
            displayProducts(allProducts);
            saveOriginalOrder();
        })
        .catch((error) => {
            console.error("خطا در دریافت محصولات:", error);
            productsSection.innerHTML = "<p>خطایی در بارگذاری محصولات رخ داده است.</p>";
        });

    // شنونده رویداد تغییر برای فیلتر کردن محصولات براساس دسته‌بندی
    if (categorySelect) {
        categorySelect.addEventListener("change", () => {
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

    }
});
// آرایه‌ای برای نگهداری کلیه محصولات
let allProducts = [];
// تابع برای تولید و نمایش کارت‌های محصول
function displayProducts(productsArray) {
    let output = "";
    if (productsArray.length === 0) {
        output = `
          <div class="col-12">
            <div class="alert alert-warning text-center" role="alert">
              هیچ محصولی برای نمایش وجود ندارد.
            </div>
          </div>
        `;
        productsSection.innerHTML = output;
        return;
    }
    productsArray.forEach((product) => {
        output += `
            <div class="col-md-4 mb-4">
              <div class="card product-card shadow-sm rounded-3 h-100">
                <img
                  src="https://placehold.co/300x200"
                  class="card-img-top"
                  alt="${product.name}"
                />
                <div class="card-body d-flex flex-column p-3">
                  <!-- Product Name -->
                  <h5 class="card-title fw-bold text-center mb-2">
                    ${product.name}
                  </h5>
        
                  <!-- Scrollable Description -->
                  <div class="scrollable-description mb-3">
                    <p class="card-text text-muted">
                      ${product.description}
                    </p>
                  </div>
        
                  <!-- Price -->
                  <p class="price fw-bold fs-5 mt-auto">
                    ${product.price} تومان
                  </p>
        
                  <!-- Button -->
                  <a
                    href="${product.productUrl}"
                    class="btn btn-primary mt-2"
                    target="_blank"
                  >
                    مشاهده محصول
                  </a>
                </div>
              </div>
            </div>
          `;
    });

    productsSection.innerHTML = output;
}