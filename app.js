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
const BACKUP_VERSION = 1;
const SNAPSHOT_KEY = "wedding.seating.snapshots.v1";
const CLOUD_SYNC_CONFIG_KEY = "wedding.seating.cloudSync.v1";
const AUTO_SNAPSHOT_INTERVAL_MS = 2 * 60 * 1000;
const MAX_AUTO_SNAPSHOTS = 8;
const LAYOUT_HISTORY_LIMIT = 30;
const CLOUD_SYNC_DEBOUNCE_MS = 1800;
const CLOUD_SYNC_POLL_MS = 30000;
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
const invitationStatusMeta = {
  missing: { label: "待補資料", className: "missing", hint: "紙本需地址，電子需 Email" },
  ready: { label: "待寄送", className: "ready", hint: "資料已齊，尚未寄送" },
  sent: { label: "已寄送", className: "sent", hint: "喜帖寄送完成" },
  none: { label: "不需喜帖", className: "none", hint: "此賓客不列入寄送待辦" },
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
  undo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-2"/></svg>',
  redo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m15 14 5-5-5-5"/><path d="M20 9H10a6 6 0 0 0 0 12h2"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
  unlock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.3-2.2"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
  alignHorizontal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M4 18h16"/><rect x="6" y="9" width="5" height="6" rx="1.2"/><rect x="13" y="9" width="5" height="6" rx="1.2"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m5 12 4.2 4.2L19 6.5"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"/><path d="m14 7 3 3"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
  grip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 5h.01M15 5h.01M9 12h.01M15 12h.01M9 19h.01M15 19h.01"/></svg>',
  cash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 9v.01M18 15v.01"/></svg>',
  stage: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 5h16v10H4z"/><path d="M8 19h8M12 15v4"/><path d="M7 9h10"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17.5 19H8a5 5 0 1 1 1.3-9.8A6 6 0 0 1 21 11.5 3.8 3.8 0 0 1 17.5 19Z"/><path d="M12 12v5M9.5 14.5 12 12l2.5 2.5"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h10M18 6h2"/><circle cx="16" cy="6" r="2"/><path d="M4 12h2M10 12h10"/><circle cx="8" cy="12" r="2"/><path d="M4 18h12M20 18h0"/><circle cx="18" cy="18" r="2"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
};

const rsvpMeta = {
  confirmed: { label: "已回覆", className: "confirmed" },
  pending: { label: "未回覆", className: "pending" },
  declined: { label: "不參加", className: "declined" },
};

const GUEST_SORT_COLUMNS = [
  { key: "name", label: "姓名", align: "cell-left", type: "text", value: (guest) => guest.name || "" },
  { key: "rsvp", label: "回覆狀態", align: "cell-center", type: "number", value: (guest) => rsvpSort(guest) },
  { key: "assignment", label: "座位狀態", align: "cell-center", type: "number", value: (guest) => guestAssignmentSort(guest) },
  { key: "relation", label: "關係", align: "cell-center", type: "text", value: (guest) => guest.relation || "" },
  { key: "invitation", label: "喜帖", align: "cell-center", type: "number", value: (guest) => invitationSortRank(guest.invitationType) },
  { key: "companions", label: "同行人數", align: "cell-center", type: "number", value: (guest) => Number.parseInt(guest.companions, 10) || 0 },
  { key: "childSeats", label: "兒童椅", align: "cell-center", type: "number", value: (guest) => Number.parseInt(guest.childSeats, 10) || 0 },
  { key: "vegetarianCount", label: "素食", align: "cell-center", type: "number", value: (guest) => Number.parseInt(guest.vegetarianCount, 10) || 0 },
  { key: "table", label: "桌號 / 別名", align: "cell-left", type: "text", value: (guest) => tableSortValue(guest.tableId) },
  { key: "note", label: "備註", align: "cell-left", type: "text", value: (guest) => guest.note || "" },
];
const GUEST_SORT_COLUMN_MAP = Object.fromEntries(GUEST_SORT_COLUMNS.map((column) => [column.key, column]));

