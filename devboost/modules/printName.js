// ------
// function printName(name) {
//   console.log(name);
// }

// const lastName = 'Daros';

// // module.exports = printName;
// module.exports = {printName, lastName};
// // Withou exports it returns error
// // TypeError: printName is not a function


// -----
exports.printName = (name) => {
  console.log(name)
}

exports.lastName = 'Daros'