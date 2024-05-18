function modifyTitle(title, maxCharacters) {
    maxCharacters = 30
    let newTitle = "";
    let charCount = 0;

    // Split the title into words
    let words = title.split(" ");

    // Iterate through each word
    words.forEach(word => {
        // If adding the word and a space exceeds the maximum character count
        if (charCount + word.length + 1 > maxCharacters) {
            // Add a line break and reset the character count
            newTitle += "<br>";
            charCount = 0;
        }

        // Add the word and a space to the new title
        newTitle += word + " ";
        // Update the character count
        charCount += word.length + 1;
    });

    // Remove the trailing space from the new title
    newTitle = newTitle.trim();

    return newTitle;
}

// Test the function
let originalTitle = "Kaguya-sama wa Kokurasetai: Ultra Romantic";
let modifiedTitle = insertLineBreaks(originalTitle);
console.log(modifiedTitle);



