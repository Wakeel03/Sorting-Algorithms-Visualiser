var _animations = []
export const mergeSort = (bars) => {
    _animations = []
    var barsHeights = []
    bars.forEach(bar => {barsHeights.push(bar.props.height)})

		sort(barsHeights, 0, barsHeights.length - 1)

    return {_animations, barsHeights}
}

function sort(barsHeights, startIndex, endIndex){
		if (startIndex >= endIndex) return
    
    var mid = startIndex + parseInt(.5 * (endIndex - startIndex))

    sort(barsHeights, startIndex, mid)
    _animations.push({currentElement: startIndex, comparingElement: mid, shouldSwap:false})

    sort(barsHeights, mid + 1, endIndex)
    _animations.push({currentElement: mid + 1, comparingElement: endIndex, shouldSwap:false})

    merge(barsHeights, startIndex, mid, endIndex)
		
}

function merge(barsHeights, startIndex, mid, endIndex){


  var n1 = mid - startIndex + 1
  var n2 = endIndex - mid

  var leftIndex = 0
  var rightIndex = 0
  
  // var leftArray = barsHeights.slice(startIndex, mid)
  // var rightArray = barsHeights.slice(mid, endIndex + 1)

  var leftArray = Array(n1)
  var rightArray = Array(n2)

  //NOTE: Array.prototype.slice() references memory addresses, so cannot use it there

  for (let i = 0; i < n1; i++){
    leftArray[i] = barsHeights[startIndex + i]
  }
  for (let j = 0; j < n2; j++){
    rightArray[j] = barsHeights[mid + j + 1]
  }

  var k = startIndex

  while (leftIndex < n1 && rightIndex < n2){
    _animations.push({currentElement: startIndex + leftIndex, comparingElement: mid + 1 + rightIndex, shouldSwap:false})
    if (leftArray[leftIndex] <= rightArray[rightIndex]){
      barsHeights[k] = leftArray[leftIndex++]
    }else{
      barsHeights[k] = rightArray[rightIndex++]
    }
    k++
  }


  while (leftIndex < n1) {
    _animations.push({currentElement: startIndex + leftIndex, comparingElement: mid + 1 + rightIndex, shouldSwap:false})
    barsHeights[k++] = leftArray[leftIndex++]
  }

  while (rightIndex < n2) {
    _animations.push({currentElement: startIndex + leftIndex, comparingElement: mid + 1 + rightIndex, shouldSwap:false})
    barsHeights[k++] = rightArray[rightIndex++]
  }

  for  (let i = startIndex; i <= endIndex; i++){
    _animations.push({arrayChange: true, currentIndex: i, height: barsHeights[i]})
  }

}