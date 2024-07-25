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
  const logo = document.querySelector(".logo");
  logo.addEventListener("click", () => paintItems(items));

  // ** event 위임 - 개개 버튼 대신 버튼의 container 에 이벤트 등록 **
  const buttons = document.querySelector(".buttons");
  buttons.addEventListener("click", (e) => onButtonClick(e, items));
};

const onButtonClick = (evt, items) => {
  const { key, value } = evt.target.dataset;
  if (key == null || value == null) return;
  paintItems(items.filter((item) => item[key] === value));
};

// execute
loadItems().then(({ items }) => {
  paintItems(items);
  setEventListener(items);
});
