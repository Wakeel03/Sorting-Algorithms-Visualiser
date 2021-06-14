export const insertionSort = (bars) => {
    var barsHeights = []
    bars.forEach(bar => {barsHeights.push(bar.props.height)})

    var _animations = []

		for (let i = 1; i < barsHeights.length; i++) {
			var key = barsHeights[i]
			var currentElement = i
			var comparingElement = i - 1
			
			while (comparingElement >= 0 && barsHeights[comparingElement] > key){
				barsHeights[comparingElement + 1] = barsHeights[comparingElement]
				_animations.push({currentElement, comparingElement, shouldSwap: true, lastElement: barsHeights.length, isLast:false})
				comparingElement = comparingElement - 1
				currentElement -= 1
			}

			barsHeights[comparingElement + 1] = key
		}


    return {_animations, barsHeights}
}