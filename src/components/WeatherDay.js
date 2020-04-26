import React from 'react';

const WeatherDay = (props) => {
	const displayTemp = (temp) => {
		return props.displayTemp(temp);
	}

	return (
		<article className="forecast-day">
			<div className="forecast-day__headers">
				<h3>Sol {props.solData.sol}</h3>
				<h4>{props.solData.date.toLocaleDateString(undefined, {day: 'numeric', month: 'long'})}</h4>
			</div>
			
			<p className="forecast-day__temp">
				<svg className="icons temp-svg" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" styles="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    				<path d="M256,112C256,50.1 205.9,0 144,0C82.1,0 32,50.1 32,112L32,278.5C12.3,303.2 0,334 0,368C0,447.5 64.5,512 144,512C223.5,512 288,447.5 288,368C288,334 275.7,303.1 256,278.5L256,112ZM144,448C99.9,448 64,412.1 64,368C64,342.5 76.2,319.1 96,304.2L96,112C96,85.5 117.5,64 144,64C170.5,64 192,85.5 192,112L192,304.2C211.8,319 224,342.5 224,368C224,412.1 188.1,448 144,448Z" fillOpacity="0.5" />
    				<path d="M160,322.9L160,304C160,295.2 152.8,288 144,288C135.2,288 128,295.2 128,304L128,322.9C109.4,329.5 96,347.1 96,368C96,394.5 117.5,416 144,416C170.5,416 192,394.5 192,368C192,347.1 178.6,329.5 160,322.9Z"  />
    				<path d="M416,0C363.1,0 320,43.1 320,96C320,148.9 363.1,192 416,192C468.9,192 512,148.9 512,96C512,43.1 468.9,0 416,0ZM416,128C398.3,128 384,113.7 384,96C384,78.3 398.3,64 416,64C433.7,64 448,78.3 448,96C448,113.7 433.7,128 416,128Z" />
				</svg>
				<span>{displayTemp(props.solData.averageTemp)} </span></p>
			<button className="forecast-day__btn" onClick={(e) => props.updateSelectedSol(props.arrIndex)}>More Info</button>
		</article>
	)
}

export default WeatherDay;