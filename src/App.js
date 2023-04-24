import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


import Me from "./component/Me/Me";
import DiaryWrite from "./component/Me/DiaryWrite";
import TodoWrite from './component/Me/TodoWrite';
import DiaryUpdate from './component/Me/DiaryUpdate';
import TodoUpdate from './component/Me/TodoUpdate';

import Card from "./component/BusinessCard/Card";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/me">me</Link>
        <Link to="/card">온라인 명함</Link>
        
        <Routes>
          <Route path="/me" element={<Me></Me>}/>
          
          <Route path="/diaryWrite/:rdate" element={<DiaryWrite/>}/>
          <Route path="/todoWrite/:rdate" element={<TodoWrite/>}/>
          
          {/* 
              - 요소만 그대로 냅두고, 경로를 내가 설정한 경로로 지정하면 페이지 이동없이 가능 
              - 여기서 보내주는 매개변수를 useparam을 사용해서 받을 수 있음
          */}
          <Route path="/me/:rdate" element={<Me/>}/> 
          <Route path="/me/:year/:month" element={<Me/>}/> 


          <Route path="/diaryUpdate/:seq/:title/:content/:rdate" element={<DiaryUpdate/>}/>
          <Route path="/todoUpdate/:seq/:title/:content/:rdate" element={<TodoUpdate/>}/>


          <Route path="/card" element={<Card></Card>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
