import React, {Component} from 'react';
import WorldWind from 'worldwindjs';

class WorldWindRenderer extends Component {
    constructor(props) {
        super(props);


    }

    componentDidMount() {
        this.worldWindow = new WorldWind.WorldWindow("myWorldWind");
        this.worldWindow.addLayer(new WorldWind.BMNGOneImageLayer());
        this.worldWindow.addLayer(new WorldWind.BMNGLandsatLayer());

        this.worldWindow.addLayer(new WorldWind.CompassLayer());
        this.worldWindow.addLayer(new WorldWind.CoordinatesDisplayLayer( this.worldWindow));
        this.worldWindow.addLayer(new WorldWind.ViewControlsLayer( this.worldWindow));
    }

    render()
    {


        return(
            <div>
            <canvas ref="myWorldWind" id="myWorldWind"> </canvas>
            </div>
        );
    }
}

export default WorldWindRenderer;