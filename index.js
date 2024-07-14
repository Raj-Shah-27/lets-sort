function swap(x,y){
    let temp=x.style.height;
    x.style.height=y.style.height;
    y.style.height=temp;
}

function enableSortingBtns(){
    document.querySelector("#bubble-sort").disabled=false;
    document.querySelector("#selection-sort").disabled=false;
    document.querySelector("#insertion-sort").disabled=false;
    document.querySelector("#merge-sort").disabled=false;
    document.querySelector("#quick-sort").disabled=false;    
}

function disableSortingBtns(){
    document.querySelector("#bubble-sort").disabled=true;
    document.querySelector("#selection-sort").disabled=true;
    document.querySelector("#insertion-sort").disabled=true;
    document.querySelector("#merge-sort").disabled=true;
    document.querySelector("#quick-sort").disabled=true;    
}

function enableArrayBtn(){
    document.querySelector("#new-array").disabled=false;
}

function disableArrayBtn(){
    document.querySelector("#new-array").disabled=true;
}

function enableSize(){
    document.querySelector("#size").disabled=false;
}

function enableSize(){
    document.querySelector("#size").disabled=false;
}

function disableSize(){
    document.querySelector("#size").disabled=true;
}

function enableSpeed(){
    document.querySelector("#speed").disabled=false;
}
function disableSpeed(){
    document.querySelector("#speed").disabled=true;
}

function delayWait(milliSec){
    return new Promise(resolve=>{
        setTimeout(()=>{resolve(' ')},milliSec);
    })
}

let arraySize=document.querySelector("#size");
arraySize.addEventListener('input',function(){
    createNewArray(parseInt(arraySize.value));
});

let delay=260;
let speedVal=document.querySelector("#speed");
speedVal.addEventListener('input',function(){
    delay=320-parseInt(speedVal.value);
});

let array= [];
createNewArray();
function createNewArray(len=20){
    removeBars();
    array=[];
    for(let i=0;i<len;i++){
        array.push(Math.floor(Math.random()*200)+1);
    }
    const bars=document.querySelector("#bars");
    for(let i=0;i<len;i++){
        const bar=document.createElement("div");
        bar.style.height=`${array[i]*2}px`;
        bar.classList.add('bar');
        bar.classList.add('flex-item');
        bars.appendChild(bar);
    }
}

function removeBars(){
    const bar=document.querySelector("#bars");
    bar.innerHTML='';
}

const newArray = document.querySelector("#new-array");
newArray.addEventListener("click", function(){
    enableSortingBtns();
    enableSize();
    createNewArray(arraySize.value);
});


//Bubble Sort
async function bubblesort(){
    const items = document.querySelectorAll(".bar");
    for(let i=0;i<items.length-1;i++){
        for(let j=0; j<items.length-i-1;j++){
            items[j].style.background='#E9C46A';
            items[j+1].style.background='#F4A261';
            if(parseInt(items[j].style.height)>parseInt(items[j+1].style.height)){
                await delayWait(delay);
                swap(items[j],items[j+1]);
            }
            items[j].style.background='#FF204E';
            items[j+1].style.background='#FF204E';
        }
        items[items.length-i-1].style.background='#36BA98';
    }
    items[0].style.background='#36BA98'; 
}

const bubbleBtn = document.querySelector('#bubble-sort');
bubbleBtn.addEventListener('click',async function(){
    disableArrayBtn();
    disableSize();
    disableSortingBtns();
    await bubblesort();
    enableArrayBtn();
    enableSize();
    enableSortingBtns();
})


//Selection Sort
async function selectionsort(){
    const items = document.querySelectorAll(".bar");
    for(let i=0;i<items.length;i++){
        items[i].style.background='#E9C46A';
        let minInd=i;
        for(let j=i+1; j<items.length;j++){
            items[j].style.background='#E76F51';
            await delayWait(delay);
            if(parseInt(items[minInd].style.height)>parseInt(items[j].style.height)){
                if(minInd!=i){
                    items[minInd].style.background="#FF204E";
                }
                minInd=j;
                
            }
            else{
                items[j].style.background='#FF204E';
            }
            
        }
        await delayWait(delay);
        swap(items[minInd],items[i]);
        items[minInd].style.background="#FF204E";
        items[i].style.background='#36BA98';
    }
}


const selectionBtn = document.querySelector('#selection-sort');
selectionBtn.addEventListener('click',async function(){
    disableArrayBtn();
    disableSize();
    disableSortingBtns();
    await selectionsort();
    enableArrayBtn();
    enableSize();
    enableSortingBtns();
})

