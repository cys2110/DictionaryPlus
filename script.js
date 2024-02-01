// Global variables
const wordnikKey = config.wordnik_key
const searchBar = document.querySelector('#textInput')
const submitButton = document.querySelector('#submitButton')
const validScrabble = document.querySelector('#valid-word')
  validScrabble.style.display = 'none'
const invalidScrabble = document.querySelector('#invalid-word')
  invalidScrabble.style.display = 'none'
const audio = document.querySelector('#audio')
  audio.style.display = 'none'
const mainDisplay = document.querySelector('#outputs')
  mainDisplay.style.display = 'none'
const navBar = document.querySelector('#navbar')
  navBar.style.display = 'none'
const homepage = document.querySelector('#home')
const frequencyData = document.querySelector('#frequency')
const phoneticsData = document.querySelector('#phonetics')
const noPhonetics = document.querySelector('#no-phonetics')
  noPhonetics.style.display = ''
const phoneticsTable = document.querySelector('#phonetics-table')
  phoneticsTable.style.display = 'none'
const etymologiesData = document.querySelector('#etymologies')
const syllablesTotal = document.querySelector('#syllables-total')
const syllablesData = document.querySelector('#syllables')
const stress = document.querySelector('#stress')
const relatedWords = document.querySelector('#related-words')
const noRelated = document.querySelector('#no-related')
const relatedSection = document.querySelector('#related-words-section')
  const synonyms = document.querySelector('#synonyms')
    synonyms.style.display = 'none'
  const synonymsHeading = document.querySelector('#synonyms-heading')
  const antonyms = document.querySelector('#antonyms')
    antonyms.style.display = 'none'
  const antonymsHeading = document.querySelector('#antonyms-heading')
  const typeOf = document.querySelector('#type-of')
    typeOf.style.display = 'none'
  const typeOfHeading = document.querySelector('#type-of-heading')
  const hasTypes = document.querySelector('#has-types')
    hasTypes.style.display = 'none'
  const hasTypesHeading = document.querySelector('#has-types-heading')
  const partOf = document.querySelector('#part-of')
    partOf.style.display = 'none'
  const partOfHeading = document.querySelector('#part-of-heading')
  const hasParts = document.querySelector('#has-parts')
    hasParts.style.display = 'none'
  const hasPartsHeading = document.querySelector('#has-parts-heading')
  const instanceOf = document.querySelector('#instance-of')
    instanceOf.style.display = 'none'
  const instanceOfHeading = document.querySelector('#instance-of-heading')
  const hasInstances = document.querySelector('#has-instances')
    hasInstances.style.display = 'none'
  const hasInstancesHeading = document.querySelector('#has-instances-heading')
  const similarTo = document.querySelector('#similar-to')
    similarTo.style.display = 'none'
  const similarToHeading = document.querySelector('#similar-to-heading')
  const also = document.querySelector('#also')
    also.style.display = 'none'
  const alsoHeading = document.querySelector('#also-heading')
  const entails = document.querySelector('#entails')
    entails.style.display = 'none'
  const entailsHeading = document.querySelector('#entails-heading')
  const memberOf = document.querySelector('#member-of')
    memberOf.style.display = 'none'
  const memberOfHeading = document.querySelector('#member-of-heading')
  const hasMembers = document.querySelector('#has-members')
    hasMembers.style.display = 'none'
  const hasMembersHeading = document.querySelector('#has-members-heading')
  const substanceOf = document.querySelector('#substance-of')
    substanceOf.style.display = 'none'
  const substanceOfHeading = document.querySelector('#substance-of-heading')
  const hasSubstances = document.querySelector('#has-substances')
    hasSubstances.style.display = 'none'
  const hasSubstancesHeading = document.querySelector('#has-substances-heading')
  const inCategory = document.querySelector('#in-category')
    inCategory.style.display = 'none'
  const inCategoryHeading = document.querySelector('#in-category-heading')
  const hasCategories = document.querySelector('#has-categories')
    hasCategories.style.display = 'none'
  const hasCategoriesHeading = document.querySelector('#has-categories-heading')
  const usageOf = document.querySelector('#usage-of')
    usageOf.style.display = 'none'
  const usageOfHeading = document.querySelector('#usage-of-heading')
  const hasUsages = document.querySelector('#has-usages')
    hasUsages.style.display = 'none'
  const hasUsagesHeading = document.querySelector('#has-usages-heading')
  const inRegion = document.querySelector('#in-region')
    inRegion.style.display = 'none'
  const inRegionHeading = document.querySelector('#in-region-heading')
  const regionOf = document.querySelector('#region-of')
    regionOf.style.display = 'none'
  const regionOfHeading = document.querySelector('#region-of-heading')
  const pertainsTo = document.querySelector('#pertains-to')
    pertainsTo.style.display = 'none'
  const pertainsToHeading = document.querySelector('#pertains-to-heading')
  const rhymes = document.querySelector('#rhymes')
    rhymes.style.display = 'none'
  const rhymesHeading = document.querySelector('#rhymes-heading')
