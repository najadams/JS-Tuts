// Action
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// Action creator
const buyCake = () => {
  return {
    type: BUY_CAKE,
  };
};
const buyIceCream = () => {
  return {
    type: BUY_ICECREAM,
  };
};

module.exports = { buyCake, buyIceCream, BUY_CAKE, BUY_ICECREAM };
