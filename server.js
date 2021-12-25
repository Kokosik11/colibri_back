const config = require('config');
const express = require('express');
// const cors = require("cors");
const path = require('path');
const serveStatic = require('serve-static')

// const whitelist = config.WHITELIST_DOMAINS
//     ? config.WHITELIST_DOMAINS.split(",")
//     : []

// const corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin || whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error("Not allowed by CORS"))
//         }
//     },
//     credentials: true,
// }

const app = express();

require('./config/db');

// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'static')));

const PORT = process.env.PORT || config.PORT || 3010;

const FaqRouter = require('./routes/faq.router');
const ServiceRouter = require('./routes/service.router');
const ProjectRouter = require('./routes/project.router');
const BidRouter = require('./routes/bid.router');
const UserRouter = require('./routes/user.router');

const ApiRouter = express.Router();

ApiRouter.use('/faq', FaqRouter);
ApiRouter.use('/service', ServiceRouter);
ApiRouter.use('/project', ProjectRouter);
ApiRouter.use('/bid', BidRouter);
ApiRouter.use('/user', UserRouter);

app.use('/api', ApiRouter)

app.use('/', serveStatic(path.join(__dirname, '/client/index.html')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'))
})

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/index.html'))
// })

app.listen(PORT, () => {
    console.log(`Server listen on http://localhost:${PORT}/`);
})
