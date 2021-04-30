import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.counterFunction = this.counterFunction.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      squatArr: JSON.parse(localStorage.getItem('squats')),
      squatCount: 0,
      nextPosition: '',
    };
  }
  handleClick() {
    if (window.confirm('Are you sure you want to quit now?')) {
      console.log('all done');
    } else {
      console.log('keep going');
    }
  }

  componentDidMount() {
    setInterval(this.counterFunction, 1000);
  }
  counterFunction() {
    this.setState({ squatArr: JSON.parse(localStorage.getItem('squats')) });
    let squats = this.state.squatArr;
    let squatCount = this.state.squatCount;
    for (let i = 0; i < squats.length; i++) {
      if (squats[i - 1] === 'down' && squats[i] === 'up') {
        squats = squats.slice(2);
        this.setState({ squatArr: squats });
        this.setState({ squatCount: squatCount + 1 });
        localStorage.setItem('squats', JSON.stringify(squats));
      }
      if (squats[i] === 'up') {
        this.setState({ nextPosition: 'Down' });
      } else if (squats[i] === 'down') {
        this.setState({ nextPosition: 'Up' });
      } else {
        this.setState({ nextPosition: 'Down' });
      }
    }
  }

  render() {
    return (
      <div id="counter-text">
        {this.state.nextPosition ? (
          <p>
            Next Position: <strong>{this.state.nextPosition}</strong>
          </p>
        ) : (
          <p>Please allow camera to analyze position</p>
        )}

        <button id="counter-button" onClick={this.handleClick}>
          {this.state.squatCount}
        </button>
      </div>
    );
  }
}

export default Counter;
