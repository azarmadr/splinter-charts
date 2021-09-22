module.exports = () => {
  const cards        = require('../bot-splinters/data/cards.json');
  const scores       = require('../bot-splinters/data/azarmadr3_foscor.json');
  const cardAnalysis = require('../bot-splinters/data/azarmadr3_cardAnalysis.json');
  const myCards      = require('../bot-splinters/data/azarmadr3_cards.json');
  const allbattles      = require('../bot-splinters/data/battle_data.json');
  const battles = require('../bot-splinters/data/azarmadr3_wt_.json');
  const bv1 = require('../bot-splinters/data/azarmadr3_wt__v2.json');
  return {
    status: require('./status.json'),
    Standard: scores,
    Cards: cards,
    Battles: battles,
    myCards: myCards,
    //Analysis: cardAnalysis,
    allbattles: allbattles,
    bv1:bv1,
  };
}
