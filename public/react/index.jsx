
const { useState, useEffect } = React;
const { Modal } = bootstrap;

function MainComponent() {

  // fitching
  const [langs, setLangs] = useState([])
  const [categories, setCategories] = useState([])
  const [books, setBooks] = useState([])

  const [_lang, _setLang] = useState("");
  const [_cat, _setCat] = useState("");
  const [_name, _setName] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [modalInstance, setModalInstance] = useState(null);


  const refrechBooks = () => {
    getBooks({ name: _name, lang: _lang, cat: _cat }).then(data => { setBooks(data) })
  }





  useEffect(() => {

    getCategories().then(data => { setCategories(data) })
    getLanguages().then(data => { setLangs(data) })
    refrechBooks()

  }, [_lang, _cat, _name])



  const [status, setStatus] = useState(false);

  const toggel = () => {

    if (!status) {
      modalInstance.show();

    } else {
      modalInstance.hide();
    }
    setStatus(!status)
  }


  useEffect(() => {
    if (modalInstance) {
      modalInstance._element.addEventListener('hidden.bs.modal', () => {
        modalInstance.hide();
        setStatus(false)
    });
    }
  }, [modalInstance])





  return (
    <>
      <BooksNavBar _setCat={_setCat} _setLang={_setLang} _setName={_setName} categories={categories} langs={langs} toggel={toggel} onAddedBook={refrechBooks} />
      <AddBook categories={categories} langs={langs} onBookAdded={refrechBooks} setModalInstance={setModalInstance} toggel={toggel} />
      <div className="container">
        <div className="row pb-2">

           
          {
            books.length<1? <NoBook /> : books.map(book => { return (<BookItem key={book.id} book={book} />) })
          }
        </div>

      </div>
    </>
  );
}

// Render the component to the DOM

ReactDOM.render(<MainComponent />, document.getElementById("root"));
