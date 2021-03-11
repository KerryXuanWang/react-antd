import React, { useState, createContext, useEffect, Dispatch, SetStateAction } from 'react';

import { cloneDeep } from 'lodash';

import axios from 'axios';

import Search from 'antd/lib/input/Search';

import FamilyTree from '../FamilyTree/FamilyTree';

export interface IFamilyTree {
  name: string;
  children?: IFamilyTree[];
}

export interface IContext {
  treeData: IFamilyTree[];
  setTreeData: Dispatch<SetStateAction<IFamilyTree[]>>;
  sourceData: IFamilyTree[];
  setSourceData: Dispatch<SetStateAction<IFamilyTree[]>>;
}

export const Context: React.Context<IContext> = createContext({} as IContext);

// 广度优先查找
function traverseTreeBFS(node: IFamilyTree, sourceData: IFamilyTree[]) {
  const stack = cloneDeep(sourceData); // 用于存放所有待处理节点

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

const FamilyTreeWrapper: React.FC = () => {
  const [treeData, setTreeData] = useState([] as IFamilyTree[]);
  const [sourceData, setSourceData] = useState([] as IFamilyTree[]);

  async function getData() {
    const res = await axios.get<IFamilyTree[]>('http://localhost:3000/assets/family.json');

    setTreeData(() => res.data);
    setSourceData(() => res.data);
  }

  useEffect(() => {
    getData();
  }, []);

  const onSearch = (name: string) => {
    setTreeData(traverseTreeBFS({ name }, sourceData));
  };

  return (
    <Context.Provider value={{ treeData, setTreeData, sourceData, setSourceData }}>
      <Search onSearch={onSearch} />
      <FamilyTree />
    </Context.Provider>
  );
};

export default FamilyTreeWrapper;
