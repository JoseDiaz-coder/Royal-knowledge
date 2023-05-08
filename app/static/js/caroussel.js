//manejar menu carousel
const notesBTn = document.getElementById("notas");
const notesContainer = document.getElementById("notas-container");
const aboutCourse = document.getElementById('acerca-del-curso');
const aboutBtn = document.getElementById('overview');
const allNotes = document.getElementById('all-notes-container');

notesBTn.addEventListener('click', () => {
    notesContainer.style.display = 'block';
    aboutCourse.style.display = 'none';
    allNotes.style.display = 'block';


});


aboutBtn.addEventListener('click', () => {
    notesContainer.style.display = 'none';
    aboutCourse.style.display = 'block';
    allNotes.style.display = 'none';


});

//handling create new note button and note field

const newNoteBtn = document.getElementById('add');
const newNote = document.getElementById('box-create-note-form');
const cancelBtn = document.getElementById('cancel-btn');
const saveNoteBtn = document.getElementById('save-changes')
newNoteBtn.addEventListener('click',()=>{
    newNoteBtn.style.display = "none";
    newNote.style.display="block";
});

cancelBtn.addEventListener('click',()=>{
    newNoteBtn.style.display = "block";
    newNote.style.display="none";
});

saveNoteBtn.addEventListener('click',()=>{
    newNote.style.display = "none";
    newNoteBtn.style.display = "block";
});
