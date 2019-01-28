import React, {Component} from 'react';

class TabSection extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
      return(<div>
          <button className="sections"> Sekme 1</button>
          <button id="newSection"> Yeni Sekme Aç</button>
      </div>);
    }
}

export default TabSection;