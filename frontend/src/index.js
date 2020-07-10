const itemURL = "http://localhost:3000/items";
const createItemURL = "http://localhost:3000/items/item";
const userURL = "http://localhost:3000/users";

document.addEventListener("DOMContentLoaded", function (e) {
  const elementDiv = document.querySelector("#data-element");
  const elementImage = document.querySelector('img[name="image"]');
  const elementName = elementDiv.querySelector('h2[name="name"]');
  const elementPrice = elementDiv.querySelector('p[name="price"]');
  const elementDescription = elementDiv.querySelector('p[name="description"]');
  const cardAddToCartBtn = document.querySelector("#add-to-cart");
  const addItemForm = document.querySelector("#item-form");
  let lastItem;
  const state = {
    cart: {},
  };

  const removeFromCart = (id) => {
    delete state.cart[id];
    const cartRow = document.querySelector(`tr[data-element-id="${id}"]`);
    cartRow.remove();
  };

  const addToCart = (element) => {
    if (!state.cart[element.id]) state.cart[element.id] = 0;
    state.cart[element.id] += 1;

    if (state.cart[element.id] > 1) {
      const cartRow = document.querySelector(
        `tr[data-element-id="${element.id}"]`
      );

      cartRow.querySelector(".element-qty").innerHTML = state.cart[element.id];

      return;
    }

    const cartBody = document.querySelector("#cart-body");
    const cartRow = document.createElement("tr");
    cartRow.setAttribute("data-element-id", element.id);
    cartRow.innerHTML = `
      <td class="hidden pb-4 md:table-cell">
        <a href="#">
          <img src="${
            element.attributes.img_url
          }" class="w-20 rounded" alt="Thumbnail">
        </a>
      </td>
      <td>
        <a href="#">
          <p class="mb-2 md:ml-4"> ${element.attributes.name} </p>
            <button class="text-gray-700 md:ml-4 remove-button">
              <small>(Remove item)</small>
            </button>
        </a>
      </td>
      <td class="justify-center md:justify-end md:flex mt-6">
        <div class="w-20 h-10">
          <span class="text-md lg:text-base font-medium element-qty">
            ${state.cart[element.id]}
          </span>
        </div>
      </td>
      <td class="hidden text-right md:table-cell">
        <span class="text-sm lg:text-base font-medium">
          ${element.attributes.description}
        </span>
      </td>
      <td class="text-right">
        <span class="text-sm lg:text-base font-medium">
        ${element.attributes.price}
        </span>
      </td>`;

    cartBody.append(cartRow);

    const removeItem = cartRow.querySelector(".remove-button");
    removeItem.addEventListener("click", () => {
      removeFromCart(element.id);
    });
  };

  //get request to rails backend
  function getItems() {
    fetch(itemURL)
      .then((resp) => resp.json())
      // .then(data => console.log(data))
      .then(renderItems);
  }

  //add items to the market place

  function renderItems(itemsObj) {
    const marketTable = document.querySelector("#items-table");
    for (const item in itemsObj) {
      // console.log(itemsObj[item])
      const items = itemsObj[item];
      // console.log(items)
      items.forEach((element) => {
        itemRow = document.createElement("tr");
        itemRow.dataset.id = element.id;
        const itemImg = element.attributes.img_url;
        const itemName = element.attributes.name;
        const itemPrice = element.attributes.price;
        const itemDesc = element.attributes.description;
        const itemQuantity = element.attributes.quantity;
        // console.log(itemRow.dataset.id)
        itemRow.innerHTML = `<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                        <img class="w-full h-full"
                            src="${itemImg}"
                            alt="" />
                    </div>
                    <div class="ml-3">
                        <p class="text-gray-900 whitespace-no-wrap">
                            ${itemName}
                        </p>
                    </div>
                </div>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap"> ${itemDesc} </p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                ${itemPrice}
                </p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                ${itemQuantity}
                </p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                    class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden
                        class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                    <button class="relative" name="add-to-cart">Add Item to Cart</button>
                </span>
            </td>`;

        itemRow.addEventListener("click", (e) => {
          elementImage.src = itemImg;
          elementName.innerHTML = itemName;
          elementPrice.innerHTML = `$${itemPrice}`;
          elementDescription.innerHTML = itemDesc;
          elementDiv.scrollIntoView();
          lastItem = element;
        });

        itemRow
          .querySelector('button[name="add-to-cart"]')
          .addEventListener("click", (e) => {
            e.stopPropagation();
            addToCart(element);
          });

        marketTable.append(itemRow);
      });
    }
  }

  cardAddToCartBtn.addEventListener("click", (e) => {
    addToCart(lastItem);
  });

  addItemForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const body = { user_id: 1 };

    Array.from(e.target.elements).forEach((e) => {
      if (!e.name) return;
      body[e.name] = e.value;
    });

    await fetch(itemURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then(() => {
      window.location.reload();
    });
  });

  document.querySelector("#checkout-btn").addEventListener("click", () => {
    for (const id in state.cart) {
      removeFromCart(id);
    }

    alert("Order successful!");
  });

  getItems();
});
