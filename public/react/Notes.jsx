

const { useEffect, useRef, useState } = React;

function Notes() {
    const editorRef = useRef(null);
    const modalRef = useRef(null)
    const pageRef = useRef(null)


    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")
    const [activedNote, setActivedNote] = useState({})
    const [chang, setChang] = useState(false)


    // detect changes
    const isChanged = async () => {
        if (editorRef.current) {
            setChang(true);
        }
    }


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === "s") {
                event.preventDefault(); // Prevent the browser’s save dialog
                saveNote();
            }
        };
    
        window.addEventListener("keydown", handleKeyDown);
        
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [saveNote, title]);



    useEffect(() => {
        if (editorRef.current && activedNote.body) {
            try {
                editorRef.current.render(JSON.parse(activedNote.body));
            } catch (error) {
                console.error("Error parsing note body:", error);
            }
            setTitle(activedNote.title || "");
        }
        setChang(false);
    }, [activedNote]);


    useEffect(() => {
        getNotes().then(data => setNotes(data))

        if (!editorRef.current && window.EditorJS) {
            editorRef.current = new window.EditorJS({
                holder: "editorjs",
                tools: editorTools,
                data: [],
                onChange: isChanged,
                onReady: () => { 
                    new DragDrop(editorRef.current);
                  },
            });
        }



        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [ ]);


 
    
    const saveNote = async () => {
        if (editorRef.current) {
            try {
                const savedData = await editorRef.current.save();
                const updatedNote = { ...activedNote, title, body: JSON.stringify(savedData) };

                // Update notes list
                setNotes((prevNotes) =>
                    prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
                );

                // HTTP request to save (Assuming you have an API)
                // await saveNoteToServer(updatedNote);
                await postNote(updatedNote)
                setActivedNote(updatedNote);
                setChang(false); 
                getNotes().then(data => setNotes(data))
            } catch (error) {
                console.error("Error saving note:", error);
            } 
        }
    };

 


    return (<div>
        <section className="sec-header notes_bnner" ref={pageRef}  >
            <div className="page-title">
                <h5  >My Notes</h5>
                <div className="addbtn">
                    <button className="new_note_btn">+</button>
                </div>

            </div>

            <div className="note_topbar">
                <div className="notes_tab_title">
                    <i className="far fa-sticky-note"></i>
                    <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); setChang(true) }} placeholder="make a title to your note" />
                </div>
                <div className="note_opt">
                    <button onClick={saveNote} className="save_btn">save {chang ? " *" : ""} </button>
                    <button className="save_btn"><i class="fas fa-trash    "></i></button>
                    <button className="save_btn">Edit</button>
                </div>


            </div>
        </section>



        <section className="notes-space">
            <div className="notes-list">
                {
                    notes.map(note => <NoteLine key={note.id} note={note} isActive={activedNote.id == note.id} active={setActivedNote} />)
                }

            </div>
            <div className="notes-content paper"   >
                <div className="wrapper-editor" id="editorjs"></div>
            </div>

        </section>































        <div className="modal fade"  ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Unsaved changes ?</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    Save changes before closing? Closing will cause any unsaved changes to be discarded.
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" >don't save</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>














    </div>)

}




ReactDOM.render(<Notes />, document.getElementById("notes"));
