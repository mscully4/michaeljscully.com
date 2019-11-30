$(document).ready(() => {
    $('#buttons-experience').mouseenter(function(chork) {
        $('#dropdown-experience').fadeIn(750);
        $(chork.currentTarget).find('i').removeClass('fa-angle-right');
        $(chork.currentTarget).find('i').addClass('fa-angle-down');
    })

   $('#buttons-experience').mouseleave(function(event) {
        $('#dropdown-experience').fadeOut(100);
        $(event.CurrentTarget).find('i').removeClass('fa-angle-down');
        $(event.currentTarget).find('i').addClass('fa-angle-right');
    })

    $('#buttons-projects').mouseenter(function(event) {
        $('#dropdown-projects').fadeIn(750);
        $(event.currentTarget).find('i').removeClass('fa-angle-right');
        $(event.currentTarget).find('i').addClass('fa-angle-down');
        
    })

    $('#buttons-projects').mouseleave(function(event) {
        $('#dropdown-projects').fadeOut(100);
        $(event.CurrentTarget).find('i').removeClass('fa-angle-down');
        $(event.currentTarget).find('i').addClass('fa-angle-right');
    })

    $('#buttons-extracurriculars').mouseenter(function(event) {
        $('#dropdown-extracurriculars').fadeIn(750);
        $(event.currentTarget).find('i').removeClass('fa-angle-right');
        $(event.currentTarget).find('i').addClass('fa-angle-down');
    })

    $('#buttons-extracurriculars').mouseleave(function(event) {
        $('#dropdown-extracurriculars').fadeOut(100);
        $(event.CurrentTarget).find('i').removeClass('fa-angle-down');
        $(event.currentTarget).find('i').addClass('fa-angle-right');
    })

    $('#buttons-experience').on('click', function(event) {
        window.location.href = "/resume/experience";
    })

    $('#buttons-projects').on('click', function(event) {
        window.location.href = "/resume/projects";
    })

    $('#buttons-extracurriculars').on('click', function(event) {
        window.location.href = "/resume/extracurriculars";
    })

})
