// Liste des activités (en utilisant celles du HTML original)
const activities = [
    {
        time: '11:30',
        title: 'Réunion de Coordination de la Sous-Direction',
        description: 'Des Affaires Générales, avec le SDAG, SAF, SRH, SIM, CM et le personnel SDAG.',
        image: 'briefing.jpg'
    },
    {
        time: '14:00',
        title: 'Réunion du suivi du partenariat entre l\'API et la Chambre de Commerce Uruguay-Afrique (CCUA)',
        description: '',
        image: 'atelier.jpg'
    },
    {
        time: '17:00',
        title: 'Séance de travail avec la Conférence des Nations Unies sur le Commerce et le Développement (CNUCED)',
        description: '',
        image: 'nations unies.jpg'
    }
];

// Récupérer la date et l'heure actuelles
function getCurrentTime() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes(); // Convertir l'heure en minutes pour comparaison
}

// Fonction pour définir les activités
function displayActivities() {
    const currentTime = getCurrentTime();
    const mainCard = document.getElementById('main-card');
    const mainCardTitle = document.getElementById('main-card-title');
    const mainCardTime = document.getElementById('main-card-time');
    const secondaryCards = document.getElementById('secondary-cards');
    secondaryCards.innerHTML = ''; // Vider les cartes secondaires avant d'ajouter les nouvelles

    // Boucle à travers les activités pour déterminer celle qui est en cours
    activities.forEach(activity => {
        const activityTime = parseInt(activity.time.split(':')[0]) * 60 + parseInt(activity.time.split(':')[1]);

        // Carte principale
        if (activityTime === currentTime) {
            mainCard.style.display = 'block';
            mainCardTitle.textContent = activity.title;
            mainCardTime.textContent = activity.time + ' GMT';
            mainCard.querySelector('img').src = activity.image;
        }

        // Cartes secondaires
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${activity.image}" alt="${activity.title}">
            <div class="card-content">
                <h3>${activity.title}</h3>
                <p>${activity.time} GMT</p>
            </div>
        `;

        // Ajout du badge (En cours ou À venir)
        const activityBadge = document.createElement('div');
        activityBadge.className = 'badge';
        if (activityTime > currentTime) {
            activityBadge.classList.add('upcoming');
            activityBadge.textContent = 'À venir';
        } else {
            activityBadge.textContent = 'En cours';
        }
        card.appendChild(activityBadge);

        secondaryCards.appendChild(card);
    });
}

// Appeler la fonction lors du chargement de la page
document.addEventListener('DOMContentLoaded', displayActivities);
