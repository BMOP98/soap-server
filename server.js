const soap = require('soap');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express ();
const port = 5000;

const calculatorService = {
    CalculatorService: {
        CalculatorPortType: {
            Add: (args, callback) => {
                const result = args.a + args.b;
                callback(null, { result });
            }
        }
    }
};

const wsdlPath = path.join(__dirname, 'wsdl', 'calculator.wsdl');


const xml = fs.readFileSync(wsdlPath, 'utf8');
app.listen(port, () => {
    soap.listen(app, '/wsdl', calculatorService, xml, () => {
        console.log(`Servidor SOAP escuchando en http://localhost:${port}/wsdl`);
    });
});