const { useState, useRef, useEffect } = React;
const { Modal } = bootstrap;

const base64ToBlob = (base64Data, mimeType) => {
    const byteCharacters = atob(base64Data.split(',')[1]); // Decode Base64 string
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const byteArray = new Array(1024);
        for (let i = 0; i < 1024; i++) {
            byteArray[i] = byteCharacters.charCodeAt(offset + i);
        }
        byteArrays.push(new Uint8Array(byteArray));
    }
    return new Blob(byteArrays, { type: mimeType });
};


function AddBook({ categories, langs , onBookAdded ,setModalInstance , toggel}) {

    const modalRef = useRef(null);
///////////////////////////////////////////////////

const [fileName, setFileName] = useState("");
const [bookFile,setBookFile] = useState(null);
const [pageCount, setPageCount] = useState(0);
const [image, setImage] = useState(null);
const [author, setAuthor] = useState("");
const [lang,setlang] = useState(0);
const [cat,setCat]=useState(0)

var modalInstance;
 


useEffect(() => {
    
          modalInstance = new Modal(modalRef.current);
        setModalInstance(modalInstance)


}, [ ]);

 



    async function loadBook(e)   {
        const file = e.target.files[0];
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const metadata = await pdf.getMetadata();
    
    
        const pages = pdf.numPages;
        const author = metadata.info.Author || ""
        const filename = file.name.split('.').slice(0, -1).join('.');
    
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5  });
          // Create a canvas element to render the page
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
    
          await page.render({
            canvasContext: context,
            viewport: viewport
          }).promise;
    
          const imgData = canvas.toDataURL('image/png');
          const imgBlob = base64ToBlob(imgData, 'image/png');
    
          // Create a File from Blob (name it as "cover.png" or any name you prefer)
          const imgFile = new File([imgBlob], "cover.png", { type: 'image/png' });

          setFileName(filename)
          setPageCount(pages)
          setImage(imgFile)
          setAuthor(author) 
          setBookFile(file)
    }

    
    const uploadBook = async ()=>{

        const formData = new FormData();

        formData.append("book", bookFile)
        formData.append("cover", image)
        formData.append("lang", lang)
        formData.append("cat", cat)
        formData.append("pageCount", pageCount)
        formData.append("author", author)
        formData.append("fileName", fileName)
   
        try {
         const response = await axios.post('/books/api/books', formData,{
             headers: { 'Content-Type': 'multipart/form-data' }
           });
           console.log(response.data);
        } finally {
            setFileName("")
            setPageCount(0)
            setImage(null)
            setAuthor("") 
            setBookFile(null)
            setCat(0)
            setlang(0)
            toggel()
            onBookAdded()
            // set input emty
          
        }
    }


  



    return (<>
      
        <div className="modal modal-lg fade" ref={modalRef} >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" >Add a Book</h1>
                  
                    </div>
                    <div className="modal-body addbook">


                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <input type="file" className="form-control-file" onChange={(e)=>{loadBook(e)}}  />
                                    </div>

                                </div>



                                <div className="col-12">
                                    <div className="form-group">
                                        <label >File Name</label>
                                        <input type="text" className="form-control-file" placeholder="File Name" value={fileName}  onChange={(e)=>{  setFileName(e.target.value)}}/>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-group">
                                        <label >pages counts</label>
                                        <input type="text" className="form-control-file" placeholder="count" readOnly value={pageCount} />
                                    </div>
                                </div>
                                

                            

                                <div className="col-12">
                                    <div className="form-group">
                                        <label >Author</label>
                                        <input type="text" className="form-control-file" placeholder="Author" value={author}  onChange={(e)=>{  setAuthor(e.target.value)}} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label >Languge</label>
                                     
                                        <select name="ag" id="dddd" onChange={ (e)=>{ setlang(e.target.value) }} value={lang}>
                                        <option value="0">pleas select a Languge</option>
                                            {
                                                langs.map(lang => { return <option key={lang.id} value={lang.id}>{lang.lang}</option> })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="form-group">
                                        <label >Category</label>
                                        <select name="a" id="ddd" onChange={ (e)=>{ setCat(e.target.value) }} value={cat}>
                                        <option value="0">pleas select a Category</option>

                                            {
                                                categories.map(cat => { return <option key={cat.id} value={cat.id}>{cat.category}</option> })
                                            }
                                        </select>
                                    </div>
                                </div>

                            </div>

                        </div>



                    </div>
                    <div className="modal-footer">
                    <button onClick={  toggel   }  className="btn btn-primary"  >close</button>

                    <button className="btn btn-primary" onClick={uploadBook}>Upload the book</button>
                        
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}