const express = require("express");
const app = express();

const todoRoutes = require('./routes/todoRoutes');
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");


 
app.use(express.json());
app.use(express.urlencoded({extended: true}))



app.use('/api/todos', todoRoutes)


// 404 + error handlers
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running at: http://localhost:${PORT}`)
);
