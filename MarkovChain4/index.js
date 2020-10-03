const textBox = document.getElementById("textBox");
const WordCount = document.getElementById("NOfWords");

function start() {
  let requestURL = "./prefixSuffix.json";

  let request = new XMLHttpRequest();

  request.open("GET", requestURL);

  request.responseType = "json";
  request.send();

  let pairArray;

  request.onload = function () {
    pairArray = request.response;

    let StringGen = [];
    let firstPrefix = Math.floor(Math.random() * pairArray.length - 1);

    StringGen.push(pairArray[firstPrefix].prefix.split(" ")[0]);
    StringGen.push(pairArray[firstPrefix].prefix.split(" ")[1]);
    StringGen.push(pairArray[firstPrefix].suffix);

    for (let i = 2; i < WordCount.value - 1; i++) {
      for (let j = 0; j < pairArray.length; j++) {
        if (
          pairArray[j].prefix ==
          `${StringGen[StringGen.length - 2]} ${
            StringGen[StringGen.length - 1]
          }`
        ) {
          if (pairArray[j].suffix == "undefined") {
            pairArray[j].suffix = "";
          }
          StringGen.push(pairArray[j].suffix);
          pairArray.splice(j, 1);
          j = pairArray.length;
        }
      }
    }

    let StringFinal = "";

    for (i = 0; i < StringGen.length; i++) {
      StringFinal += `${StringGen[i]} `;
    }

    textBox.innerHTML = StringFinal;
  };
}
