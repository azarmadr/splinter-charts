var cardData = [];
var cardType = 'monsters', ownType = 'unowned';
var cardAnalysis = $.ajax({ url: "http://localhost:3000/Analysis", async: false, dataType: 'json' }).responseJSON;
var cardScores     = new Chart(document.getElementById("cardChart").getContext('2d'), chartOptions('cardChart'));
function setOptions(arr,elem){
  $(`#${elem}`).empty();
  $.each(arr, function(i, p) {
    $(`#${elem}`).append($(`<label>${p}: <input type="radio" value="${p}" name="${elem}-input"/><label/>`));
  });
}

function getCardData() {
  ownType = $("#ownType input[type='radio']:checked").val();
  cardType = $("#cardType input[type='radio']:checked").val();
  cardData = cardAnalysis[cardType][ownType].slice(0);
  cardData = cardData.filter(b=>b.count>2);
  cardScores.options.scales.x.max = 81;
  if(document.querySelector("#full-list:checked") === null){
    //cardData = cardData.slice(0,27);
    cardScores.options.scales.x.max = 27;
  }
  if(document.querySelector("#byCount:checked")){
    cardData.sort((a,b)=>{return a.count<b.count?1:a.count>b.count?-1:0});
  }
  cardScores.data.datasets = [];
  ['score', 'wr', 'count'/*, 'w', 'l', 'd',*/].forEach(el=>{
    cardScores.data.datasets.push(dataSet(el,cardData))
  });
  cardScores.data.labels = cardData.map(x=>x.summoner?x.summoner.name:x.name);
  cardScores.update();
}
$(document).ready(
  function () {
    setOptions(["owned","unowned"],"ownType");
    setOptions(["summoner","monsters"],"cardType");
    $("#cardType input[type='radio']").val(['monsters']);
    $("#ownType  input[type='radio']").val(['unowned']);
    getCardData()
    //$("select").on('change', function(){ getCardData(); });
    $("input").on('change',function(){
      getCardData();
    });
  }
);
