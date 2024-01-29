// Global variables
const wordnikKey = config.wordnik_key
const textInput = document.querySelector('#textInput')
const submitButton = document.querySelector('#submitButton')
const validScrabble = document.querySelector('#valid-word')
  validScrabble.style.display = ''
const invalidScrabble = document.querySelector('#invalid-word')
  invalidScrabble.style.display = ''
const audio = document.querySelector('#audio')
  audio.style.display = ''
const mainDisplay = document.querySelector('#main-display')
  mainDisplay.style.display = ''
const frequencyData = document.querySelector('#frequency')
const phoneticsData = document.querySelector('#phonetics')
const noPhonetics = document.querySelector('#no-phonetics')
  noPhonetics.style.display = ''
const etymologiesData = document.querySelector('#etymologies')
const syllablesTotal = document.querySelector('#syllables-total')
const syllablesData = document.querySelector('#syllables')
const stress = document.querySelector('#stress')
const phrasesData = document.querySelector('#phrases')
const noPhrases = document.querySelector('#no-phrases')
const relatedWords = document.querySelector('#related-words')
const noRelated = document.querySelector('#no-related')
const definitionsList = document.querySelector('#definitions')
const noDefinitions = document.querySelector('#no-definitions')
  noDefinitions.style.display = ''
const anagrams = document.querySelector('#anagram')
const noAnagrams = document.querySelector('#no-anagrams')
  noAnagrams.style.display = ''

// Scrabble value variables
const scoreDisplay = document.querySelector('#score-display')
  scoreDisplay.style.display = ''
const valuesSpan = document.querySelector('#scrabble-value')
let runningTotal = 0
let scrabbleValues = [{
  "letter": "a",
  "value": 1
}, {
  "letter": "b",
  "value": 3
}, {
  "letter": "c",
  "value": 3
}, {
  "letter": "d",
  "value": 2
}, {
  "letter": "e",
  "value": 1
}, {
  "letter": "f",
  "value": 4
}, {
  "letter": "g",
  "value": 2
}, {
  "letter": "h",
  "value": 4
}, {
  "letter": "i",
  "value": 1
}, {
  "letter": "j",
  "value": 8
}, {
  "letter": "k",
  "value": 5
}, {
  "letter": "l",
  "value": 1
}, {
  "letter": "m",
  "value": 3
}, {
  "letter": "n",
  "value": 1
}, {
  "letter": "o",
  "value": 1
}, {
  "letter": "p",
  "value": 3
}, {
  "letter": "q",
  "value": 10
}, {
  "letter": "r",
  "value": 1
}, {
  "letter": "s",
  "value": 1
}, {
  "letter": "t",
  "value": 1
}, {
  "letter": "u",
  "value": 1
}, {
  "letter": "v",
  "value": 4
}, {
  "letter": "w",
  "value": 4
}, {
  "letter": "x",
  "value": 8
}, {
  "letter": "y",
  "value": 4
}, {
  "letter": "z",
  "value": 10
}]

// Asides
const randomWord = document.querySelector('#random-word')
const randomDefinition = document.querySelector('#random-definition')
const highScorers = document.querySelectorAll('.high-scorer')

// Functions

// Clear populated data
const removeChildNodes = (details) => {
  while (details.firstChild) {
    details.removeChild(details.firstChild)
  }
}

// Check if valid Scrabble word
  // Code for fetch adapted from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
const validScrabbleWord = async(input) => {
  const response = await fetch("/scrabblelist.json")
  const list = await response.json()
  let textInput = input.replace(/ /g, '')
  if (list.words.includes(`${textInput}`)) {
    validScrabble.style.display = ''
    runningTotal = 0
    scrabbleValue(input)
  } else {
    invalidScrabble.style.display = ''
  }
}

// Anagrams
const anagram = async(input) => {
  const response = await fetch("/scrabblelist.json")
  const list = await response.json()
  let textInput = input.replace(/ /g, '')
  let inputSplit = textInput.split("")
  for (let i=0; i < list.words.length; i++) {
    let scrabbleSplit = list.words[i].split("")
    if (scrabbleSplit.length <= inputSplit.length && isSubset(inputSplit, scrabbleSplit) && textInput !== list.words[i]) {
      noAnagrams.style.display = 'none'
      let anagramList = anagrams.appendChild(document.createElement('li'))
      anagramList.innerText += `${list.words[i]}`
    }
  }
}

