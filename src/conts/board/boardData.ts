//boardData.ts
//오라클이면
//테이블 board
//입력 쿼리 : insert into board values(board_seq.nextVal,title,writer,content)
export interface BoardItem {
  id: number;
  title: string;
  writer: string;
  content: string;
}
// [{id:1,title:'테스'},{},...] = 31개가 들어 갈것이다.
// export const boardList : BoardItem[] = Array.from({length:31},(_,i) =>(
//     {
//         id:i+1,
//         title:`테스형이 작성한 글 ${i+1}`,
//         writer:`테스형${i+1}`,
//         content: `테스형님이 작성한 글 ${i + 1} 임`,
//     }
// ));
//localStorage에서 저장된 게시판의 리스트를 자바스크립트 배열로 변환 시킴.
//JSON.parse() : json(문자열) => 자바스크립트 객체로 변환 *****
//JSON.stringify() : JSON.parse() 반대 즉, 자바스크립트 -> JSON *****
//localStorage.getItem('boardList')가 null일 경우 빈 배열 문자열 '[]'을 대신 파싱
export const boardList: BoardItem[] = JSON.parse(
  localStorage.getItem("boardList") || "[]"
);
