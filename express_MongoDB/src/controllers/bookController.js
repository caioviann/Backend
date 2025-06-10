import { author } from "../models/Author.js";
import book from "../models/Book.js";

class BookController {

    static async listBooks (req, res) {
        try{
            const bookList = await book.find({});
            res.status(200).json(bookList);
        }catch(error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição.`})
        }
    };


    static async SearchBookById (req, res) {
        try{
            const id = req.params.id;
            const bookFound = await book.findById(id);
            res.status(200).json(bookFound);
        }catch(error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição.`})
        }
    };

    static async postBook (req, res) {
        const newBook = req.body;
        try{
            const authorFound = await author.findById(newBook.author);
            const fullBook = { ...newBook,  author: { ...authorFound._doc }};
            const bookCriated = await book.create(fullBook);
            res.status(201).json({ message: "criado com sucesso", book: newBook});
        } catch(error) {
            res.status(500).json({ message: `${error.message} - Falha ao cadastrar livro.`});
        }
    }

    static async putBook (req, res) {
        try{
            const id = req.params.id;
            await book.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "livro atualizado"});
        }catch(error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição.`})
        }
    };

    static async deleteBook (req, res) {
        try{
            const id = req.params.id;
            await book.findByIdAndDelete(id);
            res.status(200).json({ message: "livro deletado"});
        }catch(error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição.`})
        }
    };

    static async listBooksByPublisher(req, res){
        const publisher = req.query.editora;
        try{
            const booksByPublisher = await book.find({ editora: publisher});
            res.status(200).json(booksByPublisher);
        }catch(error){
            res.status(500).json({ message: `${error.message} - falha na busca`});
        }
    };
}


export default BookController;