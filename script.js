const PASSWORD = '0910';
const loginScreen = document.getElementById('loginScreen');
const site = document.getElementById('site');
const form = document.getElementById('loginForm');
const password = document.getElementById('password');
const error = document.getElementById('loginError');
const toggle = document.getElementById('togglePassword');
const videoModal = document.getElementById('videoModal');
const video = document.getElementById('birthdayVideo');
const wishModal = document.getElementById('wishModal');
const ambient = document.getElementById('ambientAudio');

form.addEventListener('submit', e => {
  e.preventDefault();
  if (password.value === PASSWORD) {
    loginScreen.classList.add('hidden');
    site.classList.remove('hidden');
    startHearts();
    document.body.style.overflow = 'auto';
  } else {
    error.textContent = 'That password is not quite right. Try the birthday hint. 💕';
    password.value = '';
    password.focus();
  }
});

toggle.addEventListener('click', () => {
  const hidden = password.type === 'password';
  password.type = hidden ? 'text' : 'password';
  toggle.textContent = hidden ? '🙈' : '👁';
});

document.getElementById('videoBtn').addEventListener('click', () => {
  videoModal.classList.remove('hidden');
  video.currentTime = 0;
  video.play().catch(() => {});
});
document.getElementById('closeModal').addEventListener('click', closeVideo);
videoModal.addEventListener('click', e => { if(e.target === videoModal) closeVideo(); });
function closeVideo(){ video.pause(); videoModal.classList.add('hidden'); }

document.getElementById('wishBtn').addEventListener('click', () => wishModal.classList.remove('hidden'));
document.getElementById('closeWish').addEventListener('click', () => wishModal.classList.add('hidden'));

document.getElementById('confettiBtn').addEventListener('click', () => {
  for(let i=0;i<90;i++) setTimeout(() => createHeart(true), i*12);
});

document.getElementById('musicBtn').addEventListener('click', async () => {
  if (ambient.paused) {
    try { await ambient.play(); document.getElementById('musicBtn').textContent = '🔇 Music'; }
    catch { document.getElementById('musicBtn').textContent = '🎵 Add ambient.mp3'; }
  } else { ambient.pause(); document.getElementById('musicBtn').textContent = '🔊 Music'; }
});

function nextBirthday(){
  const now = new Date();
  let year = now.getFullYear();
  let target = new Date(year, 9, 9, 0, 0, 0);
  if(target <= now) target = new Date(year + 1, 9, 9, 0, 0, 0);
  return target;
}
function updateCountdown(){
  const diff = Math.max(0, nextBirthday() - new Date());
  const s = Math.floor(diff/1000);
  document.getElementById('days').textContent = String(Math.floor(s/86400)).padStart(2,'0');
  document.getElementById('hours').textContent = String(Math.floor(s/3600)%24).padStart(2,'0');
  document.getElementById('minutes').textContent = String(Math.floor(s/60)%60).padStart(2,'0');
  document.getElementById('seconds').textContent = String(s%60).padStart(2,'0');
}
setInterval(updateCountdown,1000); updateCountdown();

function createHeart(confetti=false){
  const h=document.createElement('span'); h.className='float-heart'; h.textContent=confetti ? ['♥','♡','✦','✨'][Math.floor(Math.random()*4)] : '♥';
  h.style.left=Math.random()*100+'%'; h.style.fontSize=(12+Math.random()*24)+'px'; h.style.animationDuration=(3+Math.random()*4)+'s';
  h.style.bottom=confetti ? (25+Math.random()*25)+'%' : '-30px';
  document.getElementById('hearts').appendChild(h); setTimeout(()=>h.remove(),8000);
}
function startHearts(){ setInterval(()=>createHeart(false),900); for(let i=0;i<12;i++) setTimeout(()=>createHeart(false),i*150); }

document.addEventListener('keydown', e => { if(e.key==='Escape'){ closeVideo(); wishModal.classList.add('hidden'); }});
