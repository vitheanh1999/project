$(document).ready(function() {
    $('#navbarDropdownquanly').mouseenter(function() {
      $('.navbarDropdownquanly').slideToggle(300, "linear");
    });
    
    $('.navbarDropdownquanly').mouseleave(function() {
      $(this).slideToggle(300, "linear");
    });
  });