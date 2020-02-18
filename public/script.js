function getUrlVars(){
  //Get Query String
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
  }
  return vars;
}

document.addEventListener("DOMContentLoaded", event =>{
  //Get player
  var user = getUrlVars()['player'];
  var approved = sessionStorage.getItem(user);

  if (user == undefined){
    document.querySelector("#crPop").innerHTML = 'Rules, Instructions, & Changelog<br><br><h2>(Please see Intructions on how to setup the tracker.)</h2>';
    document.querySelector("#notifications").innerHTML = "";
    $("#playerTools").hide();
  } else {
    //Initialize Values
    const app = firebase.app();
    const db = firebase.firestore();
    const player = db.collection('users').doc(user);

    //Check if player is in database
    player.get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          //Get player points
          player.onSnapshot(doc => {
            const data = doc.data();
            document.querySelector("#pPoints").innerHTML = "<h2>Points Aquired: " + data.currentPoints + "</h2>";
            document.querySelector("#player").innerHTML = "<h2>Welcome Back, " + user + "</h2>";
            $("#create").hide();
            if (sessionStorage.getItem(user) == 'authorized'){
              $("#savePokemon").show();
              $("#change").show();
              $("#reset").show();
            } else {
              $("#savePokemon").hide();
              $("#change").hide();
              $("#reset").hide();
            }
          });
        } else {
          document.querySelector("#notifications").innerHTML = "<b><font color='red'>Please see the instructions to setup the tracker.</font></b>";
          $("#enter").hide();
          $("#change").hide();
          $("#reset").hide();
          $("#savePokemon").hide();
        }
      })
  }
});

function resetRoom(){
  var user = getUrlVars()['player'];
  var approved = sessionStorage.getItem(user);

  const db = firebase.firestore();
  const pointTracker = db.collection('users').doc(user);

  pointTracker.get().then(function(doc){
    if (doc.exists){
      if (approved == 'authorized'){
        pointTracker.update({ currentPoints: 0 });
      }
    }
  })
}

function enterPass(){
  var user = getUrlVars()['player'];
  var passcode = "";

  const db = firebase.firestore();
  const pPass = db.collection('users').doc(user);

  if (document.getElementById('passcode').value != ""){
    passcode = document.getElementById('passcode').value;
    pPass.get().then(function(doc){
      if (doc.exists){
        var passCheck = doc.data().password;
        if (passcode == passCheck){
          sessionStorage.setItem(user, 'authorized');
          $("#savePokemon").show();
          $("#change").show();
          $("#reset").show();
          console.log('approved');
        }
      }
    })
  }
}

function changePass(){
  var user = getUrlVars()['player'];
  var approved = sessionStorage.getItem(user);
  var passcode = "";

  const db = firebase.firestore();
  const pPass = db.collection('users').doc(user);

  if (document.getElementById('passcode').value != ""){
    passcode = document.getElementById('passcode').value;
    pPass.get().then(function(doc){
      if (doc.exists){
        if (approved == 'authorized'){
          pPass.update({ password: passcode });
        }
      }
    })
  }
}

function createPass(){
  var user = getUrlVars()['player'];
  var passcode = '';

  const db = firebase.firestore();
  const pPass = db.collection('users').doc(user);

  if (document.getElementById('passcode').value != ""){
    passcode = document.getElementById('passcode').value;
    pPass.get().then(function(doc){
      if(!doc.exists){
        pPass.set({
          currentPoints: "0",
          password: passcode,
          p1: '0',
          p2: '0',
          p3: '0',
          p4: '0',
          p5: '0',
          p6: '0'
        });
      }
    })
  }
}

