function myFunction() {
    var x = document.getElementById("divSearch");
    var y = document.getElementById("divQuantity");
    // var z = document.getElementById("divUnit");
    // col - sm - 8 col - xs - 8

    if (x.className == "col-md-9 col-sm-9 col-xs-9 autocomplete" || x.className == "col-sm-9" || x.className == "col-xs-9") {

        x.className = "col-md-8 col-sm-8 col-xs-8 autocomplete";

        $('#inputSearch').focus()
        //hien
        y.style.display = 'block';
        // z.className = "col-md-1";       
        //  y.style.display = 'block';      
        //  z.style.display = 'block';

    } else {
        ///ân
        x.className = "col-md-9 col-sm-9 col-xs-9 autocomplete";
        $('#inputSearch').focus()
        // y.className = "null"
        // z.className = ""
        y.style.display = 'none';
        // z.style.display = 'none';
    }

}



function myFunctionHavePrescription() {
    var x = document.getElementById("divSearchHavePrescription");
    var y = document.getElementById("divQuantityHavePrescription");
    // var z = document.getElementById("divUnit");
    // col - sm - 8 col - xs - 8

    if (x.className == "col-md-9 col-sm-9 col-xs-9 autocomplete" || x.className == "col-sm-9" || x.className == "col-xs-9") {

        x.className = "col-md-8 col-sm-8 col-xs-8 autocomplete";

        $('#inputSearchHavePrescription').focus()
        //hien
        y.style.display = 'block';
        // z.className = "col-md-1";       
        //  y.style.display = 'block';      
        //  z.style.display = 'block';

    } else {
        ///ân
        x.className = "col-md-9 col-sm-9 col-xs-9 autocomplete";
        $('#inputSearchHavePrescription').focus()
        // y.className = "null"
        // z.className = ""
        y.style.display = 'none';
        // z.style.display = 'none';
    }

}

$(document).ready(function () {
    $("#searchProduct").keypress(function () {
        alert('sdfsdf')
    });
});

function getProductInvoice() {
    $("#searchProductInvoice").addClass("open");

    // var x = document.getElementById('notFound');
    // if (x) {
    //     if (x.style.display === 'block') {
    //         $('#notFound').hide(300);
    //     }
    // }
    $("#searchProductInvoice").removeClass("open");
    setTimeout(function () {
        $("#searchProductInvoice").addClass("open");

    }, 800);





}
function getProductInvoiceHP() {
    $("#searchProductInvoiceHP").addClass("open");

    $("#searchProductInvoiceHP").removeClass("open");
    setTimeout(function () {
        $("#searchProductInvoiceHP").addClass("open");

    }, 800);

}

function getProductInvoiceReturn() {
    $("#searchProductInvoiceReturn").addClass("open");

    $("#searchProductInvoiceReturn").removeClass("open");
    setTimeout(function () {
        $("#searchProductInvoiceReturn").addClass("open");

    }, 800);

}

// $(document).ready(function () {
//     let temp = {
//         exists: '',
//         exists1: '',

//     }

//     let script = document.createElement('script');
//     script.src = "./lib/assets/js/rwd-table-call.js";
//     let div = document.getElementsByClassName('index-script')[0];

//     if (div) {
//         temp.exists = div.innerHTML.toLowerCase().indexOf('./lib/assets/js/rwd-table-call.js')

//         if (temp.exists && temp.exists > -1) {
//             div.removeChild(div.childNodes[0])
//             div.appendChild(script)
//         } else {
//             div.appendChild(script)
//         }
//     }  
// });


// $('body').click(function () {
//     let temp = {
//         exists: '',
//         exists1: '',

//     }


//     // var list = document.getElementById("myList");
//     // list.removeChild(list.childNodes[0]);


//     let script = document.createElement('script');
//     script.src = "./lib/assets/js/rwd-table-call.js";
//     let div = document.getElementsByClassName('index-script')[0];

//     if (div) {
//         temp.exists = div.innerHTML.toLowerCase().indexOf('./lib/assets/js/rwd-table-call.js')

//         if (temp.exists && temp.exists > -1) {
//             div.removeChild(div.childNodes[0])
//             div.appendChild(script)
//         } else {
//             div.appendChild(script)
//         }
//     }
// });


// $('body').click(function () {

//     var script = document.createElement('script');
//     var script1 = document.createElement('script');
//     script.src = "./lib/assets/js/jquery-1-11-0.min.js";
//     script1.src = "./lib/assets/js/rwd-table.js";
//     document.getElementsByTagName('html')[0].appendChild(script);
//     document.getElementsByTagName('html')[0].appendChild(script1);





// });









// $(document).ready(function () {
//     let temp = {
//         existsjq1: '',
//         existsjq2: '',
//         existsrwd1: '',
//         existsrwd2: '',
//         divNew: '',
//         script: '',
//         script2: '',
//     }
//     let script = document.createElement('script');
//     let script1 = document.createElement('script');

//     let script3 = document.createElement('script');
//     let script4 = document.createElement('script');
//     script.src = "./lib/assets/js/jquery-1-11-0.min.js";
//     script1.src = "./lib/assets/js/rwd-table.js";
//     script3.src = "http://code.jquery.com/jquery-migrate-1.0.0.js";

//     // <script src="./lib/assets/js/jquery-1-11-0.min.js"></script>
//     //     <script src="./lib/assets/js/bootstrap-3-1-1.min.js"></script>
//     //     <script src="./lib/assets/js/rwd-table.js"></script>

//     // script4.src = "http://code.jquery.com/jquery-migrate-1.0.0.js";
//     // <script src=" http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
//     // <script src="https://code.jquery.com/jquery-3.0.0.js"></script>
//     // <script src="https://code.jquery.com/jquery-migrate-3.0.1.js"></script>
//     //     <script src="http://code.jquery.com/jquery-migrate-1.0.0.js"></script>

//     //   [].filter.call("this_is_it", c => c == 'is').join('')
//     let div = document.getElementsByClassName('index-script')[0];


//     if (div) {
//         // temp.existsjq1 = div.innerHTML.toLowerCase().indexOf('./lib/assets/js/jquery-1-11-0.min.js')
//         // temp.existsjq2 = div.innerHTML.lastIndexOf('./lib/assets/js/jquery-1-11-0.min.js')
//         // if (temp.existsjq1 == temp.existsjq2 || temp.existsjq1 == -1) {
//         div.appendChild(script)
//         // }
//         temp.existsrwd1 = div.innerHTML.toLowerCase().indexOf('./lib/assets/js/rwd-table.js')
//         temp.existsrwd2 = div.innerHTML.toLowerCase().lastIndexOf('./lib/assets/js/rwd-table.js')
//         if (temp.existsrwd1 == temp.existsrwd2 || temp.existsrwd1 == -1) {
//             div.appendChild(script1)
//         }

//     } else {
//         temp.divNew = document.getElementsByTagName('div')[0];
//         temp.divNew.appendChild(script)
//         temp.divNew.appendChild(script1)
//     }

//     div.appendChild(script3)
//     // div.appendChild(script4)
// });



