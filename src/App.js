import React, { useEffect, useState, Fragment } from 'react';
import FeaturedDay from './components/FeaturedDay';
import WeatherDay from './components/WeatherDay';
import Settings from './components/Settings';
import Info from './components/Info';
import Error from './components/Error';
import './App.css';

function App() {
	const [weather, setWeather] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errors, setErrors] = useState({hasErrors: false, errorMsg: ''});
	const [selectedSol, setSelectedSol] = useState();
	const [isFeatureOpen, setIsFeatureOpen] = useState(true);
	const [arePanelsHidden, setArePanelsHidden] = useState(false);
	const [isCelsius, setIsCelsius] = useState(true);
	const [isKm, setIsKm] = useState(true);
	const [showInfo, setShowInfo] = useState(false);
	const [backgroundState, setBackgroundState] = useState({activeBackground: undefined, numOfBackgrounds: 6});
	const API_key = 'Ep8HhmQJRBhJFnUmnWbYjo6SxaOAfnHPcdG7XH4y';
	const API_url = `https://api.nasa.gov/insight_weather/?api_key=${API_key}&feedtype=json&ver=1.0`;

// Update State functions
	const updateSelectedSol = (selected) => {
		setSelectedSol(selected);
		setIsFeatureOpen(true);
	}
	
	const openForeCast = () => {
		setIsFeatureOpen(prevState => {return !prevState});
	}

	const togglePanels = () => {
		setArePanelsHidden(prevState => {return !prevState});
	}

	const toggleInfo = () => {
		setShowInfo(prevState => {return !prevState});
	}

	const closeModal = (e) => {
		if (e.key) {
			if (e.key === "Escape") {
				setShowInfo(false);
			}
		} else {
			setShowInfo(false);
		}
	}

	const changeTempUnit = () => {
		setIsCelsius(prevState => {return !prevState});
	}

	const changeWindUnit = () => {
		setIsKm(prevState => {return !prevState});
	}

	const changeBg = () => {
		if (backgroundState.activeBackground === backgroundState.numOfBackgrounds) {
			setBackgroundState(prevState => {return {...prevState, activeBackground: 1}});
		} else {
			setBackgroundState(prevState => {return {...prevState, activeBackground: prevState.activeBackground + 1}});
		}
	}


// Hooks
	useEffect(() => {
		const fetchWeather = async () => {
			let response;
			try {
				response = await fetch(API_url);
			} catch (error) {
				setErrors({hasErrors: true, errorMsg: 'A problem occured while trying to retrieve weather data. Please try again later.'})
				console.log(error);
			}
			if (response.ok) {
				try {
					const json = await response.json();
					const {sol_keys, validity_checks, ...solData} = json;
					const filteredData = Object.entries(solData).map(([solKey, data]) => {
						return {
							sol: solKey,
							averageTemp: data.AT.av,
							maxTemp: data.AT.mx,
							minTemp: data.AT.mn,
							windSpeed: data.HWS.av,
							windDirectionDegrees: data.WD.most_common.compass_degrees,
							windDirectionCardinal: data.WD.most_common.compass_point,
							season: data.Season,
							date: new Date(data.First_UTC),
						}
					});
					setWeather(filteredData);
					setSelectedSol(filteredData.length - 1);
				} catch (error) {
					console.log(error);
					setErrors({hasErrors: true, errorMsg: 'Weather data is currently updating. Please try again in a few minutes.'});
				}
			} else {
				setErrors({hasErrors: true, errorMsg: 'Something went wrong trying to retrieve weather data. Please try again later.'});
			}
			setIsLoading(false);
		}
		fetchWeather();
	}, [API_url]);

	useEffect(() => {
		const rnd = Math.floor(Math.random() * backgroundState.numOfBackgrounds) + 1;
		setBackgroundState(prevState => {return {...prevState, activeBackground: rnd}});
	}, [backgroundState.numOfBackgrounds])

	useEffect(() => {
		if (backgroundState.activeBackground) {
			const bgClasses = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6'];
			document.body.classList.remove(...bgClasses);
			document.body.classList.add(`bg${backgroundState.activeBackground}`);
		}
	}, [backgroundState])


