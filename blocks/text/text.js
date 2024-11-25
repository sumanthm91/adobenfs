export default function decorate(block) {
  const paragraphs = Array.from(block.querySelectorAll('p')).map(p => p.innerHTML);
  
  block.innerHTML = paragraphs.map(text => `<p>${text}</p>`).join('');
}
