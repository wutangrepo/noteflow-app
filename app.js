// SELECT DOM ELEMENTS
const noteInput = document.getElementById('noteInput');
const nameInput = document.getElementById('nameInput');
const addBtn = document.getElementById('addBtn');
const notesContainer = document.getElementById('notesContainer');

// STATE MANAGEMENT
// CRITERIA 1: Load data from LocalStorage on startup
let notes = JSON.parse(localStorage.getItem('noteflow-notes')) || [];

// INITIAL RENDER
renderNotes();

// FUNCTION: Render the list based on the 'notes' array
function renderNotes() {
    // Clear current list to prevent duplicates
    notesContainer.innerHTML = '';

    // Loop through array and create HTML
    notes.forEach((note, index) => {
        const noteHTML = `
            <div class="note-card">
                <div class="note-header">
                    <span class="author">${note.author}</span>
                    <!-- CRITERIA 2: Delete icon removes note -->
                    <!-- We give the button a data-index so we know WHICH note to delete -->
                    <button class="delete-btn" data-index="${index}">&times;</button>
                </div>
                <p class="note-text">${note.text}</p>
            </div>
        `;
        notesContainer.insertAdjacentHTML('beforeend', noteHTML);
    });
}

// FUNCTION: Add Note
addBtn.addEventListener('click', function() {
    const noteText = noteInput.value.trim();
    const authorName = nameInput.value.trim() || 'Anonymous';

    if (noteText === "") {
        alert("Please write a note!");
        return;
    }

    // Create Note Object
    const newNote = {
        text: noteText,
        author: authorName,
        timestamp: Date.now() // Optional: good for tracking
    };

    // Add to Array (State)
    notes.unshift(newNote); // unshift adds to the TOP of the array

    // Save & Render
    saveToStorage();
    renderNotes();

    // Reset Input
    noteInput.value = "";
    noteInput.focus();
});

// CRITERIA 2: Delete Logic (Event Delegation)
// We listen for clicks on the whole container, then check if it was a delete button
notesContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        const indexToDelete = e.target.getAttribute('data-index');
        
        // Remove from Array
        notes.splice(indexToDelete, 1);
        
        // Save & Render
        saveToStorage();
        renderNotes();
    }
});

// CRITERIA 1: Helper function to save to LocalStorage
function saveToStorage() {
    localStorage.setItem('noteflow-notes', JSON.stringify(notes));
}
