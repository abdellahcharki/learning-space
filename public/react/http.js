
function getCategories() {
    return axios.get("/books/api/catigories")
        .then(data=>{
           return Promise.resolve(data.data);
        })
}


function getLanguages() {
    return axios.get("/books/api/languages")
        .then(data=>{
           return Promise.resolve(data.data);
        })
}

function getBooks({ name = "", lang = "", cat = "" } = {}) {
    return axios.get("/books/api/books", {
        params: { name, lang, cat } // Axios setzt die Query-Parameter automatisch
    })
    .then(response => response.data)
    .catch(error => {
        console.error("Fehler beim Abrufen der Bücher:", error);
        return [];
    });
}


function getBook(id){
    return axios.get("/books/api/books/"+id)
        .then(data=>{
           return Promise.resolve(data.data);
        })
}



function getNotes() {
    return axios.get("/notes/api/notes")
    .then(response => response.data)
    .catch(error => {
        console.error("Fehler beim Abrufen der Bücher:", error);
        return [];
    });
}


async function postNote(note) {
    await axios.post("/notes/api/notes", note);
} 