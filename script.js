// ==========================================
// 1. الثوابت والإعدادات الرئيسية
// ==========================================
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxEc2wWdbcjxos6bAy4O4wJWvVEpB3lkJEHnXhHBEjv7khY-hSW4elfL_0zP0PsMIcY/exec";

const DEFAULT_PRICE = 2.50;
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80";

const CLIQ_PHONE_NUMBER = "0785522491"; 
const TARGET_PHONE_NUMBER = "962785522491"; 
const CLIQ_ALIAS = "MYCAFE"; 

let menuItems = [];
let cart = [];

// ==========================================
// 2. جلب البيانات من Google Sheets
// ==========================================
async function fetchMenuItems() {
    const container = document.getElementById("menuContainer");

    // 1. استخدام البيانات المخزنة كاش فوراً (بتفتح بنفس التكة)
    const cachedData = localStorage.getItem("menuData");
    if (cachedData) {
        try {
            menuItems = JSON.parse(cachedData);
            displayMenuItems(menuItems);
        } catch (e) {
            console.error("خطأ في قراءة الكاش", e);
        }
    } else if (container) {
        // إذا أول مرة يفتح، بنعرض كروت تحميل وهمية سريعة بدال كلمة جاري التحميل
        container.innerHTML = Array(4).fill(`
            <div class="menu-card skeleton-card" style="opacity:0.5; animation: pulse 1s infinite alternate;">
                <div style="height:120px; background:#e0e0e0; border-radius:8px;"></div>
                <div style="height:20px; background:#e0e0e0; margin:10px 0; border-radius:4px;"></div>
                <div style="height:15px; background:#e0e0e0; width:50%; border-radius:4px;"></div>
            </div>
        `).join('');
    }

    // 2. جلب البيانات الحديثة من Google Sheet بالخلفية
    try {
        const response = await fetch(GOOGLE_SHEET_URL, { redirect: "follow" });
        const data = await response.json();

        const newMenuItems = data.map((item, index) => {
            const findKey = (keyName) => {
                const found = Object.keys(item).find(k => k.toLowerCase().trim() === keyName.toLowerCase().trim());
                return found ? item[found] : null;
            };

            const name = findKey("ItemName") || findKey("Name") || "صنف بدون اسم";
            const category = findKey("Category") || "all";
            const price = findKey("Price") || DEFAULT_PRICE;
            const image = findKey("ImageUrl") || findKey("Image") || DEFAULT_IMAGE;

            return {
                id: index + 1,
                name: String(name),
                category: String(category).trim().toLowerCase(),
                price: parseFloat(price) || DEFAULT_PRICE,
                image: (image && String(image).trim() !== "") ? String(image).trim() : DEFAULT_IMAGE
            };
        });

        // حفظ البيانات بـ localStorage وتحديث الشاشة فوراً
        menuItems = newMenuItems;
        localStorage.setItem("menuData", JSON.stringify(menuItems));
        displayMenuItems(menuItems);

    } catch (error) {
        console.error("خطأ في تحميل المنيو:", error);
    }
}

// ==========================================
// 3. عرض المنيو والفلترة
// ==========================================
function displayMenuItems(items) {
    const container = document.getElementById("menuContainer");
    if (!container) return;
    
    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = "<p style='text-align:center; grid-column: 1/-1; padding: 20px;'>لا توجد عناصر في هذا القسم حالياً.</p>";
        return;
    }

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <div class="card-image-container">
                <img src="${item.image}" alt="${item.name}" class="item-img" loading="lazy" onerror="this.onerror=null;this.src='${DEFAULT_IMAGE}';">
            </div>
            <div class="card-body">
                <h3>${item.name}</h3>
                <span class="item-price">${item.price.toFixed(2)} د.أ</span>
                <button class="add-to-cart-btn" onclick="addToCart(${item.id})">إضافة للسلة +</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterCategory(category, event) {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (event && event.target) {
        event.target.classList.add('active');
    }

    const selectedCategory = String(category).toLowerCase().trim();

    if (selectedCategory === 'all') {
        displayMenuItems(menuItems);
    } else {
        const filtered = menuItems.filter(item => item.category === selectedCategory);
        displayMenuItems(filtered);
    }
}

