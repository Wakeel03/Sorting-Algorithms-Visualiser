var _animations = []
export const quickSort = (bars) => {
    _animations = []
    var barsHeights = []
    bars.forEach(bar => {barsHeights.push(bar.props.height)})
    
    sort(barsHeights, 0, barsHeights.length - 1)

    return {_animations, barsHeights}
}

function sort(barsHeights, startIndex, endIndex){

    // var pivotElement = endIndex

    if (startIndex < endIndex){
      var pivotPositionAfterPartitioning = partition(barsHeights, startIndex, endIndex - 1)

      sort(barsHeights, startIndex, pivotPositionAfterPartitioning - 1)
      sort(barsHeights, pivotPositionAfterPartitioning + 1, endIndex)

    }
    
}

function partition(barsHeights, startIndex, endIndex){
   var pivotIndex = endIndex + 1
   var pivotElement = barsHeights[pivotIndex]
   
   while (startIndex < endIndex){
     _animations.push({currentElement: startIndex, comparingElement: endIndex, shouldSwap: false, pivotElement: pivotIndex})
     if (barsHeights[startIndex] > pivotElement){
       if (barsHeights[endIndex] < pivotElement){
        _animations.push({currentElement: startIndex, comparingElement: endIndex, shouldSwap: true, pivotElement: pivotIndex})
        let temp = barsHeights[startIndex]
        barsHeights[startIndex] = barsHeights[endIndex]
        barsHeights[endIndex] = temp
        startIndex++
       }
       endIndex--
     }else{
      startIndex++
     }
   }

  if (barsHeights[startIndex] <= pivotElement){
    _animations.push({currentElement: startIndex + 1, comparingElement: pivotIndex, shouldSwap: true, pivotElement: pivotIndex})
    barsHeights[pivotIndex] = barsHeights[startIndex + 1]
    barsHeights[startIndex + 1] = pivotElement
    return startIndex + 1
   }
  else{ 
    _animations.push({currentElement: startIndex, comparingElement: pivotIndex, shouldSwap: true, pivotElement: pivotIndex})
    barsHeights[pivotIndex] = barsHeights[startIndex]
    barsHeights[startIndex] = pivotElement
    return startIndex
  }

}
