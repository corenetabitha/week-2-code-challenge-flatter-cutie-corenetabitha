document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000/characters";

    const characterBar = document.getElementById("character-bar");
    const characterName = document.getElementById("name");
    const characterImage = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");
    const voteForm = document.getElementById("votes-form");
    const voteInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");

    // Fetch characters and populate the character bar
    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.style.cursor = "pointer";
                span.addEventListener("click", () => displayCharacter(character));
                characterBar.appendChild(span); // Append inside loop
            });

            if (data.length > 0) {
                displayCharacter(data[0]); // Show first character
            }
        });

    // Function to display selected character details
    function displayCharacter(character) {
        characterName.textContent = character.name;
        characterImage.src = character.image;
        voteCount.textContent = character.votes;
    }

    // Add votes after submission
    voteForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const votesToAdd = parseInt(voteInput.value) || 0;
        const currentVotes = parseInt(voteCount.textContent);
        voteCount.textContent = currentVotes + votesToAdd;
        voteInput.value = "";
    });

    // Reset vote count
    resetButton.addEventListener("click", () => {
        voteCount.textContent = "0";
    });
});
