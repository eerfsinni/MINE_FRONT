import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

function I_detail() {

  let params = useParams();
  const movePage = useNavigate();
  const [detList, setDetList] = useState([]);

  // 데이터 불러오기
  const detailData = async () => {
    const resp = await axios.get("http://localhost:3000/i_detail", { params: { "id": params.id, "classify": params.classify } });

    console.log(resp);
    setDetList(resp.data);
  }

  useEffect(() => {
    detailData()
  }, []);

  // 데이터 테이블에 담기
  function TableRow(props) {
    if (props.obj.item === "") {
      return;
    }
    return (
      <tr>
        <td>{props.obj.item}</td>
        <td>{props.obj.detail}</td>
      </tr>
    );
  }

  // 삭제
  function i_del() {
    axios.get('http://localhost:3000/i_del', { params: { "id": params.id, "classify": params.classify } })
      .then(function (resp) {
        if (resp.data === 'i_del_OK') {
          alert("'" + params.classify + "'" + " 항목이 삭제되었습니다.");
          movePage('/i');
        }
      })
      .catch(function (err) {
        alert(err);
      })
  }

  return (
    <div>
      {params.classify}
      <table border="1">
        <colgroup>
          <col width="200px" /><col width="200px" />
        </colgroup>
        <thead>
          <tr>
            <td colSpan="2"><input placeholder="분류 내용 입력" style={{ width: "400px" }} defaultValue={params.classify} /></td>
          </tr>
        </thead>
        <tbody>
          {
            detList.map(function (object, i) {
              return (
                <TableRow obj={object} key={i} cnt={i + 1} />
                /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
              )
            })
          }
        </tbody>
      </table>
      <Link to={`/i_update/${params.id}/${params.classify}`}>
        <button>수정</button>
      </Link>
      <button onClick={i_del}>삭제</button>
    </div>
  );
}

export default I_detail;