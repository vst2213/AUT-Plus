// Create header
const header = document.createElement('header');
header.style.display = 'flex';
header.style.justifyContent = 'space-between';
header.style.alignItems = 'center';
header.style.backgroundColor = '#fff';
header.style.padding = '20px';
header.style.boxShadow = '0px 2px 10px rgba(0, 0, 0, 0.1)';

// Create logo
const logo = document.createElement('div');
logo.style.fontSize = '24px';
logo.style.fontWeight = 'bold';
logo.textContent = 'WazeForum';
header.appendChild(logo);

// Create search bar
const searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.placeholder = 'Search...';
searchBar.style.padding = '10px';
searchBar.style.width = '300px';
searchBar.style.border = '1px solid #ccc';
searchBar.style.borderRadius = '5px';
header.appendChild(searchBar);

// Create login button
const loginBtn = document.createElement('button');
loginBtn.textContent = 'Login';
loginBtn.style.padding = '10px 20px';
loginBtn.style.backgroundColor = '#007bff';
loginBtn.style.color = '#fff';
loginBtn.style.border = 'none';
loginBtn.style.borderRadius = '5px';
loginBtn.style.cursor = 'pointer';
loginBtn.addEventListener('click', () => alert('Login functionality coming soon!'));
header.appendChild(loginBtn);

// Add header to body
document.body.appendChild(header);

// Create welcome section
const welcomeSection = document.createElement('section');
welcomeSection.style.textAlign = 'center';
welcomeSection.style.padding = '40px';
welcomeSection.style.backgroundColor = '#fff';
welcomeSection.style.marginBottom = '20px';

const welcomeText = document.createElement('h1');
welcomeText.textContent = 'Welcome to the Waze Forum';
welcomeSection.appendChild(welcomeText);

// Create statistics section
const stats = document.createElement('div');
stats.style.display = 'flex';
stats.style.justifyContent = 'center';
stats.style.gap = '20px';

const createStatBox = (label, value) => {
    const statBox = document.createElement('div');
    statBox.style.backgroundColor = '#e0e0e0';
    statBox.style.padding = '20px';
    statBox.style.borderRadius = '10px';
    statBox.style.width = '150px';
    statBox.style.textAlign = 'center';
    statBox.innerHTML = `<h2>${value}</h2><p>${label}</p>`;
    return statBox;
};

stats.appendChild(createStatBox('Thanks list', '334,006'));
stats.appendChild(createStatBox('Total posts', '2,143,258'));
stats.appendChild(createStatBox('Online users', '25'));

welcomeSection.appendChild(stats);
document.body.appendChild(welcomeSection);

// Create forum section
const forumSection = document.createElement('section');
forumSection.style.padding = '20px';
forumSection.style.backgroundColor = '#fff';

const forums = [
    {
        title: 'Official Announcements',
        description: 'Important messages to community users. This forum is locked (Waze staff only).',
        topics: 519,
        posts: 2588,
        lastPost: 'August 2023 Office Hours - by Brett G (Nov 3, 2023)'
    },
    {
        title: 'Waze Products',
        description: 'Discussions about Waze products, including the app and map editor.',
        topics: 28730,
        posts: 232510,
        lastPost: '[Script] WME Fix UI Memory - by Inguazzante (Aug 15, 2023)'
    },
    {
        title: 'Community',
        description: 'General discussion and localization topics.',
        topics: 7093,
        posts: 47270,
        lastPost: 'Waze Voice Not Announcing - by Petros-Vermakis (Thu Aug 10, 2023)'
    }
];

// Function to create forum boxes
const createForumBox = (forum) => {
    const forumBox = document.createElement('div');
    forumBox.style.backgroundColor = '#f9f9f9';
    forumBox.style.padding = '20px';
    forumBox.style.marginBottom = '10px';
    forumBox.style.borderRadius = '10px';
    forumBox.style.boxShadow = '0px 2px 5px rgba(0, 0, 0, 0.1)';

    const title = document.createElement('h3');
    title.textContent = forum.title;
    forumBox.appendChild(title);

    const description = document.createElement('p');
    description.textContent = forum.description;
    forumBox.appendChild(description);

    const stats = document.createElement('p');
    stats.innerHTML = `<strong>Topics:</strong> ${forum.topics} | <strong>Posts:</strong> ${forum.posts}`;
    forumBox.appendChild(stats);

    const lastPost = document.createElement('p');
    lastPost.innerHTML = `<em>Last post: ${forum.lastPost}</em>`;
    forumBox.appendChild(lastPost);

    return forumBox;
};

forums.forEach(forum => {
    forumSection.appendChild(createForumBox(forum));
});

document.body.appendChild(forumSection);
