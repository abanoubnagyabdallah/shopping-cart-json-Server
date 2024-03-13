let productsContainer = document.querySelector(".row");
let favoriteProducts =
  JSON.parse(localStorage.getItem("favoriteProducts")) || [];

console.log(favoriteProducts);

favoriteProducts.forEach((product) => {
  productsContainer.innerHTML += `
    <div class="col-md-4 parent" data-id="${product.id}">
        <div class="product bg-body">
            <div class="product_image position-relative">
                ${product.onSale ? "<span>onSale</span>" : "<div></div>"}
                <img src="${product.product_url}" alt="" class="" />
                <div class="product_service d-flex justify-content-center gap-3">
                    <div class="icon d-none">
                        <i class="fa-solid fa-cart-shopping" ></i>
                    </div>
                    <div class="icon">
                        <i class="fa-solid fa-eye"></i>
                    </div>
                    <div class="icon">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
            <div class="product_details text-center p-3 mt-3">
                <h2>${product.product_Name}</h2>
                <div class="product_price d-flex justify-content-between align-items-center">
                    <h6>price:${product.price}</h6>
                    <h6>count:${product.count}</h6>
                </div>
            </div>

        </div>
    </div>
    `;
  deleteProduct();
});

function deleteProduct() {
  let deleteButtons = document.querySelectorAll(".fa-trash");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      let parent = btn.closest(".parent");
      let id = parent.dataset.id;
      favoriteProducts = favoriteProducts.filter((ele) => ele.id != id);
      parent.remove();
      localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(favoriteProducts)
      );
    });
  });
}

function count() {}