function filterPoke(){
  //All 890 Pokemon
  if (document.getElementById('gamePokeList').value == '0'){
    for (i=1; i<891; i++){
      document.getElementById('poke1').options[i].style.display = 'initial';
      document.getElementById('poke2').options[i].style.display = 'initial';
      document.getElementById('poke3').options[i].style.display = 'initial';
      document.getElementById('poke4').options[i].style.display = 'initial';
      document.getElementById('poke5').options[i].style.display = 'initial';
      document.getElementById('poke6').options[i].style.display = 'initial';
    }
  }
  //X & Y Only
  else if (document.getElementById('gamePokeList').value == '6'){
    for (i=1; i<891; i++){
      document.getElementById('poke1').options[i].style.display = 'initial';
      document.getElementById('poke2').options[i].style.display = 'initial';
      document.getElementById('poke3').options[i].style.display = 'initial';
      document.getElementById('poke4').options[i].style.display = 'initial';
      document.getElementById('poke5').options[i].style.display = 'initial';
      document.getElementById('poke6').options[i].style.display = 'initial';
      if (!filter.kalos_xy.includes(i.toString())){
        document.getElementById('poke1').options[i].style.display = "none";
        document.getElementById('poke2').options[i].style.display = "none";
        document.getElementById('poke3').options[i].style.display = "none";
        document.getElementById('poke4').options[i].style.display = "none";
        document.getElementById('poke5').options[i].style.display = "none";
        document.getElementById('poke6').options[i].style.display = "none";
      }
    }
  }
  //Omega Ruby & Alpha Sapphire Only
  else if (document.getElementById('gamePokeList').value == '6a'){
    for (i=1; i<891; i++){
      document.getElementById('poke1').options[i].style.display = 'initial';
      document.getElementById('poke2').options[i].style.display = 'initial';
      document.getElementById('poke3').options[i].style.display = 'initial';
      document.getElementById('poke4').options[i].style.display = 'initial';
      document.getElementById('poke5').options[i].style.display = 'initial';
      document.getElementById('poke6').options[i].style.display = 'initial';
      if (!filter.hoenn_oras.includes(i.toString())){
        document.getElementById('poke1').options[i].style.display = "none";
        document.getElementById('poke2').options[i].style.display = "none";
        document.getElementById('poke3').options[i].style.display = "none";
        document.getElementById('poke4').options[i].style.display = "none";
        document.getElementById('poke5').options[i].style.display = "none";
        document.getElementById('poke6').options[i].style.display = "none";
      }
    }
  }
  //Sun & Moon Only
  else if (document.getElementById('gamePokeList').value == '7'){
    for (i=1; i<891; i++){
      document.getElementById('poke1').options[i].style.display = 'initial';
      document.getElementById('poke2').options[i].style.display = 'initial';
      document.getElementById('poke3').options[i].style.display = 'initial';
      document.getElementById('poke4').options[i].style.display = 'initial';
      document.getElementById('poke5').options[i].style.display = 'initial';
      document.getElementById('poke6').options[i].style.display = 'initial';
      if (!filter.sun_moon.includes(i.toString())){
        document.getElementById('poke1').options[i].style.display = "none";
        document.getElementById('poke2').options[i].style.display = "none";
        document.getElementById('poke3').options[i].style.display = "none";
        document.getElementById('poke4').options[i].style.display = "none";
        document.getElementById('poke5').options[i].style.display = "none";
        document.getElementById('poke6').options[i].style.display = "none";
      }
    }
  }
  //Ultra Sun & Moon Only
  else if (document.getElementById('gamePokeList').value == '7a'){
    for (i=1; i<891; i++){
      document.getElementById('poke1').options[i].style.display = 'initial';
      document.getElementById('poke2').options[i].style.display = 'initial';
      document.getElementById('poke3').options[i].style.display = 'initial';
      document.getElementById('poke4').options[i].style.display = 'initial';
      document.getElementById('poke5').options[i].style.display = 'initial';
      document.getElementById('poke6').options[i].style.display = 'initial';
      if (!filter.ultra_sun_moon.includes(i.toString())){
        document.getElementById('poke1').options[i].style.display = "none";
        document.getElementById('poke2').options[i].style.display = "none";
        document.getElementById('poke3').options[i].style.display = "none";
        document.getElementById('poke4').options[i].style.display = "none";
        document.getElementById('poke5').options[i].style.display = "none";
        document.getElementById('poke6').options[i].style.display = "none";
      }
    }
  }
  //Let's Go Pikachu/Eevee Only
  else if (document.getElementById('gamePokeList').value == '7b'){
    for (i=1; i<891; i++){
      document.getElementById('poke1').options[i].style.display = 'initial';
      document.getElementById('poke2').options[i].style.display = 'initial';
      document.getElementById('poke3').options[i].style.display = 'initial';
      document.getElementById('poke4').options[i].style.display = 'initial';
      document.getElementById('poke5').options[i].style.display = 'initial';
      document.getElementById('poke6').options[i].style.display = 'initial';
      if (!filter.kanto_lgpika.includes(i.toString())){
        document.getElementById('poke1').options[i].style.display = "none";
        document.getElementById('poke2').options[i].style.display = "none";
        document.getElementById('poke3').options[i].style.display = "none";
        document.getElementById('poke4').options[i].style.display = "none";
        document.getElementById('poke5').options[i].style.display = "none";
        document.getElementById('poke6').options[i].style.display = "none";
      }
    }
  }
  //Sword & Shield
  else if (document.getElementById('gamePokeList').value == '8'){
    for (i=1; i<891; i++){
      document.getElementById('poke1').options[i].style.display = 'initial';
      document.getElementById('poke2').options[i].style.display = 'initial';
      document.getElementById('poke3').options[i].style.display = 'initial';
      document.getElementById('poke4').options[i].style.display = 'initial';
      document.getElementById('poke5').options[i].style.display = 'initial';
      document.getElementById('poke6').options[i].style.display = 'initial';
      if (!filter.swordshield.includes(i.toString())){
        document.getElementById('poke1').options[i].style.display = "none";
        document.getElementById('poke2').options[i].style.display = "none";
        document.getElementById('poke3').options[i].style.display = "none";
        document.getElementById('poke4').options[i].style.display = "none";
        document.getElementById('poke5').options[i].style.display = "none";
        document.getElementById('poke6').options[i].style.display = "none";
      }
    }
  }
  //Sword & Shield Expansions
  else if (document.getElementById('gamePokeList').value == '8a'){
    for (i=1; i<891; i++){
      document.getElementById('poke1').options[i].style.display = 'initial';
      document.getElementById('poke2').options[i].style.display = 'initial';
      document.getElementById('poke3').options[i].style.display = 'initial';
      document.getElementById('poke4').options[i].style.display = 'initial';
      document.getElementById('poke5').options[i].style.display = 'initial';
      document.getElementById('poke6').options[i].style.display = 'initial';
      if (!filter.swordshield.includes(i.toString())){
        document.getElementById('poke1').options[i].style.display = "none";
        document.getElementById('poke2').options[i].style.display = "none";
        document.getElementById('poke3').options[i].style.display = "none";
        document.getElementById('poke4').options[i].style.display = "none";
        document.getElementById('poke5').options[i].style.display = "none";
        document.getElementById('poke6').options[i].style.display = "none";
      }
    }
  }
}

