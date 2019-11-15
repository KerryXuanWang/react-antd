import React, { useReducer } from 'react';

import { Button } from 'antd';

import './Counter.scss';

enum ActionType {
  INCREMENT = 'increment',
  DECREMENT = 'decrement',
}

interface IState {
  count: number;
}

interface IAction {
  type: ActionType;
  payload: IState;
}

const initialState: IState = { count: 0 };

const reducer: React.Reducer<IState, IAction> = (state: IState, action: IAction) => {
  switch (action.type) {
    case ActionType.INCREMENT:
      return { count: state.count + action.payload.count };

    case ActionType.DECREMENT:
      return { count: state.count - action.payload.count };

    default:
      throw new Error();
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>
        Count is <strong>{state.count}</strong> now.
      </p>

      <Button
        type="primary"
        onClick={() => dispatch({ type: ActionType.INCREMENT, payload: { count: 1 } })}
      >
        +
      </Button>

      <Button
        type="primary"
        style={{ marginLeft: '20px' }}
        disabled={state.count <= 0}
        onClick={() => dispatch({ type: ActionType.DECREMENT, payload: { count: 1 } })}
      >
        -
      </Button>
    </div>
  );
};

export default Counter;
