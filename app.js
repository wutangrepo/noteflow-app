// SELECT DOM ELEMENTS
const noteInput = document.getElementById('noteInput');
const nameInput = document.getElementById('nameInput');
const categoryInput = document.getElementById('categoryInput'); // NEW
const addBtn = document.getElementById('addBtn');
const notesContainer = document.getElementById('notesContainer');

// STATE MANAGEMENT
// Load data from LocalStorage on startup
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
            <!-- We inject the category class here (progress/done/blocker) -->
            <div class="note-card ${note.category}">
                <div class="note-header">
                    <div>
                        <span class="author">${note.author}</span>
                        <div style="margin-top:5px;">
                            <span class="category-badge">${note.category}</span>
                        </div>
                    </div>
                    <!-- Delete Button -->
                    <button class="delete-btn" data-index="${index}">&times;</button>
                </div>
                <p class="note-text">${note.text}</p>
            </div>
        `;
        // Insert at the bottom of the list
        notesContainer.insertAdjacentHTML('beforeend', noteHTML);
    });
}

// FUNCTION: Add Note
addBtn.addEventListener('click', function() {
    const noteText = noteInput.value.trim();
    const authorName = nameInput.value.trim() || 'Anonymous';
    const categoryValue = categoryInput.value; // NEW: Get dropdown value

    if (noteText === "") {
        alert("Please write a note!");
        return;
    }

    // Create Note Object
    const newNote = {
        text: noteText,
        author: authorName,
        category: categoryValue, // Save category
        timestamp: Date.now()
    };

    // Add to Array (Add to top of list: unshift)
    notes.unshift(newNote);

    // Save & Render
    saveToStorage();
    renderNotes();

    // Reset Input
    noteInput.value = "";
    // Note: We intentionally don't reset name or category so user can post multiple times fast
    noteInput.focus();
});

// DELETE Logic (Event Delegation)
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

// Helper function to save to LocalStorage
function saveToStorage() {
    localStorage.setItem('noteflow-notes', JSON.stringify(notes));
}