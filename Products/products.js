function loadProducts() {
    const apiUrl = 'https://db-teb-api.onrender.com/product/all';
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const products = data.products; // 'products' array from your API response
      const productsContainer = document.querySelector('.u-repeater-1');
      // Clear existing product items if any
      productsContainer.innerHTML = '';
      // Iterate through the products and create product items
      products.forEach(product => {
        const productHTML = `
          <div class="u-align-center u-container-style u-products-item u-repeater-item u-white">
            <div class="u-container-layout u-similar-container u-valign-top">
              <h4 class="u-align-center u-product-control u-text">
                <a class="u-product-title-link" href="${product.productUrl}" target="_blank">${product.name}</a>
              </h4>
              <a class="u-product-title-link" href="${product.productUrl}" target="_blank">
                <img alt="${product.name}" class="u-expanded-width u-image u-image-default u-product-control" src="${product.image}" />
              </a>
              <div class="u-align-center u-product-control u-product-desc u-text">
                ${product.description}
              </div>
              <div class="u-align-center u-product-control u-product-price">
                <div class="u-price-wrapper u-spacing-10">
                  <div class="u-price u-text-palette-2-base" style="font-size: 1.875rem; font-weight: 700;">${product.price.toLocaleString()} ریال</div>
                </div>
              </div>
              <a href="${product.productUrl}" target="_blank" class="u-btn u-button-style">مشاهده و خرید</a>
            </div>
          </div>
        `;
        // Append the product HTML to the container
        productsContainer.insertAdjacentHTML('beforeend', productHTML);
      });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
  }
  
  // Call the function
  loadProducts();
  