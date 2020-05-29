// *** Start Search for users *** //
$(".searchbar input[type='search']").on('keyup', function () {
    let user = $(this).val().toLowerCase();
    $('.user').filter(function () {
        $(this).toggle($(this).find('p.username').text().toLowerCase().search(user) >=0);
    })
})
