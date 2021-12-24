import chalk from "chalk";
import passport from "passport";


const checkUserType = function (req,res,next){
    const userType = req.originalUrl.split('/')[2];
    console.log(chalk.bold.bgCyan(`ROLE OF PERSON USING APP ${userType}`))
    require('../config/passport')(userType,passport)
    next()
}

module.exports = checkUserType