const redux=require("redux");
const createStore=redux.createStore;
const applyMiddleware=redux.applyMiddleware;
const thunkMiddleware=require("redux-thunk").default;
const axios=require("axios");

const initialState={
    loading: false,
    users: [],
    error: ''
}
const FETCH_USERS_REQUEST="FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS="FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE="FETCH_USERS_FAILURE";
const fetchusersRequest=() => {
    return {
        type: FETCH_USERS_REQUEST
    }
} 
const fetchusersSuccess=(users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload:users
    }
}
const fecthusersFailures=(error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer=(state=initialState,action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST: return {
            ...state,
            loading: true
        }
        case FETCH_USERS_SUCCESS: return {
            loading: false,
            users: action.payload,
            error: ''

        }
        case FETCH_USERS_FAILURE: return {
            loading: false,
            users:[],
            error: action.payload
        }
        default: return state
    }
}


const fetchUsers=() => {                      // This is async action creator but this returns func not action object and this has been possible beacuse of redux thunk
return function(dispatch)  {            // This function can also dispatch action
     dispatch(fetchusersRequest())    
    axios.get("https://jsonplaceholder.typicode.com/users")   // This is to make request to api of given url if request is success then we get response else error
        .then(response => {
        // response.data  This is array of data
            const users=response.data.map(user => user.id)
        dispatch(fetchusersSuccess(users))
    })

     .catch(error => {
        // error.message This is error description

        dispatch(fecthusersFailures(error.message));
    })
}
}

const store=createStore(reducer,applyMiddleware(thunkMiddleware));   // Thunk middle ware allows action creator to return function instaed of object
store.subscribe(() => {
    console.log(store.getState());
} )
store.dispatch(fetchUsers());