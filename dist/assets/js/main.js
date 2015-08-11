$(document).ready(function() {
    console.log("ready!");

    $('#search-form').on('submit', function(event) {
        event.preventDefault();

        var url = $('#search-url').val();

        console.log(url);
    });
});
