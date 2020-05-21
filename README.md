# Welcome to StockFolio!

In order to run a local instance of this project please read the following documentation

# Installation Requirements
* Node.js installed
* MongoDB installed or hosted elsewhere


# Run Instructions

1. Clone this REPO `git clone https://github.com/GN/StockFolio.git`
2. Navigate to both the "Frontend" and "Backend" directories and run the following cammand individually in each one: `npm install` this will install all the necessary packages for the project to run
3. In the "Backend" directory you will see a file called `server.js` on line `53` you will see an IP address. This is the address used for your MongoDB connection, change this to the IP address of your instance of MongoDB to run correctly. 
4. Once you've configured your MongoDB and installed the packages the only thing left to do is start both the frontend and backend. To do so run the following commands:
5. In the Backend directory run: `node server.js`
6. In the Frontend directory run: `npm run start`

The front end should be running on `http://localhost:3000/` 
