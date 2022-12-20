import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BinarySearchTree from "./classes/AvlTree";
import BinarySearchTreeNode from "./components/AvlTreeNode.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insertValue: "",
      deleteValue: "",
      searchValue: "",
      tree: new BinarySearchTree()
    };
    
    this.insert = this.insert.bind(this);
    this.delete = this.delete.bind(this);
    this.resetActiveStatusOfNodes = this.resetActiveStatusOfNodes.bind(this);

    this.search = this.search.bind(this);

    this.onChangeInsertValue = this.onChangeInsertValue.bind(this);
    this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
    this.onChangeDeleteValue = this.onChangeDeleteValue.bind(this);
  }

  resetActiveStatusOfNodes(){
    this.state.tree.traverseInOrder(this.state.tree.root, function(node) {
      node.active = false;
    });
  }

  onChangeInsertValue(event) {
    this.resetActiveStatusOfNodes();
    this.setState({ insertValue: parseInt(event.target.value) });
  }

  onChangeDeleteValue(event) {
    this.resetActiveStatusOfNodes();
    this.setState({deleteValue: parseInt(event.target.value)});
  }

  onChangeSearchValue(event) {
    this.resetActiveStatusOfNodes();
    this.setState({searchValue: parseInt(event.target.value)});
  }

  insert() {
    this.resetActiveStatusOfNodes();
    this.state.tree.insert(this.state.insertValue);
    this.setState({insertValue: ""});
  }

  delete() {
    this.resetActiveStatusOfNodes();
    this.state.tree.delete(this.state.deleteValue);
    this.setState({deleteValue: "" });
  }

  search() {
    this.resetActiveStatusOfNodes();
    let searchResult = this.state.tree.find( this.state.tree.root, this.state.searchValue );

    if (searchResult) { searchResult.active = true;} 

    this.setState({searchValue: ""});
  }

  render() {
    const hasRootNode = this.state.tree.root;
    return (
      <React.Fragment>
          <div id="tree" className="tree">
            {hasRootNode ? (
              <ul>
                <BinarySearchTreeNode
                  node={this.state.tree.root}
                  nodeType="root"
                />
              </ul>
            ) : (
              <h5> TRY NOW</h5>
            )}
          </div>

          <div id="basic-actions">
            <div className="action">
              <input
                value={this.state.insertValue}
                onChange={this.onChangeInsertValue}
                type="number" />
              <button onClick={this.insert} className="btn btn-secondary btn-sm">ADD</button>
            </div>

            <div className="action">
              <input
                value={this.state.deleteValue}
                onChange={this.onChangeDeleteValue}
                type="number"/>
              <button onClick={this.delete} className="btn btn-secondary btn-sm">  REMOVE </button>
            </div>
          </div>
        
        <div id="traversal-actions">
          <div className="action">
            <input
              value={this.state.searchValue}
              onChange={this.onChangeSearchValue}
              type="number"/>
            <button onClick={this.search} className="btn btn-secondary btn-sm"> FIND </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
