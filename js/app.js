'usestrict';

let Arr1 = [];
let Arr2 = [];
let filter1 = [];
let filter2 = [];
Item.all = [];

let newArr = [];
$.get('data/page-1.json')
    .then(data => {
        data.forEach(value => {
            let itms1 = new Item(value.image_url, value.title, value.description, value.keyword, value.horns);
            Arr1.push(itms1);
            Arr2.push(itms1);
            filter1.push(itms1);
            if (!newArr.includes(value.keyword)) {
                newArr.push(value.keyword);
                $('#filter').append(`<option class="filter1">${value.keyword}</option>`);
            }
            itms1.itmsRender();
        });
    });

function Item(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    Item.all.push(this);
}
let newArr2 = [];
$.get('data/page-2.json')
    .then(data => {
        data.forEach(value => {
            let itms2 = new Item(value.image_url, value.title, value.description, value.keyword, value.horns);
            Arr1.push(itms2);
            Arr2.push(itms2);
            filter2.push(itms2);
            if (!newArr2.includes(value.keyword)) {
                newArr2.push(value.keyword);
                $('#filter').append(`<option class="filter2">${value.keyword}</option>`);
            }
            itms2.itmsRender2();
        });
    });

// prototype to render the page-1.json data:
Item.prototype.itmsRender = function() {

    let viewTmpl = $('#horns-template').html();
    let htmlLook = Mustache.render(viewTmpl, this);
    $('#first-page').append(htmlLook);
};
// prototype to render the page-2.json data:
Item.prototype.itmsRender2 = function() {
    let viewTmpl = $('#horns-template').html();
    let htmlLook = Mustache.render(viewTmpl, this);
    $('#second-page').append(htmlLook);
};

// functoin to hide  page-2.json data and show page-2.json data and filter lest:
$('#page-1').on('click', function() {
    Arr1 = []; //     console.log('you are in the first page');
    for (let i = 0; i < filter1.length; i++) {
        Arr1.push(filter1[i]);

        $('#second-page').hide();
        $('.filter2').hide();
        $('#first-page').hide();
        $('#third-page').empty();
        $('#third-page').show();
        renderOut();
        $('.filter1').show();
    }
});

// functoin to hide  page-2.json data and show page-2.json data and filter lest:
$('#page-2').on('click', function() {
    Arr1 = [];
    Arr2 = [];
    //     console.log('you are in the first page');
    for (let i = 0; i < filter2.length; i++) {
        Arr1.push(filter2[i]);
    }

    $('#first-page').hide();
    $('.filter1').hide();
    $('#second-page').hide();
    $('.filter2').show();
    $('#third-page').empty();
    $('#third-page').show();
    renderOut();
});

// functoin to  filter the images appear:
$('#filter').on('change', function() {
    Arr1 = [];
    let selectedItem = $('#filter').find(':selected ').text(); // :selected proprety to find the selected option. 
    for (let i = 0; i < Item.all.length; i++) {
        if (selectedItem === Item.all[i].keyword) {
            Arr1.push(Item.all[i]);
            Arr2.push(Item.all[i]);
        }
    }

    //     $('section').hide();
    //     // all the sections will hide
    //     $(`.${selectedItem}`).show(); // the selected section will show(depend on its class name).
    $('#first-page').hide();
    $('.filter1').hide();
    $('#second-page').hide();
    $('#third-page').show();
    $('#third-page').empty();

    renderOut();


});

$('#sort').on('change', function() {
    let sort1 = $('#sort').find(':selected ').text();
    if (sort1 === 'Name') {
        $('#first-page').hide();
        $('#second-page').hide();
        //         $('#third-page').show();
        $('#third-page').empty();
        //         console.log("ok her we go")
        Arr1.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return Arr1;
        });
        renderOut();
    } else if (sort1 === 'Horns') {
        $('#first-page').hide();
        $('#second-page').hide();
        //         $('#fourth-page').show();
        $('#third-page').empty();
        Arr1.sort((a, b) => {
            if (a.horns < b.horns) return -1;
            if (a.horns > b.horns) return 1;
            return Arr1;
        });
        renderOut();
    }
});
// console.log('Item.all', Item.all);

function renderOut() {
    for (let i = 0; i < Arr1.length; i++) {
        $(`#third-page`).append(`<section class = ${i}></section>`);
        $(`.${i}`).append(`<h2 class = ${Arr1[i].keyword}>${Arr1[i].title}</h2>`);
        $(`.${i}`).append(`<img src = ${Arr1[i].image_url} class = ${Arr1[i].keyword}></img>`);
        $(`.${i}`).append(`<p class =${Arr1[i].keyword}> ${Arr1[i].description}</p>`);
    }
}

// function renderOutHorns() {
//     for (let i = 0; i < Arr1.length; i++) {
//         $(`#third-page`).append(`<section id = ${i}></section>`);
//         $(`#${i}`).append(`<h2 class = ${Arr1[i].keyword}>${Arr1[i].title}</h2>`);
//         $(`#${i}`).append(`<img src = ${Arr1[i].image_url} class = ${Arr1[i].keyword}></img>`);
//         $(`#${i}`).append(`<p class =${Arr1[i].keyword}> ${Arr1[i].description}</p>`);
//     }
// };