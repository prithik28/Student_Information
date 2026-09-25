/* ===========================================================
   GRTIET · Student Information System
   Vanilla JS application — mock data, auth, routing, widgets
   =========================================================== */

(() => {
  "use strict";

  /* ---------------------------------------------------------
     1. MOCK DATA
  --------------------------------------------------------- */

  const CURRENT_STUDENT = {
    id: "GRT001",
    name: "Aravind Kumaresan",
    regNo: "927622104001",
    department: "Computer Science & Engineering",
    deptShort: "CSE",
    year: "3rd Year",
    semester: "Semester 5",
    section: "A",
    email: "aravind.k@grtiet.edu.in",
    phone: "+91 98765 43210",
    dob: "14 Mar 2005",
    address: "12, Kamaraj Nagar, Tiruttani, Tamil Nadu - 631209",
    bloodGroup: "O+",
    advisor: "Dr. R. Meenakshi",
    cgpa: 8.74,
    admissionYear: 2022,
    avatarInitials: "AK",
  };

  const SUBJECTS = [
    { code: "CS501", name: "Java Programming", faculty: "Dr. S. Priyanka" },
    { code: "CS502", name: "Data Structures", faculty: "Prof. K. Elangovan" },
    { code: "CS503", name: "Database Management Systems", faculty: "Dr. M. Vasanthi" },
    { code: "CS504", name: "Computer Networks", faculty: "Prof. T. Suresh Babu" },
    { code: "CS505", name: "Operating Systems", faculty: "Dr. A. Kalaiselvi" },
    { code: "CS506", name: "Web Technology", faculty: "Prof. N. Dinesh Kumar" },
  ];

  const ATTENDANCE = [
    { code: "CS501", total: 52, present: 49 },
    { code: "CS502", total: 50, present: 44 },
    { code: "CS503", total: 48, present: 45 },
    { code: "CS504", total: 46, present: 38 },
    { code: "CS505", total: 54, present: 50 },
    { code: "CS506", total: 44, present: 41 },
  ].map((r) => ({
    ...r,
    absent: r.total - r.present,
    pct: Math.round((r.present / r.total) * 1000) / 10,
  }));

  const MARKS = [
    { code: "CS501", internal: 18, assignment: 9, model: 42, semester: 78 },
    { code: "CS502", internal: 19, assignment: 10, model: 45, semester: 82 },
    { code: "CS503", internal: 17, assignment: 8, model: 39, semester: 74 },
    { code: "CS504", internal: 16, assignment: 9, model: 37, semester: 70 },
    { code: "CS505", internal: 19, assignment: 10, model: 44, semester: 80 },
    { code: "CS506", internal: 18, assignment: 9, model: 41, semester: 76 },
  ].map((r) => {
    const total = r.internal + r.assignment + r.model + r.semester;
    const pct = Math.round((total / 200) * 1000) / 10;
    let grade = "F";
    if (pct >= 90) grade = "O";
    else if (pct >= 80) grade = "A+";
    else if (pct >= 70) grade = "A";
    else if (pct >= 60) grade = "B+";
    else if (pct >= 50) grade = "B";
    else if (pct >= 40) grade = "C";
    return { ...r, total, pct, grade };
  });

  const PERIOD_TIMES = [
    "9:00 – 9:50", "9:50 – 10:40", "10:55 – 11:45", "11:45 – 12:35",
    "1:20 – 2:10", "2:10 – 3:00", "3:15 – 4:05",
  ];

  const ROOMS = ["CS-101", "CS-102", "CS-Lab 1", "CS-Lab 2", "CS-201", "Seminar Hall"];

  const TIMETABLE = {
    Monday: ["CS501", "CS502", "CS503", "BREAK", "CS504", "CS505", "CS506"],
    Tuesday: ["CS502", "CS501", "CS504", "BREAK", "CS503", "CS506", "CS505"],
    Wednesday: ["CS503", "CS503", "CS501", "BREAK", "CS502", "CS504", "LIB"],
    Thursday: ["CS505", "CS506", "CS502", "BREAK", "CS501", "CS503", "CS504"],
    Friday: ["CS504", "CS504", "CS505", "BREAK", "CS506", "CS502", "CS501"],
    Saturday: ["CS506", "CS505", "CS503", "BREAK", "CS502", "MENT", "—"],
  };

  function subjectByCode(code) {
    return SUBJECTS.find((s) => s.code === code);
  }

  const ASSIGNMENTS_SEED = [
    { id: "A1", code: "CS501", title: "Multithreading Mini Project", due: "2026-09-10", status: "Pending" },
    { id: "A2", code: "CS502", title: "AVL Tree Implementation", due: "2026-09-08", status: "Pending" },
    { id: "A3", code: "CS503", title: "ER Diagram — Hospital System", due: "2026-08-30", status: "Submitted" },
    { id: "A4", code: "CS504", title: "Subnetting Worksheet", due: "2026-08-25", status: "Overdue" },
    { id: "A5", code: "CS505", title: "CPU Scheduling Simulator", due: "2026-09-14", status: "Pending" },
    { id: "A6", code: "CS506", title: "Responsive Portfolio Page", due: "2026-09-05", status: "Submitted" },
    { id: "A7", code: "CS501", title: "Exception Handling Case Study", due: "2026-08-20", status: "Submitted" },
    { id: "A8", code: "CS504", title: "TCP vs UDP Report", due: "2026-09-18", status: "Pending" },
  ];

  const EXAMS = [
    { id: "E1", code: "CS501", type: "Model Exam II", date: "2026-09-15", time: "10:00 AM", room: "Block C - 204", status: "Upcoming" },
    { id: "E2", code: "CS504", type: "Model Exam II", date: "2026-09-17", time: "10:00 AM", room: "Block C - 205", status: "Upcoming" },
    { id: "E3", code: "CS502", type: "Semester Exam", date: "2026-11-24", time: "10:00 AM", room: "Main Hall", status: "Upcoming" },
    { id: "E4", code: "CS503", type: "Model Exam I", date: "2026-07-18", time: "10:00 AM", room: "Block C - 204", status: "Completed" },
    { id: "E5", code: "CS505", type: "Model Exam I", date: "2026-07-16", time: "2:00 PM", room: "Block C - 108", status: "Completed" },
    { id: "E6", code: "CS506", type: "Model Exam I", date: "2026-07-14", time: "10:00 AM", room: "Block C - 108", status: "Completed" },
  ];

  const ANNOUNCEMENTS = [
    {
      id: "N1", category: "Examinations", priority: "High",
      title: "Model Exam II schedule released",
      body: "Model Examination II for all 3rd year branches will commence from 15 September 2026. Hall tickets will be available on the portal from 10 September.",
      date: "2026-09-04",
    },
    {
      id: "N2", category: "Assessment", priority: "High",
      title: "Internal Assessment II marks entry",
      body: "Faculty advisors will upload Internal Assessment II marks by 12 September 2026. Students may raise discrepancies within 3 working days of publication.",
      date: "2026-09-02",
    },
    {
      id: "N3", category: "Seminar", priority: "Medium",
      title: "Department seminar on Cloud Computing",
      body: "The CSE department is organising a seminar on 'Cloud-Native Architectures' by industry experts from Zoho Corporation on 12 September 2026 at the Seminar Hall.",
      date: "2026-08-30",
    },
    {
      id: "N4", category: "Assignment", priority: "Medium",
      title: "Reminder: Data Structures assignment due",
      body: "The AVL Tree Implementation assignment for CS502 is due on 8 September 2026. Late submissions will attract a 10% penalty per day.",
      date: "2026-08-29",
    },
    {
      id: "N5", category: "Events", priority: "Low",
      title: "Techvantage 2026 — registrations open",
      body: "Registrations are now open for GRTIET's annual technical symposium Techvantage 2026, featuring coding contests, robotics and paper presentations.",
      date: "2026-08-26",
    },
    {
      id: "N6", category: "Examinations", priority: "Medium",
      title: "Semester Exam fee payment deadline",
      body: "Students must complete semester examination fee payment through the accounts portal on or before 30 September 2026 to avoid a late fee.",
      date: "2026-08-22",
    },
  ];

  const DEPARTMENTS = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"];
  const FIRST_NAMES = ["Aravind", "Divya", "Karthik", "Meena", "Suriya", "Priya", "Ganesh", "Lakshmi", "Vignesh", "Anitha", "Bharath", "Kavya", "Manoj", "Sowmya", "Ramesh", "Deepika", "Arun", "Nithya"];
  const LAST_NAMES = ["Kumaresan", "Sundaram", "Raghavan", "Krishnan", "Balakrishnan", "Elangovan", "Muthu", "Chandran", "Venkatesan", "Rajendran"];

  function seededRandom(seed) {
    let s = seed;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }

  function buildStudents(count) {
    const rand = seededRandom(42);
    const list = [];
    for (let i = 0; i < count; i++) {
      const first = FIRST_NAMES[i % FIRST_NAMES.length];
      const last = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];
      const dept = DEPARTMENTS[Math.floor(rand() * DEPARTMENTS.length)];
      const year = ["1st Year", "2nd Year", "3rd Year", "4th Year"][Math.floor(rand() * 4)];
      const section = rand() > 0.5 ? "A" : "B";
      const cgpa = Math.round((6.5 + rand() * 3.4) * 100) / 100;
      const attendance = Math.round(65 + rand() * 33);
      const status = attendance < 75 ? "At Risk" : "Active";
      const reg = `92762210${String(4000 + i).slice(-4)}`;
      list.push({
        id: `S${100 + i}`,
        name: `${first} ${last}`,
        regNo: reg,
        department: dept,
        year,
        section,
        cgpa,
        attendance,
        status,
        initials: (first[0] + last[0]).toUpperCase(),
        email: `${first.toLowerCase()}.${last.toLowerCase()}@grtiet.edu.in`,
        phone: `+91 9${Math.floor(100000000 + rand() * 899999999)}`,
      });
    }
    // Ensure current student is present at top
    list.unshift({
      id: CURRENT_STUDENT.id,
      name: CURRENT_STUDENT.name,
      regNo: CURRENT_STUDENT.regNo,
      department: "CSE",
      year: CURRENT_STUDENT.year,
      section: CURRENT_STUDENT.section,
      cgpa: CURRENT_STUDENT.cgpa,
      attendance: 91,
      status: "Active",
      initials: CURRENT_STUDENT.avatarInitials,
      email: CURRENT_STUDENT.email,
      phone: CURRENT_STUDENT.phone,
    });
    return list;
  }

  const STUDENTS = buildStudents(19); // 20 total incl. current student

  /* ---------------------------------------------------------
     2. STORAGE HELPERS
  --------------------------------------------------------- */

  const STORE = {
    auth: "grtiet_auth",
    settings: "grtiet_settings",
    profile: "grtiet_profile_overrides",
    assignments: "grtiet_assignment_status",
    remember: "grtiet_remember_regno",
  };

  const DEFAULT_SETTINGS = {
    theme: "light",
    notifications: true,
    animations: true,
    compactSidebar: false,
  };

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }
  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getSettings() {
    return { ...DEFAULT_SETTINGS, ...readJSON(STORE.settings, {}) };
  }
  function saveSettings(settings) {
    writeJSON(STORE.settings, settings);
  }
  function getProfileOverrides() {
    return readJSON(STORE.profile, {});
  }
  function saveProfileOverrides(data) {
    writeJSON(STORE.profile, data);
  }
  function getAssignmentStatus() {
    return readJSON(STORE.assignments, {});
  }
  function saveAssignmentStatus(map) {
    writeJSON(STORE.assignments, map);
  }

  /* ---------------------------------------------------------
     3. UTILITIES
  --------------------------------------------------------- */

  function $(sel, ctx = document) { return ctx.querySelector(sel); }
  function $all(sel, ctx = document) { return Array.from(ctx.querySelectorAll(sel)); }

  function formatDate(dateStr, opts = { day: "numeric", month: "short", year: "numeric" }) {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-IN", opts);
  }

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function animateCounter(el, target, { duration = 1200, decimals = 0, suffix = "" } = {}) {
    if (!getSettings().animations) {
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }
    const start = performance.now();
    const from = 0;
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = from + (target - from) * eased;
      el.textContent = val.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function toast(message, type = "success", timeout = 3600) {
    const wrap = $("#toastContainer");
    if (!wrap) return;
    const el = document.createElement("div");
    el.className = `toast toast--${type}`;
    const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";
    el.innerHTML = `<span class="toast__icon">${icon}</span><span class="toast__msg">${message}</span>`;
    wrap.appendChild(el);
    requestAnimationFrame(() => el.classList.add("is-visible"));
    setTimeout(() => {
      el.classList.remove("is-visible");
      setTimeout(() => el.remove(), 350);
    }, timeout);
  }

  /* ---------------------------------------------------------
     4. AUTH / LOGIN
  --------------------------------------------------------- */

  const DEMO_CREDENTIALS = { regNo: "927622104001", password: "grtiet@123" };

  function initLogin() {
    const form = $("#loginForm");
    const regInput = $("#regNo");
    const passInput = $("#password");
    const toggleBtn = $("#togglePassword");
    const rememberBox = $("#rememberMe");
    const errorBox = $("#loginError");
    const demoBtn = $("#fillDemoBtn");
    const forgotLink = $("#forgotPasswordLink");
    const forgotModal = $("#forgotModal");

    const remembered = localStorage.getItem(STORE.remember);
    if (remembered) {
      regInput.value = remembered;
      rememberBox.checked = true;
    }

    toggleBtn.addEventListener("click", () => {
      const isPass = passInput.type === "password";
      passInput.type = isPass ? "text" : "password";
      toggleBtn.classList.toggle("is-visible-state", isPass);
      toggleBtn.setAttribute("aria-label", isPass ? "Hide password" : "Show password");
    });

    demoBtn.addEventListener("click", () => {
      regInput.value = DEMO_CREDENTIALS.regNo;
      passInput.value = DEMO_CREDENTIALS.password;
      errorBox.hidden = true;
    });

    forgotLink.addEventListener("click", (e) => {
      e.preventDefault();
      forgotModal.classList.add("is-open");
    });
    $all("[data-close-modal]", forgotModal).forEach((btn) =>
      btn.addEventListener("click", () => forgotModal.classList.remove("is-open"))
    );

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const reg = regInput.value.trim();
      const pass = passInput.value;
      const submitBtn = $("#loginSubmit");
      submitBtn.classList.add("is-loading");
      submitBtn.disabled = true;

      setTimeout(() => {
        const ok = reg === DEMO_CREDENTIALS.regNo && pass === DEMO_CREDENTIALS.password;
        submitBtn.classList.remove("is-loading");
        submitBtn.disabled = false;

        if (!ok) {
          errorBox.hidden = false;
          $("#loginCard").classList.remove("shake");
          void $("#loginCard").offsetWidth;
          $("#loginCard").classList.add("shake");
          return;
        }

        errorBox.hidden = true;
        if (rememberBox.checked) {
          localStorage.setItem(STORE.remember, reg);
        } else {
          localStorage.removeItem(STORE.remember);
        }
        writeJSON(STORE.auth, { loggedIn: true, at: Date.now() });
        enterApp();
      }, 650);
    });
  }

  function enterApp() {
    const loginScreen = $("#loginScreen");
    const appScreen = $("#appScreen");
    loginScreen.classList.add("is-leaving");
    setTimeout(() => {
      loginScreen.hidden = true;
      appScreen.hidden = false;
      requestAnimationFrame(() => appScreen.classList.add("is-active"));
      initApp();
    }, 480);
  }

  function logout() {
    localStorage.removeItem(STORE.auth);
    location.reload();
  }

  /* ---------------------------------------------------------
     5. APP SHELL — NAVIGATION
  --------------------------------------------------------- */

  const PAGE_TITLES = {
    dashboard: "Dashboard",
    profile: "My Profile",
    attendance: "Attendance",
    marks: "Marks",
    timetable: "Timetable",
    assignments: "Assignments",
    examinations: "Examinations",
    announcements: "Announcements",
    students: "Students",
    settings: "Settings",
  };

  function initApp() {
    populateIdentity();
    initSidebarNav();
    initTopbar();
    initSettingsControls();
    applySettings(getSettings());
    renderDashboard();
    renderProfile();
    renderAttendance();
    renderMarks();
    renderTimetable();
    renderAssignments();
    renderExaminations();
    renderAnnouncements();
    renderStudents();
    goToPage("dashboard");
  }

  function populateIdentity() {
    const overrides = getProfileOverrides();
    const student = { ...CURRENT_STUDENT, ...overrides };
    $all("[data-bind='studentName']").forEach((el) => (el.textContent = student.name));
    $all("[data-bind='regNo']").forEach((el) => (el.textContent = student.regNo));
    $all("[data-bind='initials']").forEach((el) => (el.textContent = CURRENT_STUDENT.avatarInitials));
    const dateEl = $("#currentDate");
    if (dateEl) {
      dateEl.textContent = new Date().toLocaleDateString("en-IN", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      });
    }
  }

  function initSidebarNav() {
    const links = $all(".sidenav__link");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        if (page === "logout") {
          logout();
          return;
        }
        goToPage(page);
        closeMobileSidebar();
      });
    });

    $("#hamburgerBtn").addEventListener("click", toggleMobileSidebar);
    $("#sidebarOverlay").addEventListener("click", closeMobileSidebar);

    $("#collapseBtn").addEventListener("click", () => {
      document.body.classList.toggle("sidebar-collapsed");
    });
  }

  function toggleMobileSidebar() {
    document.body.classList.toggle("sidebar-mobile-open");
  }
  function closeMobileSidebar() {
    document.body.classList.remove("sidebar-mobile-open");
  }

  function goToPage(page) {
    $all(".page").forEach((p) => p.classList.remove("is-active"));
    const target = $(`#page-${page}`);
    if (target) {
      target.classList.add("is-active");
      target.scrollTop = 0;
    }
    $all(".sidenav__link").forEach((l) => l.classList.toggle("is-active", l.dataset.page === page));
    $("#pageTitle").textContent = PAGE_TITLES[page] || "Dashboard";
    $("#mainContent").scrollTo({ top: 0, behavior: "smooth" });
  }

  function initTopbar() {
    const searchInput = $("#globalSearch");
    const searchResults = $("#searchResults");

    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) { searchResults.hidden = true; searchResults.innerHTML = ""; return; }
      const matches = STUDENTS.filter((s) =>
        s.name.toLowerCase().includes(q) || s.regNo.includes(q)
      ).slice(0, 6);
      const subjMatches = SUBJECTS.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 3);

      if (!matches.length && !subjMatches.length) {
        searchResults.innerHTML = `<div class="search-results__empty">No results for "${escapeHTML(searchInput.value)}"</div>`;
      } else {
        searchResults.innerHTML = [
          ...matches.map((s) => `<button class="search-results__item" data-goto="students" data-reg="${s.regNo}">
              <span class="search-results__avatar">${s.initials}</span>
              <span><strong>${s.name}</strong><br><small>${s.regNo} · ${s.department}</small></span>
            </button>`),
          ...subjMatches.map((s) => `<button class="search-results__item" data-goto="marks">
              <span class="search-results__avatar search-results__avatar--alt">📘</span>
              <span><strong>${s.name}</strong><br><small>${s.faculty}</small></span>
            </button>`),
        ].join("");
      }
      searchResults.hidden = false;
    });

    document.addEventListener("click", (e) => {
      if (!searchResults.contains(e.target) && e.target !== searchInput) {
        searchResults.hidden = true;
      }
    });

    searchResults.addEventListener("click", (e) => {
      const item = e.target.closest("[data-goto]");
      if (!item) return;
      goToPage(item.dataset.goto);
      searchInput.value = "";
      searchResults.hidden = true;
      if (item.dataset.reg) {
        setTimeout(() => openStudentModal(item.dataset.reg), 250);
      }
    });

    // Notifications dropdown
    const notifBtn = $("#notifBtn");
    const notifPanel = $("#notifPanel");
    notifBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      notifPanel.classList.toggle("is-open");
      $("#profilePanel").classList.remove("is-open");
    });
    renderNotifPanel();

    // Profile dropdown
    const profileBtn = $("#profileBtn");
    const profilePanel = $("#profilePanel");
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      profilePanel.classList.toggle("is-open");
      notifPanel.classList.remove("is-open");
    });

    document.addEventListener("click", () => {
      notifPanel.classList.remove("is-open");
      profilePanel.classList.remove("is-open");
    });

    $all("[data-panel-goto]").forEach((btn) =>
      btn.addEventListener("click", () => {
        goToPage(btn.dataset.panelGoto);
        notifPanel.classList.remove("is-open");
        profilePanel.classList.remove("is-open");
      })
    );

    $("#panelLogoutBtn").addEventListener("click", logout);
  }

  function renderNotifPanel() {
    const list = $("#notifList");
    const items = ANNOUNCEMENTS.slice(0, 4);
    list.innerHTML = items.map((a) => `
      <div class="notif-item">
        <span class="notif-item__dot notif-item__dot--${a.priority.toLowerCase()}"></span>
        <div>
          <p class="notif-item__title">${a.title}</p>
          <p class="notif-item__meta">${formatDate(a.date)}</p>
        </div>
      </div>
    `).join("");
    $("#notifCount").textContent = items.length;
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* ---------------------------------------------------------
     6. DASHBOARD
  --------------------------------------------------------- */

  function renderDashboard() {
    const overallAttendance = Math.round(
      (ATTENDANCE.reduce((a, r) => a + r.present, 0) / ATTENDANCE.reduce((a, r) => a + r.total, 0)) * 1000
    ) / 10;
    const pendingAssignments = getMergedAssignments().filter((a) => a.status === "Pending" || a.status === "Overdue").length;
    const upcomingExams = EXAMS.filter((e) => e.status === "Upcoming").length;

    animateCounter($("#statTotalStudents"), STUDENTS.length, { decimals: 0 });
    animateCounter($("#statAttendance"), overallAttendance, { decimals: 1, suffix: "%" });
    animateCounter($("#statCgpa"), CURRENT_STUDENT.cgpa, { decimals: 2 });
    animateCounter($("#statPending"), pendingAssignments, { decimals: 0 });
    animateCounter($("#statExams"), upcomingExams, { decimals: 0 });

    drawCircularProgress($("#dashAttendanceRing"), overallAttendance);
    $("#dashAttendanceLabel").textContent = overallAttendance + "%";

    renderPerformanceChart();
    renderSubjectMarksMini();
    renderTodayTimetable();
  }

  function drawCircularProgress(svg, pct, { radius = 54 } = {}) {
    if (!svg) return;
    const circumference = 2 * Math.PI * radius;
    const circle = svg.querySelector(".ring-progress");
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    requestAnimationFrame(() => {
      const offset = circumference - (pct / 100) * circumference;
      circle.style.transition = getSettings().animations ? "stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)" : "none";
      circle.style.strokeDashoffset = offset;
    });
  }

  function renderPerformanceChart() {
    const container = $("#performanceChart");
    if (!container) return;
    const maxTotal = 200;
    container.innerHTML = MARKS.map((m) => {
      const subj = subjectByCode(m.code);
      const h = Math.round((m.total / maxTotal) * 100);
      return `
        <div class="bar-chart__col">
          <div class="bar-chart__track">
            <div class="bar-chart__fill" style="--target-h:${h}%" data-grade="${m.grade}"></div>
          </div>
          <span class="bar-chart__label">${subj.code}</span>
        </div>`;
    }).join("");
    requestAnimationFrame(() => {
      $all(".bar-chart__fill", container).forEach((el) => {
        el.style.height = getSettings().animations ? "0%" : el.style.getPropertyValue("--target-h");
        requestAnimationFrame(() => {
          el.style.transition = getSettings().animations ? "height 1s cubic-bezier(.16,1,.3,1)" : "none";
          el.style.height = el.style.getPropertyValue("--target-h");
        });
      });
    });
  }

  function renderSubjectMarksMini() {
    const wrap = $("#subjectMarksMini");
    if (!wrap) return;
    wrap.innerHTML = MARKS.map((m) => {
      const subj = subjectByCode(m.code);
      return `
        <div class="mini-row">
          <span class="mini-row__name">${subj.name}</span>
          <span class="mini-row__grade grade-badge grade-badge--${m.grade.replace("+", "plus")}">${m.grade}</span>
          <span class="mini-row__pct">${m.pct}%</span>
        </div>`;
    }).join("");
  }

  function renderTodayTimetable() {
    const wrap = $("#todayTimetable");
    if (!wrap) return;
    const days = Object.keys(TIMETABLE);
    const dayIdx = new Date().getDay(); // 0 Sun .. 6 Sat
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIdx];
    const schedule = TIMETABLE[dayName];

    if (!schedule) {
      wrap.innerHTML = `<div class="empty-state">No classes scheduled — enjoy your Sunday! 🎉</div>`;
      return;
    }
    wrap.innerHTML = schedule.map((code, i) => {
      if (code === "BREAK") return `<div class="timetable-mini__break">Lunch Break</div>`;
      if (code === "LIB" || code === "MENT" || code === "—") {
        const label = code === "LIB" ? "Library Hour" : code === "MENT" ? "Mentoring" : "Free Period";
        return `<div class="timetable-mini__row"><span class="timetable-mini__time">${PERIOD_TIMES[i]}</span><span class="timetable-mini__subj">${label}</span></div>`;
      }
      const subj = subjectByCode(code);
      return `
        <div class="timetable-mini__row">
          <span class="timetable-mini__time">${PERIOD_TIMES[i]}</span>
          <span class="timetable-mini__subj">${subj.name}</span>
          <span class="timetable-mini__room">${ROOMS[i % ROOMS.length]}</span>
        </div>`;
    }).join("");
  }

  /* ---------------------------------------------------------
     7. PROFILE
  --------------------------------------------------------- */

  function renderProfile() {
    const overrides = getProfileOverrides();
    const student = { ...CURRENT_STUDENT, ...overrides };
    const fields = ["name", "email", "phone", "address", "bloodGroup"];
    fields.forEach((f) => {
      const el = $(`[data-profile-view='${f}']`);
      if (el) el.textContent = student[f];
    });
    $("#profileRegNo").textContent = student.regNo;
    $("#profileDept").textContent = student.department;
    $("#profileYearSem").textContent = `${student.year} · ${student.semester} · Section ${student.section}`;
    $("#profileCgpa").textContent = student.cgpa;
    $("#profileDob").textContent = student.dob;
    $("#profileAdvisor").textContent = student.advisor;
    $("#profileAdmission").textContent = student.admissionYear;
    $("#profileInitialsLarge").textContent = CURRENT_STUDENT.avatarInitials;

    const overallAttendance = Math.round(
      (ATTENDANCE.reduce((a, r) => a + r.present, 0) / ATTENDANCE.reduce((a, r) => a + r.total, 0)) * 1000
    ) / 10;
    $("#profileAttendance").textContent = overallAttendance + "%";

    const editBtn = $("#editProfileBtn");
    const form = $("#profileEditForm");
    const viewMode = $("#profileViewMode");
    const cancelBtn = $("#cancelEditBtn");

    editBtn.addEventListener("click", () => {
      $("#editName").value = student.name;
      $("#editEmail").value = student.email;
      $("#editPhone").value = student.phone;
      $("#editAddress").value = student.address;
      $("#editBloodGroup").value = student.bloodGroup;
      viewMode.hidden = true;
      form.hidden = false;
    });
    cancelBtn.addEventListener("click", () => {
      form.hidden = true;
      viewMode.hidden = false;
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const updated = {
        name: $("#editName").value.trim(),
        email: $("#editEmail").value.trim(),
        phone: $("#editPhone").value.trim(),
        address: $("#editAddress").value.trim(),
        bloodGroup: $("#editBloodGroup").value.trim(),
      };
      saveProfileOverrides({ ...overrides, ...updated });
      form.hidden = true;
      viewMode.hidden = false;
      renderProfile();
      populateIdentity();
      toast("Profile updated successfully");
    });
  }

  /* ---------------------------------------------------------
     8. ATTENDANCE
  --------------------------------------------------------- */

  function renderAttendance() {
    const totalClasses = ATTENDANCE.reduce((a, r) => a + r.total, 0);
    const totalPresent = ATTENDANCE.reduce((a, r) => a + r.present, 0);
    const overallPct = Math.round((totalPresent / totalClasses) * 1000) / 10;

    $("#attTotalClasses").textContent = totalClasses;
    $("#attTotalPresent").textContent = totalPresent;
    $("#attTotalAbsent").textContent = totalClasses - totalPresent;
    $("#attOverallPct").textContent = overallPct + "%";

    drawCircularProgress($("#attendanceRingBig"), overallPct, { radius: 70 });
    $("#attendanceRingLabel").textContent = overallPct + "%";

    const list = $("#attendanceSubjectList");
    list.innerHTML = ATTENDANCE.map((r) => {
      const subj = subjectByCode(r.code);
      const status = r.pct >= 85 ? "excellent" : r.pct >= 75 ? "good" : "low";
      return `
        <div class="attendance-row">
          <div class="attendance-row__head">
            <span class="attendance-row__name">${subj.name}</span>
            <span class="attendance-row__pct attendance-row__pct--${status}">${r.pct}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill progress-fill--${status}" style="--target-w:${r.pct}%"></div>
          </div>
          <div class="attendance-row__meta">
            <span>Total: ${r.total}</span><span>Present: ${r.present}</span><span>Absent: ${r.absent}</span>
          </div>
        </div>`;
    }).join("");

    requestAnimationFrame(() => {
      $all(".progress-fill", list).forEach((el) => {
        const target = el.style.getPropertyValue("--target-w");
        el.style.width = getSettings().animations ? "0%" : target;
        requestAnimationFrame(() => {
          el.style.transition = getSettings().animations ? "width 1s cubic-bezier(.16,1,.3,1)" : "none";
          el.style.width = target;
        });
      });
    });

    renderAttendanceCalendar();
  }

  function renderAttendanceCalendar() {
    const cal = $("#attendanceCalendar");
    if (!cal) return;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    $("#calendarMonthLabel").textContent = now.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

    const rand = seededRandom(month + 7);
    let html = "";
    ["S", "M", "T", "W", "T", "F", "S"].forEach((d) => (html += `<div class="cal-cell cal-cell--head">${d}</div>`));
    for (let i = 0; i < firstDay; i++) html += `<div class="cal-cell cal-cell--empty"></div>`;
    for (let day = 1; day <= daysInMonth; day++) {
      const dow = new Date(year, month, day).getDay();
      let cls = "cal-cell";
      if (dow === 0) cls += " cal-cell--holiday";
      else if (day > now.getDate()) cls += " cal-cell--future";
      else {
        const r = rand();
        cls += r > 0.14 ? " cal-cell--present" : " cal-cell--absent";
      }
      if (day === now.getDate()) cls += " cal-cell--today";
      html += `<div class="${cls}"><span>${day}</span></div>`;
    }
    cal.innerHTML = html;
  }

  /* ---------------------------------------------------------
     9. MARKS
  --------------------------------------------------------- */

  function renderMarks() {
    const table = $("#marksTableBody");
    table.innerHTML = MARKS.map((m) => {
      const subj = subjectByCode(m.code);
      return `
        <tr>
          <td data-label="Subject"><strong>${subj.name}</strong><br><small class="text-muted">${subj.code}</small></td>
          <td data-label="Internal">${m.internal}/20</td>
          <td data-label="Assignment">${m.assignment}/10</td>
          <td data-label="Model Exam">${m.model}/50</td>
          <td data-label="Semester Exam">${m.semester}/100</td>
          <td data-label="Total">${m.total}/200</td>
          <td data-label="Grade"><span class="grade-badge grade-badge--${m.grade.replace("+", "plus")}">${m.grade}</span></td>
        </tr>`;
    }).join("");

    const totalMax = MARKS.length * 200;
    const totalScored = MARKS.reduce((a, m) => a + m.total, 0);
    const overallPct = Math.round((totalScored / totalMax) * 1000) / 10;
    $("#marksOverallPct").textContent = overallPct + "%";
    $("#marksCgpa").textContent = CURRENT_STUDENT.cgpa;

    renderMarksChart();
  }

  function renderMarksChart() {
    const container = $("#marksChart");
    if (!container) return;
    container.innerHTML = MARKS.map((m) => {
      const subj = subjectByCode(m.code);
      return `
        <div class="linechart-col">
          <div class="linechart-col__track">
            <div class="linechart-col__fill" style="--target-h:${m.pct}%"></div>
            <span class="linechart-col__value">${m.pct}%</span>
          </div>
          <span class="linechart-col__label">${subj.code}</span>
        </div>`;
    }).join("");
    requestAnimationFrame(() => {
      $all(".linechart-col__fill", container).forEach((el) => {
        const target = el.style.getPropertyValue("--target-h");
        el.style.height = getSettings().animations ? "0%" : target;
        requestAnimationFrame(() => {
          el.style.transition = getSettings().animations ? "height 1.1s cubic-bezier(.16,1,.3,1)" : "none";
          el.style.height = target;
        });
      });
    });
  }

  /* ---------------------------------------------------------
     10. TIMETABLE
  --------------------------------------------------------- */

  function renderTimetable() {
    const grid = $("#timetableGrid");
    const days = Object.keys(TIMETABLE);
    let html = `<div class="tt-cell tt-cell--corner">Time</div>`;
    PERIOD_TIMES.forEach((t, i) => (html += `<div class="tt-cell tt-cell--headtime">P${i + 1}<br><small>${t}</small></div>`));

    days.forEach((day) => {
      html += `<div class="tt-cell tt-cell--headday">${day}</div>`;
      TIMETABLE[day].forEach((code, i) => {
        if (code === "BREAK") {
          html += `<div class="tt-cell tt-cell--break">Lunch</div>`;
        } else if (code === "LIB" || code === "MENT" || code === "—") {
          const label = code === "LIB" ? "Library" : code === "MENT" ? "Mentoring" : "Free";
          html += `<div class="tt-cell tt-cell--free">${label}</div>`;
        } else {
          const subj = subjectByCode(code);
          html += `
            <div class="tt-cell tt-cell--class">
              <span class="tt-cell__subj">${subj.name}</span>
              <span class="tt-cell__faculty">${subj.faculty}</span>
              <span class="tt-cell__room">${ROOMS[i % ROOMS.length]}</span>
            </div>`;
        }
      });
    });
    grid.innerHTML = html;
    grid.style.setProperty("--periods", PERIOD_TIMES.length);
  }

  /* ---------------------------------------------------------
     11. ASSIGNMENTS
  --------------------------------------------------------- */

  function getMergedAssignments() {
    const overrides = getAssignmentStatus();
    return ASSIGNMENTS_SEED.map((a) => ({ ...a, status: overrides[a.id] || a.status }));
  }

  let currentAssignmentFilter = "All";

  function renderAssignments() {
    const list = getMergedAssignments();
    const grid = $("#assignmentsGrid");
    const filtered = currentAssignmentFilter === "All" ? list : list.filter((a) => a.status === currentAssignmentFilter);

    grid.innerHTML = filtered.length
      ? filtered.map((a) => {
          const subj = subjectByCode(a.code);
          const daysLeft = Math.ceil((new Date(a.due) - new Date(todayISO())) / 86400000);
          const dueLabel = a.status === "Submitted" ? "Submitted" :
            daysLeft < 0 ? `${Math.abs(daysLeft)} days overdue` :
            daysLeft === 0 ? "Due today" : `${daysLeft} days left`;
          return `
            <article class="assign-card assign-card--${a.status.toLowerCase()}">
              <div class="assign-card__top">
                <span class="status-pill status-pill--${a.status.toLowerCase()}">${a.status}</span>
                <span class="assign-card__due">${dueLabel}</span>
              </div>
              <h3 class="assign-card__title">${a.title}</h3>
              <p class="assign-card__subj">${subj.name} · ${subj.faculty}</p>
              <p class="assign-card__date">Due ${formatDate(a.due)}</p>
              ${a.status !== "Submitted"
                ? `<button class="btn btn--primary btn--sm" data-submit="${a.id}">Submit Assignment</button>`
                : `<button class="btn btn--ghost btn--sm" disabled>✓ Submitted</button>`}
            </article>`;
        }).join("")
      : `<div class="empty-state">No assignments in this category.</div>`;

    grid.querySelectorAll("[data-submit]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const id = btn.dataset.submit;
        const overrides = getAssignmentStatus();
        overrides[id] = "Submitted";
        saveAssignmentStatus(overrides);
        renderAssignments();
        renderDashboard();
        toast("Assignment submitted successfully");
      })
    );

    const counts = {
      All: list.length,
      Pending: list.filter((a) => a.status === "Pending").length,
      Submitted: list.filter((a) => a.status === "Submitted").length,
      Overdue: list.filter((a) => a.status === "Overdue").length,
    };
    $all(".filter-tab", $("#assignmentFilters")).forEach((tab) => {
      tab.querySelector(".filter-tab__count").textContent = counts[tab.dataset.filter];
    });
  }

  function initAssignmentFilters() {
    $all(".filter-tab", $("#assignmentFilters")).forEach((tab) => {
      tab.addEventListener("click", () => {
        currentAssignmentFilter = tab.dataset.filter;
        $all(".filter-tab", $("#assignmentFilters")).forEach((t) => t.classList.remove("is-active"));
        tab.classList.add("is-active");
        renderAssignments();
      });
    });
  }

  /* ---------------------------------------------------------
     12. EXAMINATIONS
  --------------------------------------------------------- */

  let countdownInterval = null;

  function renderExaminations() {
    const upcoming = EXAMS.filter((e) => e.status === "Upcoming").sort((a, b) => new Date(a.date) - new Date(b.date));
    const previous = EXAMS.filter((e) => e.status === "Completed").sort((a, b) => new Date(b.date) - new Date(a.date));

    $("#examsUpcoming").innerHTML = upcoming.map((e) => examCard(e)).join("") || `<div class="empty-state">No upcoming exams.</div>`;
    $("#examsPrevious").innerHTML = previous.map((e) => examCard(e)).join("") || `<div class="empty-state">No previous exams.</div>`;

    if (upcoming.length) {
      const next = upcoming[0];
      const subj = subjectByCode(next.code);
      $("#nextExamLabel").textContent = `${subj.name} — ${next.type}`;
      $("#nextExamMeta").textContent = `${formatDate(next.date)} · ${next.time} · ${next.room}`;
      startCountdown(next.date, next.time);
    } else {
      $("#nextExamLabel").textContent = "No exams scheduled";
      $("#countdownRow").innerHTML = "";
    }
  }

  function examCard(e) {
    const subj = subjectByCode(e.code);
    return `
      <div class="exam-card exam-card--${e.status.toLowerCase()}">
        <div class="exam-card__date">
          <span class="exam-card__day">${new Date(e.date + "T00:00:00").getDate()}</span>
          <span class="exam-card__month">${new Date(e.date + "T00:00:00").toLocaleDateString("en-IN", { month: "short" })}</span>
        </div>
        <div class="exam-card__body">
          <h4>${subj.name}</h4>
          <p>${e.type}</p>
          <p class="exam-card__meta">${e.time} · ${e.room}</p>
        </div>
        <span class="status-pill status-pill--${e.status.toLowerCase()}">${e.status}</span>
      </div>`;
  }

  function startCountdown(dateStr, timeStr) {
    clearInterval(countdownInterval);
    const target = parseExamDateTime(dateStr, timeStr);
    const row = $("#countdownRow");

    function tick() {
      const diff = target - new Date();
      if (diff <= 0) {
        row.innerHTML = `<div class="countdown-unit"><span>It's exam time!</span></div>`;
        clearInterval(countdownInterval);
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      row.innerHTML = `
        ${countUnit(d, "Days")}${countUnit(h, "Hours")}${countUnit(m, "Min")}${countUnit(s, "Sec")}`;
    }
    tick();
    countdownInterval = setInterval(tick, 1000);
  }

  function countUnit(val, label) {
    return `<div class="countdown-unit"><span class="countdown-unit__val">${String(val).padStart(2, "0")}</span><span class="countdown-unit__label">${label}</span></div>`;
  }

  function parseExamDateTime(dateStr, timeStr) {
    const [time, meridiem] = timeStr.split(" ");
    let [hh, mm] = time.split(":").map(Number);
    if (meridiem === "PM" && hh !== 12) hh += 12;
    if (meridiem === "AM" && hh === 12) hh = 0;
    const d = new Date(dateStr + "T00:00:00");
    d.setHours(hh, mm, 0, 0);
    return d;
  }

  /* ---------------------------------------------------------
     13. ANNOUNCEMENTS
  --------------------------------------------------------- */

  let announcementCategory = "All";

  function renderAnnouncements() {
    const list = announcementCategory === "All"
      ? ANNOUNCEMENTS
      : ANNOUNCEMENTS.filter((a) => a.category === announcementCategory);
    const sorted = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));

    $("#announcementsList").innerHTML = sorted.map((a, i) => `
      <article class="ann-card" style="--i:${i}">
        <div class="ann-card__top">
          <span class="tag tag--${a.category.toLowerCase()}">${a.category}</span>
          <span class="priority-pill priority-pill--${a.priority.toLowerCase()}">${a.priority} priority</span>
        </div>
        <h3>${a.title}</h3>
        <p>${a.body}</p>
        <time>${formatDate(a.date, { day: "numeric", month: "long", year: "numeric" })}</time>
      </article>
    `).join("") || `<div class="empty-state">No announcements in this category.</div>`;
  }

  function initAnnouncementFilters() {
    $all(".chip", $("#announcementFilters")).forEach((chip) => {
      chip.addEventListener("click", () => {
        announcementCategory = chip.dataset.category;
        $all(".chip", $("#announcementFilters")).forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        renderAnnouncements();
      });
    });
  }

  /* ---------------------------------------------------------
     14. STUDENTS DIRECTORY
  --------------------------------------------------------- */

  let studentFilters = { search: "", dept: "All", year: "All", sort: "name-asc" };

  function renderStudents() {
    let list = STUDENTS.filter((s) => {
      const matchesSearch = !studentFilters.search ||
        s.name.toLowerCase().includes(studentFilters.search) ||
        s.regNo.includes(studentFilters.search);
      const matchesDept = studentFilters.dept === "All" || s.department === studentFilters.dept;
      const matchesYear = studentFilters.year === "All" || s.year === studentFilters.year;
      return matchesSearch && matchesDept && matchesYear;
    });

    const [key, dir] = studentFilters.sort.split("-");
    list = list.sort((a, b) => {
      let res = 0;
      if (key === "name") res = a.name.localeCompare(b.name);
      else if (key === "cgpa") res = a.cgpa - b.cgpa;
      else if (key === "attendance") res = a.attendance - b.attendance;
      return dir === "asc" ? res : -res;
    });

    $("#studentsCount").textContent = `${list.length} student${list.length !== 1 ? "s" : ""}`;

    $("#studentsGrid").innerHTML = list.map((s) => `
      <article class="student-card" data-reg="${s.regNo}">
        <div class="student-card__top">
          <span class="student-card__avatar">${s.initials}</span>
          <span class="status-pill status-pill--${s.status === "Active" ? "submitted" : "overdue"}">${s.status}</span>
        </div>
        <h3>${s.name}</h3>
        <p class="student-card__reg">${s.regNo}</p>
        <p class="student-card__dept">${s.department} · ${s.year} · Sec ${s.section}</p>
        <div class="student-card__stats">
          <div><strong>${s.cgpa}</strong><span>CGPA</span></div>
          <div><strong>${s.attendance}%</strong><span>Attendance</span></div>
        </div>
        <button class="btn btn--outline btn--sm" data-view="${s.regNo}">View Details</button>
      </article>
    `).join("") || `<div class="empty-state">No students match your filters.</div>`;

    $all("[data-view]").forEach((btn) =>
      btn.addEventListener("click", () => openStudentModal(btn.dataset.view))
    );
  }

  function initStudentsControls() {
    $("#studentSearch").addEventListener("input", (e) => {
      studentFilters.search = e.target.value.trim().toLowerCase();
      renderStudents();
    });
    $("#deptFilter").addEventListener("change", (e) => {
      studentFilters.dept = e.target.value;
      renderStudents();
    });
    $("#yearFilter").addEventListener("change", (e) => {
      studentFilters.year = e.target.value;
      renderStudents();
    });
    $("#sortFilter").addEventListener("change", (e) => {
      studentFilters.sort = e.target.value;
      renderStudents();
    });

    const deptSelect = $("#deptFilter");
    DEPARTMENTS.forEach((d) => {
      const opt = document.createElement("option");
      opt.value = d; opt.textContent = d;
      deptSelect.appendChild(opt);
    });
  }

  function openStudentModal(regNo) {
    const s = STUDENTS.find((st) => st.regNo === regNo);
    if (!s) return;
    const modal = $("#studentModal");
    $("#modalAvatar").textContent = s.initials;
    $("#modalName").textContent = s.name;
    $("#modalReg").textContent = s.regNo;
    $("#modalDept").textContent = s.department;
    $("#modalYear").textContent = s.year;
    $("#modalSection").textContent = s.section;
    $("#modalCgpa").textContent = s.cgpa;
    $("#modalAttendance").textContent = s.attendance + "%";
    $("#modalStatus").textContent = s.status;
    $("#modalStatus").className = `status-pill status-pill--${s.status === "Active" ? "submitted" : "overdue"}`;
    $("#modalEmail").textContent = s.email;
    $("#modalPhone").textContent = s.phone;
    modal.classList.add("is-open");
  }

  function initModalClose() {
    $all("[data-close-modal]").forEach((btn) =>
      btn.addEventListener("click", () => btn.closest(".modal").classList.remove("is-open"))
    );
    $all(".modal").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("is-open");
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") $all(".modal.is-open").forEach((m) => m.classList.remove("is-open"));
    });
  }

  /* ---------------------------------------------------------
     15. SETTINGS
  --------------------------------------------------------- */

  function initSettingsControls() {
    const settings = getSettings();
    $("#themeToggleGroup").querySelectorAll("[data-theme]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.theme === settings.theme);
      btn.addEventListener("click", () => {
        const s = getSettings();
        s.theme = btn.dataset.theme;
        saveSettings(s);
        applySettings(s);
        $("#themeToggleGroup").querySelectorAll("[data-theme]").forEach((b) => b.classList.toggle("is-active", b === btn));
      });
    });

    bindToggle("#notifToggle", "notifications");
    bindToggle("#animToggle", "animations");
    bindToggle("#compactToggle", "compactSidebar");

    $("#settingsLogoutBtn").addEventListener("click", logout);
  }

  function bindToggle(sel, key) {
    const el = $(sel);
    const settings = getSettings();
    el.checked = settings[key];
    el.addEventListener("change", () => {
      const s = getSettings();
      s[key] = el.checked;
      saveSettings(s);
      applySettings(s);
      toast(`${el.closest(".setting-row").querySelector(".setting-row__label").textContent} ${el.checked ? "enabled" : "disabled"}`, "info", 2000);
    });
  }

  function applySettings(settings) {
    document.documentElement.classList.toggle("theme-dark", settings.theme === "dark");
    document.body.classList.toggle("sidebar-collapsed", settings.compactSidebar);
    document.body.classList.toggle("no-animations", !settings.animations);
  }

  /* ---------------------------------------------------------
     16. BOOTSTRAP
  --------------------------------------------------------- */

  function init() {
    applySettings(getSettings());
    initLogin();
    initAssignmentFilters();
    initAnnouncementFilters();
    initStudentsControls();
    initModalClose();

    const auth = readJSON(STORE.auth, null);
    if (auth && auth.loggedIn) {
      $("#loginScreen").hidden = true;
      $("#appScreen").hidden = false;
      $("#appScreen").classList.add("is-active");
      initApp();
    }

    // respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const s = getSettings();
      s.animations = false;
      saveSettings(s);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
