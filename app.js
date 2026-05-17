const STORAGE_KEYS = {
  foods: "freshboard.foods.v1",
  shopping: "freshboard.shopping.v1",
  locations: "freshboard.locations.v1",
};

const SUPABASE_URL = "https://eyljywhwgunshmhcyvjl.supabase.co";
const SUPABASE_KEY = "sb_publishable_zQUwaJ9ujGYWwdklGLY1Xg_4I5D7SpW";
const DAY = 24 * 60 * 60 * 1000;
const categories = ["全部分類", "飲料", "蔬菜", "水果", "肉類", "海鮮", "蛋奶", "冷凍食品", "調味料", "熟食", "其他"];
const storageGroups = [
  { key: "fridge", label: "冷藏", hint: "上層、中層、下層、門邊", icon: "box" },
  { key: "freezer", label: "冷凍庫", hint: "冷凍保存", icon: "clock" },
  { key: "pantry", label: "常溫櫃", hint: "不需冷藏", icon: "bag" },
];
const defaultLocations = [
  { name: "冷藏上層", group: "fridge" },
  { name: "冷藏中層", group: "fridge" },
  { name: "冷藏下層", group: "fridge" },
  { name: "冰箱門邊", group: "fridge" },
  { name: "冷凍庫", group: "freezer" },
  { name: "常溫櫃", group: "pantry" },
];

const icons = {
  layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="8" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="15" width="7" height="6" rx="1.5"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M3 4h2l2.2 10.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 1.9-1.4L21 8H6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m5 12 4.2 4.2L19 6.5"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"/><path d="m14 7 3 3"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
  use: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 3v6M16 3v6M4 11h16M6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7Z"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 8h12l-1 13H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 12a8 8 0 0 1-13.7 5.6"/><path d="M4 12A8 8 0 0 1 17.7 6.4"/><path d="M17 3v4h4M7 21v-4H3"/></svg>',
  quantity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 7h8M8 12h8M8 17h5"/><rect x="4" y="3" width="16" height="18" rx="3"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17.5 18H8a5 5 0 1 1 1.2-9.9A6.5 6.5 0 0 1 21 12.5 3.5 3.5 0 0 1 17.5 18Z"/><path d="m9.5 14 2 2 4-4"/></svg>',
};

const seedFoods = [
  { name: "鮮奶", category: "飲料", quantity: "1 瓶", storageLocation: "冰箱門邊", purchaseDate: offsetDate(-2), expiryDate: offsetDate(1), note: "早餐咖啡用" },
  { name: "雞蛋", category: "蛋奶", quantity: "8 顆", storageLocation: "冷藏中層", purchaseDate: offsetDate(-5), expiryDate: offsetDate(5), note: "" },
  { name: "雞胸肉", category: "肉類", quantity: "2 盒", storageLocation: "冷凍庫", purchaseDate: offsetDate(-8), expiryDate: offsetDate(21), note: "已分裝" },
  { name: "美生菜", category: "蔬菜", quantity: "1 顆", storageLocation: "冷藏下層", purchaseDate: offsetDate(-3), expiryDate: offsetDate(0), note: "今晚優先處理" },
  { name: "優格", category: "蛋奶", quantity: "3 杯", storageLocation: "冷藏上層", purchaseDate: offsetDate(-4), expiryDate: offsetDate(-1), note: "" },
].map((item) => createFood(item));

let foods = load(STORAGE_KEYS.foods, seedFoods);
let shopping = load(STORAGE_KEYS.shopping, [
  { id: crypto.randomUUID(), name: "氣泡水", quantity: "6 瓶", checked: false, createdAt: new Date().toISOString() },
  { id: crypto.randomUUID(), name: "香蕉", quantity: "1 串", checked: true, createdAt: new Date().toISOString() },
]);
let locations = load(STORAGE_KEYS.locations, defaultLocations);
let currentUser = null;
let remoteReady = false;
let remoteSyncTimer = null;
let supabaseClient = null;

if (window.supabase?.createClient) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

