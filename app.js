// SELECT DOM ELEMENTS
const noteInput = document.getElementById('noteInput');
const nameInput = document.getElementById('nameInput'); // We prep this for Epic 5
const addBtn = document.getElementById('addBtn');
const notesContainer = document.getElementById('notesContainer');

// CRITERIA 1: Button appends note to list
addBtn.addEventListener('click', function() {
    
    // Get values from inputs
    const noteText = noteInput.value.trim();
    const authorName = nameInput.value.trim() || 'Anonymous'; // Default if empty

    // CRITERIA 3: Empty notes blocked
    if (noteText === "") {
        alert("Please write a note before posting!");
        return; // Stop the function here
    }

    // Create the HTML for the new note
    // We use the exact same classes as style.css to keep it looking good
    const newNoteHTML = `
        <div class="note-card">
            <div class="note-header">
                <span class="author">${authorName}</span>
                <button class="delete-btn">&times;</button>
            </div>
            <p class="note-text">${noteText}</p>
        </div>
    `;

    // CRITERIA 1 (Continued): Append to list
    // 'afterbegin' inserts the new note at the TOP of the list
    notesContainer.insertAdjacentHTML('afterbegin', newNoteHTML);

    // CRITERIA 2: No page reload
    // (This happens automatically because we are not using a <form> tag)

    // Clear the input field for the next note
    noteInput.value = "";
    
    // Optional: Focus back on input for better UX
    noteInput.focus();
});
