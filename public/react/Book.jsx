
const { useState, useEffect } = React;
const { Document, Page } = ReactPDF;


const PdfViewer = ({ pdfUrl }) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);

    // Set the PDF.js worker source from CDN
    pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js';

    const onLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    }; 
}


function Book() {

    const [pdf,setPdf] = useState({})
 
    useEffect(()=>{
        const bookID = document.getElementById("bookid").value;
       getBook(bookID).then(data=> setPdf(data))

    },[])
 



  return (
    <div className="container">
      <div className="row">
      
      <PdfViewer pdfUrl={ "/"+pdf.url} />

      </div>

    </div>
  );
}

// Render the component to the DOM
ReactDOM.render(<Book />, document.getElementById("root"));
