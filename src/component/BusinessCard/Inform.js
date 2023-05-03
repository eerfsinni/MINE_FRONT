import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


import "./card.css";

function Inform() {
  let history = useNavigate();

  const[businessList, setBusinessList] = useState([]);
  const[thumbnail, setThumbnail] = useState();

  function business() {
    axios.get("http://localhost:3000/businesscard", {params:{}})
         .then(function(resp){
          //  console.log(resp.data.list);
          setBusinessList(resp.data.list);
         })
         .catch(function(err){
            alert("정보를 불러오지 못했습니다.");
         })
  }


  useEffect(function(){
    business();
  },[]);
  

  return(
    <div className="middle">
      {//글정보
          businessList.map(function(business, idx){
            return(
              <div className="middle" key={{idx}}>
                <div style={{position: "relative", backgroundColor:"#9CA8F0", marginTop:"150px", height:"600px", width:"900px"}} /*명함틀*/ />
                <div style={{float:"left", position:"relative", marginLeft:"-800px", marginTop:"20px"}}>
                 
                    <form name="frm" encType="multipart/form-data">
                      <img src={`/Business-img/${business.thumbnail}`} alt="프로필 이미지" style={{width:"200px"}} />    
                      <br/>
                    </form>
                </div>
                {/* 글정보 및 버튼 */}
                <div style={{position: "relative", marginTop:"150px", marginLeft:"-200px", fontSize:"20px"}}>

                  <div style={{ float:"left", marginLeft:"300px", marginTop:"0px"}}>
                      <div value={business.introduce} style={{backgroundColor:"white", textAlign:"center", padding:"10px"}}>
                        <h3>소개글</h3>
                        <div>{business.introduce}</div>
                      </div>
                      <br/>
                      <div>
                        <span>이름: {business.name}</span>
                      </div>
                      <br/>
                      <div>
                        <span>
                          URL: <Link to={business.url}> {business.url} </Link>
                        </span>
                      </div>
                  </div>
                  
                  <div style={{marginLeft:"250px", marginBottom:"0px", marginTop:"350px"}}>
                    <Link to={`/informDetail/${business.id}`}>
                      <button style={{backgroundColor:"rgb(255, 227, 71)", fontSize:"20px", padding:"10px", width:"200px"}}>
                        상세보기
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
      }
      </div>
  )
}
export default Inform;