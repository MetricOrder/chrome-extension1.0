
let myLinks = []
const inputEl = document.querySelector("#input-el")
const inputBtn = document.querySelector("#input-btn")
const tabBtn = document.querySelector("#tab-btn")
const deleteBtn = document.querySelector("#delete-btn")
const ulEl = document.querySelector("#ul-el")
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

if (linksFromLocalStorage){
    myLinks = linksFromLocalStorage
    render(myLinks)
}

inputBtn.addEventListener("click", function(){
    myLinks.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem ("myLinks", JSON.stringify(myLinks))
    render(myLinks)
})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLinks.push(tabs[0].url)
        localStorage.setItem ("myLinks", JSON.stringify(myLinks))
        render(myLinks)
    })
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLinks = []
    render(myLinks)
})

function render(links) {
    let listItems = ""
    for (let i = 0; i < links.length; i++) {
        listItems +=`
            <li>
                <a target='_blank' href='${links}'>
                    ${links[i]}
                </a>
            </li>  
        `    
    }
    ulEl.innerHTML = listItems
}