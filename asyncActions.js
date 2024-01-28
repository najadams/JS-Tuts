const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const applyMiddleware = redux.applyMiddleware;
const createStore = redux.createStore;
const axios = require("axios");

// actions
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

// initialState
const initialState = {
  loading: true,
  user: [],
  error: "",
};

// ACTION CREATORS
function fetchUserRequest() {
  return {
    type: FETCH_USER_REQUEST,
  };
}

function fetchUserSuccess(user) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
}

function fetchUserFailure(error) {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        user: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

// note that the thunkMiddleware allows action producers to return functions
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
          dispatch(fetchUserSuccess(users));
          console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchUserFailure(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.dispatch(fetchUsers());