// adapted from https://dev.to/smpnjn/javascript-check-if-an-array-is-a-subset-of-another-array-950
const isSubset = (array1, array2) => {
  array1.every((element) => 
    {array2.includes(element)}
)}

const scrabbleValue = (input) => {
  let splitWord = input.split("")
  for (let i=0; i< splitWord.length; i++) {
    for (let n=0; n < scrabbleValues.length; n++) {
      if (splitWord[i] === scrabbleValues[n].letter) {
        runningTotal = runningTotal + scrabbleValues[n].value
        scoreDisplay.style.display = ''
        valuesSpan.innerHTML = runningTotal
      }
    }
  }
}

// Pronounciation audio
const pronounciation = async(input) => {
  const audioLink = (await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)).data[0].phonetics
  if (audioLink[0].audio && audioLink[0] !== '') {
    audio.style.display = ''
    audio.setAttribute("href", audioLink[0].audio)
  } else if (audioLink[1].audio && audioLink[1] !== '') {
    audio.style.display = ''
    audio.setAttribute("href", audioLink[1].audio)
  } else if (audioLink[2].audio && audioLink[2] !== '') {
    audio.style.display = ''
    audio.setAttribute("href", audioLink[2].audio)
  } else if (audioLink[3].audio && audioLink[3] !== '') {
    audio.style.display = ''
    audio.setAttribute("href", audioLink[3].audio)
  } else {
    return
  }
}

// Syllables
const syllables = async(input) => {
  let textInput = input.replace(/ /g, '%20')
  const response = (await axios.get(`https://api.wordnik.com/v4/word.json/${textInput}/hyphenation?useCanonical=false&limit=50&api_key=${wordnikKey}`)).data
  let data = response.data
  if (response) {
    syllablesTotal.innerHTML = data.length
    for (let i=0; i < data.length; i++) {
      syllablesData.innerHTML += `<td>${data[i].text}</td>`
      if (data[i].type) {
      stress.innerHTML += `<td>${data[i].type}</td>`
      } else {
      stress.innerHTML += `<td></td>`
      }
    }
  }
}

// Definitions
const definitions = async(input) => {
  const wordsApi = {
    method: 'GET',
    url: `https://wordsapiv1.p.rapidapi.com/words/${input}`,
    headers: {
      'X-RapidAPI-Key': config.wordsapi_key,
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  }
  const response = await axios.request(wordsApi)
  let data = response.data.results
  if (response) {
    noDefinitions.style.display = 'none'
    for (let i=0; i < data.length; i++) {
      const definition = definitionsList.appendChild(document.createElement('li'))
      definition.innerHTML = `${data[i].definition} (<em>${data[i].partOfSpeech}</em>)`
      if (data[i].typeOf) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} is a type of:`
        for (let n=0; n < data[i].typeOf.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = data[i].typeOf[n]
        }
      }
      if (data[i].hasTypes) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} is has the following types:`
        for (let n=0; n < data[i].hasTypes.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = data[i].hasTypes[n]
        }
      }
      if (data[i].partOf) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} is a part of:`
        for (let n=0; n < data[i].partOf.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = data[i].partOf[n]
        }
      }
      if (data[i].hasParts) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} has these parts:`
        for (let n=0; n < data[i].hasParts.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = data[i].hasParts[n]
        }
      }
      if (data[i].instanceOf) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} is an instance of:`
        for (let n=0; n < data[i].instanceOf.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = data[i].instanceOf[n]
        }
      }
      if (data[i].hasInstances) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} has the following instances:`
        for (let n=0; n < data[i].hasInstances.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = data[i].hasInstances[n]
        }
      }
      if (data[i].memberOf) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} is a member of:`
        for (let n=0; n < data[i].memberOf.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = data[i].memberOf[n]
        }
      }
      if (data[i].hasMembers) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} has the following members:`
        for (let n=0; n < data[i].hasMembers.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = data[i].hasMembers[n]
        }
      }
      if (data[i].substanceOf) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} is a substance of:`
        for (let n=0; n < data[i].substanceOf.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = data[i].substanceOf[n]
        }
      }
      if (data[i].hasSubstances) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} has the following substances:`
        for (let n=0; n < data[i].hasSubstances.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = data[i].hasSubstances[n]
        }
      }
      if (data[i].inCategory) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} is a category of:`
        for (let n=0; n < data[i].inCategory.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = data[i].inCategory[n]
        }
      }
      if (data[i].hasCategories) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} has these categories:`
        for (let n=0; n < data[i].hasCategories.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = data[i].hasCategories[n]
        }
      }
    }
  }
}

