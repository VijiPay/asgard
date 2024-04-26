import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  debugger;
  res.send('Hello world we are testing tasks automatically. I watchy is super fast. ?' + new Date());
});

const PORT = Number(process.env.PORT || 4343);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});