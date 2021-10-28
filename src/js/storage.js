let eventIdIndex = 0;
// Create array of stockage
export let eventStorage = JSON.parse(localStorage.getItem('events')) || []

// Create element
export function addEvent() {
    const eventList = document.querySelector(".eventList")
    
    for (let i = 0; i < eventStorage.length; i++) {
        const div = document.createElement("div")
        div.className = "event"

        const p = document.createElement("p")
        
        const button = document.createElement("button")
        button.innerText = "x"
        button.className = "remove"
        button.addEventListener("click", e => {
            const elementToRemove = element => element.id == e.target.parentElement.id
            eventStorage.splice(eventStorage.findIndex(elementToRemove),1)
            localStorage.setItem('events', JSON.stringify(eventStorage));
            clearInterval(interval)
            button.parentElement.remove()
        })
    
        let interval = setInterval(function(){
            let result = new Date(eventStorage[i].date) - Date.now();
            let weeks =  Math.floor(result/(1000 * 60 * 60 *24 * 7));
            let days = Math.floor(result / (1000 * 60 * 60 * 24));
            let hours = Math.floor((result % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((result % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((result % (1000 * 60)) / 1000);

            if (result >= 604800000) {
                p.innerText = weeks + "w " + " until " + eventStorage[i].name;
            }
            if (result <= 604799999) {
                p.innerText = days + "d " + hours + "h " + " until " + eventStorage[i].name; 
            }
            if (result <= 86399999) {
                p.innerText = hours + "h " + minutes + "m " + seconds + "s " + " until " + eventStorage[i].name;
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
}

// Button
const go = document.querySelector(".go")
go.addEventListener("click", e => {
    const text = document.querySelector(".text").value
    const date = document.querySelector(".date").value

    const event = {
    name: text,
    date: date,
    id: eventIdIndex
    }
    e.preventDefault()
    eventStorage.push(event)
    localStorage.setItem('events', JSON.stringify(eventStorage))
    eventIdIndex++
})

// Add on reload
if(eventStorage.length !== 0) {
    addEvent()
}