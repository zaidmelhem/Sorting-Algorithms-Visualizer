const randomize = document.getElementById('randomize')
const arra = document.getElementById('array-graph')
const solve = document.getElementById('solve')
const inputRange = document.getElementById('array-length')
let outputRange = document.getElementById('output-range')
const algorithms = document.getElementsByName('algorithms')
const complete = document.getElementById('complete') 
const orangeColor = '#FEB631' ;
const greenColor = '#6CCC87' ;
const blueColor = '#99CAE6' ;
const yalloColor = '#fadc31';
const whiteColor = 'white' ;
const blackColor = 'black' ;
let arrrayLength ;
let randomArray ;
let itemGraph ;
let isRun = false ;
 // To get value of input range that represent length of array
const getArrayLength = (val)=> {
    outputRange.textContent = val;
    arrrayLength=val;
}
// Event listener for randomize button to generate random array whose length is determine on 'getArrayLength' function  
randomize.addEventListener('click',()=>{
    if (arrrayLength){
     randomArray = Array.from({length: arrrayLength}, () => Math.floor(Math.random() * 100));
    arra.innerHTML = randomArray.map(element=>
        ` <div class="item-graph" id="item-graph" style ="height:${element*5+50}px; width:35px ;background:#99CAE6">${element}</div>`).join("")
    itemGraph = document.getElementsByClassName('item-graph')
    complete.textContent = "" ;
} else alert("Please Select Array Length Before")
})
// Set control buttons properties when app run , to prevent click on any button through app running
const runSolveProperties = ()=>{
    solve.disabled = true ;
    changeBackgroundColor(solve,greenColor)
    solve.style.color = whiteColor
    solve.style.border = "none"
    randomize.disabled = true ;
    inputRange.disabled = true ;
    for (let i in algorithms ){
        algorithms[i].disabled = true ;
    }
}
// Return control buttons properties to orginal style when app stop of running
const stopSolveProperties= ()=>{
    solve.disabled = false ;
    changeBackgroundColor(solve,whiteColor)
    solve.style.color = blackColor
    solve.style.border = "1px solid black"
    randomize.disabled = false ;
    inputRange.disabled = false ;
    inputRange.value = 0 ;
    randomArray = 0 ;
    onMouseEvent(solve);
    for (let i in algorithms ){
        algorithms[i].disabled = false ;
    }
    arrrayLength = 0 ;
    complete.textContent = "You Got An Sorted Array 🤭😎🎆🎊 🎉" ;
    outputRange.textContent = 0 ;
}
// Set solve button properties when mouse hover it and mouse out , this is call after app stop of running ,to return hover properties to solve button
const onMouseEvent = (element)=>{
    element.onmouseover = ()=>{
        changeBackgroundColor(element,blackColor)
        element.style.color = whiteColor ;
       }
    element.onmouseout =()=>{
        changeBackgroundColor(element,whiteColor)
        element.style.color = blackColor
   } 
}
// this function used to call function that set control buttons properties and return it 
const changeProperties = ()=>{
    if(isRun) runSolveProperties();
     else stopSolveProperties();
}
//Event listener to solve button to start visualize the selected algorithm
solve.addEventListener('click',async ()=>{
    if(randomArray){
        isRun = true;
        changeProperties();
        var algorithmSelected ;
        for (let i in algorithms ){
            (algorithms[i].checked) && (algorithmSelected = algorithms[i].value);
        }
    switch(Number(algorithmSelected)){
        case 0: 
          await bubbleSort();
            isRun = false;
            changeProperties();
            break ; 
        case 1: 
           await selectionSort(); 
            isRun = false;
            changeProperties();
            break; 
        case 2: 
          await insertionSort()
            isRun = false;
            changeProperties();
            break;
    }
    } 
    else alert("Please Generate New Array By Randomize Button Before")
})

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
// swap two nodes (node = > element that represent column on graph)  
const swapNodes = (elementOne, elementTwo)=> {
    let dummy = document.createElement("span")
    elementOne.before(dummy)
    elementTwo.before(elementOne)
    dummy.replaceWith(elementTwo)
}
// swap two array elements
const swapArrayElement = (elementIndex1 , elementIndex2)=>{
    var temp = randomArray[elementIndex1]
    randomArray[elementIndex1] = randomArray[elementIndex2]
    randomArray[elementIndex2] = temp
}

