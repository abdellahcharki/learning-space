function BookItem({book}) {

  
    return ( <div className="col-6 ">
        <div  className="book-item">
         <img src={book.cover} alt="" />
          <div className="media-body">
            <h6>{book.name}</h6>
            <hr />
            <div className="book-infos">
            <span><i className="fas fa-language"></i> {book.book_lang.lang} </span>
            <span><i className="fas fa-sitemap"></i>  {book.book_catigory.category} </span>
            <span><i className="far fa-file-alt"></i> {book.countPages} pages </span>
            </div>
            <p className="author"><i className="fas fa-user-tag"></i> <span className="label">Author:</span> {book.author}</p>
            <a title="x" href={book.url} target="_blank" style={{"text-decoration": "none",'color':'#000'}} className="float-end mt-3"> Open  <i className="fas fa-long-arrow-alt-right"></i></a>
          </div>
        </div>
       </div> )
}