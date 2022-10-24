import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { Location } from '../../typings'

interface MapboxType {
    locations: Location[]
}

const Mapbox = ({locations}:MapboxType) => {

    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {

        if (map.current) return;
        
        mapboxgl.accessToken = `pk.eyJ1IjoiamFtYWwtYmFoYW1tb3UiLCJhIjoiY2w4d3dxeWNqMDB2dTNucGhnN2l2NDR0eSJ9.FWA2CDc0hUV27RlB4R-WBQ`
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/jamal-bahammou/cl8wxlcq4001n14nuak57rpbv',
            scrollZoom: false,
        });

        const bounds = new mapboxgl.LngLatBounds()

        locations.map((location:Location) => {

            // CREATE MARKER
            const el = document.createElement('div')
            el.className = 'marker'

            // ADD MARKER
            new mapboxgl
                .Marker({element:el,anchor:'bottom'})
                .setLngLat(location.coordinates)
                .addTo(map.current)

            // ADD POPUP 
            new mapboxgl
                .Popup({offset:25,focusAfterOpen:false})
                .setLngLat(location.coordinates)
                .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
                .addTo(map.current)

            // EXTEND MAP
            bounds.extend(location.coordinates)
        })

        if(map.current !== null)
            map.current.fitBounds(bounds, {
                padding: {top:200,bottom:150,left:100,light:100}
            })
    });



    return (
        <section className="section-map">
            <div id="map" ref={mapContainer} />
        </section>
    )
}

export default Mapbox