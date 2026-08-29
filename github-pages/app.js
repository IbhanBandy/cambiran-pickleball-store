const products = [
  {
    name: "Medusa Sweatshirt",
    category: "Sweatshirts",
    price: "€10.00",
    image: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png",
    description: "Reimagine the feeling of a classic sweatshirt. Everyday essentials no longer have to be ordinary."
  },
  {
    name: "Medusa T-Shirt",
    category: "Shirts",
    price: "€10.00",
    image: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png",
    description: "Reimagine the feeling of a classic T-shirt with this cotton everyday essential."
  },
  {
    name: "Medusa Sweatpants",
    category: "Pants",
    price: "€10.00",
    image: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png",
    description: "Reimagine the feeling of classic sweatpants with a comfortable cotton staple."
  },
  {
    name: "Medusa Shorts",
    category: "Merch",
    price: "€10.00",
    image: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png",
    description: "Reimagine the feeling of classic shorts with a versatile cotton essential."
  }
]

const grid = document.querySelector("#product-grid")
const dialog = document.querySelector("#product-dialog")
const detail = document.querySelector("#product-detail")
const count = document.querySelector("#cart-count")
let cartCount = 0

grid.innerHTML = products.map((product, index) => `
  <article class="product" tabindex="0" role="button" data-index="${index}" aria-label="View ${product.name}">
    <div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy"></div>
    <div class="product-meta"><strong>${product.name}</strong><span>${product.price}</span></div>
  </article>
`).join("")

function openProduct(index) {
  const product = products[index]
  detail.innerHTML = `
    <div class="detail-image"><img src="${product.image}" alt="${product.name}"></div>
    <div class="detail-copy">
      <small>${product.category}</small>
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <div class="detail-actions"><strong>${product.price}</strong><button class="add" type="button">Add to preview cart</button></div>
      <p class="notice">Catalog preview only. Checkout requires a hosted Medusa backend.</p>
    </div>`
  detail.querySelector(".add").addEventListener("click", () => {
    cartCount += 1
    count.textContent = cartCount
    dialog.close()
  })
  dialog.showModal()
}

grid.addEventListener("click", event => {
  const product = event.target.closest(".product")
  if (product) openProduct(Number(product.dataset.index))
})

grid.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault()
    openProduct(Number(event.target.closest(".product").dataset.index))
  }
})

document.querySelector(".close").addEventListener("click", () => dialog.close())
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close()
})
