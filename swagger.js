const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description: "Documentação da meq apit, encontre todas as endpoints e models"
    },
    servers: [
        {
            url: 'http://localhost:8000'
        }
    ],
    components: {
        schemas: {
            someBody: {
                $name: "Jhon Doe",
                $age: 29,
                about: ""
            },
            someResponse: {
                name: "Jhon Doe",
                age: 29,
                diplomas: [
                    {
                        school: "XYZ University",
                        year: 2020,
                        completed: true,
                        internship: {
                            hours: 290,
                            location: "XYZ Company"
                        }
                    }
                ]
            },
            someEnum: {
                '@enum': [
                    "red",
                    "yellow",
                    "green"
                ]
            }
        },
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index');           
});