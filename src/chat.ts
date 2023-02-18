import * as tmi from "tmi.js";

export const client = new tmi.Client({});

client.connect();

client.on("join", () => {
  document.querySelector("#status").innerHTML = "Connected!";
});

client.on("connected", () => {
  const btnElement: HTMLButtonElement = document.querySelector("#connect");
  btnElement.disabled = false;
});
