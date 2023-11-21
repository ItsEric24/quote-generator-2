const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//* Show loading spinner
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//* Hide loading spinner
function completeLoading() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//* Show new quote
function newQuote() {
  loading();
  //* Pick a random quote index from the apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //* Check if author text field is "null"
  if (!quote.author) {
    quoteText.textContent = "~ Unknown";
  } else {
    quoteAuthor.textContent = "~ " + quote.author;
  }

  //* Check quote text length
  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  completeLoading();
}

//* Get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //* Catch errors here
  }
}

//* Tweet a generated quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${quoteAuthor.textContent}`;
  window.open(twitterUrl);
}

//* Event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
