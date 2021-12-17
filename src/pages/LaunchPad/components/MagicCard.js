import React from 'react';
import '../css/MagicCard.css';
import ProjectsCard from './ProjectsCard.js';

const MagicCard = ({ projectID, ddl, raise, sales, rate, title, isOngoing, openProject }) => {
  return (
    <div className="magic-card-body">
      <div className="magic-card">
        <ProjectsCard projectID={projectID} ddl={ddl} raise={raise} sales={sales} rate={rate} title={title} isOngoing={isOngoing} openProject={openProject} />
      </div>
      <div className="magic-card-before" />
      <div className="magic-card-after" />
    </div>
  );
};

export default MagicCard;
