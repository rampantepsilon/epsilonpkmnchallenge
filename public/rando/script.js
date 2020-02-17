function randomPoke() {
  for (i=1; i<7; i++){
    var div = 'poke' + i;
    var x = Math.floor(Math.random()*890);
    console.log(div);
    console.log(x);
    if (x < 10){
      document.getElementById(div).value = "00" + (x + 1);
    } else if (x < 100){
      document.getElementById(div).value = "0" + (x + 1);
    } else {
      document.getElementById(div).value = x + 1;
    }
    pChange(div);
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
