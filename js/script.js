// Variablen
var naamPinguin;
const bodySelector = document.querySelector('body');
var naamHolder = document.querySelector('.pinguinName')
var welkomTekst = document.querySelector('.welkomTekst');
var naamForm = document.querySelector('.form_krijg_naam');
var omgevingHolder = document.querySelector('.omgevingName');
const hulpKnop = document.querySelector('.hulp');
var bal = document.querySelector('.speeltjes img');
var huidigeOmgeving = 1; // 1 = Buiten, 2 = Onder water
const navOmgevingLeft = document.querySelector('.navOmgeving1');
const navOmgevingRight = document.querySelector('.navOmgeving2');
var pinguinAfbeelding = document.querySelector('main div img');
const radioKnop = document.querySelector('.radioSpeler');
const toDoKnop = document.querySelector('.toDo');
const toDoList = document.querySelector('.to-do');
var huidigeNummer = 0;
const pauze = document.querySelector('.radioWeergave div a:nth-of-type(2)');
const volgendeNummer = document.querySelector('.radioWeergave div a:nth-of-type(3)');
const vorigeNummerKnop = document.querySelector('.radioWeergave div a:nth-of-type(1)');
var levenBar = document.querySelector('.levenBar div');
var dorstBar = document.querySelector('.dorstBar div');
var etenBar = document.querySelector('.etenBar div');
var barImages = document.querySelectorAll('.barImg');
var aantal = 1;
var barDefault = document.querySelectorAll('.bar');
barDefault.forEach(element => {
    element.style.width = '1em';
});
// Zodra op de knop verder wordt gedrukt, wordt deze functie direct uitgevoerd om de naam op te slaan
naamForm.addEventListener('submit', button => {
    button.preventDefault();
    naamPinguin = document.querySelector('#naamInput').value;
    console.log(naamPinguin);
    barVullen(levenBar, 1);
    barVullen(etenBar, 1);
    barVullen(dorstBar, 1);
    if(naamPinguin == ""){
        welkomTekst.innerHTML = 'De pinguin heeft nog geen naam!';
        return
    } 
    // We verstoppen het formulier, aangezien deze niet meer wordt gebruikt, de naam is al gekozen. 
    naamForm.classList.add('hide');
    // We hergebruiken de h1 die eerst werdt gebruikt als welkom tekst
    welkomTekst.innerHTML = 'Hoi baasje! Mijn naam is ' + naamPinguin + '...';
    setTimeout(() => {welkomTekst.innerHTML = 'Jouw taak is om voor mij te zorgen, zodat ik in leven blijf.';}, 5000);
    bereidOmgevingVoor();
});

// Deze functie veranderd de achtergrond op basis van de varaiable huidigeOmgeving, als deze 1 is, wordt het de andere achtergrond, en wordt de 1 een 0
// zodat bij de volgende keer dat de functie wordt uitgevoerd de andere achtergrond doorkomt, en dan wordt de variable weer een 1
function veranderAchtergrond(){
    if(huidigeOmgeving == 1){
        omgevingHolder.innerHTML = 'Buiten';
        bodySelector.classList.remove('onderwater');
        bodySelector.classList.add('buiten');
        huidigeOmgeving--;

    } else {
        omgevingHolder.innerHTML = 'Onder water';
        bodySelector.classList.remove('buiten');
        bodySelector.classList.add('onderwater');
        huidigeOmgeving++;
    }
}

// Zorgt bij de eerste keer laden dat het even duurt, zodat de welkomst tekst nog even zichtbaar blijft
// Elementen die niet meer nodig zijn worden verstopt, en andere elementen worden zichtbaar gemaakt door de class te verwijderen die het weghaalt
function bereidOmgevingVoor(){
    setTimeout(() => {
        radioSpeler();
        naamHolder.innerHTML = naamPinguin;
        veranderAchtergrond();
        pinguinAfbeelding.src = 'images/pinguin_start.png';
        welkomTekst.classList.add('hide');
        naamHolder.classList.remove('hide');
        omgevingHolder.classList.remove('hide');
        navOmgevingLeft.classList.remove('hide');     
        radioKnop.classList.remove('hide');   
        toDoKnop.classList.remove('hide');    
        navOmgevingRight.classList.remove('hide');
        hulpKnop.classList.remove('hide');
        levenBar.classList.remove('hide');
        dorstBar.classList.remove('hide');
        etenBar.classList.remove('hide');
        barImages.forEach(element => {
            element.classList.remove('hide');
        });
        document.querySelectorAll('.bars').forEach(element => {
            element.classList.remove('hide');
        });
        document.querySelector('footer').classList.remove('hide');
        navOmgevingLeft.addEventListener('click', veranderAchtergrond);
        navOmgevingRight.addEventListener('click', veranderAchtergrond);
        pauze.addEventListener('click',radioPauze);
        volgendeNummer.addEventListener('click', radioSpeler);
    },10000);
}

// Radio array / Houdt alle muziek bestanden vast 
var muziekBestandenArray = new Array('../audio/sand_castle.mp3', '../audio/ocean_man.mp3', '../audio/snack_time.mp3');
var nummerTitels = new Array('Sand Castle', 'Ocean Man', 'Snack Time');
var radio = new Audio();
function radioSpeler(){
    document.querySelector('.radioWeergave ol').innerHTML = '';
    for (i = huidigeNummer + 1; i < nummerTitels.length; i++){
        document.querySelector('.radioWeergave ol').innerHTML += '<li>' + nummerTitels[i] + '</li>';
    }
    if(huidigeNummer == muziekBestandenArray.length){
        huidigeNummer = 0;
    } else {
        console.log(huidigeNummer);
        radio.src = muziekBestandenArray[huidigeNummer];
        radio.play();    
        radioKnop.innerHTML = 'Radio - ' + nummerTitels[huidigeNummer];
        document.querySelector('.radioWeergave h1').innerHTML = nummerTitels[huidigeNummer];
        huidigeNummer++;
    }
}
function vorigeNummer(){
    console.log(huidigeNummer);
    huidigeNummer = huidigeNummer - 2;
    console.log(huidigeNummer);
    radioSpeler();
}
vorigeNummerKnop.addEventListener('click', vorigeNummer);
radio.addEventListener('ended', radioSpeler);
function radioPauze(){
    if(radio.paused == true){
        radio.play();
    }else{
        radio.pause();
    }
};

radioKnop.addEventListener('click', function(){
    if(document.querySelector('.radioWeergave').classList.contains('hide')){
        document.querySelector('.radioWeergave').classList.remove('hide');
    } else{
        document.querySelector('.radioWeergave').classList.add('hide');
    }
});

toDoKnop.addEventListener('click', function(){
    if(toDoList.classList.contains('hide')){
        toDoList.classList.remove('hide');
    } else{
        toDoList.classList.add('hide');
    }
});


function barVullen(bar, hoeveelheid){
    aantal += hoeveelheid;
    console.log(bar);
    console.log(aantal);
    if(aantal < 10){
        console.log('test');
        bar.style.width = aantal + 'em';
    } else{
        bar.style.width = 10 + 'em';
        bar.style.borderTopRightRadius = '0.5em';
        bar.style.borderBottomRightRadius = '0.5em';
    }
    console.log(bar); 
}