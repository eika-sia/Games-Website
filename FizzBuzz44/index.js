const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("How many numbers shoul I calculate?", (number) => {
  for (i = 1; i < parseInt(number) + 1; i++) {
    let msg = "";

    if (i % 3 == 0) {
      msg += "Fizz";
    }
    if (i % 5 == 0) {
      msg += "Buzz";
    }

    if (msg == "") {
      console.log(i);
    } else {
      console.log(msg);
    }

    readline.close();
  }
});
//Ment to be used with node.js