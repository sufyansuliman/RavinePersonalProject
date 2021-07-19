//Creating the session variable
var mySession = window.sessionStorage;
var myLocal = window.localStorage;

//Filters list as they browse
var filters = {
    "brand": [],
    "article" : [],
    "gender": []
};

var user = {
    "email": null,
    "username" : null,
    "password": null
};

//All filter sections
var allSections = ["brand", "article", "gender"]

//Master Function when filter is clicked
function applyFilters(){
    allFilter(allSections);
}

//Adds checked boxes to filter and session
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
                filters[sections[sec]].push(allBoxes[i].id)
            }
        }
    }
    mySession.setItem("filters", JSON.stringify(filters))
}

//Runs on page load and checks boxes that were in session storage
function filterStoring(){
    if (myLocal.userInfo != null){
        newPage();
    }
    if (mySession.filters == null){
        return;
    } else {
        mySessionJson = sessionParser()
        sidebarPop()
        accordionPops(mySessionJson)
        for (i in mySessionJson){
            var curr = mySessionJson[i]
            for (j in curr){
                if (document.getElementById(curr[j]) != null){
                    document.getElementById(curr[j]).checked = true;
                }
            }
        }
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
function accordionPops(mySessionJson){
    keys = Object.keys(mySessionJson)
    for (i in keys){
        if (mySessionJson[keys[i]] != ""){
            document.getElementById(keys[i]).click()
        }
    }
}

//Parses session storage
function sessionParser(){
    var filtersParsed = mySession.filters
    filtersParsed = JSON.parse(filtersParsed)
    return filtersParsed
}

function signUp(){
    var email = document.getElementById("email-sign-up").value;
    var username = document.getElementById("username-sign-up").value;
    var password = document.getElementById("password-sign-up").value;
    var passwordCon = document.getElementById("password-confirm-sign-up").value;
    if (password != passwordCon){
        alert("Passwords don't match");
        return;
    }
    user.email = email
    user.username = username 
    user.password = password
    myLocal.userInfo = JSON.stringify(user)
    document.getElementById("close-sign-up").click()
    newPage()
}

function newPage(){
    var signLog = document.getElementById("sign-log");
    var welcome = document.getElementById("welcome-text");
    var logOut = document.getElementById("log-out")
    signLog.style.display = "None";
    welcome.style.display = "block";
    logOut.style.display = "block";
    localParsed = JSON.parse(myLocal.userInfo);
    welcome.innerText = "Welcome" + " " + localParsed.username;
}

function logOut(){
    myLocal.clear();
    var signLog = document.getElementById("sign-log");
    var welcome = document.getElementById("welcome-text");
    var logOut = document.getElementById("log-out")
    welcome.style.display = "None";
    signLog.style.display = "block";
    logOut.style.display = "None";
    location.reload();
}
