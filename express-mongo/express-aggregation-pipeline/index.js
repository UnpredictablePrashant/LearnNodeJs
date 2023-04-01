const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
/*

1. $match: Filters the documents in the collection to only include those matching the condition.<br>
2. $group: Groups the remaining documents by author and calculates the total stocks for each author.
3. $sort: Sorts the resulting documents in descending order by totalStocks.
4. $skip: Skips the first 5 documents in the sorted result set.
5. $limit: Limits the number of documents in the result set to 5.
6. $project: Projects only the author and totalStocks fields from the grouped result.
7. $unwind: Deconstructs the author field to create separate documents for each distinct author.

*/

const bookSchema = new mongoose.Schema({
    bookTitle: {
        type: String
    },
    isbn: {
        type: String
    },
    author: {
        type: String
    },    
    stocks: {
        type: Number
    },
    noCountriesPublished:{
        type: Number
    },
    publisher: {
        type: String
    },
    accountCreation: {
        type: Date,
        default: Date.now()
    }
});

const Book = mongoose.model('bookdetail',bookSchema)

app.use(express.json())

app.post('/bookadd', (req,res)=>{
    console.log(req.body)
    try{
        const book = new Book({
            bookTitle: req.body.bookTitle, 
            isbn: req.body.isbn,
            author: req.body.author,
            stocks: req.body.stocks,
            noCountriesPublished: req.body.noCountriesPublished,
            publisher: req.body.publisher
        })
        book.save().then(data => res.send('Data added')).catch(err => res.send("Something went wrong!"))
    }catch{
        res.send("Data in not right format")
    }
})


app.get('/authorstocks', (req,res)=>{
     Book.aggregate([
        {
          $match: {
            author: "J K Rowling",
            stocks: { $gt: 0 }
          }          
        },
        {
            $group: {
              _id: "$author",
              totalStocks: { $sum: "$stocks" }
            }
          }
      ]).exec()
      .then(books => res.send(books))
      .catch(err => res.send("ERROR"))

})

app.get('/allaggregate', (req,res)=>{
    Book.aggregate([
        {
          $match: {
            stocks: {$gt : 0}
          }
        },
        {
          $group: {
            _id: "$author",
            totalStocks: { $sum: "$stocks" }
          }
        },
        {
          $sort: {
            totalStocks: 1
          }
        },
        {
          $skip: 1
        },
        {
          $limit: 2
        },
        {
          $project: {
            _id: 0,
            author: "$_id",
            totalStocks: 1
          }
        },
        {
          $unwind: "$author"
        }
      ]).exec()
      .then(books => res.send(books))
      .catch(err => res.send("ERROR"))
})

app.listen(3000, ()=> {
    console.log("Server started at 3000")
})