// Change background color of element ,This introduces the animation of element
const changeBackgroundColor = (element,color)=>{
    element.style.backgroundColor = color ;
}

const bubbleSort = async ()=>{
    var j ;
    await sleep(200)
        for(var i = 0; i <= arrrayLength-1; i++){        
            for(j = 0; j < (arrrayLength - i -1); j++){
                let currentElement = itemGraph[j] ;
                let nextElement = itemGraph[j+1]
                    await sleep(200)
                    changeBackgroundColor(currentElement,greenColor)
                    changeBackgroundColor(itemGraph[j+1],greenColor)
                    await sleep(200)
                    if(randomArray[j] > randomArray[j+1]){
                        await sleep(150)
                        swapNodes(currentElement,nextElement)
                        changeBackgroundColor(nextElement,blueColor)
                        changeBackgroundColor(currentElement,greenColor)
                        swapArrayElement(j,j+1)
                    } else{
                        changeBackgroundColor(currentElement,blueColor)
                        changeBackgroundColor(nextElement,blueColor)
                    }
            }
            changeBackgroundColor(itemGraph[j],orangeColor)
        }
}

const selectionSort = async()=>{
    var i ,j ;
    await sleep(200)
    for(i = 0; i <arrrayLength-1 ; i++) {
        await sleep(200)
        let min = i;
        changeBackgroundColor(itemGraph[min],yalloColor)
        await sleep(200)
        for( j = i+1; j < arrrayLength; j++){
            await sleep(200)
            changeBackgroundColor(itemGraph[j],greenColor)
            await sleep(200)
            if(randomArray[j] < randomArray[min]) {
                await sleep(150)
                changeBackgroundColor(itemGraph[min],blueColor)
                await sleep(100)
                min=j; 
                await sleep(200)
                changeBackgroundColor(itemGraph[min],yalloColor)
                await sleep(270)
            } else {
                changeBackgroundColor(itemGraph[j],blueColor)
            }
         }
         if (min != i) {
            swapNodes(itemGraph[i],itemGraph[min])
            swapArrayElement(i,min)
        }
        changeBackgroundColor(itemGraph[i],orangeColor)
    }
    changeBackgroundColor(itemGraph[i],orangeColor)
}

const insertionSort = async () =>{
    await sleep(200)
    for (let i = 1; i < arrrayLength; i++) {
      await sleep(300)
      changeBackgroundColor(itemGraph[i],yalloColor)
      let key = randomArray[i]
      var keyNode = itemGraph[i]
      let j;
      for (j = i - 1; j >= 0 ; j--) {
        await sleep(300)
        changeBackgroundColor(itemGraph[j],greenColor)
        await sleep(300)
        if (randomArray[j] > key){
            let firstNode = itemGraph[j]
            let clonedNode = firstNode.cloneNode(true)
            await sleep(300)
            itemGraph[j+1].replaceWith(clonedNode)
            changeBackgroundColor(itemGraph[j],blueColor)
            changeBackgroundColor(itemGraph[j+1],blueColor)
            randomArray[j + 1] = randomArray[j]
        } else {
            await sleep(300)
            changeBackgroundColor(itemGraph[j],blueColor)
            changeBackgroundColor(itemGraph[j+1],blueColor)
            break;
        } 
      }
      await sleep(200)
      let clonedKeyNode = keyNode.cloneNode(true)
      await sleep(300)
      itemGraph[j+1].replaceWith(clonedKeyNode)
      changeBackgroundColor(itemGraph[j+1],blueColor)
      await sleep(100)
      changeBackgroundColor(itemGraph[i-1],blueColor)
      randomArray[j + 1] = key
    }
    for (let i in randomArray) changeBackgroundColor(itemGraph[i],orangeColor)
  }
  
