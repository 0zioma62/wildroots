 document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  document.querySelectorAll('.error').forEach(el => el.textContent = '');

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  if (!name.value.trim()) {
    document.getElementById('name-error').textContent = 'Name is required';
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    document.getElementById('email-error').textContent = 'Please enter a valid email address';
    valid = false;
  }

  if (message.value.trim().length < 10) {
    document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
    valid = false;
  }

  if (valid) {
    e.target.submit();
  }
});
