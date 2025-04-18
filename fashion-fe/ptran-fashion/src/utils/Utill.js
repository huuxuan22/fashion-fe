

export const calculateAverageRating = (feedbacks) => {
    if (!feedbacks || feedbacks.length === 0) return 0.00;

    let totalScore = 0;
    let totalFeedbacks = 0;
  
    feedbacks.forEach(feedback => {
      totalScore += feedback.rating;
      totalFeedbacks++;
    });
  
    return (totalScore / totalFeedbacks).toFixed(2);
}