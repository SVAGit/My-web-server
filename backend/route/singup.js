const {express, collection} = require('./../server.js');
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use('/', express.static(path.join(__dirname, "..", "..", "frontend", "signup")));

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, "..", "..", "frontend", "signup", "index.html"));
});

router.post('/', (req, res)=>{
    if(!req.body){
        console.log("No data");
        res.sendFile(path.join(__dirname, "..", "..", "frontend", "signup", "index.html"));
    }else{
        collection.findOne({username : req.body.username}).then((data)=>{
            if(data){
                console.log(`Юзер с именем ${data.username} уже существует`);
                res.sendFile(path.join(__dirname, "..", "..", "frontend", "signup", "index.html"));
            }else{
                collection.insertOne(req.body);
                res.sendFile(path.join(__dirname, "..", "..", "frontend", "signup", "index.html"));
            }
        });
    }
});

async function userCheck(req, res){
    const user = await collection.findOne({username : req.body.username});
    if(user){
        console.log(`Юзер с именем ${user.username} уже существует`);
        res.sendFile(path.join(__dirname, "..", "..", "frontend", "signup", "index.html"));
    }else{
        collection.insertOne(req.body);
        res.sendFile(path.join(__dirname, "..", "..", "frontend", "signup", "index.html"));
    }
}

module.exports = router;