function savePoke(){
  var user = getUrlVars()['player'];
  var approved = sessionStorage.getItem(user);

  const db = firebase.firestore();
  const pPass = db.collection('users').doc(user);

  p1 = document.getElementById('poke1').value;
  p2 = document.getElementById('poke2').value;
  p3 = document.getElementById('poke3').value;
  p4 = document.getElementById('poke4').value;
  p5 = document.getElementById('poke5').value;
  p6 = document.getElementById('poke6').value;

  pPass.get().then(function(doc){
    if (doc.exists){
      if (approved == 'authorized'){
        pPass.update({
          p1: p1,
          p2: p2,
          p3: p3,
          p4: p4,
          p5: p5,
          p6: p6,
        });
      }
    }
  })
}

function loadPoke(){
  var user = getUrlVars()['player'];

  const db = firebase.firestore();
  const pPass = db.collection('users').doc(user);

  pPass.get().then(function(doc) {
    data = doc.data();
    document.getElementById('poke1').value = data.p1;
    document.getElementById('poke2').value = data.p2;
    document.getElementById('poke3').value = data.p3;
    document.getElementById('poke4').value = data.p4;
    document.getElementById('poke5').value = data.p5;
    document.getElementById('poke6').value = data.p6;
    pChange('poke1');
    pChange('poke2');
    pChange('poke3');
    pChange('poke4');
    pChange('poke5');
    pChange('poke6');
  })
}

function ko(){
  var user = getUrlVars()['player'];
  var approved = sessionStorage.getItem(user);

  const db = firebase.firestore();
  const pointTracker = db.collection('users').doc(user);

  pointTracker.get().then(function(doc){
    if (doc.exists){
      if (approved == 'authorized'){
        var current = parseInt(doc.data().currentPoints);
        current += 3;
        pointTracker.update({ currentPoints: current });
      }
    }
  })
}

