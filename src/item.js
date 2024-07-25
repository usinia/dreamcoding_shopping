const loadItems = async () => {
  return fetch("data/data.json")
    .then((response) => response.json())
    .catch(console.log);
};

const paintItems = ({ items }) => {
  const container = document.querySelector(".items");

  const itemLiList = items.map((item) => {
    const li = document.createElement("li");
    li.classList.add("item");

    const image = document.createElement("img");
    image.classList.add("item__thumbnail");
    image.src = item.image;
    image.alt = item.description;

    const span = document.createElement("span");
    span.classList.add("item__description");
    span.textContent = `${item.gender}, ${item.size}`;

    li.appendChild(image);
    li.appendChild(span);

    return li;
  });

  container.append(...itemLiList);
};

loadItems().then(paintItems);
