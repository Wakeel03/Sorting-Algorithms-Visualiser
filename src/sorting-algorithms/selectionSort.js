export const selectionSort = (bars) => {
    // console.log(bars[0].props.height)
    var barsHeights = []
    bars.forEach(bar => {barsHeights.push(bar.props.height)})

    var _animations = []

    for (let i = barsHeights.length - 1; i > 0; i--) {
        var currentMax = 0;

        for (let j = 0; j <= i; j++){
            if (barsHeights[j] > barsHeights[currentMax]) currentMax = j;

            var currentElement = currentMax 

            var comparingElement = j
            
            if (j === i) {
                const temp = barsHeights[currentElement]
                barsHeights[currentElement] = barsHeights[comparingElement]
                barsHeights[comparingElement] = temp
            }
            
            j === i ? _animations.push({currentElement, comparingElement, shouldSwap: true, lastElement: i, isLast:true}) : _animations.push({currentElement, comparingElement, shouldSwap: false, lastElement: i, isLast:false})
        }

    }

    return {_animations, barsHeights}
}