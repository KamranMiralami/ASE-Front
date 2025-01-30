document.addEventListener("DOMContentLoaded", () => {
    // API endpoint for fetching vendor
    const apiUrl = "https://db-teb-api.onrender.com/vendor/all";

    // Fetch vendor from the API
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // Check if vendor exist in the response
            console.log(data);
            const { vendors } = data;
            if (Array.isArray(vendors) && vendors.length > 0) {
                allVendors=vendors;
            }
        })
        .catch((error) => {
            console.error("Error fetching vendors:", error);
        });
});
let allVendors=[];