const seedState = {
  canvas: {
    zoom: 1,
    coordinateMode: "px",
    layoutLocked: false,
  },
  meta: {
    updatedAt: "",
    lastBackupAt: "",
    lastRestoredAt: "",
  },
  wedding: {
    label: "婚禮資訊",
    name: "文定 & 婚宴",
    date: "2026/11/21 18:00",
    venue: "台北文華東方酒店 3F 宴會廳",
    avatar: "林",
    coupleName: "林小美 & 陳大明",
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
let guestSort = { key: "rsvp", direction: "asc" };
let pendingConfirmation = null;
let movingLayoutItem = null;
let suppressTableClickId = null;
let activeGuestDrag = null;
let suppressGuestClickId = null;
let layoutUndoStack = [];
let layoutRedoStack = [];
let isRestoringHistory = false;
let cloudSyncConfig = loadCloudSyncConfig();
let cloudSyncTimer = null;
let cloudSyncPollTimer = null;
let cloudSyncBusy = false;
let cloudSyncLastMessage = "";
const guestInlineEditTimers = new Map();

const els = {
  topbar: document.querySelector(".topbar"),
  sidebar: document.querySelector(".sidebar"),
  todayLabel: document.querySelector("#todayLabel"),
  viewTitle: document.querySelector("#viewTitle"),
  mobileNavButton: document.querySelector("#mobileNavButton"),
  mobileNavLabel: document.querySelector("#mobileNavLabel"),
  mobileToolsButton: document.querySelector("#mobileToolsButton"),
  eventLabel: document.querySelector("#eventLabel"),
  eventName: document.querySelector("#eventName"),
  eventDate: document.querySelector("#eventDate"),
  eventVenue: document.querySelector("#eventVenue"),
  accountAvatar: document.querySelector("#accountAvatar"),
  accountName: document.querySelector("#accountName"),
  accountStatus: document.querySelector("#accountStatus"),
  openSettingsButton: document.querySelector("#openSettingsButton"),
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
  alignTablesButton: document.querySelector("#alignTablesButton"),
  resetLayoutButton: document.querySelector("#resetLayoutButton"),
  showNamesToggle: document.querySelector("#showNamesToggle"),
  layoutSavedLabel: document.querySelector("#layoutSavedLabel"),
  unassignedDropZone: document.querySelector("#unassignedDropZone"),
  unassignedSearchInput: document.querySelector("#unassignedSearchInput"),
  unassignedList: document.querySelector("#unassignedList"),
  unassignedCount: document.querySelector("#unassignedCount"),
  focusUnassignedButton: document.querySelector("#focusUnassignedButton"),
  guestListToolbar: document.querySelector("#guestListToolbar"),
  guestFilterButton: document.querySelector("#guestFilterButton"),
  guestFilterPanel: document.querySelector("#guestFilterPanel"),
  guestSearchInput: document.querySelector("#guestSearchInput"),
  rsvpFilter: document.querySelector("#rsvpFilter"),
  assignmentFilter: document.querySelector("#assignmentFilter"),
  relationFilter: document.querySelector("#relationFilter"),
  guestTable: document.querySelector("#guestTable"),
  invitationSearchInput: document.querySelector("#invitationSearchInput"),
  invitationTypeFilter: document.querySelector("#invitationTypeFilter"),
  invitationStatusFilter: document.querySelector("#invitationStatusFilter"),
  invitationTable: document.querySelector("#invitationTable"),
  giftSearchInput: document.querySelector("#giftSearchInput"),
  giftMethodFilter: document.querySelector("#giftMethodFilter"),
  giftTable: document.querySelector("#giftTable"),
  tableManager: document.querySelector("#tableManager"),
  importButton: document.querySelector("#importButton"),
  importFile: document.querySelector("#importFile"),
  templateButton: document.querySelector("#templateButton"),
  exportButton: document.querySelector("#exportButton"),
  backupButton: document.querySelector("#backupButton"),
  restoreButton: document.querySelector("#restoreButton"),
  restoreFile: document.querySelector("#restoreFile"),
  snapshotButton: document.querySelector("#snapshotButton"),
  backupStatus: document.querySelector("#backupStatus"),
  cloudSyncButton: document.querySelector("#cloudSyncButton"),
  cloudSyncStatus: document.querySelector("#cloudSyncStatus"),
  addTableButton: document.querySelector("#addTableButton"),
  fill30TablesButton: document.querySelector("#fill30TablesButton"),
  addGuestButton: document.querySelector("#addGuestButton"),
  addGiftFromViewButton: document.querySelector("#addGiftFromViewButton"),
  lockLayoutButton: document.querySelector("#lockLayoutButton"),
  undoLayoutButton: document.querySelector("#undoLayoutButton"),
  redoLayoutButton: document.querySelector("#redoLayoutButton"),
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
  tableGuestsDialog: document.querySelector("#tableGuestsDialog"),
  tableGuestsDialogKicker: document.querySelector("#tableGuestsDialogKicker"),
  tableGuestsDialogTitle: document.querySelector("#tableGuestsDialogTitle"),
  tableGuestsOverview: document.querySelector("#tableGuestsOverview"),
  tableGuestsDetailList: document.querySelector("#tableGuestsDetailList"),
  closeTableGuestsDialogButton: document.querySelector("#closeTableGuestsDialogButton"),
  cancelTableGuestsButton: document.querySelector("#cancelTableGuestsButton"),
  giftDialog: document.querySelector("#giftDialog"),
  giftForm: document.querySelector("#giftForm"),
  giftDialogTitle: document.querySelector("#giftDialogTitle"),
  closeGiftDialogButton: document.querySelector("#closeGiftDialogButton"),
  cancelGiftButton: document.querySelector("#cancelGiftButton"),
  deleteGiftButton: document.querySelector("#deleteGiftButton"),
  quickGiftForm: document.querySelector("#quickGiftForm"),
  quickGiftNameInput: document.querySelector("#quickGiftNameInput"),
  quickGiftOptions: document.querySelector("#quickGiftOptions"),
  quickGiftAmountInput: document.querySelector("#quickGiftAmountInput"),
  quickGiftMethodInput: document.querySelector("#quickGiftMethodInput"),
  quickGiftNoteInput: document.querySelector("#quickGiftNoteInput"),
  quickGiftHint: document.querySelector("#quickGiftHint"),
  quickGiftStatus: document.querySelector("#quickGiftStatus"),
  quickAmountButtons: document.querySelectorAll("[data-quick-amount]"),
  confirmDialog: document.querySelector("#confirmDialog"),
  confirmForm: document.querySelector("#confirmForm"),
  confirmIcon: document.querySelector("#confirmIcon"),
  confirmKicker: document.querySelector("#confirmKicker"),
  confirmTitle: document.querySelector("#confirmTitle"),
  confirmMessage: document.querySelector("#confirmMessage"),
  confirmActionButton: document.querySelector("#confirmActionButton"),
  cancelConfirmButton: document.querySelector("#cancelConfirmButton"),
  snapshotDialog: document.querySelector("#snapshotDialog"),
  snapshotList: document.querySelector("#snapshotList"),
  closeSnapshotDialogButton: document.querySelector("#closeSnapshotDialogButton"),
  cancelSnapshotButton: document.querySelector("#cancelSnapshotButton"),
  settingsDialog: document.querySelector("#settingsDialog"),
  settingsForm: document.querySelector("#settingsForm"),
  closeSettingsDialogButton: document.querySelector("#closeSettingsDialogButton"),
  cancelSettingsButton: document.querySelector("#cancelSettingsButton"),
  cloudSyncDialog: document.querySelector("#cloudSyncDialog"),
  cloudSyncForm: document.querySelector("#cloudSyncForm"),
  closeCloudSyncDialogButton: document.querySelector("#closeCloudSyncDialogButton"),
  cloudSyncMessage: document.querySelector("#cloudSyncMessage"),
  clearCloudSyncButton: document.querySelector("#clearCloudSyncButton"),
  pullCloudButton: document.querySelector("#pullCloudButton"),
  pushCloudButton: document.querySelector("#pushCloudButton"),
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
document.body.dataset.view = currentView;

bindEvents();
renderAll();
startCloudSync();

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

function bindEvents() {
  els.mobileNavButton.addEventListener("click", toggleMobileNav);
  els.mobileToolsButton.addEventListener("click", toggleMobileTools);
  els.navItems.forEach((item) => item.addEventListener("click", () => setView(item.dataset.view)));
  document.querySelectorAll("[data-view-jump]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.viewJump));
  });

  els.importButton.addEventListener("click", () => els.importFile.click());
  els.importFile.addEventListener("change", handleImportFile);
  els.templateButton.addEventListener("click", downloadTemplate);
  els.exportButton.addEventListener("click", exportData);
  els.backupButton.addEventListener("click", downloadFullBackup);
  els.restoreButton.addEventListener("click", () => els.restoreFile.click());
  els.restoreFile.addEventListener("change", handleRestoreFile);
  els.snapshotButton.addEventListener("click", openSnapshotDialog);
  els.cloudSyncButton.addEventListener("click", openCloudSyncDialog);
  els.openSettingsButton.addEventListener("click", openSettingsDialog);
  els.addGuestButton.addEventListener("click", () => openGuestDialog());
  els.addTableButton.addEventListener("click", () => openTableDialog());
  els.fill30TablesButton.addEventListener("click", () => fillTablesToTarget(TARGET_TABLE_COUNT));
  els.addGiftFromViewButton.addEventListener("click", () => openGiftDialog());
  els.tableVisibilityFilter.addEventListener("change", renderSeating);
  els.zoomOutButton.addEventListener("click", () => nudgeCanvasZoom(-CANVAS_ZOOM_STEP));
  els.zoomInButton.addEventListener("click", () => nudgeCanvasZoom(CANVAS_ZOOM_STEP));
  els.zoomResetButton.addEventListener("click", () => setCanvasZoom(1));
  els.zoomRange.addEventListener("input", () => setCanvasZoom(Number(els.zoomRange.value) / 100));
  els.seatingCanvas.addEventListener("wheel", handleCanvasWheelZoom, { passive: false });
  window.addEventListener("keydown", handleCanvasShortcutZoom);
  els.fitCanvasButton.addEventListener("click", () => fitCanvasToLayout());
  els.lockLayoutButton.addEventListener("click", () => setLayoutLock(!state.canvas.layoutLocked));
  els.undoLayoutButton.addEventListener("click", undoLayoutChange);
  els.redoLayoutButton.addEventListener("click", redoLayoutChange);
  els.alignTablesButton.addEventListener("click", alignTablesHorizontally);
  els.resetLayoutButton.addEventListener("click", resetTableLayout);
  els.showNamesToggle.addEventListener("change", renderSeating);
  els.focusUnassignedButton.addEventListener("click", () => setView("guests", { assignment: "unassigned" }));
  els.unassignedSearchInput.addEventListener("input", renderUnassigned);
  els.guestFilterButton.addEventListener("click", toggleGuestFilters);
  els.guestSearchInput.addEventListener("input", renderGuestTable);
  els.rsvpFilter.addEventListener("change", renderGuestTable);
  els.assignmentFilter.addEventListener("change", renderGuestTable);
  els.relationFilter.addEventListener("change", renderGuestTable);
  els.invitationSearchInput.addEventListener("input", renderInvitationTable);
  els.invitationTypeFilter.addEventListener("change", renderInvitationTable);
  els.invitationStatusFilter.addEventListener("change", renderInvitationTable);
  els.giftSearchInput.addEventListener("input", renderGiftTable);
  els.giftMethodFilter.addEventListener("change", renderGiftTable);
  els.quickGiftForm.addEventListener("submit", submitQuickGift);
  els.quickGiftNameInput.addEventListener("input", updateQuickGiftHint);
  els.quickGiftAmountInput.addEventListener("input", updateQuickGiftHint);
  els.quickAmountButtons.forEach((button) => {
    button.addEventListener("click", () => {
      els.quickGiftAmountInput.value = button.dataset.quickAmount;
      updateQuickGiftHint();
      els.quickGiftNameInput.focus();
    });
  });

  els.closeGuestDialogButton.addEventListener("click", closeGuestDialog);
  els.cancelGuestButton.addEventListener("click", closeGuestDialog);
  els.closeTableDialogButton.addEventListener("click", closeTableDialog);
  els.cancelTableButton.addEventListener("click", closeTableDialog);
  els.closeTableGuestsDialogButton.addEventListener("click", closeTableGuestsDialog);
  els.cancelTableGuestsButton.addEventListener("click", closeTableGuestsDialog);
  els.closeGiftDialogButton.addEventListener("click", closeGiftDialog);
  els.cancelGiftButton.addEventListener("click", closeGiftDialog);
  els.cancelConfirmButton.addEventListener("click", closeConfirmDialog);
  els.closeSnapshotDialogButton.addEventListener("click", closeSnapshotDialog);
  els.cancelSnapshotButton.addEventListener("click", closeSnapshotDialog);
  els.closeSettingsDialogButton.addEventListener("click", closeSettingsDialog);
  els.cancelSettingsButton.addEventListener("click", closeSettingsDialog);
  els.closeCloudSyncDialogButton.addEventListener("click", closeCloudSyncDialog);
  bindDialogBackdropClose();
  els.cloudSyncForm.addEventListener("submit", saveCloudSyncSettings);
  els.clearCloudSyncButton.addEventListener("click", confirmClearCloudSyncSettings);
  els.pullCloudButton.addEventListener("click", () => pullCloudState({ confirmBeforeApply: true }));
  els.pushCloudButton.addEventListener("click", () => pushCloudState({ manual: true }));

  els.guestForm.addEventListener("submit", saveGuestFromForm);
  els.tableForm.addEventListener("submit", saveTableFromForm);
  els.giftForm.addEventListener("submit", saveGiftFromForm);
  els.settingsForm.addEventListener("submit", saveSettingsFromForm);
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

function bindDialogBackdropClose() {
  closeDialogOnBackdrop(els.guestDialog, closeGuestDialog);
  closeDialogOnBackdrop(els.tableDialog, closeTableDialog);
  closeDialogOnBackdrop(els.tableGuestsDialog, closeTableGuestsDialog);
  closeDialogOnBackdrop(els.giftDialog, closeGiftDialog);
  closeDialogOnBackdrop(els.confirmDialog, closeConfirmDialog);
  closeDialogOnBackdrop(els.snapshotDialog, closeSnapshotDialog);
  closeDialogOnBackdrop(els.settingsDialog, closeSettingsDialog);
  closeDialogOnBackdrop(els.cloudSyncDialog, closeCloudSyncDialog);
}

function closeDialogOnBackdrop(dialog, closeDialog) {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });
}

function setView(view, options = {}) {
  currentView = view;
  document.body.dataset.view = view;
  closeMobileNav();
  closeMobileTools();
  closeGuestFilters();
  const titles = {
    seating: "座位圖",
    guests: "賓客名單",
    invitations: "喜帖管理",
    gifts: "禮金紀錄",
    tables: "桌次管理",
  };
  els.viewTitle.textContent = titles[view];
  els.mobileNavLabel.textContent = titles[view];
  els.navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  els.views.forEach((section) => section.classList.toggle("active", section.id === `${view}View`));

  if (options.assignment) {
    els.assignmentFilter.value = options.assignment;
    renderGuestTable();
  }
}

function toggleMobileNav() {
  const expanded = !els.sidebar.classList.contains("nav-open");
  if (expanded) closeMobileTools();
  els.sidebar.classList.toggle("nav-open", expanded);
  els.mobileNavButton.setAttribute("aria-expanded", String(expanded));
}

function closeMobileNav() {
  els.sidebar.classList.remove("nav-open");
  els.mobileNavButton.setAttribute("aria-expanded", "false");
}

function toggleMobileTools() {
  const expanded = !els.topbar.classList.contains("tools-open");
  if (expanded) closeMobileNav();
  els.topbar.classList.toggle("tools-open", expanded);
  els.mobileToolsButton.setAttribute("aria-expanded", String(expanded));
}

function closeMobileTools() {
  els.topbar.classList.remove("tools-open");
  els.mobileToolsButton.setAttribute("aria-expanded", "false");
}

function toggleGuestFilters() {
  const expanded = !els.guestListToolbar.classList.contains("filters-open");
  els.guestListToolbar.classList.toggle("filters-open", expanded);
  els.guestFilterButton.setAttribute("aria-expanded", String(expanded));
}

function closeGuestFilters() {
  els.guestListToolbar.classList.remove("filters-open");
  els.guestFilterButton.setAttribute("aria-expanded", "false");
}

function renderAll() {
  renderEventInfo();
  renderMetrics();
  renderSeating();
  renderUnassigned();
  renderGuestTable();
  renderInvitationTable();
  renderGiftTable();
  renderTableManager();
  renderGuestSelects();
  renderQuickGiftOptions();
  updateQuickGiftHint();
  renderBackupStatus();
  renderCloudSyncStatus();
  syncLayoutSafetyControls();
}

function renderEventInfo() {
  els.eventLabel.textContent = state.wedding.label || seedState.wedding.label;
  els.eventName.textContent = state.wedding.name || seedState.wedding.name;
  els.eventDate.textContent = state.wedding.date || seedState.wedding.date;
  els.eventVenue.textContent = state.wedding.venue || seedState.wedding.venue;
  els.accountAvatar.textContent = (state.wedding.avatar || seedState.wedding.avatar).slice(0, 2);
  els.accountName.textContent = state.wedding.coupleName || seedState.wedding.coupleName;
  renderAccountStatus();
}

function renderAccountStatus() {
  if (!els.accountStatus) return;
  els.accountStatus.textContent = getSystemStatusText();
}

function getSystemStatusText() {
  if (cloudSyncConfigured()) {
    const syncedText = cloudSyncConfig.lastSyncedAt ? ` · ${formatDateTime(cloudSyncConfig.lastSyncedAt)}` : "";
    return `${cloudSyncConfig.autoSync ? "雲端自動同步" : "雲端手動同步"}${syncedText}`;
  }
  return state.meta?.updatedAt ? `本機已保存 · ${formatDateTime(state.meta.updatedAt)}` : "本機自動保存";
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

  els.metricsGrid.dataset.mobileSummary = `${totalPeople} 位 · 已回覆 ${replied}/${state.guests.length} · 未安排 ${unassigned} · 禮金 ${money(giftTotal)}`;
  els.metricsGrid.innerHTML = cards.map((card) => `
    <article class="metric-card" data-label="${escapeHTML(card.label)}" data-value="${escapeHTML(card.value)}" data-note="${escapeHTML(card.note)}">
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
  syncLayoutSafetyControls();
  els.seatingCanvas.classList.toggle("layout-locked", Boolean(state.canvas.layoutLocked));
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
  const locked = Boolean(state.canvas.layoutLocked);
  return `
    <button class="venue-marker ${item.id === "stage" ? "stage-marker" : "gift-marker"} ${locked ? "locked-layout" : ""}"
      data-venue-id="${item.id}"
      type="button"
      style="left:${item.x}px;top:${item.y}px;width:${item.width}px;height:${item.height}px"
      aria-label="移動${escapeHTML(item.label)}"
      title="${locked ? "桌位已鎖定，無法移動" : `移動${escapeHTML(item.label)}`}">
      <span class="venue-icon">${icons[item.icon] || icons.target}</span>
      <span>${escapeHTML(item.label)}</span>
      <span class="venue-grip">${locked ? icons.lock : icons.grip}</span>
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
  const locked = Boolean(state.canvas.layoutLocked);

  return `
    <section class="seat-table ${table.over ? "over-capacity" : ""} ${table.hidden ? "hidden-by-filter" : ""} ${locked ? "locked-layout" : ""} table-status-${seatStatus.className}"
      data-table-id="${table.id}"
      style="left:${table.x}px;top:${table.y}px">
      <div class="table-card-header">
        <div class="table-title">
          <strong class="table-name">${escapeHTML(tableDisplayName(table))}</strong>
          <span class="table-alias">${escapeHTML(table.alias || "未設定別名")}</span>
        </div>
        <button class="move-handle table-status-box ${seatStatus.className}" data-move-table="${table.id}" type="button" aria-label="${escapeHTML(seatStatus.title)}${locked ? "；桌位已鎖定" : "；拖曳移動桌位"}" title="${escapeHTML(seatStatus.title)}${locked ? "；桌位已鎖定" : "；拖曳移動桌位"}">
          <span class="table-status-main">${locked ? icons.lock : seatStatus.icon}<span>${escapeHTML(seatStatus.label)}</span></span>
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

function renderGuestTable() {
  const query = els.guestSearchInput.value.trim().toLowerCase();
  const rsvp = els.rsvpFilter.value;
  const assignment = els.assignmentFilter.value;
  const relation = els.relationFilter.value;
  updateGuestFilterButton();
  const rows = state.guests
    .filter((guest) => rsvp === "all" || guest.rsvp === rsvp)
    .filter((guest) => relation === "all" || guest.relation === relation)
    .filter((guest) => {
      if (assignment === "assigned") return Boolean(guest.tableId);
      if (assignment === "unassigned") return guest.rsvp !== "declined" && !guest.tableId;
      return true;
    })
    .filter((guest) => !query || guestHaystack(guest).includes(query))
    .sort(compareGuestRows);

  els.guestTable.innerHTML = `
    <div class="table-scroll" role="region" aria-label="賓客名單表格">
      <div class="table-row guest-table header">
        ${GUEST_SORT_COLUMNS.map(guestTableHeaderCell).join("")}
        <span class="cell-actions">操作</span>
      </div>
      ${rows.length ? rows.map((guest) => {
        const assignmentStatus = guestAssignmentStatus(guest);
        return `
          <div class="table-row guest-table" data-guest-row="${guest.id}">
            ${mobileGuestSummaryButton(guest, assignmentStatus)}
            <div class="guest-name-cell" data-label="姓名">
              <button class="guest-name-button" data-edit-guest="${guest.id}" data-allow-delete="true" type="button" aria-label="編輯${escapeHTML(guest.name)}">
                <strong class="guest-name-text" title="${escapeHTML(guest.name)}">${escapeHTML(guest.name)}</strong>
                <span class="guest-phone-text" title="${escapeHTML(guest.phone || "未填電話")}">${escapeHTML(guest.phone || "未填電話")}</span>
              </button>
            </div>
            <span class="cell-center" data-label="回覆">
              <select class="inline-field inline-select" data-guest-field="rsvp" data-guest-id="${guest.id}" aria-label="編輯${escapeHTML(guest.name)}的回覆狀態">
                ${rsvpOptions(guest.rsvp)}
              </select>
            </span>
            <span class="cell-center" data-label="座位"><span class="status-badge ${assignmentStatus.className}">${assignmentStatus.label}</span></span>
            <span class="cell-center" data-label="關係">
              <select class="inline-field inline-select relation-select ${guest.relation === "女方親友" ? "bride" : "groom"}" data-guest-field="relation" data-guest-id="${guest.id}" aria-label="編輯${escapeHTML(guest.name)}的關係">
                ${relationOptions(guest.relation)}
              </select>
            </span>
            <span class="cell-center" data-label="喜帖">
              <select class="inline-field inline-select invitation-select ${invitationMeta[guest.invitationType]?.className || "none"}" data-guest-field="invitationType" data-guest-id="${guest.id}" aria-label="編輯${escapeHTML(guest.name)}的喜帖">
                ${invitationOptions(guest.invitationType)}
              </select>
            </span>
            <span class="cell-center" data-label="同行"><input class="inline-field inline-number" data-guest-field="companions" data-guest-id="${guest.id}" type="number" min="0" step="1" value="${Math.max(0, Number.parseInt(guest.companions, 10) || 0)}" aria-label="編輯${escapeHTML(guest.name)}的同行人數" /></span>
            <span class="cell-center" data-label="兒童椅"><input class="inline-field inline-number" data-guest-field="childSeats" data-guest-id="${guest.id}" type="number" min="0" step="1" value="${guest.childSeats || 0}" aria-label="編輯${escapeHTML(guest.name)}的兒童座椅數量" /></span>
            <span class="cell-center" data-label="素食"><input class="inline-field inline-number" data-guest-field="vegetarianCount" data-guest-id="${guest.id}" type="number" min="0" step="1" value="${guest.vegetarianCount || 0}" aria-label="編輯${escapeHTML(guest.name)}的素食人數" /></span>
            <span class="cell-left table-label-cell" data-label="桌次">${escapeHTML(tableLabel(guest.tableId))}</span>
            <span class="cell-left note-preview" data-label="備註" title="${escapeHTML(guest.note || "未填備註")}">${escapeHTML(guest.note || "未填備註")}</span>
            <div class="row-actions" data-label="操作">
              <button class="icon-button" data-edit-guest="${guest.id}" data-allow-delete="true" type="button" aria-label="編輯">${icons.edit}</button>
              <button class="icon-button danger-icon" data-delete-guest="${guest.id}" type="button" aria-label="刪除${escapeHTML(guest.name)}" title="刪除">${icons.trash}</button>
            </div>
          </div>
        `;
      }).join("") : empty("沒有符合條件的賓客。")}
    </div>
    <div class="table-pagination guest-summary" aria-label="賓客名單摘要">
      <span>${rows.length ? `共 ${rows.length} 筆賓客` : "共 0 筆"}</span>
    </div>
  `;
  bindGuestSortHeaders(els.guestTable);
  bindGuestInlineEdits(els.guestTable);
  bindGuestActions(els.guestTable);
}

function guestTableHeaderCell(column) {
  const active = guestSort.key === column.key;
  const nextDirection = active && guestSort.direction === "asc" ? "降冪" : "升冪";
  const ariaSort = active ? (guestSort.direction === "asc" ? "ascending" : "descending") : "none";
  const indicator = active ? (guestSort.direction === "asc" ? "&uarr;" : "&darr;") : "";
  return `
    <span class="${column.align}" aria-sort="${ariaSort}">
      <button class="table-sort-button ${active ? "active" : ""}" data-guest-sort="${column.key}" type="button" aria-label="依${column.label}${nextDirection}排序">
        <span>${column.label}</span>
        <span class="sort-indicator" aria-hidden="true">${indicator}</span>
      </button>
    </span>
  `;
}

function bindGuestSortHeaders(root) {
  root.querySelectorAll("[data-guest-sort]").forEach((button) => {
    button.addEventListener("click", () => updateGuestSort(button.dataset.guestSort));
  });
}

function updateGuestSort(key) {
  if (!GUEST_SORT_COLUMN_MAP[key]) return;
  const direction = guestSort.key === key && guestSort.direction === "asc" ? "desc" : "asc";
  guestSort = { key, direction };
  renderGuestTable();
}

function compareGuestRows(a, b) {
  const column = GUEST_SORT_COLUMN_MAP[guestSort.key] || GUEST_SORT_COLUMN_MAP.rsvp;
  const direction = guestSort.direction === "desc" ? -1 : 1;
  const primary = compareGuestSortValues(column.value(a), column.value(b), column.type);
  return primary * direction || defaultGuestCompare(a, b);
}

function compareGuestSortValues(a, b, type) {
  if (type === "number") return Number(a) - Number(b);
  return String(a || "").localeCompare(String(b || ""), "zh-Hant", { numeric: true });
}

function defaultGuestCompare(a, b) {
  return rsvpSort(a) - rsvpSort(b) ||
    tableSortValue(a.tableId).localeCompare(tableSortValue(b.tableId), "zh-Hant", { numeric: true }) ||
    a.name.localeCompare(b.name, "zh-Hant");
}

function guestAssignmentSort(guest) {
  if (guest.rsvp === "declined") return 2;
  return guest.tableId ? 1 : 0;
}

function invitationSortRank(type) {
  return { paper: 0, digital: 1, none: 2 }[normalizeInvitationType(type)] ?? 3;
}

function updateGuestFilterButton() {
  const activeCount = [
    els.rsvpFilter.value !== "all",
    els.assignmentFilter.value !== "all",
    els.relationFilter.value !== "all",
  ].filter(Boolean).length;
  const label = activeCount ? `篩選 ${activeCount}` : "篩選";
  els.guestFilterButton.querySelector("[data-filter-label]").textContent = label;
  els.guestFilterButton.classList.toggle("has-filters", activeCount > 0);
  els.guestFilterButton.setAttribute("aria-label", activeCount ? `已套用 ${activeCount} 個篩選` : "開啟賓客篩選");
}

function mobileGuestSummaryButton(guest, assignmentStatus) {
  const tableText = tableLabel(guest.tableId);
  const phoneOrGroup = guest.phone || guest.group || "未填電話";
  const invitation = invitationMeta[guest.invitationType]?.label || "無";
  const badges = [
    mobileGuestBadge(rsvpMeta[guest.rsvp].label, `rsvp ${rsvpMeta[guest.rsvp].className}`),
    mobileGuestBadge(assignmentStatus.label, `assignment ${assignmentStatus.className}`),
    mobileGuestBadge(guest.relation.replace("親友", ""), guest.relation === "女方親友" ? "relation bride" : "relation groom"),
    guest.invitationType !== "none" ? mobileGuestBadge(invitation, `invitation ${invitationMeta[guest.invitationType]?.className || "none"}`) : "",
    guest.vegetarianCount ? mobileGuestBadge(`素${guest.vegetarianCount}`, "special vegetarian") : "",
    guest.childSeats ? mobileGuestBadge(`童${guest.childSeats}`, "special child") : "",
  ].filter(Boolean).join("");

  return `
    <button class="mobile-guest-card" data-edit-guest="${guest.id}" data-allow-delete="true" type="button" aria-label="編輯${escapeHTML(guest.name)}">
      <span class="mobile-guest-main">
        <strong>${escapeHTML(guest.name)}</strong>
        <span>${escapeHTML(phoneOrGroup)}</span>
      </span>
      <span class="mobile-guest-count">${partySize(guest)} 位</span>
      <span class="mobile-guest-badges">${badges}</span>
      <span class="mobile-guest-table" title="${escapeHTML(tableText)}">${escapeHTML(tableText)}</span>
    </button>
  `;
}

function mobileGuestBadge(label, className) {
  return `<span class="mobile-guest-badge ${className}">${escapeHTML(label)}</span>`;
}

function renderInvitationTable() {
  const query = els.invitationSearchInput.value.trim().toLowerCase();
  const type = els.invitationTypeFilter.value;
  const status = els.invitationStatusFilter.value;
  const rows = state.guests
    .filter((guest) => invitationTypeMatchesFilter(guest, type))
    .filter((guest) => status === "all" || invitationStatusFor(guest).key === status)
    .filter((guest) => !query || invitationHaystack(guest).includes(query))
    .sort((a, b) =>
      invitationSortValue(a).localeCompare(invitationSortValue(b), "zh-Hant") ||
      a.name.localeCompare(b.name, "zh-Hant")
    );
  const statusCounts = countInvitationStatuses(rows);

  els.invitationTable.innerHTML = `
    <div class="table-scroll" role="region" aria-label="喜帖寄送名單表格">
      <div class="table-row invitation-table header">
        <span>姓名</span>
        <span>喜帖</span>
        <span>喜帖狀態</span>
        <span>寄送完成</span>
        <span>地址</span>
        <span>Email</span>
        <span>關係</span>
        <span>電話</span>
        <span>備註</span>
      </div>
      ${rows.length ? rows.map(invitationRowHTML).join("") : empty("沒有符合條件的喜帖資料。")}
    </div>
    <div class="table-pagination invitation-summary" aria-label="喜帖寄送摘要">
      <span>共 ${rows.length} 筆 · 已寄送 ${statusCounts.sent} 筆 · 待寄送 ${statusCounts.ready} 筆 · 待補資料 ${statusCounts.missing} 筆 · 無喜帖 ${statusCounts.none} 筆</span>
    </div>
  `;
  bindGuestInlineEdits(els.invitationTable);
}

function invitationRowHTML(guest) {
  const status = invitationStatusFor(guest);
  const deliveryControl = guest.invitationType === "none"
    ? `<span class="invitation-status-badge none">不需寄送</span>`
    : `<select class="inline-field inline-select delivery-select ${invitationDeliveryMeta[guest.invitationDelivery]?.className || "unsent"}" data-guest-field="invitationDelivery" data-guest-id="${guest.id}" aria-label="編輯${escapeHTML(guest.name)}的寄送狀態">
        ${invitationDeliveryOptions(guest.invitationDelivery)}
      </select>`;
  return `
    <div class="table-row invitation-table" data-invitation-row="${guest.id}">
      <div data-label="姓名">
        <strong>${escapeHTML(guest.name)}</strong>
        <div class="muted">${escapeHTML(tableLabel(guest.tableId))}</div>
      </div>
      <span data-label="喜帖">
        <select class="inline-field inline-select invitation-select ${invitationMeta[guest.invitationType]?.className || "none"}" data-guest-field="invitationType" data-guest-id="${guest.id}" aria-label="編輯${escapeHTML(guest.name)}的喜帖">
          ${invitationOptions(guest.invitationType)}
        </select>
      </span>
      <span data-label="狀態"><span class="invitation-status-badge ${status.className}" title="${escapeHTML(status.hint)}">${status.label}</span></span>
      <span data-label="寄送">${deliveryControl}</span>
      <span data-label="地址"><input class="inline-field inline-address" data-guest-field="address" data-guest-id="${guest.id}" type="text" value="${escapeHTML(guest.address || "")}" placeholder="紙本地址" aria-label="編輯${escapeHTML(guest.name)}的地址" /></span>
      <span data-label="Email"><input class="inline-field inline-email" data-guest-field="email" data-guest-id="${guest.id}" type="email" value="${escapeHTML(guest.email || "")}" placeholder="email@example.com" aria-label="編輯${escapeHTML(guest.name)}的 email" /></span>
      <span data-label="關係"><span class="relation-badge ${guest.relation === "女方親友" ? "bride" : "groom"}">${escapeHTML(guest.relation)}</span></span>
      <span data-label="電話">${escapeHTML(guest.phone || "未填")}</span>
      <span data-label="備註"><input class="inline-field inline-note" data-guest-field="note" data-guest-id="${guest.id}" type="text" value="${escapeHTML(guest.note || "")}" placeholder="備註" aria-label="編輯${escapeHTML(guest.name)}的備註" /></span>
    </div>
  `;
}

function invitationTypeMatchesFilter(guest, filter) {
  if (filter === "has") return guest.invitationType !== "none";
  if (filter === "none") return guest.invitationType === "none";
  if (filter === "paper" || filter === "digital") return guest.invitationType === filter;
  return true;
}

function invitationStatusFor(guest) {
  const type = normalizeInvitationType(guest.invitationType);
  if (type === "none") return { key: "none", ...invitationStatusMeta.none };
  if (guest.invitationDelivery === "sent") return { key: "sent", ...invitationStatusMeta.sent };
  if (type === "paper" && !String(guest.address || "").trim()) return { key: "missing", ...invitationStatusMeta.missing };
  if (type === "digital" && !String(guest.email || "").trim()) return { key: "missing", ...invitationStatusMeta.missing };
  return { key: "ready", ...invitationStatusMeta.ready };
}

function countInvitationStatuses(guests) {
  return guests.reduce((counts, guest) => {
    const key = invitationStatusFor(guest).key;
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, { missing: 0, ready: 0, sent: 0, none: 0 });
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
    <div class="table-scroll" role="region" aria-label="禮金紀錄表格">
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
          <strong data-label="姓名">${escapeHTML(gift.name)}</strong>
          <span data-label="金額">${money(gift.amount)}</span>
          <span data-label="方式">${escapeHTML(gift.method)}</span>
          <span class="muted" data-label="日期">${escapeHTML(formatDate(gift.date))}</span>
          <span class="muted" data-label="備註">${escapeHTML(gift.note || "未填")}</span>
          <div class="row-actions" data-label="操作">
            <button class="icon-button" data-edit-gift="${gift.id}" type="button" aria-label="編輯">${icons.edit}</button>
            <button class="icon-button danger-icon" data-delete-gift="${gift.id}" type="button" aria-label="刪除${escapeHTML(gift.name)}的禮金紀錄" title="刪除">${icons.trash}</button>
          </div>
        </div>
      `).join("") : empty("目前沒有禮金紀錄。")}
    </div>
  `;

  els.giftTable.querySelectorAll("[data-edit-gift]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openGiftDialog(findGift(button.dataset.editGift));
    });
  });
  els.giftTable.querySelectorAll("[data-delete-gift]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const gift = findGift(button.dataset.deleteGift);
      if (gift) confirmDeleteGift(gift);
    });
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
      <article class="table-card table-card-clickable" data-view-table-card="${table.id}" role="button" tabindex="0" aria-label="查看${escapeHTML(tableDisplayName(table))}賓客明細">
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

  els.tableManager.querySelectorAll("[data-view-table-card]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      openTableGuestsDialog(findTable(card.dataset.viewTableCard));
    });
    card.addEventListener("keydown", (event) => {
      if (!["Enter", " "].includes(event.key)) return;
      if (event.target.closest("button")) return;
      event.preventDefault();
      openTableGuestsDialog(findTable(card.dataset.viewTableCard));
    });
  });
  els.tableManager.querySelectorAll("[data-edit-table-card]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openTableDialog(findTable(button.dataset.editTableCard));
    });
  });
  els.tableManager.querySelectorAll("[data-clear-table]").forEach((button) => {
    const table = findTable(button.dataset.clearTable);
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      confirmClearTable(table);
    });
  });
  els.tableManager.querySelectorAll("[data-delete-table]").forEach((button) => {
    const table = findTable(button.dataset.deleteTable);
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      confirmDeleteTable(table);
    });
  });
}

function openTableGuestsDialog(table) {
  if (!table) return;
  const guests = tableGuests(table.id);
  const occupancy = tableOccupancy(table.id);
  const available = table.capacity - occupancy;
  const specialCounts = tableSpecialCounts(table.id);
  const seatStatus = tableSeatStatus({ ...table, occupancy });
  els.tableGuestsDialogKicker.textContent = table.alias || "桌次賓客";
  els.tableGuestsDialogTitle.textContent = tableDisplayName(table);
  els.tableGuestsOverview.innerHTML = `
    <span class="table-status-badge ${seatStatus.className}">${seatStatus.icon}<span>${occupancy}/${table.capacity}</span></span>
    <span>${guests.length} 筆名單</span>
    <span>${available >= 0 ? `${available} 個空位` : `超過 ${Math.abs(available)} 位`}</span>
    ${specialCounts.vegetarianCount ? `<span class="special-pill vegetarian">素 ${specialCounts.vegetarianCount}</span>` : ""}
    ${specialCounts.childSeats ? `<span class="special-pill child">兒 ${specialCounts.childSeats}</span>` : ""}
  `;
  els.tableGuestsDetailList.innerHTML = guests.length
    ? guests.map(tableGuestDetailRow).join("")
    : empty("這桌目前沒有安排賓客。");
  els.tableGuestsDialog.showModal();
}

function closeTableGuestsDialog() {
  els.tableGuestsDialog.close();
}

function tableGuestDetailRow(guest) {
  const vegetarianCount = Number.parseInt(guest.vegetarianCount, 10) || 0;
  const childSeats = Number.parseInt(guest.childSeats, 10) || 0;
  const relationClass = guest.relation === "女方親友" ? "bride" : "groom";
  const relationShort = guest.relation.replace("親友", "");
  const chips = [
    `<span class="table-guest-pill relation ${relationClass}">${escapeHTML(relationShort)}</span>`,
    `<span class="table-guest-pill people">${partySize(guest)} 位</span>`,
    vegetarianCount ? `<span class="table-guest-pill vegetarian">素 ${vegetarianCount}</span>` : "",
    childSeats ? `<span class="table-guest-pill child">兒 ${childSeats}</span>` : "",
    guest.rsvp === "pending" ? `<span class="table-guest-pill pending">未回覆</span>` : "",
  ].filter(Boolean).join("");

  return `
    <article class="table-guest-detail-row">
      <strong>${escapeHTML(guest.name)}</strong>
      <div class="table-guest-pill-row">${chips}</div>
    </article>
  `;
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

function renderQuickGiftOptions() {
  els.quickGiftOptions.innerHTML = state.guests
    .slice()
    .sort((a, b) => tableSortValue(a.tableId).localeCompare(tableSortValue(b.tableId), "zh-Hant", { numeric: true }) || a.name.localeCompare(b.name, "zh-Hant"))
    .map((guest) => `<option value="${escapeHTML(guest.name)}" label="${escapeHTML([guest.phone || "未填電話", tableLabel(guest.tableId)].join(" · "))}"></option>`)
    .join("");
}

function submitQuickGift(event) {
  event.preventDefault();
  const rawName = els.quickGiftNameInput.value.trim();
  const amount = Math.max(0, Number.parseInt(els.quickGiftAmountInput.value, 10) || 0);
  const guest = resolveQuickGiftGuest(rawName);
  const payload = {
    guestId: guest?.id || "",
    name: guest?.name || rawName,
    amount,
    method: els.quickGiftMethodInput.value,
    note: els.quickGiftNoteInput.value.trim() || (guest ? tableLabel(guest.tableId) : ""),
    date: todayISO(),
  };

  if (!payload.name) {
    showToast("請輸入姓名或電話");
    els.quickGiftNameInput.focus();
    return;
  }
  if (!payload.amount) {
    showToast("請輸入禮金金額");
    els.quickGiftAmountInput.focus();
    return;
  }

  const duplicate = findDuplicateGift(payload);
  if (duplicate) {
    openConfirm({
      kicker: "重複提醒",
      title: `「${payload.name}」已有禮金紀錄`,
      message: `既有紀錄為 ${money(duplicate.amount)}（${duplicate.method}）。如果這是代包或第二筆，仍可新增。`,
      icon: icons.cash,
      actionLabel: "仍要新增",
      onConfirm: () => addQuickGiftRecord(payload),
    });
    return;
  }

  addQuickGiftRecord(payload);
}

function addQuickGiftRecord(payload) {
  state.gifts.unshift({ id: uid("gift"), ...payload, createdAt: nowISO(), updatedAt: nowISO() });
  saveState({ snapshotReason: "快速禮金登記" });
  renderAll();
  els.quickGiftNameInput.value = "";
  els.quickGiftAmountInput.value = "";
  els.quickGiftNoteInput.value = "";
  updateQuickGiftHint();
  els.quickGiftNameInput.focus();
  showToast(`已登記 ${payload.name} ${money(payload.amount)}`);
}

function resolveQuickGiftGuest(value) {
  const text = String(value || "").trim();
  if (!text) return null;
  const query = text.toLowerCase();
  return state.guests.find((guest) => guest.name === text || guest.phone === text)
    || state.guests.find((guest) => query.length >= 2 && guestHaystack(guest).includes(query))
    || null;
}

function findDuplicateGift(payload) {
  return state.gifts.find((gift) =>
    (payload.guestId && gift.guestId === payload.guestId) ||
    (!payload.guestId && gift.name === payload.name) ||
    (payload.guestId && gift.name === payload.name)
  );
}

function updateQuickGiftHint() {
  if (!els.quickGiftHint) return;
  const guest = resolveQuickGiftGuest(els.quickGiftNameInput.value);
  const amount = Number.parseInt(els.quickGiftAmountInput.value, 10) || 0;
  const duplicate = guest
    ? findDuplicateGift({ guestId: guest.id, name: guest.name })
    : findDuplicateGift({ guestId: "", name: els.quickGiftNameInput.value.trim() });

  els.quickGiftHint.classList.toggle("warning", Boolean(duplicate));
  if (duplicate) {
    els.quickGiftHint.textContent = `提醒：${guest?.name || duplicate.name} 已有 ${money(duplicate.amount)} 禮金紀錄。`;
    return;
  }
  if (guest) {
    els.quickGiftHint.textContent = `${guest.name} · ${tableLabel(guest.tableId)} · ${guest.phone || "未填電話"}${amount ? ` · 將登記 ${money(amount)}` : ""}`;
    return;
  }
  els.quickGiftHint.textContent = "輸入賓客姓名或電話後，會自動提示桌次與重複禮金。";
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
  root.querySelectorAll("[data-delete-guest]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const guest = findGuest(button.dataset.deleteGuest);
      if (guest) confirmDeleteGuest(guest);
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
  if (state.canvas.layoutLocked) {
    if (event.target.closest(".move-handle, .venue-grip") || venueId) showToast("桌位與場地物件已鎖定，先解除鎖定才能移動");
    return;
  }
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
    historyRecorded: false,
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
  if (!movingLayoutItem.historyRecorded) {
    recordLayoutHistory(movingLayoutItem.itemType === "table" ? "移動桌位" : "移動場地物件");
    movingLayoutItem.historyRecorded = true;
  }
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
  if ((guest.tableId || null) === (tableId || null)) return;
  recordLayoutHistory(table ? "安排賓客座位" : "移回待安排");
  const nextOccupancy = table ? tableOccupancy(tableId, guestId) + partySize(guest) : 0;
  guest.tableId = tableId || null;
  saveState();
  renderAll();
  showToast(table
    ? `已安排 ${guest.name} 到 ${tableLabel(tableId)}${nextOccupancy > table.capacity ? `（超過容量 ${nextOccupancy}/${table.capacity}）` : ""}`
    : `已將 ${guest.name} 移回待安排`);
}

function openSettingsDialog() {
  const wedding = { ...seedState.wedding, ...(state.wedding || {}) };
  els.settingsForm.reset();
  els.settingsForm.elements.label.value = wedding.label || "";
  els.settingsForm.elements.name.value = wedding.name || "";
  els.settingsForm.elements.date.value = wedding.date || "";
  els.settingsForm.elements.venue.value = wedding.venue || "";
  els.settingsForm.elements.avatar.value = wedding.avatar || "";
  els.settingsForm.elements.coupleName.value = wedding.coupleName || "";
  els.settingsDialog.showModal();
}

function closeSettingsDialog() {
  els.settingsDialog.close();
}

function saveSettingsFromForm(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(els.settingsForm));
  const coupleName = cleanText(data.coupleName) || seedState.wedding.coupleName;
  const { statusText: _statusText, ...currentWedding } = state.wedding || {};
  state.wedding = {
    ...currentWedding,
    label: cleanText(data.label) || seedState.wedding.label,
    name: cleanText(data.name) || seedState.wedding.name,
    date: cleanText(data.date) || seedState.wedding.date,
    venue: cleanText(data.venue) || seedState.wedding.venue,
    avatar: firstCharacters(cleanText(data.avatar), 2) || firstCharacters(coupleName, 1) || seedState.wedding.avatar,
    coupleName,
  };
  saveState({ snapshotReason: "更新基本資訊" });
  renderEventInfo();
  closeSettingsDialog();
  showToast("基本資訊已更新");
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
  const existingGuest = findGuest(formData.id);
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
  const nextTableId = payload.rsvp === "declined" ? null : payload.tableId;
  if (existingGuest && (existingGuest.tableId || null) !== (nextTableId || null)) {
    recordLayoutHistory("更新賓客座位");
  }

  if (formData.id) {
    state.guests = state.guests.map((guest) =>
      guest.id === formData.id ? { ...guest, ...payload, tableId: nextTableId, updatedAt: nowISO() } : guest
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

  recordLayoutHistory(data.id ? "編輯桌次" : "新增桌次");
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
      writeAutoSnapshot("刪除賓客前");
      state.guests = state.guests.filter((item) => item.id !== guest.id);
      saveState();
      if (els.guestDialog.open) closeGuestDialog();
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
      writeAutoSnapshot("刪除禮金前");
      state.gifts = state.gifts.filter((item) => item.id !== gift.id);
      saveState();
      if (els.giftDialog.open) closeGiftDialog();
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
      recordLayoutHistory("清空桌次");
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
      recordLayoutHistory("刪除桌次");
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
  recordLayoutHistory("重整桌位");
  autoArrangeTables();
  state.venueItems = structuredClone(seedState.venueItems);
  saveState();
  renderSeating();
  showToast("場地位置已重整");
}

function alignTablesHorizontally() {
  if (state.tables.length < 2) {
    showToast("需要至少 2 桌才能對齊");
    return;
  }

  const before = captureLayoutSignature();
  const beforeState = captureLayoutSnapshot();
  const tolerance = Math.round(TABLE_ROW_HEIGHT * 0.45);
  const rows = [];
  state.tables
    .slice()
    .sort((a, b) => a.y - b.y || a.x - b.x)
    .forEach((table) => {
      const row = rows.find((item) => Math.abs(item.y - table.y) <= tolerance);
      if (!row) {
        rows.push({ y: table.y, tables: [table] });
        return;
      }
      row.tables.push(table);
      row.y = Math.round(row.tables.reduce((sum, item) => sum + item.y, 0) / row.tables.length);
    });

  let changed = 0;
  rows.forEach((row) => {
    const sortedY = row.tables.map((table) => table.y).sort((a, b) => a - b);
    const alignedY = sortedY[Math.floor(sortedY.length / 2)];
    row.tables.forEach((table) => {
      if (table.y !== alignedY) {
        table.y = alignedY;
        changed += 1;
      }
    });
  });

  if (!changed || captureLayoutSignature() === before) {
    showToast("桌位已經水平對齊");
    return;
  }

  recordLayoutHistory("水平對齊桌位", beforeState);
  saveState();
  renderSeating();
  showToast(`已水平對齊 ${rows.length} 列桌位`);
}

function fillTablesToTarget(targetCount) {
  recordLayoutHistory(state.tables.length >= targetCount ? "重新排列桌位" : "補到 30 桌");
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
    writeAutoSnapshot("匯入名單前");
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
    ["李淑芬", "未回覆", "1", "女方親友", "1", "0", "電子", "已寄送", "", "shufen@example.com", "朋友", "0912-111-222", "", "", "本人加一位兒童，需兒童椅 1", "", "", ""],
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

function downloadFullBackup() {
  state.meta = { ...seedState.meta, ...(state.meta || {}), lastBackupAt: nowISO(), updatedAt: nowISO() };
  const backup = {
    app: "wedding-seat-planner",
    version: BACKUP_VERSION,
    exportedAt: state.meta.lastBackupAt,
    state: clonePlannerState(),
  };
  saveState({ snapshotReason: "手動備份" });
  downloadText(`wedding-planner-backup-${todayISO()}.json`, JSON.stringify(backup, null, 2), "application/json;charset=utf-8");
  showToast("完整資料備份已下載");
}

async function handleRestoreFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const nextState = extractBackupState(data);
    const summary = summarizeState(nextState);
    openConfirm({
      kicker: "還原備份",
      title: "用備份檔覆蓋目前資料？",
      message: `將還原 ${summary.guests} 筆賓客、${summary.tables} 桌、${summary.gifts} 筆禮金。還原前會先建立一筆自動快照。`,
      icon: icons.upload,
      actionLabel: "確認還原",
      onConfirm: () => restorePlannerState(nextState, "備份檔"),
    });
  } catch (error) {
    showToast(error.message || "備份檔無法讀取，請確認 JSON 格式");
  } finally {
    event.target.value = "";
  }
}

function extractBackupState(data) {
  const candidate = data?.state || data;
  if (!candidate || !Array.isArray(candidate.guests) || !Array.isArray(candidate.tables) || !Array.isArray(candidate.gifts)) {
    throw new Error("這不是有效的婚禮座位規劃備份檔");
  }
  return normalizeState(candidate);
}

function restorePlannerState(nextState, sourceLabel) {
  writeAutoSnapshot(`還原${sourceLabel}前`);
  state = normalizeState({
    ...nextState,
    meta: {
      ...(nextState.meta || {}),
      lastRestoredAt: nowISO(),
    },
  });
  layoutUndoStack = [];
  layoutRedoStack = [];
  saveState({ snapshotReason: `已還原${sourceLabel}` });
  renderAll();
  showToast(`已還原${sourceLabel}`);
}

function maybeCreateAutoSnapshot(reason) {
  const snapshots = loadAutoSnapshots();
  const last = snapshots[0];
  if (last && Date.now() - new Date(last.createdAt).getTime() < AUTO_SNAPSHOT_INTERVAL_MS) return;
  writeAutoSnapshot(reason);
}

function writeAutoSnapshot(reason) {
  const snapshot = {
    id: uid("snapshot"),
    reason,
    createdAt: nowISO(),
    state: clonePlannerState(),
  };
  const snapshots = [snapshot, ...loadAutoSnapshots()].slice(0, MAX_AUTO_SNAPSHOTS);
  localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(snapshots));
  renderBackupStatus();
}

function loadAutoSnapshots() {
  try {
    const snapshots = JSON.parse(localStorage.getItem(SNAPSHOT_KEY) || "[]");
    return Array.isArray(snapshots) ? snapshots.filter((item) => item?.state) : [];
  } catch {
    return [];
  }
}

function openSnapshotDialog() {
  renderSnapshotList();
  els.snapshotDialog.showModal();
}

function closeSnapshotDialog() {
  els.snapshotDialog.close();
}

function renderSnapshotList() {
  const snapshots = loadAutoSnapshots();
  els.snapshotList.innerHTML = snapshots.length
    ? snapshots.map((snapshot) => {
      const summary = summarizeState(snapshot.state);
      return `
        <article class="snapshot-item">
          <div>
            <strong>${escapeHTML(snapshot.reason || "自動快照")}</strong>
            <span>${escapeHTML(formatDateTime(snapshot.createdAt))} · ${summary.guests} 筆賓客 · ${summary.tables} 桌 · ${summary.gifts} 筆禮金</span>
          </div>
          <button class="mini-button" data-restore-snapshot="${snapshot.id}" type="button">${icons.refresh}<span>還原</span></button>
        </article>
      `;
    }).join("")
    : empty("目前還沒有自動快照。資料更新後會自動保留最近幾筆版本。");

  els.snapshotList.querySelectorAll("[data-restore-snapshot]").forEach((button) => {
    button.addEventListener("click", () => confirmRestoreSnapshot(button.dataset.restoreSnapshot));
  });
}

function confirmRestoreSnapshot(snapshotId) {
  const snapshot = loadAutoSnapshots().find((item) => item.id === snapshotId);
  if (!snapshot) return;
  openConfirm({
    kicker: "還原快照",
    title: `還原「${snapshot.reason || "自動快照"}」？`,
    message: `將回到 ${formatDateTime(snapshot.createdAt)} 的資料狀態，並先保留目前狀態為快照。`,
    icon: icons.refresh,
    actionLabel: "確認還原",
    onConfirm: () => {
      closeSnapshotDialog();
      restorePlannerState(normalizeState(snapshot.state), "快照");
    },
  });
}

function renderBackupStatus() {
  if (!els.backupStatus) return;
  const snapshots = loadAutoSnapshots();
  const lastBackup = state.meta?.lastBackupAt;
  const label = lastBackup ? `備份 ${formatDateTime(lastBackup)}` : "尚未備份";
  els.backupStatus.textContent = `${label} · 快照 ${snapshots.length}`;
}

function loadCloudSyncConfig() {
  try {
    return normalizeCloudSyncConfig(JSON.parse(localStorage.getItem(CLOUD_SYNC_CONFIG_KEY) || "{}"));
  } catch {
    return normalizeCloudSyncConfig({});
  }
}

function normalizeCloudSyncConfig(value) {
  return {
    url: String(value?.url || "").trim().replace(/\/+$/, ""),
    anonKey: String(value?.anonKey || "").trim(),
    syncKey: String(value?.syncKey || "").trim(),
    autoSync: Boolean(value?.autoSync),
    lastSyncedAt: value?.lastSyncedAt || "",
  };
}

function cloudSyncConfigured() {
  return Boolean(cloudSyncConfig.url && cloudSyncConfig.anonKey && cloudSyncConfig.syncKey);
}

function openCloudSyncDialog() {
  els.cloudSyncForm.elements.url.value = cloudSyncConfig.url;
  els.cloudSyncForm.elements.anonKey.value = cloudSyncConfig.anonKey;
  els.cloudSyncForm.elements.syncKey.value = cloudSyncConfig.syncKey;
  els.cloudSyncForm.elements.autoSync.checked = cloudSyncConfig.autoSync;
  renderCloudSyncStatus();
  els.cloudSyncDialog.showModal();
}

function closeCloudSyncDialog() {
  els.cloudSyncDialog.close();
}

function saveCloudSyncSettings(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(els.cloudSyncForm));
  cloudSyncConfig = normalizeCloudSyncConfig({
    url: data.url,
    anonKey: data.anonKey,
    syncKey: data.syncKey,
    autoSync: data.autoSync === "on",
    lastSyncedAt: cloudSyncConfig.lastSyncedAt,
  });
  localStorage.setItem(CLOUD_SYNC_CONFIG_KEY, JSON.stringify(cloudSyncConfig));
  renderCloudSyncStatus("同步設定已儲存");
  restartCloudSyncPolling();
  showToast(cloudSyncConfigured() ? "雲端同步設定已儲存" : "雲端同步尚未完整設定");
  if (cloudSyncConfigured() && cloudSyncConfig.autoSync) runCloudStartupSync();
}

function confirmClearCloudSyncSettings() {
  openConfirm({
    kicker: "清除雲端同步",
    title: "清除這台裝置的同步設定？",
    message: "這只會移除本機瀏覽器中的 Supabase 設定，不會刪除本機婚禮資料，也不會刪除雲端資料。",
    icon: icons.cloud,
    actionLabel: "確認清除",
    onConfirm: () => {
      cloudSyncConfig = normalizeCloudSyncConfig({});
      localStorage.removeItem(CLOUD_SYNC_CONFIG_KEY);
      restartCloudSyncPolling();
      renderCloudSyncStatus("已清除同步設定");
      closeCloudSyncDialog();
      showToast("已清除雲端同步設定");
    },
  });
}

function renderCloudSyncStatus(message = cloudSyncLastMessage) {
  if (!els.cloudSyncStatus) return;
  if (message) cloudSyncLastMessage = message;
  const configured = cloudSyncConfigured();
  const syncedText = cloudSyncConfig.lastSyncedAt ? ` · ${formatDateTime(cloudSyncConfig.lastSyncedAt)}` : "";
  els.cloudSyncStatus.textContent = configured
    ? `${cloudSyncConfig.autoSync ? "自動同步" : "手動同步"}${syncedText}`
    : "本機模式";
  els.cloudSyncStatus.classList.toggle("connected", configured);
  renderAccountStatus();
  if (els.cloudSyncMessage) {
    els.cloudSyncMessage.textContent = message || (configured
      ? `已設定同步代碼。${cloudSyncConfig.autoSync ? "自動同步已啟用。" : "目前為手動同步。"}`
      : "尚未設定雲端同步。");
  }
  els.pullCloudButton.disabled = !configured || cloudSyncBusy;
  els.pushCloudButton.disabled = !configured || cloudSyncBusy;
}

function startCloudSync() {
  renderCloudSyncStatus();
  restartCloudSyncPolling();
  if (cloudSyncConfigured() && cloudSyncConfig.autoSync) {
    window.setTimeout(() => runCloudStartupSync(), 500);
  }
}

function restartCloudSyncPolling() {
  window.clearInterval(cloudSyncPollTimer);
  cloudSyncPollTimer = null;
  if (cloudSyncConfigured() && cloudSyncConfig.autoSync) {
    cloudSyncPollTimer = window.setInterval(() => pullCloudState({ silent: true, onlyIfNewer: true }), CLOUD_SYNC_POLL_MS);
  }
}

function scheduleCloudPush() {
  if (!cloudSyncConfigured() || !cloudSyncConfig.autoSync) return;
  window.clearTimeout(cloudSyncTimer);
  cloudSyncTimer = window.setTimeout(() => pushCloudState({ silent: true }), CLOUD_SYNC_DEBOUNCE_MS);
}

async function runCloudStartupSync() {
  if (!cloudSyncConfigured() || cloudSyncBusy) return;
  try {
    const remote = await fetchCloudRecord();
    if (!remote) {
      await pushCloudState({ silent: true });
      return;
    }
    if (remoteIsNewer(remote.updated_at, remote.payload)) {
      applyCloudState(remote.payload, remote.updated_at, { silent: true });
      return;
    }
    await pushCloudState({ silent: true });
  } catch (error) {
    renderCloudSyncStatus(`雲端同步失敗：${error.message}`);
  }
}

async function pushCloudState(options = {}) {
  const { manual = false, silent = false } = options;
  if (!cloudSyncConfigured()) {
    if (!silent) showToast("請先完成雲端同步設定");
    return;
  }
  setCloudBusy(true, "正在上傳本機資料...");
  try {
    const syncedAt = nowISO();
    const payload = {
      sync_key: cloudSyncConfig.syncKey,
      payload: clonePlannerState(),
      updated_at: syncedAt,
    };
    const response = await fetch(`${cloudSyncConfig.url}/rest/v1/wedding_planner_sync?on_conflict=sync_key`, {
      method: "POST",
      headers: cloudHeaders({ prefer: "resolution=merge-duplicates,return=representation" }),
      body: JSON.stringify(payload),
    });
    await assertCloudResponse(response, "上傳雲端失敗");
    cloudSyncConfig.lastSyncedAt = syncedAt;
    localStorage.setItem(CLOUD_SYNC_CONFIG_KEY, JSON.stringify(cloudSyncConfig));
    renderCloudSyncStatus("本機資料已上傳雲端");
    if (manual && !silent) showToast("本機資料已上傳雲端");
  } catch (error) {
    renderCloudSyncStatus(`上傳失敗：${error.message}`);
    if (!silent) showToast(error.message || "上傳雲端失敗");
  } finally {
    setCloudBusy(false);
  }
}

async function pullCloudState(options = {}) {
  const { confirmBeforeApply = false, silent = false, onlyIfNewer = false } = options;
  if (!cloudSyncConfigured()) {
    if (!silent) showToast("請先完成雲端同步設定");
    return;
  }
  setCloudBusy(true, "正在讀取雲端資料...");
  try {
    const remote = await fetchCloudRecord();
    if (!remote) {
      renderCloudSyncStatus("雲端尚無資料，可先上傳本機資料");
      if (!silent) showToast("雲端尚無資料");
      return;
    }
    if (onlyIfNewer && !remoteIsNewer(remote.updated_at, remote.payload)) {
      renderCloudSyncStatus("雲端資料沒有更新");
      return;
    }
    if (confirmBeforeApply) {
      openConfirm({
        kicker: "下載雲端",
        title: "用雲端資料覆蓋本機？",
        message: `雲端資料更新於 ${formatDateTime(remote.updated_at)}。套用前會先建立本機快照。`,
        icon: icons.cloud,
        actionLabel: "確認下載",
        onConfirm: () => applyCloudState(remote.payload, remote.updated_at),
      });
      renderCloudSyncStatus("等待確認下載雲端資料");
      return;
    }
    applyCloudState(remote.payload, remote.updated_at, { silent });
  } catch (error) {
    renderCloudSyncStatus(`下載失敗：${error.message}`);
    if (!silent) showToast(error.message || "下載雲端失敗");
  } finally {
    setCloudBusy(false);
  }
}

async function fetchCloudRecord() {
  const key = encodeURIComponent(cloudSyncConfig.syncKey);
  const response = await fetch(`${cloudSyncConfig.url}/rest/v1/wedding_planner_sync?sync_key=eq.${key}&select=payload,updated_at&limit=1`, {
    headers: cloudHeaders(),
  });
  await assertCloudResponse(response, "讀取雲端失敗");
  const rows = await response.json();
  return Array.isArray(rows) && rows.length ? rows[0] : null;
}

function applyCloudState(payload, updatedAt, options = {}) {
  const { silent = false } = options;
  writeAutoSnapshot("套用雲端資料前");
  state = normalizeState(payload);
  cloudSyncConfig.lastSyncedAt = updatedAt || nowISO();
  localStorage.setItem(CLOUD_SYNC_CONFIG_KEY, JSON.stringify(cloudSyncConfig));
  layoutUndoStack = [];
  layoutRedoStack = [];
  saveState({ snapshotReason: "套用雲端資料", createSnapshot: false, skipCloudSync: true });
  renderAll();
  renderCloudSyncStatus("已套用雲端資料");
  if (!silent) showToast("已套用雲端資料");
}

function remoteIsNewer(updatedAt, payload) {
  const remoteTime = new Date(updatedAt || payload?.meta?.updatedAt || 0).getTime();
  const localTime = new Date(state.meta?.updatedAt || 0).getTime();
  return Number.isFinite(remoteTime) && remoteTime > localTime + 1000;
}

function cloudHeaders(options = {}) {
  const headers = {
    apikey: cloudSyncConfig.anonKey,
    Authorization: `Bearer ${cloudSyncConfig.anonKey}`,
    "Content-Type": "application/json",
    "x-sync-key": cloudSyncConfig.syncKey,
  };
  if (options.prefer) headers.Prefer = options.prefer;
  return headers;
}

async function assertCloudResponse(response, fallbackMessage) {
  if (response.ok) return;
  let detail = "";
  try {
    const data = await response.json();
    detail = data.message || data.error || "";
  } catch {
    detail = await response.text().catch(() => "");
  }
  throw new Error(`${fallbackMessage}${detail ? `：${detail}` : ""}`);
}

function setCloudBusy(busy, message = "") {
  cloudSyncBusy = busy;
  renderCloudSyncStatus(message || cloudSyncLastMessage);
}

function summarizeState(value) {
  return {
    guests: Array.isArray(value?.guests) ? value.guests.length : 0,
    tables: Array.isArray(value?.tables) ? value.tables.length : 0,
    gifts: Array.isArray(value?.gifts) ? value.gifts.length : 0,
  };
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
    meta: { ...seedState.meta, ...(value.meta || {}) },
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

function saveState(options = {}) {
  const { snapshotReason = "自動保存", createSnapshot = true, skipCloudSync = false } = options;
  state.meta = { ...seedState.meta, ...(state.meta || {}), updatedAt: nowISO() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (createSnapshot) maybeCreateAutoSnapshot(snapshotReason);
  markSaved(true);
  renderAccountStatus();
  renderBackupStatus();
  syncLayoutSafetyControls();
  if (!skipCloudSync) scheduleCloudPush();
}

function markSaved(saved) {
  els.layoutSavedLabel.textContent = saved ? "已保存" : "編輯中";
}

function clonePlannerState() {
  return structuredClone(state);
}

function captureLayoutSnapshot(source = state) {
  return {
    tables: source.tables.map((table) => ({
      id: table.id,
      number: table.number,
      alias: table.alias,
      name: table.name,
      capacity: table.capacity,
      kind: table.kind,
      x: table.x,
      y: table.y,
    })),
    venueItems: source.venueItems.map((item) => ({
      id: item.id,
      label: item.label,
      icon: item.icon,
      width: item.width,
      height: item.height,
      x: item.x,
      y: item.y,
    })),
    guestAssignments: source.guests.map((guest) => ({
      id: guest.id,
      tableId: guest.tableId || null,
    })),
  };
}

function captureLayoutSignature() {
  return JSON.stringify(captureLayoutSnapshot());
}

function recordLayoutHistory(label, snapshot = captureLayoutSnapshot()) {
  if (isRestoringHistory) return;
  layoutUndoStack.push({ label, at: nowISO(), layout: snapshot });
  if (layoutUndoStack.length > LAYOUT_HISTORY_LIMIT) layoutUndoStack.shift();
  layoutRedoStack = [];
  syncLayoutSafetyControls();
}

function undoLayoutChange() {
  restoreLayoutHistory(layoutUndoStack, layoutRedoStack, "已復原");
}

function redoLayoutChange() {
  restoreLayoutHistory(layoutRedoStack, layoutUndoStack, "已重做");
}

function restoreLayoutHistory(sourceStack, targetStack, messagePrefix) {
  const entry = sourceStack.pop();
  if (!entry) return;
  targetStack.push({ label: entry.label, at: nowISO(), layout: captureLayoutSnapshot() });
  isRestoringHistory = true;
  applyLayoutSnapshot(entry.layout);
  saveState({ createSnapshot: false });
  isRestoringHistory = false;
  renderAll();
  showToast(`${messagePrefix}：${entry.label}`);
}

function applyLayoutSnapshot(layout) {
  if (!layout) return;
  const currentLock = Boolean(state.canvas.layoutLocked);
  state.tables = Array.isArray(layout.tables) ? layout.tables.map((table) => ({ ...table })) : state.tables;
  state.venueItems = Array.isArray(layout.venueItems) ? layout.venueItems.map((item) => ({ ...item })) : state.venueItems;
  const assignmentMap = new Map((layout.guestAssignments || []).map((item) => [item.id, item.tableId || null]));
  const tableIds = new Set(state.tables.map((table) => table.id));
  state.guests = state.guests.map((guest) => {
    if (!assignmentMap.has(guest.id)) {
      return tableIds.has(guest.tableId) ? guest : { ...guest, tableId: null };
    }
    const tableId = assignmentMap.get(guest.id);
    return { ...guest, tableId: tableId && tableIds.has(tableId) ? tableId : null };
  });
  state.canvas.layoutLocked = currentLock;
}

function setLayoutLock(locked) {
  state.canvas.layoutLocked = Boolean(locked);
  saveState({ createSnapshot: false });
  renderSeating();
  showToast(locked ? "桌位與場地物件已鎖定" : "已解除桌位鎖定");
}

function syncLayoutSafetyControls() {
  if (!els.lockLayoutButton) return;
  const locked = Boolean(state.canvas.layoutLocked);
  const icon = els.lockLayoutButton.querySelector("[data-icon]");
  const label = els.lockLayoutButton.querySelector("span:last-child");
  if (icon) icon.innerHTML = locked ? icons.unlock : icons.lock;
  if (label) label.textContent = locked ? "解除鎖定" : "鎖定桌位";
  els.lockLayoutButton.classList.toggle("active-lock", locked);
  els.lockLayoutButton.title = locked ? "解除桌位與場地物件位置鎖定" : "鎖定桌位與場地物件位置";
  els.undoLayoutButton.disabled = layoutUndoStack.length === 0;
  els.redoLayoutButton.disabled = layoutRedoStack.length === 0;
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
  return tableGuests(tableId)
    .filter((guest) => guest.id !== exceptGuestId)
    .reduce((sum, guest) => sum + partySize(guest), 0);
}

function tableGuests(tableId) {
  return state.guests
    .filter((guest) => guest.tableId === tableId && guest.rsvp !== "declined")
    .sort((a, b) => rsvpSort(a) - rsvpSort(b) || a.name.localeCompare(b.name, "zh-Hant"));
}

function partySize(guest) {
  return 1 + Math.max(0, Number.parseInt(guest.companions, 10) || 0);
}

function tableSpecialCounts(tableId) {
  return tableGuests(tableId)
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
  const invitationStatus = invitationStatusFor(guest).label;
  return `${guest.name} ${guest.phone} ${guest.relation} ${guest.group} ${guest.note} ${tableLabel(guest.tableId)} ${rsvpMeta[guest.rsvp].label} ${guest.childSeats || 0} ${guest.vegetarianCount || 0} ${invitationLabel} ${deliveryLabel} ${invitationStatus} ${guest.address || ""} ${guest.email || ""}`.toLowerCase();
}

function invitationHaystack(guest) {
  const invitationLabel = invitationMeta[guest.invitationType]?.label || "無";
  const deliveryLabel = invitationDeliveryMeta[guest.invitationDelivery]?.label || "未寄送";
  const invitationStatus = invitationStatusFor(guest).label;
  return `${guest.name} ${guest.phone} ${guest.relation} ${guest.group} ${guest.note} ${tableLabel(guest.tableId)} ${invitationLabel} ${deliveryLabel} ${invitationStatus} ${guest.address || ""} ${guest.email || ""}`.toLowerCase();
}

function invitationSortValue(guest) {
  const statusRank = { missing: "0", ready: "1", sent: "2", none: "3" }[invitationStatusFor(guest).key] || "4";
  const typeRank = { paper: "0", digital: "1", none: "2" }[guest.invitationType] || "2";
  const deliveryRank = guest.invitationDelivery === "sent" ? "1" : "0";
  return `${statusRank}-${deliveryRank}-${typeRank}-${tableSortValue(guest.tableId)}`;
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

function formatDateTime(value) {
  if (!value) return "尚未建立";
  return new Intl.DateTimeFormat("zh-Hant-TW", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
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

function cleanText(value = "") {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function firstCharacters(value = "", count = 1) {
  return Array.from(String(value || "").trim()).slice(0, count).join("");
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
