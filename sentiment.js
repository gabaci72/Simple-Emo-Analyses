const sentiment = require('sentiment');

function analyzeSentiment(text) {
  try {
    const analysis = sentiment(text);
    return analysis;
  } catch (error) {
    console.error('Error during sentiment analysis:', error);
    return null;
  }
}

module.exports = { analyzeSentiment };