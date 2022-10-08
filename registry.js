const registry = {};

const renderWrapper = (component) => {
  return (targetElement, state) => {
    const VDOM = component(targetElement, state);

    const VDOMChild = VDOM.querySelectorAll("[data-component]");

    Array.from(VDOMChild).forEach((target) => {
      const name = target.dataset.component;
      const child = registry[name];
      if (!child) {
        return;
      }

      target.replaceWith(child(target, state));
    });

    return VDOM;
  };
};

const add = (name, component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root, state) => {
  const cloneDOM = (root) => {
    return root.cloneNode(true);
  };
  return renderWrapper(cloneDOM)(root, state);
};

export default {
  add,
  renderRoot,
};
