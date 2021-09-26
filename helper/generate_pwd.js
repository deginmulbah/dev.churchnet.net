const generator = require('generate-password');
const defaultpassword = generator.generate({
	length: 5,
	numbers: true,
    uppercase:false
});
module.exports  = defaultpassword