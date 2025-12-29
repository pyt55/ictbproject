import React, { useRef, useState } from "react";
import style from "./navbar.module.css";
import { NavLink } from "react-router-dom";

const DropDownNav: React.FC = () => {
  // 상태값 t/f
  const [isOpen, setIsOpen] = useState(false);
  //   dom 요소에 접근할 useReft
  const dropdownRef = useRef<HTMLDivElement>(null);
  // toggle이 클릭이될때 usestate의 값을 토글 처리
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${style.link} ${style.active}` : style.link;

  return (
    <div ref={dropdownRef} className={style.dropdown}>
      <div onClick={toggleDropdown} className={style.link}>
        커뮤니티 <span className={style.arrow}> {isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className={style.dropdownContent}>
          <NavLink to="" onClick={closeDropdown} className={linkClass}>
            자유게시판
          </NavLink>
          <NavLink
            to="/community/uplist"
            onClick={closeDropdown}
            className={linkClass}
          >
            UpBoard
          </NavLink>
          <NavLink to="" onClick={closeDropdown} className={linkClass}>
            Memo장
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default DropDownNav;
