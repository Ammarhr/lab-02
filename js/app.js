'usestrict';

function Item(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
}
let newArr = [];
$.get('data/page-1.json')
    .then(data => {
        //     console.log(data)
        data.forEach(value => {
            let itms = new Item(value.image_url, value.title, value.description, value.keyword, value.horns);
            if (!newArr.includes(value.keyword)) {
                newArr.push(value.keyword);
                $('select').append(`<option>${value.keyword}</option>`);
            }
            itms.itmsRender();

        });
    });
let a = 0;
Item.prototype.itmsRender = function() {
    //first way:
    //     $('div').append(`<h2 class = ${this.keyword}>${this.title}</h2>`);
    //     $('div').append(`<img src = ${this.image_url} class = ${this.keyword}></img>`);
    //     $('div').append(`<p class = ${this.keyword}>${this.description}</p>`);
    // second way:
    a++;
    if (a < 21) {
        let itemRender = $('.photo-container').clone().attr('class', this.keyword);
        //     console.log(itemRender.html());
        itemRender.removeClass('photo-container');
        itemRender.find('h2').text(`${this.title}`).attr('class', this.keyword);
        itemRender.find('img').attr('src', this.image_url).attr('class', this.keyword);
        itemRender.find('p').text(`${this.description}`).attr('class', this.keyword);
        $('main').append(itemRender);
    } else if (a = 21) {
        $('.photo-container').remove();
    }
};


$('select').on('change', function() {
    //    first way:
    let selectedItem = $('select').find(':selected ').text(); // :selected proprety to find the selected option. 
    $('section').hide(); // all the sections will hide
    $(`.${selectedItem}`).show(); // the selected section will show(depend on its class name).


    //the logic:
    //     if ($(this).val() === 'unicorn') {
    // $('section').hide();
    //         $(`.unicorn`).show();
    //     } else if ($(this).val() === 'unilego') {
    //      // $('section').hide();
    //         $(`.unilego`).show();
    //     } else if ($(this).val() === 'rhino') {
    //  // $('section').hide();
    //         $(`.rhino`).show();
    //     } else if ($(this).val() === 'narwhal') {
    //     // $('section').hide();
    //         $(`.narwhal`).show();
    //     } else if ($(this).val() === 'triceratops') {
    //    // $('section').hide();
    //         $(`.triceratops`).show();
    //     } else if ($(this).val() === 'markhor') {
    //     // $('section').hide();
    //         $(`.markhor`).show();
    //     } else if ($(this).val() === 'mouflon') {
    //     // $('section').hide();
    //         $(`.mouflon`).show();
    //     } else if ($(this).val() === 'addax') {
    //        // $('section').hide();
    //         $(`.addax`).show();
    //     } else if ($(this).val() === 'chameleon') {
    //       // $('section').hide();
    //         $(`.chameleon`).show();
    //     } else if ($(this).val() === 'lizard') {
    //       // $('section').hide();
    //         $(`.lizard`).show();
    //     } else if ($(this).val() === 'dragon') {
    //     // $('section').hide();
    //         $(`.dragon`).show();
    //     }

});