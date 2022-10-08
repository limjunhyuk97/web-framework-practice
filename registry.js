const registry = {};

// DOM -> VDOM 형성
// - 자식 노드들 다 훑으면서 : state 변경에 따른 값 변경 / event 부착
// - 근데, data-component 가 붙어 있는 자식들에 대해서만!
const renderWrapper = (component) => {
  return (targetElement, state, events) => {
    const VDOM = component(targetElement, state, events);

    const VDOMChild = VDOM.querySelectorAll("[data-component]");

    Array.from(VDOMChild).forEach((target) => {
      const name = target.dataset.component;
      const child = registry[name];
      if (!child) {
        return;
      }

      target.replaceWith(child(target, state, events));
    });

    return VDOM;
  };
};

const add = (name, component) => {
  registry[name] = renderWrapper(component);
};

// 전체 페이지 리렌더링
const renderRoot = (root, state, events) => {
  const cloneDOM = (root) => {
    return root.cloneNode(true);
  };
  return renderWrapper(cloneDOM)(root, state, events);
};

export default {
  add,
  renderRoot,
};
