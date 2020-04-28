import React, { useState, useEffect } from 'react';

const Info = ({showInfo, closeModal}) => {
	const [shouldRender, setShouldRender] = useState(showInfo);

	const onAnimationEnd = () => {
		if (!showInfo) setShouldRender(false);
	};

	useEffect(() => {
		if (showInfo) setShouldRender(true);
		if (showInfo) window.addEventListener("keydown", closeModal);

		return () => {
			window.removeEventListener("keydown", closeModal);
		}
	}, [showInfo]);

	return (
		shouldRender && (
			<article className={`info-modal ${!showInfo ? "out" : ""}`} onAnimationEnd={onAnimationEnd}>
				<button aria-label="Close Info Modal" onClick={closeModal} className="info__close-btn">
					<svg aria-hidden="true" focusable="false" className="info__close-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
				</button>
				<div className="info__inner">
					<h2 className="info__header">Shorts On Mars - <span>A Mars Weather App</span></h2>
					<p className="info__p">A site for helping make the tough decision on wether to bring a pair of shorts on the weekend trip to Mars by providing updates on the weather directly from the planet.</p>
					<p className="info__p">Weather updates for the past 7 Sols are delivered from Elysium Planitia, a flat smooth plain near Mars' equator, using a NASA API. Weather measurements (temperature, wind, pressure), are part of NASA's InSight mission, dedicated to studying the 'Inner Space' of Mars.</p>
					<p className="info__p">Updates are displayed per Sol, which is a Martian day. The Sols are counting up from the InSight missions landing on November 26, 2018.</p>
					<p className="info__p">For more information on the InSight mission visit <a href="https://mars.nasa.gov/insight/">https://mars.nasa.gov/insight/</a></p>
					<h3 className="info__subheader">Credits</h3>
					<p className="info__p">Code and design by Nicolaj N. Nielsen.</p>
					<p className="info__p">Many thanks to NASA for the API, the background images and all their awesome and important work. You can find the API and many others at <a href="http://https://api.nasa.gov/">https://api.nasa.gov</a>.</p>
					<p className="info__p">Thanks to <a href="https://www.youtube.com/user/KepowOb">Kevin Powell</a> and <a href="https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw">Web Dev Simplified</a> for the inspiration for the app. Go check out their channels and <a href="https://www.youtube.com/playlist?list=PL4-IK0AVhVjNGp4eiFgbqWOwwVAH27oWF">videos on building a Mars Weather app with HTML, CSS and vanilla JavaScript.</a></p>
					<p className="info__p">The icons, with the below exceptions, are slightly edited versions of Font Awesome. <a href="https://fontawesome.com/license">License</a> </p>
					<p className="info__p">The favicon and loading icon were made using art by <a href="https://www.flaticon.com/authors/good-ware">Good Ware</a> and <a href="https://www.flaticon.com/authors/smashicons">Smashicons</a> from <a href="https://www.flaticon.com/">Flaticon.com</a></p>
				</div>
			</article>
		)
	)};

export default Info;