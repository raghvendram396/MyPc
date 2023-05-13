const redux=require("redux");
const reduxLogger=require("redux-logger");   // This module is used to log all actions and its details.


const createStore=redux.createStore;  // This func is provided by redux to create ReduxStore which holds the state of our application
const combineReducers=redux.combineReducers;  // This func is provided by redux to combine multiple reducers so that it can be passed to createStore Function
const applyMiddleware=redux.applyMiddleware;   // ' ' ' ' ' ' by redux
const logger=reduxLogger.createLogger()

console.log("Hey");
const BUY_CAKE="BUY_CAKE";
const BUY_ICECREAM="BUY_ICECREAM";

function buyCake(){
return {
    type: BUY_CAKE,
    info: 'First Redux action'
}
}
function BuyIcecream(){
    return {
        type: BUY_ICECREAM,
    }
}


// const initialState={                                                    // Redux Store
//     numofCakes:10,
//     numofIcecreams: 20
// }
const initialCakeState={
    numofCakes: 10
}

const initialIcecreamState={
    numofIcecreams: 20
}

// const reducer=(state=initialState,action) => {
//     switch(action.type){
//         case BUY_CAKE: return {
//             ...state,
//             numofCakes: state.numofCakes-1
//         }
//         case BUY_ICECREAM: return {
//             ...state,
//             numofIcecreams:state.numofIcecreams-1
//         }

//         default: return state
//     }
// }
const Cakereducer=(state=initialCakeState,action) => {
    switch(action.type){
        case BUY_CAKE: return {
            ...state,
            numofCakes: state.numofCakes-1
        }

        default: return state
    }
}
const Icecreamreducer=(state=initialIcecreamState,action) => {
    switch(action.type){
        case BUY_ICECREAM: return {
            ...state,
            numofIcecreams:state.numofIcecreams-1
        }
        default: return state
    }
}

const rootReducer= combineReducers({               // This combine reducer func takes object as parameter which will have key value pair value will be reducer function
cake: Cakereducer,
iceCream: Icecreamreducer
});
const store=createStore(rootReducer,applyMiddleware(logger));
console.log('Initial Value',store.getState());
const unsubscribe=store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(BuyIcecream());
store.dispatch(BuyIcecream());
store.dispatch(BuyIcecream());
unsubscribe();
