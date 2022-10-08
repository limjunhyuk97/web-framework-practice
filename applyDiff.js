// node가 변화되었는지 안되었는지에 대한 것을 감지하는 코드
const isNodeChanged = (node1, node2) => {
  // node의 attribute들을 나열
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;

  //*  어트리뷰트 노드 비교 */
  // 속성 수가 다르면 일단 참이라고 (다르다!)
  if (n1Attributes.length !== n2Attributes.length) {
    return true;
  }

  // 다른 속성이 있다면..
  const differentAttribute = Array.from(n1Attributes).find((attribute) => {
    const { name } = attribute;
    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);

    return attribute1 !== attribute2;
  });

  // 다른 속성이 있다면 참(다르다!)
  if (differentAttribute) {
    return true;
  }

  //* 만약 자식요소가 없다면 텍스트 노드 비교 */
  // 텍스트가 다르다면 참(다르다!)
  if (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  }

  // 속성 수 같고, 속성 모두 같고 + 자식요소 있는데 텍스트 노드까지 같다면 거짓(같다!)
  return false;
};

// 트리 구조의 변화 비교 -> 변화를 바탕으로 DOM 트리에서 노드들을 변경하거나 삭제한다.
const applyDiff = (parentNode, realNode, virtualNode) => {
  // 실제노드O , 가상노드X -> 실제노드 제거
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }

  // 실제노드X, 가상노드O -> document에 가상노드 반영
  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  // 실제노드에서 가상노드로의 변화가 있었다면 -> 실제 노드를 가상노드로 변경
  if (isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  // 모든 하위 노드들에 대해서 비교를 수행하여
  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  // 자식들에 대해서 applyDiff를 재귀적으로 수행
  const max = Math.max(realChildren.length, virtualChildren.length);
  for (let i = 0; i < max; i++) {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default applyDiff;
