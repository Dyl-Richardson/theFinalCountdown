import {eventStorage, addEvent} from "./storage"

//* Create event
function createEvent() {
    const div = document.createElement("div")
    div.className = "event"

    const p = document.createElement("p")

    const button = document.createElement("button")
    button.innerText = "x"
    button.className = "remove"
    button.addEventListener("click", e => {
        button.parentElement.remove()
        clearInterval(interval)
        localStorage.clear()
    })

    const eventList = document.querySelector(".eventList")
    const text = document.querySelector(".text").value
    const date = document.querySelector(".date").value
    
    let interval = setInterval(function(){
        let result = new Date(date) - Date.now()
        let weeks =  Math.floor(result/(1000 * 60 * 60 *24 * 7));
        let days = Math.floor(result / (1000 * 60 * 60 * 24));
        let hours = Math.floor((result % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((result % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((result % (1000 * 60)) / 1000);

        if (result >= 604800000) {
            p.innerText = weeks + "w " + " until " + text;
        }
        if (result <= 604799999) {
            p.innerText = days + "d " + hours + "h " + " until " + text; 
        }
        if (result <= 86399999) {
            p.innerText = hours + "h " + minutes + "m " + seconds + "s " + " until " + text;
        }
        if (result <= 999){
            p.parentElement.remove()
            clearInterval(interval)
        }
        
    },1000)
   
    eventList.appendChild(div)
    div.appendChild(button)
    div.appendChild(p)
}

//* Button
const go = document.querySelector(".go")
go.addEventListener("click", e => {
    createEvent() 
})