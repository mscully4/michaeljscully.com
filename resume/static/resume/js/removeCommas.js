$(document).ready(() => {
  console.log($(".removeCommas").text().substr(1))
  $(".removeCommas").text($(".removeCommas").text().substr(1))
})