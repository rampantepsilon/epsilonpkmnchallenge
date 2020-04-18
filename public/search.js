function search(){
  var windowArray = ["item", "thing", "id-3-text", "class", "3-id-text"];
  var textToFind = document.getElementById('search').value.toUpperCase();

  //if you want to match id- string exists at any position
  var matches = poke.pokemon.filter(function(windowValue){
    if(windowValue) {
        return windowValue.toUpperCase().indexOf(textToFind) >= 0;
    }
  });

  document.getElementById('searchResults').innerHTML = "";

  for (var i in matches){
    if (i < 20){
      document.getElementById('searchResults').innerHTML += '<div id="' + matches[i] + '" onclick="select(this.id)">' + matches[i] + '</div>';
    }
  }
}

function select(id){
  document.getElementById('selection').innerHTML = id;
}

function setPoke(num){
  var pokemon = document.getElementById('selection').innerHTML;

  if (pokemon != 'Search To Begin'){
    if (num == 1){
      var indexPoke = poke.pokemon.indexOf(pokemon);
      document.getElementById('poke1').value = indexPoke;
      pChange('poke1');
    }
    if (num == 2){
      var indexPoke = poke.pokemon.indexOf(pokemon);
      document.getElementById('poke2').value = indexPoke;
      pChange('poke2');
    }
    if (num == 3){
      var indexPoke = poke.pokemon.indexOf(pokemon);
      document.getElementById('poke3').value = indexPoke;
      pChange('poke3');
    }
    if (num == 4){
      var indexPoke = poke.pokemon.indexOf(pokemon);
      document.getElementById('poke4').value = indexPoke;
      pChange('poke4');
    }
    if (num == 5){
      var indexPoke = poke.pokemon.indexOf(pokemon);
      document.getElementById('poke5').value = indexPoke;
      pChange('poke5');
    }
    if (num == 6){
      var indexPoke = poke.pokemon.indexOf(pokemon);
      document.getElementById('poke6').value = indexPoke;
      pChange('poke6');
    }
  }
}

function clear(){
  document.getElementById('search').value = "";
  document.getElementById('selection').innerHTML = "";
}

function searchPane(id){
  if (id == 'show'){
    $('#searchPane').show();
    $('#show').html("<img src='right.png'>");
    document.getElementById('show').id = 'hide';
  } else {
    $('#searchPane').hide();
    $('#hide').html("<img src='left.png'>");
    document.getElementById('hide').id = 'show';
  }
}
