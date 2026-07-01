let allServices = [];

const authStorageKey = "greennestUser";
const protectedTabs = ["booking", "myBookings"];

const fallbackServiceImages = [
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=900&q=80"
];

const fallbackProductImages = [
    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80"
];

const fallbackLocations = [
    { city: "Hyderabad", locality: "Madhapur" },
    { city: "Bengaluru", locality: "Whitefield" },
    { city: "Chennai", locality: "Anna Nagar" }
];

const demoServices = [
    {
        name: "Garden Maintenance",
        description: "Regular pruning, watering, soil care, and plant health checks.",
        city: "Hyderabad",
        locality: "Madhapur",
        startingPrice: 500
    },
    {
        name: "Lawn Care",
        description: "Lawn trimming, edge cleanup, fertilizing, and seasonal upkeep.",
        city: "Bengaluru",
        locality: "Whitefield",
        startingPrice: 700
    },
    {
        name: "Balcony Garden Setup",
        description: "Planters, potting mix, placement, and easy-care plant selection.",
        city: "Chennai",
        locality: "Anna Nagar",
        startingPrice: 1200
    }
];

function switchTab(target) {
    if (protectedTabs.includes(target) && !isSignedIn()) {
        sessionStorage.setItem("greennestReturnTab", target);
        alert("Please sign in to continue.");
        target = "signin";
    }

    const headerTabs = document.querySelectorAll("header .tab-link[data-tab]");
    const contents = document.querySelectorAll(".tab-content");

    headerTabs.forEach(currentTab => currentTab.classList.remove("active"));
    contents.forEach(content => content.classList.remove("active"));

    const activeHeaderTab = document.querySelector(`header .tab-link[data-tab="${target}"]`);
    const activeContent = document.getElementById(target);

    if (activeHeaderTab) {
        activeHeaderTab.classList.add("active");
    }

    if (activeContent) {
        activeContent.classList.add("active");
    }

    if (target === "myBookings") {
        loadMyBookings();
    }
}

function initView() {
    const tabs = document.querySelectorAll(".tab-link[data-tab]");

    tabs.forEach(tab => {
        tab.addEventListener("click", function (e) {
            e.preventDefault();
            switchTab(this.getAttribute("data-tab"));
        });
    });
}

function getFallbackLocation(index) {
    return fallbackLocations[index % fallbackLocations.length];
}

function getServiceDisplayData(service, index) {
    const location = getFallbackLocation(index);

    return {
        ...service,
        city: service.city || location.city,
        locality: service.locality || location.locality,
        image: service.image || fallbackServiceImages[index % fallbackServiceImages.length],
        startingPrice: service.startingPrice || 0
    };
}

function getSelectedPaymentMethod() {
    const selectedPaymentMethod = document.querySelector("input[name='paymentMethod']:checked");
    return selectedPaymentMethod ? selectedPaymentMethod.value : "payLater";
}

function getPaymentMethodLabel() {
    return getSelectedPaymentMethod() === "payNow" ? "Pay now" : "Pay later";
}

function getPaymentAmount() {
    const selectedDuration = document.getElementById("duration").value;
    const durationMultiplier = {
        Weekly: 1,
        Monthly: 4,
        Quarterly: 12
    };

    return 50000 * (durationMultiplier[selectedDuration] || 1);
}

function isSignedIn() {
    return Boolean(localStorage.getItem(authStorageKey));
}

function getSignedInUser() {
    const savedUser = localStorage.getItem(authStorageKey);
    return savedUser ? JSON.parse(savedUser) : null;
}

function requireAuth() {
    if (isSignedIn()) {
        return true;
    }

    alert("Please sign in to continue.");
    switchTab("signin");
    return false;
}

