// fetch data.json file
const loadItems = async () => {
  return fetch("data/data.json")
    .then((response) => response.json())
    .catch(console.log);
};

// paint item list
const paintItems = (items) => {
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

  container.replaceChildren(...itemLiList);
};

// set event listener
const setEventListener = (items) => {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const el = e.target;
      if (el.classList.contains("colorBtn")) {
        paintItems(items.filter((item) => el.classList.contains(item.color)));
      } else {
        paintItems(items.filter((item) => item.type === el.alt));
      }
    });
  });

  const logo = document.querySelector(".logo");
  // logo.addEventListener("click", () => {
  //   paintItems(items);
  // });
  // without function
  logo.addEventListener("click", paintItems.bind(null, items));
};

// execute
loadItems().then(({ items }) => {
  paintItems(items);
  setEventListener(items);
});
