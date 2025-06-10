import { author } from "../models/Author.js";

class AuthorController {

    static async listAuthor (req, res) {
        try{
            const authorList = await author.find({});
            res.status(200).json(authorList);
        }catch(error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição.`})
        }
    };


    static async SearchAuthorById (req, res) {
        try{
            const id = req.params.id;
            const authorFound = await author.findById(id);
            res.status(200).json(authorFound);
        }catch(error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição.`})
        }
    };

    static async postAuthor (req, res) {
        try{
            const newAuthor = await author.create(req.body);
            res.status(201).json({ message: "criado com sucesso", author: newAuthor});
        } catch(error) {
            res.status(500).json({ message: `${error.message} - Falha ao cadastrar livro.`})
        }
    }

    static async putAuthor (req, res) {
        try{
            const id = req.params.id;
            await author.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "livro atualizado"});
        }catch(error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição.`})
        }
    };

    static async deleteAuthor (req, res) {
        try{
            const id = req.params.id;
            await author.findByIdAndDelete(id);
            res.status(200).json({ message: "livro deletado"});
        }catch(error) {
            res.status(500).json({ message: `${error.message} - Falha na requisição.`})
        }
    };
}


export default AuthorController;