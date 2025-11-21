export default function SearchBox(props) {
  // 입력값이 변경될 때 실행되는 함수
  function handleChange(e) {
    console.log(e.target.value);
    props.setSearchValue(e.target.value);
  }
  return (
    <div className="col col-sm-4">
      <input
        value={props.searchValue}
        onChange={handleChange}
        className="form-control"
        placeholder="영화 검색..."
      ></input>
    </div>
  );
}
