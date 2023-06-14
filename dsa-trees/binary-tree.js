/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if(!this.root) return 0;

    function minDepth(node) {
      if(node.left === null && node.right === null) return 1;
      if(node.right === null) return minDepth(node.right) + 1;
      if(node.right === null) return minDepth(node.left) + 1;
      return (Math.min(minDepth(node.left), minDepth(node.right)) + 1
      );
    }
    return minDepth(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if(!this.root) return 0;

    function maxDepth(node) {
      if(node.left === null) return maxDepth(node.right) + 1;
      if(node.left === null) return maxDepth(node.right) + 1;
      if(node.right === null) return maxDepth(node.left) + 1;
      return (
        Math.max(maxDepth(node.left), maxDepth(node.right)) + 1
      );
    }
    return maxDepth(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = 0;

    function maxSum(node) {
      if(node === null) return 0;
      const leftSum = maxSum(node.left);
      const rightSum = maxSum(node.right);
      result = Math.max(result, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    maxSum(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let queue = [this.root];
    let closest = null;

    while(queue.length) {
      let currentNode = que.shift();
      let currentVal = currentNode.val;
      let higherThanLowerBound = currentVal > lowerBound;
      let ReassignClosest = currentVal < closest || closest === null;

      if(higherThanLowerBound && ReassignClosest) {
        closest = currentVal;
      }

      if(currentNode.left) queue.push(currentNode.left);
      if(currentNode.right) queue.push(currentNode.right);
    }
    return closest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if(node1 === this.root || node2 === this.root) return false;

    function findLevelAndParent(
      nodeToFind,
      currentNode,
      level = 0,
      data = { level: 0, parent: null }
    ) {
      if(data.parent) return data;
      if(currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
        data.level = level + 1;
        data.parent = currentNode;
      }
      if(currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
        data.level = level + 1;
        data.parent = currentNode;
      }
      if(currentNode.left) {
        findLevelAndParent(nodeToFind, currentNode.left, level + 1, data);
      }
      if(currentNode.right) {
        findLevelAndParent(nodeToFind, currentNode.right, level + 1, data);
      }
      return data;
    }
    let nodeOne = findLevelAndParent(node1, this.root);
    let nodeTwo = findLevelAndParent(node2, this.root);

    let sameLevel = 
      nodeOne && nodeTwo && nodeOne.level === nodeTwo.level;
    let differentParent = 
      nodeOne && nodeTwo && nodeOne.level !== nodeTwo.level;
    return sameLevel && differentParent;
      
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const values = [];

    function traverse(node) {
      if(node) {
        values.push(node.val);
        traverse(node.left);
        traverse(node.right);
      } else {
        values.push("#");
      }
    }
    traverse(tree.root);
    return values.join(" ");
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    if (!stringTree) return null;

    const values = stringTree.split(" ");

    function buildTree() {
      // building a tree starting from the beginning of the array
      if (values.length) {
        const currentVal = values.shift();

        if (currentVal === "#") return null;

        // remember to convert values back into numbers
        let currentNode = new BinaryTreeNode(+currentVal);
        currentNode.left = buildTree();
        currentNode.right = buildTree();

        return currentNode;
      }
    }

    const root = buildTree();
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2, currentNode=this.root) {
     // base case 1: empty tree
     if (currentNode === null) return null;

     // base case 2: root is one of the target nodes
     if (currentNode === node1 || currentNode === node2) return currentNode;
 
     // recursively search the left sub-tree
     const left = this.lowestCommonAncestor(node1, node2, currentNode.left);
 
     // recursively search the right sub-tree
     const right = this.lowestCommonAncestor(node1, node2, currentNode.right);
 
     // if neither left nor right is null, currentNode is the ancestor
     if (left !== null && right !== null) return currentNode;
     
     // if one node is not null, return it
     if (left !== null || right !== null) return left || right;
     
     // left and right are both null, return null
     if (left === null && right === null) return null;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
