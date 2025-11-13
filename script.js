// Get elements
const casinoCard = document.getElementById('casinoCard');
const moreInfoBtn = document.getElementById('moreInfoBtn');
const btnText = moreInfoBtn.querySelector('.btn-text');
const promoCodeBox = document.getElementById('promoCodeBox');

// Toggle function
function toggleDetails() {
    const isOpen = casinoCard.classList.contains('is-open');

    if (isOpen) {
        // Close
        casinoCard.classList.remove('is-open');
        moreInfoBtn.setAttribute('aria-expanded', 'false');
        btnText.textContent = 'More info';
    } else {
        // Open
        casinoCard.classList.add('is-open');
        moreInfoBtn.setAttribute('aria-expanded', 'true');
        btnText.textContent = 'Less info';
    }
}

// Copy promo code function
function copyPromoCode() {
    const code = promoCodeBox.getAttribute('data-code');

    // Modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
            showCopiedFeedback();
        }).catch((err) => {
            console.error('Failed to copy:', err);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showCopiedFeedback();
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        document.body.removeChild(textArea);
    }
}

// Show copied feedback
function showCopiedFeedback() {
    promoCodeBox.classList.add('copied');
    setTimeout(() => {
        promoCodeBox.classList.remove('copied');
    }, 2000);
}

// Event listeners
moreInfoBtn.addEventListener('click', toggleDetails);
promoCodeBox.addEventListener('click', copyPromoCode);

// Optional: Close on Escape key when open
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && casinoCard.classList.contains('is-open')) {
        toggleDetails();
    }
});
