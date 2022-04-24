var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PointsSchema = new Schema({
  pointValue : { type: Number, required: true, default: 1 },
  // 1 x percentagePerPurchase, so vai ser usado quando
  // o cliente quiser comprar livros

  bonusPoints : { type: Number, required: true, default: 10 },
  /* Quando o cliente tiver 100 pontos atribuir este bonus
  Propor substituir quantidade de aquisicoes realizadas (enunciado),
  por este bonus. <---- */ 

  shippingPoints : { type: Number, required: true, default: 1000 },
  // Quando o cliente tiver 1000 pontos, os portes sao gratis

  percentagePerPurschase : { type: Number, required: true, default: 5 },
  // Quando o cliente compra um livro, pe, 5% do valor da 
  // compra é transformado em pontos

  newClientRegister : { type: Number, required: true, default: 10 },
  // Quando o cliente se registra, recebe 10 pontos

  recomendationClient : { type: Number, required: true, default: 10 },
  // Se o cliente1 for recomendado pelo cliente2 valido, o cliente2 recebe 10 pontos

  salePromotionActive : { type: Boolean, required: true },
  // Se true, vai ver o pointsPerSale e multiplicar pelo
  // percentagePerPurchase, se false, nao faz nada
  pointsPerSalePromotion : { type: Number, required: true },
  // Calculado em funcao da percentagePerPurschase

}, { collection: 'Points' });

// Export model.
module.exports = mongoose.model('Points', PointsSchema);
