export default function decorate(block) {
  const data = {
    agendaTitle: block.querySelector("strong").textContent,
    items: Array.from(block.children)
      .slice(1)
      .map((item) => {
        const time = item.children[0].textContent;
        const description =
          item.children[1].querySelector("strong").textContent;
        const details = Array.from(item.children[1].children)
          .slice(1)
          .map((detail) => detail.textContent)
          .join('\n');
        return { time, description, details };
      }),
  };

  block.innerHTML = `
    <div class="agenda-title">${data.agendaTitle}</div>
    <table>
      ${data.items
        .map(
          (item) => `
          <tr>
            <td class="time">${item.time}</td>
            <td class="description">
              ${item.description}
              ${item.details ? `<p class="details">${item.details.replace(/\n/g, '<br>')}</p>` : ""}
            </td>
          </tr>
        `
        )
        .join("")}
    </table>
  `;
}
