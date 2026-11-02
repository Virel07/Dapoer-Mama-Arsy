    
const WHATSAPP = "6285121592742";

const menus = [
  { id: 1, name: "Gabin Tape / Ubi Ungu", price: 5000, category: "Jajanan", emoji: "🥪", desc: "Gabin renyah dengan isian lembut dan manis." },
  { id: 2, name: "Dadar Gulung", price: 7000, category: "Jajanan", emoji: "🥞", desc: "Kulit lembut dengan isian kelapa manis." },
  { id: 3, name: "Kue Soes", price: 10000, category: "Dessert", emoji: "🧁", desc: "Kue soes lembut dengan isian creamy." },
  { id: 4, name: "Cenil Gula Merah", price: 10000, category: "Jajanan", emoji: "🍡", desc: "Cenil kenyal dengan gula merah." },
  { id: 5, name: "Onde Onde", price: 10000, category: "Jajanan", emoji: "🟤", desc: "Jajanan tradisional dengan wijen." },
  { id: 6, name: "Dimsum", price: 12000, category: "Makanan", emoji: "🥟", desc: "Dimsum gurih dan nikmat." },
  { id: 7, name: "Martabak Sayur Mini", price: 10000, category: "Jajanan", emoji: "🥙", desc: "Martabak mini dengan isian sayuran." },
  { id: 8, name: "Kue Kojo", price: 10000, category: "Dessert", emoji: "🍰", desc: "Kue tradisional yang lembut dan legit." },
  { id: 9, name: "Tahu Bakso", price: 10000, category: "Makanan", emoji: "🍢", desc: "Tahu dengan isian bakso yang gurih." },
  { id: 10, name: "Ketan Hitam Keju Lumer", price: 10000, category: "Dessert", emoji: "🍮", desc: "Ketan hitam dengan topping keju lumer." },
  { id: 11, name: "Brownies", price: 10000, category: "Dessert", emoji: "🍫", desc: "Brownies cokelat lembut dan nikmat." },
  { id: 12, name: "Bakso Jeletot", price: 10000, category: "Makanan", emoji: "🍲", desc: "Bakso dengan sensasi pedas menggoda." },
  { id: 13, name: "Mie Yamin", price: 12000, category: "Makanan", emoji: "🍜", desc: "Mie yamin dengan topping melimpah." },
  { id: 14, name: "Mie Tumis", price: 10000, category: "Makanan", emoji: "🍝", desc: "Mie tumis gurih dengan bumbu spesial." },
  { id: 15, name: "Ricebowl Ayam Suwir", price: 12000, category: "Makanan", emoji: "🍱", desc: "Pilihan ayam suwir, sambal matah, atau sambal kentang hati ampela." },
  { id: 16, name: "Nasi Uduk", price: 10000, category: "Makanan", emoji: "🍛", desc: "Nasi uduk gurih dengan aneka pelengkap." }
];

let cart = [];
let activeCategory = "Semua";

const formatRupiah = (number) => {
  return "Rp" + number.toLocaleString("id-ID");
};

// Tampilkan menu
function renderMenus() {
  const grid = document.getElementById("menu-grid");
  const keyword = document.getElementById("search").value.toLowerCase();

  const filtered = menus.filter(item => {
    const matchCategory =
      activeCategory === "Semua" ||
      item.category === activeCategory;

    const matchSearch =
      item.name.toLowerCase().includes(keyword);

    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <p style="grid-column:1/-1;text-align:center;padding:30px">
        😢 Menu tidak ditemukan. Coba kata lain ya!
      </p>`;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <article class="menu-card">
      <div class="food-image">${item.emoji}</div>
      <div class="menu-info">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="price">${formatRupiah(item.price)}</div>
        <button class="add-button" onclick="addToCart(${item.id})">
          + Tambahkan ke Keranjang
        </button>
      </div>
    </article>
  `).join("");
}

// Tambah menu
function addToCart(id) {
  const item = menus.find(menu => menu.id === id);
  const existing = cart.find(product => product.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  renderCart();

  // Efek notifikasi
  alert("❤️ " + item.name + " berhasil ditambahkan!");
}

// Ubah jumlah
function changeQty(id, amount) {
  const item = cart.find(product => product.id === id);

  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {
    cart = cart.filter(product => product.id !== id);
  }

  renderCart();
}

// Tampilkan keranjang
function renderCart() {
  const container = document.getElementById("cart-items");
  const count = document.getElementById("cart-count");
  const totalElement = document.getElementById("cart-total");

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  );

  count.textContent = totalQty;
  totalElement.textContent = formatRupiah(totalPrice);

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <span>🛍️</span>
        <p>Keranjang kamu masih kosong.</p>
        <a href="#menu">Yuk, pilih makanan dulu!</a>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <h4>${item.emoji} ${item.name}</h4>
        <small>${formatRupiah(item.price * item.qty)}</small>
      </div>

      <div class="quantity">
        <button onclick="changeQty(${item.id}, -1)">−</button>
        <strong>${item.qty}</strong>
        <button onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    </div>
  `).join("");
}

// Checkout WhatsApp
function checkout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong nih! Pilih menu dulu ya ❤️");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  );

  let message = "Halo Dapoer Mama Arsy! ❤️\n";
  message += "Saya mau pesan makanan berikut:\n\n";

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `   Jumlah: ${item.qty}\n`;
    message += `   Harga: ${formatRupiah(item.price * item.qty)}\n\n`;
  });

  message += "----------------------\n";
  message += `TOTAL: ${formatRupiah(total)}\n\n`;
  message += "Nama penerima: \n";
  message += "Alamat pengiriman: \n";
  message += "Catatan pesanan: \n\n";
  message += "Mohon konfirmasi pesanan saya ya. Terima kasih! 😊";

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

// Navigasi ke keranjang
function scrollToCart() {
  document.getElementById("keranjang").scrollIntoView({
    behavior: "smooth"
  });
}

// Filter kategori
document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    activeCategory = button.dataset.category;
    renderMenus();
  });
});

// Pencarian
document.getElementById("search").addEventListener("input", renderMenus);

// Jalankan saat halaman dibuka
renderMenus();
renderCart();
