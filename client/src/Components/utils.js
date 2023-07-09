export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const TaskPriority = {
  Low: "low",
  Medium: "medium",
  High: "high",
  Critical: "critical",
};

export const TaskStatus = {
  Hold: "hold",
  New: "new",
  ReadyForDevelopment: "readyForDevelopment",
  InDevelopment: "inDevelopment",
  ReadyForTesting: "readyForTesting",
  InQATesting: "inQATesting",
  FinalReview: "finalReview",
  Completed: "completed",
};

export function camelCaseToSentenceCase(camelCaseString) {
  const exceptions = ["QA"];
  const words = camelCaseString.split(/(?=[A-Z])/);
  const sentenceCaseWords = words.map((word, index) => {
    const isException = exceptions.includes(word.toUpperCase());
    if (isException && index > 0) {
      return word.toUpperCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });
  return sentenceCaseWords.join(" ");
}
