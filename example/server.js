import express from 'express';
import path from 'path';

const app = express();

app.use('/js', express.static(path.resolve(__dirname, 'dist')));

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
});

app.listen(process.env.PORT || 3000, () => console.log('App Running'));