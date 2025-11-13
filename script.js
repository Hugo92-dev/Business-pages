// Generic toggle function for "More info" buttons
function setupMoreInfoButtons() {
    // Get all coupon cards
    const cards = document.querySelectorAll('.coupon-card');

    cards.forEach((card) => {
        const moreInfoBtn = card.querySelector('.btn-more-info');
        const btnText = moreInfoBtn.querySelector('.btn-text');

        moreInfoBtn.addEventListener('click', () => {
            const isOpen = card.classList.contains('is-open');

            if (isOpen) {
                // Close
                card.classList.remove('is-open');
                moreInfoBtn.setAttribute('aria-expanded', 'false');
                btnText.textContent = 'More info';
            } else {
                // Open
                card.classList.add('is-open');
                moreInfoBtn.setAttribute('aria-expanded', 'true');
                btnText.textContent = 'Less info';
            }
        });
    });
}

// Generic copy promo code function
function setupPromoCodeBoxes() {
    const promoCodeBoxes = document.querySelectorAll('.promo-code-box');

    promoCodeBoxes.forEach((box) => {
        box.addEventListener('click', () => {
            const code = box.getAttribute('data-code');

            // Modern clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(code).then(() => {
                    showCopiedFeedback(box);
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
                    showCopiedFeedback(box);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
                document.body.removeChild(textArea);
            }
        });
    });
}

// Show copied feedback
function showCopiedFeedback(box) {
    box.classList.add('copied');
    setTimeout(() => {
        box.classList.remove('copied');
    }, 2000);
}

// Close all open cards on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openCards = document.querySelectorAll('.coupon-card.is-open');
        openCards.forEach((card) => {
            const moreInfoBtn = card.querySelector('.btn-more-info');
            const btnText = moreInfoBtn.querySelector('.btn-text');

            card.classList.remove('is-open');
            moreInfoBtn.setAttribute('aria-expanded', 'false');
            btnText.textContent = 'More info';
        });
    }
});

// Initialize all functionality
setupMoreInfoButtons();
setupPromoCodeBoxes();