// Render related functions
	const displayTemp = (temp) => {
		if (isCelsius) {
			return `${Math.round(temp)} ${String.fromCodePoint(8451)}`;
		} else {
			const tempFahr = (temp * 9 / 5 ) + 32;
			return `${Math.round(tempFahr)} ${String.fromCodePoint(8457)}`;
		}
	}

	const displaySpeed = (speed) => {
		if (isKm) {
			return `${Math.round(speed)} km/h`;
		} else {
			const speedMiles = speed / 0.6213711922;
			return `${Math.round(speedMiles)} mph`;
		}
	}

	return (
		<Fragment>
			{(!isLoading && !errors.hasErrors) && <FeaturedDay weatherData={weather[selectedSol]} isOpen={isFeatureOpen} panelsHidden={arePanelsHidden} displayTemp={displayTemp} displaySpeed={displaySpeed} /> }
			{(!isLoading && !errors.hasErrors) && <section aria-label="Weather previous days" className={`forecast ${isFeatureOpen ? 'cls-inactive' : ''} ${arePanelsHidden ? 'cls-hidden' : ''} `}>
				{weather.map((data, index) => {
					return <WeatherDay key={index} arrIndex={index} solData={data} updateSelectedSol={updateSelectedSol} displayTemp={displayTemp} />
				})}
			</section> }

			{errors.hasErrors && <Error errorMsg={errors.errorMsg} />}
			{isLoading && <svg className="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M4.633 17.117c-.374.689-.594 1.516-.377 1.76.23.262.918.281 1.942-.021C5.61 18.354 5.085 17.773 4.633 17.117zM8.349 17.962c1.546-.794 3.426-2.043 5.488-3.876 2.065-1.834 3.527-3.553 4.498-4.994-.105-.227-.221-.449-.351-.667C16.71 6.293 14.474 5.02 12.001 5.02c-1.257 0-2.498.346-3.589.999-1.607.96-2.742 2.482-3.195 4.286-.453 1.803-.173 3.681.789 5.286C6.6 16.586 7.409 17.384 8.349 17.962zM19.474 7.067c.421-.982.483-1.668.252-1.929-.229-.259-.505-.356-.861-.323-.232.025-.577.137-1.008.399C18.469 5.748 19.013 6.366 19.474 7.067zM15.165 15.582c-1.409 1.252-2.926 2.381-4.413 3.292.404.072.815.122 1.237.122 1.257 0 2.499-.346 3.59-.999 1.607-.96 2.741-2.481 3.194-4.285.177-.704.238-1.42.194-2.126C17.887 12.956 16.576 14.329 15.165 15.582z"/><path d="M2.76,20.205c0.517,0.581,1.257,0.841,2.147,0.841c0.975,0,2.133-0.319,3.373-0.86c1.144,0.519,2.396,0.811,3.709,0.811 c1.619,0,3.216-0.443,4.616-1.282c2.065-1.234,3.524-3.192,4.107-5.515c0.412-1.643,0.344-3.329-0.163-4.908 c1.31-2.236,1.753-4.263,0.672-5.48c-0.661-0.744-1.58-1.091-2.575-0.983C17.815,2.919,16.96,3.33,16.098,4.02 c-1.243-0.64-2.634-1-4.097-1c-1.618,0-3.215,0.443-4.615,1.282C5.319,5.536,3.861,7.495,3.277,9.817 c-0.449,1.788-0.333,3.63,0.306,5.325C2.518,16.346,1.529,18.819,2.76,20.205z M4.256,18.877c-0.217-0.244,0.003-1.07,0.377-1.76 c0.452,0.656,0.978,1.237,1.565,1.739C5.174,19.158,4.486,19.139,4.256,18.877z M18.773,13.712 c-0.453,1.804-1.587,3.325-3.194,4.285c-1.091,0.653-2.333,0.999-3.59,0.999c-0.422,0-0.833-0.05-1.237-0.122 c1.487-0.911,3.004-2.04,4.413-3.292c1.411-1.253,2.722-2.626,3.803-3.996C19.012,12.292,18.95,13.008,18.773,13.712z M18.864,4.815c0.356-0.033,0.632,0.064,0.861,0.323c0.231,0.261,0.169,0.946-0.252,1.929c-0.461-0.701-1.005-1.319-1.617-1.853 C18.287,4.952,18.632,4.841,18.864,4.815z M5.217,10.305C5.67,8.501,6.805,6.979,8.412,6.019c1.091-0.653,2.332-0.999,3.589-0.999 c2.473,0,4.709,1.273,5.983,3.405c0.13,0.218,0.245,0.44,0.351,0.667c-0.971,1.441-2.433,3.16-4.498,4.994 c-2.063,1.833-3.942,3.082-5.488,3.876c-0.939-0.578-1.749-1.376-2.343-2.371C5.044,13.985,4.764,12.107,5.217,10.305z"/></svg>}
			<Info showInfo={showInfo} closeModal={closeModal} />
			
			{!errors.hasErrors &&
			<button aria-label="Toggle betwwen detailed view and past 7 days" className={`toggle-btn ${isFeatureOpen ? "feature-open" : "forecast-open"}`} onClick={openForeCast}>
				<svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" >
            	<path d="M356,123.984L236,33.984C225.709,26.437 212,34.133 212,45.985L212,90.985L165,90.985C74.099,90.985 0,165.084 0,255.985C0,341.484 65.4,411.985 148.801,420.084L105.901,387.984C97.917,382.001 97.937,369.956 105.901,363.984L151.5,329.784C116.4,323.485 90,292.884 90,255.985C90,214.585 123.6,180.985 165,180.985L212,180.985L212,225.985C212,237.826 225.705,245.538 236,237.984L356,147.984C364.001,142.447 364.018,129.537 356,123.984Z" />
            		<path d="M363.199,91.884L406.099,123.984C414.083,129.971 414.065,142.014 406.099,147.984L360.5,182.184C395.599,188.485 422,219.083 422,255.985C422,297.385 388.4,330.985 347,330.985L302,330.985L302,285.985C302,274.172 288.315,266.419 278,273.984L156,363.984C147.998,369.526 147.982,382.435 156,387.984L278,477.984C287.498,485.375 302,478.43 302,465.985L302,420.985L347,420.985C437.901,420.985 512,346.884 512,255.985C512,170.484 446.6,99.985 363.199,91.884Z" fillOpacity="0.5" />
				</svg>
			</button>} 

			<Settings isCelsius={isCelsius} isKm={isKm} arePanelsHidden={arePanelsHidden} togglePanels={togglePanels} changeTempUnit={changeTempUnit} changeWindUnit={changeWindUnit} changeBg={changeBg} toggleInfo={toggleInfo} showInfo={showInfo} />
		</Fragment>
	);
} 

export default App;
