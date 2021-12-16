import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {Card} from 'antd';
import styles from './styles.less';
import telegramWIcon from '@/assets/icon_telegram_white.svg';
import announcementIcon from '@/assets/icon_announcement.svg';
import OngoingProjects from "./components/OngoingProjects.js"
import IncomingProjects from "./components/IncomingProjects.js"
import ExpandingCard from "./components/ExpandingCard.js"
import EndedProjects from "./components/EndedProjects.js"
import BubblyButton from "./components/BubblyButton.js"
import RaiseButton from "./components/RaiseButton.js"
import AlocationIcon from "./components/AllocationIcon"
import apple from "@/assets/lottie/apple.json"
import $ from 'jquery';
import { getProjects } from '@/services/api';

const { Meta } = Card;

const Pool = (props)=> {
    const [ongoingData, setOngoingData] = useState([]);
    const [upcomingData, setUpcomingData] = useState([]);
    const [endedData, setEndedData] = useState([]);


    const history = useHistory();
    const onClick = (e) => {
    console.log(e)
    history.push("/launchpad/project/"+ e)
    }

    // project variables
    useEffect(() => {
      getProjects().then(res => {
          if(res) {
            console.log(res)
            const newOngoingData = [...ongoingData]
            const newUpcomingData = [...upcomingData]
            const newEndedData = [...endedData]

            // get all projects from db
            res.forEach((obj) => 
              obj.projectStatus === "Ongoing" ? newOngoingData.push(obj) : 
              obj.projectStatus === "Upcoming" ? newUpcomingData.push(obj) : 
              newEndedData.push(obj)
            )
            setOngoingData([...newOngoingData])
            setUpcomingData([...newUpcomingData])
            setEndedData([...newEndedData]) 
          } else {
            console.log('Failed to retrieve data from database');
          }
      }).catch(e => console.error(e));
    }, [])

    const mouseMove = (e) => {
      let mouseX, mouseY;
      let traX, traY;
      mouseX = e.pageX;
      mouseY = e.pageY;
      traX = ((4 * mouseX) / 570) + 40;
      traY = ((4 * mouseY) / 570) + 50;
      document.getElementById('bigTitle').style.backgroundPosition = traX + "%" + traY + "%";
    }

    const links = [
      'https://t.me/acyfinance',
      'https://t.me/ACYFinanceChannel',
      'https://twitter.com/ACYFinance',
      'https://acy.finance/',
      'https://github.com/ACY-Labs/ACY-Finance-Whitepaper'
    ]

    return(
      <div className={styles.launchRoot}>
        <div className={styles.pooltopContainer}>
          <div className={styles.bigTitle} id='bigTitle' onMouseMove={mouseMove}>
            THE BEST <br />IDO PROJECTS
          </div>
        </div>
        <div className={styles.launchbottomContainer}>
          <p className={styles.titleDesc}>
            Launching Profitable Projects on Multichain.
          </p>
          <div className={styles.buttonContainer}>
            <div>
              <BubblyButton href="https://forms.gle/gsLNsgDy2BXHNZda9" className={styles.btnApply} />
            </div>
            <div>
              <RaiseButton href={links[0]} className={styles.btnApply} src={telegramWIcon} text="Telegram" />
            </div>
            <div>
              <RaiseButton href={links[1]} className={styles.btnApply} src={announcementIcon} text="Announcements" />
            </div>
          </div>
        </div>
        <div className={styles.btmContent}>
          <section>
            <div className={styles.projectBoxes}>
              <div className={styles.titleBlock}>
                <span className={styles.anyStatusTitle}>Ongoing Projects</span>
                <div className={styles.lineSeperator} />
              </div>
              <div className={styles.projectsContainer}>
                {
                  ongoingData && ongoingData.map((obj) =>
                    <OngoingProjects 
                      ddl={obj.saleEnd} 
                      raise={obj.totalRaise.toString() + " USDT"} 
                      sales={obj.totalRaise.toString()+ ' ' + obj.projectToken} 
                      rate={"1 " + obj.projectToken + " = " + obj.tokenPrice.toString() + " USDT"} 
                      title={obj.projectName} 
                      isOngoing
                      openProject={() => onClick(obj.projectID.toString())}
                    />
                  )
                }
                
              </div>
            </div>
            <div className={styles.projectBoxes}>
              <div className={styles.titleBlock}>
                <span className={styles.anyStatusTitle}>Upcoming Projects</span>
                <div className={styles.lineSeperator} />
              </div>
              <div className={styles.projectsContainer}>
                <IncomingProjects data={upcomingData} />
              </div>
            </div>
            <div className={styles.projectBoxes}>
              <div className={styles.titleBlock}>
                <span className={styles.anyStatusTitle}>Ended Projects</span>
                <div className={styles.lineSeperator} />
              </div>
              <div className={styles.projectsContainer}>
                <EndedProjects data={endedData} />
              </div>
            </div>
          </section>
          {/* <div style={{width: "100px", height: "100px", backgroundColor: "white"}}>
            <AllocationIcon play={true} url={ apple} id="apple"/>
          </div> */}
        </div>
        
      </div>
    )
};

export default Pool;