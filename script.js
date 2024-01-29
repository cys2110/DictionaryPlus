// Global variables
const wordnikKey = 'mfyk32l6c0oquaq1pkq4f7ebzzqmqze47brhyp47eo0ouhxya'
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
const anagrams = document.querySelector('#anagram')

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
    if (scrabbleSplit.length <= inputSplit.length && isSubset(inputSplit, scrabbleSplit)) {
      let anagramList = anagrams.appendChild(document.createElement('li'))
      anagramList.innerText += `${list.words[i]}`
    } else {
      let anagramList = anagrams.appendChild(document.createElement('li'))
      anagramList.innerText += `No Scrabble words can be made from these letters.`
    }
  }
}

// adapted from https://dev.to/smpnjn/javascript-check-if-an-array-is-a-subset-of-another-array-950
const isSubset = (array1, array2) =>
  array1.every((element) => array2.includes(element))

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
  if (response) {
    syllablesTotal.innerHTML = response.length
    for (let i=0; i < response.length; i++) {
      syllablesData.innerHTML += `<td>${response[i].text}</td>`
      if (response[i].type) {
      stress.innerHTML += `<td>${response[i].type}</td>`
      } else {
      stress.innerHTML += `<td></td>`
      }
    }
  } else {
    syllablesTotal.innerHTML = "No data available"
  }
  
}

// Definitions
const definitions = async(input) => {
  const wordsApi = {
    method: 'GET',
    url: `https://wordsapiv1.p.rapidapi.com/words/${input}`,
    headers: {
      'X-RapidAPI-Key': '02ee9aebffmsha05ba54c052ea01p1ea797jsned96038e11b8',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  }
  const response = (await axios.request(wordsApi)).data.results
  if (response) {
    for (let i=0; i < response.length; i++) {
      const definition = definitionsList.appendChild(document.createElement('li'))
      definition.innerHTML = `${response[i].definition} (<em>${response[i].partOfSpeech}</em>)`
      if (response[i].typeOf) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} is a type of:`
        for (let n=0; n < response[i].typeOf.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = response[i].typeOf[n]
        }
      }
      if (response[i].hasTypes) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} is has the following types:`
        for (let n=0; n < response[i].hasTypes.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = response[i].hasTypes[n]
        }
      }
      if (response[i].partOf) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} is a part of:`
        for (let n=0; n < response[i].partOf.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = response[i].partOf[n]
        }
      }
      if (response[i].hasParts) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} has these parts:`
        for (let n=0; n < response[i].hasParts.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = response[i].hasParts[n]
        }
      }
      if (response[i].instanceOf) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} is an instance of:`
        for (let n=0; n < response[i].instanceOf.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = response[i].instanceOf[n]
        }
      }
      if (response[i].hasInstances) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} has the following instances:`
        for (let n=0; n < response[i].hasInstances.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = response[i].hasInstances[n]
        }
      }
      if (response[i].memberOf) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} is a member of:`
        for (let n=0; n < response[i].memberOf.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = response[i].memberOf[n]
        }
      }
      if (response[i].hasMembers) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} has the following members:`
        for (let n=0; n < response[i].hasMembers.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = response[i].hasMembers[n]
        }
      }
      if (response[i].substanceOf) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} is a substance of:`
        for (let n=0; n < response[i].substanceOf.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = response[i].substanceOf[n]
        }
      }
      if (response[i].hasSubstances) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} has the following substances:`
        for (let n=0; n < response[i].hasSubstances.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = response[i].hasSubstances[n]
        }
      }
      if (response[i].inCategory) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} is a category of:`
        for (let n=0; n < response[i].inCategory.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = response[i].inCategory[n]
        }
      }
      if (response[i].hasCategories) {
        const collapsible = definitionsList.appendChild(document.createElement('details'))
        const summary = collapsible.appendChild(document.createElement('summary'))
        summary.innerHTML = `${input} has these categories:`
        for (let n=0; n < response[i].hasCategories.length; n++) {
          const details = collapsible.appendChild(document.createElement('dd'))
          details.innerHTML = response[i].hasCategories[n]
        }
      }
    }
  } else {
    noDefinitions.innerText = "No definitions available"
  }
}

// Frequency
const frequency = async(input) => {
  const wordsApi = {
    method: 'GET',
    url: `https://wordsapiv1.p.rapidapi.com/words/${input}`,
    headers: {
      'X-RapidAPI-Key': '02ee9aebffmsha05ba54c052ea01p1ea797jsned96038e11b8',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  }
  const response = (await axios.request(wordsApi)).data.frequency
  if (response) {
    frequencyData.innerHTML = `${response}/10`
  } else {
    frequencyData.innerHTML = "No data available"
  }
}

