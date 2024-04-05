const {express, collection} = require('./../server.js');
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use('/', express.static(path.join(__dirname, "..", "..", "frontend", "signin")));

router.get('/', (res)=>{
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "signin", "index.html"));
});

router.post('/', async (req, res)=>{
    const user = await collection.findOne({username : req.body.username});
    if(user){
        if(user.password == req.body.password){
            console.log("Aвторизация прошла успешно");
            res.sendFile(path.join(__dirname, "..", "..", "frontend", "signin", "index.html"));
        }else{
            console.log("Неправильный пароль");
            res.sendFile(path.join(__dirname, "..", "..", "frontend", "signin", "index.html"));
        }
    }else{
        console.log("Не верное имя пользователя");
        res.sendFile(path.join(__dirname, "..", "..", "frontend", "signin", "index.html"));
    }
});

module.exports = router;