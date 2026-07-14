const STORAGE_KEY = "wedding.seating.planner.v1";
const CANVAS_MIN_WIDTH = 5000;
const CANVAS_MIN_HEIGHT = 3600;
const TABLE_COLUMN_WIDTH = 280;
const CANVAS_SIDE_GUTTER = 520;
const TABLE_ROW_HEIGHT = 260;
const TARGET_TABLE_COUNT = 30;
const CANVAS_ZOOM_MIN = 0.25;
const CANVAS_ZOOM_MAX = 1.6;
const CANVAS_ZOOM_STEP = 0.1;
const LEGACY_CANVAS_WIDTH = 1180;
const LEGACY_CANVAS_HEIGHT = 1140;
const CANVAS_GROW_PADDING = 900;
const TABLE_CARD_WIDTH = 212;
const TABLE_CARD_DEPTH = 154;
const STAGE_WIDTH = TABLE_CARD_WIDTH * 2;
const STAGE_DEPTH = Math.round(TABLE_CARD_DEPTH * 0.5);
const GIFT_DESK_WIDTH = Math.round(TABLE_CARD_WIDTH * 0.5);
const GIFT_DESK_DEPTH = Math.round(TABLE_CARD_DEPTH * 0.5);
const GUEST_PAGE_SIZE = 10;
const RELATION_OPTIONS = ["男方親友", "女方親友"];
const invitationMeta = {
  paper: { label: "紙本", className: "paper" },
  digital: { label: "電子", className: "digital" },
  none: { label: "無", className: "none" },
};
const invitationDeliveryMeta = {
  sent: { label: "已寄送", className: "sent" },
  unsent: { label: "未寄送", className: "unsent" },
};

const icons = {
  layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 20a4 4 0 0 0-8 0"/><circle cx="12" cy="10" r="3"/><path d="M21 20a3.5 3.5 0 0 0-5-3.2M3 20a3.5 3.5 0 0 1 5-3.2"/><path d="M18 11a2.5 2.5 0 1 0-1.2-4.7M6 11a2.5 2.5 0 1 1 1.2-4.7"/></svg>',
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 12v8H4v-8M2 8h20v4H2zM12 8v12"/><path d="M12 8H8.5a2.5 2.5 0 1 1 2.2-3.7L12 8Zm0 0h3.5a2.5 2.5 0 1 0-2.2-3.7L12 8Z"/></svg>',
  table: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 10h16M7 10v9M17 10v9"/><path d="M6 5h12l2 5H4l2-5Z"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 4v12"/><path d="m7 11 5 5 5-5"/><path d="M4 20h16"/></svg>',
  archive: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16v13H4z"/><path d="M2 4h20v3H2z"/><path d="M9 11h6"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14"/></svg>',
  minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14"/></svg>',
  userPlus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 20a5 5 0 0 0-10 0"/><circle cx="10" cy="9" r="4"/><path d="M19 8v6M16 11h6"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 12a8 8 0 0 1-13.7 5.6"/><path d="M4 12A8 8 0 0 1 17.7 6.4"/><path d="M17 3v4h4M7 21v-4H3"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m5 12 4.2 4.2L19 6.5"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"/><path d="m14 7 3 3"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
  grip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 5h.01M15 5h.01M9 12h.01M15 12h.01M9 19h.01M15 19h.01"/></svg>',
  cash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 9v.01M18 15v.01"/></svg>',
  stage: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 5h16v10H4z"/><path d="M8 19h8M12 15v4"/><path d="M7 9h10"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
};

const rsvpMeta = {
  confirmed: { label: "已回覆", className: "confirmed" },
  pending: { label: "未回覆", className: "pending" },
  declined: { label: "不參加", className: "declined" },
};

const seedState = {
  canvas: {
    zoom: 1,
    coordinateMode: "px",
  },
  wedding: {
    name: "文定 & 婚宴",
    date: "2026/11/21 18:00",
    venue: "台北文華東方酒店 3F 宴會廳",
  },
  venueItems: [
    { id: "stage", label: "舞台", icon: "stage", x: 900, y: 150, width: STAGE_WIDTH, height: STAGE_DEPTH },
    { id: "giftDesk", label: "禮金台", icon: "gift", x: 260, y: 280, width: GIFT_DESK_WIDTH, height: GIFT_DESK_DEPTH },
  ],
  tables: [
    { id: "head", number: "主桌", alias: "雙方家長", name: "主桌", capacity: 12, kind: "head", x: 900, y: 500 },
    { id: "t1", number: "1", alias: "女方親友", name: "第 1 桌", capacity: 10, kind: "round", x: 360, y: 860 },
    { id: "t2", number: "2", alias: "男方同事", name: "第 2 桌", capacity: 10, kind: "round", x: 640, y: 860 },
    { id: "t3", number: "3", alias: "大學同學", name: "第 3 桌", capacity: 10, kind: "round", x: 920, y: 860 },
    { id: "t4", number: "4", alias: "女方朋友", name: "第 4 桌", capacity: 10, kind: "round", x: 360, y: 1120 },
    { id: "t5", number: "5", alias: "男方朋友", name: "第 5 桌", capacity: 10, kind: "round", x: 640, y: 1120 },
    { id: "t6", number: "6", alias: "男方親友", name: "第 6 桌", capacity: 10, kind: "round", x: 920, y: 1120 },
    { id: "t7", number: "7", alias: "長輩親友", name: "第 7 桌", capacity: 10, kind: "family", x: 360, y: 1380 },
    { id: "t8", number: "8", alias: "同學好友", name: "第 8 桌", capacity: 10, kind: "round", x: 640, y: 1380 },
  ],
  guests: [
    { name: "新郎 大明", rsvp: "confirmed", companions: 0, group: "主桌", phone: "", tableId: "head", note: "", invitationType: "none" },
    { name: "新娘 小美", rsvp: "confirmed", companions: 0, group: "主桌", phone: "", tableId: "head", note: "", invitationType: "none" },
    { name: "新郎爸爸", rsvp: "confirmed", companions: 0, group: "主桌", phone: "", tableId: "head", note: "" },
    { name: "新娘媽媽", rsvp: "confirmed", companions: 0, group: "主桌", phone: "", tableId: "head", note: "" },
    { name: "王建國", rsvp: "confirmed", companions: 1, group: "親友", phone: "0912-111-222", tableId: "t1", note: "", invitationType: "paper", invitationDelivery: "unsent", address: "台北市信義區松仁路 100 號", email: "" },
    { name: "李淑芬", rsvp: "confirmed", companions: 0, group: "親友", phone: "0912-222-333", tableId: "t1", note: "", invitationType: "paper", invitationDelivery: "sent", address: "新北市板橋區文化路 1 段 88 號", email: "" },
    { name: "張志明", rsvp: "pending", companions: 1, group: "朋友", phone: "0912-333-444", tableId: null, note: "可能攜伴", invitationType: "digital", invitationDelivery: "unsent", address: "", email: "ming@example.com" },
    { name: "黃曉慧", rsvp: "pending", companions: 2, group: "朋友", phone: "0912-444-555", tableId: null, note: "", invitationType: "digital", invitationDelivery: "unsent", address: "", email: "hui@example.com" },
    { name: "陳怡君", rsvp: "confirmed", companions: 0, group: "同事", phone: "0912-555-666", tableId: "t2", note: "素食" },
    { name: "吳家豪", rsvp: "confirmed", companions: 1, group: "同事", phone: "0912-666-777", tableId: "t2", note: "" },
    { name: "林宗緯", rsvp: "confirmed", companions: 0, group: "大學同學", phone: "0912-777-888", tableId: "t3", note: "" },
    { name: "徐子晴", rsvp: "confirmed", companions: 0, group: "親戚", phone: "0912-888-999", tableId: "t3", note: "" },
    { name: "郭彥廷", rsvp: "pending", companions: 0, group: "高中同學", phone: "0912-999-000", tableId: null, note: "" },
    { name: "周怡伶", rsvp: "confirmed", companions: 1, group: "朋友", phone: "0910-222-333", tableId: "t4", note: "" },
    { name: "許書豪", rsvp: "confirmed", companions: 0, group: "同事", phone: "0910-333-444", tableId: "t5", note: "" },
    { name: "劉俊宏", rsvp: "confirmed", companions: 1, group: "親友", phone: "0910-444-555", tableId: "t6", note: "" },
    { name: "方怡萱", rsvp: "declined", companions: 0, group: "朋友", phone: "0910-555-666", tableId: null, note: "已致意" },
  ],
  gifts: [
    { name: "王建國", guestId: "", amount: 6000, method: "現金", note: "第 1 桌", date: "2026-11-21" },
    { name: "李淑芬", guestId: "", amount: 3600, method: "現金", note: "第 1 桌", date: "2026-11-21" },
    { name: "陳怡君", guestId: "", amount: 3600, method: "轉帳", note: "第 2 桌", date: "2026-11-21" },
  ],
};

let state = normalizeState(loadState());
let currentView = "seating";
let pendingConfirmation = null;
let movingLayoutItem = null;
let suppressTableClickId = null;
let activeGuestDrag = null;
let suppressGuestClickId = null;
let guestTablePage = 1;
const guestInlineEditTimers = new Map();

const els = {
  todayLabel: document.querySelector("#todayLabel"),
  viewTitle: document.querySelector("#viewTitle"),
  eventName: document.querySelector("#eventName"),
  eventDate: document.querySelector("#eventDate"),
  eventVenue: document.querySelector("#eventVenue"),
  navItems: document.querySelectorAll(".nav-item"),
  views: document.querySelectorAll(".view"),
  metricsGrid: document.querySelector("#metricsGrid"),
  seatingCanvas: document.querySelector("#seatingCanvas"),
  tableVisibilityFilter: document.querySelector("#tableVisibilityFilter"),
  zoomOutButton: document.querySelector("#zoomOutButton"),
  zoomInButton: document.querySelector("#zoomInButton"),
  zoomResetButton: document.querySelector("#zoomResetButton"),
  zoomRange: document.querySelector("#zoomRange"),
  zoomValue: document.querySelector("#zoomValue"),
  fitCanvasButton: document.querySelector("#fitCanvasButton"),
  resetLayoutButton: document.querySelector("#resetLayoutButton"),
  showNamesToggle: document.querySelector("#showNamesToggle"),
  layoutSavedLabel: document.querySelector("#layoutSavedLabel"),
  unassignedDropZone: document.querySelector("#unassignedDropZone"),
  unassignedSearchInput: document.querySelector("#unassignedSearchInput"),
  unassignedList: document.querySelector("#unassignedList"),
  unassignedCount: document.querySelector("#unassignedCount"),
  focusUnassignedButton: document.querySelector("#focusUnassignedButton"),
  giftSummary: document.querySelector("#giftSummary"),
  giftMiniList: document.querySelector("#giftMiniList"),
  guestSearchInput: document.querySelector("#guestSearchInput"),
  rsvpFilter: document.querySelector("#rsvpFilter"),
  assignmentFilter: document.querySelector("#assignmentFilter"),
  relationFilter: document.querySelector("#relationFilter"),
  guestTable: document.querySelector("#guestTable"),
  invitationSearchInput: document.querySelector("#invitationSearchInput"),
  invitationTypeFilter: document.querySelector("#invitationTypeFilter"),
  invitationDeliveryFilter: document.querySelector("#invitationDeliveryFilter"),
  invitationTable: document.querySelector("#invitationTable"),
  giftSearchInput: document.querySelector("#giftSearchInput"),
  giftMethodFilter: document.querySelector("#giftMethodFilter"),
  giftTable: document.querySelector("#giftTable"),
  tableManager: document.querySelector("#tableManager"),
  importButton: document.querySelector("#importButton"),
  importFile: document.querySelector("#importFile"),
  templateButton: document.querySelector("#templateButton"),
  exportButton: document.querySelector("#exportButton"),
  addTableButton: document.querySelector("#addTableButton"),
  fill30TablesButton: document.querySelector("#fill30TablesButton"),
  addGuestButton: document.querySelector("#addGuestButton"),
  addGiftButton: document.querySelector("#addGiftButton"),
  addGiftFromViewButton: document.querySelector("#addGiftFromViewButton"),
  guestDialog: document.querySelector("#guestDialog"),
  guestForm: document.querySelector("#guestForm"),
  guestDialogTitle: document.querySelector("#guestDialogTitle"),
  closeGuestDialogButton: document.querySelector("#closeGuestDialogButton"),
  cancelGuestButton: document.querySelector("#cancelGuestButton"),
  deleteGuestButton: document.querySelector("#deleteGuestButton"),
  tableDialog: document.querySelector("#tableDialog"),
  tableForm: document.querySelector("#tableForm"),
  tableDialogTitle: document.querySelector("#tableDialogTitle"),
  closeTableDialogButton: document.querySelector("#closeTableDialogButton"),
  cancelTableButton: document.querySelector("#cancelTableButton"),
  giftDialog: document.querySelector("#giftDialog"),
  giftForm: document.querySelector("#giftForm"),
  giftDialogTitle: document.querySelector("#giftDialogTitle"),
  closeGiftDialogButton: document.querySelector("#closeGiftDialogButton"),
  cancelGiftButton: document.querySelector("#cancelGiftButton"),
  deleteGiftButton: document.querySelector("#deleteGiftButton"),
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

document.querySelectorAll("[data-icon]").forEach((node) => {
  node.innerHTML = icons[node.dataset.icon] || "";
});

els.todayLabel.textContent = new Intl.DateTimeFormat("zh-Hant-TW", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
}).format(new Date());

