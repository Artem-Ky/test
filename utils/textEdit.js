export function truncateText(text, maxLength) {
    const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");
    if (cleanText.length > maxLength) {
      return cleanText.substring(0, maxLength) + '...';
    }
    return cleanText;
  }
  
  export function cleanTag(text) {
    return text.replace(/<\/?[^>]+(>|$)/g, "").trim();
  }