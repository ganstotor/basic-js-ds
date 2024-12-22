const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.treeRoot) {
      this.treeRoot = newNode;
      return;
    }
    let current = this.treeRoot;
    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let current = this.treeRoot;
    while (current) {
      if (data === current.data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (!node) return null;
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
        return node;
      }
    };
    this.treeRoot = removeNode(this.treeRoot, data);
  }

  min() {
    if (!this.treeRoot) return null;
    let current = this.treeRoot;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this.treeRoot) return null;
    let current = this.treeRoot;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};