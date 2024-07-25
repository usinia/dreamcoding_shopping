// fetch data.json file
const loadItems = async () => {
  return fetch("data/data.json")
    .then((response) => response.json())
    .catch(console.log);
};

const createItem = (item) => {
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

  li.setAttribute("data-type", item.type);
  li.setAttribute("data-color", item.color);

  return li;
};

// paint item list
const paintItems = (items) => {
  const container = document.querySelector(".items");
  const itemLiList = items.map(createItem);

  // container.replaceChildren(...itemLiList);
  container.append(...itemLiList);
  return itemLiList;
};

const toggleItemVisible = (itemElements, invisibleList) => {
  if (!invisibleList || invisibleList.length === 0) {
    itemElements.forEach((item) => item.classList.remove("invisible"));
    return;
  }

  itemElements.forEach((item) => {
    if (invisibleList.includes(item)) {
      item.classList.add("invisible");
    } else {
      item.classList.remove("invisible");
    }
  });
};

// set event listener
const setEventListener = (itemElements) => {
  const logo = document.querySelector(".logo");
  // logo.addEventListener("click", () => paintItems(items));
  logo.addEventListener("click", () => toggleItemVisible(itemElements, null));

  // ** event 위임 - 개개 버튼 대신 버튼의 container 에 이벤트 등록 **
  const buttons = document.querySelector(".buttons");
  // buttons.addEventListener("click", (e) => onButtonClick(e, items));
  buttons.addEventListener("click", (e) => onButtonClick(e, itemElements));
};

const onButtonClick = (evt, itemElements) => {
  const { key, value } = evt.target.dataset;
  if (key == null || value == null) return;
  // paintItems(items.filter((item) => item[key] === value));
  toggleItemVisible(
    itemElements,
    itemElements.filter((itemEl) => itemEl.dataset[key] !== value)
  );
};

// execute
loadItems().then(({ items }) => {
  const itemElements = paintItems(items);
  // setEventListener(items);
  setEventListener(itemElements);
});
