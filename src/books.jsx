import './assets/index'
import './assets/book.css'
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react'


function Books (){
    const [book, setBook] = useState([])
    const [magazine, setMagazine] = useState([])
    const [isOpen, setIsOpen] = useState(true)


    useEffect(() => {
        fetch('http://localhost:4000/')
            .then((res) => res.json())
            .then((data) => setBook(data))
    }, [])

    
    
    const newBook = useRef()
    const newBookAuthor = useRef()
    const newBookYear = useRef()

    const hendleSubmit = (e) => {
        e.preventDefault()
        const new_book_title = newBook.current.value
        const new_book_author = newBookAuthor.current.value
        const new_book_year = newBookYear.current.value

        fetch(`http://localhost:4000/`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                title : new_book_title,
                author: new_book_author,
                year: new_book_year
            })
        })
        .catch(e => console.error(e))

    }

    const deleteBook = useRef()
    const hendleDelete = (e) => {
        e.preventDefault() 
        const remove = deleteBook.current.value
        console.log(remove);
        fetch(`http://localhost:4000/${remove}`,{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        })
        console.log(e.target.value);
    }


    return (
        <>

        <div className="container">
            <header className="header">
                <NavLink to={"/magazine"} className='link'>Magazines</NavLink>
                <NavLink to={"/"} className='link'>Books</NavLink>
                <form action="/" className="form" onSubmit={hendleSubmit}>
                    <input type="text" ref={newBook} className='input' name='title' required placeholder='Book name'/>
                    <input type="text" ref={newBookAuthor} className='input' name='author' required placeholder='Author name'/>
                    <input type="number" ref={newBookYear} className='input' name='year' required placeholder='Published year'/>
                    <button className='submit' type="submit">Submit</button>
                </form>
            </header>
            <main>
                <h2 className="heading">List of books</h2>
                <div className="wrapper">
                        {
                            book?.map((e, i) => {
                                return(
                                    <div className="card" key={i}>
                                        <h3 className="title">Book name: {e.title}</h3>
                                        <p className="author">Author: {e.author}</p>
                                        <p className="year">Year: {e.year}</p>
                                        <button className='editBtn'>Edit</button>
                                        <button className="delBtn" onSubmit={hendleDelete}  value={e._id} ref={deleteBook}>Delete</button>
                                    </div>
                                )
                            })
                        }
                </div>
                
            </main>
        </div>
        </>
    )
}
export default Books;