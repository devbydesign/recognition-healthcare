document.addEventListener('DOMContentLoaded', function() {

  // ==============================================
  // --- GLOBAL & NAVIGATION ---
  // ==============================================

  // Set current year in footer
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Mobile Menu Toggle
  const menuButton = document.getElementById('mobile-menu');
  const navList = document.getElementById('nav-list');

  if (menuButton && navList) {
    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', !isExpanded);
      navList.classList.toggle('active');
      menuButton.innerHTML = navList.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuButton.contains(e.target) && !navList.contains(e.target) && navList.classList.contains('active')) {
        navList.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.innerHTML = '☰';
      }
    });
    
    // Close mobile menu when a link is clicked
     navList.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && !e.target.closest('.dropdown')) {
        navList.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.innerHTML = '☰';
      }
    });
  }

  // Enhanced Dropdown Functionality (Desktop + Mobile)
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('a');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
      // Add click functionality for both desktop and mobile
      dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = dropdownMenu.classList.contains('show');
        
        // Close all other dropdowns
        document.querySelectorAll('.dropdown').forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            const otherMenu = otherDropdown.querySelector('.dropdown-menu');
            if (otherMenu) {
              otherMenu.classList.remove('show');
              otherMenu.style.display = '';
              otherDropdown.classList.remove('active');
            }
          }
        });
        
        // Toggle current dropdown
        if (isOpen) {
          dropdownMenu.classList.remove('show');
          dropdownMenu.style.display = '';
          dropdown.classList.remove('active');
        } else {
          dropdownMenu.classList.add('show');
          dropdownMenu.style.display = 'block';
          dropdown.classList.add('active');
        }
      }, true);
      
      // Close dropdown when clicking an item
      dropdownMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          dropdownMenu.classList.remove('show');
          dropdownMenu.style.display = '';
          dropdown.classList.remove('active');
        }
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
          menu.classList.remove('show');
          menu.style.display = '';
          dropdown.classList.remove('active');
        }
      });
    }
  });

  // Reset dropdown styles on desktop resize
  window.addEventListener('resize', () => {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      const menu = dropdown.querySelector('.dropdown-menu');
      if (menu) {
        menu.classList.remove('show');
        menu.style.display = '';
        dropdown.classList.remove('active');
      }
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // ==============================================
  // --- SITE-WIDE FEATURES ---
  // ==============================================
  
  // Initialize search form functionality
  const searchForms = document.querySelectorAll('.search-form');
  searchForms.forEach(form => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const searchInput = this.querySelector('input[type="search"]');
      const searchTerm = searchInput.value.trim().toLowerCase();
      if (!searchTerm) {
        alert('Please enter a search term');
        return;
      }
      // Redirect to a potential search results page or handle on-page
      window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`;
    });
  });

  // Initialize accordion functionality
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      content.classList.toggle('active');
    });
  });
  
  // Initialize main contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      if (!name || !email || !message) {
        alert('Please fill out all fields');
        return;
      }
      alert(`Thank you for your message, ${name}! We will get back to you soon.`);
      contactForm.reset();
    });
  }


  // ==============================================
  // --- SITE-WIDE MODAL FOR PRODUCT DETAILS ---
  // ==============================================

  const productModal = document.getElementById('productModal');
  if (productModal) {
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalCloseBtn = productModal.querySelector('.modal-close-btn');
    const modalQuoteBtn = productModal.querySelector('.modal-quote-btn');

    // Function to open the modal
    function openProductModal(card) {
      if (!card) return;
      const title = card.dataset.title || 'Product Details';
      const img = card.dataset.img || 'assets/images/RBBMarketingLogo.png';
      const desc = card.dataset.desc || 'No description available.';

      modalImg.src = img;
      modalImg.alt = title;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      
      const quoteLink = `contact.html?product=${encodeURIComponent(title)}`;
      modalQuoteBtn.href = quoteLink;
      
      productModal.style.display = 'block';
      setTimeout(() => productModal.classList.add('show'), 10);
      document.body.style.overflow = 'hidden';
    }

    // Function to close the modal
    function closeProductModal() {
      productModal.classList.remove('show');
      setTimeout(() => {
        productModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }, 300); // Match transition speed
    }

    // Attach event listener to all 'view-details' buttons
    document.body.addEventListener('click', function(e) {
      const detailsButton = e.target.closest('.view-details');
      if (detailsButton) {
        const card = detailsButton.closest('.product-card');
        if (card) {
          openProductModal(card);
        }
      }
    });
    
    // Also handle clicks on the card itself, if it doesn't have a button
    document.body.addEventListener('click', function(e) {
        const card = e.target.closest('.product-card');
        // Only trigger if the click is on a card that DOESN'T contain a .view-details button
        if (card && !card.querySelector('.view-details')) {
             openProductModal(card);
        }
    });

    // Close modal events
    if(modalCloseBtn) modalCloseBtn.addEventListener('click', closeProductModal);
    productModal.addEventListener('click', function(e) {
      if (e.target === productModal) {
        closeProductModal();
      }
    });
  }


  // ==============================================
  // --- SHARED FUNCTIONALITY FOR FEATURE PAGES ---
  // ==============================================
  
  // Handle localStorage features with user feedback - designed for Program Builder 1
  window.handleFeatureAdditionWithFeedback = (button, event) => {
    if(event) event.preventDefault();
    const featureName = button.dataset.featureName;
    const redirectUrl = button.dataset.href;
    
    // Check if we're adding to Program Builder 1 (build-program.html)
    const isAddingToProgramBuilder1 = redirectUrl && redirectUrl.includes('build-program.html');
    
    // Load features for both builders
    let selectedFeatures = [];
    let selectedFeatures2 = [];
    try {
      const stored = localStorage.getItem('selectedFeatures');
      if (stored) selectedFeatures = JSON.parse(stored);
      
      const stored2 = localStorage.getItem('selectedFeatures2');
      if (stored2) selectedFeatures2 = JSON.parse(stored2);
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }

    // Special handling for custom recognition feature
    if (featureName === 'Custom Recognition') {
      const customName = prompt('Enter your custom recognition program name:');
      if (customName && customName.trim()) {
        const customFeatureName = `Custom: ${customName.trim()}`;
        if (!selectedFeatures.includes(customFeatureName)) {
          selectedFeatures.push(customFeatureName);
          selectedFeatures2.push(customFeatureName);
          try {
            localStorage.setItem('selectedFeatures', JSON.stringify(selectedFeatures));
            localStorage.setItem('selectedFeatures2', JSON.stringify(selectedFeatures2));
            
            // For Program Builder 1, we need to preserve existing canvas state 
            // Note: Custom features require manual addition in Program Builder 1, 
            // so we don't automatically add them to canvas state
            if (isAddingToProgramBuilder1) {
              console.log('Custom feature added - user will need to add manually in Program Builder 1:', customFeatureName);
            }
            
            button.innerHTML = '<i class="fas fa-check-circle"></i> Added!';
            button.disabled = false;
            button.classList.add('btn-added');
            button.style.backgroundColor = '';
            button.style.boxShadow = '';
            
            if (redirectUrl) {
               setTimeout(() => {
                   window.location.href = redirectUrl;
               }, 400); 
            }
          } catch (e) {
            console.error('Error saving to localStorage:', e);
            button.innerHTML = 'Error!';
          }
        } else {
          alert('This custom feature has already been added to your program.');
          if (redirectUrl) {
            window.location.href = redirectUrl;
          }
        }
      } else {
        alert('Please enter a name for your custom recognition program.');
      }
      return;
    }

    if (isAddingToProgramBuilder1) {
      // Only add to Program Builder 1 storage
      const isAlreadyAdded = selectedFeatures.includes(featureName);
      if (!isAlreadyAdded) {
        selectedFeatures.push(featureName);
        try {
          localStorage.setItem('selectedFeatures', JSON.stringify(selectedFeatures));
          
          // Get current canvas state
          let existingCanvasState = [];
          try {
            const canvasState = localStorage.getItem('programBuilderCanvas');
            if (canvasState) {
              existingCanvasState = JSON.parse(canvasState);
            }
          } catch (e) {
            console.error('Error reading existing canvas state:', e);
          }
          
          // Map feature name to module ID
          const featureToModuleId = {
            'Welcome Kits': 'welcome',
            'Years of Service Recognition': 'anniversary', 
            'Performance Recognition': 'performance',
            'Wellness Programs': 'wellness',
            'Spot Recognition': 'spot',
            'Peer-to-Peer': 'peer',
            'Point-Based Rewards': 'points',
            'General Awards': 'awards',
            'Incentive Programs': 'incentives',
            'Attendance Recognition': 'attendance',
            'Safety Recognition': 'safety',
            'Community Impact': 'community',
            'Patient Care Recognition': 'patient-care',
            'Volunteer Recognition': 'volunteer'
          };
          
          const newModuleId = featureToModuleId[featureName];
          if (newModuleId && !existingCanvasState.includes(newModuleId)) {
            existingCanvasState.push(newModuleId);
            localStorage.setItem('programBuilderCanvas', JSON.stringify(existingCanvasState));
            console.log('Added new feature to existing canvas state:', featureName, '-> module ID:', newModuleId);
          }
          
          button.innerHTML = '<i class="fas fa-check-circle"></i> Added!';
          button.disabled = false; // Keep enabled so it can still be clicked
          button.classList.add('btn-added');
          button.style.backgroundColor = '';
          button.style.boxShadow = '';
          
          if (redirectUrl) {
             // Redirect after a short delay to allow user to see feedback
             setTimeout(() => {
                 window.location.href = redirectUrl;
             }, 400); 
          }
          
        } catch (e) {
          console.error('Error saving to localStorage:', e);
          button.innerHTML = 'Error!';
        }
      } else {
        // Feature already added, but still allow navigation to program builder
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      }
    } else {
      // Adding to Program Builder 2 storage only
      const isAlreadyAdded = selectedFeatures2.includes(featureName);
      if (!isAlreadyAdded) {
        selectedFeatures2.push(featureName);
        try {
          localStorage.setItem('selectedFeatures2', JSON.stringify(selectedFeatures2));
          
          button.innerHTML = '<i class="fas fa-check-circle"></i> Added!';
          button.disabled = false; // Keep enabled so it can still be clicked
          button.classList.add('btn-added');
          button.style.backgroundColor = '';
          button.style.boxShadow = '';
          
          if (redirectUrl) {
             // Redirect after a short delay to allow user to see feedback
             setTimeout(() => {
                 window.location.href = redirectUrl;
             }, 400); 
          }
          
        } catch (e) {
          console.error('Error saving to localStorage:', e);
          button.innerHTML = 'Error!';
        }
      } else {
        // Feature already added, but still allow navigation to program builder
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      }
    }
  };

  // Updates button states on page load to reflect what's in Program Builder 1
  function updateProgramButtonsState() {
    const buttons = document.querySelectorAll('[data-feature-name]');
    if (buttons.length === 0) return;
    
    // Check if we're on a feature page that should redirect to Program Builder 1
    const isProgramBuilder1Flow = Array.from(buttons).some(btn => 
      btn.dataset.href && btn.dataset.href.includes('build-program.html')
    );
    
    if (!isProgramBuilder1Flow) {
      // If not Program Builder 1 flow, fall back to localStorage check
      let selectedFeatures = [];
      try {
        const stored = localStorage.getItem('selectedFeatures');
        if (stored) selectedFeatures = JSON.parse(stored);
      } catch (e) {
        console.error('Error reading localStorage:', e);
        return;
      }
      
      buttons.forEach(button => {
          const featureName = button.dataset.featureName;
          if (selectedFeatures.includes(featureName)) {
              button.innerHTML = '<i class="fas fa-check-circle"></i> Added - View Program';
              button.classList.add('btn-added');
              button.style.backgroundColor = '';
              button.style.boxShadow = '';
              button.disabled = false; // Keep enabled so users can still navigate
          }
      });
      return;
    }
    
    // For Program Builder 1 flow, check both localStorage and expected canvas state
    let selectedFeatures = [];
    try {
      const stored = localStorage.getItem('selectedFeatures');
      if (stored) selectedFeatures = JSON.parse(stored);
    } catch (e) {
      console.error('Error reading localStorage:', e);
      return;
    }
    
    // Also check if there's a saved canvas state that might override localStorage
    let canvasFeatures = [];
    try {
      const canvasState = localStorage.getItem('programBuilderCanvas');
      if (canvasState) {
        const moduleIds = JSON.parse(canvasState);
        // Convert module IDs back to feature names for comparison
        const moduleToFeatureName = {
          'welcome': 'Welcome Kits',
          'anniversary': 'Years of Service Recognition',
          'performance': 'Performance Recognition',
          'wellness': 'Wellness Programs',
          'spot': 'Spot Recognition',
          'peer': 'Peer-to-Peer',
          'points': 'Point-Based Rewards',
          'awards': 'General Awards',
          'incentives': 'Incentive Programs',
          'attendance': 'Attendance Recognition',
          'safety': 'Safety Recognition',
          'community': 'Community Impact',
          'patient-care': 'Patient Care Recognition',
          'volunteer': 'Volunteer Recognition'
        };
        canvasFeatures = moduleIds.map(id => moduleToFeatureName[id]).filter(Boolean);
      }
    } catch (e) {
      console.error('Error reading canvas state:', e);
    }
    
    // Use canvas state if it exists, otherwise use selectedFeatures
    const featuresInProgram = canvasFeatures.length > 0 ? canvasFeatures : selectedFeatures;
    console.log('Program Builder 1 button state check:', { selectedFeatures, canvasFeatures, featuresInProgram });
    
    buttons.forEach(button => {
        const featureName = button.dataset.featureName;
        if (featuresInProgram.includes(featureName)) {
            button.innerHTML = '<i class="fas fa-check-circle"></i> Added - View Program';
            button.classList.add('btn-added');
            button.style.backgroundColor = '';
            button.style.boxShadow = '';
            button.disabled = false; // Keep enabled so users can still navigate
        }
    });
  }

  // Call the new function on page load to set initial button states
  updateProgramButtonsState();


  // ==============================================
  // --- PROGRAM BUILDER 1 (build-program.html) ---
  // ==============================================

  const isProgramBuilderPage = document.getElementById('module-palette');

  if (isProgramBuilderPage) {
    const modulePalette = document.getElementById('module-palette');
    const canvasDropzone = document.getElementById('canvas-dropzone');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const planDetailsForm = document.getElementById('plan-details-form');
    const planSummarySection = document.getElementById('plan-summary-section');
    const summaryModulesList = planSummarySection.querySelector('#summary-modules-list');
    const summaryContactInfo = planSummarySection.querySelector('#summary-contact-info');
    const saveButton = document.getElementById('save-program-btn');
    const startOverButton = document.getElementById('start-over-btn');
    const captchaQuestionSpan = document.getElementById('captcha-question');
    const captchaNum1Input = document.getElementById('captcha-num1');
    const captchaNum2Input = document.getElementById('captcha-num2');
    const captchaInput = document.getElementById('captcha');
    const dropzonePlaceholder = canvasDropzone.querySelector('.dropzone-placeholder');

    let draggedModule = null;
    let touchOffset = { x: 0, y: 0 };
    let isDragging = false;
    let touchDragElement = null;
    let selectedFeatures = [];
    
    // Initialize selectedFeatures from localStorage
    try {
      const stored = localStorage.getItem('selectedFeatures');
      if (stored) {
        const featuresArray = JSON.parse(stored);
        // Normalize feature names to handle legacy naming inconsistencies
        selectedFeatures = featuresArray.map(feature => {
          if (feature === 'Incentives') {
            console.log('Normalized legacy feature name in build-program.html:', feature, '-> Incentive Programs');
            return 'Incentive Programs';
          }
          if (feature === 'Years of Service') {
            console.log('Normalized legacy feature name in build-program.html:', feature, '-> Years of Service Recognition');
            return 'Years of Service Recognition';
          }
          if (feature === 'Performance Bonuses') {
            console.log('Normalized legacy feature name in build-program.html:', feature, '-> Performance Recognition');
            return 'Performance Recognition';
          }
          return feature;
        });
        
        // Save normalized features back to localStorage if changes were made
        if (JSON.stringify(featuresArray) !== JSON.stringify(selectedFeatures)) {
          localStorage.setItem('selectedFeatures', JSON.stringify(selectedFeatures));
          console.log('Updated localStorage with normalized feature names from build-program.html');
        }
      }
    } catch (e) {
      console.error('Error reading selectedFeatures from localStorage:', e);
    }

    // Function to update modal button state
    function updateModalButtonState() {
      const modal = document.getElementById('feature-modal');
      const modalAddToProgram = document.getElementById('modal-add-to-program');
      
      if (!modal || !modalAddToProgram) return;
      
      const currentFeatureKey = modal.dataset.currentFeature;
      
      if (currentFeatureKey && currentFeatureKey !== 'custom') {
        const featureNameMap = {
          'welcome': 'Welcome Kits',
          'service': 'Years of Service Recognition',
          'performance': 'Performance Recognition',
          'wellness': 'Wellness Programs',
          'spot': 'Spot Recognition',
          'peer': 'Peer-to-Peer',
          'points': 'Point-Based Rewards',
          'awards': 'General Awards',
          'incentives': 'Incentive Programs',
          'attendance': 'Attendance Recognition',
          'safety': 'Safety Recognition',
          'community': 'Community Impact',
          'patient-care': 'Patient Care Recognition',
          'volunteer': 'Volunteer Recognition'
        };
        
        const featureName = featureNameMap[currentFeatureKey];
        const isAlreadyAdded = selectedFeatures.includes(featureName);
        
        if (isAlreadyAdded) {
          modalAddToProgram.innerHTML = '✓ Added';
          modalAddToProgram.disabled = true;
          modalAddToProgram.style.setProperty('background-color', '#23456C', 'important');
          modalAddToProgram.style.setProperty('border-color', '#23456C', 'important');
          modalAddToProgram.style.setProperty('color', 'white', 'important');
          modalAddToProgram.style.setProperty('opacity', '1', 'important');
        } else {
          modalAddToProgram.textContent = 'Add to Program';
          modalAddToProgram.disabled = false;
          modalAddToProgram.style.backgroundColor = '';
          modalAddToProgram.style.borderColor = '';
          modalAddToProgram.style.color = '';
        }
      }
    }

    // Mobile touch support for drag and drop
    function addTouchSupport(element) {
      element.addEventListener('touchstart', handleTouchStart, { passive: false });
      element.addEventListener('touchmove', handleTouchMove, { passive: false });
      element.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    function handleTouchStart(e) {
      if (e.target.closest('.see-details-btn') || e.target.closest('.remove-btn')) return;
      
      e.preventDefault();
      const touch = e.touches[0];
      const element = e.currentTarget;
      
      // Only allow dragging from palette modules
      if (!element.classList.contains('program-module')) return;
      if (element.style.display === 'none') return;
      
      isDragging = true;
      draggedModule = element;
      
      // Create a visual clone for dragging
      touchDragElement = element.cloneNode(true);
      touchDragElement.style.position = 'fixed';
      touchDragElement.style.pointerEvents = 'none';
      touchDragElement.style.zIndex = '9999';
      touchDragElement.style.opacity = '0.8';
      touchDragElement.style.transform = 'scale(0.9)';
      touchDragElement.style.width = element.offsetWidth + 'px';
      touchDragElement.style.height = element.offsetHeight + 'px';
      
      const rect = element.getBoundingClientRect();
      touchOffset.x = touch.clientX - rect.left;
      touchOffset.y = touch.clientY - rect.top;
      
      touchDragElement.style.left = (touch.clientX - touchOffset.x) + 'px';
      touchDragElement.style.top = (touch.clientY - touchOffset.y) + 'px';
      
      document.body.appendChild(touchDragElement);
      element.style.opacity = '0.5';
    }

    function handleTouchMove(e) {
      if (!isDragging || !touchDragElement) return;
      
      e.preventDefault();
      const touch = e.touches[0];
      
      touchDragElement.style.left = (touch.clientX - touchOffset.x) + 'px';
      touchDragElement.style.top = (touch.clientY - touchOffset.y) + 'px';
      
      // Visual feedback for drop zones
      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
      const dropzone = elementBelow?.closest('#canvas-dropzone');
      
      if (dropzone) {
        canvasDropzone.classList.add('drag-over');
      } else {
        canvasDropzone.classList.remove('drag-over');
      }
    }

    function handleTouchEnd(e) {
      if (!isDragging || !touchDragElement) return;
      
      e.preventDefault();
      const touch = e.changedTouches[0];
      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
      const dropzone = elementBelow?.closest('#canvas-dropzone');
      
      // Clean up visual elements
      if (touchDragElement) {
        touchDragElement.remove();
        touchDragElement = null;
      }
      
      if (draggedModule) {
        draggedModule.style.opacity = '';
      }
      
      canvasDropzone.classList.remove('drag-over');
      
      // Handle drop
      if (dropzone && draggedModule) {
        const droppedModuleId = draggedModule.dataset.moduleId;
        const alreadyExists = canvasDropzone.querySelector(`[data-module-id="${droppedModuleId}"]`);
        
        if (!alreadyExists) {
          const clonedNode = draggedModule.cloneNode(true);
          const newCanvasItem = document.createElement('div');
          newCanvasItem.classList.add('canvas-item');
          newCanvasItem.dataset.moduleId = droppedModuleId;
          newCanvasItem.innerHTML = `
            <div class="canvas-item-content">
                <div class="canvas-item-left">
                    <i class="${clonedNode.querySelector('i').className}"></i>
                    <span>${clonedNode.querySelector('.module-title').innerText}</span>
                </div>
                <div class="canvas-item-right">
                    <button class="see-details-btn canvas-see-details" data-feature="${clonedNode.querySelector('.see-details-btn').dataset.feature}">See Details</button>
                    <button class="remove-btn">✕</button>
                </div>
            </div>`;

          canvasDropzone.appendChild(newCanvasItem);
          addCanvasListeners(newCanvasItem);
          
          // Update selectedFeatures array
          const moduleTitle = clonedNode.querySelector('.module-title').innerText;
          if (!selectedFeatures.includes(moduleTitle)) {
            selectedFeatures.push(moduleTitle);
            try {
              localStorage.setItem('selectedFeatures', JSON.stringify(selectedFeatures));
            } catch (e) {
              console.error('Error saving selectedFeatures to localStorage:', e);
            }
          }
          
          updateProgramStrength();
          saveCanvasState();
        }
      }
      
      isDragging = false;
      draggedModule = null;
    }

    function syncPaletteVisibility() {
      const modulesOnCanvas = canvasDropzone.querySelectorAll('.canvas-item');
      const canvasModuleIds = new Set(Array.from(modulesOnCanvas).map(m => m.dataset.moduleId));

      modulePalette.querySelectorAll('.program-module').forEach(pModule => {
        // Keep custom feature always visible for multiple additions
        if (pModule.dataset.moduleId === 'custom') {
          pModule.style.display = 'flex';
        } else {
          pModule.style.display = canvasModuleIds.has(pModule.dataset.moduleId) ? 'none' : 'flex';
        }
      });
      if (dropzonePlaceholder) {
        dropzonePlaceholder.style.display = modulesOnCanvas.length > 0 ? 'none' : 'block';
      }
    }

    function addCanvasListeners(moduleElement) {
        // Right-click to remove
        moduleElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to remove this module?')) {
                const moduleId = moduleElement.dataset.moduleId;
                const moduleTitle = moduleElement.querySelector('.canvas-item-left span').innerText.trim();
                
                // Remove from selectedFeatures array
                const index = selectedFeatures.indexOf(moduleTitle);
                if (index > -1) {
                    selectedFeatures.splice(index, 1);
                    try {
                        localStorage.setItem('selectedFeatures', JSON.stringify(selectedFeatures));
                    } catch (e) {
                        console.error('Error saving selectedFeatures to localStorage:', e);
                    }
                }
                
                // Clean up custom feature data if it's a custom feature
                if (moduleId && moduleId.startsWith('custom-')) {
                    localStorage.removeItem(`custom_feature_${moduleId}`);
                }
                moduleElement.remove();
                updateProgramStrength();
                saveCanvasState();
            }
        });
        
        // Drag from canvas to remove
        moduleElement.draggable = true;
        moduleElement.addEventListener('dragstart', (e) => {
           draggedModule = e.target;
           setTimeout(() => e.target.classList.add('dragging'), 0);
        });
        moduleElement.addEventListener('dragend', (e) => {
           e.target.classList.remove('dragging');
        });

        // See Details button functionality for canvas items
        const seeDetailsBtn = moduleElement.querySelector('.canvas-see-details');
        if (seeDetailsBtn) {
          seeDetailsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const featureKey = this.dataset.feature;
            const moduleId = moduleElement.dataset.moduleId;
            
            // Check if this is a custom feature
            if (featureKey === 'custom' && moduleId && moduleId.startsWith('custom-')) {
              showCustomFeatureModal(moduleId);
              return;
            }
            
            const feature = featureData[featureKey];
            
            if (feature && modal) {
              // Populate modal content
              modalTitle.textContent = feature.title;
              modalIcon.className = feature.icon;
              modalDescription.innerHTML = feature.description;
              
              // Product section titles
              const productTitles = {
                'welcome': 'Package It Like a Gift',
                'service': 'Years of Service Ideas',
                'performance': 'Reward Excellence',
                'wellness': 'Nurture Their Well-Being',
                'spot': 'Make It Memorable',
                'peer': 'Share the Appreciation',
                'points': 'Choose Your Rewards',
                'awards': 'Honor Their Excellence',
                'incentives': 'Motivate Success',
                'attendance': 'Build Reliability',
                'safety': 'Promote Safety',
                'community': 'Honor Service',
                'patient-care': 'Recognize Patient Care'
              };
              
              // Update the products section title
              const modalProductsTitle = document.querySelector('.modal-products h3');
              if (modalProductsTitle && productTitles[featureKey]) {
                modalProductsTitle.textContent = productTitles[featureKey];
              }
              
              modalProductsGrid.innerHTML = '';
              
              // Remove any existing customize and CTA sections
              const existingCustomizeSection = document.querySelector('.modal-customize-section');
              if (existingCustomizeSection) {
                existingCustomizeSection.remove();
              }
              const existingCtaSection = document.querySelector('.modal-cta-section');
              if (existingCtaSection) {
                existingCtaSection.remove();
              }
              
              feature.products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'modal-product-card';
                productCard.innerHTML = `
                  <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='assets/images/RBBMarketingLogo.png'">
                  <h4>${product.name}</h4>
                `;
                modalProductsGrid.appendChild(productCard);
              });

              // Add CTA section for Years of Service
              if (featureKey === 'service') {
                const ctaSection = document.createElement('div');
                ctaSection.className = 'modal-cta-section';
                ctaSection.innerHTML = `
                  <div style="margin-top: 2rem; padding: 30px; background-color: #f8f9fa; border: 2px solid var(--primary-color); border-radius: 8px; text-align: center;">
                    <h4 style="margin-bottom: 1rem; color: var(--primary-color); font-size: 1.6rem;">How Are You Going To Present It?</h4>
                    <p style="margin: 0; font-weight: bold; font-size: 1.1em; color: #333;">In Person • Newsletter • Monthly Department Meeting • Deliver</p>
                    <p style="margin: 0.5rem 0 0 0; font-style: italic; color: #666;">Make every milestone moment memorable with the perfect presentation approach.</p>
                  </div>
                `;
                
                // Insert after the main products section
                const modalProducts = document.querySelector('.modal-products');
                if (modalProducts) {
                  modalProducts.insertAdjacentElement('afterend', ctaSection);
                }
              }
              
              // Add customize section for welcome kits and years of service
              if ((featureKey === 'welcome' || featureKey === 'service') && feature.customizeProducts) {
                const customizeSection = document.createElement('div');
                customizeSection.className = 'modal-customize-section';
                const customizeTitle = featureKey === 'service' ? 'Customize it: Personal and Public' : 'Customize to Fit Your Audience and Your Brand';
                customizeSection.innerHTML = `
                  <h3>${customizeTitle}</h3>
                  <div class="modal-customize-grid">
                    ${feature.customizeProducts.map(product => `
                      <div class="modal-product-card">
                        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='assets/images/RBBMarketingLogo.png'">
                        <h4>${product.name}</h4>
                      </div>
                    `).join('')}
                  </div>
                `;
                
                // Insert after the main products section
                const modalProducts = document.querySelector('.modal-products');
                if (modalProducts) {
                  modalProducts.insertAdjacentElement('afterend', customizeSection);
                }
              }
              
              // Store the current feature key for modal handlers
              modal.dataset.currentFeature = featureKey;
              
              // Update the modal button state since this feature is already added to canvas
              const modalAddToProgram = document.getElementById('modal-add-to-program');
              if (modalAddToProgram) {
                modalAddToProgram.dataset.customHandler = 'false';
                modalAddToProgram.onclick = null;
                
                // Since this is from canvas, the feature is already added
                modalAddToProgram.innerHTML = '<i class="fas fa-check"></i> Added';
                modalAddToProgram.classList.add('added');
                modalAddToProgram.disabled = true;
                modalAddToProgram.style.setProperty('background-color', '#23456C', 'important');
                modalAddToProgram.style.setProperty('border-color', '#23456C', 'important');
                modalAddToProgram.style.setProperty('color', 'white', 'important');
                modalAddToProgram.style.setProperty('opacity', '1', 'important');
              }
              
              // Show modal
              modal.style.display = 'block';
              document.body.style.overflow = 'hidden';
            }
          });
        }
    }

    modulePalette.querySelectorAll('.program-module').forEach(module => {
      module.addEventListener('dragstart', (e) => {
        if (e.target.style.display === 'none') {
          e.preventDefault();
          return;
        }
        draggedModule = e.target;
        e.dataTransfer.setData('text/plain', e.target.dataset.moduleId);
      });
      
      // Add touch support for mobile
      addTouchSupport(module);
    });
    
    // Add dragover listener to palette to act as a removal dropzone
    modulePalette.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });
    
    modulePalette.addEventListener('drop', (e) => {
        if (draggedModule && draggedModule.classList.contains('canvas-item')) {
            draggedModule.remove();
            updateProgramStrength();
            saveCanvasState();
        }
    });

    canvasDropzone.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('remove-btn')) {
            const canvasItem = e.target.closest('.canvas-item');
            if (canvasItem) {
                const moduleId = canvasItem.dataset.moduleId;
                const moduleTitle = canvasItem.querySelector('.canvas-item-left span').innerText.trim();
                
                // Remove from selectedFeatures array
                const index = selectedFeatures.indexOf(moduleTitle);
                if (index > -1) {
                    selectedFeatures.splice(index, 1);
                    try {
                        localStorage.setItem('selectedFeatures', JSON.stringify(selectedFeatures));
                    } catch (e) {
                        console.error('Error saving selectedFeatures to localStorage:', e);
                    }
                }
                
                // Clean up custom feature data if it's a custom feature
                if (moduleId && moduleId.startsWith('custom-')) {
                    localStorage.removeItem(`custom_feature_${moduleId}`);
                }
                canvasItem.remove();
                updateProgramStrength();
                saveCanvasState();
                
                // Update modal button state if modal is open
                if (modal && modal.style.display === 'block') {
                    setTimeout(() => {
                        updateModalButtonState();
                    }, 100);
                }
            }
        }
    });

    canvasDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (draggedModule && draggedModule.classList.contains('program-module')) {
        e.dataTransfer.dropEffect = 'copy';
        canvasDropzone.classList.add('drag-over');
      }
    });

    canvasDropzone.addEventListener('dragleave', () => {
      canvasDropzone.classList.remove('drag-over');
    });

    canvasDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      canvasDropzone.classList.remove('drag-over');
      if (!draggedModule || !draggedModule.classList.contains('program-module')) return;

      const droppedModuleId = draggedModule.dataset.moduleId;
      const alreadyExists = canvasDropzone.querySelector(`[data-module-id="${droppedModuleId}"]`);
      if (alreadyExists) return;

      const clonedNode = draggedModule.cloneNode(true);
      const newCanvasItem = document.createElement('div');
      newCanvasItem.classList.add('canvas-item');
      newCanvasItem.dataset.moduleId = droppedModuleId;
      newCanvasItem.innerHTML = `
        <div class="canvas-item-content">
            <div class="canvas-item-left">
                <i class="${clonedNode.querySelector('i').className}"></i>
                <span>${clonedNode.querySelector('.module-title').innerText}</span>
            </div>
            <div class="canvas-item-right">
                <button class="see-details-btn canvas-see-details" data-feature="${clonedNode.querySelector('.see-details-btn').dataset.feature}">See Details</button>
                <button class="remove-btn">✕</button>
            </div>
        </div>`;

      canvasDropzone.appendChild(newCanvasItem);
      addCanvasListeners(newCanvasItem);
      
      // Update selectedFeatures array
      const moduleTitle = clonedNode.querySelector('.module-title').innerText;
      if (!selectedFeatures.includes(moduleTitle)) {
        selectedFeatures.push(moduleTitle);
        try {
          localStorage.setItem('selectedFeatures', JSON.stringify(selectedFeatures));
        } catch (e) {
          console.error('Error saving selectedFeatures to localStorage:', e);
        }
      }
      
      updateProgramStrength();
      saveCanvasState();
      draggedModule = null;
      
      // Update modal button state if modal is open
      if (modal && modal.style.display === 'block') {
          setTimeout(() => {
              updateModalButtonState();
          }, 100);
      }
    });

    function updateProgramStrength() {
      const count = canvasDropzone.querySelectorAll('.canvas-item').length;
      let widthPercent = 0;
      let text = 'Add features to see strength';
      if (count === 1) { widthPercent = 33; text = 'Good start!'; }
      else if (count === 2) { widthPercent = 66; text = 'Getting stronger!'; }
      else if (count >= 3) { widthPercent = 100; text = 'Great foundation!'; }
      strengthBar.style.width = `${widthPercent}%`;
      strengthText.textContent = text;
    }

    function saveCanvasState() {
      const moduleData = Array.from(canvasDropzone.querySelectorAll('.canvas-item')).map(m => m.dataset.moduleId);
      localStorage.setItem('programBuilderCanvas', JSON.stringify(moduleData));
      syncPaletteVisibility();
    }

    function loadCanvasState() {
      const savedState = localStorage.getItem('programBuilderCanvas');
      if (!savedState) {
          // Check if features were added from feature pages
          loadFeaturesFromSelectedFeatures();
          return;
      }
      const moduleIds = JSON.parse(savedState);
      if (moduleIds.length === 0) {
           // Check if features were added from feature pages
           loadFeaturesFromSelectedFeatures();
           return;
      }

      moduleIds.forEach(id => {
        // Check if this is a custom feature
        if (id.startsWith('custom-')) {
          const customFeatureData = localStorage.getItem(`custom_feature_${id}`);
          if (customFeatureData) {
            const customData = JSON.parse(customFeatureData);
            const newCanvasItem = document.createElement('div');
            newCanvasItem.classList.add('canvas-item');
            newCanvasItem.dataset.moduleId = id;
            newCanvasItem.innerHTML = `
              <div class="canvas-item-content">
                  <div class="canvas-item-left">
                      <i class="fas fa-edit"></i>
                      <span>${customData.title}</span>
                  </div>
                  <div class="canvas-item-right">
                      <button class="see-details-btn canvas-see-details" data-feature="custom">Edit Details</button>
                      <button class="remove-btn">✕</button>
                  </div>
              </div>`;
            canvasDropzone.appendChild(newCanvasItem);
            addCanvasListeners(newCanvasItem);
          }
        } else {
          const paletteModule = modulePalette.querySelector(`[data-module-id="${id}"]`);
          if (paletteModule) {
            const clonedNode = paletteModule.cloneNode(true);
            const newCanvasItem = document.createElement('div');
            newCanvasItem.classList.add('canvas-item');
            newCanvasItem.dataset.moduleId = id;
             newCanvasItem.innerHTML = `
              <div class="canvas-item-content">
                  <div class="canvas-item-left">
                      <i class="${clonedNode.querySelector('i').className}"></i>
                      <span>${clonedNode.querySelector('.module-title').innerText}</span>
                  </div>
                  <div class="canvas-item-right">
                      <button class="see-details-btn canvas-see-details" data-feature="${clonedNode.querySelector('.see-details-btn').dataset.feature}">See Details</button>
                      <button class="remove-btn">✕</button>
                  </div>
              </div>`;
            canvasDropzone.appendChild(newCanvasItem);
            addCanvasListeners(newCanvasItem);
          }
        }
      });
      updateProgramStrength();
      syncPaletteVisibility();
    }

    // New function to load features from selectedFeatures localStorage
    function loadFeaturesFromSelectedFeatures() {
      if (selectedFeatures.length === 0) {
        addDefaultModule();
        return;
      }

      // Feature name to module ID mapping
      const featureToModuleId = {
        'Welcome Kits': 'welcome',
        'Years of Service Recognition': 'anniversary', 
        'Performance Recognition': 'performance',
        'Wellness Programs': 'wellness',
        'Spot Recognition': 'spot',
        'Peer-to-Peer': 'peer',
        'Point-Based Rewards': 'points',
        'General Awards': 'awards',
        'Incentive Programs': 'incentives',
        'Attendance Recognition': 'attendance',
        'Safety Recognition': 'safety',
        'Community Impact': 'community',
        'Patient Care Recognition': 'patient-care',
        'Volunteer Recognition': 'volunteer'
      };

      let featuresAdded = false;

      selectedFeatures.forEach(featureName => {
        // Handle custom features
        if (featureName.startsWith('Custom: ')) {
          // Custom features need special handling - we'll skip them for now
          // since they require more complex setup
          console.log('Skipping custom feature for auto-population:', featureName);
          return;
        }

        const moduleId = featureToModuleId[featureName];
        if (moduleId) {
          const paletteModule = modulePalette.querySelector(`[data-module-id="${moduleId}"]`);
          if (paletteModule) {
            const clonedNode = paletteModule.cloneNode(true);
            const newCanvasItem = document.createElement('div');
            newCanvasItem.classList.add('canvas-item');
            newCanvasItem.dataset.moduleId = moduleId;
            newCanvasItem.innerHTML = `
              <div class="canvas-item-content">
                  <div class="canvas-item-left">
                      <i class="${clonedNode.querySelector('i').className}"></i>
                      <span>${clonedNode.querySelector('.module-title').innerText}</span>
                  </div>
                  <div class="canvas-item-right">
                      <button class="see-details-btn canvas-see-details" data-feature="${clonedNode.querySelector('.see-details-btn').dataset.feature}">See Details</button>
                      <button class="remove-btn">✕</button>
                  </div>
              </div>`;
            canvasDropzone.appendChild(newCanvasItem);
            addCanvasListeners(newCanvasItem);
            featuresAdded = true;
          }
        } else {
          console.log('No module mapping found for feature:', featureName);
        }
      });

      if (featuresAdded) {
        updateProgramStrength();
        syncPaletteVisibility();
        saveCanvasState(); // Save the populated canvas to localStorage
        console.log('Auto-populated canvas with features from feature pages');
      } else {
        addDefaultModule();
      }
    }
    
    function addDefaultModule() {
        if(canvasDropzone.querySelectorAll('.canvas-item').length > 0) return;
        const welcomeModule = modulePalette.querySelector(`[data-module-id="welcome"]`);
        if (welcomeModule) {
            draggedModule = welcomeModule; // Temporarily set for drop function
            canvasDropzone.dispatchEvent(new Event('drop'));
        }
    }

    if (startOverButton) {
      startOverButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your program plan?')) {
          canvasDropzone.innerHTML = '';
          if (dropzonePlaceholder) canvasDropzone.appendChild(dropzonePlaceholder);
          localStorage.removeItem('programBuilderCanvas');
          
          // Clear selectedFeatures array and localStorage for Program Builder 1 integration
          selectedFeatures.length = 0;
          localStorage.removeItem('selectedFeatures');
          console.log('Cleared selectedFeatures for Program Builder 1 integration');
          
          updateProgramStrength();
          syncPaletteVisibility();
          planSummarySection.style.display = 'none';
        }
      });
    }
    
    if (saveButton) {
        saveButton.addEventListener('click', () => {
           const contactSection = document.getElementById('contact-delivery-section');
           if (contactSection) {
               populateFormFeatures();
               generateCaptcha();
               contactSection.style.display = 'block';
               contactSection.scrollIntoView({ behavior: 'smooth' });
           }
        });
    }
    
    // Populate selected features in form
    function populateFormFeatures() {
        const formFeaturesList = document.getElementById('form-features-list');
        if (!formFeaturesList) return;

        // Feature descriptions for the form display
        const featureDescriptions = {
          'Welcome Kits': 'A vital first step to improving your employee well-being and efficiency',
          'Years of Service Recognition': 'Building loyalty and recognition that strengthens your organizational foundation',
          'Performance Recognition': 'Driving excellence through targeted rewards that motivate and inspire',
          'Wellness Programs': 'Promoting health and vitality that enhances both personal and professional success',
          'Spot Recognition': 'Creating positive momentum through immediate acknowledgment of exceptional work',
          'Peer-to-Peer': 'Fostering a culture of appreciation where team members celebrate each other',
          'Point-Based Rewards': 'Flexible reward systems that maximize satisfaction through employee choice and engagement',
          'General Awards': 'Formal recognition programs that create memorable moments and inspire excellence',
          'Incentive Programs': 'Strategic programs that drive specific behaviors and accelerate goal achievement',
          'Attendance Recognition': 'Building reliability culture and reducing absenteeism through consistent recognition',
          'Safety Recognition': 'Creating safety champions and preventing workplace incidents through proactive recognition',
          'Community Impact': 'Building purpose-driven culture through recognition of volunteer and community engagement',
          'Patient Care Recognition': 'Recognizing exceptional patient care and fostering a culture of empathy',
          'Volunteer Recognition': 'Celebrating employee volunteerism to enhance engagement and organizational purpose'
        };

        formFeaturesList.innerHTML = '';
        
        const canvasItems = canvasDropzone.querySelectorAll('.canvas-item');
        if (canvasItems.length === 0) {
          formFeaturesList.innerHTML = '<p style="text-align: center; opacity: 0.8;">No features selected yet</p>';
          return;
        }

        canvasItems.forEach(item => {
          const title = item.querySelector('.canvas-item-left span').innerText.trim();
          const moduleId = item.dataset.moduleId;
          
          const featureItem = document.createElement('div');
          featureItem.className = 'form-feature-item';
          
          // Check if this is a custom feature and get its description
          if (title.startsWith('Custom: ')) {
            let customDescription = '';
            
            // First try to get from the specific module data
            if (moduleId && moduleId.startsWith('custom-')) {
                const customFeatureData = localStorage.getItem(`custom_feature_${moduleId}`);
                if (customFeatureData) {
                    const customData = JSON.parse(customFeatureData);
                    customDescription = customData.description || '';
                }
            }
            
            // Fallback to the old method
            if (!customDescription) {
                const customName = title.replace('Custom: ', '');
                customDescription = localStorage.getItem(`custom_desc_${customName}`) || '';
            }
            
            featureItem.innerHTML = `
              <h4>${title}</h4>
              <p>${customDescription || 'A tailored recognition program designed specifically for your organization'}</p>
            `;
          } else {
            // Get feature data for product images
            const featureKey = getFeatureKeyFromName(title);
            const featureInfo = featureData[featureKey];
            
            let productImagesHTML = '';
            if (featureInfo && featureInfo.products) {
              const productImages = featureInfo.products.slice(0, 4).map(product => 
                `<img src="${product.image}" alt="${product.name}" class="feature-product-thumb">`
              ).join('');
              productImagesHTML = `<div class="feature-product-images">${productImages}</div>`;
            }
            
            featureItem.innerHTML = `
              <h4>${title}</h4>
              <p>${featureDescriptions[title] || 'Enhancing your employee recognition program with proven strategies'}</p>
              ${productImagesHTML}
            `;
          }
          
          formFeaturesList.appendChild(featureItem);
        });
    }

    function generateCaptcha() {
        if (!captchaQuestionSpan) return;
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        captchaQuestionSpan.textContent = `${num1} + ${num2}`;
        captchaNum1Input.value = num1;
        captchaNum2Input.value = num2;
        captchaInput.value = '';
    }

    if (planDetailsForm) {
      planDetailsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('first-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const captchaAnswer = parseInt(captchaInput.value, 10);
        const num1 = parseInt(captchaNum1Input.value, 10);
        const num2 = parseInt(captchaNum2Input.value, 10);

        if (isNaN(captchaAnswer) || captchaAnswer !== (num1 + num2)) {
            alert('Incorrect security check answer. Please try again.');
            generateCaptcha();
            return;
        }

        if (!firstName || !email) {
            alert('Please fill in your First Name and Email.');
            return;
        }

        const selectedModuleNames = Array.from(canvasDropzone.querySelectorAll('.canvas-item')).map(m => {
            const title = m.querySelector('.canvas-item-left span').innerText.trim();
            const moduleId = m.dataset.moduleId;
            
            // Check if this is a custom feature and get its description
            if (title.startsWith('Custom: ')) {
                // First try to get from the specific module data
                if (moduleId && moduleId.startsWith('custom-')) {
                    const customFeatureData = localStorage.getItem(`custom_feature_${moduleId}`);
                    if (customFeatureData) {
                        const customData = JSON.parse(customFeatureData);
                        if (customData.description) {
                            return `${title}\nDescription: ${customData.description}`;
                        }
                    }
                }
                
                // Fallback to the old method
                const customName = title.replace('Custom: ', '');
                const customDescription = localStorage.getItem(`custom_desc_${customName}`);
                if (customDescription) {
                    return `${title}\nDescription: ${customDescription}`;
                }
            }
            return title;
        });
        
        if (selectedModuleNames.length === 0) {
            alert('Please add at least one module to your program plan.');
            return;
        }

        if(planSummarySection) {
            const summaryLogo = `<img src="assets/images/RBBMarketingLogo.png" alt="StayVisible Logo" style="max-width: 200px; margin-bottom: 20px;">`;
            const whatsNext = `
                <h3>What's Next:</h3>
                <ul>
                    <li>We are generating a mailto link for you to send your plan.</li>
                    <li>We'll reach out shortly after receiving your email!</li>
                </ul>`;
            
            const summaryTitle = planSummarySection.querySelector('.summary-header h2');
            if (summaryTitle) {
                summaryTitle.textContent = `Your customized Selection`;
            }
            
            // Feature links mapping for Browse Incentives buttons
            const featureLinks = {
                'Welcome Kits': 'https://www.rbbmarketing.com/:quicksearch.htm?quicksearchbox=Welcome+Kits&LoP=&HiP=',
                'Years of Service': 'https://www.rbbmarketing.com/:quicksearch.htm?quicksearchbox=service+award&LoP=&HiP=',
                'Performance Bonuses': 'https://rbbmarketing-clientportal.com/sub_category_post/incentives-employee/',
                'Wellness Programs': 'https://promomonster-clientportal.com/sub_category_post/health-and-wellness-all-products/',
                'Spot Recognition': 'https://promomonster-clientportal.com/sub_category_post/employee-appreciation-all-products/',
                'Peer-to-Peer': 'https://promomonster-clientportal.com/sub_category_post/back-to-work-desk/',
                'Point-Based Rewards': 'https://promomonster-clientportal.com/simple_product/merchandise-incentive-program-2/',
                'General Awards': 'https://www.rbbmarketing.com/awards-recognition-paper-weights-crystal.htm',
                'Incentive Programs': 'https://promomonster-clientportal.com/sub_category_post/incentives-employee/',
                'Attendance Recognition': 'https://promomonster-clientportal.com/sub_category_post/employee-appreciation-merchandise-drinkware/',
                'Safety Recognition': 'https://promomonster-clientportal.com/sub_category_post/employee-appreciation-merchandise-apparel/',
                'Community Impact': 'https://promomonster-clientportal.com/sub_category_post/incentives-all-products/',
                'Custom Recognition': 'https://promomonster-clientportal.com/sub_category_post/incentives-all-products/',
                'Patient Care Recognition': 'https://promomonster-clientportal.com/sub_category_post/incentives-all-products/',
                'Volunteer Recognition': 'https://promomonster-clientportal.com/sub_category_post/incentives-all-products/'
            };
            
            summaryModulesList.innerHTML = selectedModuleNames.map(name => {
                // Format custom features with descriptions nicely
                if (name.includes('\nDescription: ')) {
                    const parts = name.split('\nDescription: ');
                    const customTitle = parts[0];
                    const customDesc = parts[1];
                    const browseLink = featureLinks['Custom Recognition'];
                    return `
                        <li class="feature-summary-item">
                            <div class="feature-summary-output no-images">
                                <div class="feature-summary-left">
                                <strong>${customTitle}</strong>
                                <div class="custom-description">Description: ${customDesc}</div>
                                </div>
                                <div class="feature-summary-right">
                                    <a href="${browseLink}" target="_blank" class="browse-incentives-btn">Browse Incentives</a>
                                </div>
                            </div>
                        </li>`;
                }
                
                // Check if this is a custom feature without description in the name
                if (name.startsWith('Custom: ')) {
                    const customName = name.replace('Custom: ', '');
                    const customDescription = localStorage.getItem(`custom_desc_${customName}`);
                    const browseLink = featureLinks['Custom Recognition'];
                    if (customDescription) {
                        return `
                            <li class="feature-summary-item">
                                <div class="feature-summary-output no-images">
                                    <div class="feature-summary-left">
                                    <strong>${name}</strong>
                                    <div class="custom-description">Description: ${customDescription}</div>
                                    </div>
                                    <div class="feature-summary-right">
                                        <a href="${browseLink}" target="_blank" class="browse-incentives-btn">Browse Incentives</a>
                                    </div>
                                </div>
                            </li>`;
                    } else {
                        return `
                            <li class="feature-summary-item">
                                <div class="feature-summary-output no-images">
                                    <div class="feature-summary-left">
                                    <strong>${name}</strong>
                                    </div>
                                    <div class="feature-summary-right">
                                        <a href="${browseLink}" target="_blank" class="browse-incentives-btn">Browse Incentives</a>
                                    </div>
                                </div>
                            </li>`;
                    }
                }
                
                // Get feature key for regular features
                const featureKey = getFeatureKeyFromName(name);
                const feature = featureData[featureKey];
                const browseLink = featureLinks[name] || featureLinks['Custom Recognition'];
                
                if (feature && feature.products) {
                    const productImages = feature.products.slice(0, 4).map(product => 
                        `<img src="${product.image}" alt="${product.name}">`
                    ).join('');
                    
                    return `
                        <li class="feature-summary-item">
                            <div class="feature-summary-output">
                                <div class="feature-summary-left">
                                <strong>${name}</strong>
                                    <div class="summary-feature-images">
                                    ${productImages}
                                    </div>
                                </div>
                                <div class="feature-summary-right">
                                    <a href="${browseLink}" target="_blank" class="browse-incentives-btn">Browse Incentives</a>
                                </div>
                            </div>
                        </li>`;
                }
                
                return `
                    <li class="feature-summary-item">
                        <div class="feature-summary-output">
                            <div class="feature-summary-left">
                                <strong>${name}</strong>
                            </div>
                            <div class="feature-summary-right">
                                <a href="${browseLink}" target="_blank" class="browse-incentives-btn">Browse Incentives</a>
                            </div>
                        </div>
                    </li>`;
            }).join('');
            const lastName = document.getElementById('last-name').value.trim();
            const companyName = document.getElementById('company-name').value.trim();
            
            summaryContactInfo.innerHTML = `<strong>Name:</strong> ${firstName} ${lastName}<br><strong>Company:</strong> ${companyName}<br><strong>Email:</strong> ${email}${phone ? `<br><strong>Phone:</strong> ${phone}` : ''}`;
            
            const getStartedFaster = planSummarySection.querySelector('.get-started-faster');
            if (getStartedFaster) {
                getStartedFaster.style.display = 'block';
            }

            planSummarySection.style.display = 'block';
            planSummarySection.scrollIntoView({ behavior: 'smooth' });
        }
        
        const subject = `Program Plan Submission from ${firstName} ${lastName}`;
        const body = `New Program Plan Request:\n\nSelected Modules:\n- ${selectedModuleNames.join('\n- ')}\n\nContact Information:\nName: ${firstName} ${lastName}\nCompany: ${companyName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}`;
        const mailtoLink = `mailto:rbadiner@rbbmarketing.com,theresa@stayvisible.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 1000);

        generateCaptcha();
      });
    }

    // Custom feature modal functionality
    function showCustomFeatureModal(moduleId) {
      const customFeatureData = localStorage.getItem(`custom_feature_${moduleId}`);
      let customData = { title: 'Custom Feature', description: '' };
      
      if (customFeatureData) {
        customData = JSON.parse(customFeatureData);
      }
      
      if (modal) {
        // Populate modal content for custom feature
        modalTitle.textContent = 'Edit Custom Feature';
        modalIcon.className = 'fas fa-edit';
        
        // Create custom editing form
        modalDescription.innerHTML = `
          <div class="custom-edit-form">
            <div class="custom-form-group">
              <label for="edit-custom-name">Feature Title*</label>
              <input type="text" id="edit-custom-name" value="${customData.title.replace('Custom: ', '')}" required>
            </div>
            <div class="custom-form-group">
              <label for="edit-custom-description">Description</label>
              <textarea id="edit-custom-description" rows="4" placeholder="Describe what this recognition program will accomplish...">${customData.description || ''}</textarea>
            </div>
          </div>
        `;
        
        // Clear products section
        modalProductsGrid.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">Custom features are tailored to your specific needs. We\'ll work with you to select the perfect products and rewards.</p>';
        
        // Update the products section title
        const modalProductsTitle = document.querySelector('.modal-products h3');
        if (modalProductsTitle) {
          modalProductsTitle.textContent = 'Your Custom Program';
        }
        
        // Create update button
        const modalActions = document.querySelector('.modal-actions');
        if (modalActions) {
          modalActions.innerHTML = `
            <button id="update-custom-feature" class="btn" data-module-id="${moduleId}">Update Feature</button>
            <button id="modal-close-custom" class="btn btn-outline">Close</button>
          `;
          
          // Add event listeners
          const updateBtn = document.getElementById('update-custom-feature');
          const closeBtn = document.getElementById('modal-close-custom');
          
          if (updateBtn) {
            updateBtn.addEventListener('click', function() {
              updateCustomFeature(moduleId);
            });
          }
          
          if (closeBtn) {
            closeBtn.addEventListener('click', function() {
              modal.style.display = 'none';
              document.body.style.overflow = 'auto';
            });
          }
        }
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    }
    
    // Update custom feature function
    function updateCustomFeature(moduleId) {
      const nameInput = document.getElementById('edit-custom-name');
      const descInput = document.getElementById('edit-custom-description');
      
      if (!nameInput || !nameInput.value.trim()) {
        alert('Please enter a feature title.');
        if (nameInput) nameInput.focus();
        return;
      }
      
      const newTitle = nameInput.value.trim();
      const newDescription = descInput ? descInput.value.trim() : '';
      const customFeatureName = `Custom: ${newTitle}`;
      
      // Update the stored data
      const customFeatureData = {
        title: customFeatureName,
        description: newDescription,
        moduleId: moduleId
      };
      localStorage.setItem(`custom_feature_${moduleId}`, JSON.stringify(customFeatureData));
      
      // Also store in the old format for compatibility
      localStorage.setItem(`custom_desc_${newTitle}`, newDescription);
      
      // Update the canvas item display
      const canvasItem = document.querySelector(`[data-module-id="${moduleId}"]`);
      if (canvasItem) {
        const titleSpan = canvasItem.querySelector('.canvas-item-left span');
        if (titleSpan) {
          titleSpan.textContent = customFeatureName;
        }
      }
      
      // Update the selectedFeatures array if it exists
      if (typeof selectedFeatures !== 'undefined') {
        // Remove old entry and add new one
        const oldEntries = selectedFeatures.filter(f => f.includes('Custom:'));
        oldEntries.forEach(entry => {
          const index = selectedFeatures.indexOf(entry);
          if (index > -1) {
            selectedFeatures.splice(index, 1);
          }
        });
        selectedFeatures.push(customFeatureName);
        try {
          localStorage.setItem('selectedFeatures', JSON.stringify(selectedFeatures));
        } catch (e) {
          console.error('Error saving selectedFeatures to localStorage:', e);
        }
      }
      
      // Save canvas state
      saveCanvasState();
      
      // Close modal
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    // Helper function to get feature key from display name
    function getFeatureKeyFromName(name) {
        const nameMapping = {
            'Welcome Kits': 'welcome',
            'Years of Service Recognition': 'service',
            'Performance Recognition': 'performance',
            'Wellness Programs': 'wellness',
            'Spot Recognition': 'spot',
            'Peer-to-Peer': 'peer',
            'Point-Based Rewards': 'points',
            'General Awards': 'awards',
            'Incentive Programs': 'incentives',
            'Incentives': 'incentives', // Fallback for build-program.html title text
            'Attendance Recognition': 'attendance',
            'Safety Recognition': 'safety',
            'Community Impact': 'community',
            'Patient Care Recognition': 'patient-care',
            'Volunteer Recognition': 'volunteer',
            // Legacy fallbacks for old naming
            'Years of Service': 'service',
            'Performance Bonuses': 'performance'
        };
        const result = nameMapping[name] || null;
        
        // Debug logging for unmapped features
        if (!result && name && !name.startsWith('Custom:')) {
            console.warn('No mapping found for feature name:', name);
        }
        
        return result;
    }

    // Feature modal data for See Details functionality
    const featureData = {
      welcome: {
        title: "Welcome Kits",
        icon: "fas fa-gift",
        description: `
          <p>First impressions matter more than ever in today's competitive talent market. A thoughtfully crafted welcome kit sets the tone for an employee's entire journey with your organization.</p>
          
          <h4>Why Welcome Kits Drive Success</h4>
          <!-- Source: https://www.shrm.org/hr-today/news/hr-magazine/pages/0914-onboarding.aspx -->
          <p>Research from the Society for Human Resource Management (SHRM) shows that new employees who went through a structured onboarding program were <span class="stat-highlight stat-tooltip">69% more likely to remain<span class="tooltip-content">Source: SHRM</span></span> with the company for up to three years.</p>
          
          <h4>Proven Benefits</h4>
          <!-- Source: https://www.globenewswire.com/news-release/2011/11/17/459702/238734/en/Onboarding-2011-The-Path-to-Productivity.html -->
          <p>Organizations with a standard onboarding process see <span class="stat-highlight stat-tooltip">54% greater new-hire productivity<span class="tooltip-content">Source: Aberdeen Group</span></span> and <span class="stat-highlight stat-tooltip">50% greater new-hire retention<span class="tooltip-content">Source: Aberdeen Group</span></span> according to the Aberdeen Group. Your welcome kit becomes the first touchpoint in this critical process.</p>
          
          <h4>What Makes Welcome Kits Effective</h4>
          <p>The most successful welcome kits combine practical items employees will use daily with branded elements that reinforce company culture. From premium drinkware to tech accessories that enhance productivity, each item serves as a daily reminder of belonging.</p>
          <p><span class="stat-highlight">Customize your onboarding kits</span> to greet new hires with branded merchandise, information packets, and all essentials to start their journey.</p>
        `,
        products: [
          { name: "Tote Bag", image: "assets/images/tote1.jpg" },
          { name: "Welcome Kit", image: "assets/images/kit1.PNG" },
          { name: "Travel Bag", image: "assets/images/travelbag1.jpg" },
          { name: "Complete Kit", image: "assets/images/BrandMErchandise2.png" }
        ],
        customizeProducts: [
          { name: "Clothing Bundle", image: "assets/images/clothes1.PNG" },
          { name: "Custom Bundle", image: "assets/images/bundle1.PNG" },
          { name: "Custom Kit", image: "assets/images/kit2.PNG" },
          { name: "Custom Gift Box", image: "assets/images/bundle3.PNG" },
          { name: "Drinkware", image: "assets/images/waterbottle1.png" },
          { name: "Welcome Note Cards", image: "assets/images/Mat1.PNG" },
          { name: "Fun Gifts", image: "assets/images/socks1.PNG" },
          { name: "Apparel", image: "assets/images/jacket1.PNG" }
        ]
      },
      service: {
        title: "Years of Service Recognition",
        icon: "fas fa-calendar-alt",
        description: `
          <p>Long-term employee retention is one of the greatest challenges facing modern organizations. Years of service recognition programs create powerful emotional connections that keep your best talent engaged.</p>
          
          <h4>The High Cost of Turnover</h4>
          <!-- Source: https://www.americanprogress.org/article/there-are-significant-business-costs-to-replacing-employees/ -->
          <p>The Center for American Progress reports that replacing an employee can cost anywhere from <span class="stat-highlight stat-tooltip">16% to 213% of their annual salary<span class="tooltip-content">Source: Center for American Progress</span></span>. Retaining experienced team members isn't just a cultural goal—it's a financial imperative.</p>
          
          <h4>Building Legacy and Loyalty</h4>
          <!-- Source: https://www.forbes.com/sites/joshbersin/2012/06/13/new-research-unlocks-the-secret-of-employee-recognition/ -->
          <p>Service recognition programs demonstrate that you value longevity and growth. Companies with modern recognition programs have <span class="stat-highlight stat-tooltip">31% lower voluntary turnover<span class="tooltip-content">Source: Bersin by Deloitte</span></span> than those with outdated or no programs, according to research from Bersin by Deloitte.</p>
          
          <h4>Building Lasting Loyalty</h4>
          <p>Encourages long-term retention, shows appreciation for loyalty, and reinforces a culture of stability and commitment. Celebrate employee milestones with personalized gifts or awards recognizing 1, 5, 10, 20+ years of dedication. Let's explore the possibilities and tailor a program just for you.</p>
        `,
        products: [
          { name: "Pins and Jewelry", image: "assets/images/PinsAndBadges.PNG" },
          { name: "Crystal", image: "assets/images/GlassAward.PNG" },
          { name: "Congratulations Note", image: "assets/images/AwardImage.PNG" },
          { name: "Customizable Cubes", image: "assets/images/YearsOfService_Safety.PNG" }
        ],
        customizeProducts: [
          { name: "Wall Plaque", image: "assets/images/WallAward.PNG" },
          { name: "Customized Merch", image: "assets/images/Customized Merchandise.png" },
          { name: "Awards", image: "assets/images/EOM.png" },
          { name: "Plateau Merch Catalog", image: "assets/images/CustomGiftLevels.PNG" }
        ]
      },
      performance: {
        title: "Performance Recognition",
        icon: "fas fa-trophy",
        description: `
          <p>High performers drive organizational success, yet many feel undervalued. Strategic performance recognition transforms your top talent into engaged champions of your company's mission.</p>
          
          <h4>The Performance-Recognition Connection</h4>
          <!-- Source: https://www.achievers.com/blog/employee-recognition-and-productivity/ -->
          <p>When high performers feel valued, they become force multipliers. Organizations that prioritize employee recognition see a <span class="stat-highlight stat-tooltip">21% increase in productivity<span class="tooltip-content">Source: Achievers</span></span>, according to a report by Achievers.</p>
          
          <h4>Beyond Monetary Rewards</h4>
          <!-- Source: https://www2.deloitte.com/us/en/insights/focus/human-capital-trends/2018/employee-recognition-in-a-digital-world.html -->
          <p>While financial bonuses matter, tangible recognition creates lasting emotional connections. Deloitte found that <span class="stat-highlight stat-tooltip">85% of employees<span class="tooltip-content">Source: Deloitte</span></span> are more motivated when management offers regular feedback, recognition, and rewards.</p>
          
          <h4>Creating a Culture of Excellence</h4>
          <p>Performance recognition programs signal to all employees that exceptional work is noticed and valued. This creates positive peer pressure and aspirational behavior throughout your organization, driving overall performance improvements and establishing clear expectations for success.</p>
        `,
        products: [
          { name: "Arctic Zone Mug", image: "assets/images/Arctic-Zone-Titan-24-oz.-Copper-Mug-1024x1024.jpg" },
          { name: "Premium Apparel", image: "assets/images/triblend-tshirts.jpg" },
          { name: "Travel Bag", image: "assets/images/Weekend Travel bag.jpg" },
          { name: "Sling Bag", image: "assets/images/Popular Sling Bag.jpg" }
        ]
      },
      wellness: {
        title: "Wellness Programs",
        icon: "fas fa-heartbeat",
        description: `
          <p>Employee wellness isn't just a benefit—it's a strategic business imperative that directly impacts productivity, healthcare costs, and organizational culture.</p>
          
          <h4>The Business Case for Wellness</h4>
          <!-- Source: https://www.cdc.gov/pcd/issues/2010/jul/10_0013.htm -->
          <p>A comprehensive analysis published by the CDC found that for every dollar invested in wellness programs, companies can see an average return of <span class="stat-highlight stat-tooltip">$3.27 in reduced medical costs<span class="tooltip-content">Source: CDC</span></span>. Other studies have shown a <span class="stat-highlight stat-tooltip">28% reduction in sick days<span class="tooltip-content">Source: Harvard Business Review</span></span> and a <span class="stat-highlight stat-tooltip">26% reduction in healthcare costs<span class="tooltip-content">Source: Harvard Business Review</span></span>.</p>
          
          <h4>More Than Physical Health</h4>
          <!-- Source: https://hbr.org/2010/12/whats-the-hard-return-on-employee-wellness-programs -->
          <p>Modern wellness programs address mental health and work-life balance. Johnson & Johnson's wellness program famously saved the company <span class="stat-highlight stat-tooltip">$250 million<span class="tooltip-content">Source: Harvard Business Review</span></span> in healthcare costs over a decade, as reported by Harvard Business Review.</p>
          
          <h4>Wellness as a Culture Builder</h4>
          <!-- Source: https://www.gallup.com/workplace/236021/why-wellness-program-isnt-enough.aspx -->
          <p>Wellness initiatives demonstrate genuine care for employee wellbeing. Employees who feel their company cares about their well-being are <span class="stat-highlight stat-tooltip">3x more likely<span class="tooltip-content">Source: Gallup</span></span> to be engaged at work, according to Gallup research.</p>
        `,
        products: [
          { name: "Arctic Zone Mug", image: "assets/images/Arctic-Zone-Titan-24-oz.-Copper-Mug-1024x1024.jpg" },
          { name: "Cozy Sherpa", image: "assets/images/Warm and Cozy Sherpa.jpg" },
          { name: "Travel Bag", image: "assets/images/Weekend Travel bag.jpg" },
          { name: "Sling Bag", image: "assets/images/Popular Sling Bag.jpg" }
        ]
      },
      spot: {
        title: "Spot Recognition",
        icon: "fas fa-star",
        description: `
          <p>Spot recognition allows managers and peers to acknowledge exceptional performance in real-time. Whether it's staying late to comfort a patient's family or stepping up during a staffing gap, this immediate, meaningful feedback energizes employees and reinforces positive behavior.</p>
          
          <h4>The Power of Now: Why Timeliness Matters</h4>
          <p>For recognition to be most effective, it needs to be timely. Quick recognition creates momentum, boosts morale, and keeps employees engaged—especially during high-stress periods.</p>
          
          <h4>Effort and Appreciation</h4>
          <!-- Source: https://bucketlistrewards.com/blog/blog-employee-recognition-and-rewards-program-implementation/ -->
          <p>When recognition is timely, it drives motivation. <span class="stat-highlight stat-tooltip">69% of employees<span class="tooltip-content">Source: Bucketlist Rewards</span></span> report they would work harder if they felt their efforts were better appreciated. Spot awards are a powerful tool to bridge this appreciation gap.</p>
          
          <h4>Building Momentum and Retention</h4>
          <!-- Source: https://bucketlistrewards.com/blog/blog-employee-recognition-and-rewards-program-implementation/ -->
          <p>Frequent recognition builds momentum and contributes to retention. Organizations with effective recognition programs can see up to a <span class="stat-highlight stat-tooltip">40% reduction in voluntary turnover<span class="tooltip-content">Source: Bucketlist Rewards</span></span>, as employees feel consistently valued for their contributions.</p>
        `,
        products: [
          { name: "Spot Recognition", image: "assets/images/EOM.png" },
          { name: "Gift Cards", image: "assets/images/GiftCards.png" },
          { name: "Redeemable Tokens", image: "assets/images/CustomizedTokens.png" },
          { name: "Give Points", image: "assets/images/Points.jpg" }
        ]
      },
      peer: {
        title: "Peer-to-Peer Recognition",
        icon: "fas fa-users",
        description: `
          <p>The most authentic recognition often comes from colleagues who understand the daily challenges and contributions of their peers. Peer-to-peer recognition builds stronger team bonds and creates a culture of mutual appreciation.</p>
          
          <h4>The Power of Authentic Recognition</h4>
          <p>Peer-to-peer recognition empowers employees at all levels to highlight each other's contributions. This grassroots form of appreciation builds trust, fosters teamwork, and promotes inclusivity in the workplace.</p>
          
          <h4>Fostering Collaboration and Growth</h4>
          <!-- Source: https://www.terryberry.com/blog/employee-recognition-statistics/ -->
          <p>Peer recognition directly fuels teamwork. A study from SHRM found that <span class="stat-highlight stat-tooltip">41% of companies<span class="tooltip-content">Source: SHRM</span></span> using peer-to-peer recognition reported increased customer satisfaction, a direct result of improved collaboration. Furthermore, research from Achievers shows that peer feedback can improve an individual's performance by <span class="stat-highlight stat-tooltip">14%<span class="tooltip-content">Source: Achievers</span></span>.</p>
          
          <h4>Driving Insights</h4>
          <p>Peer recognition also gives managers insight into behind-the-scenes contributions that might otherwise go unnoticed. This leads to a more connected workforce, better communication, and ultimately, stronger patient outcomes.</p>
        `,
        products: [
          { name: "Appreciation Gifts", image: "assets/images/AppreciationMagnets.png" },
          { name: "Customized Tokens", image: "assets/images/CustomizedTokens.png" },
          { name: "Small Gifts", image: "assets/images/StickyNotes.png" },
          { name: "Thank You Notes", image: "assets/images/ThankyouNotes.png" }
        ]
      },
      points: {
        title: "Point-Based Rewards",
        icon: "fas fa-star-half-alt",
        description: `
          <p>Point-based reward systems create flexible, engaging experiences that allow employees to earn points for reaching milestones, demonstrating leadership, or meeting departmental goals, then choose rewards that truly matter to them. This approach maximizes satisfaction while minimizing administrative overhead.</p>
          
          <h4>Retention and Engagement</h4>
          <p>The choice and visibility of rewards builds friendly competition and excitement across teams, reinforcing engagement, and aligns behavior with organizational priorities. This includes efficiency, patient satisfaction, and quality care metrics.</p>
          
          <h4>Flexible and Scalable</h4>
          <p>Point systems allow you to recognize both small daily achievements and major milestones with appropriate reward levels. Companies using point-based systems report <span class="stat-highlight stat-tooltip">23% higher participation rates<span class="tooltip-content">Source: RecogNation Study</span></span> in recognition programs compared to fixed-reward systems.</p>
          
          <h4>Building Engagement Over Time</h4>
          <p>Points create anticipation and goal-setting behavior among employees. Studies show that <span class="stat-highlight stat-tooltip">employees earning points are 2.5x more likely<span class="tooltip-content">Source: IRF Psychology of Points Study</span></span> to actively seek opportunities to contribute beyond their basic job requirements, driving innovation and continuous improvement.</p>
        `,
        products: [
          { name: "Gift Cards", image: "assets/images/Popular Sling Bag.jpg" },
          { name: "Experience Vouchers", image: "assets/images/Weekend Travel bag.jpg" },
          { name: "Product Catalog", image: "assets/images/Points.jpg" },
          { name: "Custom Rewards", image: "assets/images/Ceramic Mugs.jpg" }
        ]
      },
      awards: {
        title: "General Awards",
        icon: "fas fa-award",
        description: `
          <p>Formal awards—such as engraved crystal trophies or plaques—offer public, prestigious recognition for outstanding contributions. Presented during annual ceremonies or team meetings, these awards create moments of pride and boost employee visibility across departments.</p>
          
          <h4>The Power of Formal Recognition</h4>
          <p>Formal awards carry more weight than informal recognition because they represent organizational values and standards. Research shows that <span class="stat-highlight stat-tooltip">employees receiving formal awards are 4x more likely<span class="tooltip-content">Source: Gallup Workplace Awards Study</span></span> to recommend their workplace to others, significantly improving your employer brand.</p>
          
          <h4>Creating Memorable Moments</h4>
          <p>Award ceremonies and presentations create lasting memories that extend far beyond the moment of recognition. The Cicero Group research found that <span class="stat-highlight stat-tooltip">employees prefer awards over cash<span class="tooltip-content">Source: Cicero Group Research</span></span> because they can see the item and remember the experience, demonstrating the lasting impact of formal programs.</p>
          
          <h4>Setting Standards of Excellence</h4>
          <p>Recognizing excellence in categories like innovation, teamwork, or patient advocacy sets clear expectations and highlights role models within the organization. This reinforces core values, elevates culture, and shows potential hires that your organization celebrates and invests in its people.</p>
        `,
        products: [
          { name: "Custom Plaques", image: "assets/images/PlaquesWithStands.png" },
          { name: "Trophy Collection", image: "assets/images/UniqueTrophies.png" },
          { name: "Custom Glassware", image: "assets/images/CustomGlassware.png.png" },
          { name: "Unique Awards", image: "assets/images/timepieces.png" }
        ]
      },
      incentives: {
        title: "Incentive Programs",
        icon: "fas fa-concierge-bell",
        description: `
          <p>Strategic incentive programs drive specific behaviors and outcomes while creating excitement and engagement around key business objectives. These programs turn abstract goals into tangible, achievable milestones.</p>
          
          <h4>Driving Specific Outcomes</h4>
          <p>Unlike general recognition, incentive programs target specific behaviors or results that directly impact business success. Companies using targeted incentives report <span class="stat-highlight stat-tooltip">28% faster goal achievement<span class="tooltip-content">Source: SCIRP Gamification Study</span></span> compared to organizations relying solely on traditional motivational approaches.</p>
          
          <h4>Creating Healthy Competition</h4>
          <p>Well-designed incentive programs foster positive competition that energizes teams without creating destructive rivalry. Research shows that <span class="stat-highlight stat-tooltip">teams with incentive programs show 22% higher collaboration<span class="tooltip-content">Source: SCIRP Gamification Study</span></span> when programs emphasize collective success alongside individual achievement.</p>
          
          <h4>Cost-Saving Initiative</h4>
          <p>Incentive programs tied to cost-saving initiatives—such as reducing waste, managing overtime, or improving patient throughput—encourage smart, proactive behavior. Employees are rewarded not just for effort but for results that help the organization operate more efficiently.</p>
        `,
        products: [
          { name: "Brand Merch", image: "assets/images/Custom Merch.png" },
          { name: "Tech Accessories", image: "assets/images/TechItems2.png.png" },
          { name: "Premium Merchandise", image: "assets/images/UsefulUtilities.png" },
          { name: "Custom Incentives", image: "assets/images/Apparel2.png" }
        ]
      },
      attendance: {
        title: "Attendance Recognition",
        icon: "fas fa-calendar-check",
        description: `
          <p>Rewarding employees for consistent attendance encourages dependability and helps reduce the disruption caused by callouts or chronic absenteeism. This is especially vital in healthcare, where patient care continuity is critical.</p>
          
          <h4>The Hidden Cost of Absenteeism</h4>
          <p>The CDC estimates that absenteeism costs U.S. employers <span class="stat-highlight stat-tooltip">$225.8 billion annually<span class="tooltip-content">Source: CDC</span></span> in lost productivity. Companies with attendance recognition programs see <span class="stat-highlight stat-tooltip">41% reduction in unscheduled absences<span class="tooltip-content">Source: SHRM</span></span> according to research from the Society for Human Resource Management.</p>
          
          <h4>Building Reliability Culture</h4>
          <p>When attendance is recognized and celebrated, it creates a culture where being present matters. Studies show that <span class="stat-highlight stat-tooltip">teams with attendance recognition have 23% better project completion rates<span class="tooltip-content">Source: Workplace Reliability Research</span></span> and <span class="stat-highlight stat-tooltip">18% higher customer satisfaction scores<span class="tooltip-content">Source: Workplace Reliability Research</span></span> due to improved consistency and reliability.</p>
          
          <h4>Beyond Perfect Attendance</h4>
          <p>Modern attendance programs recognize improvement, not just perfection. Whether it's monthly or quarterly-this recognition can include points, small gifts, or public praise, all of which boost employee commitment. This reduces overtime burden on others, and positively impacts the patient experience and care quality.</p>
        `,
        products: [
          { name: "Public Recognition", image: "assets/images/PublicRecognition.jpg" },
          { name: "Points System", image: "assets/images/Points.jpg" },
          { name: "Drinkware", image: "assets/images/DrinkwareMug.png.png" },
          { name: "Apparel", image: "assets/images/ApparelSweater.png" }
        ]
      },
      safety: {
        title: "Safety Recognition",
        icon: "fas fa-shield-alt",
        description: `
          <p>Safety recognition programs encourage adherence to protocols and promote a culture of accountability. Recognizing teams or individuals for accident-free days, compliance with PPE guidelines, or participation in safety trainings increases awareness and reduces workplace incidents.</p>
          
          <h4>The Business Impact of Safety</h4>
          <p>OSHA reports that workplace injuries cost employers <span class="stat-highlight stat-tooltip">$170 billion annually<span class="tooltip-content">Source: OSHA</span></span> in direct and indirect costs. Companies with robust safety recognition programs experience <span class="stat-highlight stat-tooltip">52% fewer workplace incidents<span class="tooltip-content">Source: National Safety Council</span></span> and <span class="stat-highlight stat-tooltip">40% lower workers' compensation costs<span class="tooltip-content">Source: National Safety Council</span></span> according to the National Safety Council.</p>
          
          <h4>Creating Safety Champions</h4>
          <p>Recognition programs transform employees into safety advocates. Research shows that <span class="stat-highlight stat-tooltip">workplaces with safety recognition have 85% higher safety suggestion rates<span class="tooltip-content">Source: Workplace Safety Research</span></span> and <span class="stat-highlight stat-tooltip">67% better near-miss reporting<span class="tooltip-content">Source: Workplace Safety Research</span></span>, creating proactive safety cultures that prevent incidents before they occur.</p>
          
          <h4>Psychological and Physical Safety</h4>
          <p>When employees feel recognized for safety contributions, it creates psychological safety that encourages open communication about risks. Teams with safety recognition show <span class="stat-highlight stat-tooltip">43% better safety communication<span class="tooltip-content">Source: Industrial Psychology Research</span></span> and <span class="stat-highlight stat-tooltip">31% faster hazard resolution times<span class="tooltip-content">Source: Industrial Psychology Research</span></span>, according to industrial psychology research.</p>
        `,
        products: [
          { name: "Insulated Drinkware", image: "assets/images/InsulatedDrinkware4.png" },
          { name: "Point System", image: "assets/images/Points.jpg" },
          { name: "Lunch Cooler", image: "assets/images/LunchCooler2.png" },
          { name: "Team Tech Items", image: "assets/images/TechItems2.png.png" }
        ]
      },
      community: {
        title: "Community Impact",
        icon: "fas fa-hands-helping",
        description: `
          <p>Programs that reward employees for participating in community outreach—such as health fairs, blood drives, or charity events—build a culture of compassion and service. This kind of recognition reinforces the organization's mission beyond the walls of the facility.</p>
          
          <h4>The Purpose-Driven Workforce</h4>
          <p>Deloitte research shows that <span class="stat-highlight stat-tooltip">73% of millennials<span class="tooltip-content">Source: Deloitte</span></span> are willing to pay extra for sustainable products and services, and <span class="stat-highlight stat-tooltip">83% consider a company's purpose<span class="tooltip-content">Source: Deloitte</span></span> when deciding where to work. Community impact programs address this growing demand for meaningful work.</p>
          
          <h4>Building Team Bonds Through Service</h4>
          <p>Volunteer activities create unique bonding experiences outside normal work contexts. Companies with community engagement programs report <span class="stat-highlight stat-tooltip">38% higher employee satisfaction<span class="tooltip-content">Source: Points of Light Foundation</span></span> and <span class="stat-highlight stat-tooltip">45% better cross-department collaboration<span class="tooltip-content">Source: Points of Light Foundation</span></span> according to Points of Light Foundation research.</p>
          
          <h4>Attracting Mission-Driven Talent</h4>
          <p>Organizations known for community impact attract employees who care deeply about their work's broader meaning. These purpose-driven employees show <span class="stat-highlight stat-tooltip">16% higher performance<span class="tooltip-content">Source: Harvard Business Review</span></span> and <span class="stat-highlight stat-tooltip">125% lower burnout rates<span class="tooltip-content">Source: Harvard Business Review</span></span> compared to employees in organizations without clear community mission, as reported by Harvard Business Review.</p>
        `,
        products: [
          { name: "Unique Signage", image: "assets/images/Signage.png" },
          { name: "Fun Gifts", image: "assets/images/socks1.PNG" },
          { name: "Matching Apparel", image: "assets/images/Apparel3.png.png" },
          { name: "Custom Drinkware", image: "assets/images/DrinkwareMug.png.png" }
        ]
      },
      'patient-care': {
        title: "Patient Care Recognition",
        icon: "fas fa-heart-pulse",
        description: `
          <p>Recognize exceptional patient care to boost staff motivation, enhance patient satisfaction, and strengthen organizational loyalty.</p>
          
          <h4>The Impact on Patient Care</h4>
          <!-- Source: Press Ganey -->
          <p>Healthcare organizations with robust recognition programs see a <span class="stat-highlight stat-tooltip">12% improvement in patient satisfaction scores<span class="tooltip-content">Source: Press Ganey</span></span> and <span class="stat-highlight stat-tooltip">31% lower voluntary turnover<span class="tooltip-content">Source: Gallup</span></span> among clinical staff.</p>
          
          <h4>Building a Culture of Care</h4>
          <p>When healthcare staff feel valued and recognized, they deliver better patient care. Our recognition program helps create a positive environment where exceptional care is celebrated and rewarded.</p>
          
          <h4>Recognition That Makes a Difference</h4>
          <p>From personalized awards to practical items that enhance the workday, each recognition piece is designed to show appreciation for the critical work healthcare professionals do.</p>
        `,
        products: [
          { name: "Customizable Awards", image: "assets/images/ServicePins.PNG" },
          { name: "Blankets", image: "assets/images/Blankets.png.png" },
          { name: "Personalized Pens", image: "assets/images/PersonalizedPen.png.png" },
          { name: "Custom Socks", image: "assets/images/CustomSocks.png.png" }
        ]
      },
      'volunteer': {
        title: "Volunteer Recognition",
        icon: "fas fa-hands-helping",
        description: `
          <p>Recognizing employees who volunteer—whether within the organization or externally—supports a purpose-driven culture and encourages civic engagement. Tracking and celebrating volunteer hours through branded items, awards, or time-off incentives deepens employee satisfaction and enhances your organization's image.</p>
          
          <h4>The Impact of Employee Volunteering</h4>
          <!-- Source: Deloitte Volunteer Impact Research -->
          <p>According to Deloitte's research, companies with volunteer recognition programs see <span class="stat-highlight stat-tooltip">89% higher employee engagement scores<span class="tooltip-content">Source: Deloitte Volunteer Impact Research</span></span> and <span class="stat-highlight stat-tooltip">70% stronger positive company reputation<span class="tooltip-content">Source: Deloitte Volunteer Impact Research</span></span>.</p>
          
          <h4>Building Community Connections</h4>
          <p>When employees are recognized for their volunteer efforts, they're more likely to continue giving back. Our volunteer recognition program helps create a sustainable culture of community service.</p>
          
          <h4>Recognition That Inspires</h4>
          <p>From comfortable apparel for volunteer events to practical items that show appreciation, each recognition piece is designed to celebrate and encourage continued community involvement.</p>
        `,
        products: [
          { name: "Blankets", image: "assets/images/Customized Merchandise.png" },
          { name: "Apparel", image: "assets/images/Apparel.png" },
          { name: "Sling Bag", image: "assets/images/SlingBackpacks.png" },
          { name: "Insulated Drinkware", image: "assets/images/Drinkware3.png" }
        ]
      },
      custom: {
        title: "Custom Recognition",
        icon: "fas fa-edit",
        description: `
          <p>Create a personalized recognition program that fits your unique organizational needs and culture.</p>
          
          <h4>Design Your Own Program</h4>
          <p>Every organization is different. Use our custom recognition feature to design something that aligns perfectly with your values, goals, and employee preferences.</p>
          
          <h4>Flexible and Tailored</h4>
          <p>Whether it's recognizing specific behaviors, celebrating unique achievements, or creating entirely new recognition categories, our custom option gives you the flexibility to build exactly what your team needs.</p>
          
          <div class="custom-form-section">
            <h4>Program Details</h4>
            <div class="custom-form-group">
              <label for="custom-feature-name">Program Name*</label>
              <input type="text" id="custom-feature-name" placeholder="Enter a name for your custom recognition program" required>
            </div>
            <div class="custom-form-group">
              <label for="custom-feature-description">Description (Optional)</label>
              <textarea id="custom-feature-description" rows="4" placeholder="Describe what this recognition program will accomplish..."></textarea>
            </div>
            <div class="validation-note" style="display: none; color: #e74c3c; font-size: 0.9rem; margin-top: 0.5rem;">
              Please enter a program name to continue.
            </div>
          </div>
        `,
        products: [
          { name: "Custom Socks", image: "assets/images/CustomSocks.png.png" },
          { name: "Custom Glassware", image: "assets/images/CustomGlassware.png.png" },
          { name: "Gift Cards", image: "assets/images/GiftCards.png" },
          { name: "Custom Bundle", image: "assets/images/bundle2.PNG" }
        ]
      }
    };

    // Modal functionality for See Details
    const modal = document.getElementById('feature-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalIcon = document.getElementById('modal-icon');
    const modalDescription = document.getElementById('modal-description');
    const modalProductsGrid = document.getElementById('modal-products-grid');
    const modalClose = document.querySelector('.feature-modal-close');

    if (modal) {
      // See Details button functionality
      const seeDetailsButtons = document.querySelectorAll('.see-details-btn');
      seeDetailsButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const featureKey = this.dataset.feature;
          const feature = featureData[featureKey];
          
          if (feature) {
            // Populate modal content
            modalTitle.textContent = feature.title;
            modalIcon.className = feature.icon;
            modalDescription.innerHTML = feature.description;
            
            // Product section titles
            const productTitles = {
              'welcome': 'Package It Like a Gift',
              'service': 'Years of Service Ideas',
              'performance': 'Reward Excellence',
              'wellness': 'Nurture Their Well-Being',
              'spot': 'Make It Memorable',
              'peer': 'Share the Appreciation',
              'points': 'Choose Your Rewards',
              'awards': 'Honor Their Excellence',
              'incentives': 'Motivate Success',
              'attendance': 'Recognize Reliability',
              'safety': 'Celebrate Safety',
              'community': 'Honor Service',
              'custom': 'Create Something Unique',
              'patient-care': 'Recognize Patient Care'
            };
            
            // Update the products section title
            const modalProductsTitle = document.querySelector('.modal-products h3');
            if (modalProductsTitle && productTitles[featureKey]) {
              modalProductsTitle.textContent = productTitles[featureKey];
            }
            
            modalProductsGrid.innerHTML = '';
            
            // Remove any existing customize and CTA sections
            const existingCustomizeSection = document.querySelector('.modal-customize-section');
            if (existingCustomizeSection) {
              existingCustomizeSection.remove();
            }
            const existingCtaSection = document.querySelector('.modal-cta-section');
            if (existingCtaSection) {
              existingCtaSection.remove();
            }
            
            feature.products.forEach(product => {
              const productCard = document.createElement('div');
              productCard.className = 'modal-product-card';
              productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='assets/images/RBBMarketingLogo.png'">
                <h4>${product.name}</h4>
              `;
              modalProductsGrid.appendChild(productCard);
            });

            // Add CTA section for Years of Service
            if (featureKey === 'service') {
              const ctaSection = document.createElement('div');
              ctaSection.className = 'modal-cta-section';
              ctaSection.innerHTML = `
                <div style="margin-top: 2rem; padding: 30px; background-color: #f8f9fa; border: 2px solid var(--primary-color); border-radius: 8px; text-align: center;">
                  <h4 style="margin-bottom: 1rem; color: var(--primary-color); font-size: 1.6rem;">How Are You Going To Present It?</h4>
                  <p style="margin: 0; font-weight: bold; font-size: 1.1em; color: #333;">In Person • Newsletter • Monthly Department Meeting • Deliver</p>
                  <p style="margin: 0.5rem 0 0 0; font-style: italic; color: #666;">Make every milestone moment memorable with the perfect presentation approach.</p>
                </div>
              `;
              
              // Insert after the main products section
              const modalProducts = document.querySelector('.modal-products');
              if (modalProducts) {
                modalProducts.insertAdjacentElement('afterend', ctaSection);
              }
            }
            
            // Add customize section for welcome kits and years of service
            if ((featureKey === 'welcome' || featureKey === 'service') && feature.customizeProducts) {
              const customizeSection = document.createElement('div');
              customizeSection.className = 'modal-customize-section';
              const customizeTitle = featureKey === 'service' ? 'Customize it: Personal and Public' : 'Customize to Fit Your Audience and Your Brand';
              customizeSection.innerHTML = `
                <h3>${customizeTitle}</h3>
                <div class="modal-customize-grid">
                  ${feature.customizeProducts.map(product => `
                    <div class="modal-product-card">
                      <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='assets/images/RBBMarketingLogo.png'">
                      <h4>${product.name}</h4>
                    </div>
                  `).join('')}
                </div>
              `;
              
              // Insert after the main products section
              const modalProducts = document.querySelector('.modal-products');
              if (modalProducts) {
                modalProducts.insertAdjacentElement('afterend', customizeSection);
              }
            }
            
            // Store the current feature key for modal handlers
            modal.dataset.currentFeature = featureKey;
            
            // Update modal button state based on whether feature is already added
            const modalAddToProgram = document.getElementById('modal-add-to-program');
            if (modalAddToProgram && featureKey !== 'custom') {
              // Get the feature name for this feature key
              const featureNameMap = {
                'welcome': 'Welcome Kits',
                'service': 'Years of Service Recognition',
                'performance': 'Performance Recognition',
                'wellness': 'Wellness Programs',
                'spot': 'Spot Recognition',
                'peer': 'Peer-to-Peer',
                'points': 'Point-Based Rewards',
                'awards': 'General Awards',
                'incentives': 'Incentive Programs',
                'attendance': 'Attendance Recognition',
                'safety': 'Safety Recognition',
                'community': 'Community Impact',
                'patient-care': 'Patient Care Recognition'
              };
              
              const featureName = featureNameMap[featureKey];
              const isAlreadyAdded = selectedFeatures.includes(featureName);
              
              if (isAlreadyAdded) {
                modalAddToProgram.innerHTML = '✓ Added';
                modalAddToProgram.disabled = true;
                modalAddToProgram.style.backgroundColor = '#28a745';
                modalAddToProgram.style.borderColor = '#28a745';
                modalAddToProgram.style.color = 'white';
              } else {
                modalAddToProgram.textContent = 'Add to Program';
                modalAddToProgram.disabled = false;
                modalAddToProgram.style.backgroundColor = '';
                modalAddToProgram.style.borderColor = '';
                modalAddToProgram.style.color = '';
              }
            }
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add custom form functionality if this is the custom feature
            if (featureKey === 'custom') {
              setTimeout(() => {
                const nameInput = document.getElementById('custom-feature-name');
                const validationNote = document.querySelector('.validation-note');
                const modalAddToProgram = document.getElementById('modal-add-to-program');
                
                if (nameInput && modalAddToProgram) {
                  // Store original button text
                  const originalButtonText = modalAddToProgram.textContent;
                  
                  // Function to update button state
                  function updateButtonState() {
                    const hasName = nameInput.value.trim();
                    if (hasName) {
                      modalAddToProgram.disabled = false;
                      modalAddToProgram.textContent = originalButtonText;
                      if (validationNote) validationNote.style.display = 'none';
                    } else {
                      modalAddToProgram.disabled = true;
                      modalAddToProgram.textContent = 'Enter Program Name First';
                      if (validationNote) validationNote.style.display = 'block';
                    }
                  }
                  
                  // Initial state
                  updateButtonState();
                  
                  // Listen for input changes
                  nameInput.addEventListener('input', updateButtonState);
                  
                  // Mark this modal as custom to prevent regular handler from running
                  modalAddToProgram.dataset.customHandler = 'true';
                  
                  // Override the modal add button click for custom feature
                  modalAddToProgram.onclick = function() {
                    const customName = nameInput.value.trim();
                    const descInput = document.getElementById('custom-feature-description');
                    const customDescription = descInput ? descInput.value.trim() : '';
                    
                    if (!customName) {
                      alert('Please enter a name for your custom recognition program.');
                      nameInput.focus();
                      return;
                    }
                    
                    const customFeatureName = `Custom: ${customName}`;
                    
                    if (!selectedFeatures.includes(customFeatureName)) {
                        // Store the custom description in localStorage for future reference
                        if (customDescription) {
                          localStorage.setItem(`custom_desc_${customName}`, customDescription);
                        }
                        
                        selectedFeatures.push(customFeatureName);
                        
                        // Save selectedFeatures to localStorage
                        try {
                          localStorage.setItem('selectedFeatures', JSON.stringify(selectedFeatures));
                        } catch (e) {
                          console.error('Error saving selectedFeatures to localStorage:', e);
                        }
                        
                        // Add the custom feature to the canvas
                        const customModuleId = 'custom-' + Date.now();
                        const newCanvasItem = document.createElement('div');
                        newCanvasItem.classList.add('canvas-item');
                        newCanvasItem.dataset.moduleId = customModuleId;
                        newCanvasItem.innerHTML = `
                          <div class="canvas-item-content">
                              <div class="canvas-item-left">
                                  <i class="fas fa-edit"></i>
                                  <span>${customFeatureName}</span>
                              </div>
                              <div class="canvas-item-right">
                                  <button class="see-details-btn canvas-see-details" data-feature="custom">Edit Details</button>
                                  <button class="remove-btn">✕</button>
                              </div>
                          </div>`;
                        
                        // Store the custom feature data for this specific module
                        const customFeatureData = {
                          title: customFeatureName,
                          description: customDescription,
                          moduleId: customModuleId
                        };
                        localStorage.setItem(`custom_feature_${customModuleId}`, JSON.stringify(customFeatureData));
                        
                        const canvasDropzone = document.querySelector('.canvas-dropzone');
                        if (canvasDropzone) {
                          canvasDropzone.appendChild(newCanvasItem);
                          addCanvasListeners(newCanvasItem);
                        }
                      
                      updateProgramButtonsState();
                      updateProgramStrength();
                      saveCanvasState();
                      
                      // Close modal
                      modal.style.display = 'none';
                      document.body.style.overflow = 'auto';
                      
                      // Clear form for next custom feature
                      nameInput.value = '';
                      if (descInput) descInput.value = '';
                    } else {
                      alert('This custom feature has already been added to your program.');
                    }
                  };
                }
              }, 100);
            } else {
              // For non-custom features, ensure the button is reset to normal state
              const modalAddToProgram = document.getElementById('modal-add-to-program');
              if (modalAddToProgram) {
                modalAddToProgram.disabled = false;
                modalAddToProgram.textContent = 'Add to Program';
                modalAddToProgram.dataset.customHandler = 'false';
                // Clear any existing onclick handler
                modalAddToProgram.onclick = null;
              }
            }
          }
        });
      });

      // Close modal functionality
      if (modalClose) {
        modalClose.addEventListener('click', function() {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        });
      }

             // Close modal when clicking outside
       modal.addEventListener('click', function(e) {
         if (e.target === modal) {
           modal.style.display = 'none';
           document.body.style.overflow = 'auto';
         }
       });

       // Modal action buttons functionality
       const modalAddToProgram = document.getElementById('modal-add-to-program');
       const modalChat = document.getElementById('modal-chat');

       if (modalChat) {
         modalChat.addEventListener('click', function() {
           // Redirect to contact page with chat inquiry
           window.location.href = 'contact.html?inquiry=chat';
         });
       }



       if (modalAddToProgram) {
         modalAddToProgram.addEventListener('click', function() {
           // Skip if this is a custom handler
           if (modalAddToProgram.dataset.customHandler === 'true') {
             return;
           }
           
           // Don't proceed if already added
           if (modalAddToProgram.disabled) {
             return;
           }
           
           // Get the current feature key from the modal's stored data
           const currentFeatureKey = modal.dataset.currentFeature;
           
           // Find the corresponding module in the palette by feature key
           const paletteModules = document.querySelectorAll('.program-module');
           let targetModule = null;
           
           paletteModules.forEach(module => {
             const moduleFeatureKey = module.querySelector('.see-details-btn').dataset.feature;
             if (moduleFeatureKey === currentFeatureKey) {
               targetModule = module;
             }
           });
           
           if (targetModule && targetModule.style.display !== 'none') {
             // Simulate a drop event to add the module to canvas
             draggedModule = targetModule;
             const dropEvent = new DragEvent('drop', {
                bubbles: true,
                cancelable: true,
                dataTransfer: new DataTransfer()
             });
             dropEvent.dataTransfer.setData('text/plain', targetModule.dataset.moduleId);
             canvasDropzone.dispatchEvent(dropEvent);
             
             // Update modal button state after adding
             setTimeout(() => {
               updateModalButtonState();
             }, 100);
           }
           
           // Close modal after adding
           modal.style.display = 'none';
           document.body.style.overflow = 'auto';
         });
       }
     }

    loadCanvasState();
    generateCaptcha();
  }

}); 