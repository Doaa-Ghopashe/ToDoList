//first import the filesystem package
let fs = require('fs'),filePath = process.env.FILE_PATH || './todolist';

//you need to check the existence of file or create it
(checkFileExistence= () => !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify([])):null)();

//node index.js add title=title1 body=body1
function add(data) {
    //read notes on the file to append for them
    let parsedNotes = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    //find the last id 
    let lastID = parsedNotes[parsedNotes.length - 1]?.['id'] || 0;
    //to add note you need first to built the object that will be injected on the file
    let note = {
        id: lastID + 1,
        title: data.title,
        body: data.body,
        checked: false
    };
    //push object to the parsedNotes
    parsedNotes.push(note)
    //append the new note to the old ones
    fs.writeFileSync(filePath,JSON.stringify(parsedNotes));
}

//node index.js remove id=1
function remove(id) {
    //return the notes in the file
    let parsedNotes =  JSON.parse(fs.readFileSync(filePath,'utf-8'));
    //filter data to find the note we search for and return the array that doesn't include this note
    let filteredNotes = parsedNotes.filter((ele)=>ele.id != id);
    //add the array agian to the file
    fs.writeFileSync(filePath,JSON.stringify(filteredNotes));
}

//node index.js list type=all/c/u
function list(type) {
    //to list we want only to return all the data on the file
    let parsedNotes = JSON.parse(fs.readFileSync(filePath,'utf-8'));
    //find the data of the requested type and console it
    console.log(type == 'all' ? parsedNotes : type == 'c' ? 
    parsedNotes.filter((ele)=>ele.checked):
    parsedNotes.filter((ele)=>!ele.checked) )
}

//node index.js get id=1
function getNote(id) {
    //return all notes
    let parsedNotes = JSON.parse(fs.readFileSync(filePath,'utf-8'));
    //find the needed note
    let note = parsedNotes.filter((ele)=>ele.id == id);
    note.length == 0 ? console.log("This note doesn't exist") : console.log(note);
}

//node index.js edit id=1 title=updatedTitle body=updatedBody
function edit(data) {
    //return all notes
    let parsedNotes = JSON.parse(fs.readFileSync(filePath,'utf-8'));
    //find the needed note
    let updatedNotes = parsedNotes.map((ele)=>{
        if(ele.id == data.id){
            ele.title = data?.title || ele.title;
            ele.body = data?.body || ele.body;
        }
        return ele;
    });
    //add this updated Notes to the file
    fs.writeFileSync(filePath,JSON.stringify(updatedNotes));
}

//node index.js uncheck id=1
function uncheck(id) {
      //return all notes
      let parsedNotes = JSON.parse(fs.readFileSync(filePath,'utf-8'));
      //find the needed note
      let updatedNotes = parsedNotes.map(ele=>{
        ele.checked = ele.id == id? false : true;
        return ele;
        });
      //add this updated Notes to the file
      fs.writeFileSync(filePath,JSON.stringify(updatedNotes));
}

//node index.js check id=1
function check(id) {
    //return all notes
    let parsedNotes = JSON.parse(fs.readFileSync(filePath,'utf-8'));
    //find the needed note
    let updatedNotes = parsedNotes.map(ele=>{
        ele.checked = ele.id == id? true : false;
        return ele;
    });
    //add this updated Notes to the file
    fs.writeFileSync(filePath,JSON.stringify(updatedNotes));
}

//export functions to be used outside module
module.exports = { add, edit, remove, check , uncheck, getNote, list }