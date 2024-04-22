<script setup>
import { onMounted, ref } from 'vue';
import { words } from './data/scrabblelist.json'
import values from './data/scrabblevalues.json'

const searchTerm = ref(null)
const valid = ref(null)
const value = ref(null)
const anagrams = ref([])
const wordArray = ref(null)

const getAllAnagrams = (str, prefix = '', anagrams = []) => {
    if (str.length <= 1) {
        anagrams.push(prefix + str)
    } else {
        for (let i = 0; i < str.length; i++) {
            const current = str.substring(i, i + 1)
            const before = str.substring(0, i)
            const after = str.substring(i + 1)
            getAllAnagrams(before + after, prefix + current, anagrams)
        }
    }
    return anagrams;
}

const searchWord = () => {
  wordArray.value = searchTerm.value.split('')
  valid.value = words.includes(searchTerm.value)
  value.value = searchTerm.value.split('').reduce((acc, char) => acc + values[char], 0)
  const anagramList = getAllAnagrams(searchTerm.value)
  anagrams.value = words.filter(word => anagramList.includes(word))
}

const submitSearch = () => {
  searchWord()
}

onMounted(() => {
  const randomNumber = Math.floor(Math.random() * 198422)
  searchTerm.value = words[randomNumber]
  searchWord()
})
</script>

<template>
  <div class="flex-column items-center justify-center">
    <div class="text-center">
      <div class="text-2xl font-bold m-3">SCRABBLE HELPER</div>
      <form @submit.prevent="submitSearch" class="m-2">
          <input class="text-black" v-model="searchTerm" placeholder="Search word" />
      </form>
    </div>
    <div class="text-center">This is a <span v-if="valid" class="text-green-400">VALID</span><span v-else-if="!valid" class="text-red-500">INVALID</span> word worth <span class="font-bold">{{ value }}</span> points.</div>
    <div class="text-center my-1">
        <div class="flex flex-nowrap my-1">
          <div>Valid Scrabble words using</div>
          <div class="flex-row mx-0.5 bg-orange-200 text-black h-15 w-10 rounded-md text-center" v-for="letter in wordArray" :key="letter">{{ letter }}</div>
        </div>
        <div>
            <div v-for="anagram in anagrams" :key="anagram">{{ anagram }}</div>
        </div>
    </div>
  </div>
</template>