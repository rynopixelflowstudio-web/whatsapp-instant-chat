/**
 * SwiftTools - WhatsApp Instant Chat
 * Core Application Logic with Automated Global Localization & Extended Country Coverage
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Extended Country Data (Top Global WhatsApp Regions)
    // ==========================================
    const countries = [
        { name: "South Africa", code: "27", flag: "🇿🇦", iso: "ZA" },
        { name: "United Kingdom", code: "44", flag: "🇬🇧", iso: "GB" },
        { name: "United States", code: "1", flag: "🇺🇸", iso: "US" },
        { name: "India", code: "91", flag: "🇮🇳", iso: "IN" },
        { name: "Brazil", code: "55", flag: "🇧🇷", iso: "BR" },
        { name: "Mexico", code: "52", flag: "🇲🇽", iso: "MX" },
        { name: "United Arab Emirates", code: "971", flag: "🇦🇪", iso: "AE" },
        { name: "Australia", code: "61", flag: "🇦🇺", iso: "AU" },
        { name: "Canada", code: "1", flag: "🇨🇦", iso: "CA" },
        { name: "Germany", code: "49", flag: "🇩🇪", iso: "DE" },
        { name: "France", code: "33", flag: "🇫🇷", iso: "FR" },
        { name: "Italy", code: "39", flag: "🇮🇹", iso: "IT" },
        { name: "Spain", code: "34", flag: "🇪🇸", iso: "ES" },
        { name: "Netherlands", code: "31", flag: "🇳🇱", iso: "NL" },
        { name: "Portugal", code: "351", flag: "🇵🇹", iso: "PT" },
        { name: "Argentina", code: "54", flag: "🇦🇷", iso: "AR" },
        { name: "Austria", code: "43", flag: "🇦🇹", iso: "AT" },
        { name: "Belgium", code: "32", flag: "🇧🇪", iso: "BE" },
        { name: "Chile", code: "56", flag: "🇨🇱", iso: "CL" },
        { name: "Colombia", code: "57", flag: "🇨🇴", iso: "CO" },
        { name: "Costa Rica", code: "506", flag: "🇨🇷", iso: "CR" },
        { name: "Czech Republic", code: "420", flag: "🇨🇿", iso: "CZ" },
        { name: "Denmark", code: "45", flag: "🇩🇰", iso: "DK" },
        { name: "Dominican Republic", code: "1", flag: "🇩🇴", iso: "DO" },
        { name: "Ecuador", code: "593", flag: "🇪🇨", iso: "EC" },
        { name: "Egypt", code: "20", flag: "🇪🇬", iso: "EG" },
        { name: "Finland", code: "358", flag: "🇫🇮", iso: "FI" },
        { name: "Greece", code: "30", flag: "🇬🇷", iso: "GR" },
        { name: "Hong Kong", code: "852", flag: "🇭🇰", iso: "HK" },
        { name: "Hungary", code: "36", flag: "🇭🇺", iso: "HU" },
        { name: "Indonesia", code: "62", flag: "🇮🇩", iso: "ID" },
        { name: "Ireland", code: "353", flag: "🇮🇪", iso: "IE" },
        { name: "Israel", code: "972", flag: "🇮🇱", iso: "IL" },
        { name: "Japan", code: "81", flag: "🇯🇵", iso: "JP" },
        { name: "Kenya", code: "254", flag: "🇰🇪", iso: "KE" },
        { name: "Kuwait", code: "965", flag: "🇰🇼", iso: "KW" },
        { name: "Malaysia", code: "60", flag: "🇲🇾", iso: "MY" },
        { name: "Morocco", code: "212", flag: "🇲🇦", iso: "MA" },
        { name: "New Zealand", code: "64", flag: "🇳🇿", iso: "NZ" },
        { name: "Nigeria", code: "234", flag: "🇳🇬", iso: "NG" },
        { name: "Norway", code: "47", flag: "🇳🇴", iso: "NO" },
        { name: "Oman", code: "968", flag: "🇴🇲", iso: "OM" },
        { name: "Pakistan", code: "92", flag: "🇵🇰", iso: "PK" },
        { name: "Peru", code: "51", flag: "🇵🇪", iso: "PE" },
        { name: "Philippines", code: "63", flag: "🇵🇭", iso: "PH" },
        { name: "Poland", code: "48", flag: "🇵🇱", iso: "PL" },
        { name: "Qatar", code: "974", flag: "🇶🇦", iso: "QA" },
        { name: "Romania", code: "40", flag: "🇷🇴", iso: "RO" },
        { name: "Saudi Arabia", code: "966", flag: "🇸🇦", iso: "SA" },
        { name: "Singapore", code: "65", flag: "🇸🇬", iso: "SG" },
        { name: "South Korea", code: "82", flag: "🇰🇷", iso: "KR" },
        { name: "Sweden", code: "46", flag: "🇸🇪", iso: "SE" },
        { name: "Switzerland", code: "41", flag: "🇨🇭", iso: "CH" },
        { name: "Thailand", code: "66", flag: "🇹🇭", iso: "TH" },
        { name: "Turkey", code: "90", flag: "🇹🇷", iso: "TR" },
        { name: "Uruguay", code: "598", flag: "🇺🇾", iso: "UY" },
        { name: "Venezuela", code: "58", flag: "🇻🇪", iso: "VE" },
        { name: "Vietnam", code: "84", flag: "🇻🇳", iso: "VN" }
    ].sort((a, b) => a.name.localeCompare(b.name));

    // Prioritize South Africa since it remains our cornerstone home market
    const saIdx = countries.findIndex(c => c.iso === "ZA");
    if (saIdx > -1) {
        const sa = countries.splice(saIdx, 1)[0];
        countries.unshift(sa);
    }

    // ==========================================
    // 2. Global Automated Localization Engine
    // ==========================================
    const translations = {
        en: {
            tagline: "Chat on WhatsApp without saving the number.",
            genTitle: "Link Generator",
            genHeader: "Create your direct chat link instantly.",
            labelSelectCountry: "Select Country",
            placeholderSearch: "Search country...",
            labelPhone: "Phone Number",
            inputTip: "Tip: No need to type the country code again.",
            labelMsg: "Custom Message (Optional)",
            msgPlaceholder: "Hi, I saw your listing and I'm interested!",
            emptyHeader: "Ready to Generate",
            emptyDesc: "Enter a phone number to generate your link and QR code.",
            labelDirectLink: "Your Direct Link",
            btnOpenChat: "Open Direct Chat",
            qrHeader: "QR Code Generator",
            btnDownloadQR: "Download QR Code",
            toastCopied: "Link copied to clipboard!",
            promoTitle: "💼 Losing clients to missed calls?",
            promoDesc: "Never lose a deal again. <strong>Leeed-AI</strong> automatically texts back missed calls <strong>directly on WhatsApp</strong>, captures inbound leads, and qualifies prospects instantly using AI.",
            promoBtn: "Explore Leeed-AI for Free"
        },
        es: {
            tagline: "Chatea en WhatsApp sin guardar el número.",
            genTitle: "Generador de Enlaces",
            genHeader: "Crea tu enlace de chat directo al instante.",
            labelSelectCountry: "Seleccionar País",
            placeholderSearch: "Buscar país...",
            labelPhone: "Número de Teléfono",
            inputTip: "Consejo: No necesitas escribir el código de país de nuevo.",
            labelMsg: "Mensaje Personalizado (Opcional)",
            msgPlaceholder: "¡Hola, vi tu anuncio y estoy interesado!",
            emptyHeader: "Listo para Generar",
            emptyDesc: "Introduce un número para generar tu enlace y código QR.",
            labelDirectLink: "Tu Enlace Directo",
            btnOpenChat: "Abrir Chat Directo",
            qrHeader: "Generador de Código QR",
            btnDownloadQR: "Descargar Código QR",
            toastCopied: "¡Enlace copiado al portapapeles!",
            promoTitle: "💼 ¿Pierdes clientes por llamadas perdidas?",
            promoDesc: "No pierdas más negocios. <strong>Leeed-AI</strong> responde automáticamente a las llamadas perdidas <strong>directamente en WhatsApp</strong>, capta contactos y califica prospectos al instante con IA.",
            promoBtn: "Explorar Leeed-AI Gratis"
        },
        pt: {
            tagline: "Converse no WhatsApp sem salvar o número.",
            genTitle: "Gerador de Links",
            genHeader: "Crie seu link de conversa direta instantaneamente.",
            labelSelectCountry: "Selecionar País",
            placeholderSearch: "Buscar país...",
            labelPhone: "Número de Telefone",
            inputTip: "Dica: Não é necessário digitar o código do país novamente.",
            labelMsg: "Mensagem Personalizada (Opcional)",
            msgPlaceholder: "Olá, vi seu anúncio e estou interessado!",
            emptyHeader: "Pronto para Gerar",
            emptyDesc: "Insira um número para gerar seu link e código QR.",
            labelDirectLink: "Seu Link Direto",
            btnOpenChat: "Abrir Conversa Direta",
            qrHeader: "Gerador de Código QR",
            btnDownloadQR: "Baixar Código QR",
            toastCopied: "Link copiado para a área de transferência!",
            promoTitle: "💼 Perdendo clientes com chamadas não atendidas?",
            promoDesc: "Nunca mais perca negócios. O <strong>Leeed-AI</strong> responde chamadas perdidas automaticamente <strong>diretamente no WhatsApp</strong>, captura contatos e qualifica potenciais clientes na hora com IA.",
            promoBtn: "Explorar Leeed-AI Grátis"
        },
        de: {
            tagline: "Chatten Sie auf WhatsApp, ohne die Nummer zu speichern.",
            genTitle: "Link-Generator",
            genHeader: "Erstellen Sie sofort Ihren direkten Chat-Link.",
            labelSelectCountry: "Land auswählen",
            placeholderSearch: "Land suchen...",
            labelPhone: "Telefonnummer",
            inputTip: "Tipp: Die Ländervorwahl muss nicht erneut eingegeben werden.",
            labelMsg: "Benutzerdefinierte Nachricht (Optional)",
            msgPlaceholder: "Hallo, ich habe Ihre Anzeige gesehen und bin interessiert!",
            emptyHeader: "Bereit zum Generieren",
            emptyDesc: "Geben Sie eine Telefonnummer ein, um Ihren Link und QR-Code zu erstellen.",
            labelDirectLink: "Ihr direkter Link",
            btnOpenChat: "Direkten Chat öffnen",
            qrHeader: "QR-Code-Generator",
            btnDownloadQR: "QR-Code herunterladen",
            toastCopied: "Link in die Zwischenablage kopiert!",
            promoTitle: "💼 Kunden durch verpasste Anrufe verlieren?",
            promoDesc: "Verpassen Sie nie wieder ein Geschäft. <strong>Leeed-AI</strong> antwortet bei verpassten Anrufen automatisch <strong>direkt auf WhatsApp</strong>, erfasst Leads und qualifiziert Interessenten sofort per KI.",
            promoBtn: "Leeed-AI kostenlos entdecken"
        },
        fr: {
            tagline: "Discutez sur WhatsApp sans enregistrer le numéro.",
            genTitle: "Générateur de Liens",
            genHeader: "Créez instantanément votre lien de discussion directe.",
            labelSelectCountry: "Choisissez le Pays",
            placeholderSearch: "Rechercher un pays...",
            labelPhone: "Numéro de Téléphone",
            inputTip: "Conseil : Pas besoin de taper à nouveau l'indicatif du pays.",
            labelMsg: "Message Personnalisé (Facultatif)",
            msgPlaceholder: "Bonjour, j'ai vu votre annonce et je suis intéressé !",
            emptyHeader: "Prêt à Générer",
            emptyDesc: "Entrez un numéro de téléphone pour générer votre lien et code QR.",
            labelDirectLink: "Votre Lien Direct",
            btnOpenChat: "Ouvrir le Chat Direct",
            qrHeader: "Générateur de Code QR",
            btnDownloadQR: "Télécharger le Code QR",
            toastCopied: "Lien copié dans le presse-papiers !",
            promoTitle: "💼 Vous perdez des clients sur appels manqués ?",
            promoDesc: "Ne perdez plus jamais de clients. <strong>Leeed-AI</strong> répond automatiquement aux appels manqués <strong>directement sur WhatsApp</strong>, capture les prospects et les qualifie instantanément avec l'IA.",
            promoBtn: "Découvrir Leeed-AI Gratuitement"
        }
    };

    let currentLang = 'en'; // Fallback default

    function autoLocalize() {
        const userLang = navigator.language || navigator.userLanguage;
        const shortCode = userLang.substring(0, 2).toLowerCase();

        if (translations[shortCode]) {
            currentLang = shortCode;
        }

        if (currentLang === 'en') return; // No translations needed for default English

        const dict = translations[currentLang];

        try {
            document.querySelector('.tagline').textContent = dict.tagline;
            document.querySelector('.form-section .card-header h2').innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> ${dict.genTitle}`;
            document.querySelector('.form-section .card-header p').textContent = dict.genHeader;
            document.querySelector('label[for="countrySearch"]').textContent = dict.labelSelectCountry;
            document.getElementById('countrySearch').placeholder = dict.placeholderSearch;
            document.querySelector('label[for="phoneNumber"]').textContent = dict.labelPhone;
            document.querySelector('.input-tip').textContent = dict.inputTip;
            document.querySelector('label[for="customMessage"]').textContent = dict.labelMsg;
            document.getElementById('customMessage').placeholder = dict.msgPlaceholder;
            
            document.querySelector('.empty-indicator h3').textContent = dict.emptyHeader;
            document.querySelector('.empty-indicator p').textContent = dict.emptyDesc;
            
            document.querySelector('.active-results .result-group label').textContent = dict.labelDirectLink;
            document.getElementById('btnLaunch').innerHTML = `<i class="fab fa-whatsapp"></i> ${dict.btnOpenChat}`;
            document.querySelector('.qr-divider span').textContent = dict.qrHeader;
            document.getElementById('btnDownloadQR').innerHTML = `<i class="fa-solid fa-cloud-arrow-down"></i> ${dict.btnDownloadQR}`;
            
            document.querySelector('.promo-title').textContent = dict.promoTitle;
            document.querySelector('.promo-desc').innerHTML = dict.promoDesc;
            document.querySelector('.promo-btn').innerHTML = `${dict.promoBtn} <i class="fa-solid fa-arrow-up-right-from-square"></i>`;
            
            // Initialize select name correctly based on initial active country
            elements.selectedCountryName.textContent = `${activeCountry.name} (+${activeCountry.code})`;
        } catch (e) {
            console.warn('Localization engine mapping node mismatch', e);
        }
    }

    // ==========================================
    // 3. State & DOM Elements
    // ==========================================
    let activeCountry = countries[0]; // Default to SA
    let qrCodeGenerator = null;

    const elements = {
        countrySelectWrapper: document.getElementById('countrySelectWrapper'),
        selectedFlag: document.getElementById('selectedFlag'),
        selectedCountryName: document.getElementById('selectedCountryName'),
        countryOptions: document.getElementById('countryOptions'),
        countrySearch: document.getElementById('countrySearch'),
        phoneNumber: document.getElementById('phoneNumber'),
        customMessage: document.getElementById('customMessage'),
        resultsCard: document.getElementById('resultsCard'),
        generatedLink: document.getElementById('generatedLink'),
        btnCopy: document.getElementById('btnCopy'),
        btnLaunch: document.getElementById('btnLaunch'),
        btnDownloadQR: document.getElementById('btnDownloadQR'),
        qrCanvas: document.getElementById('qrCanvas'),
        toast: document.getElementById('toast')
    };

    // ==========================================
    // 4. Setup Country Dropdown UI
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

    elements.countrySelectWrapper.querySelector('.custom-select-trigger').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
    });

    document.addEventListener('click', closeDropdown);
    elements.countrySelectWrapper.querySelector('.custom-options-container').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    elements.countrySearch.addEventListener('input', (e) => {
        buildCountryList(e.target.value);
    });

    // ==========================================
    // 5. Generation Logic
    // ==========================================
    function updateOutput() {
        const rawPhone = elements.phoneNumber.value.trim();
        const message = elements.customMessage.value.trim();
        let sanitizedPhone = rawPhone.replace(/\D/g, '');
        
        if (sanitizedPhone.startsWith('0')) {
            sanitizedPhone = sanitizedPhone.substring(1);
        }

        if (!sanitizedPhone || sanitizedPhone.length < 5) {
            elements.resultsCard.classList.add('empty-state');
            return;
        }

        const fullNumber = `${activeCountry.code}${sanitizedPhone}`;
        const waBase = `https://wa.me/${fullNumber}`;
        const encodedMessage = encodeURIComponent(message);
        const finalUrl = message ? `${waBase}?text=${encodedMessage}` : waBase;

        elements.resultsCard.classList.remove('empty-state');
        elements.generatedLink.value = finalUrl;
        elements.btnLaunch.href = finalUrl;

        renderQRCode(finalUrl);
    }

    function renderQRCode(data) {
        if (!qrCodeGenerator) {
            qrCodeGenerator = new QRious({
                element: elements.qrCanvas,
                value: data,
                size: 250,
                background: '#ffffff',
                foreground: '#0f172a',
                level: 'H'
            });
        } else {
            qrCodeGenerator.value = data;
        }
    }

    elements.phoneNumber.addEventListener('input', updateOutput);
    elements.customMessage.addEventListener('input', updateOutput);

    // ==========================================
    // 6. Actions & Clipboard
    // ==========================================
    elements.btnCopy.addEventListener('click', () => {
        const text = elements.generatedLink.value;
        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
            const copiedMsg = translations[currentLang] ? translations[currentLang].toastCopied : 'Copied to clipboard!';
            showToast(copiedMsg);
            
            const icon = elements.btnCopy.querySelector('i');
            icon.className = 'fa-solid fa-check';
            icon.style.color = 'var(--primary)';
            
            setTimeout(() => {
                icon.className = 'fa-regular fa-copy';
                icon.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Clipboard write failed: ', err);
        });
    });

    elements.btnDownloadQR.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = `wa-qr-code-${activeCountry.code}${elements.phoneNumber.value.replace(/\D/g, '')}.png`;
        link.href = elements.qrCanvas.toDataURL('image/png');
        link.click();
    });

    let toastTimeout = null;
    function showToast(msg) {
        clearTimeout(toastTimeout);
        elements.toast.textContent = msg;
        elements.toast.classList.add('show');
        
        toastTimeout = setTimeout(() => {
            elements.toast.classList.remove('show');
        }, 2500);
    }

    // ==========================================
    // 7. Initialize Engine
    // ==========================================
    autoLocalize();    // Step 1: Detect language & swap UI
    buildCountryList(); // Step 2: Build the dropdown UI
});
