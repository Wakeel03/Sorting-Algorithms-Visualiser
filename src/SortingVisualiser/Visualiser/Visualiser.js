import './Visualiser.css'
import { bubbleSort } from '../../sorting-algorithms/bubbleSort.js'
import { selectionSort } from '../../sorting-algorithms/selectionSort.js'
import { insertionSort } from '../../sorting-algorithms/insertionSort'
import { mergeSort } from '../../sorting-algorithms/mergeSort'
import { quickSort } from '../../sorting-algorithms/quickSort'

import React, { useState, useEffect } from 'react'
import Bar from './Bar/Bar'

var animationsInterval = null
var animationCount = 0

var barMainColor = 'blue'
var barColorSelected1 = 'red'
var barColorSelected2 = 'green'
var barSwappingColor = 'violet'
var barPivotColor = 'gold'
var barSortedColor = 'grey'


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
        const {_animations, barsHeights} = quickSort(bars)
        
        var unsortedBarsHeights = []
        bars.forEach(bar => {unsortedBarsHeights.push(bar.props.height)})

        console.log(verifyIfArrayIsSorted(unsortedBarsHeights, barsHeights))

        setAnimations(_animations)
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

            for (let i = 0; i < barElements.length; i++) barElements[i].style['background-color'] = barSortedColor
            return
        }

        const barElements = document.querySelectorAll('.bar')
        
        //'arrayChange' is used for those animations related to algorithms which use divide and conquer because they often involve incrementally changing some parts of the array (e.g after merging)
        if ("arrayChange" in animations[count]){
            // console.log("Found")
            const {currentIndex, height} = animations[count]

            if (currentIndex > 0) 
                barElements[currentIndex - 1].style['background-color'] = barMainColor

            barElements[currentIndex].style['background-color'] = barColorSelected1

            barElements[currentIndex].style.height = `${height}px`


        }

        else{
            const {currentElement, comparingElement, shouldSwap, lastElement, isLast, pivotElement} = animations[count]
            //bubble sort
            // if (currentElement > 0) barElements[currentElement - 1].style['background-color'] = 'blue'

            if (currentElement < barElements.length && comparingElement < barElements.length){
                barElements[comparingElement].style['background-color'] = barColorSelected2 
                barElements[currentElement].style['background-color'] = barColorSelected1 
            }

            if (pivotElement)
                barElements[pivotElement].style['background-color'] = barPivotColor
            
            shouldSwap && 
            setTimeout(() => {

                barElements[currentElement].style['background-color'] = barSwappingColor
                barElements[comparingElement].style['background-color'] = barSwappingColor
                

                swapBars(currentElement, comparingElement)
                
                if (isLast) {
                    // barElements[currentElement].style['background-color'] = 'blue'
                    barElements[comparingElement].style['background-color'] = barSortedColor
                }
            }, .3 * visualisationTimer)

            setTimeout(() => {
                let z = lastElement || barElements.length
                for (let k = 0; k < z; k++){
                    if (k !== currentElement && k !== comparingElement && k !== pivotElement)
                        barElements[k].style['background-color'] = barMainColor
                    
                }            
            }, .3 * visualisationTimer)

                            
            if (isLast) {
                // barElements[currentElement].style['background-color'] = 'blue'
                barElements[comparingElement].style['background-color'] = barSortedColor
            }
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
