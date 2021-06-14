export const divideConquer = (bars) => {
    var barsHeights = []
    bars.forEach(bar => {barsHeights.push(bar.props.height)})

    var _animations = []

		return sort(barsHeights, 0, barsHeights.length - 1)

    // for (let i = barsHeights.length - 1; i > 0; i--) {
    //     var currentMax = 0;

    //     for (let j = 0; j <= i; j++){
    //         if (barsHeights[j] > barsHeights[currentMax]) currentMax = j;

    //         var currentElement = currentMax 

    //         var comparingElement = j
            
    //         if (j === i) {
    //             const temp = barsHeights[currentElement]
    //             barsHeights[currentElement] = barsHeights[comparingElement]
    //             barsHeights[comparingElement] = temp
    //         }
            
    //         j === i ? _animations.push({currentElement, comparingElement, shouldSwap: true, lastElement: i, isLast:true}) : _animations.push({currentElement, comparingElement, shouldSwap: false, lastElement: i, isLast:false})
    //     }

    // }

    // return {_animations, barsHeights}
}

function sort(barsHeights, startIndex, endIndex){
		if (barsHeights.length === 0 || startIndex === endIndex) return barsHeights

		if (startIndex + 1 === endIndex) return [barsHeights.min(barsHeights[startIndex], barsHeights[endIndex]), barsHeights.max(barsHeights[startIndex], barsHeights[endIndex])]

		return sort(barsHeights, 0, startIndex + .5 * (startIndex - endIndex + 1)).concat(sort(barsHeights, startIndex + .5 * (startIndex - endIndex + 1), endIndex))
		
}