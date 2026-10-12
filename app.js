// Curtley Kennedy - Portfolio & Public CV Interactivity

document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initCopyEmail();
  initModals();
  initSmoothScroll();
});

// Live Cape Town Clock (UTC+2)
function initLiveClock() {
  const clockElement = document.getElementById('live-time');
  if (!clockElement) return;

  function updateClock() {
    const now = new Date();
    // Format to Cape Town (Africa/Johannesburg, UTC+2)
    const options = {
      timeZone: 'Africa/Johannesburg',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
    clockElement.textContent = `${timeString} GMT+2`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// Copy Email with Toast Feedback
function initCopyEmail() {
  const emailButtons = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast-notice');
  const emailToCopy = 'curtley.a.kennedy@gmail.com';

  emailButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(emailToCopy);
        showToast('Email copied to clipboard: curtley.a.kennedy@gmail.com');
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = emailToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Email copied: curtley.a.kennedy@gmail.com');
      }
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = `📋 ${message}`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

// Modal handling
function initModals() {
  const openButtons = document.querySelectorAll('[data-modal-target]');
  const closeButtons = document.querySelectorAll('[data-modal-close]');
  const modals = document.querySelectorAll('.modal-overlay');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(m => m.classList.remove('open'));
      document.body.style.overflow = '';
    }
  });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
