import React, { Component } from 'react';
import './CreateForm.css';
import './ToDoListItem.css';
import ToDoListItem from "./ToDoListItem.js"

class CreateForm extends Component {

  // ToDoListをstateに定義、初期値は []
  state = {
    todoList: []
  }

  render() {
    return (
      <div className="CreateForm">
        <form
          className="Create-form"
          onSubmit={e => {
            // formのデフォルトのイベントをキャンセル
            e.preventDefault();

            // idがtitleのElementを取得
            const titleElement = e.target.elements["title"]
            // idがdescriptionのElementを取得
            const descriptionElement = e.target.elements["description"];

            // todoList stateに追加
            this.setState(
              {
                todoList: this.state.todoList.concat({
                  title: titleElement.value,
                  description: descriptionElement.value
                })
              },
              // stateの変更後に入力した値を空にする
              () => {
                titleElement.value = "";
                descriptionElement.value = "";
              }
            )
          }}
        >
          <div>
            <input
              id="title"
              placeholder="施設"
            />
            <textarea
              id="description"
              placeholder="概要"
            />
          </div>
          <div>
            <button
              type="submit"
            >
              追加
            </button>
          </div>
        </form>
        <div>
        {/* todoList配列の要素数分ToDoListItemコンポーネントを展開 */}
          {this.state.todoList.map(todo => (
            <ToDoListItem
              key={todo.title}
              title={todo.title}
              description={todo.description}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default CreateForm;