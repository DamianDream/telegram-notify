const form = document.querySelector('#form')

const fetchTelegramMessage = async (url) => {
    try {
        const response = await fetch(url, { method: "GET" })
        if(response.ok) {
            form.reset()
        }
    } catch(error) {
        console.log('There was an error', error.message);
    }
}

const getUrl = (message) => {
    const _TOKEN = "6427950690:AAG1CQKulKfP9A2334lpgOL9ibLCal5LyJQ"
    const _CHAT_ID = "-4079251288"

    return `https://api.telegram.org/bot${_TOKEN}/sendMessage?chat_id=${_CHAT_ID}&text=${message}&parse_mode=html`
}

const getFormData = (formNode) => {
    const {title, content} = Object.fromEntries(new FormData(formNode))
    console.log("Title: ", title)
    console.log("Message: ", content)
    return `WebPage nitification:%0A - <b>Title:</b> <i>${title}</i>%0A - <b>Message:</b> <i>${content}</i>`
}

const sendNotification = async (event) => {
    event.preventDefault()

    // collect data from the form
    const message = getFormData(form)

    // create url address for GET request
    const url = getUrl(message)

    // fetch data to the Telegram Bot
    await fetchTelegramMessage(url)
}

// Event Listener for form submit action
form.addEventListener('submit', sendNotification)

