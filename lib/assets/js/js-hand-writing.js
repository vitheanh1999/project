
    $("#quantity").on("change paste click ", function () {

        let value = $('#quantity').val();

        if (value == '') {
            value = 0;
        }
        else if (value == 0) {
            value = '';
        }
        $('#quantity').val(value);

    });

    $("#importCapitalPrice").on("change paste click ", function () {

        let value = $('#importCapitalPrice').val();

        if (value == '') {
            value = 0;
        }
        else if (value == 0) {
            value = '';
        }
        $('#importCapitalPrice').val(value);

    });
    $("#discount").on("change paste click ", function () {
        let value = $('#discount').val();
        if (value == '') {
            value = 0;
        }
        else if (value == 0) {
            value = '';
        }
        $('#discount').val(value);
    });
    $("#retailPrice").on("change paste click ", function () {

        let value = $('#retailPrice').val();

        if (value == '') {
            value = 0;
        }
        else if (value == 0) {
            value = '';
        }
        $('#retailPrice').val(value);
    });

    $("#quantity").on("change paste click ", function () {

        let value = $('#quantity').val();

        if (value == '') {
            value = 0;
        }
        else if (value == 0) {
            value = '';
        }
        $('#quantity').val(value);

    });

    function disableEnterKey(e, id) {
        let key;

        if (window.event)
            //Trình duyệt IE
            key = window.event.keyCode;
        else
            //trình duyệt firefox
            key = e.which;

        if (key == 13) {


            if (id.id == 'nameUnit') {
                $('#quantityConvert').focus();
            } if (id.id == 'quantityConvert') {
                $('#priceRetail').focus();
            } if (id.id == 'priceRetail') {
                $('#addMoreUnit').focus();
            }
            if (id.id == 'unitCaculation') {

                $('a#addMoreUnit').focus();
                $('#addMoreUnit').focus();
            }
            if (id.id == 'priceRetail') {
                $('#addMoreUnit').focus();
            }
            return false;
        }
        else
            return true;
    }