// Состояние приложения
const state = {
    currentUser: null,
    cart: [],
    products: [
        { id: 1, name: 'iPhone 15 Pro Max', price: 129990, category: 'smartphones' },
        { id: 2, name: 'MacBook Pro 16"', price: 249990, category: 'laptops' },
        { id: 3, name: 'iPad Pro 12.9"', price: 99990, category: 'tablets' },
        { id: 4, name: 'AirPods Pro 2', price: 24990, category: 'audio' },
        { id: 5, name: 'Apple Watch Ultra', price: 79990, category: 'wearables' },
        { id: 6, name: 'PlayStation 5', price: 59990, category: 'gaming' },
        { id: 7, name: 'Samsung Galaxy S24 Ultra', price: 119990, category: 'smartphones' },
        { id: 8, name: 'Sony WH-1000XM5', price: 29990, category: 'audio' }
    ]
};

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    initEventListeners();
    renderProducts();
    updateCartUI();
});

// Загрузка данных пользователя
function loadUserData() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        state.currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        state.cart = JSON.parse(savedCart);
    }
}

// Инициализация обработчиков событий
function initEventListeners() {
    // Навигация
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href').substring(1);
            navigateToPage(target);
        });
    });

    // Кнопка авторизации
    document.getElementById('authBtn').addEventListener('click', () => {
        if (state.currentUser) {
            logout();
        } else {
            showPage('auth-page');
        }
    });

    // Табы авторизации
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.target.dataset.tab;
            switchAuthTab(tab);
        });
    });

    // Формы
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);

    // CTA кнопка
    document.querySelector('.cta-btn').addEventListener('click', () => {
        navigateToPage('catalog');
    });

    // Корзина
    document.querySelector('.cart-btn').addEventListener('click', () => {
        showPage('cart-page');
    });
}

// Навигация
function navigateToPage(page) {
    switch(page) {
        case 'home':
            showPage('home-page');
            break;
        case 'catalog':
            showPage('home-page');
            document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
            break;
        default:
            showPage('home-page');
    }
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Переключение табов авторизации
function switchAuthTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.toggle('active', form.id === `${tab}Form`);
    });
}

// Обработка входа
async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        state.currentUser = { username: user.username, email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
        updateAuthUI();
        showNotification('Вы успешно вошли в систему!', 'success');
        showPage('home-page');
        e.target.reset();
    } else {
        showNotification('Неверный логин или пароль', 'error');
    }
}

// Обработка регистрации
async function handleRegister(e) {
    e.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(u => u.username === username)) {
        showNotification('Пользователь с таким логином уже существует', 'error');
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    showNotification('Регистрация прошла успешно! Теперь вы можете войти.', 'success');
    switchAuthTab('login');
    e.target.reset();
}

// Выход из системы
function logout() {
    state.currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('Вы вышли из системы', 'success');
}

// Обновление UI авторизации
function updateAuthUI() {
    const authBtn = document.getElementById('authBtn');
    if (state.currentUser) {
        authBtn.textContent = state.currentUser.username;
    } else {
        authBtn.textContent = 'Войти';
    }
}

// Рендер товаров
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = state.products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image"></div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    В корзину
                </button>
            </div>
        </div>
    `).join('');
}

// Добавление в корзину
function addToCart(productId) {
    if (!state.currentUser) {
        showNotification('Войдите в систему для добавления товаров в корзину', 'error');
        showPage('auth-page');
        return;
    }

    const product = state.products.find(p => p.id === productId);
    const existingItem = state.cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        state.cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(state.cart));
    updateCartUI();
    showNotification(`${product.name} добавлен в корзину`, 'success');
}

// Обновление UI корзины
function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.querySelector('.total-price');

    if (state.cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Корзина пуста</p>';
        totalPrice.textContent = '0 ₽';
        return;
    }

    cartItems.innerHTML = state.cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image"></div>
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">${formatPrice(item.price)} × ${item.quantity}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Удалить</button>
        </div>
    `).join('');

    const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPrice.textContent = formatPrice(total);
}

// Удаление из корзины
function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(state.cart));
    updateCartUI();
    showNotification('Товар удален из корзины', 'success');
}

// Форматирование цены
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(price);
}

// Показ уведомлений
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
