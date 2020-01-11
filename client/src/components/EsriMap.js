import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { loadModules } from "esri-loader";
import { loadCss } from 'esri-loader'

class EsriMap extends Component {
    componentWillMount() {
        loadCss();
        this.loadMap();
    }

    loadMap() {
        // this will lazy load the ArcGIS API
        // and then use Dojo's loader to require the classes
        loadModules(["esri/Map", "esri/views/MapView", "esri/layers/GeoJSONLayer"])
            .then(([Map, MapView, GeoJSONLayer]) => {
                // // then we load a web map from an id
                // var webmap = new WebMap({
                //   portalItem: { // autocasts as new PortalItem()
                //     id: 'f2e9b762544945f390ca4ac3671cfa72'
                //   }
                // });
                // // and we show that map in a container w/ id #viewDiv
                // var view = new MapView({
                //   map: webmap,
                //   container: 'viewDiv'
                // });

                const url = "https://kghime.esri.com/geojsonHack/output.geojson";

                const template = {
                    title: "{OBJECTID}",
                    content:
                        "Shape length of county is {Shape_Length} and shape area is {Shape_Area}"
                };

                const geoJSONLayer = new GeoJSONLayer({
                    url: url,
                    popupTemplate: template
                });

                const map = new Map({
                    basemap: "dark-gray",
                    layers: [geoJSONLayer]
                });

                const view = new MapView({
                    container: "viewDiv",
                    center: [-116.4194, 34.9592],
                    zoom: 10,
                    map: map
                });

                var featureCount = document.getElementById("feature-count");
                var county = document.getElementById("county");
                var selectCountyTitle = document.getElementById("select-county-title");

                view.ui.add(featureCount, "top-right");
                view.ui.add(selectCountyTitle, "top-right");
                view.ui.add(county, "top-right");

                //Button click event on counting number of features
                featureCount.addEventListener("click", function () {
                    console.log("button clicked");

                    view
                        .whenLayerView(geoJSONLayer)
                        .then(function (layerView) {
                            return layerView.queryFeatureCount();
                        })
                        .then(function (count) {
                            console.log(count); // prints the total number of client-side graphics to the console
                        });
                });

                //Dropdown selection event to select a county and map over it
                // var highlight;
                county.addEventListener("change", function (event) {
                    console.log(event);
                    var highlight;
                    view.whenLayerView(geoJSONLayer).then(function (layerView) {
                        var query = geoJSONLayer.createQuery();
                        query.where = "OBJECTID = 872";
                        geoJSONLayer.queryFeatures(query).then(function (result) {
                            if (highlight) {
                                highlight.remove();
                            }
                            highlight = layerView.highlight(result.features);
                        });
                    });
                });

                //symbology for rendering unique values based on Grid Codes






            }) //end of module
            .catch(err => {
                // handle any errors
                console.error(err);
            });
    }


    render() {
        const mD = {
            width: "100%",
            height: "600px"
        };
        return (
            <Row id="map">
                <Col md={12}>
                    <div id="viewDiv" style={mD}>
                        <button id="feature-count" class="esri-widget">
                            Number of Features
          </button>
                        <span id="select-county-title">Select a county:</span>
                        <br />
                        <select id="county" class="esri-select">
                            <option value="San Bernardino">San Bernardino</option>
                            <option value="Los Angeles">Los Angeles</option>
                            <option value="San Francisco">San Francisco</option>
                            <option value="Santa Clara">Santa Clara</option>
                            <option value="San Diego">San Diego</option>
                        </select>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default EsriMap;