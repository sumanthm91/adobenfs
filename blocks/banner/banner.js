export default function decorate(block) {
  // Extract the image source and alt attributes from the block's HTML
  const picture = block.querySelector("picture");
  if (!picture) {
    return;
  }

  const img = picture.querySelector("img");
  if (!img) {
    return;
  }

  const imgSrc = img.getAttribute("src");
  const imgAlt = img.getAttribute("alt");

  // Replace the block's inner HTML with the new structure
  block.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}">`;
}
