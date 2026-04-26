let images = [];
let currentIndex = 0;


window.onload = function() {
    let imgTags = document.querySelectorAll(".gallery img");
    imgTags.forEach((img, index) => {
        images.push(img.src);

       
        img.setAttribute("data-index", index);
    });
};

function openImage(img) {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("bigImage").src = img.src;

    
    currentIndex = parseInt(img.getAttribute("data-index"));
}

function closeImage() {
    document.getElementById("lightbox").style.display = "none";
}

function next() {
    currentIndex++;
    if (currentIndex >= images.length) currentIndex = 0;

    document.getElementById("bigImage").src = images[currentIndex];
}

function prev() {
    currentIndex--;
    if (currentIndex < 0) currentIndex = images.length - 1;

    document.getElementById("bigImage").src = images[currentIndex];
}
function filter(category) {
    let imgs = document.querySelectorAll(".gallery img");

    imgs.forEach(img => {
        if (category === "all") {
            img.style.display = "block";
        } 
        else if (img.classList.contains(category)) {
            img.style.display = "block";
        } 
        else {
            img.style.display = "none";
        }
    });
}
document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
});
document.getElementById("lightbox").onclick = function(e) {
    if (e.target.id === "lightbox") closeImage();
};
function addImage() {
    let fileInput = document.getElementById("fileInput");
    let category = document.getElementById("category").value;

    let file = fileInput.files[0];

    if (!file) {
        alert("Please select an image");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e) {
        let gallery = document.querySelector(".gallery");

        let img = document.createElement("img");
        img.src = e.target.result;
        img.className = category;

        
        img.onclick = function() {
            openImage(this);
        };

        gallery.appendChild(img);


        images.push(img.src);
        img.setAttribute("data-index", images.length - 1);

        
        fileInput.value = "";
    };

    reader.readAsDataURL(file);
}