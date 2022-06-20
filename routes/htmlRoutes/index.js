// indexhtml in htmlRoutes folder

const path = require('path');
const router = require('../apiRoutes/animalRoutes');

router.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'))
});

router.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});


module.exports = router;

