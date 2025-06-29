document.addEventListener("DOMContentLoaded", function () {
  // --- 1. Smooth scrolling for navigation links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetEl = document.querySelector(this.getAttribute("href"));
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }

      // Tutup menu hamburger jika terbuka
      const navbarMenu = document.getElementById("navbar-menu");
      const mobileMenu = document.getElementById("mobile-menu");
      if (navbarMenu && mobileMenu && navbarMenu.classList.contains("active")) {
        navbarMenu.classList.remove("active");
        mobileMenu.querySelector("i").classList.remove("fa-times");
        mobileMenu.querySelector("i").classList.add("fa-bars");
      }
    });
  });

  // --- 2. Animasi garis bawah judul saat terlihat (Intersection Observer) ---
  const headings = document.querySelectorAll("section h2");
  const headingObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6, // Animasi dipicu saat 60% elemen terlihat
  };

  const headingObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated-underline");
        observer.unobserve(entry.target);
      }
    });
  }, headingObserverOptions);

  headings.forEach((heading) => {
    headingObserver.observe(heading);
  });

  // --- 3. Animasi Fade-in untuk setiap section saat di-scroll ---
  // Pastikan CSS sudah menginisialisasi opacity: 0 dan transform: translateY(50px)
  const sections = document.querySelectorAll("section");

  const sectionFadeInObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in"); // Tambahkan class 'fade-in'
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2, // Animasi dimulai saat 20% section terlihat
    }
  );

  sections.forEach((section) => {
    sectionFadeInObserver.observe(section);
  });

  // --- 4. Navigasi Smart (Hide on scroll down, show on scroll up) ---
  let lastScrollTop = 0;
  const navbar = document.querySelector("header");

  window.addEventListener(
    "scroll",
    function () {
      let currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;

      if (
        currentScroll > lastScrollTop &&
        currentScroll > navbar.offsetHeight
      ) {
        navbar.classList.add("navbar-hidden");
      } else if (currentScroll < lastScrollTop) {
        navbar.classList.remove("navbar-hidden");
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    },
    false
  );

  // --- 5. Hamburger Menu Toggle (Sudah dipindahkan ke sini) ---
  const mobileMenu = document.getElementById("mobile-menu");
  const navbarMenu = document.getElementById("navbar-menu");

  // Pastikan elemen ditemukan sebelum menambahkan event listener
  if (mobileMenu && navbarMenu) {
    mobileMenu.addEventListener("click", function () {
      navbarMenu.classList.toggle("active");
      // Ganti ikon hamburger menjadi close (X) dan sebaliknya
      if (navbarMenu.classList.contains("active")) {
        mobileMenu.querySelector("i").classList.remove("fa-bars");
        mobileMenu.querySelector("i").classList.add("fa-times");
      } else {
        mobileMenu.querySelector("i").classList.remove("fa-times");
        mobileMenu.querySelector("i").classList.add("fa-bars");
      }
    });

    // Tutup menu saat link diklik (agar menu tidak tetap terbuka)
    // Ambil navLinks di sini, setelah memastikan navbarMenu ada
    const navLinks = navbarMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (navbarMenu.classList.contains("active")) {
          navbarMenu.classList.remove("active");
          mobileMenu.querySelector("i").classList.remove("fa-times");
          mobileMenu.querySelector("i").classList.add("fa-bars");
        }
      });
    });
  }

  // --- 6. Efek Typing pada Hero Section ---
  const typedTextSpan = document.querySelector(".typing-effect");
  const textArray = ["Pembadar Pane"];
  const typingDelay = 100;
  const newTextDelay = 800;

  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (!typedTextSpan) return; // Tambahkan cek null
    if (charIndex < textArray[textArrayIndex].length) {
      if (!typedTextSpan.classList.contains("typing"))
        typedTextSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
    }
  }

  function erase() {
    if (!typedTextSpan) return; // Tambahkan cek null
    if (charIndex > 0) {
      if (!typedTextSpan.classList.contains("typing"))
        typedTextSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      typedTextSpan.classList.remove("typing");
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  // Memulai efek typing setelah halaman dimuat
  if (typedTextSpan && textArray.length) {
    // Cek typedTextSpan agar tidak error jika elemen tidak ada
    setTimeout(type, newTextDelay + 250);
  }

  console.log("Portofolio Pembadar Pane loaded successfully!");
}); // Akhir dari document.addEventListener("DOMContentLoaded") utama
