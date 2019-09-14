// --------O U R    S E R V I C E S-----------JS
let serviceTabs = document.querySelectorAll('.services-item-name');
let imgItem = document.querySelectorAll('.img-item');
let lepTopText = document.querySelectorAll('.leptop-text');

serviceTabs.forEach((item, index) =>{
    item.addEventListener('click', function (event) {
        document.querySelector('.active').classList.remove('active');
        event.target.classList.add('active');
        item.dataset.number = `${index}`;

        imgItem.forEach(elem =>{
            elem.style.display = 'none'
        });

        lepTopText.forEach(elem =>{
            elem.style.display = 'none'
        });
        imgItem[event.target.dataset.number].style.display = 'block'
        lepTopText[event.target.dataset.number].style.display = 'block'
    })
});


// --------F I L T E R------------------------JS
let tabs = document.querySelectorAll('.amazing-work-name');
let img = document.querySelectorAll('.card');
let loadBtn = document.querySelector('.wraped-loadbtn');
let loader = document.querySelector('.artboard');
let quantityCards = 12;


function showCard(category){
    loadBtn.style.display = 'none';
    let counter = quantityCards;
    img.forEach(card =>{
        if (category === card.dataset.name || category === undefined){
            if (counter !==0){
                card.style.display = 'block';

                counter--;
            }else {
                loadBtn.style.display = 'block';
                card.style.display = 'none';
            }
        }else {
            card.style.display = 'none';
        }
    });
}
showCard();

tabs.forEach(elem =>{
    elem.addEventListener('click', () =>{
        tabs.forEach(tab =>{
            tab.classList.remove('amazing-work-name-active')
        });
        elem.classList.add('amazing-work-name-active');
        showCard(elem.dataset.name)
    })
});
loadBtn.addEventListener('click', function () {
    loader.style.display = 'flex';
    loadBtn.style.display = 'none';
    setTimeout(function () {
        quantityCards += 12;
        let category = document.querySelector('.amazing-work-name-active').dataset.name;
        showCard(category);
        loader.style.display = 'none';
    }, 2000)

});

// --------F I L T E R------------------------JQUERY
$('.user-small-photo').each(function (index) {
    $('.user-small-photo').eq(index).on('click', function () {
        $('.user-small-photo').removeClass('hold-top');
        $('.user-small-photo').eq(index).addClass('hold-top');
        $('.user-small-photo').children().removeClass('insert-active');
        $('.user-small-photo').eq(index).children().addClass('insert-active');
        $('.feedback-block').removeClass('feedback-block-active');
        $('.feedback-block').animate({opacity: 0});
        $('.feedback-block').eq(index).addClass('feedback-block-active').fadeIn(600).animate({opacity:1});
        });
    });


$('.arrows-right').on('click', function () {
    let active = $('.user-small-photo.hold-top');
    let photo = $('.user-small-photo');
    let feedback = $('.feedback-block.feedback-block-active');
    let feedbackActive = $('.feedback-block');
    let insertActive = $('.insert-small-circle.insert-active');
    let insert = $('.insert-small-circle');
    let current;
        // = active.index()<photo.length ? active.index():0;
    if(active.index()<photo.length){
        current=active.index();
    }else{
        current = 0;
    }

    feedback.removeClass('feedback-block-active').animate({opacity: 0});
    active.removeClass('hold-top');
    feedbackActive.eq(current).addClass('feedback-block-active').fadeIn(800).animate({opacity:1});
    photo.eq(current).addClass('hold-top');
    insertActive.removeClass('insert-active');
    insert.eq(current).addClass('insert-active');
});



$('.arrows-left').on('click', function () {
    let active = $('.user-small-photo.hold-top');
    let photo = $('.user-small-photo');
    let feedback = $('.feedback-block.feedback-block-active');
    let feedbackActive = $('.feedback-block');
    let insertActive = $('.insert-small-circle.insert-active');
    let insert = $('.insert-small-circle');
    let current;
    // = active.index()<photo.length ? active.index():0;
    if(active.index()>0){
        current=active.index()-2;
    }else{
        current = photo.length;
    }
    feedback.removeClass('feedback-block-active').animate({opacity: 0});
    feedbackActive.eq(current).addClass('feedback-block-active').fadeIn(600).animate({opacity:1});
    active.removeClass('hold-top');
    photo.eq(current).addClass('hold-top');
    insertActive.removeClass('insert-active');
    insert.eq(current).addClass('insert-active');
});

$('.user-small-photo')[2].click();
// let elem = document.querySelector('.gallery');

// let msnry = new Masonry( elem, {
//     itemSelector: '.item-masonry',
//     columnWidth: 370,
//     percentPosition: true
// });
msnry = new Masonry( '.gallery', {
    gutter: 10,
    // horizontalOrder: true,
    fitWidth: true});




