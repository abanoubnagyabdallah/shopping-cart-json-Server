let productsContainer = document.querySelector(".row");
// let onSale = document.querySelector("span");
let wishList;
let favoriteProducts =
  JSON.parse(localStorage.getItem("favoriteProducts")) || [];
let Cart = JSON.parse(localStorage.getItem("cart")) || [];
async function getDatFromApi() {
  let res = await fetch("http://localhost:3000/products", { method: "GET" });
  let data = await res.json();
  wishList = data;
  console.log(data);
  displayData(data);
}

function displayData(products) {
  products.forEach((product) => {
    productsContainer.innerHTML += `
        <div class="col-md-4 parent" data-id="${product.id}">
            <div class="product bg-body">
                <div class="product_image position-relative">
                    ${product.onSale ? "<span>onSale</span>" : "<div></div>"}
                    <img src="${product.product_url}" alt="" class="" />
                    <div class="product_service d-flex justify-content-center gap-3">
                        ${
                          Cart.find((ele) => ele.id == product.id)
                            ? '<i class="fa-solid fa-check"></i>'
                            : '<div class="icon"><i class="fa-solid fa-cart-shopping" ></i></div>'
                        }
                        
                        <div class="icon">
                            <i class="fa-solid fa-eye"></i>
                        </div>

                        ${
                          favoriteProducts.find((ele) => ele.id == product.id)
                            ? '<div class="icon"><i class="fa-solid fa-heart text-danger"></i></div>'
                            : '<div class="icon"><i class="fa-solid fa-heart heart-black" ></i></div>'
                        }
                        
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
  });
  addFavorite();
  addToCart();
}

function addFavorite() {
  let favoriteBtn = document.querySelectorAll(".heart-black");
  favoriteBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let parent = btn.closest(".parent");
      let id = parent.dataset.id;
      let prodObj = wishList.find((ele) => ele.id == id);
      favoriteProducts.push(prodObj);
      localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(favoriteProducts)
      );
      btn.remove();
      parent.querySelector(".icon:nth-child(3)").innerHTML += `
        <i class="fa-solid fa-heart text-danger"></i>
        `;
      console.log(favoriteProducts);
    });
  });
}

function addToCart() {
  let addToCartBtn = document.querySelectorAll(".fa-cart-shopping");
  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let parent = btn.closest(".parent");
      let id = parent.dataset.id;
      let prodObj = wishList.find((ele) => ele.id == id);
      Cart.push(prodObj);
      localStorage.setItem("cart", JSON.stringify(Cart));
      btn.remove();
      parent.querySelector(".icon:nth-child(1)").innerHTML = `
        <i class="fa-solid fa-check"></i>
      `;
      console.log(Cart);
    });
  });
}

function setUp() {
  getDatFromApi();
}
setUp();
