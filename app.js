/**
 * SwiftTools - WhatsApp Instant Chat
 * Core Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Country Data (Global Coverage)
    // ==========================================
    const countries = [
        { name: "South Africa", code: "27", flag: "🇿🇦", iso: "ZA" },
        { name: "United Kingdom", code: "44", flag: "🇬🇧", iso: "GB" },
        { name: "United States", code: "1", flag: "🇺🇸", iso: "US" },
        { name: "United Arab Emirates", code: "971", flag: "🇦🇪", iso: "AE" },
        { name: "Australia", code: "61", flag: "🇦🇺", iso: "AU" },
        { name: "India", code: "91", flag: "🇮🇳", iso: "IN" },
        { name: "Canada", code: "1", flag: "🇨🇦", iso: "CA" },
        { name: "Germany", code: "49", flag: "🇩🇪", iso: "DE" },
        { name: "Brazil", code: "55", flag: "🇧🇷", iso: "BR" },
        { name: "Netherlands", code: "31", flag: "🇳🇱", iso: "NL" },
        { name: "New Zealand", code: "64", flag: "🇳🇿", iso: "NZ" },
        { name: "Nigeria", code: "234", flag: "🇳🇬", iso: "NG" },
        { name: "Singapore", code: "65", flag: "🇸🇬", iso: "SG" },
        { name: "Spain", code: "34", flag: "🇪🇸", iso: "ES" },
        { name: "France", code: "33", flag: "🇫🇷", iso: "FR" },
        { name: "Italy", code: "39", flag: "🇮🇹", iso: "IT" },
        { name: "Mexico", code: "52", flag: "🇲🇽", iso: "MX" },
        { name: "Saudi Arabia", code: "966", flag: "🇸🇦", iso: "SA" },
        { name: "Ireland", code: "353", flag: "🇮🇪", iso: "IE" },
        { name: "Pakistan", code: "92", flag: "🇵🇰", iso: "PK" },
        { name: "Malaysia", code: "60", flag: "🇲🇾", iso: "MY" },
        { name: "Portugal", code: "351", flag: "🇵🇹", iso: "PT" },
        { name: "Israel", code: "972", flag: "🇮🇱", iso: "IL" }
    ].sort((a, b) => a.name.localeCompare(b.name));

    // Put South Africa first since it's our primary target demographic
    const saIdx = countries.findIndex(c => c.iso === "ZA");
    if (saIdx > -1) {
        const sa = countries.splice(saIdx, 1)[0];
        countries.unshift(sa);
    }

    // ==========================================
    // 2. State & DOM Elements
    // ==========================================
    let activeCountry = countries[0]; // Default to SA
    let qrCodeGenerator = null;

    const elements = {
        // Form inputs
        countrySelectWrapper: document.getElementById('countrySelectWrapper'),
        selectedFlag: document.getElementById('selectedFlag'),
        selectedCountryName: document.getElementById('selectedCountryName'),
        countryOptions: document.getElementById('countryOptions'),
        countrySearch: document.getElementById('countrySearch'),
        phoneNumber: document.getElementById('phoneNumber'),
        customMessage: document.getElementById('customMessage'),
        
        // Results Section
        resultsCard: document.getElementById('resultsCard'),
        generatedLink: document.getElementById('generatedLink'),
        btnCopy: document.getElementById('btnCopy'),
        btnLaunch: document.getElementById('btnLaunch'),
        btnDownloadQR: document.getElementById('btnDownloadQR'),
        qrCanvas: document.getElementById('qrCanvas'),
        
        // Visuals
        toast: document.getElementById('toast')
    };

    // ==========================================
    // 3. Setup Country Dropdown UI
    // ==========================================
    function buildCountryList(filterText = '') {
        elements.countryOptions.innerHTML = '';
        
        const filtered = countries.filter(c => 
            c.name.toLowerCase().includes(filterText.toLowerCase()) ||
            c.code.includes(filterText)
        );

        if (filtered.length === 0) {
            const empty = document.createElement('li');
            empty.className = 'option-item';
            empty.style.justifyContent = 'center';
            empty.style.color = 'var(--text-muted)';
            empty.textContent = 'No results found';
            elements.countryOptions.appendChild(empty);
            return;
        }

        filtered.forEach(c => {
            const li = document.createElement('li');
            li.className = 'option-item';
            li.innerHTML = `
                <span class="flag">${c.flag}</span>
                <span class="name">${c.name}</span>
                <span class="code">+${c.code}</span>
            `;
            
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                selectCountry(c);
                closeDropdown();
            });

            elements.countryOptions.appendChild(li);
        });
    }

    function selectCountry(country) {
        activeCountry = country;
        elements.selectedFlag.textContent = country.flag;
        elements.selectedCountryName.textContent = `${country.name} (+${country.code})`;
        updateOutput();
    }

    function toggleDropdown() {
        elements.countrySelectWrapper.classList.toggle('open');
        if (elements.countrySelectWrapper.classList.contains('open')) {
            elements.countrySearch.focus();
            elements.countrySearch.value = '';
            buildCountryList();
        }
    }

    function closeDropdown() {
        elements.countrySelectWrapper.classList.remove('open');
    }

    // Trigger click toggle
    elements.countrySelectWrapper.querySelector('.custom-select-trigger').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
    });

    // Global click out closes dropdown
    document.addEventListener('click', closeDropdown);
    elements.countrySelectWrapper.querySelector('.custom-options-container').addEventListener('click', (e) => {
        e.stopPropagation(); // Don't close when clicking search box
    });

    // Filtering Search Input
    elements.countrySearch.addEventListener('input', (e) => {
        buildCountryList(e.target.value);
    });

    // ==========================================
    // 4. Core Generation Engine
    // ==========================================
    function updateOutput() {
        const rawPhone = elements.phoneNumber.value.trim();
        const message = elements.customMessage.value.trim();
        
        // 1. Sanitize inputs (keep only numbers)
        let sanitizedPhone = rawPhone.replace(/\D/g, '');
        
        // 2. Strip leading zeroes (very common formatting mistake)
        if (sanitizedPhone.startsWith('0')) {
            sanitizedPhone = sanitizedPhone.substring(1);
        }

        // 3. If phone input is empty, revert to empty state UI
        if (!sanitizedPhone || sanitizedPhone.length < 5) {
            elements.resultsCard.classList.add('empty-state');
            return;
        }

        // 4. Formulate final WhatsApp URL
        const fullNumber = `${activeCountry.code}${sanitizedPhone}`;
        const waBase = `https://wa.me/${fullNumber}`;
        const encodedMessage = encodeURIComponent(message);
        
        const finalUrl = message ? `${waBase}?text=${encodedMessage}` : waBase;

        // 5. Update UI elements
        elements.resultsCard.classList.remove('empty-state');
        elements.generatedLink.value = finalUrl;
        elements.btnLaunch.href = finalUrl;

        // 6. Render QR Code
        renderQRCode(finalUrl);
    }

    function renderQRCode(data) {
        if (!qrCodeGenerator) {
            // Lazy load engine setup
            qrCodeGenerator = new QRious({
                element: elements.qrCanvas,
                value: data,
                size: 250,
                background: '#ffffff',
                foreground: '#0f172a',
                level: 'H' // High error correction
            });
        } else {
            qrCodeGenerator.value = data;
        }
    }

    // Event binding for inputs
    elements.phoneNumber.addEventListener('input', updateOutput);
    elements.customMessage.addEventListener('input', updateOutput);

    // ==========================================
    // 5. UI Actions & Feedback
    // ==========================================
    
    // Copy to Clipboard Action
    elements.btnCopy.addEventListener('click', () => {
        const text = elements.generatedLink.value;
        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
            showToast('Link copied to clipboard!');
            
            // Visual button feedback
            const icon = elements.btnCopy.querySelector('i');
            icon.className = 'fa-solid fa-check';
            icon.style.color = 'var(--primary)';
            
            setTimeout(() => {
                icon.className = 'fa-regular fa-copy';
                icon.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });

    // Download QR Action
    elements.btnDownloadQR.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = `wa-qr-code-${activeCountry.code}${elements.phoneNumber.value.replace(/\D/g, '')}.png`;
        link.href = elements.qrCanvas.toDataURL('image/png');
        link.click();
    });

    // Toast feedback helper
    let toastTimeout = null;
    function showToast(msg) {
        clearTimeout(toastTimeout);
        elements.toast.textContent = msg;
        elements.toast.classList.add('show');
        
        toastTimeout = setTimeout(() => {
            elements.toast.classList.remove('show');
        }, 2500);
    }

    // Initialize dropdown render list
    buildCountryList();
});
