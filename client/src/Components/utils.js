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

export function formatDate(isoDate) {
  const date = new Date(isoDate);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

export const checkEmail = (email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};
