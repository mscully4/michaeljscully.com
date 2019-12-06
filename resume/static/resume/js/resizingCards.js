$(document).ready(() => {
  //Experience
  $(".experiences-experience").height($(".experiences-experience").width()*.7)
  $(window).resize(function() {
    $(".experiences-experience").height($(".experiences-experience").width()*.7)
  })

  //Skills
  $(".skills-skill").height($(".skills-skill").width() * 1.2)
  $(window).resize(function() {
    $(".skills-skill").height($(".skills-skill").width() * 1.2)
  })

  $(".skill-info-wrapper").height($(".skill-info-wrapper").width() * .75)
  $(window).resize(function() {
    $(".skill-info-wrapper").height($(".skill-info-wrapper").width() * .75)
  })
})