import React from "react";
import "./Weather.css";

export default function Weather(){
    return (
        <div className="Weather">
            <form>
                <div className="row">
                    <div className="col-9">
                <input type="search" placeholder="Enter a city.." className="form-control" />
                </div>
                <div className="col-3">
                <input type="submit" value="Search" className="btn btn-primary 100" />
                </div>
                </div>
            </form>
            <h1>Seoul</h1>
            <ul>
                <li>Sunday 10:00</li>
                <li>Sunny</li>
                </ul>
                <div className="row">
                    <div className="col-6">
                        <img src="https://ssl.gstatic.com/onebox/weather/64/sunny.png" alt="sunny"/>
                        15c
                    </div>
                    <div className="col-6">
                        <ul>
                            <li>Precipitation: 21%</li>
                            <li>Humidity: 70%</li>
                            <li>Wind: 10 km/h%</li>
                        </ul>
                    </div>
                </div>
                </div>
    )
}