const els = {
  todayLabel: document.querySelector("#todayLabel"),
  viewTitle: document.querySelector("#viewTitle"),
  navItems: document.querySelectorAll(".nav-item"),
  views: document.querySelectorAll(".view"),
  addFoodButton: document.querySelector("#addFoodButton"),
  authButton: document.querySelector("#authButton"),
  authButtonText: document.querySelector("#authButtonText"),
  syncNote: document.querySelector("#syncNote"),
  itemDialog: document.querySelector("#itemDialog"),
  itemForm: document.querySelector("#itemForm"),
  dialogTitle: document.querySelector("#dialogTitle"),
  closeDialogButton: document.querySelector("#closeDialogButton"),
  cancelFormButton: document.querySelector("#cancelFormButton"),
  metricsGrid: document.querySelector("#metricsGrid"),
  priorityList: document.querySelector("#priorityList"),
  locationList: document.querySelector("#locationList"),
  inventoryList: document.querySelector("#inventoryList"),
  categoryFilter: document.querySelector("#categoryFilter"),
  locationFilter: document.querySelector("#locationFilter"),
  statusFilter: document.querySelector("#statusFilter"),
  searchInput: document.querySelector("#searchInput"),
  addLocationButton: document.querySelector("#addLocationButton"),
  shoppingForm: document.querySelector("#shoppingForm"),
  shoppingList: document.querySelector("#shoppingList"),
  historyList: document.querySelector("#historyList"),
  quantityDialog: document.querySelector("#quantityDialog"),
  quantityForm: document.querySelector("#quantityForm"),
  quantityTitle: document.querySelector("#quantityTitle"),
  closeQuantityButton: document.querySelector("#closeQuantityButton"),
  cancelQuantityButton: document.querySelector("#cancelQuantityButton"),
  locationDialog: document.querySelector("#locationDialog"),
  locationForm: document.querySelector("#locationForm"),
  closeLocationButton: document.querySelector("#closeLocationButton"),
  cancelLocationButton: document.querySelector("#cancelLocationButton"),
  authDialog: document.querySelector("#authDialog"),
  authForm: document.querySelector("#authForm"),
  authStatus: document.querySelector("#authStatus"),
  closeAuthButton: document.querySelector("#closeAuthButton"),
  signOutButton: document.querySelector("#signOutButton"),
  confirmDialog: document.querySelector("#confirmDialog"),
  confirmForm: document.querySelector("#confirmForm"),
  confirmIcon: document.querySelector("#confirmIcon"),
  confirmKicker: document.querySelector("#confirmKicker"),
  confirmTitle: document.querySelector("#confirmTitle"),
  confirmMessage: document.querySelector("#confirmMessage"),
  confirmActionButton: document.querySelector("#confirmActionButton"),
  cancelConfirmButton: document.querySelector("#cancelConfirmButton"),
  toast: document.querySelector("#toast"),
};

let pendingConfirmation = null;

document.querySelectorAll("[data-icon]").forEach((el) => {
  el.innerHTML = icons[el.dataset.icon] ?? "";
});

els.todayLabel.textContent = new Intl.DateTimeFormat("zh-Hant-TW", {
  month: "long",
  day: "numeric",
  weekday: "long",
}).format(new Date());

els.categoryFilter.innerHTML = categories.map((category) => `<option value="${category}">${category}</option>`).join("");
renderLocationOptions();

els.navItems.forEach((item) => item.addEventListener("click", () => setView(item.dataset.view)));
document.querySelectorAll("[data-view-jump]").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.viewJump));
});

els.addFoodButton.addEventListener("click", () => openFoodDialog());
els.authButton.addEventListener("click", openAuthDialog);
els.closeDialogButton.addEventListener("click", closeFoodDialog);
els.cancelFormButton.addEventListener("click", closeFoodDialog);
els.searchInput.addEventListener("input", renderInventory);
els.categoryFilter.addEventListener("change", renderInventory);
els.locationFilter.addEventListener("change", renderInventory);
els.statusFilter.addEventListener("change", renderInventory);
els.addLocationButton.addEventListener("click", openLocationDialog);
els.closeQuantityButton.addEventListener("click", closeQuantityDialog);
els.cancelQuantityButton.addEventListener("click", closeQuantityDialog);
els.closeLocationButton.addEventListener("click", closeLocationDialog);
els.cancelLocationButton.addEventListener("click", closeLocationDialog);
els.closeAuthButton.addEventListener("click", closeAuthDialog);
els.signOutButton.addEventListener("click", signOut);
els.cancelConfirmButton.addEventListener("click", closeConfirmDialog);

