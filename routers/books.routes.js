const router = require("express").Router();
const { Op } = require("sequelize");

const { Book, BookCategory, BookLang } = require("../models");
const uploader = require("../config/upload.config");

router.get("/", (req, res, next) => {
  res.render("books", { mail: req.session.mail });
});

router.get("/:id", (req, res, next) => {
  const bookId = req.params.id;

  res.render("books/book", { mail: req.session.mail,book_id:bookId});
});

router.get("/api/languages", (req, res) => {
  BookLang.findAll().then((data) => res.json(data));
});

router.get("/api/catigories", (req, res) => {
  BookCategory.findAll().then((data) => res.json(data));
});




router.get("/api/books/:id", (req, res) => {
  const bookId = req.params.id;

  Book.findByPk(bookId)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    })
    .catch((error) => {
      console.error("Error fetching book:", error);
      res.status(500).json({ message: "Server error" });
    });
});









router.get("/api/books", (req, res) => {
  const { lang, name, cat } = req.query; // Get filters from request
  console.log({ lang, name, cat });
  
  const whereCondition = {};
  if (lang) whereCondition['$book_lang.id$'] = lang;
  if (name) whereCondition.name = { [Op.like]: `%${name}%` }; // Partial match
   if (cat) whereCondition['$book_catigory.id$'] = cat;



  Book.findAll({
    where: whereCondition,
    include: [
      {
        model: BookCategory, // Ensure BookCategory is correctly associated
        attributes: ["id", "category"], // Specify the fields you want to retrieve
      },
      {
        model: BookLang, // Ensure BookLang is correctly associated
        attributes: ["id", "lang"], // Specify the fields you want to retrieve
      },
    ],
  })
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      console.error("Error fetching books with category and language:", error);
    });
});







router.post(
  "/api/books",
  uploader({dir:"books",prefix:"book_"}).fields([
    { name: "book", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("From /api/books");

    const { fileName, pageCount, lang, author, cat } = req.body;

    const bookPath =  req.files["book"][0].filename;
    const coverPath =  req.files["cover"][0].filename;

    const newBook = await Book.create({
      name: fileName,
      url: bookPath,
      cover: coverPath,
      author: author || "Unknown",
      countPages: parseInt(pageCount) || 0,
      category_id: cat,
        language_id: lang,
    });
    res.json({ data: "ok" });
  }
);

module.exports = router;
