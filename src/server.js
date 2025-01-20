const app = require('./app');
const routes = require('./routes');

const PORT = 5001;

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
})