import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router()
// router to save a new book
router.post('/',async (request,response)=>{
    try{
        if(
            !request.body.title || 
            !request.body.author || 
            !request.body.publishYear ){
            return response.status(400).send({ message: 'send all required fields: title,author,publication'});
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Route to Get all Books from DB
router.get('/',async (request,response)=>{
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data:books
        }
        );
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Route to Get a Book by id from DB
router.get('/:id', async (request,response)=>{
    try{
        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(200).json({
            data:book
        }
        );
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Route to Update a Book by id in DB
router.put('/:id', async (request,response)=>{
    try{
        if(
            !request.body.title || 
            !request.body.author || 
            !request.body.publishYear ){
            return response.status(400).send({ message: 'send all required fields: title,author,publication'});
        }
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).json({message: 'Book not found'})
        }
        return response.status(200).send({message: 'Book Updated successfuly'})
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Route to Delete a Book 
router.delete('/:id', async (request,response)=>{
    try{
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message: 'Book not found'})
        }
        return response.status(200).send({message: 'Book Deleted successfuly'})
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

export default router;