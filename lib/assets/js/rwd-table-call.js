
$(function () { // on DOM ready
    setTimeout(function () {
        $('.table-responsive').responsiveTable({
            pattern: 'priority-columns',
            stickyTableHeader: true,
            fixedNavbar: '.navbar-fixed-top',
            addDisplayAllBtn: false, // should it have a display-all button?
            addFocusBtn: false,  // should it have a focus button?
            focusBtnIcon: 'glyphicon glyphicon-screenshot',
            mainContainer: window,
            i18n: {
                focus: 'Focus',
                display: 'Hiển thị',
                displayAll: 'Display all'
            }
        });
    }, 500);

});  // end DOM ready