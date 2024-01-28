const createStore = require("redux").createStore;
const combineReducers = require("redux").combineReducers;
const applyMiddleware = require("redux").applyMiddleware;
const reduxLogger = require("redux-logger");
const {
  buyCake,
  buyIceCream,
  BUY_CAKE,
  BUY_ICECREAM,
} = require("./actions.js");

const logger = reduxLogger.createLogger();

// state of object
const initialCakeState = {
  numCakes: 10,
};
const initialIceCreamState = {
  iceCream: 20,
};

// reducer function
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        numCakes: state.numCakes - 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        iceCream: state.iceCream - 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state in store:", store.getState()); // Log the initial state

const unsubscribe = store.subscribe(() => {
  console.log("Updated state in store:", store.getState());
}); // Subscribe and log state changes

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe(); // Unsubscribe to stop logging state changes