const definitionsList = document.querySelector('#definitions')
const noDefinitions = document.querySelector('#no-definitions')
  noDefinitions.style.display = ''
const crosswordHeading = document.querySelector('#crossword-heading')
const crosswords = document.querySelector('#crossword')

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
const fn = document.querySelector('#footnotes')
  fn.style.display = 'none'
const fnDivider = document.querySelector('#fn-divider')
  fnDivider.style.display = 'none'

// Dark mode
const body = document.querySelector('body')
const darkModeButton = document.querySelector('#dark-mode-button')
  darkModeButton.style.display = ''
const lightModeButton = document.querySelector('#light-mode-button')
  lightModeButton.style.display = 'none'
const footnotes = document.querySelectorAll('.footnotes')

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
  const wordsApi = {
    method: 'GET',
    url: `https://wordsapiv1.p.rapidapi.com/words/${input}`,
    headers: {
      'X-RapidAPI-Key': config.wordsapi_key,
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  }
  const response = await axios.request(wordsApi)
  const data = response.data.syllables
  syllablesTotal.innerHTML = `${input.toUpperCase()} has ${data.count} syllables`
  for (let i=0; i < data.list.length; i++) {
    syllablesData.innerHTML += `${data.list[i]}-`
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
      if (data[i].examples) {
        for (let n=0; n < data[i].examples.length; n++) {
          const details = definition.appendChild(document.createElement('dd'))
          details.innerHTML = `${data[i].examples[n].charAt(0).toUpperCase()}${data[i].examples[n].slice(1)}.`
        }
      }
    }
  }
}

// Crossword
const crossword = async(input) => {
  const scrabbleInput = input.toUpperCase().replace(/ /g, '')
  const response = await fetch("/crossword.json")
  const list = await response.json()
  if (list[scrabbleInput]) {
    for (let i=0; i < list[scrabbleInput].length; i++) {
      let clue = crosswords.appendChild(document.createElement('li'))
      clue.innerText += list[scrabbleInput][i]
    }
  } else {
    crosswordHeading.innerHTML = `No crossword clues related to ${scrabbleInput}`
  } 
}

