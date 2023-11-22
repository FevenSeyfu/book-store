import React, { useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from 'notistack';


const DeleteBooks = () => {
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteBook = ()=> {
        setLoading(true);
        axios
        .delete(`https://book-store-jznw.onrender.com/books/${id}`)
        .then(() => {
            setLoading(false);
            enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
            navigate('/')
        })
        .catch((error) => {
            // alert('Error occured,Please check console')
            enqueueSnackbar('Error', { variant: 'error' });
            setLoading(false);
            console.log(error);
        });
    }
  return (
    <div className='p-4 '>
        <BackButton />
        <h1 className='text-3xl my-4 text-center'>Delete Book</h1>
        {loading ? (
        <Spinner />
        ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[800px] p-4 mx-auto justify-center'>
            <h3 className="text-2xl text-center">
                Are You Sure You Want to Delete This Book?
            </h3>
            <button className="p-2 bg-red-600 text-white m-auto my-8 w-[200px] " onClick={handleDeleteBook}>
                Yes,Delete it!
            </button>
        </div>
        )}
    </div>
    
  )
}

export default DeleteBooks