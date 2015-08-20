$(document).ready(function() {
    var $container = null;

    $('#search-form').on('submit', function(event) {
        event.preventDefault();
        removeErrors();

        var url = $('#search-url').val();

        if (checkForUrl(url)) {
            $.ajax({
                dataType: 'json',
                url: '/loader.php?url=' + url,
            }).done(function(response) {
                $container = $(response.content);
                processWebsite(url, response.statusCode);
            }).error(function() {
                displayError('something didn\'t work');
            });
        }
    });

    function processWebsite(url, statusCode) {
        var $line = $('<tr></tr>'), styleClass;

        $('#result-url').html(url);

        if (statusCode === 200) {
            styleClass = 'is-success';
        } else {
            styleClass = 'is-error';
        }
        $line.append('<td class="result-box-url js-url-element ' + styleClass + '">' + url + '' +
            '<div class="result-box-url-overlay hidden js-url-element-overlay">Statuscode: ' + statusCode + '</div>' +
            '</td>');
        $line.append(addCounterTableCell($container, 'a'));
        $line.append(addCounterTableCell($container, 'div'));
        $line.append(addCounterTableCell($container, 'p'));
        $line.append(addCounterTableCell($container, 'span'));
        $line.append(addCounterTableCell($container, 'article'));
        $line.append(addCounterTableCell($container, 'section'));
        $line.append(addCounterTableCell($container, 'header'));
        $line.append(addCounterTableCell($container, 'footer'));
        $line.append(addCounterTableCell($container, 'aside'));
        $line.append(addCounterTableCell($container, 'nav'));
        $line.append(addCounterTableCell($container, 'h1'));
        $line.append(addCounterTableCell($container, 'h2'));
        $line.append(addCounterTableCell($container, 'h3'));
        $line.append(addCounterTableCell($container, 'h4'));
        $line.append(addCounterTableCell($container, 'h5'));
        $line.append(addCounterTableCell($container, 'h6'));
        $line.append(addCounterTableCell($container, 'img'));
        $line.append(addCounterTableCell($container, 'b'));
        $line.append(addCounterTableCell($container, 'i'));
        $line.append($('<td><span class="result-remove-icon js-remove-item">X</span></td>'));

        $('#result-table').append($line);

        bindDomEvents();
        addOverlays();
    }

    function removeErrors() {
        $('#error-container').html('');
    }

    function displayError(message) {
        var $container = $('#error-container');

        $container.html(message);
    }

    function checkForUrl(url) {
        var isUrl = false;

        if (url && url.indexOf('.') !== -1) {
            isUrl = true;
        }

        return isUrl;
    }

    function addCounterTableCell($container, name) {
        var $td = $('<td></td>');

        $td.html($container.find(name).length);
        return $td;
    }

    function unbindDomEvents() {
        $('.js-remove-item').off('click');
    }

    function bindDomEvents() {
        unbindDomEvents();
        $('.js-remove-item').on('click', function(event) {
            $(event.currentTarget).parents('tr').remove();
        });
    }

    function addOverlays() {
        $('.js-url-element').on('mouseover', function(event) {
            var $container = $(event.currentTarget);
            showUrlOverlay($container);
        });

        $('.js-url-element').on('mouseout', function() {
            hideUrlOverlay();
        });
    }

    function showUrlOverlay($container) {
        $container.find('.js-url-element-overlay').removeClass('hidden');
    }

    function hideUrlOverlay() {
        $('.js-url-element-overlay').addClass('hidden');
    }
});
