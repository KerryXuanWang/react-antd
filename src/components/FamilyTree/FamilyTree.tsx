import React, { useContext } from 'react';

import { isArray } from 'lodash';

import { Context, IFamilyTree } from '../FamilyTreeWrapper/FamilyTreeWrapper';

import './FamilyTree.scss';

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

function LoopTree(trees: IFamilyTree[] | undefined) {
  const { treeData, setTreeData, sourceData, setSourceData } = useContext(Context);

  if (!isArray(trees)) {
    return null;
  }

  const image = './assets/times-circle-solid.svg';

  return trees.map((obj, index) => {
    const res = [];
    const { name, children } = obj;

    const handleClick = (val: string) => {
      traverseTreeDFS({ name: val }, treeData);
      traverseTreeDFS({ name: val }, sourceData);
      setTreeData([...treeData]);
      setSourceData([...sourceData]);
    };

    if (!children) {
      res.push(
        <div key={`siblings-${name}`}>
          {name}
          <img src={image} className="delete" onClick={(e) => handleClick(name)} />
        </div>,
      );
    } else {
      res.push(
        <React.Fragment key={`siblings-${name}`}>
          <div>
            {name}
            <img src={image} className="delete" onClick={(e) => handleClick(name)} />
          </div>
          <div className="siblings">{LoopTree(children)}</div>
        </React.Fragment>,
      );
    }

    return (
      <div key={`container-loop-${index}`} className="container">
        {res}
      </div>
    );
  });
}

const FamilyTree: React.FC = () => {
  const { treeData } = useContext(Context);

  return (
    <div className="FamilyTree">
      {treeData.map((o) => {
        return (
          <div key={`siblings-${o.name}`} className="siblings">
            <div className="container">
              <div>{o.name}</div>
              <div className="siblings">{LoopTree(o.children)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FamilyTree;
