document.addEventListener('DOMContentLoaded', (event) => {
  const textInput = document.querySelector('#inputText');
  if (!textInput) {
    console.error('Text input element not found');
    return;
  }

  document.getElementById('analyzeButton').addEventListener('click', async () => {
    try {
      if (window.api && window.api.sendMessage) {
        const result = await window.api.sendMessage('analyzeSentiment', { text: textInput.value });
        const resultElement = document.getElementById('result');

        // Format the result for better readability
        const formattedResult = `
          <strong>Score:</strong> ${result.score}<br>
          <strong>Comparative:</strong> ${result.comparative}<br>
          <strong>Positive Words:</strong> ${result.positive.join(", ")}<br>
          <strong>Negative Words:</strong> ${result.negative.join(", ")}<br>
          <strong>Tokens:</strong> ${result.tokens.join(", ")}<br>
          <strong>Words:</strong> ${result.words.join(", ")}<br>
        `;

        resultElement.innerHTML = formattedResult;
      } else {
        console.error('API is not initialized or sendMessage method is missing');
      }
    } catch (error) {
      console.error('Error during sentiment analysis:', error);
    }
  });
});