// Phonetics
const phonetics = async(input) => {
  const linguaRobot = {
    method: 'GET',
    url: `https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${input}`,
    headers: {
      'X-RapidAPI-Key': '02ee9aebffmsha05ba54c052ea01p1ea797jsned96038e11b8',
      'X-RapidAPI-Host': 'lingua-robot.p.rapidapi.com'
    }
  }
  const response = (await axios.request(linguaRobot)).data.entries['0'].pronunciations
  if (response) {
    for (let i=0; i < response.length; i++) {
      const phoneticsTable = phoneticsData.appendChild(document.createElement('tr'))
      phoneticsTable.innerHTML = `<td>${response[i].transcriptions[0].transcription}</td><td>${response[i].context.regions['0']}</td><td>${response[i].transcriptions[0].notation}</td>`
    }
  } else {
    noPhonetics.innerText = "No data available"
  } 
}

// Etymologies
const etymologies = async(input) => {
  let textInput = input.replace(/ /g, '%20')
  const response = (await axios.get(`https://api.wordnik.com/v4/word.json/${textInput}/etymologies?useCanonical=false&api_key=${wordnikKey}`)).data[0]
  if (response) {
    etymologiesData.innerHTML = stripXMLTags(response)
  } else {
    etymologiesData.innerHTML = "No data available"
  }
}

// Phrases
const phrases = async(input) => {
  let textInput = input.replace(/ /g, '%20')
  const response = (await axios.get(`https://api.wordnik.com/v4/word.json/${textInput}/phrases?limit=5&useCanonical=false&api_key=${wordnikKey}`)).data
  if (response) {
    for (let i=0; i < response.length; i++) {
      phrasesData.innerHTML += `<li>${response[i].gram1} ${response[i].gram2}</li>`
    }
  } else {
    noPhrases.innerHTML = `There are no phrases using ${input}`
  } 
}

// Related Words
const related = async(input) => {
  let textInput = input.replace(/ /g, '%20')
  const response = (await axios.get(`https://api.wordnik.com/v4/word.json/${textInput}/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=${wordnikKey}
  `)).data
  if (response) {
    for (let i=0; i < response.length; i++) {
      if (response[i].relationshipType === 'antonym') {
        relatedWords.innerHTML += `<dt>Antonyms</dt>`
        for (let n=0; n < response[i].words.length; n++) {
          relatedWords.innerHTML += `<dd>${response[i].words[n]}</dd>`
        }
      } else if (response[i].relationshipType === 'synonym') {
        relatedWords.innerHTML += `<dt>Synonyms</dt>`
        for (let n=0; n < response[i].words.length; n++) {
          relatedWords.innerHTML += `<dd>${response[i].words[n]}</dd>`
        }
      } else if (response[i].relationshipType === 'same-context') {
        relatedWords.innerHTML += `<dt>Words used in the same context</dt>`
        for (let n=0; n < response[i].words.length; n++) {
          relatedWords.innerHTML += `<dd>${response[i].words[n]}</dd>`
        }
      } else if (response[i].relationshipType === 'rhyme') {
        relatedWords.innerHTML += `<dt>Rhymes</dt>`
        for (let n=0; n < response[i].words.length; n++) {
          relatedWords.innerHTML += `<dd>${response[i].words[n]}</dd>`
        }
      }
    }
  } else {
    noRelated.innerText = `There are no words related to ${input}`
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
      'X-RapidAPI-Key': '02ee9aebffmsha05ba54c052ea01p1ea797jsned96038e11b8',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  }
  const definitionResponse = (await axios.request(wordsApi)).data.results
  randomDefinition.innerHTML = definitionResponse[0].definition
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
  removeChildNodes(anagrams)
  anagram(input)
  // step 3. pronounciation audio
  // pronounciation(input)
  // step 4. syllables
  // syllables(input)
  // step 5. frequency
  // frequency(input)
  // step 6. phonetics
  // removeChildNodes(phoneticsData)
  // phonetics(input)
  // step 7. definitions
  // removeChildNodes(definitionsList)
  // definitions(input)
  // step 8. Phrases
  // removeChildNodes(phrasesData)
  // phrases(input)
  // step 9. related words
  // removeChildNodes(relatedWords)
  // related(input)
  // step 10. etymologies
  // etymologies(input)
})

// Random word event listener
// randomWord.addEventListener('click', () => {
//   let input = randomWord.innerText
//   random()
//   validScrabbleWord(input)
//   removeChildNodes(anagrams)
//   anagram(input)
//   pronounciation(input)
//   syllables(input)
//   frequency(input)
//   removeChildNodes(phoneticsData)
//   phonetics(input)
//   removeChildNodes(definitionsList)
//   definitions(input)
//   removeChildNodes(phrasesData)
//   phrases(input)
//   removeChildNodes(relatedWords)
//   related(input)
//   etymologies(input)
// })

// Scrabble list event listener
// for (let i=0; i < highScorers.length; i++) {
//   highScorers[i].addEventListener('click', () => {
//     let input = highScorers[i].innerText
//     random()
//     validScrabbleWord(input)
//     removeChildNodes(anagrams)
//     anagram(input)
//     pronounciation(input)
//     syllables(input)
//     frequency(input)
//     removeChildNodes(phoneticsData)
//     phonetics(input)
//     removeChildNodes(definitionsList)
//     definitions(input)
//     removeChildNodes(phrasesData)
//     phrases(input)
//     removeChildNodes(relatedWords)
//     related(input)
//     etymologies(input)
//   })
// }