//Insertion Sort
async function insertionsort(){
    const items = document.querySelectorAll(".bar");
    items[0].style.background="#36BA98";
    for(let i=1;i<items.length;i++){
        let j=i-1;
        let curHeight=items[i].style.height;
        items[i].style.background="#E9C46A";
        await delayWait(delay);
        while(j>=0 && parseInt(items[j].style.height)>parseInt(curHeight)){
            items[j].style.background="#E9C46A";
            items[j+1].style.height=items[j].style.height;
            j--;
            await delayWait(delay);
            for(let k=i;k>=0;k--){
                items[k].style.background="#36BA98";
            }
        }
        items[j+1].style.height=curHeight;
        items[i].style.background="#36BA98";
    }
}

const insertionBtn = document.querySelector('#insertion-sort');
insertionBtn.addEventListener('click',async function(){
    disableArrayBtn();
    disableSize();
    disableSortingBtns();
    await insertionsort();
    enableArrayBtn();
    enableSize();
    enableSortingBtns();
})

//Merge sort

async function merge(items,l,mid,r){
    const n1 = mid-l+1;
    const n2 = r-mid;
    let left=new Array(n1);
    let right=new Array(n2);

    for(let i=0;i<n1;i++){
        await delayWait(delay);
        items[l+i].style.background='#E9C46A';
        left[i]=items[l+i].style.height;
    }
    for(let i=0;i<n2;i++){
        await delayWait(delay);
        items[mid+i+1].style.background='#E76F51';
        right[i]=items[mid+i+1].style.height;
    }
    await delayWait(delay);
    let i=0,j=0,k=l;
    while(i<n1 && j<n2){
        await delayWait(delay);
        if(parseInt(left[i])<=parseInt(right[j])){
            items[k].style.background='#36BA98';
            items[k].style.height=left[i];
            i++;
            k++;
        }
        else{
            items[k].style.background='#36BA98';
            items[k].style.height=right[j];
            j++;
            k++;
        }
    }

    while(i<n1){
        items[k].style.background='#36BA98';
            items[k].style.height=left[i];
            i++;
            k++;
    }
    while(j<n2){
        items[k].style.background='#36BA98';
        items[k].style.height=right[j];
        j++;
        k++;
    }
}

async function mergesort(items,l,r){
    if(l>=r){
        return;
    }
    const mid= l+Math.floor((r-l)/2);
    await mergesort(items,l,mid);
    await mergesort(items,mid+1,r);
    await merge(items,l,mid,r);
}
const mergeBtn = document.querySelector('#merge-sort');
mergeBtn.addEventListener('click',async function(){
    let items=document.querySelectorAll(".bar");
    let l=0;
    let r=parseInt(items.length)-1;
    disableArrayBtn();
    disableSize();
    disableSortingBtns();
    await mergesort(items,l,r);
    enableArrayBtn();
    enableSize();
    enableSortingBtns();
})

//Quick Sort
async function partition(items,l,r){
    let i=l-1;
    items[r].style.background="red";
    for(let j=l;j<=r-1;j++){
        items[j].style.background="yellow";
        await delayWait(delay);
        if(parseInt(items[j].style.height) < parseInt(items[r].style.height)){
            i++;
            swap(items[i],items[j]);
            items[i].style.background="orange";
            if(i!=j) items[j].style.background="orange";
            await delayWait(delay);
        }
        else{
            items[j].style.background="pink";
        }
    }
   
    i++;
    await delayWait(delay);
    swap(items[i],items[r]);
    items[r].style.background="pink";
    items[i].style.background="green";

    await delayWait(delay);
    for(let k=0;k<items.length;k++){
        if(items[k].style.background != "green"){
            items[k].style.background="#FF204E";
        }
    }
    return i;
}

async function quicksort(items,l,r){
    if(l<r){
        let pInd= await partition(items,l,r);
        await quicksort(items,l,pInd-1);
        await quicksort(items,pInd+1,r);
    }
    else{
        if(l>=0 && r>=0 && l<items.length && r<items.length){
            items[r].style.background="green";
            items[l].style.background="green";
        }
    }
}

const quickBtn = document.querySelector('#quick-sort');
quickBtn.addEventListener('click',async function(){
    let items=document.querySelectorAll(".bar");
    let l=0;
    let r=items.length-1;
    disableArrayBtn();
    disableSize();
    disableSortingBtns();
    await quicksort(items,l,r);
    enableArrayBtn();
    enableSize();
    enableSortingBtns();
})


