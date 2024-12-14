const randomUser= async ()=> {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const a = data.results[0];

    showScreen(a);

    localStorage.setItem('currentUser', JSON.stringify(a));
}
randomUser();

const showScreen = (a) => {
    document.querySelector(".card").innerHTML = `
        <img src="${a.picture.large}" class="card-img-top" id="user-image" alt="User Image">
        <div class="card-body text-center">
            <h5 class="card-title" id="user-name">${a.name.title} ${a.name.first} ${a.name.last}</h5>
            <p class="card-text" id="user-email">E-mail:${a.email}</p>
            <p class="card-text" id="user-phone">Phone:${a.phone}</p>
        </div>`;
};

document.querySelector('.new').addEventListener('click', randomUser);

document.querySelector('.add').addEventListener('click', () => {
    const a = JSON.parse(localStorage.getItem('currentUser'));
    
    if (a) {
        document.querySelector('.saved-users').innerHTML += `
            <div class="card my-2" style="width: 18rem;">
                <img src="${a.picture.large}" class="card-img-top" alt="User Image">
                <div class="card-body">
                    <h5 class="card-title">${a.name.title} ${a.name.first} ${a.name.last}</h5>
                    <p class="card-text">Email: ${a.email}</p>
                    <p class="card-text">Phone: ${a.phone}</p>
                </div>
            </div>`;

        let savedUsers = JSON.parse(localStorage.getItem('savedUsers')) || [];
        savedUsers.push(a)
        localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
        randomUser();
    }
});


document.querySelector('#view-saved').addEventListener('click', () => {
    document.querySelector('#main-page').style.display = 'none';
    document.querySelector('#savedPage').style.display = 'flex';

    const savedUsers = JSON.parse(localStorage.getItem('savedUsers')) || [];
    savedUsers.forEach((e)=>{
        document.querySelector(".saved-users").innerHTML += `
        <div class="card my-2" style="width: 18rem;">
            <img src="${a.picture.large}" class="card-img-top" alt="User Image">
            <div class="card-body">
                <h5 class="card-title">${a.name.title} ${a.name.first} ${a.name.last}</h5>
                <p class="card-text">Email: ${a.email}</p>
                <p class="card-text">Phone: ${a.phone}</p>
            </div>
        </div>`;
    });
});


document.querySelector('#back-to-main').addEventListener('click', () => {
    document.querySelector('#main-page').style.display = 'flex';
    document.querySelector('#savedPage').style.display = 'none';
});

document.querySelector('#remove-all').addEventListener('click', () => {
    localStorage.removeItem('savedUsers');
    document.querySelector('.saved-users').innerHTML = '';
});