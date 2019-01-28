import React, {Component} from 'react';



class TabSection extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }
    /* place all buttons according to a count number in parent */
    bringButtons = () =>
    {
        let buttons = [];
        for(let i = 0;i<this.props.totalTabs;i++)
        {
          buttons.push(<button ref={"button"+(i+1)} className="sections">Sekme {i+1}</button>)
        }
        return buttons;
    };
    render() {
      return(<div>
          {this.bringButtons()}
          <button id="newSection" onClick = {this.props.tabButtonOnClick}> Yeni Sekme Aç</button>
      </div>);
    }
}

export default TabSection;