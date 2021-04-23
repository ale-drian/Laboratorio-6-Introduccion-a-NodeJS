const http = require('http');

const port = 3001;

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-1234"
    },
    {
        id: 2,
        name: "Mary Hellas",
        number: "51-1234"
    },
    {
        id: 3,
        name: "Nora Jules",
        number: "040-6547"
    },
    {
        id: 4,
        name: "Juan Males",
        number: "041-2020"
    },
    {
        id: 5,
        name: "Lola Ruiz",
        number: "123-1234"
    }
]

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(persons));
});

/*server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/
server.listen(port)
console.log(`Server running at port ${port}`);