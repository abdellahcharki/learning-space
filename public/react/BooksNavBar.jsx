
function BooksNavBar({langs,categories,_setName,_setCat,_setLang,   toggel}) {
   
    
    return ( <header id='navbar' >
<nav className="navbar navbar-expand-sm">
        <div className="container-fluid p-0">
            <a className="navbar-brand" title="d" href="/"><img height="38" src="/img/logo.png" alt="" /></a>

            <div className="collapse navbar-collapse" id="collapsibleNavId">
            <div className="books-search">

                    <div className="search-form text-search">
                    <label htmlFor=""> <i className="fa fa-search" aria-hidden="true"></i></label>
                    <input type="text" placeholder="book name"  onChange={(e)=>{ _setName(e.target.value)}} />
                    </div>

                    <div className="search-form">
                    <label htmlFor="">  <i className="fas fa-language"></i></label>
                    <select onChange={(e)=>{ _setLang(e.target.value)}}>
                        <option value="" >All laguges</option>
                        {
                        langs.map(lang=>(<option key={lang.id} value={lang.id}> {lang.lang} </option>))
                        }
                    </select>

                    </div>

                    <div className="search-form">
                    <label htmlFor=""> <i className="fas fa-quote-right"></i></label>
                    <select onChange={(e)=>{ _setCat(e.target.value);}}>
                        <option value="">All Categorie</option>
                        {
                        categories.map(cat=>(<option key={cat.id} value={cat.id}> {cat.category} </option>))
                        }
                    </select>

                    </div>



                    <div className="search-form">
                    <label htmlFor=""><i className="fas fa-th-list"></i> </label>
                    <select name="sdfdsf" id="sdf" title="f">
                        <option value="">List </option>
                        <option value="">Grid 2 Clmn</option>
                        <option value="">Grid 3 Clmn</option>
                    </select>

                    </div>

                    <div className="search-form noto">
                    <button  onClick={ toggel }  >Upload <i className="fas fa-file-upload"></i></button>
                    </div>

                    </div>
            </div>
            <div className="rightnav">

                <div className="dropdown">

                    <button className="btn btn-secondary float-end act-btn dropdown-toggle" type="button" data-bs-toggle="dropdown"  > User </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><a className="dropdown-item"  > Edit </a></li>
                        <li>  <form method="post" action="/auth/logout" className="navbar-nav mr-auto mt-2 mt-lg-0">

                            <button type="submit" className="logoutbtn btn btn-danger">Log out</button>
                        </form></li>



                    </ul>
                </div>

            </div>
        </div>
    </nav></header>)

}