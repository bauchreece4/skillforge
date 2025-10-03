
(function initTheme(){
  const saved = localStorage.getItem('theme');
  if(saved === 'dark' || (saved === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)){
    document.body.classList.add('dark');
  }
})();

function toggleTheme(){
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

function toggleMenu(){
  document.getElementById('nav').classList.toggle('open');
}

function subscribe(e){
  e.preventDefault();
  const email = document.querySelector('#email')?.value;
  if(!email) return false;
  localStorage.setItem('subscribed', '1');
  const msg1 = document.getElementById('news-msg');
  if(msg1) msg1.textContent = 'Thanks! You are on the list.';
  return false;
}

function fakeSend(e){
  e.preventDefault();
  const formMsg = document.getElementById('form-msg');
  if(formMsg){ formMsg.textContent = 'Message sent (demo).'; }
  return false;
}

function filterCards(containerId, query){
  const q = (query||'').toLowerCase().trim();
  const box = document.getElementById(containerId);
  if(!box) return;
  const items = Array.from(box.querySelectorAll('.card'));
  items.forEach(el => {
    const text = el.textContent.toLowerCase() + ' ' + (el.dataset.tags||'');
    el.style.display = text.includes(q) ? '' : 'none';
  });
}

(function initChecklist(){
  const list = document.getElementById('checklist');
  if(!list) return;
  const boxes = list.querySelectorAll('input[type="checkbox"]');
  boxes.forEach(box => {
    const key = 'checklist:' + box.dataset.key;
    const saved = localStorage.getItem(key);
    if(saved === '1'){ box.checked = true; }
    box.addEventListener('change', () => {
      localStorage.setItem(key, box.checked ? '1' : '0');
      updateProgress();
    });
  });
  updateProgress();
})();

function updateProgress(){
  const list = document.getElementById('checklist');
  if(!list) return;
  const boxes = list.querySelectorAll('input[type="checkbox"]');
  const done = Array.from(boxes).filter(b => b.checked).length;
  const total = boxes.length;
  const el = document.getElementById('progress');
  if(el) el.textContent = `${done}/${total}`;
}
