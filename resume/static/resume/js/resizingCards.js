$(document).ready(() => {
  $(".experiences-experience").height($(".experiences-experience").width())
  $(window).resize(function() {
    $(".experiences-experience").height($(".experiences-experience").width())
  })
})