export interface IScriptureSearch {
  bibleVerse:string;
}

export interface IScriptureSearchResult{
  data: IData;
  meta: IMeta;

}

interface IData{
  passages: IPassages[];
}

interface IPassages{
  id: string;
  orgId:string;
  bibleId:string;
  bookId:string;
  chapterIds: string[];
  reference: string;
  content: string;
  verseCount: number;
  copyright: string
}

interface IMeta{
  fums: string;
  fumsId: string;
  fumsJsInclude: string;
  fumsJs: string;
  fumsNoScript: string;
}
