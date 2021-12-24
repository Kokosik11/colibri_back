const config = require('config');
const express = require('express');
const cors = require("cors");
const path = require('path');

const whitelist = config.WHITELIST_DOMAINS
    ? config.WHITELIST_DOMAINS.split(",")
    : []

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}

const app = express();

require('./config/db');

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'static')));

const PORT = config.PORT || 3010;

const FaqRouter = require('./routes/faq.router');
const ServiceRouter = require('./routes/service.router');
const ProjectRouter = require('./routes/project.router');
const BidRouter = require('./routes/bid.router');
const UserRouter = require('./routes/user.router');

app.use('/faq', FaqRouter);
app.use('/service', ServiceRouter);
app.use('/project', ProjectRouter);
app.use('/bid', BidRouter);
app.use('/user', UserRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'))
})

app.listen(PORT, () => {
    console.log(`Server listen on http://localhost:${PORT}/`);
})
