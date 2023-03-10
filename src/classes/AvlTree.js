import BinarySearchTreeNode from "./AvlTreeNode";
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new BinarySearchTreeNode(value);
    if (this.root === null){
      this.root = newNode;
    }
    else {
      this.insertNode(this.root, newNode);
    }

    // Move up to the root and check balance factors along the way.
    let currentNode = this.find(this.root, value);
    while (currentNode) {
      this.balance(currentNode);
      currentNode = currentNode.parent;
    }
  }

  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null){
        node.setLeft(newNode);
      }
      else {
        this.insertNode(node.left, newNode);
      }
    }
    else if (newNode.value > node.value) {
      if (node.right === null){
        node.setRight(newNode);
      }
      else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);

    if(this.root){
      this.balance(this.root);
    }
  }

  deleteNode(node, value) {
    if (node === null){
      return null;
    }
    else if (value < node.value) {
      node.setLeft(this.deleteNode(node.left, value));
      return node;
    } else if (value > node.value) {
      node.setRight(this.deleteNode(node.right, value));
      return node;
    } else {
        if (node.left === null && node.right === null) { //node to be deleted is the leaf node
            node = null;
            return node;
        }
        else if ((node.left === null) || (node.right === null)){ // only one child for the node to be deleted
          if (node.left === null) {
            node = node.right;
            return node;
          } else {
            node = node.left;
            return node;
          }
        }

        else { // two children for the node to be deleted
          let temp = this.findSmallestNode(node.right);
          node.value = temp.value;

          node.setRight(this.deleteNode(node.right, temp.value));
          return node;
        }
    }
  }

  findSmallestNode(node) {
    if (node.left === null){
      return node;
    }
    else {
      return this.findSmallestNode(node.left);
    }
  }

  balance(node) {
    if (node.balanceFactor() > 1) {
      if (node.left.balanceFactor() > 0) {
        this.rotateLeftLeft(node);
      } else if (node.left.balanceFactor < 0) {
        this.rotateLeftRight(node);
      }
    } else if (node.balanceFactor() < -1) {
      if (node.right.balanceFactor() < 0) {
        this.rotateRightRight(node);
      } else if (node.right.balanceFactor() > 0) {
        this.rotateRightLeft(node);
      }
    }
  }

  rotateLeftLeft(rootNode) {
    const leftNode = rootNode.left;
    rootNode.setLeft(null);
    if (rootNode.parent) {
      rootNode.parent.setLeft(leftNode);
    } else if (rootNode === this.root) {
      this.root = leftNode;
    }
    if (leftNode.right) {
      rootNode.setLeft(leftNode.right);
    }
    leftNode.setRight(rootNode);
  }

  rotateLeftRight(rootNode) {
    const leftNode = rootNode.left;
    rootNode.setLeft(null);

    const leftRightNode = leftNode.right;
    leftNode.setRight(null);

    if (leftRightNode.left) {
      leftNode.setRight(leftRightNode.left);
      leftRightNode.setLeft(null);
    }

    rootNode.setLeft(leftRightNode);
    leftRightNode.setLeft(leftNode);

    this.rotateLeftLeft(rootNode);
  }

  rotateRightLeft(rootNode) {
    const rightNode = rootNode.right;
    rootNode.setRight(null);

    const rightLeftNode = rightNode.left;
    rightNode.setLeft(null);

    if (rightLeftNode.right) {
      rightNode.setLeft(rightLeftNode.right);
      rightLeftNode.setRight(null);
    }

    rootNode.setRight(rightLeftNode);
    rightLeftNode.setRight(rightNode);
    this.rotateRightRight(rootNode);
  }

  rotateRightRight(rootNode) {
    const rightNode = rootNode.right;
    rootNode.setRight(null);

    if (rootNode.parent) {
      rootNode.parent.setRight(rightNode);
    } else if (rootNode === this.root) {
      this.root = rightNode;
    }

    if (rightNode.left) {
      rootNode.setRight(rightNode.left);
    }

    rightNode.setLeft(rootNode);
  }

  traverseInOrder(node, fn) {
    if (node !== null) {
      this.traverseInOrder(node.left, fn);
      fn(node);
      this.traverseInOrder(node.right, fn);
    }
  }

  find(node, value) {
    if (node === null){
      return null;
    }
    else if (value < node.value) {
      return this.find(node.left, value);
    }
    else if (value > node.value){
      return this.find(node.right, value);
    }
    else {
      return node;
    }
  }

}

export default BinarySearchTree;