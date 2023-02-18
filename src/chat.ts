import * as tmi from "tmi.js";

export const client = new tmi.Client({});

const words: {
  word?: {
    quantity: number;
    element: HTMLDivElement;
  };
} = {};

client.connect();

function wordCountUp(word: string) {
  if (words[word] == undefined) {
    words[word] = { quantity: 1 };
  } else {
    words[word].quantity += 1;
  }
  updateWordCloud();
}

function updateWordCloud() {
  const container = document.querySelector(".container");
  Object.keys(words).forEach((word) => {
    if (words[word].element != undefined) {
    } else {
      const wordDiv = document.createElement("div");
      wordDiv.textContent = word;
      words[word].element = wordDiv;
      container.appendChild(wordDiv);
    }
  });
}

client.on("join", () => {
  document.querySelector("#status").innerHTML = "Connected!";
});

client.on("connected", () => {
  const btnElement: HTMLButtonElement = document.querySelector("#connect");
  btnElement.disabled = false;
});

client.on("message", async (channel, tags, message, self) => {
  var words = [...new Set(message.toLowerCase().split(" "))];
  words.forEach((word) => {
    wordCountUp(word);
  });
});
