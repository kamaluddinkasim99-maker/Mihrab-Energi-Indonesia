const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const backToTop = document.getElementById("backToTop");
const themeToggle = document.getElementById("themeToggle");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");

    const isOpen = mainNav.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

if (themeToggle) {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
  });
}

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 450) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* Main page comment form */
const commentForm = document.getElementById("commentForm");
const commentList = document.getElementById("commentList");
const commentNote = document.getElementById("commentNote");

if (commentForm && commentList) {
  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("commentName").value.trim();
    const email = document.getElementById("commentEmail").value.trim();
    const message = document.getElementById("commentMessage").value.trim();

    if (!name || !email || !message) {
      if (commentNote) {
        commentNote.textContent = "Mohon lengkapi nama, email, dan komentar.";
        commentNote.style.color = "#dc2626";
      }
      return;
    }

    addComment(commentList, name, email, message);

    if (commentNote) {
      commentNote.textContent = "Komentar berhasil ditampilkan sementara di halaman ini.";
      commentNote.style.color = "#17845b";
    }

    commentForm.reset();
  });
}

/* Article comment forms */
const articleForms = document.querySelectorAll(".article-comment-form");

articleForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const wrapper = form.closest(".article-interaction");
    const list = wrapper.querySelector(".article-comment-list");
    const note = form.querySelector(".form-note");

    const name = form.querySelector(".comment-name").value.trim();
    const email = form.querySelector(".comment-email").value.trim();
    const message = form.querySelector(".comment-message").value.trim();

    if (!name || !email || !message) {
      note.textContent = "Mohon lengkapi nama, email, dan komentar.";
      note.style.color = "#dc2626";
      return;
    }

    addComment(list, name, email, message);

    note.textContent = "Komentar berhasil ditampilkan sementara di halaman ini.";
    note.style.color = "#17845b";

    form.reset();
  });
});

function addComment(list, name, email, message) {
  const emptyComment = list.querySelector(".empty-comment");

  if (emptyComment) {
    emptyComment.remove();
  }

  const commentItem = document.createElement("div");
  commentItem.className = "comment-item";

  const date = new Date().toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short"
  });

  commentItem.innerHTML = `
    <strong>${escapeHTML(name)}</strong>
    <small>${escapeHTML(email)} • ${date}</small>
    <p>${escapeHTML(message)}</p>
  `;

  list.appendChild(commentItem);
}

function escapeHTML(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ===== Amanah Energi Indonesia — formulir pendaftaran masjid =====
   Ganti nomor di bawah dengan nomor WhatsApp resmi perusahaan (format 62...). */
const MIHRAB_WHATSAPP = "6281211742710";

const daftarForm = document.getElementById("daftarForm");

if (daftarForm) {
  daftarForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const note = daftarForm.querySelector(".form-note");
    const field = (id) => document.getElementById(id).value.trim();

    const data = {
      nama: field("daftarNama"),
      jabatan: field("daftarJabatan"),
      masjid: field("daftarMasjid"),
      kota: field("daftarKota"),
      telepon: field("daftarTelepon"),
      parkir: field("daftarParkir"),
      catatan: field("daftarCatatan")
    };

    if (!data.nama || !data.masjid || !data.kota || !data.telepon) {
      note.textContent = "Mohon lengkapi nama, nama masjid, kota, dan nomor WhatsApp.";
      note.style.color = "#dc2626";
      return;
    }

    const pesan =
      "Assalamu'alaikum Amanah Energi Indonesia,\n\n" +
      "Kami ingin mendaftarkan masjid untuk kemitraan SPKLU.\n\n" +
      "Nama pengurus: " + data.nama + "\n" +
      "Jabatan: " + (data.jabatan || "-") + "\n" +
      "Nama masjid: " + data.masjid + "\n" +
      "Kota/kabupaten: " + data.kota + "\n" +
      "WhatsApp: " + data.telepon + "\n" +
      "Kapasitas parkir: " + data.parkir + "\n" +
      "Catatan: " + (data.catatan || "-");

    window.open("https://wa.me/" + MIHRAB_WHATSAPP + "?text=" + encodeURIComponent(pesan), "_blank", "noopener");

    note.textContent = "Data siap dikirim. Silakan lanjutkan di WhatsApp.";
    note.style.color = "#0F5B4A";
  });
}
