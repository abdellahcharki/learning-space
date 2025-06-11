

function NoteLine({active,note,isActive}) {

 


    return ( <div className={`note_item ${isActive ? "active" : ""}`} onClick={ ()=> active(note) }>
        <h6>{note.title}</h6>
        <span className="m-0">  {moment(  note.updatedAt ).fromNow() }</span>
            </div>
    )

}