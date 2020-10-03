let list = [
  { prefix: "b", suffix: "b" },
  { prefix: "c", suffix: "b" },
  { prefix: "a", suffix: "b" },
  { prefix: "d", suffix: "b" },
];

function string_sort(str) {
  var i = 0,
    j;
  while (i < str.length) {
    j = i + 1;
    while (j < str.length) {
      if (str[j].prefix < str[i].prefix) {
        var temp = str[i].prefix;
        str[i].prefix = str[j].prefix;
        str[j].prefix = temp;
      }
      j++;
    }
    i++;
  }
}

string_sort(list);

let WordPair = {"prefix" : "'\nawaw"}

let punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~\n\r";

let rawLetters = WordPair.prefix.split("");
let cleanLetters = rawLetters.filter(function (letter) {
  return punctuation.indexOf(letter) === -1;
});

let cleanString = cleanLetters.join("");

console.log(cleanString);
