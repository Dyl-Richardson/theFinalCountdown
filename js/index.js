const go = document.querySelector(".go")

function createEvent() {
    let div = document.createElement("div")
    div.className = "event"
    const p = document.createElement("p")
    const button = document.createElement("button")
    button.className = "remove"
    button.addEventListener("click", e => {
        button.parentElement.remove()
    })
    button.innerText = "x"

    const eventList = document.querySelector(".eventList")
    const text = document.querySelector(".text").value
    const date = document.querySelector(".date").value

    setInterval(function(){
        let result = new Date(date) - Date.now()

        let weeks =  Math.floor(result/(1000 * 60 * 60 *24 * 7));
        let days = Math.floor(result / (1000 * 60 * 60 * 24));
        let hours = Math.floor((result % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((result % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((result % (1000 * 60)) / 1000);

        if (result >= 604800000) {
            p.innerText = weeks + "w " + " until " + text;
        }
        else if (result >= 86400000) {
            p.innerText = days + "d " + hours + "h " + " until " + text; 
        }
        else if (result <= 86399999) {
            p.innerText = hours + "h " + minutes + "m " + seconds + "s " + " until " + text;
        }
        else if (result <= 0) {
            p.innerText = ""
        }
        
    },1000)
   p.appendChild(button)
   
    eventList.appendChild(div)
    div.appendChild(button)
    div.appendChild(p)
    
}

go.addEventListener("click", e => {
    createEvent() 
})
const date = document.querySelector(".date").value
let val = new Date(date)
console.log(Date.now() - new Date(date));
