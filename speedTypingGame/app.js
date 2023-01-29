const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplayEl = document.getElementById('quoteDisplay')
const quoteInputEl = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

quoteInputEl.addEventListener('input', () => {
    // Grab all spans that were created in function below
    const arrayQuote = quoteDisplayEl.querySelectorAll('span')
    
    // Split the input value
    const arrayValue = quoteInputEl.value.split('')

    let correct = true

    // Loop through each arrayQuote
    arrayQuote.forEach((characterSpan, index) => {
        // Set the character const to the arrayValue[index]
        const character = arrayValue[index]
        
        // If character is null
        if(character == null){
            // Remove correct and incorrect class
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
            // Check if character is equal to characterSpan innerText
        }else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }else{
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })

    if(correct) renderNewQuote()
})

// Create getRandomQuote async function
const getRandomQuote = async () => {
    // Fetch api
    const res = await fetch(RANDOM_QUOTE_API_URL)
    // Destructre to get the content
    const { content } = await res.json()

    return content
}

// Create renderNewQuote async function
const renderNewQuote = async () => {
    // Run getRandomQuote and set its return to quote
    const quote = await getRandomQuote()
    // Set innerText of quoteDisplayEl to quote
    quoteDisplayEl.innerText = ''

    // Split the quote by each character and loop through
    quote.split('').forEach(character => {

        // Create a new span forEach character
        const characterSpan = document.createElement('span')

        // Set the innerText of characterSpan to the current character loop
        characterSpan.innerText = character
        
        // Append characterSpan to quoteDisplayEl
        quoteDisplayEl.appendChild(characterSpan)
    })
    // Set the value of the input to null
    quoteInputEl.value = null
    startTimer()
}

let startTime;

const startTimer = () => {
    timerElement.innerText = 0;
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)
}

const getTimerTime = () => {
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()
