window.addEventListener('DOMContentLoaded', event => {
    displayBoxscores();


});

async function MyFetch(url) {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status : ${reponse.status}`);
    }
    return await response.json();
}
function displayBoxscores(){
    var table = document.getElementById("boxscoresTable");
    gamesUrl = createUrl();
    try{
        MyFetch(gamesUrl).then(json_data => {
            datesArray = json_data.dates;
            //console.log(datesArray);
            dateObject = datesArray[0];
            //console.log(dateObject);
            gamesArray = dateObject.games;

            gamesArray.forEach(gameObject => {
                var row = createRow(gameObject);
                table.append(row);
                
            });
        });

    }
    catch(e){

    }
}

function getYesterdayDate(){
    const today = new Date()
    const yesterday = new Date(today)

    yesterday.setDate(yesterday.getDate() - 1)
    var dd = yesterday.getDate();
    if (dd < 10){
        dd = "0"+ String(dd);
    }
    else{
        dd=String(dd);
    }

    var mm = String(yesterday.getMonth()+1);
    var yyyy = String(yesterday.getFullYear());
    yesterdayDate= yyyy + '-' + mm + '-' + dd;

    return yesterdayDate;
}


function createUrl(){
    yesterdayDate = getYesterdayDate();
    return `https://statsapi.web.nhl.com/api/v1/schedule?date=${yesterdayDate}&expand=schedule.linescore`;
}

function createRow(gameObject){
    //console.log(gameObject);
    var teamHome = gameObject.teams.home.team.name;
    var scoreHome = gameObject.teams.home.score;
    var shotsHome = gameObject.linescore.teams.home.shotsOnGoal;
    var teamAway = gameObject.teams.away.team.name;
    var scoreAway = gameObject.teams.away.score;
    var shotsAway = gameObject.linescore.teams.away.shotsOnGoal;
    var row = document.createElement("tr");

    var col1 = document.createElement("td");
    col1.innerHTML = teamHome;
    row.append(col1);
    
    var col2 = document.createElement("td");
    col2.innerHTML = scoreHome;
    row.append(col2);

    var col3 = document.createElement("td");
    col3.innerHTML = shotsHome;
    row.append(col3);

    var col4 = document.createElement("td");
    col4.innerHTML = teamAway;
    row.append(col4);

    var col5 = document.createElement("td");
    col5.innerHTML = scoreAway;
    row.append(col5);
    
    var col6 = document.createElement("td");
    col6.innerHTML = shotsAway;
    row.append(col6);


    return row;

}