els.itemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(els.itemForm));
  const existing = foods.find((item) => item.id === data.id);
  if (existing) {
    foods = foods.map((item) =>
      item.id === data.id
        ? { ...item, ...data, updatedAt: new Date().toISOString() }
        : item
    );
  } else {
    foods.unshift(createFood(data));
  }
  saveFoods();
  closeFoodDialog();
  renderAll();
});

els.quantityForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(els.quantityForm));
  foods = foods.map((item) =>
    item.id === data.id
      ? { ...item, quantity: data.quantity.trim(), updatedAt: new Date().toISOString() }
      : item
  );
  saveFoods();
  closeQuantityDialog();
  renderAll();
  showToast("數量已更新");
});

els.locationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(els.locationForm));
  const name = data.name.trim();
  if (!name) return;
  if (!locations.some((location) => location.name === name)) {
    locations.push({ name, group: data.group });
    saveLocations();
    renderLocationOptions();
    renderAll();
    showToast("位置已新增");
  }
  closeLocationDialog();
});

els.shoppingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(els.shoppingForm));
  shopping.unshift({
    id: crypto.randomUUID(),
    name: data.name.trim(),
    quantity: data.quantity.trim(),
    checked: false,
    createdAt: new Date().toISOString(),
  });
  els.shoppingForm.reset();
  saveShopping();
  renderShopping();
});

els.confirmForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (pendingConfirmation) pendingConfirmation.onConfirm();
  closeConfirmDialog();
});

els.authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const mode = event.submitter?.value || "signIn";
  const data = Object.fromEntries(new FormData(els.authForm));
  await authenticate(mode, data.email, data.password);
});

renderAll();
initAuth();

function setView(view) {
  const titles = {
    dashboard: "今天先吃什麼？",
    inventory: "冰箱庫存",
    shopping: "購物清單",
    history: "使用紀錄",
  };
  els.viewTitle.textContent = titles[view];
  els.navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  els.views.forEach((section) => section.classList.toggle("active", section.id === `${view}View`));
}

function renderAll() {
  renderDashboard();
  renderInventory();
  renderShopping();
  renderHistory();
}

function renderDashboard() {
  const activeFoods = foods.filter((item) => item.status === "active");
  const stats = {
    expired: activeFoods.filter((item) => getExpiryState(item).key === "expired").length,
    today: activeFoods.filter((item) => getExpiryState(item).key === "today").length,
    soon: activeFoods.filter((item) => ["today", "soon"].includes(getExpiryState(item).key)).length,
    total: activeFoods.length,
  };

  const cards = [
    { label: "已過期", value: stats.expired, icon: "clock", color: "var(--red)", bg: "#fde4e1" },
    { label: "今天到期", value: stats.today, icon: "use", color: "var(--orange)", bg: "#ffe7d6" },
    { label: "3 天內", value: stats.soon, icon: "bag", color: "var(--gold)", bg: "#fff0bd" },
    { label: "庫存總數", value: stats.total, icon: "box", color: "var(--green)", bg: "var(--mint)" },
  ];

  els.metricsGrid.innerHTML = cards.map((card) => `
    <article class="metric-card">
      <span class="metric-icon" style="color:${card.color};background:${card.bg}">${icons[card.icon]}</span>
      <strong>${card.value}</strong>
      <span>${card.label}</span>
    </article>
  `).join("");

  const priority = activeFoods
    .map((item) => ({ item, state: getExpiryState(item) }))
    .filter(({ state }) => state.days <= 7)
    .sort((a, b) => a.state.days - b.state.days)
    .slice(0, 6);

  els.priorityList.innerHTML = priority.length
    ? priority.map(({ item }) => foodCard(item, { compact: true })).join("")
    : empty("目前沒有 7 天內到期的食材。");

  const byLocation = activeFoods.reduce((acc, item) => {
    acc[item.storageLocation] = (acc[item.storageLocation] || 0) + 1;
    return acc;
  }, {});
  const max = Math.max(...Object.values(byLocation), 1);
  els.locationList.innerHTML = Object.entries(byLocation).length
    ? Object.entries(byLocation).map(([location, count]) => `
      <div class="location-row">
        <strong>${escapeHTML(location)}</strong>
        <span>${count} 項</span>
        <div class="location-meter"><span style="width:${(count / max) * 100}%"></span></div>
      </div>
    `).join("")
    : empty("還沒有庫存資料。");
}

