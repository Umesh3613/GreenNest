// Tab switching
const tabs = document.querySelectorAll(".tab-link[data-tab]");
const headerTabs = document.querySelectorAll("header .tab-link[data-tab]");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", function (e) {
        e.preventDefault();

        const target = this.getAttribute("data-tab");

        headerTabs.forEach(currentTab => currentTab.classList.remove("active"));
        contents.forEach(content => content.classList.remove("active"));

        const activeHeaderTab = document.querySelector(`header .tab-link[data-tab="${target}"]`);
        if (activeHeaderTab) {
            activeHeaderTab.classList.add("active");
        }

        document.getElementById(target).classList.add("active");
    });
});

// Load products
async function loadProducts() {
    try {
        const res = await fetch("/api/products");
        const data = await res.json();

        const container = document.querySelector(".product-container");
        container.innerHTML = "";
        if (data.length === 0) {
            container.innerHTML = "<p>No products available.</p>";
            return;
        }
        data.forEach(product => {
            container.innerHTML += `
                <div class="card">
                    <h3>${product.name}</h3>
                    <p>₹${product.price}</p>
                </div>
            `;
        });
    } catch (error) {
        console.log("Error loading products:", error);
    }
}
async function loadServices() {
    try {
        const res = await fetch("/api/gardeningServices");
        const data = await res.json();

        const container = document.querySelector(".service-container");
        container.innerHTML = "";
        if (data.length === 0) {
            container.innerHTML = "<p>No services available.</p>";
            return;
        }
        data.forEach(service => {
            container.innerHTML += `
                <div class="service-card">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                </div>
            `;
        });
    } catch (error) {
        console.log("Error loading services:", error);
    }
}

// Load bookings
async function loadMyBookings() {
    try {
        const res = await fetch("/api/bookings");
        const data = await res.json();

        const container = document.querySelector(".bookings-container");
        container.innerHTML = "";

        if (data.length === 0) {
            container.innerHTML = "<p>Currenly you have no bookings.</p>";
            return;
        }

        data.forEach(booking => {
            container.innerHTML += `
                <div class="card">
                    <h3>${booking.name}</h3>
                    <p>${booking.service}</p>
                    <p>${booking.date}</p>
                    <p>${booking.address}</p>
                </div>
            `;
        });
    } catch (error) {
        console.log("Error loading bookings:", error);
    }
}

// Booking form submit
const form = document.getElementById("bookingForm");
const bookBtn = document.getElementById("bookBtn");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const bookingData = {
        name: document.getElementById("name").value,
        service: document.getElementById("service").value,
        date: document.getElementById("date").value,
        address: document.getElementById("address").value
    };

    try {
        const res = await fetch("/api/gardeningServices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        });

        await res.json();

        loadMyBookings();

        alert("Booking Successful ✅");

        form.reset();

        // Disable button again after reset
        bookBtn.disabled = true;
        bookBtn.classList.add("disabled");
    } catch (error) {
        console.log(error);
        alert("Booking Failed ❌");
    }
});

// Enable/Disable button logic
const nameInput = document.getElementById("name");
const serviceInput = document.getElementById("service");
const dateInput = document.getElementById("date");
const addressInput = document.getElementById("address");

function checkForm() {
    if (
        nameInput.value.trim() !== "" &&
        serviceInput.value.trim() !== "" &&
        dateInput.value !== "" &&
        addressInput.value.trim() !== ""
    ) {
        bookBtn.disabled = false;
        bookBtn.classList.remove("disabled");
    } else {
        bookBtn.disabled = true;
        bookBtn.classList.add("disabled");
    }
}

[nameInput, serviceInput, dateInput, addressInput].forEach(input => {
    input.addEventListener("input", checkForm);
});

window.onload = () => {
    loadProducts();
    loadServices();
    loadMyBookings();
};