bindEvents();
renderAll();

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

function bindEvents() {
  els.navItems.forEach((item) => item.addEventListener("click", () => setView(item.dataset.view)));
  document.querySelectorAll("[data-view-jump]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.viewJump));
  });

  els.importButton.addEventListener("click", () => els.importFile.click());
  els.importFile.addEventListener("change", handleImportFile);
  els.templateButton.addEventListener("click", downloadTemplate);
  els.exportButton.addEventListener("click", exportData);
  els.addGuestButton.addEventListener("click", () => openGuestDialog());
  els.addTableButton.addEventListener("click", () => openTableDialog());
  els.fill30TablesButton.addEventListener("click", () => fillTablesToTarget(TARGET_TABLE_COUNT));
  els.addGiftButton.addEventListener("click", () => openGiftDialog());
  els.addGiftFromViewButton.addEventListener("click", () => openGiftDialog());
  els.tableVisibilityFilter.addEventListener("change", renderSeating);
  els.zoomOutButton.addEventListener("click", () => nudgeCanvasZoom(-CANVAS_ZOOM_STEP));
  els.zoomInButton.addEventListener("click", () => nudgeCanvasZoom(CANVAS_ZOOM_STEP));
  els.zoomResetButton.addEventListener("click", () => setCanvasZoom(1));
  els.zoomRange.addEventListener("input", () => setCanvasZoom(Number(els.zoomRange.value) / 100));
  els.seatingCanvas.addEventListener("wheel", handleCanvasWheelZoom, { passive: false });
  window.addEventListener("keydown", handleCanvasShortcutZoom);
  els.fitCanvasButton.addEventListener("click", () => fitCanvasToLayout());
  els.resetLayoutButton.addEventListener("click", resetTableLayout);
  els.showNamesToggle.addEventListener("change", renderSeating);
  els.focusUnassignedButton.addEventListener("click", () => setView("guests", { assignment: "unassigned" }));
  els.unassignedSearchInput.addEventListener("input", renderUnassigned);
  els.guestSearchInput.addEventListener("input", resetGuestTablePage);
  els.rsvpFilter.addEventListener("change", resetGuestTablePage);
  els.assignmentFilter.addEventListener("change", resetGuestTablePage);
  els.relationFilter.addEventListener("change", resetGuestTablePage);
  els.invitationSearchInput.addEventListener("input", renderInvitationTable);
  els.invitationTypeFilter.addEventListener("change", renderInvitationTable);
  els.invitationDeliveryFilter.addEventListener("change", renderInvitationTable);
  els.giftSearchInput.addEventListener("input", renderGiftTable);
  els.giftMethodFilter.addEventListener("change", renderGiftTable);

  els.closeGuestDialogButton.addEventListener("click", closeGuestDialog);
  els.cancelGuestButton.addEventListener("click", closeGuestDialog);
  els.closeTableDialogButton.addEventListener("click", closeTableDialog);
  els.cancelTableButton.addEventListener("click", closeTableDialog);
  els.closeGiftDialogButton.addEventListener("click", closeGiftDialog);
  els.cancelGiftButton.addEventListener("click", closeGiftDialog);
  els.cancelConfirmButton.addEventListener("click", closeConfirmDialog);

  els.guestForm.addEventListener("submit", saveGuestFromForm);
  els.tableForm.addEventListener("submit", saveTableFromForm);
  els.giftForm.addEventListener("submit", saveGiftFromForm);
  els.confirmForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (pendingConfirmation) pendingConfirmation();
    closeConfirmDialog();
  });

  els.deleteGuestButton.addEventListener("click", () => {
    const id = els.guestForm.elements.id.value;
    const guest = findGuest(id);
    if (guest) confirmDeleteGuest(guest);
  });
  els.deleteGiftButton.addEventListener("click", () => {
    const id = els.giftForm.elements.id.value;
    const gift = findGift(id);
    if (gift) confirmDeleteGift(gift);
  });

  els.giftForm.elements.guestId.addEventListener("change", () => {
    const guest = findGuest(els.giftForm.elements.guestId.value);
    if (guest && !els.giftForm.elements.name.value.trim()) {
      els.giftForm.elements.name.value = guest.name;
    }
  });

  els.unassignedDropZone.addEventListener("dragover", allowDrop);
  els.unassignedDropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    const guestId = event.dataTransfer.getData("text/guest-id");
    if (guestId) assignGuestToTable(guestId, null);
  });
}

function setView(view, options = {}) {
  currentView = view;
  const titles = {
    seating: "座位圖",
    guests: "賓客名單",
    invitations: "喜帖管理",
    gifts: "禮金紀錄",
    tables: "桌次管理",
  };
  els.viewTitle.textContent = titles[view];
  els.navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  els.views.forEach((section) => section.classList.toggle("active", section.id === `${view}View`));

  if (options.assignment) {
    els.assignmentFilter.value = options.assignment;
    resetGuestTablePage();
  }
}

function renderAll() {
  renderEventInfo();
  renderMetrics();
  renderSeating();
  renderUnassigned();
  renderGiftMiniList();
  renderGuestTable();
  renderInvitationTable();
  renderGiftTable();
  renderTableManager();
  renderGuestSelects();
}

function renderEventInfo() {
  els.eventName.textContent = state.wedding.name;
  els.eventDate.textContent = state.wedding.date;
  els.eventVenue.textContent = state.wedding.venue;
}

function renderMetrics() {
  const activeGuests = state.guests.filter((guest) => guest.rsvp !== "declined");
  const totalPeople = activeGuests.reduce((sum, guest) => sum + partySize(guest), 0);
  const replied = state.guests.filter((guest) => guest.rsvp !== "pending").length;
  const unassigned = activeGuests.filter((guest) => !guest.tableId).reduce((sum, guest) => sum + partySize(guest), 0);
  const giftTotal = state.gifts.reduce((sum, gift) => sum + Number(gift.amount || 0), 0);
  const capacity = state.tables.reduce((sum, table) => sum + Number(table.capacity || 0), 0);

  const cards = [
    { label: "總賓客", value: totalPeople, note: `桌位容量 ${capacity}`, icon: "users", bg: "var(--sage-soft)", color: "var(--sage-deep)" },
    { label: "已回覆", value: replied, note: `${state.guests.length} 筆名單`, icon: "check", bg: "#edf3ee", color: "var(--sage)" },
    { label: "未安排", value: unassigned, note: "含同行人數", icon: "target", bg: "#fff1df", color: "var(--orange)" },
    { label: "禮金合計", value: money(giftTotal), note: `${state.gifts.length} 筆紀錄`, icon: "gift", bg: "var(--rose-soft)", color: "var(--plum)" },
  ];

  els.metricsGrid.innerHTML = cards.map((card) => `
    <article class="metric-card">
      <span>${card.label}</span>
      <strong>${card.value}</strong>
      <span class="metric-note">${card.note}</span>
      <span class="metric-icon" style="background:${card.bg};color:${card.color}">${icons[card.icon]}</span>
    </article>
  `).join("");
}

function renderSeating() {
  const filter = els.tableVisibilityFilter.value;
  const showNames = els.showNamesToggle.checked;
  const zoom = normalizeCanvasZoom(state.canvas.zoom);
  const size = canvasSize();
  const tables = state.tables.map((table) => {
    const occupancy = tableOccupancy(table.id);
    const open = occupancy < table.capacity;
    const over = occupancy > table.capacity;
    const hidden = (filter === "open" && !open) || (filter === "over" && !over);
    return { ...table, occupancy, open, over, hidden };
  });

  syncZoomControls();
  els.seatingCanvas.innerHTML = `
    <div class="canvas-surface" style="width:${Math.round(size.width * zoom)}px;height:${Math.round(size.height * zoom)}px">
      <div class="canvas-content" style="width:${size.width}px;height:${size.height}px;transform:scale(${zoom})">
        ${state.venueItems.map(renderVenueItem).join("")}
        ${tables.map((table) => renderSeatTable(table, showNames)).join("")}
      </div>
    </div>
  `;

  els.seatingCanvas.querySelectorAll(".seat-table").forEach((node) => {
    node.addEventListener("dragover", allowDrop);
    node.addEventListener("dragenter", () => node.classList.add("drag-over"));
    node.addEventListener("dragleave", () => node.classList.remove("drag-over"));
    node.addEventListener("drop", (event) => {
      event.preventDefault();
      node.classList.remove("drag-over");
      const guestId = event.dataTransfer.getData("text/guest-id");
      if (guestId) assignGuestToTable(guestId, node.dataset.tableId);
    });
  });

  els.seatingCanvas.querySelectorAll("[data-edit-table]").forEach((button) => {
    button.addEventListener("click", () => {
      if (suppressTableClickId === button.dataset.editTable) return;
      openTableDialog(findTable(button.dataset.editTable));
    });
  });
  bindGuestActions(els.seatingCanvas);
  bindLayoutItemMove();
}

function renderVenueItem(item) {
  return `
    <button class="venue-marker ${item.id === "stage" ? "stage-marker" : "gift-marker"}"
      data-venue-id="${item.id}"
      type="button"
      style="left:${item.x}px;top:${item.y}px;width:${item.width}px;height:${item.height}px"
      aria-label="移動${escapeHTML(item.label)}"
      title="移動${escapeHTML(item.label)}">
      <span class="venue-icon">${icons[item.icon] || icons.target}</span>
      <span>${escapeHTML(item.label)}</span>
      <span class="venue-grip">${icons.grip}</span>
    </button>
  `;
}