// Frequency
const frequency = async(input) => {
  const wordsApi = {
    method: 'GET',
    url: `https://wordsapiv1.p.rapidapi.com/words/${input}`,
    headers: {
      'X-RapidAPI-Key': config.wordsapi_key,
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  }
  const response = await axios.request(wordsApi)
  const data = response.data.frequency
  if (response) {
    frequencyData.innerHTML = `${data}/10`
  }
}

// Phonetics
const phonetics = async(input) => {
  const linguaRobot = {
    method: 'GET',
    url: `https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${input}`,
    headers: {
      'X-RapidAPI-Key': config.lingua_key,
      'X-RapidAPI-Host': 'lingua-robot.p.rapidapi.com'
    }
  }
  const response = await axios.request(linguaRobot)
  const data = response.data.entries['0'].pronunciations
  if (response) {
    noPhonetics.style.display = 'none'
    for (let i=0; i < data.length; i++) {
      const phoneticsTable = phoneticsData.appendChild(document.createElement('tr'))
      phoneticsTable.innerHTML = `<td>${data[i].transcriptions[0].transcription}</td><td>${data[i].context.regions['0']}</td><td>${data[i].transcriptions[0].notation}</td>`
    }
  }
}

// Etymologies
const etymologies = async(input) => {
  let textInput = input.replace(/ /g, '%20')
  const response = await axios.get(`https://api.wordnik.com/v4/word.json/${textInput}/etymologies?useCanonical=false&api_key=${wordnikKey}`)
  const data = response.data[0]
  if (response) {
    etymologiesData.innerHTML = stripXMLTags(data)
  }
}

// Phrases
const phrases = async(input) => {
  let textInput = input.replace(/ /g, '%20')
  const response = await axios.get(`https://api.wordnik.com/v4/word.json/${textInput}/phrases?limit=5&useCanonical=false&api_key=${wordnikKey}`)
  const data = response.data
  if (response) {
    for (let i=0; i < data.length; i++) {
      phrasesData.innerHTML += `<li>${data[i].gram1} ${data[i].gram2}</li>`
      noPhrases.innerHTML = ''
    }
  }
}

// Related Words
const related = async(input) => {
  let textInput = input.replace(/ /g, '%20')
  const response = await axios.get(`https://api.wordnik.com/v4/word.json/${textInput}/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=${wordnikKey}`)
  const data = response.data
  if (response) {
    noRelated.innerHTML = ''
    for (let i=0; i < data.length; i++) {
      if (data[i].relationshipType === 'antonym') {
        relatedWords.innerHTML += `<dt>Antonyms</dt>`
        for (let n=0; n < data[i].words.length; n++) {
          relatedWords.innerHTML += `<dd>${data[i].words[n]}</dd>`
        }
      } else if (data[i].relationshipType === 'synonym') {
        relatedWords.innerHTML += `<dt>Synonyms</dt>`
        for (let n=0; n < data[i].words.length; n++) {
          relatedWords.innerHTML += `<dd>${data[i].words[n]}</dd>`
        }
      } else if (data[i].relationshipType === 'same-context') {
        relatedWords.innerHTML += `<dt>Words used in the same context</dt>`
        for (let n=0; n < data[i].words.length; n++) {
          relatedWords.innerHTML += `<dd>${data[i].words[n]}</dd>`
        }
      } else if (data[i].relationshipType === 'rhyme') {
        relatedWords.innerHTML += `<dt>Rhymes</dt>`
        for (let n=0; n < data[i].words.length; n++) {
          relatedWords.innerHTML += `<dd>${data[i].words[n]}</dd>`
        }
      }
    }
  }
}

// Randomly generated word
const random = async() => {
  const response = await fetch("/scrabblelist.json")
  const list = await response.json()
  const randomNumber = Math.floor(Math.random() * 198424)
  randomWord.innerText = list.words[randomNumber]
  const wordsApi = {
    method: 'GET',
    url: `https://wordsapiv1.p.rapidapi.com/words/${list.words[randomNumber]}`,
    headers: {
      'X-RapidAPI-Key': config.wordsapi_key,
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  }
  const definitionResponse = (await axios.request(wordsApi)).data.results
  randomDefinition.innerHTML = definitionResponse['0'].definition
}

// random()

// adapted from https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-224.php
const stripXMLTags = str => str.replace(/<[^>]*>/g, '').replace('[', '').replace(']','')

// Event Listeners

  // Search word event listener
submitButton.addEventListener('click', () => {
  const input = textInput.value.toLowerCase()

  // Reset all fields
  validScrabble.style.display = 'none'
  invalidScrabble.style.display = 'none'
  audio.style.display = 'none'
  mainDisplay.style.display = ''
  scoreDisplay.style.display = 'none'
  
  // random()

  // step 1. check if valid scrabble word
  validScrabbleWord(input)
  // step 2. scrabble anagram
  noAnagrams.style.display = ''
  removeChildNodes(anagrams)
  anagram(input)
  // step 3. pronounciation audio
  pronounciation(input)
  // step 4. syllables
  syllablesTotal.innerHTML = "No data available"
  syllablesData.innerHTML = ''
  stress.innerHTML = ''
  syllables(input)
  // step 5. frequency
  frequencyData.innerHTML = "No data available"
  frequency(input)
  // step 6. phonetics
  removeChildNodes(phoneticsData)
  noPhonetics.style.display = ''
  phonetics(input)
  // step 7. definitions
  removeChildNodes(definitionsList)
  noDefinitions.style.display = ''
  definitions(input)
  // step 8. Phrases
  noPhrases.innerHTML = `There are no phrases using "${input}"`
  removeChildNodes(phrasesData)
  phrases(input)
  // step 9. related words
  noRelated.innerHTML = `There are no words related to "${input}"`
  removeChildNodes(relatedWords)
  related(input)
  // step 10. etymologies
  etymologiesData.innerHTML = "No data available"
  etymologies(input)
})

// Random word event listener
randomWord.addEventListener('click', () => {
  let input = randomWord.innerText
  random()
  validScrabbleWord(input)
  noAnagrams.style.display = ''
  removeChildNodes(anagrams)
  anagram(input)
  pronounciation(input)
  syllablesTotal.innerHTML = "No data available"
  syllablesData.innerHTML = ''
  stress.innerHTML = ''
  syllables(input)
  frequencyData.innerHTML = "No data available"
  frequency(input)
  noPhonetics.style.display = ''
  removeChildNodes(phoneticsData)
  phonetics(input)
  noDefinitions.style.display = ''
  removeChildNodes(definitionsList)
  definitions(input)
  noPhrases.innerHTML = `There are no phrases using "${input}"`
  removeChildNodes(phrasesData)
  phrases(input)
  noRelated.innerHTML = `There are no words related to "${input}"`
  removeChildNodes(relatedWords)
  related(input)
  etymologiesData.innerHTML = "No data available"
  etymologies(input)
})

// Scrabble list event listener
for (let i=0; i < highScorers.length; i++) {
  highScorers[i].addEventListener('click', () => {
    let input = highScorers[i].innerText
    random()
    validScrabbleWord(input)
    removeChildNodes(anagrams)
    noAnagrams.style.display = ''
    anagram(input)
    pronounciation(input)
    syllablesTotal.innerHTML = "No data available"
    syllablesData.innerHTML = ''
    stress.innerHTML = ''
    syllables(input)
    frequencyData.innerHTML = "No data available"
    frequency(input)
    removeChildNodes(phoneticsData)
    noPhonetics.style.display = ''
    phonetics(input)
    removeChildNodes(definitionsList)
    noDefinitions.style.display = ''
    definitions(input)
    removeChildNodes(phrasesData)
    noPhrases.innerHTML = `There are no phrases using "${input}"`
    phrases(input)
    removeChildNodes(relatedWords)
    noRelated.innerHTML = `There are no words related to "${input}"`
    related(input)
    etymologiesData.innerHTML = "No data available"
    etymologies(input)
  })
}