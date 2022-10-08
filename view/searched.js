let template;

const createResultNode = () => {
  if (!template) template = document.getElementById("Searched-Item");

  return template.content.firstElementChild.cloneNode(true);
};

const getSearchedList = (curFocusedItem) => {
  return (result) => {
    // node 생성
    const element = createResultNode();
    if (result === curFocusedItem) {
      element.classList.add("Suggestion__item--selected");
      console.log(element.classList);
    }

    // node 내부 텍스트 노드 추가
    element.textContent = result;

    return element;
  };
};

export default (targetElement, state, events) => {
  // 검색 결과
  const { searchList, curFocusedItem } = state;

  // 검색한 내역이 없다면 border 지워라
  targetElement.style.border =
    searchList.length === 0 ? "none" : "1px solid black";

  // 검색 결과 보여주는 요소 복사해서 가상 요소 만듬 + 내부 제거
  const newSearchedList = targetElement.cloneNode(true);
  newSearchedList.innerHTML = "";

  // 검색 결과들에 대해서 template 사용해서 html요소로 변환 + 요소 부착
  searchList.map(getSearchedList(curFocusedItem)).forEach((el) => {
    newSearchedList.appendChild(el);
  });

  return newSearchedList;
};
