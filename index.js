import getLanguage from "./API/api";
import applyDiff from "./applyDiff";
import registry from "./registry";
import searchedResultView from "./view/searched";
import AppView from "./view/app";

// 레지스트리에 함수명-함수(VDOM 생성 위한) 등록
registry.add("SearchedResult", searchedResultView);
registry.add("app", AppView);

// *상태 -> 오직 상태에만 순수하게 의존하여 렌더링 되는 화면 구현
const state = {
  target: "",
  searchList: [],
  clickList: [],
  curFocusedItem: "",
};

// *이벤트
// (1) 검색어 입력 시 검색 결과 등장
// (2) 선택(enter / click) 시 검색 목록에 저장
const events = {
  setSearchedItems: ({ target, searchList, curFocusedItem }) => {
    state.target = target;
    state.searchList = searchList;
    state.curFocusedItem = curFocusedItem;
    render();
  },
  addClickList: (target) => {
    state.clickList.push(target);
    if (state.clickList.length > 5) state.clickList = state.clickList(1);
    render();
  },
  upperItem: () => {
    state.curFocusedItem =
      state.searchList[
        (state.searchList.indexOf(state.curFocusedItem) -
          1 +
          state.searchList.length) %
          state.searchList.length
      ];
    render();
  },
  lowerItem: () => {
    state.curFocusedItem =
      state.searchList[
        (state.searchList.indexOf(state.curFocusedItem) + 1) %
          state.searchList.length
      ];
    render();
  },
};

// 렌더링 함수
const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root");
    const newMain = registry.renderRoot(main, state, events);
    applyDiff(document.body, main, newMain);
  });
};

// 위-아래 이동 : 이 부분에 대해서 전역으로 뺴는게 맞는지?
window.addEventListener("keydown", (e) => {
  if (state.searchList !== 0) {
    if (e.key === "ArrowDown") {
      events.lowerItem();
    }
    if (e.key === "ArrowUp") {
      events.upperItem();
    }
    if (e.key === "Enter") {
    }
  }
});

render();
