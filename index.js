let nav = 0;
const weekdaysEl = document.getElementById("alldays")
let events = localStorage.getItem("eventsArr") ? JSON.parse(localStorage.getItem("eventsArr")) : []
console.log(events)


function displayCal() {
    const currentDate = new Date()
    if (nav != 0) {
        currentDate.setMonth(new Date().getMonth() + nav)
    }
    const day = currentDate.getDate()
    const month = currentDate.getMonth()

    const year = currentDate.getFullYear()
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    let monthStr = currentDate.toLocaleString("en-us", {
        month: "long"
    })
    const firstDayofMonth = new Date(year, month, 1).toLocaleString("en-us", {
        weekday: "short"
    })

    document.getElementById("currentMonth").innerText = monthStr + ", " + year;

    let getDaysinMonth = new Date(year, month + 1, 0).getDate()
    let indexOfFirstDay = weekdays.indexOf(firstDayofMonth)
    weekdaysEl.innerHTML = ""
    for (let i = 1; i <= indexOfFirstDay + getDaysinMonth; i++) {
        let fillDay = document.createElement("div")
        let dateStr = `${i - indexOfFirstDay}/${month + 1}/${year}`
        let eventForTheDay = events.find(e => dateStr === e.date)

        if (i > indexOfFirstDay) {
            if (day === i - indexOfFirstDay && nav === 0) {
                fillDay.id = "today"
            }
            fillDay.classList.add("dt")
            fillDay.innerText = i - indexOfFirstDay
            if (eventForTheDay) {
                let dateEvent = document.createElement("div")
                dateEvent.classList.add("event")

                dateEvent.innerText = eventForTheDay.task;
                fillDay.appendChild(dateEvent)
            }
        }
        fillDay.addEventListener("click", () => openModal(dateStr))
        weekdaysEl.appendChild(fillDay)
    }
}

function openModal(date) {
    let taskOfTheDay;
    const eventForTheDay = events.find(e => date === e.date)
    if (eventForTheDay) {
        taskOfTheDay = eventForTheDay.task
        document.getElementById("edit-modal").style.display = "block";
    } else {
        document.getElementById("new-modal").style.display = "block";


    }

    document.getElementById("modal-overlay").style.display = "block";
    document.getElementById("input-value").value = ""
    document.getElementById("edit-text").value = taskOfTheDay;

    document.getElementById("cancelBtn").addEventListener("click", closeModal)
    document.getElementById("closeBtn").addEventListener("click", closeModal)
    document.getElementById("delBtn").addEventListener("click", () => deleteEvent(date))
    document.getElementById("saveBtn").addEventListener("click", () => saveTask(date))

    console.log(events)
}

function saveTask(date) {
    let value = document.getElementById("input-value").value
    if (value) {
        events.push({ date, task: value })
        localStorage.setItem("eventsArr", JSON.stringify(events))
        closeModal()
    } else {
        document.getElementById("input-value").style.border = "1px solid red";
    }
    displayCal()
}

function deleteEvent(date) {
    events = events.filter(e => {
        return e.date !== date
    })

    closeModal()
    displayCal()
    localStorage.setItem("eventsArr", JSON.stringify(events))
}

function closeModal() {
    document.getElementById("new-modal").style.display = "none";
    document.getElementById("edit-modal").style.display = "none";
    document.getElementById("modal-overlay").style.display = "none";
}

function handleMonthsBtn() {
    document.getElementById("next").addEventListener("click", () => {
        nav++
        displayCal()
    })
    document.getElementById("back").addEventListener("click", () => {
        nav--
        displayCal()
    })
}
handleMonthsBtn()
displayCal();


