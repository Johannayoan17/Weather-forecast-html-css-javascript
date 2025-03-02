document.addEventListener("DOMContentLoaded", function() {
    const itemSelect = document.getElementById("item");
    const quantityInput = document.getElementById("quantity");
    const addItemButton = document.getElementById("addItem");
    const cartTableBody = document.querySelector("#cart tbody");
    const totalAmountElement = document.getElementById("totalAmount");
    const checkoutButton = document.getElementById("checkout");

    const items = {
        apple: { name: "Apel", price: 10000 },
        banana: { name: "Pisang", price: 8000 },
        orange: { name: "Jeruk", price: 12000 }
    };

    let cart = [];
    let totalAmount = 0;

    function updateCart() {
        cartTableBody.innerHTML = "";
        cart.forEach((cartItem, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${cartItem.name}</td>
                <td>Rp ${cartItem.price}</td>
                <td>${cartItem.quantity}</td>
                <td>Rp ${cartItem.total}</td>
                <td><button class="removeItem" data-index="${index}">Hapus</button></td>
            `;

            cartTableBody.appendChild(row);
        });

        totalAmountElement.textContent = `Rp ${totalAmount}`;
    }

    function addItemToCart() {
        const selectedItemKey = itemSelect.value;
        const quantity = parseInt(quantityInput.value);
        const item = items[selectedItemKey];

        if (quantity > 0) {
            const cartItem = {
                name: item.name,
                price: item.price,
                quantity: quantity,
                total: item.price * quantity
            };

            cart.push(cartItem);
            totalAmount += cartItem.total;
            updateCart();
        }
    }

    function removeItemFromCart(index) {
        const cartItem = cart[index];
        totalAmount -= cartItem.total;
        cart.splice(index, 1);
        updateCart();
    }

    function checkout() {
        if (cart.length > 0) {
            alert(`Total Pembayaran: Rp ${totalAmount}\nTerima kasih telah berbelanja!`);
            cart = [];
            totalAmount = 0;
            updateCart();
        } else {
            alert("Keranjang masih kosong!");
        }
    }

    addItemButton.addEventListener("click", addItemToCart);

    cartTableBody.addEventListener("click", function(event) {
        if (event.target.classList.contains("removeItem")) {
            const index = event.target.getAttribute("data-index");
            removeItemFromCart(index);
        }
    });

    checkoutButton.addEventListener("click", checkout);
});
