const Sentiment = require('sentiment');
const sentiment = new Sentiment();

function analyzeSentiment(text, language) {
    try {
        const result = sentiment.analyze(text);
        return {
            score: result.score,
            comparative: result.comparative,
            tokens: result.tokens,
            words: result.words,
            positive: result.positive,
            negative: result.negative
        };
    } catch (error) {
        console.error('Error in sentiment analysis:', error);
        throw error;
    }
}
// sentiment.js
const sentiment = require('sentiment-multilang');

module.exports.analyzeSentiment = (text, language) => {
    const analyzer = new sentiment.Sentiment();
    analyzer.setLanguage(language || 'en');
    return analyzer.analyze(text);
};

module.exports = { analyzeSentiment };