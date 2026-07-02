(() => {
    const SWITCH_ANIM_MS = 320;
    let hasHydrated = false;
    let isSwitching = false;

    const DICTS = {
        common: {
            id: {
                nav_about: "Tentang",
                nav_contact: "Kontak",
                footer_secure: "Sistem aman. Semua modul berjalan optimal.",
                lang_id: "ID",
                lang_en: "EN",
            },
            en: {
                nav_about: "About",
                nav_contact: "Contact",
                footer_secure: "System secure. All modules operating at optimal capacity.",
                lang_id: "ID",
                lang_en: "EN",
            },
        },
        index: {
            id: {
                page_title: "Personal Hub Anda",
                header_connection: "Koneksi:",
                section_comms: "Komunikasi & Sosial",
                app_open_desktop: "Buka Aplikasi Desktop",
                section_dev: "Pengembang & Investasi",
                repo_check: "Cek Repositori",
                watchlist_title: "Pantauan BSJP",
                video_pick_music: "Pilih musik untuk memutar",
                search_placeholder: "Cari musik di YouTube...",
                search_button: "Cari",
                search_loading: "Mencari...",
                search_loading_more: "Memuat lagu lainnya...",
                market_news: "Pasar & Berita",
                refresh_data: "Muat Ulang Data",
                label_updated: "Diperbarui",
                news_loading: "Memuat data market...",
                news_loading_more_news: "Memuat berita lain...",
                news_page_word: "Hal",
                news_prev: "Sebelumnya",
                news_next: "Selanjutnya",
                ihsg_market_closed_short: "Market tutup",
                ihsg_market_closed: "Market sedang tutup (09:00-16:00 WIB)",
                ihsg_market_next_open: "Buka kembali 09:00 WIB",
                ihsg_last_close_time: "Terakhir 16:00 WIB",
                ihsg_night_mode: "Night mode",
                ihsg_market_closed_badge: "Market Tutup",
                quick_log: "Catatan Cepat",
                quick_log_placeholder: "Catat query database tanpa application impact join, atau reminder jadwal ganti oli Agya di sini...",
                save_status: "Menyimpan...",
            },
            en: {
                page_title: "Your Personal Hub",
                header_connection: "Connection:",
                section_comms: "Comms & Social",
                app_open_desktop: "Open Desktop App",
                section_dev: "Dev & Trading",
                repo_check: "Check Repository",
                watchlist_title: "BSJP Watchlist",
                video_pick_music: "Pick music to start playback",
                search_placeholder: "Search music on YouTube...",
                search_button: "Search",
                search_loading: "Searching...",
                search_loading_more: "Loading more songs...",
                market_news: "Market & News",
                refresh_data: "Refresh Data",
                label_updated: "Updated",
                news_loading: "Loading market data...",
                news_loading_more_news: "Loading more news...",
                news_page_word: "Page",
                news_prev: "Prev",
                news_next: "Next",
                ihsg_market_closed_short: "Market closed",
                ihsg_market_closed: "Market is closed (09:00-16:00 WIB)",
                ihsg_market_next_open: "Opens again at 09:00 WIB",
                ihsg_last_close_time: "Last close 16:00 WIB",
                ihsg_night_mode: "Night mode",
                ihsg_market_closed_badge: "Market Closed",
                quick_log: "Quick Log",
                quick_log_placeholder: "Write database queries, reminders, or quick notes here...",
                save_status: "Saving...",
            },
        },
        about: {
            id: {
                page_title: "Tentang - TWJ Dev",
                title_main: "Tentang TWJ Dev",
                intro_1: "Halo, saya TWJ Dev — pengembang yang berfokus pada pembuatan dashboard personal, automasi alur kerja, dan pemantauan data waktu nyata untuk kebutuhan harian maupun operasional tim kecil.",
                intro_2: "Personal Hub ini adalah produk contoh yang bisa disesuaikan dengan kebutuhan Anda: dari pemantauan pasar, pembaruan berita, status koneksi, sampai catatan cepat dan pintasan aktivitas harian.",
                box_focus_title: "Fokus",
                box_focus_desc: "Personal hub, pemantauan waktu nyata, antarmuka dashboard, dan automasi alur kerja.",
                box_value_title: "Nilai",
                box_value_desc: "Dapat dikustomisasi, ringan, dan mudah diadaptasi sesuai alur kerja pengguna.",
                box_usecase_title: "Contoh penggunaan Personal Hub",
                box_usecase_desc: "Memantau indikator penting secara langsung, menampilkan data prioritas di satu layar, dan mengurangi perpindahan aplikasi saat bekerja.",
                mission_desc: "Tujuan saya sederhana: menghadirkan personal hub yang tidak hanya terlihat rapi, tapi juga benar-benar membantu pengambilan keputusan cepat setiap hari.",
                cta_lead: "Ingin bekerja sama untuk membuat personal hub yang sesuai kebutuhan Anda?",
                cta_contact_link: "Hubungi saya di halaman Kontak",
                back_dashboard: "Kembali ke Dasbor",
            },
            en: {
                page_title: "About - TWJ Dev",
                title_main: "About TWJ Dev",
                intro_1: "Hi, I am TWJ Dev — a developer focused on building personal dashboards, workflow automation, and real-time data monitoring for daily use and small team operations.",
                intro_2: "This Personal Hub is a sample product that can be tailored to your needs: from market tracking, news updates, and connection status to quick notes and daily shortcuts.",
                box_focus_title: "Focus",
                box_focus_desc: "Personal hub, real-time monitoring, dashboard UI, and workflow automation.",
                box_value_title: "Value",
                box_value_desc: "Customizable, lightweight, and easy to adapt to your workflow.",
                box_usecase_title: "Personal Hub Use Cases",
                box_usecase_desc: "Monitor key indicators live, keep priority data on one screen, and reduce app switching while working.",
                mission_desc: "My goal is simple: deliver a personal hub that is not only clean visually, but also truly useful for fast daily decisions.",
                cta_lead: "Interested in working together to build a personal hub tailored to your needs?",
                cta_contact_link: "Reach out on the Contact page",
                back_dashboard: "Back to Dashboard",
            },
        },
        contact: {
            id: {
                page_title: "Kontak - TWJ Dev",
                title_main: "Kontak Saya",
                intro_desc: "Ingin bekerja sama untuk personal hub kustom, dashboard pemantauan waktu nyata, atau automasi alur kerja? Silakan kirim pesan melalui form berikut.",
                form_name: "Nama",
                form_email: "Email",
                form_message: "Pesan",
                form_name_ph: "Nama Anda",
                form_email_ph: "email@domain.com",
                form_message_ph: "Tulis kebutuhan project atau ide kolaborasi Anda...",
                form_submit: "Kirim Pesan",
                form_sending: "Mengirim...",
                form_success: "Pesan berhasil dikirim. Saya akan segera merespons.",
                form_error: "Gagal mengirim pesan. Coba lagi beberapa saat.",
                back_dashboard: "Kembali ke Dasbor",
            },
            en: {
                page_title: "Contact - TWJ Dev",
                title_main: "Contact Me",
                intro_desc: "Interested in collaboration for a custom personal hub, real-time monitoring dashboard, or workflow automation? Send me a message through the form below.",
                form_name: "Name",
                form_email: "Email",
                form_message: "Message",
                form_name_ph: "Your name",
                form_email_ph: "email@domain.com",
                form_message_ph: "Write your project needs or collaboration ideas...",
                form_submit: "Send Message",
                form_sending: "Sending...",
                form_success: "Message sent successfully. I will respond soon.",
                form_error: "Failed to send message. Please try again shortly.",
                back_dashboard: "Back to Dashboard",
            },
        },
    };

    const ACTIVE_CLASS = ["bg-blue-600", "text-white", "border-blue-500"];
    const INACTIVE_CLASS = ["text-slate-400", "border-slate-700", "hover:text-slate-200", "hover:border-slate-500"];

    function ensureTransitionStyle() {
        if (document.getElementById("i18n-transition-style")) return;
        const style = document.createElement("style");
        style.id = "i18n-transition-style";
        style.textContent = `
            .i18n-anim-root {
                transition: opacity ${SWITCH_ANIM_MS}ms cubic-bezier(0.22, 1, 0.36, 1),
                            transform ${SWITCH_ANIM_MS}ms cubic-bezier(0.22, 1, 0.36, 1),
                            filter ${SWITCH_ANIM_MS}ms cubic-bezier(0.22, 1, 0.36, 1);
                will-change: opacity, transform, filter;
            }
            .i18n-switch-out {
                opacity: 0.45;
                transform: translateY(4px) scale(0.985);
                filter: blur(1.4px);
            }
            .i18n-switch-in {
                opacity: 1;
                transform: translateY(0);
                filter: blur(0);
            }
        `;
        document.head.appendChild(style);
    }

    function getAnimRoot() {
        return document.querySelector("[data-i18n-root]") || document.body;
    }

    function getPageName() {
        const page = document.body?.dataset?.page;
        return page && DICTS[page] ? page : "index";
    }

    function getLang() {
        const stored = localStorage.getItem("app_lang");
        return stored === "en" ? "en" : "id";
    }

    function t(key) {
        const page = getPageName();
        const lang = getLang();
        return DICTS[page]?.[lang]?.[key]
            || DICTS.common?.[lang]?.[key]
            || DICTS[page]?.id?.[key]
            || DICTS.common?.id?.[key]
            || key;
    }

    function updateLangButtons(lang) {
        document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
            const active = btn.dataset.langBtn === lang;
            btn.classList.remove(...ACTIVE_CLASS, ...INACTIVE_CLASS);
            btn.classList.add(...(active ? ACTIVE_CLASS : INACTIVE_CLASS));
            btn.setAttribute("aria-pressed", active ? "true" : "false");
        });
    }

    function applyDomTranslations(safeLang) {
        localStorage.setItem("app_lang", safeLang);
        document.documentElement.lang = safeLang;

        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.dataset.i18n;
            if (!key) return;
            el.textContent = t(key);
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
            const key = el.dataset.i18nPlaceholder;
            if (!key) return;
            el.setAttribute("placeholder", t(key));
        });

        document.querySelectorAll("[data-i18n-title]").forEach((el) => {
            const key = el.dataset.i18nTitle;
            if (!key) return;
            el.setAttribute("title", t(key));
        });

        updateLangButtons(safeLang);
        window.dispatchEvent(new CustomEvent("app-language-changed", { detail: { lang: safeLang } }));
    }

    function applyLanguage(lang, options = {}) {
        const safeLang = lang === "en" ? "en" : "id";
        const shouldAnimate = options.animate !== false && hasHydrated;
        const root = getAnimRoot();
        ensureTransitionStyle();

        if (!shouldAnimate) {
            applyDomTranslations(safeLang);
            hasHydrated = true;
            return;
        }

        if (isSwitching) return;
        isSwitching = true;

        if (typeof document.startViewTransition === "function") {
            const transition = document.startViewTransition(() => {
                applyDomTranslations(safeLang);
            });
            transition.finished.finally(() => {
                isSwitching = false;
            });
            return;
        }

        root.classList.add("i18n-anim-root", "i18n-switch-out");
        setTimeout(() => {
            applyDomTranslations(safeLang);
            root.classList.remove("i18n-switch-out");
            root.classList.add("i18n-switch-in");
            setTimeout(() => {
                root.classList.remove("i18n-switch-in");
                isSwitching = false;
            }, Math.round(SWITCH_ANIM_MS * 0.55));
        }, Math.round(SWITCH_ANIM_MS * 0.45));
    }

    function bindLanguageToggles() {
        document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
            btn.addEventListener("click", () => {
                applyLanguage(btn.dataset.langBtn === "en" ? "en" : "id");
            });
        });
    }

    window.AppI18n = {
        t,
        getLang,
        setLang: applyLanguage,
    };

    document.addEventListener("DOMContentLoaded", () => {
        bindLanguageToggles();
        applyLanguage(getLang(), { animate: false });
    });
})();
