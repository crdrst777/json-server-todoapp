import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [todoList, setTodoList] = useState([]);
  const handleSubmit = () => {
    axios
      .post('http://localhost:3333/todos', {
        text,
        isCompleted: false,
      })
      .then((data) => {
        alert(data.text + '이 추가되었습니다.');
        // setText('');
      });
  };
  const readList = async () => {
    const { data } = await axios.get('http://localhost:3333/todos');
    setTodoList(data);
  };

  readList(); // 데이터를 가져와서 보여준다.

  const toggleCompleteBtn = (id, isCompleted) => {
    axios
      .patch(`http://localhost:3333/todos/${id}`, {
        isCompleted: !isCompleted,
      })
      .then(readList())
      .catch((error) => console.log(error));
  }; // PATCH는 넘겨준 데이터만 변경되고 기존 데이터는 유지된다.
  // 해당 아이디를 받아 isCompleted 부분만 반대로 바꿔준다.
  const deleteTodoBtn = (id) => {
    axios
      .delete(`http://localhost:3333/todos/${id}`)
      .then(readList())
      .catch((error) => console.log(error));
  }; // 해당 아이디를 받아서 삭제할 수 있도록 한다.
  return (
    <div>
      <h1>TODO APP</h1>
      <div>
        <h2>추가하기</h2>
        <input
          placeholder='할 일'
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSubmit}>추가하기</button>
        <br />
        <h2>할 일 목록</h2>
        <ul>
          {todoList.map((todo) => (
            <div key={todo.id}>
              <li key={todo.id}>{todo.text}</li>
              <button
                onClick={() => toggleCompleteBtn(todo.id, todo.isCompleted)}
              >
                {todo.isCompleted ? '완료' : '미완료'}
              </button>

              <button onClick={() => deleteTodoBtn(todo.id)}>삭제하기</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