// Frequency
const frequency = async(input) => {
  const wordsApi = {
    method: 'GET',
    url: `https://wordsapiv1.p.rapidapi.com/words/${input}/frequency`,
    headers: {
      'X-RapidAPI-Key': config.wordsapi_key,
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  }
  const response = await axios.request(wordsApi)
  const data = response.data.frequency
  if (response) {
    const zipfHeading = frequencyData.appendChild(document.createElement('dt'))
    const zipf = frequencyData.appendChild(document.createElement('dd'))
    const perMillionHeading = frequencyData.appendChild(document.createElement('dt'))
    const perMillion = frequencyData.appendChild(document.createElement('dd'))
    const diversityHeading = frequencyData.appendChild(document.createElement('dt'))
    const diversity = frequencyData.appendChild(document.createElement('dd'))
    zipfHeading.innerHTML = "Zipf"
    zipf.innerHTML = data.zipf
    perMillionHeading.innerHTML = "Per Million"
    perMillion.innerHTML = data.perMillion
    diversityHeading.innerHTML = "Diversity"
    diversity.innerHTML = data.diversity
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
    phoneticsTable.style.display = ''
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
  const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${textInput}`)
  const data = response.data[0].origin
  if (response) {
    etymologiesData.innerHTML = data
  }
}

// Related Words
const related = async(input) => {
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
  for (let i=0; i < data.length; i++) {
    if (data[i].synonyms) {
      noRelated.style.display = 'none'
      synonyms.style.display = ''
      synonymsHeading.innerHTML = `Synonyms of "${input.toUpperCase()}"`
      for (let n=0; n < data[i].synonyms.length; n++) {
        const details = synonyms.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].synonyms[n]
      }
    }
    if (data[i].antonyms) {
      noRelated.style.display = 'none'
      antonyms.style.display = ''
      antonymsHeading.innerHTML = `Antonyms of "${input.toUpperCase()}"`
      for (let n=0; n < data[i].antonyms.length; n++) {
        const details = antonyms.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].antonyms[n]
      }
    }
    if (data[i].typeOf) {
      noRelated.style.display = 'none'
      typeOf.style.display = ''
      typeOfHeading.innerHTML = `Hypernyms of "${input.toUpperCase()}"`
      for (let n=0; n < data[i].typeOf.length; n++) {
        const details = typeOf.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].typeOf[n]
      }
    }
    if (data[i].hasTypes) {
      noRelated.style.display = 'none'
      hasTypes.style.display = ''
      hasTypesHeading.innerHTML = `Hyponyms of "${input.toUpperCase()}"`
      for (let n=0; n < data[i].hasTypes.length; n++) {
        const details = hasTypes.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].hasTypes[n]
      }
    }
    if (data[i].partOf) {
      noRelated.style.display = 'none'
      partOfHeading.style.display = ''
      partOf.innerHTML = `Holonyms of "${input.toUpperCase()}"`
      for (let n=0; n < data[i].partOf.length; n++) {
        const details = partOf.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].partOf[n]
      }
    }
    if (data[i].hasParts) {
      noRelated.style.display = 'none'
      hasParts.style.display = ''
      hasPartsHeading.innerHTML = `Meronyms of "${input.toUpperCase()}"`
      for (let n=0; n < data[i].hasParts.length; n++) {
        const details = hasParts.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].hasParts[n]
      }
    }
    if (data[i].instanceOf) {
      noRelated.style.display = 'none'
      instanceOf.style.display = ''
      instanceOfHeading.innerHTML = `"${input.toUpperCase()}" is an example of:`
      for (let n=0; n < data[i].instanceOf.length; n++) {
        const details = instanceOf.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].instanceOf[n]
      }
    }
    if (data[i].hasInstances) {
      noRelated.style.display = 'none'
      hasInstances.style.display = ''
      hasInstancesHeading.innerHTML = `Examples of "${input.toUpperCase()}"`
      for (let n=0; n < data[i].hasInstances.length; n++) {
        const details = hasInstances.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].hasInstances[n]
      }
    }
    if (data[i].similarTo) {
      noRelated.style.display = 'none'
      similarTo.style.display = ''
      similarToHeading.innerHTML = `"${input.toUpperCase()}" is similar to:`
      for (let n=0; n < data[i].similarTo.length; n++) {
        const details = similarTo.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].similarTo[n]
      }
    }
    if (data[i].also) {
      noRelated.style.display = 'none'
      also.style.display = ''
      alsoHeading.innerHTML = `Phrases to which "${input.toUpperCase()}" belongs`
      for (let n=0; n < data[i].also.length; n++) {
        const details = also.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].also[n]
      }
    }
    if (data[i].entails) {
      noRelated.style.display = 'none'
      entails.style.display = ''
      entailsHeading.innerHTML = `Words implied by "${input.toUpperCase()}"`
      for (let n=0; n < data[i].entails.length; n++) {
        const details = entails.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].entails[n]
      }
    }
    if (data[i].memberOf) {
      noRelated.style.display = 'none'
      memberOf.style.display = ''
      memberOfHeading.innerHTML = `"${input.toUpperCase()}" is a member of:`
      for (let n=0; n < data[i].memberOf.length; n++) {
        const details = memberOf.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].memberOf[n]
      }
    }
    if (data[i].hasMembers) {
      noRelated.style.display = 'none'
      hasMembers.style.display = ''
      hasMembersHeading.innerHTML = `"${input.toUpperCase()}" has the following members:`
      for (let n=0; n < data[i].hasMembers.length; n++) {
        const details = hasMembers.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].hasMembers[n]
      }
    }
    if (data[i].substanceOf) {
      noRelated.style.display = 'none'
      substanceOf.style.display = ''
      substanceOfHeading.innerHTML = `"${input.toUpperCase()}" is a substance of:`
      for (let n=0; n < data[i].substanceOf.length; n++) {
        const details = substanceOf.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].substanceOf[n]
      }
    }
    if (data[i].hasSubstances) {
      noRelated.style.display = 'none'
      hasSubstances.style.display = ''
      hasSubstancesHeading.innerHTML = `Substances that are part of "${input.toUpperCase()}":`
      for (let n=0; n < data[i].hasSubstances.length; n++) {
        const details = hasSubstances.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].hasSubstances[n]
      }
    }
    if (data[i].inCategory) {
      noRelated.style.display = 'none'
      inCategory.style.display = ''
      inCategoryHeading.innerHTML = `"${input.toUpperCase()}" is a category of:`
      for (let n=0; n < data[i].inCategory.length; n++) {
        const details = inCategory.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].inCategory[n]
      }
    }
    if (data[i].hasCategories) {
      noRelated.style.display = 'none'
      hasCategories.style.display = ''
      hasCategoriesHeading.innerHTML = `Categories of "${input.toUpperCase()}":`
      for (let n=0; n < data[i].hasCategories.length; n++) {
        const details = hasCategories.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].hasCategories[n]
      }
    }
    if (data[i].usageOf) {
      noRelated.style.display = 'none'
      usageOf.style.display = ''
      usageOfHeading.innerHTML = `"${input.toUpperCase()}" is a domain usage of:`
      for (let n=0; n < data[i].usageOf.length; n++) {
        const details = usageOf.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].usageOf[n]
      }
    }
    if (data[i].hasUsages) {
      noRelated.style.display = 'none'
      hasUsages.style.display = ''
      hasUsagesHeading.innerHTML = `"${input.toUpperCase()}" has the following usages:`
      for (let n=0; n < data[i].hasUsages.length; n++) {
        const details = hasUsages.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].hasUsages[n]
      }
    }
    if (data[i].inRegion) {
      noRelated.style.display = 'none'
      inRegion.style.display = ''
      inRegionHeading.innerHTML = `"${input.toUpperCase()}" is used in these regions:`
      for (let n=0; n < data[i].inRegion.length; n++) {
        const details = inRegion.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].inRegion[n]
      }
    }
    if (data[i].regionOf) {
      noRelated.style.display = 'none'
      regionOf.style.display = ''
      regionOfHeading.innerHTML = `"${input.toUpperCase()}" is a region where these words are used:`
      for (let n=0; n < data[i].regionOf.length; n++) {
        const details = regionOf.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].regionOf[n]
      }
    }
    if (data[i].pertainsTo) {
      noRelated.style.display = 'none'
      pertainsTo.style.display = ''
      pertainsToHeading.innerHTML = `"${input.toUpperCase()}" is relevant to these words`
      for (let n=0; n < data[i].pertainsTo.length; n++) {
        const details = pertainsTo.appendChild(document.createElement('dd'))
        details.innerHTML += data[i].pertainsTo[n]
      }
    }
  }
  const wordsApiRhymes = {
    method: 'GET',
    url: `https://wordsapiv1.p.rapidapi.com/words/${input}/rhymes`,
    headers: {
      'X-RapidAPI-Key': config.wordsapi_key,
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  }
  const rhymesApi = await axios.request(wordsApiRhymes)
  let rhymesData = rhymesApi.data.rhymes.all
  if (rhymesData) {
    noRelated.style.display = 'none'
    rhymes.style.display = ''
    rhymesHeading.innerHTML = `${input.toUpperCase()} rhymes with:`
    for (let i=0; i < rhymesData.length; i++) {
      const details = rhymes.appendChild(document.createElement('dd'))
      details.innerHTML += rhymesData[i]
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

// Event Listeners

  // Search word event listener
submitButton.addEventListener('click', () => {
  const input = searchBar.value.toLowerCase()

  // Reset all fields
  validScrabble.style.display = 'none'
  invalidScrabble.style.display = 'none'
  audio.style.display = 'none'
  mainDisplay.style.display = ''
  scoreDisplay.style.display = 'none'
  homepage.style.display = 'none'
  phoneticsTable.style.display = 'none'
  navBar.style.display = ''
  fnDivider.style.display = ''
  fn.style.display = ''
  
  // random()

  // step 1. check if valid scrabble word
  validScrabbleWord(input)
  // step 3. pronounciation audio
  pronounciation(input)
  // step 4. syllables
  syllablesTotal.innerHTML = "No data available"
  syllablesData.innerHTML = '-'
  syllables(input)
  // step 5. frequency
  removeChildNodes(frequencyData)
  frequency(input)
  // step 6. phonetics
  removeChildNodes(phoneticsData)
  noPhonetics.style.display = ''
  phonetics(input)
  // step 7. definitions
  removeChildNodes(definitionsList)
  noDefinitions.style.display = ''
  definitions(input)
  // step 9. related words
  noRelated.innerHTML = `There are no words related to "${input}"`
  synonyms.style.display = 'none'
  antonyms.style.display = 'none'
  rhymes.style.display = 'none'
  typeOf.style.display = 'none'
  hasTypes.style.display = 'none'
  partOf.style.display = 'none'
  hasParts.style.display = 'none'
  instanceOf.style.display = 'none'
  hasInstances.style.display = 'none'
  similarTo.style.display = 'none'
  also.style.display = 'none'
  entails.style.display = 'none'
  memberOf.style.display = 'none'
  hasMembers.style.display = 'none'
  substanceOf.style.display = 'none'
  hasSubstances.style.display = 'none'
  inCategory.style.display = 'none'
  hasCategories.style.display = 'none'
  usageOf.style.display = 'none'
  hasUsages.style.display = 'none'
  inRegion.style.display = 'none'
  regionOf.style.display = 'none'
  pertainsTo.style.display = 'none'
  related(input)
  // step 10. etymologies
  etymologiesData.innerHTML = "No data available"
  etymologies(input)
  // step 11. crossword
  crosswordHeading.innerHTML = `Crossword Clues Related to ${input.toUpperCase().replace(/ /g, '')}`
  crossword(input)
})

// adpted from https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
searchBar.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    submitButton.click()
  }
})

// Random word event listener
randomWord.addEventListener('click', () => {
  let input = randomWord.innerText
  searchBar.value = randomWord.innerText
  // Reset all fields
  validScrabble.style.display = 'none'
  invalidScrabble.style.display = 'none'
  audio.style.display = 'none'
  mainDisplay.style.display = ''
  scoreDisplay.style.display = 'none'
  homepage.style.display = 'none'
  phoneticsTable.style.display = 'none'
  navBar.style.display = ''
  fnDivider.style.display = ''
  fn.style.display = ''
  
  // random()

  // step 1. check if valid scrabble word
  validScrabbleWord(input)
  // step 3. pronounciation audio
  pronounciation(input)
  // step 4. syllables
  syllablesTotal.innerHTML = "No data available"
  syllablesData.innerHTML = '-'
  syllables(input)
  // step 5. frequency
  removeChildNodes(frequencyData)
  frequency(input)
  // step 6. phonetics
  removeChildNodes(phoneticsData)
  noPhonetics.style.display = ''
  phonetics(input)
  // step 7. definitions
  removeChildNodes(definitionsList)
  noDefinitions.style.display = ''
  definitions(input)
  // step 9. related words
  noRelated.innerHTML = `There are no words related to "${input}"`
  synonyms.style.display = 'none'
  antonyms.style.display = 'none'
  rhymes.style.display = 'none'
  typeOf.style.display = 'none'
  hasTypes.style.display = 'none'
  partOf.style.display = 'none'
  hasParts.style.display = 'none'
  instanceOf.style.display = 'none'
  hasInstances.style.display = 'none'
  similarTo.style.display = 'none'
  also.style.display = 'none'
  entails.style.display = 'none'
  memberOf.style.display = 'none'
  hasMembers.style.display = 'none'
  substanceOf.style.display = 'none'
  hasSubstances.style.display = 'none'
  inCategory.style.display = 'none'
  hasCategories.style.display = 'none'
  usageOf.style.display = 'none'
  hasUsages.style.display = 'none'
  inRegion.style.display = 'none'
  regionOf.style.display = 'none'
  pertainsTo.style.display = 'none'
  related(input)
  // step 10. etymologies
  etymologiesData.innerHTML = "No data available"
  etymologies(input)

  // step 11. crossword
  crosswordHeading.innerHTML = `Crossword Clues Related to ${input.toUpperCase().replace(/ /g, '')}`
  crossword(input)
})

// Scrabble list event listener
for (let i=0; i < highScorers.length; i++) {
  highScorers[i].addEventListener('click', () => {
    let input = highScorers[i].innerText
    searchBar.value = highScorers[i].innerText
    // Reset all fields
  validScrabble.style.display = 'none'
  invalidScrabble.style.display = 'none'
  audio.style.display = 'none'
  mainDisplay.style.display = ''
  scoreDisplay.style.display = 'none'
  homepage.style.display = 'none'
  phoneticsTable.style.display = 'none'
  navBar.style.display = ''
  fnDivider.style.display = ''
  fn.style.display = ''
  
  // random()

  // step 1. check if valid scrabble word
  validScrabbleWord(input)
  // step 3. pronounciation audio
  pronounciation(input)
  // step 4. syllables
  syllablesTotal.innerHTML = "No data available"
  syllablesData.innerHTML = '-'
  syllables(input)
  // step 5. frequency
  removeChildNodes(frequencyData)
  frequency(input)
  // step 6. phonetics
  removeChildNodes(phoneticsData)
  noPhonetics.style.display = ''
  phonetics(input)
  // step 7. definitions
  removeChildNodes(definitionsList)
  noDefinitions.style.display = ''
  definitions(input)
  // step 9. related words
  noRelated.innerHTML = `There are no words related to "${input}"`
  synonyms.style.display = 'none'
  antonyms.style.display = 'none'
  rhymes.style.display = 'none'
  typeOf.style.display = 'none'
  hasTypes.style.display = 'none'
  partOf.style.display = 'none'
  hasParts.style.display = 'none'
  instanceOf.style.display = 'none'
  hasInstances.style.display = 'none'
  similarTo.style.display = 'none'
  also.style.display = 'none'
  entails.style.display = 'none'
  memberOf.style.display = 'none'
  hasMembers.style.display = 'none'
  substanceOf.style.display = 'none'
  hasSubstances.style.display = 'none'
  inCategory.style.display = 'none'
  hasCategories.style.display = 'none'
  usageOf.style.display = 'none'
  hasUsages.style.display = 'none'
  inRegion.style.display = 'none'
  regionOf.style.display = 'none'
  pertainsTo.style.display = 'none'
  related(input)
  // step 10. etymologies
  etymologiesData.innerHTML = "No data available"
  etymologies(input)

  // step 11. crossword
  crosswordHeading.innerHTML = `Crossword Clues Related to ${input.toUpperCase().replace(/ /g, '')}`
  crossword(input)
  })
}

// Dark mode
darkModeButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode')
  darkModeButton.style.display = 'none'
  lightModeButton.style.display = ''
  randomWord.classList.toggle('dark-mode-h4')
  audio.classList.toggle('dark-mode-h4')
  for (let i=0; i < footnotes.length; i++) {
    footnotes[i].classList.toggle('dark-mode-h4')
  }
})

lightModeButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode')
  lightModeButton.style.display = 'none'
  darkModeButton.style.display = ''
  randomWord.classList.toggle('dark-mode-h4')
  audio.classList.toggle('dark-mode-h4')
  for (let i=0; i < footnotes.length; i++) {
    footnotes[i].classList.toggle('dark-mode-h4')
  }
})