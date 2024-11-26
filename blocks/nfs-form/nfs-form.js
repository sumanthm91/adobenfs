export default function decorate(block) {
  const headingElement = block.querySelector("h3");
  const descriptionElement = block.querySelector("p");

  const data = {
    heading: headingElement ? headingElement.textContent : "",
    description: descriptionElement ? descriptionElement.textContent : "",
    fields: Array.from(
      block.querySelectorAll("div:nth-child(n+2):nth-child(-n+8)")
    )
      .map((div) => ({
        label: div.children[0] ? div.children[0].textContent : "",
        required: div.children[1]
          ? div.children[1].textContent.toLowerCase() === "required"
          : false,
      }))
      .filter((field) => field.label !== "required")
      .filter((field) => field.label !== "Not required"),
    disclaimer: block.querySelector("div:nth-child(8) > div")
      ? block.querySelector("div:nth-child(8) > div").innerHTML
      : "",
  };

  block.innerHTML = `
    <div class="left">
            <h2>${data.heading}</h2>
            <p>${data.description}</p>
        </div>
        <div class="right">
           <form id="registrationform" action="/fsg?pageId=a6c6de63-6aff-4cec-936d-03a36835fafe&variant=f" method="POST">
           <input type="hidden" name="pageId" value="a6c6de63-6aff-4cec-936d-03a36835fafe">
           <input type="hidden" name="pageVariant" value="f">
           ${data.fields
             .map(
               (field) => `
            <label for="${field.label.toLowerCase().replace(/ /g, "-")}">
              ${field.label} ${field.required ? "*" : ""}
            </label>
            <input type="${
              field.label.toLowerCase().includes("email") ? "email" : "text"
            }" 
                   id="${field.label.toLowerCase().replace(/ /g, "-")}" 
                   name="${field.label.toLowerCase().replace(/ /g, "-")}" 
                   ${field.required ? "required" : ""}>
          `
             )
             .join("")}
                
                <button type="submit">Register now</button>
            </form>
            <div class="disclaimer">
                By supplying my mobile number, I authorize the <a href="#">Adobe family of companies</a> to contact me with personalized communications about Adobe's products and services. See our <a href="#">privacy policy</a> for more details or to opt out at any time.
            </div>
            <div id="thankYouMessage" class="thank-you-message">
              <div class="thank-you-content">
                <div class="thank-you-header">
                  <img src="https://d9hhrg4mnvzow.cloudfront.net/www.adobe-invite.com/dubai-need-for-speed/81596698-adobe.svg" alt="Adobe Logo">
                </div>
                <h3>Thank you!</h3>
                <p>We look forward to seeing you in January.</p>
                <button id="closeThankYou">×</button>
              </div>
            </div>
        </div>
  `;

  const form = block.querySelector("#registrationform");
  const thankYouMessage = block.querySelector("#thankYouMessage");
  const closeThankYou = block.querySelector("#closeThankYou");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    // Simulate form submission
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
      });
      if (response.ok) {
        // Handle successful response
      } else {
        // Handle error response
      }
    } catch (error) {
      // Handle network error
    } finally {
      thankYouMessage.style.display = "block";
    }
  });

  closeThankYou.addEventListener("click", () => {
    thankYouMessage.style.display = "none";
  });
}
