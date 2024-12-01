export function getRandomId() {
  return (
    Math.random().toString(36).substring(2, 9) +
    new Date().getTime().toString(36)
  );
}
