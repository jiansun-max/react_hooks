import React, { useState, useCallback, useEffect } from "react";

const set = new Set();
export const Search: React.FC = () => {
  const [kw, setKw] = useState("");

  const onKwChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.currentTarget.value);
  }, []);

  set.add(onKwChange);
  console.log(set.size);

  return (
    <>
      <input type="text" value={kw} onChange={onKwChange} />
      <hr />
      <p>{kw}</p>
    </>
  );
};

// -----------

type SearchInputType = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
type WordType = { id: number; word: string };

export const SearchBox: React.FC = () => {
  const [kw, setKw] = useState("");

  const onKwChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.currentTarget.value);
  }, []);

  return (
    <>
      {/* 搜索框组件 */}
      <SearchInput onChange={onKwChange} />
      <hr />
      {/* 搜索结果组件 */}
      <SearchResult query={kw} />
    </>
  );
};

const SearchInput: React.FC<SearchInputType> = React.memo((props) => {
  useEffect(() => {
    console.log("SearchInput 组件被渲染了");
  });

  return <input type="text" onChange={props.onChange} />;
});

const SearchResult: React.FC<{ query: string }> = (props) => {
  const [list, setList] = useState<WordType[]>([]);

  useEffect(() => {
    if (!props.query) return setList([]);
    fetch("https://api.liulongbin.top/v1/words?kw=" + props.query)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setList(res.data);
      });
  }, [props.query]);

  return (
    <>
      {list.map((item) => (
        <p key={item.id}>{item.word}</p>
      ))}
    </>
  );
};