function renderInventory() {
  const query = els.searchInput.value.trim().toLowerCase();
  const category = els.categoryFilter.value;
  const locationValue = els.locationFilter.value;
  const status = els.statusFilter.value;

  const filtered = foods
    .filter((item) => item.status === "active")
    .filter((item) => category === "全部分類" || item.category === category)
    .filter((item) => {
      if (locationValue === "all") return true;
      if (locationValue.startsWith("group:")) return getStorageGroup(item.storageLocation) === locationValue.replace("group:", "");
      return item.storageLocation === locationValue;
    })
    .filter((item) => {
      const state = getExpiryState(item).key;
      return status === "all" || state === status;
    })
    .filter((item) => {
      const haystack = `${item.name} ${item.note} ${item.storageLocation} ${item.category}`.toLowerCase();
      return !query || haystack.includes(query);
    })
    .sort((a, b) => getExpiryState(a).days - getExpiryState(b).days);

  els.inventoryList.innerHTML = filtered.length
    ? storageBoard(filtered)
    : empty("沒有符合條件的食材。");

  bindFoodActions(els.inventoryList);
  bindFoodActions(els.priorityList);
}

function renderLocationOptions() {
  const selected = els.locationFilter?.value || "all";
  const options = [
    '<option value="all">全部位置</option>',
    ...storageGroups.map((group) => `<option value="group:${group.key}">${group.label}</option>`),
    ...locations.map((location) => `<option value="${escapeHTML(location.name)}">${escapeHTML(location.name)}</option>`),
  ];
  els.locationFilter.innerHTML = options.join("");
  if ([...els.locationFilter.options].some((option) => option.value === selected)) {
    els.locationFilter.value = selected;
  }

  const locationSelect = els.itemForm.elements.storageLocation;
  const current = locationSelect.value || "冷藏中層";
  locationSelect.innerHTML = locations
    .map((location) => `<option value="${escapeHTML(location.name)}">${escapeHTML(location.name)}</option>`)
    .join("");
  locationSelect.value = locations.some((location) => location.name === current) ? current : "冷藏中層";
}

function storageBoard(items) {
  const grouped = storageGroups.map((group) => ({
    ...group,
    items: items.filter((item) => getStorageGroup(item.storageLocation) === group.key),
  }));

  return `
    <div class="storage-board">
      ${grouped.map((group) => `
        <section class="storage-section">
          <header class="storage-section-header">
            <div class="storage-section-title">
              <span class="storage-icon">${icons[group.icon]}</span>
              <div>
                <h3>${group.label}</h3>
                <p>${group.hint}</p>
              </div>
            </div>
            <span class="storage-count">${group.items.length}</span>
          </header>
          <div class="storage-items">
            ${group.items.length ? group.items.map((item) => foodCard(item)).join("") : empty(`這裡目前沒有食材。`)}
          </div>
        </section>
      `).join("")}
    </div>
  `;
}

function renderShopping() {
  els.shoppingList.innerHTML = shopping.length
    ? shopping.map((item) => `
      <div class="shopping-row ${item.checked ? "done" : ""}">
        <label>
          <input type="checkbox" data-shopping-check="${item.id}" ${item.checked ? "checked" : ""} />
          <strong>${escapeHTML(item.name)}</strong>
          ${item.quantity ? `<span>${escapeHTML(item.quantity)}</span>` : ""}
        </label>
        <div>
          <button class="item-action" data-shopping-convert="${item.id}" type="button" aria-label="轉成食材">${icons.plus}</button>
          <button class="item-action" data-shopping-delete="${item.id}" type="button" aria-label="刪除">${icons.trash}</button>
        </div>
      </div>
    `).join("")
    : empty("購物清單是空的。");

  els.shoppingList.querySelectorAll("[data-shopping-check]").forEach((input) => {
    input.addEventListener("change", () => {
      shopping = shopping.map((item) => item.id === input.dataset.shoppingCheck ? { ...item, checked: input.checked } : item);
      saveShopping();
      renderShopping();
    });
  });
  els.shoppingList.querySelectorAll("[data-shopping-delete]").forEach((button) => {
    button.addEventListener("click", () => {
      confirmShoppingDelete(button.dataset.shoppingDelete);
    });
  });
  els.shoppingList.querySelectorAll("[data-shopping-convert]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = shopping.find((entry) => entry.id === button.dataset.shoppingConvert);
      if (item) openFoodDialog({ name: item.name, quantity: item.quantity || "1 份", category: "其他" });
    });
  });
}

