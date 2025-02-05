document.addEventListener("DOMContentLoaded", start);

function start() {
  loadNotes();
  document.getElementById("add-note-btn").addEventListener("click", addNote);
}

// get notes from storage
const getNotesFromStorage = function () {
  const notesData = localStorage.getItem("notes");
  return notesData ? JSON.parse(notesData) : [];
};

// save notes to storage
const saveNotesToStorage = function (notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// display all saved note
const loadNotes = function () {
  const notes = getNotesFromStorage();
  const container = document.getElementById("notes-container");
  container.innerHTML = "";

  notes.map((note) => {
    container.appendChild(createNoteElement(note));
  });
};

// create a dom element for a note
function createNoteElement(note) {
  const noteDiv = document.createElement("div");
  noteDiv.className = "note";
  noteDiv.dataset.id = note.id;

  const noteText = document.createElement("div");
  noteText.className = "note-text";

  noteText.textContent = note.text;
  noteDiv.appendChild(noteText);

  // container for edit and delete buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "note-buttons";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => editNote(note.id));
  buttonContainer.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteNote(note.id));
  buttonContainer.appendChild(deleteBtn);

  noteDiv.appendChild(buttonContainer);
  return noteDiv;
}

// Add new note
function addNote() {
  const noteInput = document.getElementById("note-input");
  const text = noteInput.value.trim();

  if (!text) {
    alert("Please enter a note.");
    return;
  }

  const notes = getNotesFromStorage();
  const note = {
    id: Date.now(),
    text: text,
  };

  notes.push(note);
  saveNotesToStorage(notes);
  noteInput.value = "";
  loadNotes();
}

// edit note
function editNote(id) {
  const notes = getNotesFromStorage();
  const note = notes.find((n) => n.id === id);
  if (!note) return;

  const newText = prompt("Edit your note:", note.text);
  if (newText === null) return;

  note.text = newText.trim();

  if (note.text === "") {
    deleteNote(id);
    return;
  }
  saveNotesToStorage(notes);
  loadNotes();
}

// delete a note
function deleteNote(id) {
  let notes = getNotesFromStorage();
  notes = notes.filter((note) => note.id !== id);
  saveNotesToStorage(notes);
  loadNotes();
}
