# 🌟 Reza's Solution 

I have created a dockerized environment supporting [Nest](https://github.com/nestjs/nest)/MongoDB/Swagger. In **Order** module the assessment requirements
are fulfilled via RESTfull APIs that can create an order, update its status and search for one (or more). Also, automated unit tests 
can be found in **/src/test** folder.

## Running the project
Booting up the project is as simple as
```bash
$ docker-compose up
```
When containers are up, you can access the [Swagger API documentation](http://localhost:3000/api) to test all endpoints:

http://localhost:3000/api

To run the automated tests you can run jest by executing
```
npm test
```
There are tests to cover both price calculation algorithm and the state machine.

## Some considerations
- The pickup and drop off addresses are required as a whole since all the properties of them seem to be required to accomplish 
the order. Obviously this behavior can be changed.
- A possible additional requirement is to check that the 2 locations aren't the same.
- There is a strict regular expression used to validate zipcodes to be in this format: 1234 AB. This is also something that
can be changed.
- There has been considered a minimum length for address in the search API.
- Strategy design pattern is used to calculate order price (see **simple.price.calculator.service**).

