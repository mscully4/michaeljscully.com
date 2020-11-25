$(document).ready(() => {
  $(".removeCommas").each(function(i, el) {
    el.textContent = el.textContent.length > 1 ? el.textContent.slice(1) : el.textContent
  })
    //.slice(1))
  // $(".removeCommas").text($(".removeCommas").text().substr(1))
})