function renderHistory() {
  const history = foods
    .filter((item) => item.status !== "active")
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  els.historyList.innerHTML = history.length
    ? history.map((item) => `
      <div class="history-row">
        <div>
          <strong>${escapeHTML(item.name)}</strong>
          <span>${item.status === "used" ? "已用完" : "已丟棄"}</span>
        </div>
        <div class="history-actions">
          <span>${formatDate(item.updatedAt)}</span>
          <button class="item-action" data-history-shopping="${item.id}" type="button" aria-label="加入購物">${icons.cart}</button>
          <button class="item-action" data-history-restore="${item.id}" type="button" aria-label="補回庫存">${icons.refresh}</button>
        </div>
      </div>
    `).join("")
    : empty("還沒有已用完或已丟棄的紀錄。");

  els.historyList.querySelectorAll("[data-history-shopping]").forEach((button) => {
    button.addEventListener("click", () => addFoodToShopping(button.dataset.historyShopping));
  });
  els.historyList.querySelectorAll("[data-history-restore]").forEach((button) => {
    button.addEventListener("click", () => restoreFoodFromHistory(button.dataset.historyRestore));
  });
}

function foodCard(item, options = {}) {
  const state = getExpiryState(item);
  return `
    <article class="food-card" data-food-id="${item.id}">
      <div class="food-card-main">
        <div class="food-topline">
          <span class="food-name">${escapeHTML(item.name)}</span>
          <span class="badge ${state.key}">${state.label}</span>
        </div>
        <div class="food-meta">
          <span>${escapeHTML(item.quantity)}</span>
          <span>${escapeHTML(item.category)}</span>
          <span>${escapeHTML(item.storageLocation)}</span>
          <span>到期 ${formatDate(item.expiryDate)}</span>
        </div>
        ${item.note ? `<div class="food-note">${escapeHTML(item.note)}</div>` : ""}
      </div>
      <div class="food-actions">
        <button class="item-action" data-edit="${item.id}" type="button" aria-label="編輯">${icons.edit}</button>
        ${options.compact ? "" : `<button class="item-action" data-quantity="${item.id}" type="button" aria-label="調整數量">${icons.quantity}</button>`}
        ${options.compact ? "" : `<button class="item-action" data-restock="${item.id}" type="button" aria-label="加入購物">${icons.cart}</button>`}
        ${options.compact ? "" : `<button class="item-action" data-used="${item.id}" type="button" aria-label="已用完">${icons.check}</button>`}
        ${options.compact ? "" : `<button class="item-action" data-discard="${item.id}" type="button" aria-label="已丟棄">${icons.trash}</button>`}
      </div>
    </article>
  `;
}

function bindFoodActions(root) {
  root.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = foods.find((entry) => entry.id === button.dataset.edit);
      openFoodDialog(item);
    });
  });
  root.querySelectorAll("[data-used]").forEach((button) => {
    button.addEventListener("click", () => confirmFoodStatus(button.dataset.used, "used"));
  });
  root.querySelectorAll("[data-discard]").forEach((button) => {
    button.addEventListener("click", () => confirmFoodStatus(button.dataset.discard, "discarded"));
  });
  root.querySelectorAll("[data-quantity]").forEach((button) => {
    button.addEventListener("click", () => openQuantityDialog(button.dataset.quantity));
  });
  root.querySelectorAll("[data-restock]").forEach((button) => {
    button.addEventListener("click", () => addFoodToShopping(button.dataset.restock));
  });
}

function confirmFoodStatus(id, status) {
  const item = foods.find((entry) => entry.id === id);
  if (!item) return;
  const isUsed = status === "used";
  openConfirmDialog({
    kicker: isUsed ? "標記已用完" : "移到丟棄紀錄",
    title: isUsed ? `確定「${item.name}」已用完？` : `確定要丟棄「${item.name}」？`,
    message: isUsed
      ? "確認後會從目前庫存移除，並保留在使用紀錄中。"
      : "確認後會從目前庫存移除，並保留在丟棄紀錄中。",
    actionLabel: isUsed ? "確認用完" : "確認丟棄",
    tone: isUsed ? "safe" : "danger",
    onConfirm: () => updateFoodStatus(id, status),
  });
}

