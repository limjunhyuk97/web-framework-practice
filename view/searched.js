const getSearchedList = (result) => {
  const { text, suggested } = result;

  return `
    <li class="${suggested ? "Suggestion__items--selected" : ""}">${text}</li>
  `;
};

export default (targetElement, { searchResult }) => {
  targetElement.style.border =
    searchResult.length === 0 ? "none" : "1px solid black";
  const newSearchedList = targetElement.cloneNode(true);
  const searchedElements = searchResult.map(getSearchedList).join("");
  newSearchedList.innerHTML = searchedElements;
  return newSearchedList;
};
