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

var chosenAlgorithm = "Bubble Sort"


export default function Visualiser() {
    const [bars, setBars] = useState([])
    const [barsNumber, setBarsNumber] = useState(50)
    const [visualisationTimer, setVisualisationTimer] = useState(20)
    const [generateBars, setGenerateBars] = useState(true)

    const [isAnimationOn, setIsAnimationOn] = useState(false)

    const [animations, setAnimations] = useState([])

    useEffect(() => {
        //Create a list of bars to be used for sorting. Each bar is assigned a random height
        for (var i = 0; i < barsNumber; i++)
            setBars((bars) => [...bars, <Bar height={getRandomHeightForBars()}></Bar>])

    }, [])

    useEffect(() => {
        console.log(animations)
        animations.length > 0 && startAnimation()
    }, [animations])

    useEffect(() => {
        for (var i = 0; i < barsNumber; i++)
            bars[i] = <Bar height={getRandomHeightForBars()}></Bar>
        setBars((bars) => [...bars])

    }, [generateBars])

    const generateNewBars = () => {
        setBars([])
        setGenerateBars(!generateBars)
    }

    const sort = () => {
        // console.log("Sort")
        var algorithm = bubbleSort

        switch(chosenAlgorithm){
            case "Bubble Sort":
                algorithm = bubbleSort
                break
            case "Selection Sort":
                algorithm = selectionSort
                break
            case "Insertion Sort":
                algorithm = insertionSort
                break
            case "Merge Sort":
                algorithm = mergeSort
                break
            case "Quick Sort":
                algorithm = quickSort
                break
            default:
                algorithm = bubbleSort
                break
        }
        
        const {_animations, barsHeights} = algorithm(bars)
        
        var unsortedBarsHeights = []
        bars.forEach(bar => {unsortedBarsHeights.push(bar.props.height)})

        // console.log(verifyIfArrayIsSorted(unsortedBarsHeights, barsHeights))
        console.log(_animations)
        // console.log(algorithm)
        setAnimations(_animations)
        // console.log(animations)
    }

    const startAnimation = () => {
        setIsAnimationOn(true)
        animationCount = 0
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
            setIsAnimationOn(false)
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
        setIsAnimationOn(false)
        clearInterval(animationsInterval)
    }

    return (
        <>
            <nav>
                <ul>
                    <li onClick={() => chosenAlgorithm = "Bubble Sort"}>Bubble Sort</li>
                    <li onClick={() => chosenAlgorithm = "Insertion Sort"}>Insertion Sort</li>
                    <li onClick={() => chosenAlgorithm = "Selection Sort"}>Selection Sort</li>
                    <li onClick={() => chosenAlgorithm = "Merge Sort"}>Merge Sort</li>
                    <li onClick={() => chosenAlgorithm = "Quick Sort"}>Quick Sort</li>
                </ul>
                <div>
                    <button onClick={generateNewBars}>Generate Bars</button>
                    <div class="sliders">
                        <label>Array Size</label>
                        <div class="slidecontainer">
                            <input type="range" min="5" max="50" value={barsNumber} class="slider" id="myRange" onChange={(e) => setBarsNumber(e.target.value)} />
                        </div>
                    </div>
                    <div class="sliders">
                        <label>Sorting Speed</label>
                        <div class="slidecontainer">
                            <input type="range" min="20" max="1000" value={visualisationTimer} class="slider" id="myRange" onChange={(e) => setVisualisationTimer(e.target.value)} />
                        </div>
                    </div>
                </div>
                {isAnimationOn ? <button onClick={clearAnimationInterval}>Stop</button> : <button onClick={sort}>Play</button>}
            </nav>
            
            {/* <button onClick={swapBars}>Swap</button>
            <button onClick={sort}>Sort</button>
            <button onClick={clearAnimationInterval}>Stop</button>
            <button onClick={resumeAnimation}>Continue</button> */}
            <div class="visualiser">{bars}</div>
        </>
    )
}

function getRandomHeightForBars(){
    /**
     * Returns a random number between min (inclusive) and max (exclusive)
    */
    var min = 60;
    var max = 650;
    return Math.random() * (max - min) + min;
}