function updateAuthUI() {
    const authNavLink = document.getElementById("authNavLink");
    const signupNavLink = document.getElementById("signupNavLink");
    const showSignupLink = document.getElementById("showSignupLink");
    const signupSection = document.getElementById("signup");
    const user = getSignedInUser();

    if (!authNavLink) {
        return;
    }

    authNavLink.textContent = user ? "Sign Out" : "Sign In";
    authNavLink.classList.toggle("signed-in", Boolean(user));

    if (signupNavLink) {
        signupNavLink.style.display = user ? "none" : "inline-block";
    }

    if (showSignupLink) {
        showSignupLink.style.display = user ? "none" : "inline";
    }

    if (signupSection) {
        signupSection.style.display = user ? "none" : "block";
    }
}

function renderProducts(products) {
    const container = document.querySelector(".product-container");
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = "<p>No products available.</p>";
        return;
    }

    products.forEach((product, index) => {
        const image = product.image || fallbackProductImages[index % fallbackProductImages.length];
        const description = product.description || "Healthy nursery-grown plant ready for your home garden.";

        container.innerHTML += `
            <div class="card product-card">
                <img src="${image}" alt="${product.name}">
                <div class="card-body">
                    <h3>${product.name}</h3>
                    <p>${description}</p>
                    <strong>₹${product.price}</strong>
                </div>
            </div>
        `;
    });
}

function renderServices(services) {
    const container = document.querySelector(".service-container");
    container.innerHTML = "";

    if (services.length === 0) {
        container.innerHTML = "<p>No services found for this city or locality.</p>";
        return;
    }

    services.forEach(displayService => {
        container.innerHTML += `
            <div class="service-card">
                <img src="${displayService.image}" alt="${displayService.name}">
                <div class="card-body">
                    <h3>${displayService.name}</h3>
                    <p>${displayService.description || "Professional gardening support for healthier green spaces."}</p>
                    <div class="service-meta">
                        <span>${displayService.city}</span>
                        <span>${displayService.locality}</span>
                    </div>
                    <div class="service-card-footer">
                        <strong>From ₹${displayService.startingPrice}</strong>
                        <button type="button" class="book-service-btn"
                            data-service="${displayService.name}"
                            data-city="${displayService.city}"
                            data-locality="${displayService.locality}">
                            Book Service
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

function updateServiceDropdown() {
    const serviceSelect = document.getElementById("service");
    const currentValue = serviceSelect.value;
    const serviceNames = [...new Set(allServices.map(service => service.name))];

    serviceSelect.innerHTML = '<option value="">Select Service Type</option>';

    serviceNames.forEach(serviceName => {
        const option = document.createElement("option");
        option.value = serviceName;
        option.textContent = serviceName;
        serviceSelect.appendChild(option);
    });

    if (serviceNames.includes(currentValue)) {
        serviceSelect.value = currentValue;
    }
}

function filterServices() {
    const citySearch = document.getElementById("serviceCitySearch").value.trim().toLowerCase();
    const localitySearch = document.getElementById("serviceLocalitySearch").value.trim().toLowerCase();

    const filteredServices = allServices.filter(service => {
        const matchesCity = service.city.toLowerCase().includes(citySearch);
        const matchesLocality = service.locality.toLowerCase().includes(localitySearch);

        return matchesCity && matchesLocality;
    });

    renderServices(filteredServices);
}

async function loadProducts() {
    try {
        const res = await fetch("/api/products");
        const data = await res.json();
        renderProducts(data);
    } catch (error) {
        console.log("Error loading products:", error);
    }
}

async function loadServices() {
    try {
        const res = await fetch("/api/gardeningServices");
        const data = await res.json();
        allServices = (data.length > 0 ? data : demoServices).map(getServiceDisplayData);
        updateServiceDropdown();
        renderServices(allServices);
    } catch (error) {
        console.log("Error loading services:", error);
        allServices = demoServices.map(getServiceDisplayData);
        updateServiceDropdown();
        renderServices(allServices);
    }
}

async function loadMyBookings() {
    if (!isSignedIn()) {
        document.querySelector(".bookings-container").innerHTML = "";
        return;
    }

    const user = getSignedInUser();

    try {
        const res = await fetch(`/api/bookings?userId=${user._id}`);
        const data = await res.json();

        const container = document.querySelector(".bookings-container");
        container.innerHTML = "";

        if (data.length === 0) {
            container.innerHTML = "<p>Currently you have no bookings.</p>";
            return;
        }

        data.forEach(booking => {
            const bookingDate = new Date(booking.date);
            const formattedDate = bookingDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            });

            container.innerHTML += `
                <div class="card booking-card">
                    <div class="card-body">
                        <h3>${booking.name}</h3>
                        <p>${booking.service}</p>
                        <p>${formattedDate}</p>
                        <p>${booking.duration || "Weekly"} service</p>
                        <p>${booking.locality || ""}${booking.locality && booking.city ? ", " : ""}${booking.city || ""}</p>
                        <p>${booking.address}</p>
                        <strong>${booking.paymentMethod?.toLowerCase() === "pay now" ? "Prepaid" : "Pay after service"}</strong>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.log("Error loading bookings:", error);
    }
}

function fillBookingForm(serviceName, city, locality) {
    if (!requireAuth()) {
        return;
    }

    document.getElementById("service").value = serviceName;
    document.getElementById("city").value = city;
    document.getElementById("locality").value = locality;
    switchTab("booking");
    checkForm();
}

async function createPaymentOrder() {
    const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: getPaymentAmount() })
    });

    if (!res.ok) {
        throw new Error("Unable to create payment order");
    }

    return res.json();
}

