'usestrict';

let Arr1 = [];
Item.all = [];

function Item(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    Item.all.push(this);
}
let newArr = [];
$.get('data/page-1.json')
    .then(data => {
        data.forEach(value => {
            let itms1 = new Item(value.image_url, value.title, value.description, value.keyword, value.horns);
            Arr1.push(itms1);
            if (!newArr.includes(value.keyword)) {
                newArr.push(value.keyword);
                $('#filter').append(`<option class="filter1">${value.keyword}</option>`);
            }
            itms1.itmsRender();
        });
    });
let newArr2 = [];
$.get('data/page-2.json')
    .then(data => {
        data.forEach(value => {
            let itms2 = new Item(value.image_url, value.title, value.description, value.keyword, value.horns);
            //   Arr2.push(itms2);
            if (!newArr2.includes(value.keyword)) {
                newArr2.push(value.keyword);
                $('#filter').append(`<option class="filter2">${value.keyword}</option>`);
            }
            itms2.itmsRender2();
        });
    });
// console.log('this is arr 1', Arr1);
// console.log('this is arr 2', Arr2);
// prototype to render the page-1.json data:
Item.prototype.itmsRender = function() {
    //first way:
    //     $('div').append(`<h2 class = ${this.keyword}>${this.title}</h2>`);
    //     $('div').append(`<img src = ${this.image_url} class = ${this.keyword}></img>`);
    //     $('div').append(`<p class = ${this.keyword}>${this.description}</p>`);
    // second way:
    //         let itemRender = $('.photo-container').clone().attr('class', this.keyword);
    //         itemRender.removeClass('photo-container');
    //         itemRender.find('h2').text(`${this.title}`).attr('class', this.keyword);
    //         itemRender.find('img').attr('src', this.image_url).attr('class', this.keyword);
    //         itemRender.find('p').text(`${this.description}`).attr('class', this.keyword);
    //         $('main').append(itemRender);
    //third way:
    let viewTmpl = $('#horns-template').html();
    let htmlLook = Mustache.render(viewTmpl, this);
    $('#first-page').append(htmlLook);

};
// prototype to render the page-2.json data:
Item.prototype.itmsRender2 = function() {
    let viewTmpl = $('#horns-template').html();
    let htmlLook = Mustache.render(viewTmpl, this);
    $('#second-page').append(htmlLook);
}

// functoin to hide  page-2.json data and show page-2.json data and filter lest:
$('#page-1').on('click', function() {
    //     console.log('you are in the first page');
    $('#second-page').hide();
    $('.filter2').hide();
    $('#first-page').show();
    $('.filter1').show();
})

// functoin to hide  page-2.json data and show page-2.json data and filter lest:
$('#page-2').on('click', function() {
    //     console.log('you are in the first page');
    $('#first-page').hide();
    $('.filter1').hide();
    $('#second-page').show();
    $('.filter2').show();

})

// functoin to  filter the images appear:
$('#filter').on('change', function() {
    let selectedItem = $('#filter').find(':selected ').text(); // :selected proprety to find the selected option. 
    $('section').hide(); // all the sections will hide
    $(`.${selectedItem}`).show(); // the selected section will show(depend on its class name).
});
// $('#sort').on('change', arr => {
//     let sort1 = $('#sort').find(':selected ').text();
//     if (sort1 === 'Name') {
//         console.log('asasdzzzzzzzzzzzz');
//         arr.sort(function(a, b) {
//             if (a.title < b.title) {
//                 return -1;
//             }
//             if (a.title > b.title) {
//                 return 1;
//             }
//             return 0;
//         });
//         return arr;
//     } else {
//         arr.sort(function(a, b) {
//             return a.horns - b.horns;
//         });
//         return arr;
//     }

// });
$('#sort').on('change', function() {
    let sort1 = $('#sort').find(':selected ').text();
    if (sort1 === 'Name') {
        console.log("ok her we go")
        Item.all.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return 0;
        });
    } else if (sort1 === 'Horns') {
        Item.all.sort((a, b) => {
            if (a.horns < b.horns) return -1;
            if (a.horns > b.horns) return 1;
            return 0;
        });
    }
});
console.log('cons', Item.all);
// console.log(Arr1);