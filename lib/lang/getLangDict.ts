import langsDict from './langDict.json';

// 翻訳ファイルのキーの型を取得
type KeyType = keyof typeof langsDict;

export const getLangDict = (lang: 'ja' | 'en') => {
  // 引数の言語に絞った翻訳情報を格納する変数
  let langDict = {} as { [key in KeyType]: string };

  for (const key in langsDict) {
    langDict = { ...langDict, [key]: langsDict[key as KeyType][lang] };
  }

  return langDict;
};