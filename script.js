// ==========================================
// 1. الثوابت والإعدادات الرئيسية
// ==========================================
const DEFAULT_PRICE = 2.50;
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80";

// الرقم الحقيقي المستلم للطلبات وللنسخ
const CLIQ_PHONE_NUMBER = "0785522491"; 
const TARGET_PHONE_NUMBER = "962785522491"; // بصيغة الاتصال الدولي للواتس أب

// الاسم المستعار الخاص بكليك (CliQ Alias)
const CLIQ_ALIAS = "MYCAFE"; 

// ==========================================
// 2. قائمة عناصر الكافيه (Cafe Menu Items)
// ==========================================
const menuItems = [
    // مشروبات ساخنة
    { id: 1, name: "إسبريسو دبل", category: "hot_drinks", price: 1.50, image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&q=80" },
    { id: 2, name: "كابتشينو", category: "hot_drinks", price: 2.50, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80" },
    { id: 3, name: "لاتيه", category: "hot_drinks", price: 2.50, image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&q=80" },
     { id: 5, name: "سبانيش لاتيه ساخن", category: "hot_drinks", price: 3.00, image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&q=80" },
    { id: 6, name: "قهوة تركية", category: "hot_drinks", price: 1.25, image: "https://www.turkeyalaan.net/wp-content/uploads/2018/07/180302105914158Turkish-Coffee-Yawmiyati.jpg" },
    { id: 7, name: "شاي أحمر / مع نعنع", category: "hot_drinks", price: 1.00, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&q=80" },
    { id: 8, name: "هوت شوكليت", category: "hot_drinks", price: 2.50, image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=500&q=80" },

    // مشروبات باردة
    { id: 9, name: "آيس سبانيش لاتيه", category: "cold_drinks", price: 3.25, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80" },
    { id: 10, name: "آيس أمريكانو", category: "cold_drinks", price: 2.25, image: "https://images.deliveryhero.io/image/hungerstation/product/image/1107301?width=1440&quality=75" },
    { id: 11, name: "آيس موكا", category: "cold_drinks", price: 3.50, image: "https://tse3.mm.bing.net/th/id/OIP.JXrPjkODoMbTg2MTQlq36AHaLI?r=0&pid=Api&h=220&P=0" },
    { id: 13, name: "موهيتو فراولة", category: "cold_drinks", price: 2.75, image: "https://tse4.mm.bing.net/th/id/OIP.bYCCmetMNjz6697iB4khzQHaE8?r=0&pid=Api&h=220&P=0" },
    { id: 14, name: "عصير برتقال طبيعي", category: "cold_drinks", price: 2.00, image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&q=80" },
    { id: 15, name: "سموذي مانجو", category: "cold_drinks", price: 3.00, image: "https://kitchen.sayidaty.net/uploads/small/b5/b59a52327ab3e01059014b367af932ea_w550_h550.jpg" },

    // الحلويات
    { id: 16, name: "تشيز كيك نيويورك", category: "desserts", price: 3.50, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80" },
    { id: 17, name: "مولتن كيك مع آيس كريم", category: "desserts", price: 3.75, image: "https://images.deliveryhero.io/image/talabat/MenuItems/mmw_638295831754344626" },
    { id: 18, name: "كيكة الشوكولاتة", category: "desserts", price: 3.00, image: "https://kitchen.sayidaty.net/uploads/small/1b/1bf0d766358e36b1cfa05dacc669c3d1_w750_h500.jpg" },
    { id: 19, name: "تيراميسو إيطالي", category: "desserts", price: 3.50, image: "https://tse2.mm.bing.net/th/id/OIP.baysV-HBi4VH5xZSuGsZYQHaE7?r=0&pid=Api&h=220&P=0" },
    { id: 20, name: "براونيز شوكولاتة", category: "desserts", price: 2.50, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&q=80" },

    // المخبوزات والوافل
    { id: 21, name: "وافل نوتيلا مع فواكه", category: "bakery", price: 3.50, image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=500&q=80" },
    { id: 22, name: "كريب لوتس", category: "bakery", price: 3.50, image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500&q=80" },
    { id: 23, name: "بان كيك مع عسل وزبدة", category: "bakery", price: 3.00, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80" },
    { id: 24, name: "كرواسون زبدة / جبنة", category: "bakery", price: 1.50, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80" },
 
    // وجبات خفيفة
    { id: 26, name: "ساندويش كلوب دجاج", category: "snack", price: 3.50, image: "https://www.atyabtabkha.com/tachyon/sites/2/2025/09/%D9%83%D9%84%D9%88%D8%A8-%D8%B3%D8%A7%D9%86%D8%AF%D9%88%D9%8A%D8%B4-%D8%A8%D8%A7%D9%84%D8%AF%D8%AC%D8%A7%D8%AC-1024x496.jpg" },
    { id: 27, name: "ساندويش حلوم مشوي", category: "snack", price: 3.00, image: "https://kitchen.sayidaty.net/uploads/small/54/5464f725b25ee16f71dd2c8b9b98b693_w750_h500.jpg" },
    { id: 28, name: "بطاطا مع صوص", category: "snack", price: 2.00, image: "https://www.atyabtabkha.com/tachyon/sites/2/2022/09/potato-with-sauce.jpg" }
];

let cart = [];

// ==========================================
// 3. عرض المنيو والفلترة
// ==========================================
function displayMenuItems(items) {
    const container = document.getElementById("menuContainer");
    if (!container) return;
    
    container.innerHTML = "";

    items.forEach(item => {
        const imgSrc = (item.image && item.image.trim() !== "") ? item.image : DEFAULT_IMAGE;

        const card = document.createElement("div");
        card.className = "menu-card";
        card.innerHTML = `
            <div class="card-image-container">
                <img src="${imgSrc}" alt="${item.name}" class="item-img" loading="lazy" onerror="this.onerror=null;this.src='${DEFAULT_IMAGE}';">
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

    if (category === 'all') {
        displayMenuItems(menuItems);
    } else {
        const filtered = menuItems.filter(item => item.category === category);
        displayMenuItems(filtered);
    }
}

// ==========================================
// 4. إدارة السلة (إضافة / تعديل كمية)
// ==========================================
function addToCart(id) {
    const item = menuItems.find(prod => prod.id === id);
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

    if (!cartContainer) return;

    cartContainer.innerHTML = "";
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="empty-msg">السلة فارغة حالياً</p>`;
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
    }

    if (cartCount) cartCount.textContent = count;
    if (totalAmount) totalAmount.textContent = `${total.toFixed(2)} د.أ`;

    renderCheckoutSection();
}

function toggleCart() {
    const modal = document.getElementById("cartModal");
    if (modal) modal.classList.toggle("active");
}

// ==========================================
// 5. خيارات الدفع والنسخ المخفي
// ==========================================
function renderCheckoutSection() {
    let checkoutBox = document.getElementById("checkoutSection");
    
    if (cart.length === 0) {
        if (checkoutBox) checkoutBox.remove();
        return;
    }

    if (!checkoutBox) {
        const cartFooter = document.querySelector(".cart-footer");
        if (!cartFooter) return;

        checkoutBox = document.createElement("div");
        checkoutBox.id = "checkoutSection";

        checkoutBox.innerHTML = `
            <div>
                <label style="font-weight: bold; font-size: 0.9rem; display: block; margin-bottom: 5px;">طريقة الدفع:</label>
                <select id="paymentMethod" onchange="handlePaymentChange()">
                    <option value="cash">💵 نقداً (عند الطاولة / الاستلام)</option>
                    <option value="cliq">📱 كليك (CliQ)</option>
                </select>
            </div>

            <div id="cliqNotice" style="display: none; background-color: #fcf8f2; border: 1px dashed #8c5a3c; padding: 10px; border-radius: 8px; font-size: 0.85rem; color: #5a3825; margin-top: 10px; text-align: right; line-height: 1.5;">
                📌 <b>تفاصيل التحويل عبر كليك (CliQ):</b><br>
                • الاسم المستعار (Alias): <b id="cliqAliasText">${CLIQ_ALIAS}</b><br>
                • الرقم للتحويل: <span class="blurred-number">078*****91</span> 
                <button type="button" onclick="copyCliqNumber()" style="background:#8c5a3c; color:white; border:none; border-radius:4px; padding:3px 8px; cursor:pointer; font-size:0.75rem; margin-right:5px; font-family:inherit;">📋 نسخ الرقم</button><br>
                <small style="color: #666;">* اضغط نسخ الرقم للتحويل من تطبيق البنك، ثم أرفق الوصل بعد إرسال الطلب.</small>
            </div>

            <button class="whatsapp-btn" onclick="sendToWhatsApp()">
                📲 إرسال الطلب عبر الواتس أب
            </button>
        `;

        cartFooter.appendChild(checkoutBox);
    }
}

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

// دالة نسخ الرقم الصريح للحافظة (Clipboard)
function copyCliqNumber() {
    navigator.clipboard.writeText(CLIQ_PHONE_NUMBER).then(() => {
        alert("تم نسخ الرقم بنجاح إلى الحافظة!");
    }).catch(() => {
        // دعم متصفحات الهواتف قديمة التحديث
        const tempInput = document.createElement("input");
        tempInput.value = CLIQ_PHONE_NUMBER;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        alert("تم نسخ الرقم بنجاح إلى الحافظة!");
    });
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

     let message += "*تفاصيل الطلب:*\n";

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

    displayMenuItems(menuItems);
});