function applyFilters(){
    var allBoxes = document.getElementsByClassName("brand");
    var allChecked = document.getElementsByClassName("brandAll");
    var checked = [];
    for (var i=0; i < allBoxes.length; i++){
        if (allChecked[0].checked){
            for (var j=0; j < allBoxes.length; j++){
                allBoxes[j].checked = true;
            }
        } 
        console.log(allBoxes[i].value)
        if (allBoxes[i].checked){
            checked.push(allBoxes[i].value)
        }
    }
    console.log(checked)
}

function sidebarPop(){
    var wrap = document.getElementById("wrapper");
    wrap.classList.toggle("sidebar-displayed")
}


