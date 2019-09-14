let button = document.querySelector('.button');
let input = document.querySelector('.size');
let wrapperField = document.querySelector('.wrapper-first');
let wrapper;
let size;
let field;

button.addEventListener('click', () =>{
    size = +input.value;
    wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    wrapper.style.width = `${size*54}px`;
    document.body.appendChild(wrapper);
    wrapper.style.display = 'flex';

    for (let i=1; i<=size*size; i++){
        let block = document.createElement('div');
        block.id = `${i}`;
        block.className = 'field';
        block.dataset.status = 'empty';
        block.dataset.flag = 'false';
        wrapper.appendChild(block);
    }

    wrapperField.remove();
    field = wrapper.querySelectorAll('.field');
    setBomb(field);

    wrapper.addEventListener('click', (event) =>{
        openField(event.target);

    });

    field.forEach(elem =>{
        elem.ondblclick = function (event) {
            let innerBomb = countBomb(elemArray(event.target.id));
            let flags = countFlag(elemArray(event.target.id));
            if (+innerBomb === +flags){
                elemArray(event.target.id).forEach(elem =>{
                        openField(elem);
                })
            }
        }
    });

    field.forEach(elem =>{
        elem.oncontextmenu = function (event) {
            event.preventDefault();
            if (!event.target.dataset.open && event.target.dataset.flag === 'false'){
                event.target.innerHTML = '<i class="fas fa-flag"></i>';
                event.target.dataset.flag = 'true'
            }else if(event.target.dataset.flag === 'true' && event.target.childNodes){
                event.target.innerHTML = '';
                event.target.dataset.flag = 'false';
            }else if(event.target.classList.contains('fa-flag')){
                let cell = event.target.parentNode
                event.target.parentNode.innerHTML = '';
                cell.dataset.flag = 'false';
            }
        };
    });
});

function setBomb(field) {
    let bomb = size*size / 6;
    let i = 0;
    while(i < Math.round(bomb)){
        let number = Math.floor(Math.random()* size * size);
        if (field[number].dataset.status !== 'bomb'){
            field[number].dataset.status = 'bomb';
            i++
        }
    }
}
function openField(elem) {
    if (elem.dataset.status !== 'bomb' && elem.dataset.open !== 'true'){
        elem.dataset.open = 'true';
        elem.style.backgroundColor = 'white';
        elem.innerHTML = `${countBomb(elemArray(elem.id))}`;
        if (countBomb(elemArray(elem.id)) === 0){
            elemArray(elem.id).forEach(elem =>{
                openField(elem)
            })
        }
    }
    else if (elem.dataset.status === 'bomb' && elem.dataset.flag !== 'true'){
        field.forEach(elem =>{
            if (elem.dataset.status === 'bomb'){
                elem.classList.add('bomb')
            }else {
                elem.style.backgroundColor = 'white'
            }
        })
    }
}
function elemArray(id) {
    const array = [];
    if (+id === size){
        let downEl = document.getElementById(`${+id + size}`);
        let leftEl = document.getElementById(`${+id - 1}`);
        let crossEl = document.getElementById(`${+id + size -1}`);
        array.push(downEl,leftEl,crossEl);
    }
    else if(+id === 1){
        let downEl = document.getElementById(`${+id + size}`);
        let rightEl = document.getElementById(`${+id + 1}`);
        let crossEl = document.getElementById(`${+id + size +1}`);
        array.push(downEl,rightEl,crossEl);
    }
    else if(+id === size*size){
        let topEl = document.getElementById(`${+id - size}`);
        let leftEl = document.getElementById(`${+id - 1}`);
        let crossEl = document.getElementById(`${+id - size -1}`);
        array.push(topEl,leftEl,crossEl);
    }

    else if(+id === (size * size) - size +1){
        let topEl = document.getElementById(`${+id - size}`);
        let rightEl = document.getElementById(`${+id +1}`);
        let crossEl = document.getElementById(`${+id - size +1}`);
        array.push(topEl,rightEl,crossEl);
    }
    else if (+id < size){
        let leftEl = document.getElementById(`${+id - 1}`);
        let crossLeftEl = document.getElementById(`${+id + size -1}`);
        let downEl = document.getElementById(`${+id + size}`);
        let crossDownEl = document.getElementById(`${+id + size + 1}`);
        let rightEl = document.getElementById(`${+id + 1}`);
        array.push(downEl,rightEl,leftEl,crossLeftEl,crossDownEl);
    }
    else if (id % size === 0){
        let leftEl = document.getElementById(`${+id - 1}`);
        let crossLeftEl = document.getElementById(`${+id - size -1}`);
        let downEl = document.getElementById(`${+id + size}`);
        let crossDownEl = document.getElementById(`${+id + size - 1}`);
        let topEl = document.getElementById(`${+id - size}`);
        array.push(downEl,topEl,leftEl,crossLeftEl,crossDownEl);
    }
    else if (id > size*size - size){
        let leftEl = document.getElementById(`${+id - 1}`);
        let crossLeftEl = document.getElementById(`${+id - size -1}`);
        let topEl = document.getElementById(`${+id - size}`);
        let crossRightEl = document.getElementById(`${+id - size + 1}`);
        let rightEl = document.getElementById(`${+id + 1}`);
        array.push(rightEl,topEl,leftEl,crossLeftEl,crossRightEl);
    }
    else if (id % size === 1){
        let downEl = document.getElementById(`${+id + size}`);
        let downCrossEl = document.getElementById(`${+id + size + 1}`);
        let topEl = document.getElementById(`${+id - size}`);
        let crossRightEl = document.getElementById(`${+id - size + 1}`);
        let rightEl = document.getElementById(`${+id + 1}`);
        array.push(rightEl,topEl,downEl,downCrossEl,crossRightEl);
    }
    else{
        let downEl = document.getElementById(`${+id + size}`);
        let downCrossEl = document.getElementById(`${+id + size + 1}`);
        let topEl = document.getElementById(`${+id - size}`);
        let crossRightEl = document.getElementById(`${+id - size + 1}`);
        let rightEl = document.getElementById(`${+id + 1}`);
        let leftEl = document.getElementById(`${+id - 1}`);
        let downLeftEl = document.getElementById(`${+id + size - 1}`);
        let topLeftEl = document.getElementById(`${+id - size - 1}`);
        array.push(rightEl,topEl,downEl,downCrossEl,crossRightEl,leftEl,downLeftEl,topLeftEl);
    }
    return array

}
function countBomb(array) {
    let bomb = 0;
    array.forEach(elem =>{
        if (elem.dataset.status === 'bomb'){
            bomb++
        }
    });
    return bomb
}
function countFlag(array) {
    let flag = 0;
    array.forEach(elem =>{
        if (elem.dataset.flag === 'true'){
            flag++
        }
    });
    return flag
}









