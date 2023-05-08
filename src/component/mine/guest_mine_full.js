import axios from "axios";
import React, {useState, useLayoutEffect} from "react";
import { useParams } from "react-router-dom";

import "./mine_full.css";
import bgm from './images/bgm.mp3';
import blop from './images/blop.mp3';
import clear from './images/clear.mp3';
import stage1 from './images/stage1.png';
import stage2 from './images/stage2.png';
import stage3 from './images/stage3.png';
import logo from './images/logo.png';
import cat from './images/cat.png';

function Mine_full(){

    const [b, setB] = useState('');
    const [a, setA] = useState('');
    const [answer1, setanswer1] = useState('');
    const [answer2, setanswer2] = useState('');
    const [answer3, setanswer3] = useState('');
    const [guestid, setguestid] = useState('');

    let params = useParams();

    let mineid = params.id;

    const id = localStorage.getItem("id");

    const close = () => {
        window.location.href = "/guest_mine" + '/qwe46200@naver.com';
    };

    const mineList = async() => {
        const response = await axios.post('http://localhost:3000/minelist', null, { params:{"id":mineid} });

        const c = {};
        for (let i = 0; i < response.data.length; i++) {
            const d = response.data[i];
            c[d.position] = d; 
        }
        setB(c);
    }

    const checkList = () => {

        const yn = {};

        for(let i = 1; i <= 11; i++){
            axios.post("http://localhost:3000/checkmine", null, { params:{ "id":mineid, "position":i} })
            .then(res => {
                if(res.data === "YES"){
                    yn[i] = true;
                }else{
                    yn[i] = false;
                }
                })
                .catch(function(err){
                alert(err);
                }) 
        }

        setA(yn);
    }

    useLayoutEffect(()=>{
        mineList();
        checkList();
    }, []);

    const updateanswer = () => {
        axios.post("http://localhost:3000/updateanswer", null, 
                    { params:{ "userid":guestid, "mineid":mineid, "answer1": answer1, "answer2": answer2, "answer3": answer3 }})
             .then(res => {
                console.log(res.data);
                if(res.data === "YES"){
                    alert("성공적으로 등록되었습니다");
                    window.location.reload();
                }else{
                    alert("등록되지 않았습니다");
                }
             })
             .catch(function(err){
                alert(err);
             }) 
    }


    function gostart(e){

        document.getElementsByClassName("fullchild")[0].style.left = "30px";
        document.getElementsByClassName("fullchild")[0].style.top = "300px";

        document.getElementsByClassName("fullstart")[0].style.visibility = "hidden";
        document.getElementsByClassName("fullvictory")[0].style.visibility = "hidden";

        if (a[9]){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[9].imgtext;
        } else{
            document.getElementsByClassName("fulltextbox")[0].innerHTML = "아래 버튼을 눌러 이동하시거나 키보드 모드로 변경하세요"
        }

        var audio = document.getElementById("audio");
        audio.play();
    }

    function finish(e){
        let leftpx = document.getElementsByClassName("fullchild")[0].style.left;
        let toppx = document.getElementsByClassName("fullchild")[0].style.top;
        let toleft = parseInt(leftpx);
        let totop = parseInt(toppx);
        var blop = document.getElementById("blop");

        if (a[1] && toleft === 80 && totop === 100){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[1].imgtext;
            blop.play();
        }
        if (a[2] && toleft === 180 && totop === 400){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[2].imgtext;
            blop.play();
        }
        if (a[3] && toleft === 280 && totop === 50){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[3].imgtext;
            blop.play();
        }
        if (a[4] && toleft === 380 && totop === 550){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[4].imgtext;
            blop.play();
        }
        if (a[5] && toleft === 480 && totop === 150){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[5].imgtext;
            blop.play();
        }
        if (a[6] && toleft === 580 && totop === 50){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[6].imgtext;
            blop.play();
        }
        if (a[7] && toleft === 680 && totop === 200){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[7].imgtext;
            blop.play();
        }
        if (a[8] && toleft === 780 && totop === 450){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[8].imgtext;
            blop.play();
        }
        if (toleft >= 820 && totop === 300){
            var clear = document.getElementById("clear");
            clear.play();
            document.getElementsByClassName("fullvictory")[0].style.visibility = "visible";
            document.getElementsByClassName("fulltextbox")[0].innerHTML = "MINE!!!"

            setTimeout(function() {
                document.getElementById("fullquestion").style.visibility = "visible";
                document.getElementsByClassName("fulltextbox")[0].innerHTML = mineid + "님이 설정하신 질문에 답변을 제출해주세요."
            }, 3000);
        }
    }

    function goleft(e){
        let leftpx = document.getElementsByClassName("fullchild")[0].style.left;
        let toleft = parseInt(leftpx) - 50;
        if (toleft >= 10){
            document.getElementsByClassName("fullchild")[0].style.left = toleft + "px";
        }
        finish();
    }

    function goright(e){
        let leftpx = document.getElementsByClassName("fullchild")[0].style.left;
        let toright = parseInt(leftpx) + 50;
        if (toright <= 870){
            document.getElementsByClassName("fullchild")[0].style.left = toright + "px";
        }
        finish();
    }

    function goup(e){
        let toppx = document.getElementsByClassName("fullchild")[0].style.top;
        let totop = parseInt(toppx) - 50;
        if (totop >= 10){
            document.getElementsByClassName("fullchild")[0].style.top = totop + "px";
        }
        finish();
    }

    function godown(e){
        let toppx = document.getElementsByClassName("fullchild")[0].style.top;
        let todown = parseInt(toppx) + 50;
        if (todown <= 550){
            document.getElementsByClassName("fullchild")[0].style.top = todown + "px";
        }
        finish();
    }

    function gokey(e){
        document.getElementById("keybutton").focus();
    }

    const handleKeyPress = e => {
        if(e.keyCode === 37) {
            goleft();
        }
        if(e.keyCode === 38) {
            goup();
        }
        if(e.keyCode === 39) {
            goright();
        }
        if(e.keyCode === 40) {
            godown();
        }
      }

    function play(e){
        var audio = document.getElementById("audio");
        audio.play();
    }
    
    function pause(e){
        var audio = document.getElementById("audio");
        audio.pause();
    }

    return (
        <div id="fulltoolbox">
            <button id="close" onClick={close}>X</button>
            <div id="fullgame">
                <div className="fullleft" onClick={goleft}></div>
                <div className="fullup" onClick={goup}></div>
                <div className="fulldown" onClick={godown}></div>
                <div className="fullright" onClick={goright}></div>
                <div className="fullrefresh" onClick={gostart}></div>
                <div className="fullkeybutton" onClick={gokey}></div>
                <div className="fullplay" onClick={play}></div>
                <div className="fullpause" onClick={pause}></div>

                <audio id="audio" src={bgm} />
                <audio id="blop" src={blop} />
                <audio id="clear" src={clear} />

                <div className="fullcontainer">
                    <div className="fullstart" onClick={gostart}></div>
                    <div>
                        { !a[10] && (<img src={stage1} alt="" width="897px" height="597px" />)}
                        { a[10] && (b[10].imgtext === '1' ) && (<img src={stage1} alt="" width="897px" height="597px" />)}
                        { a[10] && (b[10].imgtext === '2' ) && (<img src={stage2} alt="" width="897px" height="597px" />)}
                        { a[10] && (b[10].imgtext === '3' ) && (<img src={stage3} alt="" width="897px" height="597px" />)}
                    </div>

                    <div className="fullchild">
                        { a[9] && (<img src={process.env.PUBLIC_URL + "/img/" + b[9].newfilename} alt="child" width="50px"/>)}
                        { !a[9] && (<img src={cat} alt="cat" width="50px"/>)}
                    </div>
                    <div className="fullportal"></div>
                    <div className="fullvictory"><img src={logo} alt="vic"/></div>
                    <div>
                        {a[1] && (
                        <div className="fullpoint" id="fullfirst"><img src={process.env.PUBLIC_URL + "/img/" + b[1].newfilename} alt="point1" width="40px"/></div>
                        )}
                        {a[2] && (
                        <div className="fullpoint" id="fullsecond"><img src={process.env.PUBLIC_URL + "/img/" + b[2].newfilename} alt="point2" width="40px"/></div>                        
                        )}
                        {a[3] && (
                        <div className="fullpoint" id="fullthird"><img src={process.env.PUBLIC_URL + "/img/" + b[3].newfilename} alt="point2" width="40px"/></div>                        
                        )}
                        {a[4] && (
                        <div className="fullpoint" id="fullfourth"><img src={process.env.PUBLIC_URL + "/img/" + b[4].newfilename} alt="point2" width="40px"/></div>                        
                        )}
                        {a[5] && (
                        <div className="fullpoint" id="fullfifth"><img src={process.env.PUBLIC_URL + "/img/" + b[5].newfilename} alt="point2" width="40px"/></div>                        
                        )}
                        {a[6] && (
                        <div className="fullpoint" id="fullsixth"><img src={process.env.PUBLIC_URL + "/img/" + b[6].newfilename} alt="point2" width="40px"/></div>                        
                        )}
                        {a[7] && (
                        <div className="fullpoint" id="fullseventh"><img src={process.env.PUBLIC_URL + "/img/" + b[7].newfilename} alt="point2" width="40px"/></div>                        
                        )}
                        {a[8] && (
                        <div className="fullpoint" id="fulleight"><img src={process.env.PUBLIC_URL + "/img/" + b[8].newfilename} alt="point2" width="40px"/></div>                        
                        )}                     
                    </div>

                    <div id="fullquestion">
                            {a[11] && (
                                <div>
                                    <div id="fulltextquestion">
                                        방문자 : <input value={guestid} onChange={(e)=>setguestid(e.target.value)}></input><br/><br/>
                                        1. {b[11].filename}
                                        <br/><input value={answer1} onChange={(e)=>setanswer1(e.target.value)}></input><br/><br/>
                                        2. {b[11].newfilename}
                                        <br/><input value={answer2} onChange={(e)=>setanswer2(e.target.value)}></input><br/><br/>
                                        3. {b[11].imgtext}
                                        <br/><input value={answer3} onChange={(e)=>setanswer3(e.target.value)}></input><br/><br/>
                                    </div>
                                    <button onClick={updateanswer}>제출</button>
                                </div>
                            )}
                    </div>
                </div>

                <div className="fulltextbox">Welcome, {id}! START 버튼을 눌러주세요</div>
                <div><input id="keybutton" onKeyDown={handleKeyPress} /></div>
            </div>
        </div>
    )
}

export default Mine_full;