function handlePayment(order) {
    if (typeof Razorpay === "undefined") {
        alert("Payment gateway is not loaded. Please refresh and try again.");
        return;
    }

    const options = {
        key: "rzp_test_T50JaxvWk0jVgv",
        amount: order.amount.toString(),
        currency: order.currency || "INR",
        name: "Greennest",
        description: "Gardener Service Booking Fee",
        order_id: order.id,
        handler: async function (response) {
            console.log("Razorpay payment response:", response);

            try {
                await submitBooking();
                await loadMyBookings();
                alert("Payment Successful! Booking created.");
                document.getElementById("bookingForm").reset();
                updateBookButtonText();
                checkForm();
            } catch (error) {
                console.log(error);
                alert("Payment completed, but booking could not be saved. Please contact support.");
            }
        },
        theme: {
            color: "#3399cc"
        }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
}

async function submitBooking() {
    if (!requireAuth()) {
        throw new Error("Authentication required");
    }

    const user = getSignedInUser();

    if (!user?._id) {
        throw new Error("Authentication required");
    }

    const bookingData = {
        name: document.getElementById("name").value,
        service: document.getElementById("service").value,
        date: document.getElementById("date").value,
        duration: document.getElementById("duration").value,
        city: document.getElementById("city").value,
        locality: document.getElementById("locality").value,
        address: document.getElementById("address").value,
        paymentMethod: getPaymentMethodLabel(),
        userId: user._id
    };

    const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
    });

    if (!res.ok) {
        throw new Error("Booking failed");
    }

    return res.json();
}

function updateBookButtonText() {
    const bookBtn = document.getElementById("bookBtn");
    bookBtn.textContent = getSelectedPaymentMethod() === "payNow" ? "Continue to Pay" : "Book Now";
}

function checkForm() {
    const bookBtn = document.getElementById("bookBtn");
    const requiredFields = ["name", "service", "date", "duration", "city", "locality", "address"];
    const isValid = requiredFields.every(id => document.getElementById(id).value.trim() !== "");

    bookBtn.disabled = !isValid;
    bookBtn.classList.toggle("disabled", !isValid);
}

