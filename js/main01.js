/** product details 01 page **/

function changeMainImage(imageSrc) {
    // الحصول على عنصر الصورة الرئيسية
    let mainImage = document.getElementById("mainImage");

    // تغيير مصدر الصورة الرئيسية إلى الصورة التي تم النقر عليها
    mainImage.src = imageSrc;
}

// إضافة حدث النقر لكل الصور المصغرة
document.addEventListener("DOMContentLoaded", function () {
    // الحصول على جميع الصور المصغرة
    let thumbnails = document.querySelectorAll(".thumbnail");

    // إضافة حدث النقر لكل صورة مصغرة
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            changeMainImage(this.src);
        });
    });
});




/** Product Details **/

// تبديل الصور الرئيسية عند النقر على الثمبنيل
document.querySelectorAll('.thumbnails img').forEach(thumb => {
    thumb.addEventListener('click', function () {
        document.querySelector('#mainImage').src = this.src;
        document.querySelectorAll('.thumbnails img').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// زيادة/تقليل الكمية
document.getElementById('increment').addEventListener('click', () => {
    const input = document.querySelector('.quantity-selector input');
    if (input.value < 30) input.value++;
});

document.getElementById('decrement').addEventListener('click', () => {
    const input = document.querySelector('.quantity-selector input');
    if (input.value > 1) input.value--;
});





/** Shopping Cart **/
function updateQuantity(itemId, change) {
    const input = document.getElementById(`${itemId}-qty`);
    let newValue = parseInt(input.value) + change;
    if (newValue < 1) newValue = 1;
    input.value = newValue;
    updateTotals();
}

function removeItem(itemId) {
    const item = document.getElementById(itemId);
    item.style.opacity = '0';
    setTimeout(() => {
        item.remove();
        updateTotals();
    }, 300);
}

function updateTotals() {
    let subtotal = 0;

    // حساب السعر بناءً على الكميات
    const items = document.querySelectorAll(".cart-item");
    items.forEach(item => {
        const quantityInput = item.querySelector(".quantity-input");
        const priceText = item.querySelector(".text-primary").innerText;
        const price = parseFloat(priceText.replace("$", ""));
        subtotal += price * parseInt(quantityInput.value);
    });

    // تحديث الأسعار النهائية
    const shipping = 150;
    const taxes = subtotal * 0.16;
    const total = subtotal + shipping + taxes;

    document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById("total").innerText = `$${total.toFixed(2)}`;
}






/** Checkout **/
// Add real-time validation
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', function () {
        if (this.checkValidity()) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        } else {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
        }
    });
});

// Handle form submission
document.querySelector('button[type="submit"]').addEventListener('click', function (e) {
    e.preventDefault();
    // Add your payment processing logic here
    alert('Payment processed successfully!');
});





/*** Profile ***/
debugger
// Initialize profile data
var userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+962 797 999 777",
    accountType: "personal",
    profileImage: "avatar-placeholder.png"
};

// Open Edit Modal
function openEditModal() {
    debugger
    // Fill form with current data
    let userProfile = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+962 797 999 777",
        accountType: "personal",
        profileImage: "avatar-placeholder.png"
    };
    
    
    document.getElementById('editName').value = userProfile.name;
    document.getElementById('editEmail').value = userProfile.email;
    document.getElementById('editPhone').value = userProfile.phone;
    document.getElementById('editAccountType').value = userProfile.accountType;

    // Show modal
    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// Update Profile
function updateProfile(event) {
    event.preventDefault();

    // Get new values
    userProfile = {
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        accountType: document.getElementById('editAccountType').value,
        profileImage: userProfile.profileImage
    };

    // Update UI
    document.getElementById('userName').textContent = userProfile.name;
    document.getElementById('userEmail').textContent = userProfile.email;
    document.getElementById('userPhone').textContent = userProfile.phone;
    document.getElementById('accountTypeBadge').textContent =
        userProfile.accountType === 'personal' ? 'Personal Account' : 'Company Account';

    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
}

// Profile Picture Upload
document.getElementById('fileInput').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector('.profile-picture').src = e.target.result;
            userProfile.profileImage = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});


