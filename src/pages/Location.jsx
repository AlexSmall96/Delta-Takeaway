import React, { useEffect, useState } from "react"
import styles from '../styles/Location.module.css'
import appStyles from '../App.module.css'
import { ButtonGroup, Button, Spinner } from "react-bootstrap";
import { motion } from 'framer-motion';

const Location = () => {
	
	// Initialize map variables
	const [mapUrl, setMapUrl] = useState('')
	const [type, setType] = useState('roadmap')
	const [hasLoaded, setHasLoaded] = useState(false)

	// Fetch static google map for background image
	useEffect(() => {
		const fetchMap = async () => {
			try {
				const response = await fetch(`https://delta-map-api.onrender.com/map?type=${type}`)
				const blob = await response.blob();
        		const objectUrl = URL.createObjectURL(blob);
        		setMapUrl(objectUrl);
				setHasLoaded(true)
			} catch (err) {
				console.log(err)
			}
		}
		fetchMap()
	}, [type])

	// Set values for page fade animation
	const pageFade = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	}

	return (
		<motion.div variants={pageFade} initial="initial" animate="animate" exit="exit">	
			{/* INFORMATION ON LOCATION */}
			<div className={`${styles.locationText} ${appStyles.smallOnDesktop}`}>
				<h4>Come Visit Us</h4>
				<p>We are located just steps away from the famous Murrayfield and Roseburn bars as well as a short walk away from Edinburgh's Murrayfield Stadium - the home of Scottish Rugby.</p>
			</div>
			{/* STATIC GOOGLE MAP AS BACKGROUND IMAGE */}
			<div className={hasLoaded? styles.backgroundMap: styles.placeholder} style={{backgroundImage: hasLoaded? `url('${mapUrl}')`: ''}}>
				{hasLoaded?
					<ButtonGroup className={styles.toggleMap}>
						<Button variant="light" onClick={() => setType('roadmap')}>Map</Button>
						<Button variant="light" onClick={() => setType('hybrid')}>Satellite</Button>
					</ButtonGroup>:''}
				<Button className={styles.directions} variant='light'>
					<a target='_blank' rel="noreferrer" href='https://www.google.com/maps/dir//27+Roseburn+Terrace,+Edinburgh+EH12+5NG/@55.9484367,-3.2367662,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x4887c7accedae949:0xf44a5da22899ca4e!2m2!1d-3.2344121!2d55.9454082?entry=ttu&g_ep=EgoyMDI1MDYyOS4wIKXMDSoASAFQAw%3D%3D'>Directions</a>
				</Button>
				{!hasLoaded?
					<div className={styles.loadingText}>
						<Spinner size='sm' /> Map loading... 
					</div>:''}
				{hasLoaded && <p className={styles.attribution}>Map data @2025 Google</p>}
			</div>	
		</motion.div>
    )
};

export default Location