function init() {
    const form = document.getElementById("bookingForm");
    const signinForm = document.getElementById("signinForm");
    const signupForm = document.getElementById("signupForm");
    const showSignupLink = document.getElementById("showSignupLink");
    const showSigninLink = document.getElementById("showSigninLink");
    const authNavLink = document.getElementById("authNavLink");
    const signupNavLink = document.getElementById("signupNavLink");
    const bookingInputs = form.querySelectorAll("input, select");
    const paymentInputs = document.querySelectorAll("input[name='paymentMethod']");
    const clearServiceSearch = document.getElementById("clearServiceSearch");
    const serviceCitySearch = document.getElementById("serviceCitySearch");
    const serviceLocalitySearch = document.getElementById("serviceLocalitySearch");
    const serviceContainer = document.querySelector(".service-container");

    bookingInputs.forEach(input => {
        input.addEventListener("input", checkForm);
        input.addEventListener("change", checkForm);
    });

    paymentInputs.forEach(input => {
        input.addEventListener("change", updateBookButtonText);
    });

    serviceCitySearch.addEventListener("input", filterServices);
    serviceLocalitySearch.addEventListener("input", filterServices);

    clearServiceSearch.addEventListener("click", () => {
        serviceCitySearch.value = "";
        serviceLocalitySearch.value = "";
        renderServices(allServices);
    });

    serviceContainer.addEventListener("click", event => {
        const button = event.target.closest(".book-service-btn");

        if (!button) {
            return;
        }

        fillBookingForm(button.dataset.service, button.dataset.city, button.dataset.locality);
    });

    authNavLink.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (!isSignedIn()) {
            switchTab("signin");
            return;
        }

        localStorage.removeItem(authStorageKey);
        sessionStorage.removeItem("greennestReturnTab");
        updateAuthUI();
        switchTab("home");
    }, true);

    function showAuthForm(target) {
        if (target === "signup") {
            switchTab("signup");
        } else {
            switchTab("signin");
        }
    }

    if (showSignupLink) {
        showSignupLink.addEventListener("click", function (e) {
            e.preventDefault();
            showAuthForm("signup");
        });
    }

    if (showSigninLink) {
        showSigninLink.addEventListener("click", function (e) {
            e.preventDefault();
            showAuthForm("signin");
        });
    }

    if (signupNavLink) {
        signupNavLink.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            showAuthForm("signup");
        });
    }

    signinForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("signinEmail").value.trim();
        const password = document.getElementById("signinPassword").value.trim();

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Sign in failed");
            }

            localStorage.setItem(authStorageKey, JSON.stringify(data.user));
            signinForm.reset();
            updateAuthUI();

            const returnTab = sessionStorage.getItem("greennestReturnTab") || "booking";
            sessionStorage.removeItem("greennestReturnTab");
            switchTab(returnTab);
        } catch (error) {
            console.log("Sign in error:", error);
            alert(error.message || "Unable to sign in. Please try again.");
        }
    });

    signupForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("signupUsername").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value.trim();

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Sign up failed");
            }

            localStorage.setItem(authStorageKey, JSON.stringify(data.user));
            signupForm.reset();
            updateAuthUI();
            switchTab("booking");
        } catch (error) {
            console.log("Sign up error:", error);
            alert(error.message || "Unable to create account. Please try again.");
        }
    });

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        if (!requireAuth()) {
            return;
        }

        try {
            if (getSelectedPaymentMethod() === "payNow") {
                const order = await createPaymentOrder();
                console.log("Payment order created:", order);
                handlePayment(order);
                return;
            }

            await submitBooking();
            await loadMyBookings();

            alert("Booking Successful ✅");
            form.reset();
            updateBookButtonText();
            checkForm();
        } catch (error) {
            console.log(error);
            alert("Unable to complete this request. Please try again.");
        }
    });
}

window.onload = () => {
    initView();
    init();
    updateAuthUI();
    loadProducts();
    loadServices();
    if (isSignedIn()) {
        loadMyBookings();
    }
};