function revive(){
  var user = getUrlVars()['player'];
  var approved = sessionStorage.getItem(user);

  const db = firebase.firestore();
  const pointTracker = db.collection('users').doc(user);

  pointTracker.get().then(function(doc){
    if (doc.exists){
      if (approved == 'authorized'){
        var current = parseInt(doc.data().currentPoints);
        current -= 10;
        pointTracker.update({ currentPoints: current });
      }
    }
  })
}

function caught(){
  var user = getUrlVars()['player'];
  var approved = sessionStorage.getItem(user);

  const db = firebase.firestore();
  const pointTracker = db.collection('users').doc(user);

  pointTracker.get().then(function(doc){
    if (doc.exists){
      if (approved == 'authorized'){
        var current = parseInt(doc.data().currentPoints);
        current -= 6;
        pointTracker.update({ currentPoints: current });
      }
    }
  })
}

function named(){
  var user = getUrlVars()['player'];
  var approved = sessionStorage.getItem(user);

  const db = firebase.firestore();
  const pointTracker = db.collection('users').doc(user);

  pointTracker.get().then(function(doc){
    if (doc.exists){
      if (approved == 'authorized'){
        var current = parseInt(doc.data().currentPoints);
        current -= 5;
        pointTracker.update({ currentPoints: current });
      }
    }
  })
}

function raid(){
  var user = getUrlVars()['player'];
  var approved = sessionStorage.getItem(user);

  const db = firebase.firestore();
  const pointTracker = db.collection('users').doc(user);

  pointTracker.get().then(function(doc){
    if (doc.exists){
      if (approved == 'authorized'){
        var current = parseInt(doc.data().currentPoints);
        current += 10;
        pointTracker.update({ currentPoints: current });
      }
    }
  })
}

function pChange(position){
  if (position == 'poke1'){
    if (document.getElementById('poke1').value != '000') {
      document.getElementById('p1Img').innerHTML = "<img src='https://www.serebii.net/swordshield/pokemon/small/" + document.getElementById('poke1').value + ".png' width='120px'/>";
    } else {
      document.getElementById('p1Img').innerHTML = "";
    }
  } else if (position == 'poke2'){
    if (document.getElementById('poke2').value != '000') {
      document.getElementById('p2Img').innerHTML = "<img src='https://www.serebii.net/swordshield/pokemon/small/" + document.getElementById('poke2').value + ".png' width='120px'/>";
    } else {
      document.getElementById('p2Img').innerHTML = "";
    }
  } else if (position == 'poke3'){
    if (document.getElementById('poke3').value != '000') {
      document.getElementById('p3Img').innerHTML = "<img src='https://www.serebii.net/swordshield/pokemon/small/" + document.getElementById('poke3').value + ".png' width='120px'/>";
    } else {
      document.getElementById('p3Img').innerHTML = "";
    }
  } else if (position == 'poke4'){
    if (document.getElementById('poke4').value != '000') {
      document.getElementById('p4Img').innerHTML = "<img src='https://www.serebii.net/swordshield/pokemon/small/" + document.getElementById('poke4').value + ".png' width='120px'/>";
    } else {
      document.getElementById('p4Img').innerHTML = "";
    }
  } else if (position == 'poke5'){
    if (document.getElementById('poke5').value != '000') {
      document.getElementById('p5Img').innerHTML = "<img src='https://www.serebii.net/swordshield/pokemon/small/" + document.getElementById('poke5').value + ".png' width='120px'/>";
    } else {
      document.getElementById('p5Img').innerHTML = "";
    }
  } else if (position == 'poke6'){
    if (document.getElementById('poke6').value != '000') {
      document.getElementById('p6Img').innerHTML = "<img src='https://www.serebii.net/swordshield/pokemon/small/" + document.getElementById('poke6').value + ".png' width='120px'/>";
    } else {
      document.getElementById('p6Img').innerHTML = "";
    }
  }
}

function pokeLoader() {
  pokeSlot1();
  pokeSlot2();
  pokeSlot3();
  pokeSlot4();
  pokeSlot5();
  pokeSlot6();
}
