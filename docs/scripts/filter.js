//Creating the session variable
var mySession = window.sessionStorage;

//Filters list as they browse
var filters = {
    "brand": [],
    "article" : [],
    "gender": [],
};

//Master Function when filter is clicked
function applyFilters(){
    var allSections = ["brand", "article", "gender"]
    allFilter(allSections);
    console.log("Filter was clicked, these filters applied:", mySession);
}

//Adds checked boxes to filter and session
function allFilter(sections){
    for (let sec in sections){
        filters[sections[sec]] = []
        mySession[sections[sec]] = []
        var allBoxes = document.getElementsByClassName(sections[sec]);
        var allChecked = document.getElementsByClassName(sections[sec] + "All");
        if (allChecked[0].checked){
            for (var j=0; j < allBoxes.length; j++){
                allBoxes[j].checked = true;
            }
        }
        for (var i=0; i < allBoxes.length; i++){ 
            if (allBoxes[i].checked){
                filters[sections[sec]].push(allBoxes[i].id)
            }
        }
        mySession.setItem(sections[sec], filters[sections[sec]]);
    }
}

//Runs on page load and checks boxes that were in session storage
function filterStoring(){
    if (mySession == null){
        return
    } else {
        sidebarPop()
        accordionPops()
        for (i in mySession){
            list = splitter(mySession[i])
            for (i in list){
                if (document.getElementById(list[i]) != null){
                    document.getElementById(list[i]).checked = true;
                }
            }
        }
    }
    console.log("Page reloaded, here are session details:", mySession)
}

//Helper function to split the strings in session storage
function splitter(objectKey){
    try {
        var list = objectKey.split(",")
        return list
    } catch(err){ 
        return []
    }
}

//Pop side bar out or in
function sidebarPop(){
    var wrap = document.getElementById("wrapper");
    wrap.classList.toggle("sidebar-displayed");
}

//Pushes accordions out/in
function accordOut(event){
    var cont = event.target.nextElementSibling;
    cont.classList.toggle("accord-pop")
}

//Pushes appropriate accordions out on reload depending if there was a filter applied in that accordion
function accordionPops(){
    keys = Object.keys(mySession)
    for (i in keys){
        if (mySession[keys[i]] != ""){
            document.getElementById(keys[i]).click()
        }
    }
}
