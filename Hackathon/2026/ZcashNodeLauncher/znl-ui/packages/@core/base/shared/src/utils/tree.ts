interface TreeConfigOptions {
  // The name of the sub-property, by default, is 'children'
  childProps: string;
}

interface TreeNode {
  [key: string]: any;
  children?: TreeNode[];
}

/**
 * @zh_CN goes through the tree structure and returns the values specified in all nodes. * @param tree tree structure arrays * @param getValue function to get node values * @param options as optional attribute names for sub-node arrays. * @returns arrays of values specified in all nodes
 */
function traverseTreeValues<T, V>(
  tree: T[],
  getValue: (node: T) => V,
  options?: TreeConfigOptions,
): V[] {
  const result: V[] = [];
  const { childProps } = options || {
    childProps: 'children',
  };

  const dfs = (treeNode: T) => {
    const value = getValue(treeNode);
    result.push(value);
    const children = (treeNode as Record<string, any>)?.[childProps];
    if (!children) {
      return;
    }
    if (children.length > 0) {
      for (const child of children) {
        dfs(child);
      }
    }
  };

  for (const treeNode of tree) {
    dfs(treeNode);
  }
  return result.filter(Boolean);
}

/**
 * Filter the nodes given to the tree structure according to the conditions and return all the arrays matching the nodes in their original order. * @paramree root arrays of tree structures to filter. * @param filterer to match the conditions for each node. * @param options as optional attribute names for sub-node arrays. * @returns contains the arrays matching all nodes.
 */
function filterTree<T extends Record<string, any>>(
  tree: T[],
  filter: (node: T) => boolean,
  options?: TreeConfigOptions,
): T[] {
  const { childProps } = options || {
    childProps: 'children',
  };

  const _filterTree = (nodes: T[]): T[] => {
    return nodes.filter((node: Record<string, any>) => {
      if (filter(node as T)) {
        if (node[childProps]) {
          node[childProps] = _filterTree(node[childProps]);
        }
        return true;
      }
      return false;
    });
  };

  return _filterTree(tree);
}

/**
 * Remaps the section to a given tree structure * @param tree tree to filter the root node arrays of the tree structure. * @param apper for each node in Map. * @param options as optional attribute names for the subnominal arrays.
 */
function mapTree<T, V extends Record<string, any>>(
  tree: T[],
  mapper: (node: T) => V,
  options?: TreeConfigOptions,
): V[] {
  const { childProps } = options || {
    childProps: 'children',
  };
  return tree.map((node) => {
    const mapperNode: Record<string, any> = mapper(node);
    if (mapperNode[childProps]) {
      mapperNode[childProps] = mapTree(mapperNode[childProps], mapper, options);
    }
    return mapperNode as V;
  });
}

/**
 * Construct tree structure * * @paramdata data source * @paramid id field Default 'id' * @param {} parentId parent field Default 'parentId' * @paramchilden child node field Default 'children'
 */
function handleTree(
  data: TreeNode[],
  id: string = 'id',
  parentId: string = 'parentId',
  children: string = 'children',
): TreeNode[] {
  if (!Array.isArray(data)) {
    console.warn('data must be an array');
    return [];
  }
  const config = {
    id,
    parentId,
    childrenList: children,
  };
  const childrenListMap: Record<number | string, TreeNode[]> = {};
  const nodeIds: Record<number | string, TreeNode> = {};
  const tree: TreeNode[] = [];

  // Data pre-processing
  // 1.1 First Excursion, Generate ChildListMap and nodeIDs
  for (const d of data) {
    const pId = d[config.parentId];
    if (childrenListMap[pId] === undefined) {
      childrenListMap[pId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[pId].push(d);
  }
  // 1.2 Second round, find the root point.
  for (const d of data) {
    const pId = d[config.parentId];
    if (nodeIds[pId] === undefined) {
      tree.push(d);
    }
  }

  // 2. Building trees: Recursive construction of sub-nodes
  const adaptToChildrenList = (node: TreeNode): void => {
    const nodeId = node[config.id];
    if (childrenListMap[nodeId]) {
      node[config.childrenList] = childrenListMap[nodeId];
      // Recursive processing of subpoints
      for (const child of node[config.childrenList]) {
        adaptToChildrenList(child);
      }
    }
  };

  // 3. Build complete trees from root nodes
  for (const rootNode of tree) {
    adaptToChildrenList(rootNode);
  }

  return tree;
}

/**
 * Retrieve complete structure of nodes * @param tree tree data * @param nodeId nodeid id
 */
function treeToString(tree: any[], nodeId: number | string) {
  if (tree === undefined || !Array.isArray(tree) || tree.length === 0) {
    console.warn('tree must be an array');
    return '';
  }
  // Verify whether or not to be a level-I node
  const node = tree.find((item) => item.id === nodeId);
  if (node !== undefined) {
    return node.name;
  }
  let str = '';

  function performAThoroughValidation(arr: any[]) {
    if (arr === undefined || !Array.isArray(arr) || arr.length === 0) {
      return false;
    }
    for (const item of arr) {
      if (item.id === nodeId) {
        str += ` / ${item.name}`;
        return true;
      } else if (item.children !== undefined && item.children.length > 0) {
        str += ` / ${item.name}`;
        if (performAThoroughValidation(item.children)) {
          return true;
        }
      }
    }
    return false;
  }

  for (const item of tree) {
    str = `${item.name}`;
    if (performAThoroughValidation(item.children)) {
      break;
    }
  }
  return str;
}

export { filterTree, handleTree, mapTree, traverseTreeValues, treeToString };