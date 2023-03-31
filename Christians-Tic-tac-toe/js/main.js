
//select the class of square and add a click event so when it is clicked it shows picture to be used as X or O
document.querySelector(".square").addEventListener('click', insertImage)
//write the function that inserts the image into the html and add a class to be edited in css
function insertImage(){
    let shape = document.querySelector(".square");
    shape.innerHTML = "<img src='images/favpng_jupiter-planet-mercury-uranus-clip-art.png' class='image-class'>";
}