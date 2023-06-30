import React from "react";

export const getReviewSummary = (count: any) => {
  const reviewValues: any[] = Object.values(count || {});
  const reviewTotal = reviewValues.reduce((a: any, b) => a + b, 0);
  const reviewStars =
    (reviewValues[0] * 5 +
      reviewValues[1] * 4 +
      reviewValues[2] * 3 +
      reviewValues[3] * 2 +
      reviewValues[4] * 1) /
    reviewTotal;
  return { reviewStars, reviewTotal };
};
