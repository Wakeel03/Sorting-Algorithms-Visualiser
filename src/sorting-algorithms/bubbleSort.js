export const bubbleSort = (bars) => {
    // console.log(bars[0].props.height)
    var barsHeights = []
    bars.forEach(bar => {barsHeights.push(bar.props.height)})

    var _animations = []


    for (let i = barsHeights.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++){
            var currentElement = j
            var comparingElement = j + 1
            var shouldSwap = false

            if (barsHeights[currentElement] > barsHeights[comparingElement]) {
                const temp = barsHeights[currentElement]
                barsHeights[currentElement] = barsHeights[comparingElement]
                barsHeights[comparingElement] = temp
                shouldSwap = true
            }
            
            j === i - 1 ? _animations.push({currentElement, comparingElement, shouldSwap, lastElement: i  + 1, isLast:true}) : _animations.push({currentElement, comparingElement, shouldSwap, lastElement: i + 1, isLast:false})
        }

    }

    return {_animations, barsHeights}
}