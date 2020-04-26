import React, { useState } from 'react';

const Settings = (props) => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(prevState => {return !prevState});
	}

	const toggleInfo = () => {
		if (!props.showInfo) {
			setMenuOpen(false);
		}
		props.toggleInfo();
	}

	return (
		<div aria-label="Settings" className={`settings ${menuOpen ? 'open' : ''}`}>
			<button aria-label="Toggle Settings" aria-haspopup="true" aria-expanded={menuOpen} aria-controls="settings-menu" onClick={toggleMenu} className="settings__toggle" >
				<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cog" className="settings-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path></svg>
			</button>
			<menu id="settings-menu" className="settings__menu">
				<button aria-label="Change Temperature Units" className="settings__menuItem temp" onClick={props.changeTempUnit}><span>{props.isCelsius ? String.fromCodePoint(8457) : String.fromCodePoint(8451)}</span></button>
				<button aria-label="Change Wind Speed Units" className="settings__menuItem wind" onClick={props.changeWindUnit}><span>{props.isKm ? "MI" : "Km"}</span></button>
				<button aria-label="CHange Background Image" className="settings__menuItem background" onClick={props.changeBg}>
					<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="images" className="icon bg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
					<path d="M480,416L480,432C480,458.51 458.51,480 432,480L48,480C21.49,480 0,458.51 0,432L0,176C0,149.49 21.49,128 48,128L64,128L64,176L54,176C50.708,176 48,178.708 48,182L48,426C48,429.292 50.708,432 54,432L426,432C429.292,432 432,429.292 432,426L432,416L480,416Z" fillOpacity="0.5"/>
    		<path d="M528,32C554.51,32 576,53.49 576,80L576,336C576,362.51 554.51,384 528,384L144,384C117.49,384 96,362.51 96,336L96,80C96,53.49 117.49,32 144,32L528,32ZM522,80L150,80C146.708,80 144,82.708 144,86L144,330C144,333.292 146.708,336 150,336L522,336C525.292,336 528,333.292 528,330L528,86C528,82.708 525.292,80 522,80ZM192,240L231.515,200.485C236.201,195.799 243.799,195.799 248.486,200.485L288,240L391.515,136.485C396.201,131.799 403.799,131.799 408.486,136.485L480,208L480,288L192,288L192,240ZM264,144C264,166.091 246.091,184 224,184C201.909,184 184,166.091 184,144C184,121.909 201.909,104 224,104C246.091,104 264,121.909 264,144Z"/>
					</svg>
				</button>
				<button aria-label="Toggle weather panels" className="settings__menuItem panels" onClick={props.togglePanels}>
				{!props.arePanelsHidden ? 
					<svg className="icon hide-icon" viewBox="0 0 640 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
					    <path d="M634,471L36,3.51C33.163,1.238 29.635,0 26,0C21.145,0 16.544,2.21 13.51,6L3.51,18.49C1.232,21.329 -0.01,24.862 -0.01,28.502C-0.01,33.362 2.204,37.966 6,41L604,508.49C606.837,510.762 610.365,512 614,512C618.855,512 623.456,509.79 626.49,506L636.49,493.51C638.768,490.671 640.01,487.138 640.01,483.498C640.01,478.638 637.796,474.034 634,471Z" fillOpacity="0.5"/>
					    <path d="M320,400C221.35,400 130.92,345 82.07,256C94.058,234.097 108.868,213.86 126.12,195.81L88.38,166.31C67.372,188.785 49.573,214.058 35.49,241.41C30.854,250.58 30.854,261.43 35.49,270.6C89.72,376.41 197.08,448 320,448C356.7,448 391.71,440.95 424.63,429.19L378.22,392.91C359.28,397.2 339.89,400 320,400ZM343.21,365.54L208.42,260.16C210.65,320.09 259.53,368 320,368C327.801,367.983 335.579,367.159 343.21,365.54ZM320,112C418.65,112 509.09,167 557.93,256C545.958,277.904 531.165,298.143 513.93,316.2L551.67,345.7C572.682,323.222 590.484,297.946 604.57,270.59C609.206,261.42 609.206,250.57 604.57,241.4C550.29,135.59 442.93,64 320,64C283.3,64 248.29,71 215.37,82.81L261.78,119.1C280.72,114.8 300.12,112 320,112ZM296.79,146.47C304.42,144.842 312.199,144.015 320,144C380.48,144 429.36,191.91 431.58,251.85L296.79,146.47Z"/>
					</svg>
					:
					<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="eye" className="icon hide-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"></path></svg>
				}
				</button>
				<button aria-label="Toggle Info Modal" className="settings__menuItem info" onClick={toggleInfo}>
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" className="icon info-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>
				</button>
			</menu>
		</div>
	)
}

export default Settings;