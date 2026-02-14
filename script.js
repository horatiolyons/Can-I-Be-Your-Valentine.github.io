function initialize() {
document.getElementById('nonButton').addEventListener('mouseenter', moveNonButton);
window.addEventListener('resize', moveNonButton);
    document.getElementById('nonButton').addEventListener('mouseenter', function() {
        img.src = 'img/cats-sad.gif';
    });
    document.getElementById('ouiButton').addEventListener('mouseenter', function() {
        img.src = 'img/love-cat.gif';
    });
}

const img = document.querySelector('img');
initialize();