function renderSeatTable(table, showNames) {
  const assigned = state.guests
    .filter((guest) => guest.tableId === table.id && guest.rsvp !== "declined")
    .sort((a, b) => a.name.localeCompare(b.name, "zh-Hant"));
  const openSeats = Math.max(0, table.capacity - table.occupancy);
  const emptySlots = Math.min(openSeats, Math.max(0, 4 - assigned.length));
  const seatStatus = tableSeatStatus(table);
  const specialCounts = tableSpecialCounts(table.id);

  return `
    <section class="seat-table ${table.over ? "over-capacity" : ""} ${table.hidden ? "hidden-by-filter" : ""} table-status-${seatStatus.className}"
      data-table-id="${table.id}"
      style="left:${table.x}px;top:${table.y}px">
      <div class="table-card-header">
        <div class="table-title">
          <strong class="table-name">${escapeHTML(tableDisplayName(table))}</strong>
          <span class="table-alias">${escapeHTML(table.alias || "未設定別名")}</span>
        </div>
        <button class="move-handle table-status-box ${seatStatus.className}" data-move-table="${table.id}" type="button" aria-label="${escapeHTML(seatStatus.title)}；拖曳移動桌位" title="${escapeHTML(seatStatus.title)}；拖曳移動桌位">
          <span class="table-status-main">${seatStatus.icon}<span>${escapeHTML(seatStatus.label)}</span></span>
          ${specialCounts.vegetarianCount || specialCounts.childSeats ? `
            <span class="table-specials">
              ${specialCounts.vegetarianCount ? `<span class="special-pill vegetarian">素${specialCounts.vegetarianCount}</span>` : ""}
              ${specialCounts.childSeats ? `<span class="special-pill child">童${specialCounts.childSeats}</span>` : ""}
            </span>
          ` : ""}
        </button>
      </div>
      <button class="round-table ${table.kind === "head" ? "head" : ""}" data-edit-table="${table.id}" type="button" aria-label="編輯${escapeHTML(tableDisplayName(table))}">
        ${table.kind === "head" ? "囍" : icons.table}
      </button>
      <div class="table-guests">
        ${assigned.map((guest) => guestChip(guest, showNames)).join("")}
        ${Array.from({ length: emptySlots }, () => '<span class="empty-slot">空位</span>').join("")}
      </div>
    </section>
  `;
}

function renderUnassigned() {
  const query = els.unassignedSearchInput.value.trim().toLowerCase();
  const guests = state.guests
    .filter((guest) => guest.rsvp !== "declined" && !guest.tableId)
    .filter((guest) => !query || guestHaystack(guest).includes(query))
    .sort((a, b) => rsvpSort(a) - rsvpSort(b) || a.name.localeCompare(b.name, "zh-Hant"));

  const people = guests.reduce((sum, guest) => sum + partySize(guest), 0);
  els.unassignedCount.textContent = `${people} 位`;
  els.unassignedList.innerHTML = guests.length
    ? guests.map((guest) => guestRow(guest, { draggable: true })).join("")
    : empty("目前沒有待安排賓客。");
  bindGuestActions(els.unassignedList);
}

function renderGiftMiniList() {
  const total = state.gifts.reduce((sum, gift) => sum + Number(gift.amount || 0), 0);
  els.giftSummary.textContent = money(total);
  const gifts = [...state.gifts].sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)).slice(0, 6);
  els.giftMiniList.innerHTML = gifts.length
    ? gifts.map((gift) => `
      <article class="gift-row">
        <div class="gift-row-main">
          <strong>${escapeHTML(gift.name)}</strong>
          <small>${escapeHTML(gift.method)} · ${escapeHTML(gift.note || "未填備註")}</small>
        </div>
        <button class="money-badge" data-edit-gift="${gift.id}" type="button">${money(gift.amount)}</button>
      </article>
    `).join("")
    : empty("尚未登記禮金。");

  els.giftMiniList.querySelectorAll("[data-edit-gift]").forEach((button) => {
    button.addEventListener("click", () => openGiftDialog(findGift(button.dataset.editGift)));
  });
}

function resetGuestTablePage() {
  guestTablePage = 1;
  renderGuestTable();
}

function setGuestTablePage(page) {
  guestTablePage = Math.max(1, Number.parseInt(page, 10) || 1);
  renderGuestTable();
}

function renderGuestTable() {
  const query = els.guestSearchInput.value.trim().toLowerCase();
  const rsvp = els.rsvpFilter.value;
  const assignment = els.assignmentFilter.value;
  const relation = els.relationFilter.value;
  const rows = state.guests
    .filter((guest) => rsvp === "all" || guest.rsvp === rsvp)
    .filter((guest) => relation === "all" || guest.relation === relation)
    .filter((guest) => {
      if (assignment === "assigned") return Boolean(guest.tableId);
      if (assignment === "unassigned") return guest.rsvp !== "declined" && !guest.tableId;
      return true;
    })
    .filter((guest) => !query || guestHaystack(guest).includes(query))
    .sort((a, b) => rsvpSort(a) - rsvpSort(b) || tableLabel(a.tableId).localeCompare(tableLabel(b.tableId), "zh-Hant") || a.name.localeCompare(b.name, "zh-Hant"));
  const totalPages = Math.max(1, Math.ceil(rows.length / GUEST_PAGE_SIZE));
  guestTablePage = clamp(guestTablePage, 1, totalPages);
  const start = (guestTablePage - 1) * GUEST_PAGE_SIZE;
  const pageRows = rows.slice(start, start + GUEST_PAGE_SIZE);
  const pageStart = rows.length ? start + 1 : 0;
  const pageEnd = Math.min(start + GUEST_PAGE_SIZE, rows.length);

  els.guestTable.innerHTML = `
    <div class="table-scroll" role="region" aria-label="賓客名單表格">
      <div class="table-row guest-table header">
        <span>姓名</span>
        <span class="cell-center">回覆狀態</span>
        <span class="cell-center">座位狀態</span>
        <span>關係</span>
        <span>喜帖</span>
        <span class="cell-center">同行人數</span>
        <span class="cell-center">兒童椅</span>
        <span class="cell-center">素食</span>
        <span>桌號 / 別名</span>
        <span>備註</span>
        <span></span>
      </div>
      ${pageRows.length ? pageRows.map((guest) => {
        const assignmentStatus = guestAssignmentStatus(guest);
        return `
          <div class="table-row guest-table" data-guest-row="${guest.id}">
            <div>
              <strong>${escapeHTML(guest.name)}</strong>
              <div class="muted">${escapeHTML(guest.phone || "未填電話")}</div>
            </div>
            <span class="cell-center">
              <select class="inline-field inline-select" data-guest-field="rsvp" data-guest-id="${guest.id}" aria-label="編輯${escapeHTML(guest.name)}的回覆狀態">
                ${rsvpOptions(guest.rsvp)}
              </select>
            </span>
            <span class="cell-center"><span class="status-badge ${assignmentStatus.className}">${assignmentStatus.label}</span></span>
            <span>
              <select class="inline-field inline-select relation-select ${guest.relation === "女方親友" ? "bride" : "groom"}" data-guest-field="relation" data-guest-id="${guest.id}" aria-label="編輯${escapeHTML(guest.name)}的關係">
                ${relationOptions(guest.relation)}
              </select>
            </span>
            <span>
              <select class="inline-field inline-select invitation-select ${invitationMeta[guest.invitationType]?.className || "none"}" data-guest-field="invitationType" data-guest-id="${guest.id}" aria-label="編輯${escapeHTML(guest.name)}的喜帖">
                ${invitationOptions(guest.invitationType)}
              </select>
            </span>
            <span class="cell-center"><input class="inline-field inline-number" data-guest-field="companions" data-guest-id="${guest.id}" type="number" min="0" step="1" value="${Math.max(0, Number.parseInt(guest.companions, 10) || 0)}" aria-label="編輯${escapeHTML(guest.name)}的同行人數" /></span>
            <span class="cell-center"><input class="inline-field inline-number" data-guest-field="childSeats" data-guest-id="${guest.id}" type="number" min="0" step="1" value="${guest.childSeats || 0}" aria-label="編輯${escapeHTML(guest.name)}的兒童座椅數量" /></span>
            <span class="cell-center"><input class="inline-field inline-number" data-guest-field="vegetarianCount" data-guest-id="${guest.id}" type="number" min="0" step="1" value="${guest.vegetarianCount || 0}" aria-label="編輯${escapeHTML(guest.name)}的素食人數" /></span>
            <span>${escapeHTML(tableLabel(guest.tableId))}</span>
            <span><input class="inline-field inline-note" data-guest-field="note" data-guest-id="${guest.id}" type="text" value="${escapeHTML(guest.note || "")}" placeholder="備註" aria-label="編輯${escapeHTML(guest.name)}的備註" /></span>
            <div class="row-actions">
              <button class="icon-button" data-edit-guest="${guest.id}" data-allow-delete="true" type="button" aria-label="編輯">${icons.edit}</button>
            </div>
          </div>
        `;
      }).join("") : empty("沒有符合條件的賓客。")}
    </div>
    <div class="table-pagination" aria-label="賓客分頁">
      <span>${rows.length ? `第 ${pageStart}-${pageEnd} 筆，共 ${rows.length} 筆` : "共 0 筆"} · 每頁 ${GUEST_PAGE_SIZE} 筆</span>
      <div class="pagination-actions">
        <button class="secondary-action" data-guest-page="prev" type="button" ${guestTablePage <= 1 ? "disabled" : ""}>上一頁</button>
        <span>${guestTablePage} / ${totalPages}</span>
        <button class="secondary-action" data-guest-page="next" type="button" ${guestTablePage >= totalPages ? "disabled" : ""}>下一頁</button>
      </div>
    </div>
  `;
  els.guestTable.querySelectorAll("[data-guest-page]").forEach((button) => {
    button.addEventListener("click", () => {
      setGuestTablePage(button.dataset.guestPage === "next" ? guestTablePage + 1 : guestTablePage - 1);
    });
  });
  bindGuestInlineEdits(els.guestTable);
  bindGuestActions(els.guestTable);
}

function renderInvitationTable() {
  const query = els.invitationSearchInput.value.trim().toLowerCase();
  const type = els.invitationTypeFilter.value;
  const delivery = els.invitationDeliveryFilter.value;
  const rows = state.guests
    .filter((guest) => guest.invitationType !== "none")
    .filter((guest) => type === "all" || guest.invitationType === type)
    .filter((guest) => delivery === "all" || guest.invitationDelivery === delivery)
    .filter((guest) => !query || invitationHaystack(guest).includes(query))
    .sort((a, b) =>
      invitationSortValue(a).localeCompare(invitationSortValue(b), "zh-Hant") ||
      a.name.localeCompare(b.name, "zh-Hant")
    );
  const sentCount = rows.filter((guest) => guest.invitationDelivery === "sent").length;

  els.invitationTable.innerHTML = `
    <div class="table-scroll" role="region" aria-label="喜帖寄送名單表格">
      <div class="table-row invitation-table header">
        <span>姓名</span>
        <span>喜帖</span>
        <span>寄送完成</span>
        <span>地址</span>
        <span>Email</span>
        <span>關係</span>
        <span>電話</span>
        <span>備註</span>
      </div>
      ${rows.length ? rows.map((guest) => `
        <div class="table-row invitation-table" data-invitation-row="${guest.id}">
          <div>
            <strong>${escapeHTML(guest.name)}</strong>
            <div class="muted">${escapeHTML(tableLabel(guest.tableId))}</div>
          </div>
          <span>
            <select class="inline-field inline-select invitation-select ${invitationMeta[guest.invitationType]?.className || "none"}" data-guest-field="invitationType" data-guest-id="${guest.id}" aria-label="編輯${escapeHTML(guest.name)}的喜帖">
              ${invitationOptions(guest.invitationType, { includeNone: false })}
            </select>
          </span>
          <span>
            <select class="inline-field inline-select delivery-select ${invitationDeliveryMeta[guest.invitationDelivery]?.className || "unsent"}" data-guest-field="invitationDelivery" data-guest-id="${guest.id}" aria-label="編輯${escapeHTML(guest.name)}的寄送狀態">
              ${invitationDeliveryOptions(guest.invitationDelivery)}
            </select>
          </span>
          <span><input class="inline-field inline-address" data-guest-field="address" data-guest-id="${guest.id}" type="text" value="${escapeHTML(guest.address || "")}" placeholder="紙本地址" aria-label="編輯${escapeHTML(guest.name)}的地址" /></span>
          <span><input class="inline-field inline-email" data-guest-field="email" data-guest-id="${guest.id}" type="email" value="${escapeHTML(guest.email || "")}" placeholder="email@example.com" aria-label="編輯${escapeHTML(guest.name)}的 email" /></span>
          <span><span class="relation-badge ${guest.relation === "女方親友" ? "bride" : "groom"}">${escapeHTML(guest.relation)}</span></span>
          <span>${escapeHTML(guest.phone || "未填")}</span>
          <span><input class="inline-field inline-note" data-guest-field="note" data-guest-id="${guest.id}" type="text" value="${escapeHTML(guest.note || "")}" placeholder="備註" aria-label="編輯${escapeHTML(guest.name)}的備註" /></span>
        </div>
      `).join("") : empty("目前沒有需要喜帖的賓客。")}
    </div>
    <div class="table-pagination invitation-summary" aria-label="喜帖寄送摘要">
      <span>共 ${rows.length} 筆需要喜帖 · 已寄送 ${sentCount} 筆 · 未寄送 ${rows.length - sentCount} 筆</span>
    </div>
  `;
  bindGuestInlineEdits(els.invitationTable);
}

