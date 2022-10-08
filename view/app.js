import { getLanguage } from "../API/api";

let template;

const getTemplate = () => {
  if (!template) {
    template = document.querySelector("#Search-App");
  }

  // [!] template tag의 attribute에 대해 한번 알아보면 좋을 것 같음
  return template.content.firstElementChild.cloneNode(true);
};

const addEvents = (targetElement, events) => {
  // 검색
  targetElement
    .querySelector(".SearchInput__input")
    .addEventListener("keyup", async (e) => {
      if (e.target.value !== "") {
        const result = await getLanguage(e.target.value);
        events.setSearchedItems({
          target: e.target.value,
          searchList: result,
          curFocusedItem: result.length > 0 ? result[0] : "",
        });
      } else {
        events.setSearchedItems({
          target: "",
          searchList: [],
          curFocusedItem: "",
        });
      }
    });
};

// targetElement에 data-component 속성이 붙어있는 element가 들어간다.
// 여기서는 Search-App value 값이 들어 있는 element가 전달 되겠지.
export default (targetElement, state, events) => {
  const newApp = targetElement.cloneNode(true);

  // 일단 VDOM 내부 한번 비워주고
  newApp.innerHTML = "";

  // template 없으면 만들고, 있으면 가져다 쓴다.
  newApp.appendChild(getTemplate());

  // VDOM에 event 등록
  addEvents(newApp, events);

  return newApp;
};
