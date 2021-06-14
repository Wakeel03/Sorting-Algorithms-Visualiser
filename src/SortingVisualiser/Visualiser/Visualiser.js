import './Visualiser.css'
import { bubbleSort } from '../../sorting-algorithms/bubbleSort.js'
import { selectionSort } from '../../sorting-algorithms/selectionSort.js'
import { insertionSort } from '../../sorting-algorithms/insertionSort'
import { divideConquer } from '../../sorting-algorithms/divideConquer'

import React, { useState, useEffect } from 'react'
import Bar from './Bar/Bar'

var animationsInterval = null
var animationCount = 0

export default function Visualiser() {
    const [bars, setBars] = useState([])
    var barsNumber = 50
    var visualisationTimer = 20

    const [animations, setAnimations] = useState([])

    useEffect(() => {
        //Create a list of bars to be used for sorting. Each bar is assigned a random height
        for (var i = 0; i < barsNumber; i++)
            setBars((bars) => [...bars, <Bar height={getRandomHeightForBars()}></Bar>])

    }, [])

    useEffect(() => {
        animations.length > 0 && startAnimation()
    }, [animations])

    const sort = () => {
        // const {_animations, barsHeights} = bubbleSort(bars)
        // const {_animations, barsHeights} = selectionSort(bars)
        // const {_animations, barsHeights} = insertionSort(bars)
        const barsHeights = divideConquer(bars)
        
        var unsortedBarsHeights = []
        bars.forEach(bar => {unsortedBarsHeights.push(bar.props.height)})

        console.log(verifyIfArrayIsSorted(unsortedBarsHeights, barsHeights))

        // setAnimations(_animations)
    }

    const startAnimation = () => {
        const animationsLength = animations.length
        animationsInterval = setInterval(() => {
            animate(animations, animationsLength, animationCount++)
        }, visualisationTimer)
    }

    const animate = (animations, animationsLength, count) => {  
        
        if (count >= animationsLength){
            clearInterval(animationsInterval)
            const barElements = document.querySelectorAll('.bar')

            for (let i = 0; i < barElements.length; i++) barElements[i].style['background-color'] = 'grey'
            return
        }
        
        const {currentElement, comparingElement, shouldSwap, lastElement, isLast} = animations[count]

        const barElements = document.querySelectorAll('.bar')

        //bubble sort
        // if (currentElement > 0) barElements[currentElement - 1].style['background-color'] = 'blue'

        barElements[comparingElement].style['background-color'] = 'green'
        barElements[currentElement].style['background-color'] = 'red'
        
        
        shouldSwap && 
        setTimeout(() => {
            barElements[currentElement].style['background-color'] = 'violet'
            barElements[comparingElement].style['background-color'] = 'violet'

            swapBars(currentElement, comparingElement)
            
            if (isLast) {
                // barElements[currentElement].style['background-color'] = 'blue'
                barElements[comparingElement].style['background-color'] = 'grey'
            }
        }, .3 * visualisationTimer)

        setTimeout(() => {
            for (let k = 0; k < lastElement; k++){
                if (k !== currentElement && k !== comparingElement)
                    barElements[k].style['background-color'] = 'blue'
                
            }            
        }, .3 * visualisationTimer)

                        
        if (isLast) {
            // barElements[currentElement].style['background-color'] = 'blue'
            barElements[comparingElement].style['background-color'] = 'grey'
        }
    }

    const verifyIfArrayIsSorted = (unsortedArray, sortedArray) => {
        console.log(unsortedArray)
        console.log(sortedArray)
        var unsortedArrayCopy = unsortedArray.slice()
        unsortedArrayCopy.sort()
        console.log(unsortedArrayCopy)
        return unsortedArrayCopy.length === sortedArray.length && unsortedArrayCopy.every((element, ind) => element === sortedArray[ind])
    }

    const swapBars = (currentElement, comparingElement) => {  
        //Perform swapping of two bars
        setBars((bars) => {
            var tempBars = [...bars]
            var temp = tempBars[currentElement]
            tempBars[currentElement] = tempBars[comparingElement]
            tempBars[comparingElement] = temp

            return tempBars
        })
    }

    const resumeAnimation = () => {
        startAnimation()
    }

    const clearAnimationInterval = () => {
        clearInterval(animationsInterval)
    }

    return (
        <>
            <button onClick={swapBars}>Swap</button>
            <button onClick={sort}>Sort</button>
            <button onClick={clearAnimationInterval}>Stop</button>
            <button onClick={resumeAnimation}>Continue</button>
            <div className="visualiser">{bars}</div>
        </>
    )
}

function getRandomHeightForBars(){
    /**
     * Returns a random number between min (inclusive) and max (exclusive)
    */
    var min = 200;
    var max = 800;
    return Math.random() * (max - min) + min;
}
