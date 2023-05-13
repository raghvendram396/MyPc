const initial={
    num:0
}

const reducer=(state=initial,action) => {
    switch(action.type) {
        case "Decrease": return {
            num: state.num-action.payload};
        case "Increment": return {
            num: state.num+1
        }
        default: return state;
    }
}
export default reducer;