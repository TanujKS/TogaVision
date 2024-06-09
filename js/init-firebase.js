//init
var firebaseConfig = {
    apiKey: "AIzaSyCRRAD_pRf8GKTN4z1f1C9Ko4H9w2GoTsA",
    authDomain: "ksar15.firebaseapp.com",
    projectId: "ksar15",
    storageBucket: "ksar15.appspot.com",
    messagingSenderId: "1060590188964",
    appId: "1:1060590188964:web:cbbefa193c53375f2aa931",
    measurementId: "G-8VNX8HPRD0"
  };
  
const project = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();



//query
const searchParams = new URLSearchParams(window.location.search);
const role_query = searchParams.get("role")
console.log(role_query)
if (role_query !== null) {
    const subtitle = document.createElement("h2")
    subtitle.classList.add("text-white")
    subtitle.innerHTML = `Filtering By "${role_query}"`
    document.getElementById("title").appendChild(subtitle);
}




//utils
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



//getting projects
function createPostDiv(doc) {
    const data = doc.data();

    const title = data.title || 'No title';
    const manager = data.manager || 'No manager';
    const image_url = data.image_url || 'img/post.png';
    const roles_needed = data.roles_needed || [];
    const description = data.description || 'No description';
    const time_required = data.time_required || 'No time required';
    const location = data.location || 'No location';
    
    const postDiv = document.createElement('div');

    function addRoles(roles) {
        var html = ''
        for (const role_index in roles) {
            html += `
            <li>
                <a href="?role=${roles[role_index]}">${capitalizeFirstLetter(roles[role_index])}</a>
            </li>
            `
        }
        return html
    }

    postDiv.innerHTML = `
        <div class="single-post d-flex flex-row">
            <div class="thumb col-sm-3">
                <img src="${image_url}">
                
                <h5>Roles Needed:</h5>
                
                <ul class="tags">
                    ${addRoles(roles_needed)}
                </ul>
            </div>

            <div class="details col-sm-9">
                <div class="title d-flex flex-row justify-content-between">
                    <div class="titles">
                        <h4>${title}</h4>
                        <h6>Project Manager: ${manager}</h6>					
                    </div>
                    <ul class="btns">
                        <li><a href="https://forms.google.com" target="_blank">Join</a></li>
                    </ul>
                </div>
                <p>${description}</p>
                <p class="address"><span class="lnr lnr-map"></span>${location}</p>
                <p class="address"><span class="lnr lnr-database"></span>${time_required}</p>
            </div>
        </div>
    `;

    document.getElementById('post-list').appendChild(postDiv);
};


function getProjects() {
    if (role_query == null) {
        var ref = db.collection("projects")
    } else {
        var ref = db.collection("projects").where("roles_needed", "array-contains", role_query)
    }

    console.log(ref)
    ref
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                createPostDiv(doc)
            });
    })
        .catch((error) => {
            console.log("Error getting documents: ", error);
    });   
};


getProjects()



//getting roles

function getRoleCount(role) {
    return db.collection("projects").where("roles_needed", "array-contains", role).get()
        .then(snapshot => {
            return snapshot.size;
        })
        .catch(error => {
            console.error("Error getting documents: ", error);
        });
}

function createRoleDiv(role, count) {
    const roleDiv = document.createElement('div');
    roleDiv.innerHTML = `
        <li><a class="justify-content-between d-flex" href="?role=${role}"><p>${capitalizeFirstLetter(role)}</p><span>${count}</span></a></li>
    `;
    document.getElementById('role-list').appendChild(roleDiv);
}

function getRoles() {
    db.collection("config").doc("config")
        .get()
        .then((snap => {
            const roles = snap.data().roles

            roles.forEach(role => {
                getRoleCount(role).then(count => {
                    createRoleDiv(role, count)
                });
            });
        }))
};

getRoles()



//get featured projects
function createFeaturedDiv(carouselDiv, doc) {
    const data = doc.data();

    const title = data.title || 'No title';
    const manager = data.manager || 'No manager';
    const image_url = data.image_url || 'img/r1.jpg';
    const description = data.description || 'No description';
    const time_required = data.time_required || 'No time required';
    const location = data.location || 'No location';

    const featuredDiv = document.createElement('div');
    featuredDiv.innerHTML = `
    <div class="single-rated">
        <img class="img-fluid" src="${image_url}">
        <h4>${title}</h4>
        <h6>Project Manager: ${manager}</h6>
        <p>${description}</p>
        <p class="address"><span class="lnr lnr-map"></span> ${location}</p>
        <p class="address"><span class="lnr lnr-database"></span> ${time_required}</p>
        <a href="https://forms.google.com" class="btns text-uppercase">Join</a>
    </div>
    `;
    
    carouselDiv.appendChild(featuredDiv)
}


function getFeatured() {
    db.collection("projects").where("featured", "==", true)
    .get()
    .then((querySnapshot) => {
        const carouselDiv = document.createElement("div")
        carouselDiv.classList.add("active-related-job-carusel")

        querySnapshot.forEach((doc) => {
            createFeaturedDiv(carouselDiv, doc)
        });

        const featuredDiv = document.getElementById("featured")
        featuredDiv.appendChild(carouselDiv)

        $('.active-related-job-carusel').owlCarousel({
            items:1,
            autoplay:true,
            loop:true,
            margin:30,
            dots: true
        });

    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
});   
}


document.addEventListener("DOMContentLoaded", function() {
    getFeatured();
});
