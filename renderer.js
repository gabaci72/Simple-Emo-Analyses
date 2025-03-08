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
        document.getElementById('result').innerText = JSON.stringify(result, null, 2);
      } else {
        console.error('API is not initialized or sendMessage method is missing');
      }
    } catch (error) {
      console.error('Error during sentiment analysis:', error);
    }
  });
});
