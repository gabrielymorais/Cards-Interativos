const cardsContainer = document.getElementById('cardsContainer');
const colors = ['#6061b4', '#862f5b', '#35754c', '#322833'];

const profiles = [
  {
    name: 'Gabriely Morais',
    role: 'FullStack Developer',
    bio: 'Criando interfaces modernas e funcionais.',
    skills: ['HTML', 'CSS', 'JavaScript'],
    followers: 210,
    avatar: 32
  },
  {
    name: 'Mario Jamisson',
    role: 'Engenheiro de Software e Designer',
    bio: 'Apaixonado por desenvolver projetos.',
    skills: ['Trello', 'SQL', 'Docker'],
    followers: 180,
    avatar: 45
  },
  {
    name: 'Maria Carolina',
    role: 'UX Designer',
    bio: 'Experiências simples, bonitas e acessíveis.',
    skills: ['Figma', 'UX', 'UI'],
    followers: 250,
    avatar: 47
  },
  {
    name: 'Amanda Morais',
    role: 'UX Designer e Enginheira de Software',
    bio: 'Apps rápidos, intuitivos e escaláveis e ama desenvolver projetos.',
    skills: ['Ionic', 'Angular', 'Trello'],
    followers: 195,
    avatar: 12
  }
];

document.addEventListener('DOMContentLoaded', () => {
  profiles.forEach(createCard);

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
});

function createCard(profile) {
  const card = document.createElement('article');
  card.className = 'profile-card';
  card.onclick = () => focusCard(card);

  card.innerHTML = `
    <img class="avatar" src="https://i.pravatar.cc/150?img=${profile.avatar}">
    <h2>${profile.name}</h2>
    <span class="role">${profile.role}</span>
    <p class="bio">${profile.bio}</p>

    <ul class="skills">
      ${profile.skills.map(skill => `<li>${skill}</li>`).join('')}
    </ul>

    <div class="stats">
      <strong class="followers">${profile.followers}</strong> Seguidores
    </div>

    <div class="actions">
      <button class="btn follow">Seguir</button>
      <button class="btn color">Alterar cor</button>
    </div>
  `;

  const avatar = card.querySelector('.avatar');
  const followBtn = card.querySelector('.follow');
  const colorBtn = card.querySelector('.color');

  avatar.onclick = (e) => changeAvatar(e, avatar);
  followBtn.onclick = (e) => toggleFollow(e, followBtn);
  colorBtn.onclick = (e) => changeCardColor(e, card);

  cardsContainer.appendChild(card);
}

function addProfile() {
  const id = Math.floor(Math.random() * 70);
  createCard({
    name: 'Novo Perfil',
    role: 'Nova Função',
    bio: 'Descrição do novo usuário.',
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
    followers: 0,
    avatar: id
  });
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem(
    'theme',
    document.body.classList.contains('dark') ? 'dark' : 'light'
  );
}

function toggleFollow(event, btn) {
  event.stopPropagation();
  const followers = btn.closest('.profile-card').querySelector('.followers');

  btn.classList.toggle('active');

  if (btn.classList.contains('active')) {
    btn.textContent = 'Seguindo';
    followers.textContent = Number(followers.textContent) + 1;
  } else {
    btn.textContent = 'Seguir';
    followers.textContent = Number(followers.textContent) - 1;
  }
}

function changeCardColor(event, card) {
  event.stopPropagation();
  const index = Math.floor(Math.random() * colors.length);
  card.style.background = colors[index];
  card.style.color = '#fff';
}

function focusCard(card) {
  document.querySelectorAll('.profile-card')
    .forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function changeAvatar(event, img) {
  event.stopPropagation();
  const random = Math.floor(Math.random() * 70);
  img.src = `https://i.pravatar.cc/150?img=${random}`;
}


const modal = document.getElementById('modal');

function openModal() {
  modal.classList.add('show');
}

function closeModal() {
  modal.classList.remove('show');
}

function saveProfile() {
  const name = document.getElementById('name').value;
  const role = document.getElementById('role').value;
  const bio = document.getElementById('bio').value;
  const skills = [
    document.getElementById('skill1').value,
    document.getElementById('skill2').value,
    document.getElementById('skill3').value
  ].filter(skill => skill !== '');

  if (!name || !role) {
    alert('Preencha nome e cargo!');
    return;
  }

  createCard({
    name,
    role,
    bio,
    skills,
    followers: 0,
    avatar: Math.floor(Math.random() * 70)
  });

  document.querySelectorAll('.modal-content input, .modal-content textarea')
    .forEach(field => field.value = '');

  closeModal();
}