function confirmShoppingDelete(id) {
  const item = shopping.find((entry) => entry.id === id);
  if (!item) return;
  openConfirmDialog({
    kicker: "刪除購物項目",
    title: `確定刪除「${item.name}」？`,
    message: "確認後會從購物清單移除。這個動作不會影響冰箱庫存。",
    actionLabel: "確認刪除",
    tone: "danger",
    onConfirm: () => {
      shopping = shopping.filter((entry) => entry.id !== id);
      saveShopping();
      renderShopping();
      showToast("購物項目已刪除");
    },
  });
}

function openFoodDialog(item = {}) {
  renderLocationOptions();
  els.dialogTitle.textContent = item.id ? "編輯食材" : "新增食材";
  els.itemForm.reset();
  const defaults = {
    id: "",
    name: "",
    category: "其他",
    quantity: "1 份",
    storageLocation: "冷藏中層",
    purchaseDate: offsetDate(0),
    expiryDate: offsetDate(7),
    note: "",
    ...item,
  };
  Object.entries(defaults).forEach(([key, value]) => {
    if (els.itemForm.elements[key]) els.itemForm.elements[key].value = value || "";
  });
  els.itemDialog.showModal();
}

function closeFoodDialog() {
  els.itemDialog.close();
}

function openQuantityDialog(id) {
  const item = foods.find((entry) => entry.id === id);
  if (!item) return;
  els.quantityTitle.textContent = `調整「${item.name}」數量`;
  els.quantityForm.elements.id.value = item.id;
  els.quantityForm.elements.quantity.value = item.quantity;
  els.quantityDialog.showModal();
}

function closeQuantityDialog() {
  els.quantityDialog.close();
}

function openLocationDialog() {
  els.locationForm.reset();
  els.locationDialog.showModal();
}

function closeLocationDialog() {
  els.locationDialog.close();
}

function openAuthDialog() {
  updateAuthUI();
  els.authDialog.showModal();
}

function closeAuthDialog() {
  els.authDialog.close();
}

function openConfirmDialog({ kicker, title, message, actionLabel, tone, onConfirm }) {
  pendingConfirmation = { onConfirm };
  els.confirmKicker.textContent = kicker;
  els.confirmTitle.textContent = title;
  els.confirmMessage.textContent = message;
  els.confirmActionButton.textContent = actionLabel;
  els.confirmActionButton.classList.toggle("safe-confirm", tone === "safe");
  els.confirmIcon.innerHTML = tone === "safe" ? icons.check : icons.trash;
  els.confirmIcon.classList.toggle("safe-confirm", tone === "safe");
  els.confirmDialog.showModal();
}

function closeConfirmDialog() {
  pendingConfirmation = null;
  els.confirmDialog.close();
}

function updateFoodStatus(id, status) {
  foods = foods.map((item) =>
    item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item
  );
  saveFoods();
  renderAll();
}

function addFoodToShopping(id) {
  const item = foods.find((entry) => entry.id === id);
  if (!item) return;
  shopping.unshift({
    id: crypto.randomUUID(),
    name: item.name,
    quantity: item.quantity,
    checked: false,
    createdAt: new Date().toISOString(),
  });
  saveShopping();
  renderShopping();
  showToast(`已把「${item.name}」加入購物清單`);
}

function restoreFoodFromHistory(id) {
  const item = foods.find((entry) => entry.id === id);
  if (!item) return;
  openFoodDialog({
    ...item,
    id: "",
    status: "active",
    purchaseDate: offsetDate(0),
    expiryDate: offsetDate(7),
    note: item.note,
  });
}

function getExpiryState(item) {
  const today = startOfDay(new Date());
  const expiry = startOfDay(new Date(`${item.expiryDate}T00:00:00`));
  const days = Math.round((expiry - today) / DAY);
  if (days < 0) return { key: "expired", days, label: `過期 ${Math.abs(days)} 天` };
  if (days === 0) return { key: "today", days, label: "今天到期" };
  if (days <= 3) return { key: "soon", days, label: `${days} 天內` };
  if (days <= 7) return { key: "week", days, label: `${days} 天內` };
  return { key: "safe", days, label: `${days} 天後` };
}

