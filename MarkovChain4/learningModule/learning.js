//Ment to be used with node.js
const fs = require("fs");
fs.readFile("../prefixSuffix.json", (err, data) => {
  let PairArray = JSON.parse(data);

  fs.readFile("../trainingTexts/alice_oz.txt", (err, textData) => {
    fs.readFile("../trainingTexts/SH.txt", (err2, textData2) => {
      fs.readFile("../trainingTexts/lotr.txt", (err3, textData3) => {
        let textArray1 = textData.toString().split(" ");

        let textArray2 = textData2.toString().split(" ");
        let textArray3 = textData3.toString().split(" ");

        let textArray5 = textArray2.concat(textArray1);
        let textArray = textArray5.concat(textArray3);

        for (i = 0; i < textArray.length; i += 2) {
          let WordPair = {
            prefix: `${textArray[i]} ${textArray[i + 1]}`,
            suffix: `${textArray[i + 2]}`,
          };

          let Repped = false;

          if (WordPair.prefix == "" || WordPair.prefix == " " || WordPair.prefix == "\\" || WordPair.prefix == "/" || WordPair.prefix == "' '") {
            Repped = true;
          }

          if (Repped == false) {
            for (j = 0; j < PairArray.length; j++) {
              if (WordPair === PairArray[j]) {
                Repped = true;
              }
            }
          }

          if (Repped == false) {
            PairArray.push(WordPair);
          }
        }
        console.log(PairArray.length);
        PairArray = mergeSort(PairArray);
        console.log("Done");

        let StringData = JSON.stringify(PairArray);
        fs.writeFile("../prefixSuffix.json", StringData, (err) => {});

        function mergeSort(list) {
          let half = list.length / 2;
          if (list.length < 2) {
            return list;
          }

          const left = list.splice(0, half);

          return merge(mergeSort(left), mergeSort(list));
        }

        function merge(left, right) {
          let list = [];

          while (left.length && right.length) {
            // Execute the comparison statement
            if (left[0].prefix < right[0].prefix) {
              list.push(left.shift());
            } else {
              list.push(right.shift());
            }
          }

          return [...list, ...left, ...right];
        }
      });
    });
  });
});
