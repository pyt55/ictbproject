//Ex1_LocalStorage.tsx

import React, { useEffect, useState } from 'react'

const Ex1_LocalStorage: React.FC = () => {
    const [msg, setMsg] = useState('');

    const [msg2, setMsg2] = useState<string | null>('');

    const [storedMsg, setStoredMsg] = useState<string | null>("")
    const saveLocalStorage = () => {
          localStorage.setItem("msg",msg);
          setStoredMsg(msg);
    };

    const deleteLocalStorage = () => {
          localStorage.removeItem("msg");
          setStoredMsg(null);
    };
    useEffect(()=>{
            setMsg2(localStorage.getItem("msg"));
        },[])  
      

    return (
    <div>
        <input type="text" name="msg" id="msg" 
        onChange={e => setMsg(e.target.value)}/>
        <button onClick={saveLocalStorage}>Save</button>
        <button onClick={deleteLocalStorage}>Delete</button>
        <p>usesatat 에 저장된 값: {storedMsg}</p>
        <p>로컬 스토리지에 저장된값: { msg2}</p>
    </div>
  )
}

export default Ex1_LocalStorage