// ==========================================
// 4. إدارة السلة (إضافة / تعديل كمية)
// ==========================================
function addToCart(id) {
    const item = menuItems.find(prod => prod.id === id);
    if (!item) return;

    const cartItem = cart.find(prod => prod.id === id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCartUI();
}

function changeQuantity(id, change) {
    const cartItem = cart.find(prod => prod.id === id);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(prod => prod.id !== id);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.getElementById("cartItemsContainer");
    const cartCount = document.getElementById("cartCount");
    const totalAmount = document.getElementById("totalAmount");
    const checkoutSection = document.getElementById("checkoutSection");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="empty-msg">السلة فارغة حالياً</p>`;
        if (checkoutSection) checkoutSection.style.display = "none";
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            count += item.quantity;

            const cartRow = document.createElement("div");
            cartRow.className = "cart-item";
            cartRow.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">${itemTotal.toFixed(2)} د.أ</span>
                </div>
                <div class="quantity-controls">
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
            `;
            cartContainer.appendChild(cartRow);
        });

        if (checkoutSection) checkoutSection.style.display = "block";
    }

    if (cartCount) cartCount.textContent = count;
    if (totalAmount) totalAmount.textContent = `${total.toFixed(2)} د.أ`;
}

function toggleCart() {
    const modal = document.getElementById("cartModal");
    if (modal) modal.classList.toggle("active");
}

// ==========================================
// 5. خيارات الدفع والنسخ
// ==========================================
function handlePaymentChange() {
    const paymentSelect = document.getElementById("paymentMethod");
    const cliqNotice = document.getElementById("cliqNotice");

    if (!paymentSelect || !cliqNotice) return;

    if (paymentSelect.value === "cliq") {
        cliqNotice.style.display = "block";
    } else {
        cliqNotice.style.display = "none";
    }
}

function copyCliqNumber() {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(CLIQ_PHONE_NUMBER).then(() => {
            alert("تم نسخ الرقم بنجاح إلى الحافظة!");
        }).catch(() => {
            fallbackCopy();
        });
    } else {
        fallbackCopy();
    }
}

function fallbackCopy() {
    const tempInput = document.createElement("input");
    tempInput.value = CLIQ_PHONE_NUMBER;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("تم نسخ الرقم بنجاح إلى الحافظة!");
}

// ==========================================
// 6. إرسال الطلب للواتس أب
// ==========================================
function sendToWhatsApp() {
    if (cart.length === 0) {
        alert("السلة فارغة! يرجى إضافة عناصر أولاً.");
        return;
    }

    const paymentSelect = document.getElementById("paymentMethod");
    let selectedPaymentText = "نقداً (عند الطاولة / الاستلام)";
    let isCliq = false;

    if (paymentSelect && paymentSelect.selectedIndex !== -1) {
        selectedPaymentText = paymentSelect.options[paymentSelect.selectedIndex].text;
        if (paymentSelect.value === "cliq") {
            isCliq = true;
        }
    }

    let message = "☕ *طلب جديد من المنيو الإلكتروني*\n\n";
    message += "*تفاصيل الطلب:*\n";

    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${index + 1}. ${item.name} (عدد: ${item.quantity}) - ${itemTotal.toFixed(2)} د.أ\n`;
    });

    message += `\n💰 *المجموع الكلي:* ${total.toFixed(2)} د.أ\n`;
    message += `💳 *طريقة الدفع:* ${selectedPaymentText}\n\n`;

    if (isCliq) {
        message += "📌 *ملاحظة:* تم اختيار الدفع عبر CliQ. (تنبيه: لن يتم البدء بتجهيز الطلب إلا بعد إرفاق صورة وصل التحويل هنا).\n";
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${TARGET_PHONE_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
}

// ==========================================
// 7. تهيئة البحث والصفحة عند التحميل
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const filtered = menuItems.filter(item => item.name.toLowerCase().includes(searchTerm));
            displayMenuItems(filtered);
        });
    }

    const cliqAliasText = document.getElementById("cliqAliasText");
    if (cliqAliasText) {
        cliqAliasText.textContent = CLIQ_ALIAS;
    }

    fetchMenuItems();
});