function bindGuestInlineEdits(root) {
  root.querySelectorAll("[data-guest-field]").forEach((field) => {
    const commit = () => commitGuestInlineField(field);
    field.addEventListener("change", commit);
    if (field.tagName === "INPUT") {
      field.addEventListener("input", () => scheduleGuestInlineField(field));
      field.addEventListener("blur", commit);
    }
  });
}

function scheduleGuestInlineField(field) {
  const key = `${field.dataset.guestId}:${field.dataset.guestField}`;
  window.clearTimeout(guestInlineEditTimers.get(key));
  guestInlineEditTimers.set(key, window.setTimeout(() => commitGuestInlineField(field), 650));
}

function commitGuestInlineField(field) {
  const key = `${field.dataset.guestId}:${field.dataset.guestField}`;
  window.clearTimeout(guestInlineEditTimers.get(key));
  guestInlineEditTimers.delete(key);
  updateGuestInlineField(field.dataset.guestId, field.dataset.guestField, field.value);
}

function updateGuestInlineField(guestId, field, value) {
  const guest = findGuest(guestId);
  if (!guest) return;
  const nextValue = normalizeGuestInlineValue(field, value);
  if (guest[field] === nextValue) return;
  guest[field] = nextValue;
  if (field === "rsvp" && nextValue === "declined") guest.tableId = null;
  if (field === "invitationType" && nextValue === "none") guest.invitationDelivery = "unsent";
  guest.updatedAt = nowISO();
  saveState();
  renderAll();
  showToast("賓客資料已更新");
}

function normalizeGuestInlineValue(field, value) {
  if (field === "rsvp") return rsvpMeta[value] ? value : "pending";
  if (field === "relation") return normalizeRelation(value);
  if (field === "invitationType") return normalizeInvitationType(value);
  if (field === "invitationDelivery") return normalizeInvitationDelivery(value);
  if (["companions", "childSeats", "vegetarianCount"].includes(field)) {
    return Math.max(0, Number.parseInt(value, 10) || 0);
  }
  if (["note", "address", "email"].includes(field)) return String(value || "").trim();
  return value;
}

function rsvpOptions(selected) {
  return Object.entries(rsvpMeta)
    .map(([value, meta]) => `<option value="${value}" ${selected === value ? "selected" : ""}>${meta.label}</option>`)
    .join("");
}

function relationOptions(selected) {
  return RELATION_OPTIONS
    .map((value) => `<option value="${value}" ${selected === value ? "selected" : ""}>${value}</option>`)
    .join("");
}

function invitationOptions(selected, options = {}) {
  const entries = Object.entries(invitationMeta).filter(([value]) => options.includeNone !== false || value !== "none");
  return entries
    .map(([value, meta]) => `<option value="${value}" ${selected === value ? "selected" : ""}>${meta.label}</option>`)
    .join("");
}

function invitationDeliveryOptions(selected) {
  return Object.entries(invitationDeliveryMeta)
    .map(([value, meta]) => `<option value="${value}" ${selected === value ? "selected" : ""}>${meta.label}</option>`)
    .join("");
}

function renderGiftTable() {
  const query = els.giftSearchInput.value.trim().toLowerCase();
  const method = els.giftMethodFilter.value;
  const gifts = state.gifts
    .filter((gift) => method === "all" || gift.method === method)
    .filter((gift) => !query || `${gift.name} ${gift.method} ${gift.note}`.toLowerCase().includes(query))
    .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
  const total = gifts.reduce((sum, gift) => sum + Number(gift.amount || 0), 0);

  els.giftTable.innerHTML = `
    <div class="table-row gift-table header">
      <span>姓名</span>
      <span>金額</span>
      <span>方式</span>
      <span>日期</span>
      <span>備註</span>
      <span>${money(total)}</span>
    </div>
    ${gifts.length ? gifts.map((gift) => `
      <div class="table-row gift-table">
        <strong>${escapeHTML(gift.name)}</strong>
        <span>${money(gift.amount)}</span>
        <span>${escapeHTML(gift.method)}</span>
        <span class="muted">${escapeHTML(formatDate(gift.date))}</span>
        <span class="muted">${escapeHTML(gift.note || "未填")}</span>
        <div class="row-actions">
          <button class="icon-button" data-edit-gift="${gift.id}" type="button" aria-label="編輯">${icons.edit}</button>
        </div>
      </div>
    `).join("") : empty("目前沒有禮金紀錄。")}
  `;

  els.giftTable.querySelectorAll("[data-edit-gift]").forEach((button) => {
    button.addEventListener("click", () => openGiftDialog(findGift(button.dataset.editGift)));
  });
}

function renderTableManager() {
  els.tableManager.innerHTML = state.tables.map((table) => {
    const occupancy = tableOccupancy(table.id);
    const pct = Math.min(100, Math.round((occupancy / Math.max(table.capacity, 1)) * 100));
    const guests = state.guests.filter((guest) => guest.tableId === table.id && guest.rsvp !== "declined");
    const seatStatus = tableSeatStatus({ ...table, occupancy });
    const specialCounts = tableSpecialCounts(table.id);
    return `
      <article class="table-card">
        <div class="table-card-header">
          <div>
            <strong class="table-name">${escapeHTML(tableDisplayName(table))}</strong>
            <div class="muted">${escapeHTML(table.alias || "未設定別名")} · ${table.kind === "head" ? "主桌" : table.kind === "family" ? "親友桌" : "一般桌"}</div>
          </div>
          <span class="table-status-badge ${seatStatus.className}">${seatStatus.icon}<span>${occupancy}/${table.capacity}</span></span>
        </div>
        <div class="table-stats">
          <span>${guests.length} 筆名單</span>
          <span>${Math.max(0, table.capacity - occupancy)} 個空位</span>
        </div>
        ${specialCounts.vegetarianCount || specialCounts.childSeats ? `
          <div class="table-special-summary">
            ${specialCounts.vegetarianCount ? `<span class="special-pill vegetarian">素食 ${specialCounts.vegetarianCount}</span>` : ""}
            ${specialCounts.childSeats ? `<span class="special-pill child">兒童椅 ${specialCounts.childSeats}</span>` : ""}
          </div>
        ` : ""}
        <div class="capacity-meter ${occupancy > table.capacity ? "over" : ""}"><span style="width:${pct}%"></span></div>
        <div class="table-card-actions">
          <button class="mini-button" data-edit-table-card="${table.id}" type="button">${icons.edit}<span>編輯</span></button>
          <button class="mini-button" data-clear-table="${table.id}" type="button">${icons.refresh}<span>清空</span></button>
          <button class="mini-button" data-delete-table="${table.id}" type="button">${icons.trash}<span>刪除</span></button>
        </div>
      </article>
    `;
  }).join("");

  els.tableManager.querySelectorAll("[data-edit-table-card]").forEach((button) => {
    button.addEventListener("click", () => openTableDialog(findTable(button.dataset.editTableCard)));
  });
  els.tableManager.querySelectorAll("[data-clear-table]").forEach((button) => {
    const table = findTable(button.dataset.clearTable);
    button.addEventListener("click", () => confirmClearTable(table));
  });
  els.tableManager.querySelectorAll("[data-delete-table]").forEach((button) => {
    const table = findTable(button.dataset.deleteTable);
    button.addEventListener("click", () => confirmDeleteTable(table));
  });
}

function renderGuestSelects() {
  const tableOptions = ['<option value="">待安排</option>']
    .concat(state.tables.map((table) => `<option value="${table.id}">${escapeHTML(tableLabel(table.id))}</option>`))
    .join("");
  els.guestForm.elements.tableId.innerHTML = tableOptions;

  const giftOptions = ['<option value="">未連結名單</option>']
    .concat(state.guests.map((guest) => `<option value="${guest.id}">${escapeHTML(guest.name)}</option>`))
    .join("");
  els.giftForm.elements.guestId.innerHTML = giftOptions;
}

function guestChip(guest, showNames) {
  const vegetarianCount = Number.parseInt(guest.vegetarianCount, 10) || 0;
  const childSeats = Number.parseInt(guest.childSeats, 10) || 0;
  const specialClass = vegetarianCount && childSeats ? "has-special-mixed" : vegetarianCount ? "has-vegetarian" : childSeats ? "has-child-seat" : "";
  return `
    <div class="guest-chip ${guest.rsvp} ${specialClass}" draggable="true" data-guest-id="${guest.id}">
      <button class="guest-chip-main" data-edit-guest="${guest.id}" type="button" aria-label="編輯${escapeHTML(guest.name)}">
        <span>${showNames ? escapeHTML(guest.name) : "賓客"}</span>
        ${guest.companions > 0 ? `<span class="party-size">+${guest.companions}</span>` : ""}
        ${vegetarianCount ? `<span class="guest-special vegetarian">素${vegetarianCount}</span>` : ""}
        ${childSeats ? `<span class="guest-special child">童${childSeats}</span>` : ""}
      </button>
      <button class="chip-remove" data-unassign-guest="${guest.id}" type="button" aria-label="將${escapeHTML(guest.name)}移回待安排" title="移回待安排">${icons.x}</button>
    </div>
  `;
}

function guestRow(guest, options = {}) {
  const table = tableLabel(guest.tableId);
  const specialText = [
    guest.vegetarianCount ? `素食 ${guest.vegetarianCount}` : "",
    guest.childSeats ? `兒童椅 ${guest.childSeats}` : "",
  ].filter(Boolean).join(" · ");
  return `
    <article class="guest-row" ${options.draggable ? 'draggable="true"' : ""} data-guest-id="${guest.id}">
      <div class="guest-row-main">
        <strong>${escapeHTML(guest.name)}</strong>
        <small>${partySize(guest)} 位 · ${escapeHTML(guest.relation)} · ${escapeHTML(guest.group || "未分類")} · ${escapeHTML(table)}${specialText ? ` · ${escapeHTML(specialText)}` : ""}</small>
      </div>
      <div class="row-actions">
        <span class="status-badge ${rsvpMeta[guest.rsvp].className}">${rsvpMeta[guest.rsvp].label}</span>
        <button class="icon-button" data-edit-guest="${guest.id}" type="button" aria-label="編輯">${icons.edit}</button>
      </div>
    </article>
  `;
}

