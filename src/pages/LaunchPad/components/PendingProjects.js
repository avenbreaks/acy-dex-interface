import React from 'react';
import '../css/ProjectsCard.css';
import { useState, useEffect } from 'react';
import $ from 'jquery';
import ProjectsCard from './ProjectsCard.js';
import ExpandedContent from './ExpandedContent.js';

const PendingProjects = ({ data, openProject }) => {

    // const [isActiveUpcoming, setIsActiveUpcoming] = useState(false);
    // const [isIncomingExpanded, setisIncomingExpanded] = useState(false);

    // const [manyDataIncoming, setManyDataIncoming] = useState(data.length > 3);

    return (
        <div>
            <div
                className="expanding-card"
                style={{
                    zIndex: 1,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'center',
                }}
            >
                {data &&
                    data.map(obj => (
                        <div className="cards">
                            <div className=" card [ is-collapsed ]">
                                <div
                                    className="card__inner [ js-expander ]"
                                // onClick={() => setisIncomingExpanded(!isIncomingExpanded)}
                                >
                                    <div className="">
                                        <ProjectsCard
                                            projectID={obj.projectID}
                                            start={obj.saleStart}
                                            ddl={obj.saleEnd}
                                            raise={obj.totalRaise.toString() + ' USDT'}
                                            sales={obj.totalSale.toString() + ' ' + obj.projectToken}
                                            rate={'1 ' + obj.projectToken + ' = ' + obj.tokenPrice.toString() + ' USDT'}
                                            title={obj.projectName}
                                            isPending={true}
                                            tokenLogoUrl={obj.projectTokenUrl}
                                            openProject={openProject}
                                        />
                                    </div>
                                    {/* <i className="fa fa-folder-o" /> */}
                                </div>
                                <div className="card__expander">
                                    <i className="fa fa-close [ js-collapser ]" />
                                    <ExpandedContent />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PendingProjects;
