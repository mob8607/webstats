$(document).ready(function() {
    var $container = null;

    $('#search-form').on('submit', function(event) {
        event.preventDefault();

        var url = $('#search-url').val();

        $.ajax({
            url: '/loader.php?url=' + url
        }).done(function(response) {
            $container = $(response);
            processWebsite(url);
        });
    });

    function processWebsite(url) {
        $line = $('<tr></tr>')




        $('#result-url').html(url);

        $line.append('<td>' + url + '</td>');
        $line.append(addCounterTableCell($container, 'a'));
        $line.append(addCounterTableCell($container, 'span'));
        $line.append(addCounterTableCell($container, 'div'));
        $line.append(addCounterTableCell($container, 'h1'));
        $line.append(addCounterTableCell($container, 'h2'));
        $line.append(addCounterTableCell($container, 'h3'));
        $line.append(addCounterTableCell($container, 'h4'));
        $line.append(addCounterTableCell($container, 'h5'));
        $line.append(addCounterTableCell($container, 'h6'));
        $line.append(addCounterTableCell($container, 'img'));

        $('#result-table').append($line);
    }

    function addCounterTableCell($container, name) {
        $td = $('<td></td>');

        $td.html($container.find(name).length);
        return $td;
    }
});
