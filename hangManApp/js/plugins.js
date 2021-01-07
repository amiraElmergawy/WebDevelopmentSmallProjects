let word = Array.from('wo'); //convert word that player one guessed to array
// console.log(word)
let wordLength = word.length; // save word length to compare it with itself every character guessing time
let lifeTimes = 6;
// let flag = false;
// let chars = Array.from('agufesingWord');
// let i = 0;
while (lifeTimes != 0 && wordLength != 0) {
    const char = prompt('Guess a character');
    for (let index = 0; index < word.length; index++) {
        const element = word[index]
        if (element == char) {// if the character is included by word
            word.splice(index, 1); // that will decrease word length
            index--; // as the array length will decrease by one
            // console.log(element, word);
        }
    }
    // i++;
    if (word.length == wordLength) { // the gussed char. isn't correct
        // decrease player two life times
        lifeTimes--;
        alert(lifeTimes);
    } else {
        // update wordLength var. for next comparison
        alert('good guessing');
        wordLength = word.length;
        if (wordLength != 0) alert(`just ${wordLength} guess to win`);
    }

}

if (wordLength == 0) {
    alert('Congratulations ^_^');
} else {
    alert('Sorry for your lose');
}



