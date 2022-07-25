// Global Variables
const timeDay = document.getElementById('currentDay');
const actualHour = moment().hours()
timeDay.textContent = moment().format("MMM Do YYYY");
const saveButtons = document.getElementsByClassName("saveBtn");
const saveContent = document.getElementById("save-content");
const arrayBtnsandContent = localStorage.getItem('content')
const myArrayBtnsandContent = getContentArray(arrayBtnsandContent)

// Function to check the time of the day and the color of each textareas
for (let i = 9; i <= 17; i++) {
    let hourOfTheDayColor = document.getElementById(`${i}`); 
    let nextSibling = hourOfTheDayColor.nextElementSibling;
    // PAST
    if (i < actualHour) {
        nextSibling.classList.add('past')
        nextSibling.textContent = "Event that already happened"
    } // FUTURE
    else if (i > actualHour){
        nextSibling.classList.add('future')
        nextSibling.textContent = 'Future Events'
    } // PRESENT 
    else {
        nextSibling.classList.add('present')
        nextSibling.textContent = 'Current hour'
    }
}

// Function to save items in localstorage
for(let i=0; i<saveButtons.length; i++){
    saveButtons[i].addEventListener("click", function(){
        let buttnId = document.getElementById(`btn${i}`) 
        let content = buttnId.previousElementSibling;
        const localContent = localStorage.getItem('content')
        const arrayContent = localContent ? JSON.parse(localContent) : [];
        arrayContent.push({
            content: content.value,
            bttnPressed: buttnId.id
        })
        localStorage.setItem('content', JSON.stringify(arrayContent));
        showText();
    })
}

function showText() {
    const content = localStorage.getItem('content')
    const contentArray = getContentArray(content)
    const lastItemArray = contentArray[contentArray.length - 1]
    saveContent.textContent = `You saved "${lastItemArray.content}", you'll be able to see it
    every time you visit this page!`;
    console.log(contentArray)
}

function getContentArray(content) {
    const allContents = JSON.parse(content)
    return allContents
}

if (arrayBtnsandContent.length > 0) {
    for(let i= 0; i< myArrayBtnsandContent.length; i++) {
        let grabButton = document.getElementById(`${myArrayBtnsandContent[i].bttnPressed}`);
        let content = grabButton.previousElementSibling;
        content.textContent = myArrayBtnsandContent[i].content
    }
}