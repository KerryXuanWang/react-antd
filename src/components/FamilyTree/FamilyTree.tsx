import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

import axios from 'axios';

import { cloneDeep } from 'lodash';

import { v4 as uuidv4 } from 'uuid';

import './FamilyTree.scss';

export interface IFamilyTree {
  name: string;
  children?: IFamilyTree[];
}

export interface IContext {
  treeData: IFamilyTree[];
  setTreeData: Dispatch<SetStateAction<IFamilyTree[]>>;
}

const Context: React.Context<IContext> = createContext({} as IContext);
let SOURCE_DATA: IFamilyTree[];

// 深度优先删除
function traverseTreeDFS(node: IFamilyTree, stack: IFamilyTree[]) {
  if (!node || !node.name) {
    return;
  }

  const len = stack.length;

  for (let i = 0; i < len; i++) {
    const tmpNode = stack[i];
    if (tmpNode.name === node.name) {
      // 直接操作原数组
      stack.splice(i, 1);
      return;
    } else if (tmpNode.children && tmpNode.children.length) {
      traverseTreeDFS(node, tmpNode.children);
    }
  }
}

// 广度优先查找
function traverseTreeBFS(node: IFamilyTree) {
  const stack = cloneDeep(SOURCE_DATA); // 用于存放所有待处理节点

  if (!node || !node.name) {
    return stack;
  }

  const result = []; // 存放遍历后的结果
  let tmpNode: IFamilyTree; // 当前正在被处理的节点

  while (stack.length) {
    tmpNode = stack.shift() as IFamilyTree;
    if (tmpNode.name === node.name) {
      result.push(tmpNode);
    }
    if (tmpNode.children && tmpNode.children.length) {
      tmpNode.children.map((item) => stack.push(item));
    }
  }

  return result;
}

function LoopTree(arr: IFamilyTree[] | undefined) {
  // const { treeData, setTreeData } = useContext(Context);

  if (!Array.isArray(arr)) {
    return null;
  }

  return arr.map((obj) => {
    const res = [];
    const { name, children } = obj;

    // const handleClick = (val: string, e: any) => {
    //   traverseTreeDFS({ name: val }, treeData);
    //   setTreeData([...treeData]);
    // };

    if (!children) {
      res.push(
        <div key={uuidv4()}>
          {name}
          {/* <img src={image} className="delete" onClick={(e) => handleClick(name, e)} /> */}
        </div>,
      );
    } else {
      res.push(
        <React.Fragment key={uuidv4()}>
          <div>
            {name}
            {/* <img src={image} className="delete" onClick={(e) => handleClick(name, e)} /> */}
          </div>
          <div className="siblings">{LoopTree(children)}</div>
        </React.Fragment>,
      );
    }

    return (
      <div key={uuidv4()} className="container">
        {res}
      </div>
    );
  });
}

const FamilyTree: React.FC = () => {
  const [treeData, setTreeData] = useState(SOURCE_DATA);

  async function getData() {
    const res = await axios.get<IFamilyTree[]>('http://localhost:3000/assets/family.json');

    SOURCE_DATA = res.data;
    setTreeData(SOURCE_DATA);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Context.Provider value={{ treeData, setTreeData }}>
      <div className="FamilyTree">
        {treeData &&
          treeData.map((o) => {
            return (
              <div key={uuidv4()} className="siblings">
                <div className="container">
                  <div>{o.name}</div>
                  <div className="siblings">{LoopTree(o.children)}</div>
                </div>
              </div>
            );
          })}
      </div>
    </Context.Provider>
  );
};

export default FamilyTree;
