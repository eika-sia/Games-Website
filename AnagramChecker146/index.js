function check() {
  const word1 = document.getElementById("word1");
  const word2 = document.getElementById("word2");

  let letters1 = word1.value.split("");
  let letters2 = word2.value.split("");
  
  for (int i = 0; i < letters1.lenght; i++;) {
    if (letters1[i] == " ") {
      letters1.pop();
      i--;
    }
}
for (int i = 0; i < letters2.lenght; i++;) {
    if (letters2[i] == " ") {
      letters2.pop();
      i--;
    }
}

  letters1 = sort(letters1);
  letters2 = sort(letters2);

  if (JSON.stringify(letters1) == JSON.stringify(letters2)) {
    document.getElementById("value").innerHTML = "They are anagrams";
  } else {
    document.getElementById("value").innerHTML = "They are not anagrams";
  }
}

/**
 * @param {Array} string
 */
function sort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let sorted = true;
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        sorted = false;
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
    if (sorted) {
      return array;
    }
  }
  return array;
}
