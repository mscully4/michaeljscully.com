$(document).ready(() => {
    function centering(container, items) {
        var line = document.getElementsByClassName(container)
        for (i = 0; i < line.length; i++) {
            entries = line[i].getElementsByClassName(items)
            if (entries.length === 2) {
                line[i].style.gridTemplateColumns = "1fr 1fr";
                line[i].style.width = "820px"
                for (x = 0; x < entries.length; x++) {
                    entries[x].style.width = "390px";
                }
            }
        }
    }


centering("experience", "job");
centering("projects", "enterprise");
centering("activities", "activity");

})
