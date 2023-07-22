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
  return `${day}/${month}/${year}`;
}

export const checkEmail = (email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

export const getInitials = (name) => {
  const words = name?.split(/(?=[A-Z])/);
  return words
    ?.map((word) => {
      if (word && word[0] === word[0].toLowerCase()) {
        return word[0].toUpperCase();
      } else {
        return word[0];
      }
    })
    .join("");
};

export const lightColors = [
  "#FF5733", // Reddish-orange
  "#FFC300", // Vivid yellow
  "#FFC0CB", // Pink
  "#E56E94", // Light pink
  "#FF5733", // Reddish-orange (repeated)
  "#007FFF", // Azure blue
  "#7FFF00", // Chartreuse green
  "#00FF7F", // Spring green
  "#40E0D0", // Turquoise
  "#9370DB", // Medium purple
  "#FF4500", // Orange-red
  "#00CED1", // Dark turquoise
  "#FF1493", // Deep pink
  "#FF69B4", // Hot pink
  "#48D1CC", // Medium turquoise
  "#8A2BE2", // Blue-violet
  "#FFD700", // Gold
  "#FFA500", // Orange
  "#008000", // Green
];

