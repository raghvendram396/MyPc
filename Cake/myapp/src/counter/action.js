

export const decrement=(n) => {
 return {type: "Decrease",payload:Number(n)}
}
export const increment=() => {
    return {type: "Increment"}
}