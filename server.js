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
    timestamps: [Object]
});
const ActivityModel = mongoose.model('Activity', activitySchema);

app.use(express.json());
app.get('/', async (req, res) => {
    const result = await ActivityModel.find();
    res.status(200).json(result);
});

app.post('/', async (req, res) => {
    const today = new Date().toISOString().slice(0, 10);
    const activity = new ActivityModel({ name: req.body.name, timestamps: [] });
    await activity.save();
    res.status(200).json({ message: "success" });
});

app.delete('/:id', async (req, res) => {
    await ActivityModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "success" });
});

app.put('/', async (req, res) => {
    const result = await ActivityModel.findOneAndUpdate(
        { _id: req.body._id },
        { name: req.body.name },
        { new: true });
    res.status(200).json(result);
});

app.put('/timer/', async (req, res) => {
    let seconds = req.body.time;
    let secondsFromYesterday = 0;
    const activity = await ActivityModel.findOne({ _id: req.body.activity._id });

    const dayOfTheDate = new Date().toISOString().slice(8, 10);
    const dayActivityStartedSecs = new Date() - 1000 * req.body.time;
    const dayActivityStarted = new Date(dayActivityStartedSecs).toISOString().slice(8, 10);

    if (dayOfTheDate !== dayActivityStarted) {
        const activityStart = new Date(dayActivityStartedSecs);
        const midnight = new Date().setHours(24, 0, 0, 0);
        secondsFromYesterday = (midnight - activityStart) / 1000;
        const yesterday = new Date(dayActivityStartedSecs).toISOString().slice(0, 10);
        await updateTimeStamp(activity, yesterday, secondsFromYesterday)
    }
    const dateToday = new Date().toISOString().slice(0, 10);
    await updateTimeStamp(activity, dateToday, seconds - secondsFromYesterday);
    res.status(200).json('success');
});

const updateTimeStamp = (activity, date, seconds) => {
    return new Promise((resolve, reject) => {
        const index = activity.timestamps.findIndex(timestamp => timestamp.date === date);
        if (index > -1) {
            activity.timestamps[index].time += seconds;
        } else {
            activity.timestamps.push({ 'date': date, 'time': seconds });
        }

         ActivityModel.findOneAndUpdate(
            { _id: activity._id },
            { timestamps: activity.timestamps }, (err) => {
                if (err) reject('something went wroooong');
                resolve();
            }
        )
    })
}

app.listen(port, () => {
    console.log(`listening on ${port}`);
});