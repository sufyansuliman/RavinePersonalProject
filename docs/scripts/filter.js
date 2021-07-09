var filters = {
    "brand": [],
    "article" : [],
    "gender": [],
};

function applyFilters(){
    var allSections = ["brand", "article", "gender"]
    allFilter(allSections);
    console.log(filters);
}

function allFilter(sections){
    for (let sec in sections){
        filters[sections[sec]] = []
        var allBoxes = document.getElementsByClassName(sections[sec]);
        var allChecked = document.getElementsByClassName(sections[sec] + "All");
        if (allChecked[0].checked){
            for (var j=0; j < allBoxes.length; j++){
                allBoxes[j].checked = true;
            }
        }
        for (var i=0; i < allBoxes.length; i++){ 
            if (allBoxes[i].checked){
                filters[sections[sec]].push(allBoxes[i].value)
            }
        }
    }
}


function accordOut(event){
    var cont = event.target.nextElementSibling;
    cont.classList.toggle("accord-pop")
}

function sidebarPop(){
    var wrap = document.getElementById("wrapper");
    wrap.classList.toggle("sidebar-displayed");
}
