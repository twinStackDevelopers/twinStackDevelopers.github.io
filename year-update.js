// Auto-update copyright year for all pages
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    
    console.log('TwinstackDevs - Year Update Loaded: ', currentYear);
    
    // Method 1: Update all elements with class "current-year"
    const yearElements = document.querySelectorAll('.current-year');
    if (yearElements.length > 0) {
        console.log(`Found ${yearElements.length} year element(s) to update`);
        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }
    
    // Method 2: Also check for hardcoded years in footer
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom && !yearElements.length) {
        // If no .current-year elements found, try to replace any year in footer
        const originalHTML = footerBottom.innerHTML;
        // Replace years like 2023, 2024, etc.
        const updatedHTML = originalHTML.replace(/\b20\d{2}\b/g, currentYear);
        if (updatedHTML !== originalHTML) {
            footerBottom.innerHTML = updatedHTML;
            console.log('Updated year in footer-bottom');
        }
    }
    
    // Method 3: Update any copyright year in the entire footer
    const footer = document.querySelector('footer');
    if (footer && !yearElements.length) {
        const footerText = document.querySelectorAll('footer p');
        footerText.forEach(p => {
            const text = p.textContent;
            // Check if contains © symbol and a year
            if (text.includes('©') && /\b20\d{2}\b/.test(text)) {
                const newText = text.replace(/\b20\d{2}\b/g, currentYear);
                p.textContent = newText;
                console.log('Updated copyright year in footer');
            }
        });
    }
});

// Backup update on window load
window.addEventListener('load', function() {
    const currentYear = new Date().getFullYear();
    const checkElements = document.querySelectorAll('.current-year');
    
    checkElements.forEach(el => {
        const yearText = parseInt(el.textContent);
        if (!isNaN(yearText) && yearText < currentYear) {
            el.textContent = currentYear;
            console.log('Backup year update applied');
        }
    });
});