function getStorageGroup(location) {
  const savedLocation = locations.find((item) => item.name === location);
  if (savedLocation) return savedLocation.group;
  if (location.includes("冷凍")) return "freezer";
  if (location.includes("常溫")) return "pantry";
  return "fridge";
}

function createFood(data) {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    name: data.name.trim(),
    category: data.category,
    quantity: data.quantity.trim(),
    storageLocation: data.storageLocation,
    purchaseDate: data.purchaseDate || offsetDate(0),
    expiryDate: data.expiryDate,
    note: data.note?.trim() || "",
    status: "active",
    createdAt: now,
    updatedAt: now,
  };
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveFoods() {
  localStorage.setItem(STORAGE_KEYS.foods, JSON.stringify(foods));
  queueRemoteSync();
}

function saveShopping() {
  localStorage.setItem(STORAGE_KEYS.shopping, JSON.stringify(shopping));
  queueRemoteSync();
}

function saveLocations() {
  localStorage.setItem(STORAGE_KEYS.locations, JSON.stringify(locations));
  queueRemoteSync();
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 2200);
}

function offsetDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-Hant-TW", {
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function empty(text) {
  return `<div class="empty-state">${text}</div>`;
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

async function initAuth() {
  if (!supabaseClient) {
    updateAuthUI("無法載入 Supabase client，先使用本機模式。");
    return;
  }

  const { data, error } = await supabaseClient.auth.getSession();
  if (error) {
    updateAuthUI("讀取登入狀態失敗，先使用本機模式。");
    return;
  }

  currentUser = data.session?.user || null;
  updateAuthUI();

  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    currentUser = session?.user || null;
    remoteReady = false;
    updateAuthUI();
    if (currentUser) await loadRemoteData();
  });

  if (currentUser) await loadRemoteData();
}

async function authenticate(mode, email, password) {
  if (!supabaseClient) {
    showToast("Supabase client 尚未載入");
    return;
  }

  setAuthLoading(true);
  const authCall = mode === "signUp"
    ? supabaseClient.auth.signUp({ email, password })
    : supabaseClient.auth.signInWithPassword({ email, password });
  const { data, error } = await authCall;
  setAuthLoading(false);

  if (error) {
    els.authStatus.textContent = error.message;
    showToast("登入失敗，請檢查帳號或密碼");
    return;
  }

  currentUser = data.session?.user || null;
  updateAuthUI();
  if (currentUser) {
    await loadRemoteData();
    closeAuthDialog();
    showToast(mode === "signUp" ? "帳號已建立並開始同步" : "已登入並開始同步");
  } else {
    els.authStatus.textContent = "帳號已建立，請依照 Supabase 設定完成 email 驗證後再登入。";
  }
}

async function signOut() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signOut();
  currentUser = null;
  remoteReady = false;
  updateAuthUI();
  closeAuthDialog();
  showToast("已登出，改用本機資料");
}

function setAuthLoading(isLoading) {
  els.authForm.querySelectorAll("button, input").forEach((control) => {
    control.disabled = isLoading;
  });
}

function updateAuthUI(message) {
  const signedIn = Boolean(currentUser);
  const email = currentUser?.email || "";
  els.authButtonText.textContent = signedIn ? "已同步" : "登入同步";
  els.authButton.classList.toggle("synced", signedIn);
  els.signOutButton.style.display = signedIn ? "inline-flex" : "none";
  els.authForm.elements.email.value = signedIn ? email : els.authForm.elements.email.value;
  els.authStatus.textContent = message || (signedIn
    ? `已登入 ${email}。資料會同步到 Supabase。`
    : "登入後，這台裝置的資料會同步到 Supabase。");
  els.syncNote.textContent = signedIn
    ? `已登入 ${email}，資料會同步到 Supabase。`
    : "資料目前儲存在這台裝置的瀏覽器內。";
}

