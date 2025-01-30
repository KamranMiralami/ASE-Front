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
  
  const vendorMap = allVendors.reduce((acc, vendor) => {
      acc[vendor._id] = vendor;
      return acc;
  }, {});
  
  productsArray.forEach((product, index) => {
      const vendor = vendorMap[product.vendor] || { name: "نامشخص", website: "#" };
      output += `
          <div class="col-md-4 mb-4">
            <div class="card product-card shadow-sm rounded-3 h-100" data-bs-toggle="modal" data-bs-target="#productModal${index}">
              <img
                src="https://placehold.co/300x200"
                class="card-img-top mx-auto d-block"
                alt="${product.name}"
              />
              <div class="card-body d-flex flex-column p-3 text-center">
                <h5 class="card-title fw-bold text-center mb-2">
                  ${product.name}
                </h5>
                <p class="price fw-bold fs-5 mt-auto">
                  ${product.price} تومان
                </p>
              </div>
            </div>
          </div>
          
          <!-- Modal -->
          <div class="modal fade" id="productModal${index}" tabindex="-1" aria-labelledby="productModalLabel${index}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content text-center">
                <div class="modal-header d-flex justify-content-between">
                  <h5 class="modal-title ms-3" id="productModalLabel${index}">${product.name}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="بستن"></button>
                </div>
                <div class="modal-body">
                  <img src="https://placehold.co/600x400" class="img-fluid mx-auto d-block mb-3" alt="${product.name}" />
                  <p class="text-muted">${product.description}</p>
                  <p class="fw-bold">قیمت: ${product.price} تومان</p>
                  <p class="text-muted"><strong>فروشنده:</strong> <a href="${vendor.website}" target="_blank">${vendor.name}</a></p>
                  <p class="text-muted"><strong>ایجاد شده در:</strong> ${new Date(product.created_at).toLocaleString('fa-IR')}</p>
                  <p class="text-muted"><strong>آخرین بروزرسانی:</strong> ${new Date(product.updated_at).toLocaleString('fa-IR')}</p>
                </div>
                <div class="modal-footer justify-content-center">
                  <a href="${product.productUrl}" class="btn btn-primary" target="_blank">مشاهده محصول</a>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">بستن</button>
                </div>
              </div>
            </div>
          </div>
      `;
  });
  
  productsSection.innerHTML = output;
}