function bindGuestActions(root) {
  root.querySelectorAll("[data-guest-id]").forEach((node) => {
    node.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/guest-id", node.dataset.guestId);
      event.dataTransfer.effectAllowed = "move";
    });
    node.addEventListener("pointerdown", startGuestPointerDrag);
  });
  root.querySelectorAll("[data-edit-guest]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (suppressGuestClickId === button.dataset.editGuest) return;
      openGuestDialog(findGuest(button.dataset.editGuest), { allowDelete: button.dataset.allowDelete === "true" });
    });
  });
  root.querySelectorAll("[data-unassign-guest]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      assignGuestToTable(button.dataset.unassignGuest, null);
    });
  });
}

function startGuestPointerDrag(event) {
  if (event.button !== 0 && event.pointerType !== "touch") return;
  if (event.target.closest(".icon-button, .chip-remove")) return;
  const source = event.currentTarget;
  const guestId = source.dataset.guestId;
  if (!guestId) return;
  activeGuestDrag = {
    guestId,
    source,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    clone: null,
    over: null,
  };
  source.setPointerCapture?.(event.pointerId);
  source.addEventListener("pointermove", continueGuestPointerDrag);
  source.addEventListener("pointerup", finishGuestPointerDrag, { once: true });
  source.addEventListener("pointercancel", cancelGuestPointerDrag, { once: true });
}

function continueGuestPointerDrag(event) {
  if (!activeGuestDrag) return;
  const dx = event.clientX - activeGuestDrag.startX;
  const dy = event.clientY - activeGuestDrag.startY;
  if (!activeGuestDrag.clone && Math.hypot(dx, dy) < 8) return;
  event.preventDefault();

  if (!activeGuestDrag.clone) {
    const clone = activeGuestDrag.source.cloneNode(true);
    clone.classList.add("drag-preview");
    clone.style.width = `${activeGuestDrag.source.getBoundingClientRect().width}px`;
    document.body.appendChild(clone);
    document.body.classList.add("dragging-guest");
    activeGuestDrag.clone = clone;
  }

  activeGuestDrag.clone.style.transform = `translate(${event.clientX + 12}px, ${event.clientY + 12}px)`;
  const dropTarget = getGuestDropTarget(event.clientX, event.clientY);
  updateDropHighlight(dropTarget);
}

function finishGuestPointerDrag(event) {
  if (!activeGuestDrag) return;
  const wasDragging = Boolean(activeGuestDrag.clone);
  const guestId = activeGuestDrag.guestId;
  const dropTarget = wasDragging ? getGuestDropTarget(event.clientX, event.clientY) : null;
  cleanupGuestPointerDrag();

  if (!wasDragging) return;
  event.preventDefault();
  suppressGuestClickId = guestId;
  window.setTimeout(() => {
    if (suppressGuestClickId === guestId) suppressGuestClickId = null;
  }, 120);

  const tableNode = dropTarget?.closest?.(".seat-table");
  if (tableNode) {
    assignGuestToTable(guestId, tableNode.dataset.tableId);
    return;
  }
  if (dropTarget?.closest?.("#unassignedDropZone")) {
    assignGuestToTable(guestId, null);
  }
}

function cancelGuestPointerDrag() {
  cleanupGuestPointerDrag();
}

function cleanupGuestPointerDrag() {
  if (!activeGuestDrag) return;
  activeGuestDrag.source.removeEventListener("pointermove", continueGuestPointerDrag);
  activeGuestDrag.clone?.remove();
  updateDropHighlight(null);
  document.body.classList.remove("dragging-guest");
  activeGuestDrag = null;
}

function getGuestDropTarget(x, y) {
  const node = document.elementFromPoint(x, y);
  return node?.closest?.(".seat-table, #unassignedDropZone") || null;
}

function updateDropHighlight(target) {
  if (activeGuestDrag?.over === target) return;
  activeGuestDrag?.over?.classList.remove("drop-highlight");
  target?.classList.add("drop-highlight");
  if (activeGuestDrag) activeGuestDrag.over = target;
}

function bindLayoutItemMove() {
  els.seatingCanvas.querySelectorAll(".seat-table, .venue-marker").forEach((node) => {
    node.addEventListener("pointerdown", startLayoutItemMove);
  });
}

function startLayoutItemMove(event) {
  if (event.button !== 0 && event.pointerType !== "touch") return;
  if (event.target.closest("[data-guest-id], .guest-chip, .empty-slot")) return;
  const node = event.currentTarget;
  const tableId = node.dataset.tableId;
  const venueId = node.dataset.venueId;
  if (!tableId && !venueId) return;
  const itemRect = node.getBoundingClientRect();
  movingLayoutItem = {
    itemId: tableId || venueId,
    itemType: tableId ? "table" : "venue",
    node,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    offsetX: event.clientX - itemRect.left,
    offsetY: event.clientY - itemRect.top,
    width: itemRect.width,
    height: itemRect.height,
    isDragging: false,
  };
  node.setPointerCapture?.(event.pointerId);
  node.addEventListener("pointermove", moveLayoutItem);
  node.addEventListener("pointerup", stopMoveLayoutItem, { once: true });
  node.addEventListener("pointercancel", cancelLayoutItemMove, { once: true });
  window.addEventListener("pointerup", stopMoveLayoutItem, { once: true });
  window.addEventListener("pointercancel", cancelLayoutItemMove, { once: true });
}

function moveLayoutItem(event) {
  if (!movingLayoutItem) return;
  const item = findLayoutItem(movingLayoutItem.itemType, movingLayoutItem.itemId);
  if (!item) return;
  const dx = event.clientX - movingLayoutItem.startX;
  const dy = event.clientY - movingLayoutItem.startY;
  if (!movingLayoutItem.isDragging && Math.hypot(dx, dy) < 8 && !event.target.closest(".move-handle, .venue-grip")) return;
  movingLayoutItem.isDragging = true;
  event.preventDefault();
  const rect = canvasContentRect();
  const zoom = normalizeCanvasZoom(state.canvas.zoom);
  const x = (event.clientX - rect.left - movingLayoutItem.offsetX + movingLayoutItem.width / 2) / zoom;
  const y = (event.clientY - rect.top - movingLayoutItem.offsetY + movingLayoutItem.height / 2) / zoom;
  item.x = Math.max(48, Math.round(x));
  item.y = Math.max(48, Math.round(y));
  expandCanvasForPoint(item.x, item.y);
  movingLayoutItem.node.classList.add(movingLayoutItem.itemType === "table" ? "moving-table" : "moving-venue");
  movingLayoutItem.node.style.left = `${item.x}px`;
  movingLayoutItem.node.style.top = `${item.y}px`;
  markSaved(false);
}

function stopMoveLayoutItem(event) {
  if (!movingLayoutItem) return;
  const { itemId, itemType, node, isDragging } = movingLayoutItem;
  node.removeEventListener("pointermove", moveLayoutItem);
  window.removeEventListener("pointerup", stopMoveLayoutItem);
  window.removeEventListener("pointercancel", cancelLayoutItemMove);
  node.classList.remove("moving-table", "moving-venue");
  movingLayoutItem = null;
  if (!isDragging) return;
  event?.preventDefault();
  if (itemType === "table") {
    suppressTableClickId = itemId;
    window.setTimeout(() => {
      if (suppressTableClickId === itemId) suppressTableClickId = null;
    }, 140);
  }
  saveState();
  markSaved(true);
}

function cancelLayoutItemMove() {
  if (!movingLayoutItem) return;
  movingLayoutItem.node.removeEventListener("pointermove", moveLayoutItem);
  window.removeEventListener("pointerup", stopMoveLayoutItem);
  window.removeEventListener("pointercancel", cancelLayoutItemMove);
  movingLayoutItem.node.classList.remove("moving-table", "moving-venue");
  movingLayoutItem = null;
}

function assignGuestToTable(guestId, tableId) {
  const guest = findGuest(guestId);
  if (!guest) return;
  if (guest.rsvp === "declined") {
    showToast("不參加的賓客不會安排座位");
    return;
  }
  const table = tableId ? findTable(tableId) : null;
  if (tableId && !table) return;
  const nextOccupancy = table ? tableOccupancy(tableId, guestId) + partySize(guest) : 0;
  guest.tableId = tableId || null;
  saveState();
  renderAll();
  showToast(table
    ? `已安排 ${guest.name} 到 ${tableLabel(tableId)}${nextOccupancy > table.capacity ? `（超過容量 ${nextOccupancy}/${table.capacity}）` : ""}`
    : `已將 ${guest.name} 移回待安排`);
}

function openGuestDialog(guest = {}, options = {}) {
  renderGuestSelects();
  els.guestDialogTitle.textContent = guest.id ? "編輯賓客" : "新增賓客";
  els.deleteGuestButton.hidden = !guest.id || !options.allowDelete;
  els.guestForm.reset();
  const defaults = {
    id: "",
    name: "",
    rsvp: "pending",
    companions: 0,
    relation: RELATION_OPTIONS[0],
    childSeats: 0,
    vegetarianCount: 0,
    invitationType: "none",
    invitationDelivery: "unsent",
    address: "",
    email: "",
    group: "",
    phone: "",
    tableId: "",
    note: "",
    ...guest,
  };
  Object.entries(defaults).forEach(([key, value]) => {
    if (els.guestForm.elements[key]) els.guestForm.elements[key].value = value ?? "";
  });
  els.guestDialog.showModal();
}

function closeGuestDialog() {
  els.guestDialog.close();
}

function saveGuestFromForm(event) {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(els.guestForm));
  const payload = {
    name: formData.name.trim(),
    rsvp: formData.rsvp,
    companions: Math.max(0, Number.parseInt(formData.companions, 10) || 0),
    relation: normalizeRelation(formData.relation),
    childSeats: Math.max(0, Number.parseInt(formData.childSeats, 10) || 0),
    vegetarianCount: Math.max(0, Number.parseInt(formData.vegetarianCount, 10) || 0),
    invitationType: normalizeInvitationType(formData.invitationType),
    invitationDelivery: normalizeInvitationDelivery(formData.invitationDelivery),
    address: formData.address.trim(),
    email: formData.email.trim(),
    group: formData.group.trim(),
    phone: formData.phone.trim(),
    tableId: formData.tableId || null,
    note: formData.note.trim(),
  };
  if (payload.invitationType === "none") payload.invitationDelivery = "unsent";

  if (formData.id) {
    state.guests = state.guests.map((guest) =>
      guest.id === formData.id ? { ...guest, ...payload, tableId: payload.rsvp === "declined" ? null : payload.tableId, updatedAt: nowISO() } : guest
    );
  } else {
    state.guests.push({ id: uid("guest"), ...payload, createdAt: nowISO(), updatedAt: nowISO() });
  }
  saveState();
  closeGuestDialog();
  renderAll();
}

function openTableDialog(table = {}) {
  els.tableDialogTitle.textContent = table.id ? "編輯桌次" : "新增桌次";
  els.tableForm.reset();
  const defaults = {
    id: "",
    number: nextTableNumber(),
    alias: "",
    capacity: 10,
    kind: "round",
    ...table,
  };
  Object.entries(defaults).forEach(([key, value]) => {
    if (els.tableForm.elements[key]) els.tableForm.elements[key].value = value ?? "";
  });
  els.tableDialog.showModal();
}

function closeTableDialog() {
  els.tableDialog.close();
}

