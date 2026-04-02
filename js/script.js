// script.js

document.addEventListener('DOMContentLoaded', () => {

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
        });
    }

    // 1. Header Scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            header.style.padding = '5px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.padding = '0';
        }
    });

    // 1.5 Mobile Burger Menu Logic
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            // Toggle icon from bars to xmark
            if (nav.classList.contains('nav-active')) {
                burger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            } else {
                burger.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    }

    // 2. Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            // Close mobile menu on link click
            if (nav && nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Form submission (Simulated CRM Integration)
    const leadForm = document.getElementById('leadForm');
    const formSuccess = document.getElementById('formSuccess');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone_input').value;

            // Simple validation
            if (name && phone) {
                // Simulate an API call to a CRM
                const button = leadForm.querySelector('button');
                const originalText = button.textContent;
                button.textContent = 'Отправка...';
                button.disabled = true;

                setTimeout(() => {
                    // Success!
                    leadForm.style.display = 'none';
                    formSuccess.style.display = 'block';

                    // console output to simulate CRM tracking
                    console.log('--- NEW LEAD REGISTERED ---');
                    console.log('Name:', name);
                    console.log('Phone:', phone);
                    console.log('Notification sent to owner channel.');

                }, 1500);
            }
        });
    }

    // 4. Input Masking (Simple version for formatting phone number)
    const phoneInput = document.getElementById('phone_input');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            if (!x[2]) {
                e.target.value = '+7';
            } else {
                e.target.value = '+7' + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
            }
        });
    }
});

// Helper function attached to window for inline onclick="scrollToContact()"
window.scrollToContact = function () {
    const contactSection = document.getElementById('contacts');
    if (contactSection) {
        window.scrollTo({
            top: contactSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
};

// Yandex Map Initialization
if (typeof ymaps !== 'undefined') {
    ymaps.ready(initMap);
}

function initMap() {
    // Coordinates for: г. Уфа, Туринская ул., 1
    const coords = [54.707182, 55.827070];

    const map = new ymaps.Map('yandex-map', {
        center: coords,
        zoom: 16,
        controls: ['zoomControl', 'fullscreenControl']
    });

    // Disable scroll zoom for better UX on landing pages
    map.behaviors.disable('scrollZoom');

    // Create a custom hollow marker (similar to the reference site)
    const customPlacemark = new ymaps.Placemark(coords, {
        hintContent: 'ИП Саматов А.М. — Ремонт водонагревателей и насосов',
        balloonContent: 'Сервисный центр ИП Саматов: г. Уфа, Туринская ул., 1'
    }, {
        // Options for the custom icon
        iconLayout: 'default#image',
        // URL to a simple hollow blue SVG marker (Base64 Encoded for compatibility)
        iconImageHref: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNTgiIHZpZXdCb3g9IjAgMCA0OCA1OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjQgMEMxMC43NDUgMCAwIDEwLjc0NSAwIDI0QzAgNDIgMjQgNTggMjQgNThDMjQgNTggNDggNDIgNDggMjRDNDggMTAuNzQ1IDM3LjI1NSAwIDI0IDBaTTI0IDM1QzE3LjkyNSAzNSAxMyAzMC4wNzUgMTMgMjRDMTMgMTcuOTI1IDE3LjkyNSAxMyAyNCAxM0MzMC4wNzUgMTMgMzUgMTcuOTI1IDM1IDI0QzM1IDMwLjA3NSAzMC4wNzUgMzUgMjQgMzVaIiBmaWxsPSIjMDBBRUVGIi8+PC9zdmc+',
        iconImageSize: [48, 58],
        iconImageOffset: [-24, -58] // Anchor at the bottom center
    });

    map.geoObjects.add(customPlacemark);
}
