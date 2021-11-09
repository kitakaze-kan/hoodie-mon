import langsDict from './langDict.json';

type KeyType = keyof typeof langsDict;

export const getLangDict = (lang: 'ja' | 'en') => {
  let langDict = {} as { [key in KeyType]: string };

  for (const key in langsDict) {
    langDict = { ...langDict, [key]: langsDict[key as KeyType][lang] };
  }

  return langDict;
};