function saveTableFromForm(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(els.tableForm));
  const number = data.number.trim();
  const payload = {
    number,
    alias: data.alias.trim(),
    name: formatTableNumber(number, data.kind),
    capacity: Math.max(1, Number.parseInt(data.capacity, 10) || 10),
    kind: data.kind,
  };

  if (data.id) {
    state.tables = state.tables.map((table) => table.id === data.id ? { ...table, ...payload } : table);
  } else {
    const position = tablePositionForIndex(state.tables.length, state.tables.length + 1);
    state.tables.push({
      id: uid("table"),
      ...payload,
      x: position.x,
      y: position.y,
    });
  }
  saveState();
  closeTableDialog();
  renderAll();
}

function openGiftDialog(gift = {}) {
  renderGuestSelects();
  els.giftDialogTitle.textContent = gift.id ? "編輯禮金" : "新增禮金";
  els.deleteGiftButton.hidden = !gift.id;
  els.giftForm.reset();
  const defaults = {
    id: "",
    guestId: "",
    name: "",
    amount: "",
    method: "現金",
    note: "",
    ...gift,
  };
  Object.entries(defaults).forEach(([key, value]) => {
    if (els.giftForm.elements[key]) els.giftForm.elements[key].value = value ?? "";
  });
  els.giftDialog.showModal();
}

function closeGiftDialog() {
  els.giftDialog.close();
}

function saveGiftFromForm(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(els.giftForm));
  const guest = findGuest(data.guestId);
  const payload = {
    guestId: data.guestId || "",
    name: data.name.trim() || guest?.name || "",
    amount: Math.max(0, Number.parseInt(data.amount, 10) || 0),
    method: data.method,
    note: data.note.trim(),
    date: todayISO(),
  };

  if (!payload.name) {
    showToast("請填寫登記姓名");
    return;
  }

  if (data.id) {
    state.gifts = state.gifts.map((gift) => gift.id === data.id ? { ...gift, ...payload, updatedAt: nowISO() } : gift);
  } else {
    state.gifts.unshift({ id: uid("gift"), ...payload, createdAt: nowISO(), updatedAt: nowISO() });
  }
  saveState();
  closeGiftDialog();
  renderAll();
}

function confirmDeleteGuest(guest) {
  openConfirm({
    kicker: "刪除賓客",
    title: `刪除「${guest.name}」？`,
    message: "這會同步移除座位安排，但不會刪除已登記的同名禮金紀錄。",
    icon: icons.trash,
    actionLabel: "確認刪除",
    onConfirm: () => {
      state.guests = state.guests.filter((item) => item.id !== guest.id);
      saveState();
      closeGuestDialog();
      renderAll();
      showToast("賓客已刪除");
    },
  });
}

function confirmDeleteGift(gift) {
  openConfirm({
    kicker: "刪除禮金",
    title: `刪除「${gift.name}」的紀錄？`,
    message: "刪除後禮金合計會立即更新。",
    icon: icons.trash,
    actionLabel: "確認刪除",
    onConfirm: () => {
      state.gifts = state.gifts.filter((item) => item.id !== gift.id);
      saveState();
      closeGiftDialog();
      renderAll();
      showToast("禮金紀錄已刪除");
    },
  });
}

function confirmClearTable(table) {
  if (!table) return;
  openConfirm({
    kicker: "清空桌次",
    title: `清空「${tableLabel(table.id)}」？`,
    message: "這桌的賓客會移回待安排清單。",
    icon: icons.refresh,
    actionLabel: "確認清空",
    onConfirm: () => {
      state.guests = state.guests.map((guest) => guest.tableId === table.id ? { ...guest, tableId: null } : guest);
      saveState();
      renderAll();
      showToast(`${tableLabel(table.id)} 已清空`);
    },
  });
}

function confirmDeleteTable(table) {
  if (!table) return;
  openConfirm({
    kicker: "刪除桌次",
    title: `刪除「${tableLabel(table.id)}」？`,
    message: "這桌的賓客會移回待安排清單。",
    icon: icons.trash,
    actionLabel: "確認刪除",
    onConfirm: () => {
      state.tables = state.tables.filter((item) => item.id !== table.id);
      state.guests = state.guests.map((guest) => guest.tableId === table.id ? { ...guest, tableId: null } : guest);
      saveState();
      renderAll();
      showToast("桌次已刪除");
    },
  });
}

function openConfirm({ kicker, title, message, icon, actionLabel, onConfirm }) {
  pendingConfirmation = onConfirm;
  els.confirmKicker.textContent = kicker;
  els.confirmTitle.textContent = title;
  els.confirmMessage.textContent = message;
  els.confirmIcon.innerHTML = icon;
  els.confirmActionButton.textContent = actionLabel;
  els.confirmDialog.showModal();
}

function closeConfirmDialog() {
  pendingConfirmation = null;
  els.confirmDialog.close();
}

function resetTableLayout() {
  autoArrangeTables();
  state.venueItems = structuredClone(seedState.venueItems);
  saveState();
  renderSeating();
  showToast("場地位置已重整");
}

function fillTablesToTarget(targetCount) {
  if (state.tables.length >= targetCount) {
    autoArrangeTables();
    saveState();
    renderAll();
    showToast(`目前已有 ${state.tables.length} 桌，已重新排列`);
    return;
  }

  const missing = targetCount - state.tables.length;
  for (let index = 0; index < missing; index += 1) {
    const number = nextTableNumber();
    state.tables.push({
      id: uid("table"),
      number,
      alias: "",
      name: formatTableNumber(number),
      capacity: 10,
      kind: "round",
      x: 50,
      y: 50,
    });
  }
  autoArrangeTables();
  saveState();
  renderAll();
  showToast(`已新增 ${missing} 桌，並補到 ${state.tables.length} 桌`);
}

function autoArrangeTables() {
  state.tables = state.tables.map((table, index) => ({
    ...table,
    ...tablePositionForIndex(index, state.tables.length),
  }));
}

async function handleImportFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const result = importGuestsFromCSV(text);
    saveState();
    renderAll();
    showToast(`已匯入 ${result.imported} 筆名單${result.gifts ? `、${result.gifts} 筆禮金` : ""}`);
  } catch (error) {
    showToast(error.message || "匯入失敗，請確認 CSV 格式");
  } finally {
    event.target.value = "";
  }
}

function importGuestsFromCSV(text) {
  const rows = parseCSV(text.replace(/^\uFEFF/, ""));
  if (rows.length < 2) throw new Error("CSV 沒有可匯入的資料");
  const headers = rows[0].map((header) => header.trim());
  const index = (name) => headers.findIndex((header) => header === name);
  const requiredNameIndex = index("姓名");
  if (requiredNameIndex === -1) throw new Error("CSV 需要包含「姓名」欄位");

  let imported = 0;
  let gifts = 0;
  rows.slice(1).forEach((row) => {
    const name = cell(row, requiredNameIndex).trim();
    if (!name) return;
    const tableNumber = cell(row, index("桌號")).trim() || cell(row, index("桌次")).trim();
    const tableAlias = cell(row, index("桌次別名")).trim();
    const tableId = tableNumber ? ensureTableBySpec(tableNumber, tableAlias) : null;
    const existing = state.guests.find((guest) => guest.name === name);
    const note = cell(row, index("備註")).trim();
    const childSeatText = cell(row, index("兒童座椅數量")).trim() || cell(row, index("兒童椅")).trim();
    const vegetarianText = cell(row, index("素食人數")).trim() || cell(row, index("素食")).trim();
    const payload = {
      name,
      rsvp: normalizeRsvp(cell(row, index("回覆狀態"))),
      companions: Math.max(0, Number.parseInt(cell(row, index("同行人數")), 10) || 0),
      relation: normalizeRelation(cell(row, index("關係")).trim() || cell(row, index("親友方")).trim() || tableAlias || note),
      childSeats: parseSpecialCount(childSeatText, note, "兒童"),
      vegetarianCount: parseSpecialCount(vegetarianText, note, "素食"),
      invitationType: normalizeInvitationType(cell(row, index("喜帖")).trim()),
      invitationDelivery: normalizeInvitationDelivery(cell(row, index("寄送完成")).trim() || cell(row, index("寄送狀態")).trim()),
      address: cell(row, index("地址")).trim(),
      email: cell(row, index("Email")).trim() || cell(row, index("email")).trim(),
      group: cell(row, index("關係標籤")).trim() || cell(row, index("標籤")).trim(),
      phone: cell(row, index("電話")).trim(),
      tableId,
      note,
    };
    if (payload.rsvp === "declined") payload.tableId = null;
    if (payload.invitationType === "none") payload.invitationDelivery = "unsent";

    if (existing) {
      Object.assign(existing, payload, { updatedAt: nowISO() });
    } else {
      state.guests.push({ id: uid("guest"), ...payload, createdAt: nowISO(), updatedAt: nowISO() });
    }
    imported += 1;

    const giftAmount = Number.parseInt(cell(row, index("禮金金額")).replace(/[^\d]/g, ""), 10) || 0;
    if (giftAmount > 0 && !state.gifts.some((gift) => gift.name === name && Number(gift.amount) === giftAmount)) {
      const guest = state.guests.find((item) => item.name === name);
      state.gifts.push({
        id: uid("gift"),
        guestId: guest?.id || "",
        name,
        amount: giftAmount,
        method: cell(row, index("禮金方式")).trim() || "現金",
        note: cell(row, index("禮金備註")).trim() || tableLabel(tableId),
        date: todayISO(),
        createdAt: nowISO(),
        updatedAt: nowISO(),
      });
      gifts += 1;
    }
  });
  return { imported, gifts };
}

function downloadTemplate() {
  const rows = [
    ["姓名", "回覆狀態", "同行人數", "關係", "兒童座椅數量", "素食人數", "喜帖", "寄送完成", "地址", "Email", "關係標籤", "電話", "桌號", "桌次別名", "備註", "禮金金額", "禮金方式", "禮金備註"],
    ["王建國", "已回覆", "1", "女方親友", "0", "1", "紙本", "未寄送", "台北市信義區松仁路 100 號", "", "親友", "0912-345-678", "1", "女方親友", "素食 1 位", "", "", ""],
    ["李淑芬", "未回覆", "0", "女方親友", "1", "0", "電子", "已寄送", "", "shufen@example.com", "朋友", "0912-111-222", "", "", "需要兒童椅", "", "", ""],
    ["陳怡君", "已回覆", "0", "男方親友", "0", "0", "無", "未寄送", "", "", "同事", "0912-333-444", "2", "男方同事", "", "3600", "轉帳", "第 2 桌"],
  ];
  downloadText(`wedding-guest-template-${todayISO()}.csv`, "\uFEFF" + rows.map(csvLine).join("\n"), "text/csv;charset=utf-8");
}

function exportData() {
  const rows = [
    ["姓名", "回覆狀態", "同行人數", "關係", "兒童座椅數量", "素食人數", "喜帖", "寄送完成", "地址", "Email", "關係標籤", "電話", "桌號", "桌次別名", "桌次顯示", "備註", "禮金金額", "禮金方式", "禮金備註", "總人數"],
    ...state.guests
      .slice()
      .sort((a, b) => tableSortValue(a.tableId).localeCompare(tableSortValue(b.tableId), "zh-Hant", { numeric: true }) || a.name.localeCompare(b.name, "zh-Hant"))
      .map((guest) => {
        const table = findTable(guest.tableId);
        const gift = state.gifts.find((item) => item.guestId === guest.id) || state.gifts.find((item) => item.name === guest.name);
        return [
          guest.name,
          rsvpMeta[guest.rsvp].label,
          guest.companions,
          guest.relation,
          guest.childSeats || 0,
          guest.vegetarianCount || 0,
          invitationMeta[guest.invitationType]?.label || "無",
          invitationDeliveryMeta[guest.invitationDelivery]?.label || "未寄送",
          guest.address || "",
          guest.email || "",
          guest.group,
          guest.phone,
          table?.number || "",
          table?.alias || "",
          table ? tableDisplayName(table) : "待安排",
          guest.note,
          gift?.amount || "",
          gift?.method || "",
          gift?.note || "",
          partySize(guest),
        ];
      }),
  ];
  downloadText(`wedding-guest-list-${todayISO()}.csv`, "\uFEFF" + rows.map(csvLine).join("\n"), "text/csv;charset=utf-8");
  showToast("賓客名單已匯出");
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cellValue = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      cellValue += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(cellValue);
      cellValue = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cellValue);
      rows.push(row);
      row = [];
      cellValue = "";
    } else {
      cellValue += char;
    }
  }
  if (cellValue || row.length) {
    row.push(cellValue);
    rows.push(row);
  }
  return rows.filter((item) => item.some((value) => value.trim()));
}