async function loadRemoteData() {
  if (!currentUser || !supabaseClient) return;

  try {
    const [{ data: remoteFoods, error: foodsError }, { data: remoteShopping, error: shoppingError }, { data: remoteLocations, error: locationsError }] = await Promise.all([
      supabaseClient.from("food_items").select("*").order("updated_at", { ascending: false }),
      supabaseClient.from("shopping_items").select("*").order("created_at", { ascending: false }),
      supabaseClient.from("storage_locations").select("*").order("created_at", { ascending: true }),
    ]);

    if (foodsError || shoppingError || locationsError) {
      throw foodsError || shoppingError || locationsError;
    }

    const hasRemoteData = remoteFoods.length || remoteShopping.length || remoteLocations.length;
    if (hasRemoteData) {
      foods = remoteFoods.map(fromRemoteFood);
      shopping = remoteShopping.map(fromRemoteShopping);
      locations = mergeDefaultLocations(remoteLocations.map(fromRemoteLocation));
      writeLocalState();
      renderLocationOptions();
      renderAll();
      showToast("已載入雲端資料");
    } else {
      await syncAllRemote();
      showToast("已把本機資料同步到雲端");
    }

    remoteReady = true;
    updateAuthUI();
  } catch (error) {
    remoteReady = false;
    updateAuthUI(`同步失敗：${error.message}`);
    showToast("同步失敗，先保留本機資料");
  }
}

function queueRemoteSync() {
  if (!remoteReady || !currentUser || !supabaseClient) return;
  window.clearTimeout(remoteSyncTimer);
  remoteSyncTimer = window.setTimeout(() => {
    syncAllRemote().catch((error) => {
      updateAuthUI(`同步失敗：${error.message}`);
      showToast("同步失敗，稍後會再試");
    });
  }, 350);
}

async function syncAllRemote() {
  if (!currentUser || !supabaseClient) return;
  await Promise.all([
    replaceRemoteTable("food_items", foods.map(toRemoteFood)),
    replaceRemoteTable("shopping_items", shopping.map(toRemoteShopping)),
    replaceRemoteTable("storage_locations", customLocations().map(toRemoteLocation)),
  ]);
  remoteReady = true;
  updateAuthUI();
}

async function replaceRemoteTable(table, rows) {
  const { error: deleteError } = await supabaseClient
    .from(table)
    .delete()
    .eq("user_id", currentUser.id);
  if (deleteError) throw deleteError;
  if (!rows.length) return;
  const { error: insertError } = await supabaseClient.from(table).insert(rows);
  if (insertError) throw insertError;
}

function toRemoteFood(item) {
  return {
    id: item.id,
    user_id: currentUser.id,
    name: item.name,
    category: item.category,
    quantity: item.quantity,
    storage_location: item.storageLocation,
    purchase_date: item.purchaseDate || null,
    expiry_date: item.expiryDate,
    note: item.note || "",
    status: item.status,
    created_at: item.createdAt,
    updated_at: item.updatedAt,
  };
}

function fromRemoteFood(item) {
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    quantity: item.quantity,
    storageLocation: item.storage_location,
    purchaseDate: item.purchase_date || "",
    expiryDate: item.expiry_date,
    note: item.note || "",
    status: item.status,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  };
}

function toRemoteShopping(item) {
  return {
    id: item.id,
    user_id: currentUser.id,
    name: item.name,
    quantity: item.quantity || "",
    category: item.category || "",
    note: item.note || "",
    checked: item.checked,
    created_at: item.createdAt,
  };
}

function fromRemoteShopping(item) {
  return {
    id: item.id,
    name: item.name,
    quantity: item.quantity || "",
    category: item.category || "",
    note: item.note || "",
    checked: item.checked,
    createdAt: item.created_at,
  };
}

function toRemoteLocation(location) {
  return {
    user_id: currentUser.id,
    name: location.name,
    storage_group: location.group,
  };
}

function fromRemoteLocation(location) {
  return {
    name: location.name,
    group: location.storage_group,
  };
}

function customLocations() {
  return locations.filter((location) =>
    !defaultLocations.some((defaultLocation) => defaultLocation.name === location.name)
  );
}

function mergeDefaultLocations(remoteLocations) {
  const merged = [...defaultLocations];
  remoteLocations.forEach((location) => {
    if (!merged.some((item) => item.name === location.name)) merged.push(location);
  });
  return merged;
}

function writeLocalState() {
  localStorage.setItem(STORAGE_KEYS.foods, JSON.stringify(foods));
  localStorage.setItem(STORAGE_KEYS.shopping, JSON.stringify(shopping));
  localStorage.setItem(STORAGE_KEYS.locations, JSON.stringify(locations));
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
