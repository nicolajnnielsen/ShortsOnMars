import React, { useEffect } from 'react';

const FeaturedDay = (props) => {
	useEffect(() => {
		const degrees = props.weatherData.windDirectionDegrees - 180;
		document.getElementById('compassArrow').style.setProperty('--degrees', `${degrees}deg`);
	});

	const displayTemp = (temp) => {
		return props.displayTemp(temp);
	}

	const displaySpeed = (speed) => {
		return props.displaySpeed(speed);
	}

	return (
		<main className={`featured ${!props.isOpen ? 'cls-inactive' : ''} ${props.panelsHidden ? 'cls-hidden' : ''} `}>
			<h1 className="app-header">The Weather at Elysium Planitia</h1>
			<div className="featured__date">
				<h2 className="">Sol {props.weatherData.sol}</h2>
				<h2 className="">{props.weatherData.date.toLocaleDateString(undefined, {day: 'numeric', month: 'long'})}</h2>
				<h3 className="featured__season">{props.weatherData.season}</h3>
			</div>
			<svg className="icons temp-svg" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" styles="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    			<path d="M256,112C256,50.1 205.9,0 144,0C82.1,0 32,50.1 32,112L32,278.5C12.3,303.2 0,334 0,368C0,447.5 64.5,512 144,512C223.5,512 288,447.5 288,368C288,334 275.7,303.1 256,278.5L256,112ZM144,448C99.9,448 64,412.1 64,368C64,342.5 76.2,319.1 96,304.2L96,112C96,85.5 117.5,64 144,64C170.5,64 192,85.5 192,112L192,304.2C211.8,319 224,342.5 224,368C224,412.1 188.1,448 144,448Z" fillOpacity="0.5" />
    			<path d="M160,322.9L160,304C160,295.2 152.8,288 144,288C135.2,288 128,295.2 128,304L128,322.9C109.4,329.5 96,347.1 96,368C96,394.5 117.5,416 144,416C170.5,416 192,394.5 192,368C192,347.1 178.6,329.5 160,322.9Z"  />
    			<path d="M416,0C363.1,0 320,43.1 320,96C320,148.9 363.1,192 416,192C468.9,192 512,148.9 512,96C512,43.1 468.9,0 416,0ZM416,128C398.3,128 384,113.7 384,96C384,78.3 398.3,64 416,64C433.7,64 448,78.3 448,96C448,113.7 433.7,128 416,128Z" />
			</svg>
			<div className="featured__temps">
				<p className="featured__temp featured--flex gr--1"><span>Average: </span><span>{displayTemp(props.weatherData.averageTemp)}</span></p>
				<p className="featured__temp featured--flex gr--2"><span>Lowest: </span><span>{displayTemp(props.weatherData.minTemp)}</span></p>
				<p className="featured__temp featured--flex gr--3"><span>Highest: </span><span>{displayTemp(props.weatherData.maxTemp)}</span></p>
			</div>
			<svg className="icons wind-svg" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" styles="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
				<path d="M400,256L243.7,256C263,272.6 276.9,294.8 283.5,320L400,320C426.5,320 448,341.5 448,368C448,394.5 426.5,416 400,416C382.1,416 366.7,406.1 358.4,391.6C355.5,386.6 349.7,384 343.9,384L310.1,384C299.2,384 291.1,394.8 294.8,405.1C312.6,455.7 365.3,489.9 424.2,477.4C465.4,468.7 499.3,435.8 508.9,394.7C526,321.5 470.5,256 400,256Z" fillOpacity="0.5" />
				<path d="M156.7,256L16,256C7.2,256 0,263.2 0,272L0,304C0,312.8 7.2,320 16,320L158.2,320C174.1,320 189,330.9 191.6,346.6C194.9,366.6 179.5,384 160,384C145.9,384 133.9,374.8 129.6,362.1C127.5,355.8 121,352 114.4,352L81.6,352C71.8,352 63.9,360.8 65.7,370.4C74.3,414.5 113.3,448 159.9,448C217,448 262.6,397.9 255.1,339.4C249,291 205.4,256 156.7,256Z"/>
				<path d="M16,224L352,224C411.7,224 458.8,169.2 445.8,107.3C438.2,71.1 408.9,41.8 372.7,34.2C317.3,22.6 267.6,59.1 257.8,109.7C255.9,119.3 263.9,128 273.6,128L306.4,128C313.1,128 319.5,124.2 321.6,117.9C325.9,105.2 337.9,96 352,96C371.4,96 386.9,113.4 383.6,133.4C381,149.1 366.2,160 350.2,160L16,160C7.2,160 0,167.2 0,176L0,208C0,216.8 7.2,224 16,224Z"/>
			</svg>
			<div className="featured__wind">
				<div className="wind-compass__bg">
					<span id="compassArrow" className="wind-compass__arrow"></span>
				</div>
			<p aria-label="Cardinal direction of wind" className="screen-reader">Wind is coming from the cardinal direction of {props.weatherData.windDirectionCardinal}</p>
			<p className="featured__wind-speed"><span>Speed: </span><span>{displaySpeed(props.weatherData.windSpeed)}</span></p>
			</div>
		</main>
	);
}

export default FeaturedDay;