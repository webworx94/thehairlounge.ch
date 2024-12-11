// JS-NAVIGATION
var menubtn = document.getElementById('menubtn');
        var navigation = document.getElementById('navigation');
        var menu = document.getElementById('menu');

        menubtn.onclick = function() {
        var computedStyle = window.getComputedStyle(navigation); // Aktuellen Wert der CSS-Eigenschaften erhalten
        var rightValue = computedStyle.getPropertyValue('right'); // Wert der 'right'-Eigenschaft erhalten

        if(rightValue === "-200px") {
            navigation.style.right = "0";
            menu.src = "https://thehairlounge.ch/images/cancel.png";
        } else {
            navigation.style.right = "-200px";
            menu.src = "https://thehairlounge.ch/images/menu.png";
        }
    }


    
// LOGO FILTER-INVERT
var logo = document.getElementById('logo');
        var homeSection = document.getElementById('home');
        var footer = document.querySelector('footer');
    
        window.onscroll = function() {
            var homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
            var logoBottom = logo.offsetTop + logo.offsetHeight;
            var footerTop = footer.offsetTop;
    
            if (window.scrollY + logoBottom > homeBottom && window.scrollY + logoBottom < footerTop) {
                logo.style.filter = 'invert(100%)';
            } else {
                logo.style.filter = 'none';
            }
        };



// GALLERIE
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const overlay = document.getElementById('overlay');
    const overlayImage = document.getElementById('overlay-image');
    const closeBtn = document.getElementById('close-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentImageIndex = 0;

    // Add click event listeners to each gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            const imgSrc = item.querySelector('img').getAttribute('src');
            overlayImage.setAttribute('src', imgSrc);
            overlay.style.display = 'flex';
            requestAnimationFrame(() => {
                overlay.classList.add('show');
            });
        });
    });

    // Close overlay when close button is clicked
    closeBtn.addEventListener('click', function() {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 1000); // 1s transition time
    });

    // Previous button functionality
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        const imgSrc = galleryItems[currentImageIndex].querySelector('img').getAttribute('src');
        overlayImage.setAttribute('src', imgSrc);
    });

    // Next button functionality
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        const imgSrc = galleryItems[currentImageIndex].querySelector('img').getAttribute('src');
        overlayImage.setAttribute('src', imgSrc);
    });

    // Close overlay on outside click
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 1000); // 1s transition time
        }
    });

    // Keyboard navigation (left/right arrows)
    document.addEventListener('keydown', function(event) {
        if (overlay.classList.contains('show')) {
            if (event.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (event.key === 'ArrowRight') {
                nextBtn.click();
            } else if (event.key === 'Escape') {
                closeBtn.click();
            }
        }
    });

    // Handle responsive grid layout
    function handleResponsiveGrid() {
        const width = window.innerWidth;
        const galleryGrid = document.querySelector('.gallery-grid');
        if (width >= 1000) {
            galleryGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        } else if (width >= 700) {
            galleryGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            galleryGrid.style.gridTemplateColumns = '1fr';
        }
    }

    window.addEventListener('resize', handleResponsiveGrid);
    handleResponsiveGrid(); // Initial call
});



/// ZUM FORMULAR RUNTERGELANGEN
document.getElementById('form-sender').addEventListener('click', function() {
    const form = document.getElementById('myForm');
    const nameInput = form.querySelector('input[name="Name"]');
    form.scrollIntoView({ behavior: 'smooth' });
    nameInput.focus();
});

// WEITERLEITUNG NACH ERFOLGREICHEM SENDEN
function handleFormSubmit() {
    // Prevents the default form submission
    event.preventDefault(); 
    
    // Perform an AJAX request to the form action URL
    const form = event.target;
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: form.method,
        body: formData,
    })
    .then(response => {
        if (response.ok) {
            // Redirect to the confirmation page
            window.location.href = "https://thehairlounge.ch/gesendet/"; 
        } else {
            alert("Es gab ein Problem beim Senden des Formulars. Bitte versuchen Sie es erneut.");
        }
    })
    .catch(error => {
        alert("Es gab ein Problem beim Senden des Formulars. Bitte versuchen Sie es erneut.");
    });
    
    return false; // Prevent default form submission
    }


    // TAB-PROBLEM VON IMPORTANT-INPUTS ÃœBERSPRINGEN
document.addEventListener("DOMContentLoaded", function() {
    // Setze das tabindex fÃ¼r Honeypot-Felder auf -1, damit sie beim Tabben Ã¼bersprungen werden.
    document.getElementById("user_address").setAttribute("tabindex", "-1");
    document.getElementById("confirm_email").setAttribute("tabindex", "-1");
    document.getElementById("company_name").setAttribute("tabindex", "-1");
    document.getElementById("feedback_notes").setAttribute("tabindex", "-1");
    document.getElementById("referral_code").setAttribute("tabindex", "-1");

    // Verhindere das Hochscrollen bei Umschalt-Taste (Shift) + Tab
    document.addEventListener("keydown", function(event) {
        if (event.shiftKey && event.key === "Tab") {
            let focusableElements = document.querySelectorAll("input:not([tabindex='-1']), textarea:not([tabindex='-1'])");
            let currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
            if (currentIndex > 0) {
                // Wenn Shift + Tab gedrÃ¼ckt wird, gehe zum vorherigen Nicht-Honeypot-Element
                focusableElements[currentIndex - 1].focus();
                event.preventDefault();
            }
        }
    });
});