const mongoose = require('mongoose');
const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const app = express();
const port = 3030;
const database = 'mongodb://localhost:27017/tiktak';

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("mongoose connected to local database");
});
const activitySchema = mongoose.Schema({
    name: String,
});
const ActivityModel = mongoose.model('Activity', activitySchema);

app.use(express.json());
app.get('/', async (req, res) => {
    const result = await ActivityModel.find();
    res.status(200).json(result);
})

app.post('/', async (req, res) => {
    const activity = new ActivityModel({name: req.body.name});
    await activity.save();
    res.status(200).json({ message: "success" });
})

app.delete('/:id', async (req, res) => {
    await ActivityModel.deleteOne({_id:req.params.id});
    res.status(200).json({ message: "success" });
})

app.put('/', async (req, res) => {
    const result = await ActivityModel.findOneAndUpdate(
        { _id: req.body.id },
        { name: req.body.name },
        {new:true});
    res.status(200).json(result);
})

app.listen(port, () => {
    console.log(`listening on ${port}`);
})