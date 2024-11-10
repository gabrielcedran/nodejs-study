#!/usr/bin/env node

import defaultSum, { sum } from "./utils.js"

const note = process.argv[2]
const newNote = {
    content: note,
    id: Date.now() 
}

console.log(sum(1, 2))
console.log(defaultSum(2, 2))