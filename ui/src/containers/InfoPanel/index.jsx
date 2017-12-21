import React from 'react';
import isEmpty from 'lodash.isempty';

import InfoPanel from 'components/InfoPanel';
import WelcomePanel from 'components/WelcomePanel';

const InfoPanelContainer = props =>
  isEmpty(props.activeCounty) ? (
    <WelcomePanel {...props} />
  ) : (
    <InfoPanel {...props} />
  );

export default InfoPanelContainer;