function csvLine(values) {
  return values.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",");
}

function downloadText(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : structuredClone(seedState);
  } catch {
    return structuredClone(seedState);
  }
}

function normalizeState(value) {
  const legacyCoordinates = value.canvas?.coordinateMode !== "px";
  const toCanvasX = (input, fallback) => {
    const valueNumber = Number(input);
    if (!Number.isFinite(valueNumber)) return fallback;
    return legacyCoordinates ? Math.round((valueNumber / 100) * LEGACY_CANVAS_WIDTH) : valueNumber;
  };
  const toCanvasY = (input, fallback) => {
    const valueNumber = Number(input);
    if (!Number.isFinite(valueNumber)) return fallback;
    return legacyCoordinates ? Math.round((valueNumber / 100) * LEGACY_CANVAS_HEIGHT) : valueNumber;
  };
  const next = {
    canvas: { ...seedState.canvas, ...(value.canvas || {}), coordinateMode: "px" },
    wedding: { ...seedState.wedding, ...(value.wedding || {}) },
    venueItems: Array.isArray(value.venueItems) ? value.venueItems : structuredClone(seedState.venueItems),
    tables: Array.isArray(value.tables) ? value.tables : structuredClone(seedState.tables),
    guests: Array.isArray(value.guests) ? value.guests : structuredClone(seedState.guests),
    gifts: Array.isArray(value.gifts) ? value.gifts : structuredClone(seedState.gifts),
  };
  next.canvas.zoom = normalizeCanvasZoom(next.canvas.zoom);
  next.venueItems = seedState.venueItems.map((seedItem) => {
    const item = next.venueItems.find((entry) => entry.id === seedItem.id) || {};
    return {
      ...seedItem,
      label: item.label || seedItem.label,
      icon: item.icon || seedItem.icon,
      width: Number(item.width) || seedItem.width,
      height: Number(item.height) || seedItem.height,
      x: Math.max(48, toCanvasX(item.x, seedItem.x)),
      y: Math.max(48, toCanvasY(item.y, seedItem.y)),
    };
  });
  next.tables = next.tables.map((table, index) => {
    const seedTable = seedState.tables.find((item) => item.id === table.id);
    const kind = table.kind || "round";
    const number = normalizeTableNumberInput(table.number || seedTable?.number || table.name || `${index + 1}`);
    return {
      id: table.id || uid("table"),
      number,
      alias: table.alias || seedTable?.alias || "",
      name: table.name || seedTable?.name || formatTableNumber(number, kind),
      capacity: Number(table.capacity) || 10,
      kind,
      x: Math.max(48, toCanvasX(table.x, seedTable?.x || tablePositionForIndex(index, next.tables.length).x)),
      y: Math.max(48, toCanvasY(table.y, seedTable?.y || tablePositionForIndex(index, next.tables.length).y)),
    };
  });
  next.guests = next.guests.map((guest) => {
    const table = next.tables.find((item) => item.id === guest.tableId);
    const note = guest.note || "";
    const invitationType = normalizeInvitationType(guest.invitationType ?? guest.invitation ?? guest.inviteType ?? "");
    const invitationDelivery = invitationType === "none"
      ? "unsent"
      : normalizeInvitationDelivery(guest.invitationDelivery ?? guest.invitationSent ?? guest.deliveryStatus ?? "");
    return {
      id: guest.id || uid("guest"),
      name: guest.name || "未命名",
      rsvp: rsvpMeta[guest.rsvp] ? guest.rsvp : "pending",
      companions: Math.max(0, Number.parseInt(guest.companions, 10) || 0),
      relation: normalizeRelation(guest.relation || guest.side || guest.familySide || table?.alias || guest.group || note),
      childSeats: parseSpecialCount(guest.childSeats ?? guest.children ?? "", note, "兒童"),
      vegetarianCount: parseSpecialCount(guest.vegetarianCount ?? guest.vegetarian ?? "", note, "素食"),
      invitationType,
      invitationDelivery,
      address: guest.address || "",
      email: guest.email || "",
      group: guest.group || "",
      phone: guest.phone || "",
      tableId: next.tables.some((item) => item.id === guest.tableId) ? guest.tableId : null,
      note,
      createdAt: guest.createdAt || nowISO(),
      updatedAt: guest.updatedAt || nowISO(),
    };
  });
  next.gifts = next.gifts.map((gift) => {
    const linkedGuest = next.guests.find((guest) => guest.id === gift.guestId);
    return {
      id: gift.id || uid("gift"),
      guestId: gift.guestId || "",
      name: gift.name || linkedGuest?.name || "未命名",
      amount: Number(gift.amount) || 0,
      method: gift.method || "現金",
      note: gift.note || "",
      date: gift.date || todayISO(),
      createdAt: gift.createdAt || nowISO(),
      updatedAt: gift.updatedAt || nowISO(),
    };
  });
  return next;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  markSaved(true);
}

function markSaved(saved) {
  els.layoutSavedLabel.textContent = saved ? "已保存" : "編輯中";
}

function nudgeCanvasZoom(delta) {
  setCanvasZoom(state.canvas.zoom + delta);
}

function handleCanvasWheelZoom(event) {
  if (!event.ctrlKey && !event.metaKey) return;
  event.preventDefault();
  const factor = Math.exp(-event.deltaY * 0.003);
  setCanvasZoomAtPoint(state.canvas.zoom * factor, event.clientX, event.clientY);
}

function handleCanvasShortcutZoom(event) {
  if (currentView !== "seating" || (!event.metaKey && !event.ctrlKey) || event.altKey) return;
  if (event.target.closest?.("input, select, textarea")) return;
  if (event.key === "+" || event.key === "=") {
    event.preventDefault();
    nudgeCanvasZoom(CANVAS_ZOOM_STEP);
  } else if (event.key === "-" || event.key === "_") {
    event.preventDefault();
    nudgeCanvasZoom(-CANVAS_ZOOM_STEP);
  } else if (event.key === "0") {
    event.preventDefault();
    setCanvasZoom(1);
  }
}

function setCanvasZoom(value) {
  const zoom = normalizeCanvasZoom(value);
  const center = canvasViewportCenter();
  if (Math.abs(zoom - state.canvas.zoom) < 0.001) {
    syncZoomControls();
    return;
  }
  state.canvas.zoom = zoom;
  saveState();
  renderSeating();
  scrollCanvasToPoint(center.x, center.y);
}

function setCanvasZoomAtPoint(value, clientX, clientY) {
  const currentZoom = normalizeCanvasZoom(state.canvas.zoom);
  const zoom = normalizeCanvasZoom(value);
  const rect = els.seatingCanvas.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;
  const canvasX = (els.seatingCanvas.scrollLeft + localX) / currentZoom;
  const canvasY = (els.seatingCanvas.scrollTop + localY) / currentZoom;
  if (Math.abs(zoom - currentZoom) < 0.001) {
    syncZoomControls();
    return;
  }
  state.canvas.zoom = zoom;
  saveState();
  renderSeating();
  els.seatingCanvas.scrollLeft = Math.max(0, Math.round(canvasX * zoom - localX));
  els.seatingCanvas.scrollTop = Math.max(0, Math.round(canvasY * zoom - localY));
}

function syncZoomControls() {
  const zoom = normalizeCanvasZoom(state.canvas.zoom);
  state.canvas.zoom = zoom;
  const percent = Math.round(zoom * 100);
  els.zoomRange.value = String(percent);
  els.zoomValue.textContent = `${percent}%`;
  els.zoomOutButton.disabled = zoom <= CANVAS_ZOOM_MIN;
  els.zoomInButton.disabled = zoom >= CANVAS_ZOOM_MAX;
}

function normalizeCanvasZoom(value) {
  return clamp(Math.round((Number(value) || 1) * 100) / 100, CANVAS_ZOOM_MIN, CANVAS_ZOOM_MAX);
}

function canvasSize() {
  const tableCount = Math.max(state.tables.length - 1, 1);
  const columns = layoutColumnCount(tableCount);
  const rows = Math.max(3, Math.ceil(tableCount / columns));
  const bounds = layoutBoundsFromState();
  return {
    width: Math.max(CANVAS_MIN_WIDTH, columns * TABLE_COLUMN_WIDTH + CANVAS_SIDE_GUTTER, bounds.right + CANVAS_GROW_PADDING),
    height: Math.max(CANVAS_MIN_HEIGHT, 360 + rows * TABLE_ROW_HEIGHT, bounds.bottom + CANVAS_GROW_PADDING),
  };
}

function layoutColumnCount(tableCount) {
  if (tableCount <= 9) return 3;
  if (tableCount <= 20) return 4;
  if (tableCount <= 34) return 5;
  return 6;
}

function tablePositionForIndex(index, total) {
  if (index === 0) return { x: 900, y: 520 };
  const tableCount = Math.max(total - 1, 1);
  const columns = layoutColumnCount(tableCount);
  const itemIndex = index - 1;
  const column = itemIndex % columns;
  const row = Math.floor(itemIndex / columns);
  const x = 360 + column * TABLE_COLUMN_WIDTH;
  const y = 860 + row * TABLE_ROW_HEIGHT;
  return {
    x: Math.round(x),
    y: Math.round(y),
  };
}

function canvasContentRect() {
  return els.seatingCanvas.querySelector(".canvas-content")?.getBoundingClientRect() || els.seatingCanvas.getBoundingClientRect();
}

function canvasViewportCenter() {
  const zoom = normalizeCanvasZoom(state.canvas.zoom);
  return {
    x: (els.seatingCanvas.scrollLeft + els.seatingCanvas.clientWidth / 2) / zoom,
    y: (els.seatingCanvas.scrollTop + els.seatingCanvas.clientHeight / 2) / zoom,
  };
}

function scrollCanvasToPoint(x, y) {
  const zoom = normalizeCanvasZoom(state.canvas.zoom);
  els.seatingCanvas.scrollLeft = Math.max(0, Math.round(x * zoom - els.seatingCanvas.clientWidth / 2));
  els.seatingCanvas.scrollTop = Math.max(0, Math.round(y * zoom - els.seatingCanvas.clientHeight / 2));
}

function layoutBoundsFromState() {
  const items = [
    ...state.venueItems.map((item) => ({ ...item, width: item.width || 140, height: item.height || 44 })),
    ...state.tables.map((table) => ({ ...table, width: 240, height: 230 })),
  ];
  return items.reduce((bounds, item) => ({
    left: Math.min(bounds.left, item.x - item.width / 2),
    top: Math.min(bounds.top, item.y - item.height / 2),
    right: Math.max(bounds.right, item.x + item.width / 2),
    bottom: Math.max(bounds.bottom, item.y + item.height / 2),
  }), { left: CANVAS_MIN_WIDTH, top: CANVAS_MIN_HEIGHT, right: 0, bottom: 0 });
}

