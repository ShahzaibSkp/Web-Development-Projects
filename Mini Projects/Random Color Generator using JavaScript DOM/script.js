console.log("Random Color Generator");

function getRandomColor() {
    let Val1 = Math.floor(Math.random() * 256);
    let Val2 = Math.floor(Math.random() * 256);
    let Val3 = Math.floor(Math.random() * 256);
    let Val4 = Math.floor(Math.random() * 11);
    return `rgba(${Val1}, ${Val2}, ${Val3}, ${Val4})`;
}

let boxes = document.querySelectorAll(".box");

boxes.forEach(e => {
    e.style.backgroundColor = getRandomColor();
    e.style.color = getRandomColor();
});
