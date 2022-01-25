const express = require("express")
const app = express()

const cors = require("cors")
const helmet = require("helmet")
var xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize');
app.use(xss())
app.use(mongoSanitize());
app.use(cors())
app.use(helmet())
app.use(express.json())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static('uploads'))
const passport = require("passport")
app.use(passport.initialize());
app.use('/api',passport.authenticate('jwt', { session: false }));

const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");


const user = require("../api/user");
app.use("/user",user);

const product = require("../api/product");
app.use("/api/product",product);

const language = require("../api/language");
app.use("/api/language",language);

const territory = require("../api/territory");
app.use("/api/territory",territory);

const campaign = require("../api/campaign");
app.use("/api/campaign",campaign);

const currency = require("../api/currency");
app.use("/api/currency",currency);

const customApi = require("../api/custom");
app.use("/api/custom",customApi);

app.get("/",function (req,res){
    res.send("API is working")
})
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Shopala documentation',
            version: "0.1.0",
            description:
                "This is a shopala application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Venrup",
                url: "https://venrup.com",
                email: "contact@venrup.com",
            },
        },
        servers: [
            {
                url: "http://localhost:2022/",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "apiKey",
                    name: "Authorization",
                    scheme: "bearer",
                    in: "header",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./api/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);


module.exports = app
