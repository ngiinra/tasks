export function showSomeOfText(text: string, charactersCount: number = 90) {
  if (text.length > charactersCount) {
    let textArr = text.split("");
    textArr = textArr.slice(0, charactersCount);
    let res = textArr.join("");
    return res.concat(" ...");
  } else {
    return text;
  }
}
