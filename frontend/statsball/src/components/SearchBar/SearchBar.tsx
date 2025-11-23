import React, {useState} from "react";
import { atom } from "recoil";
import style from "./SearchBar.module.scss"
interface SearchBarProps {
  onSearch: (keyword: string, criteria: string) => void;
  criteriaOptions?: CriteriaOption[];
}

interface CriteriaOption {
    label: string;
    value: string;
}

const SearchBar = ({onSearch, criteriaOptions=[{label: "이름", value: "name"}]}: SearchBarProps) => {

    const [keyword, setKeyword] = useState("");
    const [criteria, setCriteria] = useState(criteriaOptions[0].value);

    const handleClick = () => {
        onSearch(keyword, criteria); 
    };

    return (
        <div className={style.header}>
            {criteriaOptions.length>1 && (
                <select 
                value = {criteria}
                onChange={(e) => setCriteria(e.target.value)}>
                    {criteriaOptions.map((opt) => (
                        <option key = {opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            )}
            <input type="text" className={style.playerSearch} id="keyword"
            value = {keyword} onChange={(e) => setKeyword(e.target.value)}/>
            <button type="button" className={style.search} onClick={handleClick}>
                <span>검색</span>
            </button>
        </div>
    )
}

export default SearchBar;