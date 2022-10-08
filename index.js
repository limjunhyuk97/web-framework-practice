import getLanguage from "./API/api";
import applyDiff from "./applyDiff";
import registry from "./registry";
import searchedResultView from "./view/searched";

// 레지스트리에 함수명-함수(VDOM 생성 위한) 등록
registry.add("SearchedResult", searchedResultView);

// 상태 -> 오직 상태에만 순수하게 의존하여 렌더링 되는 화면 구현
const state = {
  target: "",
  searchResult: [],
};

// 렌더링 함수
const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector(".App");
    const newMain = registry.renderRoot(main, state);
    applyDiff(document.body, main, newMain);
  });
};

// 1차적으로 input입력에 대한 검색어 변경 반영하는게 아니라,
// 단순히 target 값 변경 시키면서 작동하는지 확인
// 즉 state 변경에 따라 작동하는지 확인
const target = ["java", "py", "c"];
const curTarget = (() => {
  let num = 0;
  const next = () => {
    num += 1;
    return num % 3;
  };
  return next;
})();

window.setInterval(async () => {
  state.target = target[curTarget()];
  state.searchResult = (await getLanguage(state.target)).map((el, idx) => {
    return { text: el, suggested: idx === 0 ? true : false };
  });
  console.log(state);
  render();
}, 3000);

render();
