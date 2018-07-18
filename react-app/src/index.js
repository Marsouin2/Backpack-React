import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import _ from "lodash";
import registerServiceWorker from './registerServiceWorker';
import mapboxgl from 'mapbox-gl';
import ReactMapboxGl, { Layer, Marker, Feature, Popup } from "react-mapbox-gl";
// -------------------
// -------------------------------------MORE HELP ------------------------------------------------
/*
    react-mapbox-gl-js = https://codeburst.io/build-rich-map-experiences-with-mapbox-and-react-fa13d2c814de
    react-mapbox-gl-js doc = http://alex3165.github.io/react-mapbox-gl/documentation

*/
// --------------------------------------------------------MORE HELP ------------------------------------------------

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoibWFyc291aW4iLCJhIjoiY2poZjE3eXMxMTM0MjNjcGU0azFwY2l1NSJ9.C8ik0dQePlA6uxbQl3qknA",
    center: '[-122.420679, 37.772537]',
});

class MainMapbox extends React.Component {
    constructor(props) {
        super(props);

        this.bool_new_marker = false;
        this.interest_picture = 'data:image/png;base64,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';
        this.water_picture = '';
        this.camping_picture = '';

        this.marker_type_list = {
            values: [
                { name: 'Gite', id:1},
                { name: 'Point d\'eau', id:2},
                { name: 'Point d\'interet', id:3},
                { name: 'Campement', id:4},
            ]
        };

        this.state = {
            bool_new_marker: false,
            markers : [
                { name: 'cascade rouge', description: 'Ceci est une cascade trop stylee,\nen plus elle est rouge', id: 1, type: 'interest', lat_lng: [2.0464957702861284, 47.9838359596688]},
                { name: 'cascade bleu', description: 'Ceci est une cascade trop stylee,\nen plus elle est bleu', id: 2, type: 'interest', lat_lng: [4, 44.9038359596688]}
            ], // array of markers
            actual_click_position : [],
        }
    }

    /*componentDidMount() {
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v9',
            center: [-96, 37.8],
            zoom: 3
        });
    }*/

    ClickOnMap(map, evt) {
        this.setState({
            ...this.state,
            bool_new_marker: true,
            actual_click_position: evt.lngLat,
        })
    }

    ClickOnMarker(event, marker_id) {
        const ret = _.findIndex(this.state.markers, function(o) { return o.id === marker_id; });
        return (
            <Popup
                coordinates={[this.state.markers[ret].lat_lng[0], this.state.markers[ret].lat_lng[0] + 40]}
                offset={{
                    'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
                }}>
                <h1>{this.state.markers[ret].name}</h1>
                <h2>{this.state.markers[ret].description}</h2>
            </Popup>
        )
    }

    DisplayMarkers() { // display all markers on map by loop inside array of markers (from API)
        const markers_array = [...this.state.markers];
        return (
            _.map(markers_array, (value) => {
                return (
                    <Marker
                        coordinates={value.lat_lng}

                        onClick={(e) => this.ClickOnMarker(e, value.id)}
                        anchor='bottom'
                        offset='offset'
                    >
                        <img src={this.interest_picture}/>
                    </Marker>
                )
            })
        )
    }

    NewMarker(name, type, description) { // get the name+description+type and create a new marker
        const last_marker = _.last(this.state.markers); // get last object in markers[] to get next id
        const new_marker = {name: name, description: description, id: last_marker.id + 1, type: type,
            lat_lng: [this.state.actual_click_position.lng, this.state.actual_click_position.lat]};
        this.setState({
            ...this.state,
            markers: [...this.state.markers, new_marker],
            bool_new_marker: false,
        })
    }

    selectMarkerType() {
        return this.refs.marker_type_list.value;
    }

    DrawPopup(marker_type) {
        if (this.state.bool_new_marker) {
            return (
                <Popup
                    coordinates={[this.state.actual_click_position.lng, this.state.actual_click_position.lat]}
                    offset={{
                        'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
                    }}>
                    <p>Name :  <input id='name' type='text'/></p>
                    <p>Type :  <select id='type' ref="project_list" onClick= {
                        (e) => { this.selectMarkerType();}}> { marker_type }</select></p>
                    <p>Description : <input id='description' type='text' /></p>
                    <p><button onClick={(e) => this.NewMarker(
                        document.getElementById('name').value,
                        document.getElementById('type').value,
                        document.getElementById('description').value)}>ok</button></p>
                </Popup>
            )
        }
    }

    render() {
        const marker_type_list = this.marker_type_list.values.map(v => (
            <option key={v.id}>{v.name}</option>
        ));
        const draw_popup = this.DrawPopup(marker_type_list);
        const display_markers = this.DisplayMarkers();
        return (
            <div>
                <Map
                    /*style="mapbox://styles/mapbox/streets-v9"*/
                    style='mapbox://styles/marsouin/cjjiigdfu9z542sp85xcqf6rz'
                    zoom={[6]}
                    center={[2.000000, 46.866667]}
                    onClick={this.ClickOnMap.bind(this)}
                    containerStyle={{
                        height: "100vh",
                        width: "100vw"
                    }}>
                    {display_markers}
                    {draw_popup}
                </Map>
            </div>
        )
    }
}

ReactDOM.render(<MainMapbox />, document.getElementById('root'));
registerServiceWorker();