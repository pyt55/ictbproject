//conts/member/MyPage.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../comp/AuthProvider";
import axios from "axios";

const MyPage: React.FC = () => {
  const { member } = useAuth();
  const [members, setMembers] = useState<any[]>([]); // 친구 추천 목록
  const [selected, setSelected] = useState<Set<string>>(new Set()); // 선택된 친구 신청 대상
  const [incoming, setIncoming] = useState<any[]>([]); // 받은 친구 요청
  const [friends, setFriends] = useState<any[]>([]); // 내 친구 목록
  const [outgoing, setOutgoing] = useState<any[]>([]); // 보낸 친구 요청
  const [rejected, setRejected] = useState<Set<string>>(new Set()); // 거절된 요청 ID 모음
  const [refresh, setRefresh] = useState(0);
  // 로그인된 사용자가 확인되면 친구 관련 데이터들을 불러온다
  useEffect(() => {
    if (!member) return;
    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/api/friends/members`, {
        withCredentials: true,
      })
      .then((res) => setMembers(res.data));
    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/api/friends/incoming`, {
        withCredentials: true,
      })
      .then((res) => setIncoming(res.data));
    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/api/friends/myfriends`, {
        withCredentials: true,
      })
      .then((res) => setFriends(res.data));
    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/api/friends/outgoing`, {
        withCredentials: true,
      })
      .then((res) => {
        setOutgoing(res.data);
        const rejectedSet: Set<string> = new Set(
          res.data
            .filter((r: any) => r.status === "rejected")
            .map((r: any) => r.receiver_id as string)
        );
        setRejected(rejectedSet);
      });
  }, [member, refresh]); //refresh가 바뀌면 다시 fetch 하겠다.

  // 친구 신청 및 삭제 토글을 처리할 함수 : 체크박스를 클릭할 때 선택된 유저 ID를 Set 구조로 토글(있으면 제거, 없으면 추가) 하기
  // 체크박스에 선택된 친구 신청 대상을 저장하기 위한 Set구조의 useState 에 저장한다.
  const toggleFriendSelect = (userid: string) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      //현재 선택된 Set 안에 userid가 이미 있는지 확인 해서 이미 있다면 (true)
      //newSet.delete(userid)가 실행이 되어서  체크 해제: 선택 목록에서 제거
      // 만약 없다면 (false) : newSet.add(userid)를 실행해서  체크: 선택 목록에 추가
      newSet.has(userid) ? newSet.delete(userid) : newSet.add(userid);
      return newSet;
    });
  };
  // 체크 박스에서 선택한 회원에게 친구 요청을  전송한다.
  const sendRequest = async () => {
    for (const receiverId of selected) {
      await axios.post(
        `${process.env.REACT_APP_BACK_END_URL}/api/friends/request`,
        { receiverId },
        { withCredentials: true }
      );
    }
    alert("친구 신청 완료");
    setSelected(new Set());
    setRefresh((prev) => prev + 1);
  };
  //수락 및 거절 버튼을 클릭 하면 respond 로 보내서 쳐리함
  const receiveResponse = async (id: number, action: string) => {
    await axios.post(
      `${process.env.REACT_APP_BACK_END_URL}/api/friends/respond`,
      { id, action },
      { withCredentials: true }
    );
    alert(`${action === "accept" ? "수락" : "거절"} 처리됨`);
    window.location.reload();
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>{member?.name}님의 마이페이지</h2>
      <h3>친구 추천 목록</h3>
      <ul>
        {members
          .filter((m) => !friends.find((f) => f.userid === m.userid))
          .filter(
            (m) =>
              !outgoing.find(
                (o) => o.receiver_id === m.userid && o.status === "pending"
              )
          )
          .map((m) => (
            <li key={m.userid}>
              <input
                type="checkbox"
                checked={selected.has(m.userid)}
                onChange={() => toggleFriendSelect(m.userid)}
                disabled={
                  !rejected.has(m.userid) &&
                  outgoing.find((o) => o.receiver_id === m.userid)
                }
              />
              {m.name} ({m.userid})
              {rejected.has(m.userid) && (
                <span style={{ color: "red", marginLeft: 5 }}>
                  거절됨 (재요청 가능)
                </span>
              )}
            </li>
          ))}
      </ul>
      <button onClick={sendRequest} disabled={selected.size === 0}>
        친구 신청
      </button>{" "}
      <hr />
      <h3>받은 친구 요청</h3>
      <ul>
        {incoming.map((req) => (
          <li key={req.id}>
            {req.requester_id} 님이 친구 요청을 보냈습니다.
            <button onClick={() => receiveResponse(req.id, "accept")}>
              수락
            </button>
            <button onClick={() => receiveResponse(req.id, "reject")}>
              거절
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <h3>내 친구 목록</h3>
      <ul>
        {friends.map((f) => (
          <li key={f.userid}>
            {f.name} ({f.userid})
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MyPage;
