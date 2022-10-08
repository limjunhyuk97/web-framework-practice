async function getLanguage(target = "") {
  try {
    const data = await fetch(
      `https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword=${target}`
    );
    return data.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

export { getLanguage };
