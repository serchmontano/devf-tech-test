import React from 'react'
import { useNavigate } from 'react-router-dom'

import { ComposableMap, Geographies, Geography, Graticule, Sphere } from 'react-simple-maps'
import { scaleLinear } from "d3-scale"

const colorScale = scaleLinear()
    .domain([0, 1])
    .range(["#ffeaea", "#ff3333"]);

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const CountryMap = ({ data, status }) => {
    const navigate = useNavigate();
    return (
        <ComposableMap
            projectionConfig={{
                rotate: [-10, 0, 0],
                scale: 147
            }}
        >
            <Sphere stroke="#49aed1" strokeWidth={0.5} />
            <Graticule stroke="#9ad0e3" strokeWidth={0.5} />
            {data.length > 0 && (
                <Geographies geography={geoUrl}>
                    {({ geographies }) => geographies.map((geo) => {
                        const d = data.find((s) => s[1].All.abbreviation === geo.properties.ISO_A2)
                        const amount = d ? d[1].All[status]*10/(d[1].All.population) : 0
                        return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={d ? colorScale(amount) : "#000"}
                                onClick={() => navigate(`/country/${d[1].All.country}`)} />
                        )
                    })}
                </Geographies>
            )}
        </ComposableMap>
    )
}

export default CountryMap
