// Custom SplitText utility for character-based animations
export class SplitText {
  element: HTMLElement;
  chars: HTMLElement[] = [];

  constructor(element: HTMLElement, options: { charsClass?: string } = {}) {
    this.element = element;
    this.splitChars(options.charsClass || "char");
  }

  private splitChars(className: string) {
    const text = this.element.textContent || "";
    this.element.innerHTML = "";

    // Create a span for each character
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const span = document.createElement("span");
      span.className = className;
      span.textContent = char === " " ? "\u00A0" : char; // Non-breaking space
      span.style.display = "inline-block";
      this.chars.push(span);
      this.element.appendChild(span);
    }
  }

  // Method to revert to original text
  revert() {
    const originalText = this.chars.map((char) => char.textContent).join("");
    this.element.innerHTML = originalText;
    this.chars = [];
  }
}