function renderedLayoutBounds() {
  const nodes = els.seatingCanvas.querySelectorAll(".seat-table, .venue-marker");
  return Array.from(nodes).reduce((bounds, node) => {
    const item = node.dataset.tableId
      ? findTable(node.dataset.tableId)
      : findVenueItem(node.dataset.venueId);
    if (!item) return bounds;
    return {
      left: Math.min(bounds.left, item.x - node.offsetWidth / 2),
      top: Math.min(bounds.top, item.y - node.offsetHeight / 2),
      right: Math.max(bounds.right, item.x + node.offsetWidth / 2),
      bottom: Math.max(bounds.bottom, item.y + node.offsetHeight / 2),
    };
  }, { left: Infinity, top: Infinity, right: 0, bottom: 0 });
}

function fitCanvasToLayout() {
  const bounds = renderedLayoutBounds();
  if (!Number.isFinite(bounds.left)) return;
  const padding = 72;
  const width = Math.max(1, bounds.right - bounds.left);
  const height = Math.max(1, bounds.bottom - bounds.top);
  const zoom = normalizeCanvasZoom(Math.min(
    CANVAS_ZOOM_MAX,
    (els.seatingCanvas.clientWidth - padding * 2) / width,
    (els.seatingCanvas.clientHeight - padding * 2) / height
  ));
  state.canvas.zoom = zoom;
  saveState();
  renderSeating();
  scrollCanvasToPoint(bounds.left + width / 2, bounds.top + height / 2);
  showToast(`已置中顯示所有桌子（${Math.round(zoom * 100)}%）`);
}

function expandCanvasForPoint(x, y) {
  const zoom = normalizeCanvasZoom(state.canvas.zoom);
  const surface = els.seatingCanvas.querySelector(".canvas-surface");
  const content = els.seatingCanvas.querySelector(".canvas-content");
  if (!surface || !content) return;
  const currentWidth = Number.parseFloat(content.style.width) || content.offsetWidth;
  const currentHeight = Number.parseFloat(content.style.height) || content.offsetHeight;
  const nextWidth = Math.max(currentWidth, x + CANVAS_GROW_PADDING);
  const nextHeight = Math.max(currentHeight, y + CANVAS_GROW_PADDING);
  if (nextWidth !== currentWidth || nextHeight !== currentHeight) {
    content.style.width = `${nextWidth}px`;
    content.style.height = `${nextHeight}px`;
    surface.style.width = `${Math.round(nextWidth * zoom)}px`;
    surface.style.height = `${Math.round(nextHeight * zoom)}px`;
  }
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    els.toast.classList.remove("show");
  }, 2200);
}

function ensureTableBySpec(numberOrName, alias = "") {
  const number = normalizeTableNumberInput(numberOrName);
  const existing = state.tables.find((table) =>
    table.number === number ||
    table.name === numberOrName ||
    tableDisplayName(table) === numberOrName
  );
  if (existing) {
    if (alias && existing.alias !== alias) existing.alias = alias;
    return existing.id;
  }
  const id = uid("table");
  const kind = number === "主桌" ? "head" : "round";
  const position = tablePositionForIndex(state.tables.length, state.tables.length + 1);
  state.tables.push({
    id,
    number,
    alias,
    name: formatTableNumber(number, kind),
    capacity: 10,
    kind,
    x: position.x,
    y: position.y,
  });
  return id;
}

function normalizeRsvp(value) {
  const text = String(value || "").trim().toLowerCase();
  if (["已回覆", "已確認", "會來", "confirmed", "yes", "y"].includes(text)) return "confirmed";
  if (["不參加", "無法參加", "declined", "no", "n"].includes(text)) return "declined";
  return "pending";
}

function normalizeRelation(value) {
  const text = String(value || "").trim();
  if (text.includes("女方") || text.includes("新娘") || text.toLowerCase() === "bride") return "女方親友";
  if (text.includes("男方") || text.includes("新郎") || text.toLowerCase() === "groom") return "男方親友";
  return RELATION_OPTIONS.includes(text) ? text : RELATION_OPTIONS[0];
}

function normalizeInvitationType(value) {
  const text = String(value || "").trim().toLowerCase();
  if (["紙本", "paper", "physical", "print", "printed"].includes(text)) return "paper";
  if (["電子", "電子喜帖", "email", "e-mail", "digital", "online"].includes(text)) return "digital";
  return invitationMeta[text] ? text : "none";
}

function normalizeInvitationDelivery(value) {
  const text = String(value || "").trim().toLowerCase();
  if (["已寄送", "已送出", "sent", "done", "yes", "y"].includes(text)) return "sent";
  return invitationDeliveryMeta[text] ? text : "unsent";
}

function parseSpecialCount(value, fallbackText = "", keyword = "") {
  const raw = String(value ?? "").trim();
  if (raw) {
    const parsed = Number.parseInt(raw, 10);
    if (Number.isFinite(parsed)) return Math.max(0, parsed);
    if (keyword && raw.includes(keyword)) return inferSpecialCount(raw, keyword);
  }
  const text = String(fallbackText || "");
  if (!keyword || !text.includes(keyword)) return 0;
  return inferSpecialCount(text, keyword);
}

function inferSpecialCount(text, keyword) {
  const keywordPattern = new RegExp(`${keyword}[^0-9]*(\\d+)`);
  const beforePattern = new RegExp(`(\\d+)[^0-9]*${keyword}`);
  const match = text.match(keywordPattern) || text.match(beforePattern);
  return Math.max(1, Number.parseInt(match?.[1], 10) || 1);
}

function tableOccupancy(tableId, exceptGuestId = null) {
  return state.guests
    .filter((guest) => guest.tableId === tableId && guest.id !== exceptGuestId && guest.rsvp !== "declined")
    .reduce((sum, guest) => sum + partySize(guest), 0);
}

function partySize(guest) {
  return 1 + (Number.parseInt(guest.companions, 10) || 0) + (Number.parseInt(guest.childSeats, 10) || 0);
}

function tableSpecialCounts(tableId) {
  return state.guests
    .filter((guest) => guest.tableId === tableId && guest.rsvp !== "declined")
    .reduce((counts, guest) => ({
      vegetarianCount: counts.vegetarianCount + (Number.parseInt(guest.vegetarianCount, 10) || 0),
      childSeats: counts.childSeats + (Number.parseInt(guest.childSeats, 10) || 0),
    }), { vegetarianCount: 0, childSeats: 0 });
}

function tableSeatStatus(table) {
  const occupancy = Number.isFinite(table.occupancy) ? table.occupancy : tableOccupancy(table.id);
  const capacity = Number(table.capacity) || 1;
  if (occupancy > capacity) {
    return {
      className: "over",
      label: `${occupancy}/${capacity}`,
      icon: icons.x,
      title: `${tableDisplayName(table)} 已超出容量 ${occupancy}/${capacity}`,
    };
  }
  if (occupancy >= capacity) {
    return {
      className: "full",
      label: `${occupancy}/${capacity}`,
      icon: icons.check,
      title: `${tableDisplayName(table)} 已滿桌 ${occupancy}/${capacity}`,
    };
  }
  if (occupancy >= 8) {
    return {
      className: "high",
      label: `${occupancy}/${capacity}`,
      icon: icons.users,
      title: `${tableDisplayName(table)} 接近滿桌 ${occupancy}/${capacity}`,
    };
  }
  if (occupancy >= 4) {
    return {
      className: "medium",
      label: `${occupancy}/${capacity}`,
      icon: icons.users,
      title: `${tableDisplayName(table)} 已安排 ${occupancy}/${capacity}`,
    };
  }
  return {
    className: "low",
    label: `${occupancy}/${capacity}`,
    icon: icons.table,
    title: `${tableDisplayName(table)} 尚有多數空位 ${occupancy}/${capacity}`,
  };
}

function guestAssignmentStatus(guest) {
  if (guest.rsvp === "declined") return { label: "不需安排", className: "declined" };
  if (guest.tableId) return { label: "已安排", className: "confirmed" };
  return { label: "未安排", className: "pending" };
}

function tableLabel(tableId) {
  const table = findTable(tableId);
  if (!table) return "待安排";
  return [tableDisplayName(table), table.alias].filter(Boolean).join(" · ");
}

function tableDisplayName(table) {
  if (!table) return "待安排";
  return formatTableNumber(table.number || table.name, table.kind);
}

function formatTableNumber(value, kind = "round") {
  const number = normalizeTableNumberInput(value);
  if (!number) return "";
  if (number.includes("桌")) return number;
  if (number === "主桌" || kind === "head") return number === "主桌" ? "主桌" : `${number} 主桌`;
  if (/^\d+$/.test(number)) return `第 ${number} 桌`;
  return `${number} 桌`;
}

function normalizeTableNumberInput(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (text === "主桌") return text;
  const match = text.match(/^第\s*(.+?)\s*桌$/);
  if (match) return match[1].trim();
  return text.replace(/\s+/g, " ");
}

function tableSortValue(tableId) {
  const table = findTable(tableId);
  if (!table) return "9999";
  if (table.kind === "head" || table.number === "主桌") return "0000";
  return table.number || tableDisplayName(table);
}

function findGuest(id) {
  return state.guests.find((guest) => guest.id === id);
}

function findTable(id) {
  return state.tables.find((table) => table.id === id);
}

function findVenueItem(id) {
  return state.venueItems.find((item) => item.id === id);
}

function findLayoutItem(type, id) {
  return type === "table" ? findTable(id) : findVenueItem(id);
}

function findGift(id) {
  return state.gifts.find((gift) => gift.id === id);
}

function nextTableNumber() {
  const used = new Set(state.tables.map((table) => table.number));
  let number = 1;
  while (used.has(String(number))) number += 1;
  return String(number);
}

function rsvpSort(guest) {
  return { pending: 0, confirmed: 1, declined: 2 }[guest.rsvp] ?? 3;
}

function guestHaystack(guest) {
  const invitationLabel = invitationMeta[guest.invitationType]?.label || "無";
  const deliveryLabel = invitationDeliveryMeta[guest.invitationDelivery]?.label || "未寄送";
  return `${guest.name} ${guest.phone} ${guest.relation} ${guest.group} ${guest.note} ${tableLabel(guest.tableId)} ${rsvpMeta[guest.rsvp].label} ${guest.childSeats || 0} ${guest.vegetarianCount || 0} ${invitationLabel} ${deliveryLabel} ${guest.address || ""} ${guest.email || ""}`.toLowerCase();
}

function invitationHaystack(guest) {
  const invitationLabel = invitationMeta[guest.invitationType]?.label || "無";
  const deliveryLabel = invitationDeliveryMeta[guest.invitationDelivery]?.label || "未寄送";
  return `${guest.name} ${guest.phone} ${guest.relation} ${guest.group} ${guest.note} ${tableLabel(guest.tableId)} ${invitationLabel} ${deliveryLabel} ${guest.address || ""} ${guest.email || ""}`.toLowerCase();
}

function invitationSortValue(guest) {
  const typeRank = { paper: "0", digital: "1", none: "2" }[guest.invitationType] || "2";
  const deliveryRank = guest.invitationDelivery === "sent" ? "1" : "0";
  return `${deliveryRank}-${typeRank}-${tableSortValue(guest.tableId)}`;
}

function allowDrop(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function cell(row, index) {
  return index >= 0 ? String(row[index] ?? "") : "";
}

function money(value) {
  return new Intl.NumberFormat("zh-Hant-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("zh-Hant-TW", {
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(`${value}T00:00:00`));
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function nowISO() {
  return new Date().toISOString();
}

function uid(prefix) {
  return `${prefix}-${crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function empty(text) {
  return `<div class="empty-state">${escapeHTML(text)}</div>`;
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
