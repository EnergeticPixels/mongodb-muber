# <center>Mongoose/MongoDB Training</center>
### <center>The Complete Developers Guide</center>

## Mission:
This is final section/project of Stephen Grider's training that is hosted on Udemy.com.

## Development Methodology:
Using mocha for proof of mongoose.
Using Express as a API framework.  But this could have easily been Restify framework.

## Accolades
- Stephen Grider. (https://www.udemy.com/the-complete-developers-guide-to-mongodb/learn/v4/overview)


### Node Technologies:
- NODE: version 8 or above.  NPM: version 6 or above.
- Babel: Transpiling advanced javascript code. At this point, taking care of the 'imports' and 'exports default' statement
- Mocha

###  TODOs
- I may, at a later date, install mongodb-memory-server so that the project/package is self-contained entity.

## Quick Start ##
If you're new to Node.js, these steps will get you started. You will need a active MongoDB instance running before "npm run test". If you do not use a localhosted MongoDB, you will want to modify the mongoose.connect statement that resides inside the test_helper.js file to the address that you are using for MongoDB.

1. [Install Node.js](http://nodejs.org/download/).
2. Download/clone this project to a working directory.
3. Change to the above working directory. 
3. In a command line 'window': npm install && npm run test
4. To use this API with Postman, after install dependencies, "npm run start:dev"
