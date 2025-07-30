// Centralized Product Modal HTML
const productModalHTML = `
<div id="productModal" class="modal">
    <div class="modal-content">
      <span class="modal-close-btn">&times;</span>
      <img id="modal-img" src="" alt="Product Image">
      <h2 id="modal-title"></h2>
      <p id="modal-desc"></p>
      <button class="btn modal-quote-btn" onclick="window.location.href='contact.html?inquiry=product-quote'">
        <i class="fas fa-envelope"></i> Request Quote
      </button>
    </div>
  </div>
`;

// Function to load product modal
function loadProductModal() {
  document.body.insertAdjacentHTML('beforeend', productModalHTML);
}

// Load product modal when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadProductModal);
} else {
  loadProductModal();
}