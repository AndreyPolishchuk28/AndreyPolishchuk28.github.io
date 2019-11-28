let square = document.querySelector('.bars-icon');
let bars = document.querySelector('.responsive-block');

// square.addEventListener('click',toggle);
//
// function toggle() {
//     square.classList.toggle('fa-times');
//     if(square.classList.contains('fa-times')){
//         bars.style.display="block";
//     }else {
//         bars.style.display="none";
//     }
// }


square.addEventListener('click', () =>{
    square.classList.toggle('fa-times')
    if(square.classList.contains('fa-times')){
        bars.style.display="block";
    }else {
        bars.style.display="none";
    }
});
































