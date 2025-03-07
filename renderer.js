const sentiment = require('./sentiment');

const inputText = document.getElementById('inputText');
const analyzeButton = document.getElementById('analyzeButton');
const resultArea = document.getElementById('resultArea');

analyzeButton.addEventListener('click', () => {
  const text = inputText.value;
  const analysis = sentiment.analyzeSentiment(text);

  if (analysis) {
    const sentiment = analysis.score > 0 ? 'Positive' : analysis.score < 0 ? 'Negative' : 'Neutral';
    resultArea.textContent = `Sentiment: ${sentiment} (Score: ${analysis.score})`;
  } else {
    resultArea.textContent = 'Error: Unable to analyze sentiment.';
  }
});