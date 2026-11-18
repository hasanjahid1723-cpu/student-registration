console.log('script.js loaded');

const form = document.getElementById('regForm');
const tbody = document.getElementById('tbody');
const successMsg = document.getElementById('successMsg');
const fields = ['name', 'email', 'phone', 'dob', 'dept', 'gender', 'password'];
let count = 0;

function setError(id, msg) {
  document.getElementById(id + 'Err').textContent = msg;
  const el = document.getElementById(id);
  if (el) el.classList.toggle('invalid', msg !== '');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  fields.forEach(function (f) { setError(f, ''); });
  let ok = true;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const dob = document.getElementById('dob').value;
  const dept = document.getElementById('dept').value;
  const genderEl = document.querySelector('input[name="gender"]:checked');
  const gender = genderEl ? genderEl.value : '';
  const password = document.getElementById('password').value;

  if (name === '') { setError('name', 'Full name is required'); ok = false; }

  if (email === '') { setError('email', 'Email is required'); ok = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError('email', 'Enter a valid email'); ok = false;
  }

  if (phone === '') { setError('phone', 'Phone is required'); ok = false; }
  if (dob === '') { setError('dob', 'Date of birth is required'); ok = false; }
  if (dept === '') { setError('dept', 'Select a department'); ok = false; }
  if (gender === '') { setError('gender', 'Select a gender'); ok = false; }

  if (password === '') { setError('password', 'Password is required'); ok = false; }
  else if (password.length < 8) {
    setError('password', 'Password must be at least 8 characters'); ok = false;
  }

  if (!ok) return;

  // DOM manipulation: ডানপাশের table এ data দেখানো
  const emptyRow = document.getElementById('emptyRow');
  if (emptyRow) emptyRow.remove();

  count++;
  const tr = document.createElement('tr');
  [count, name, email, phone, dob, dept, gender].forEach(function (val) {
    const td = document.createElement('td');
    td.textContent = val;
    tr.appendChild(td);
  });
  tbody.appendChild(tr);

  successMsg.textContent = 'Registration successful! Total registered: ' + count;
  form.reset();
});