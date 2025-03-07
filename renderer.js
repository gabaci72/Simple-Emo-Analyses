const { analyzeSentiment } = window.electron;

const inputText = document.getElementById('inputText');
const analyzeButton = document.getElementById('analyzeButton');
const resultArea = document.getElementById('resultArea');

analyzeButton.addEventListener('click', async () => {
  const text = inputText.value;
  analyzeButton.disabled = true;
  resultArea.textContent = 'Analyzing...';

  try {
    const analysis = await analyzeSentiment(text);
    if (analysis) {
      const sentiment = analysis.score > 0 ? 'Positive' : analysis.score < 0 ? 'Negative' : 'Neutral';
      resultArea.textContent = `Sentiment: ${sentiment} (Score: ${analysis.score})`;
    } else {
      resultArea.textContent = 'Error: Unable to analyze sentiment.';
    }
  } catch (error) {
    resultArea.textContent = 'Error: Unable to analyze sentiment.';
  } finally {
    analyzeButton.disabled = false;
  }
});
