import React from "react";

class TimerToDoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: 1,
      minutes: 60,
      seconds: 60,
      input: "",
      todo: [],
    };
    this.changeValue = this.changeValue.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete= this.handleDelete.bind(this);
  }

  handleDelete(e){
      console.log(e.target.getAttribute('key'))
  }

  changeValue(e) {
    this.setState({ input: e.target.value });
  }

  handleAdd() {
    this.setState((state) => {
      const currentValue = state.input;
      return { input: "", todo: [...state.todo, currentValue] };
    });
  }

  componentDidMount() {
    this.myTimer = setInterval(() => {
      if (this.state.hours !== 0) {
        if (this.state.minutes === 0) {
          this.setState({ minutes: 60, hours: this.state.hours - 1 });
        }
        if (this.state.seconds === 0) {
          this.setState({ seconds: 60, minutes: this.state.minutes - 1 });
        }
        
      } else {
        console.log("called");
        clearInterval(this.myTimer);
      }
      this.setState({ seconds: this.state.seconds - 1 });
    }, 1000);
  }

  // componentWillMount() {
  //     clearInterval(this.myTimer);
  // }

  render() {
    return (
      <div>
        <div className="container">
          {this.state.hours !== 0 && (
            <h1 className="h1">
              {this.state.hours} : {this.state.minutes} : {this.state.seconds}
            </h1>
          )}
          <div>
            <div className="input-group">
              <input
                className="form-control"
                value={this.state.input}
                onChange={this.changeValue}
              ></input>
              <span className="input-group-append add">
                <button
                  className="btn btn-outline-success"
                  onClick={this.handleAdd}
                >
                  Add
                </button>
              </span>
            </div>
          </div>
          <table className="table table-hover">
            <tbody>
              {this.state.todo.map((message, idx) => {
                return message !== "" ? (
                  <tr >
                    <td>{message}</td>
                    <td>
                      <button className="btn btn-primary" >Edit</button>
                      <button className="btn btn-info" key={idx.toString()} onClick={this.handleDelete}>Delete</button>
                    </td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TimerToDoList;
