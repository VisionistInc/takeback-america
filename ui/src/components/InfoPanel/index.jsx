import React from 'react';
import round from 'lodash.round';
import isEmpty from 'lodash.isempty';
import startCase from 'lodash.startcase';

const InfoPanel = ({ activeCounty }) => (
  <div id="info">
    <h1>{`${activeCounty.NAME} County${
      !isEmpty(activeCounty.state)
        ? ', ' + startCase(activeCounty.state.toLowerCase())
        : ''
    }`}</h1>

    <h2 className="red">
      Overall risk score: <span>{round(activeCounty.overall, 3)}</span>
    </h2>

    <h3>Factors that went into this score:</h3>

    <h4>
      Vulnerability: <span>{round(activeCounty.risk, 3)}</span>
    </h4>
    <em>
      A proxy for how similar the county looks to other counties with known
      opioid problems based on a composite of known community risk factors.
    </em>

    <h4>
      Normalized Mortality Rate: <span>{round(activeCounty.current, 3)}</span>
    </h4>
    <em>The normalized mortality rate for this county (by census region).</em>

    <h4>
      Expected Conditions: <span>{round(activeCounty.expected, 3)}</span>
    </h4>
    <em>
      The difference between the objserved and expected mortality rate due to
      drug poisionings by county based on estimates provided by a multivariate
      model.
    </em>

    <h4>
      Rx Take-Back Prevalence Ratio:{' '}
      <span>{round(activeCounty.drop_presc_ratio, 3)}</span>
    </h4>
    <em>
      Compares the availability of Rx Take-Back locations in contrast to the
      prevalence of opioid prescriptions among the local population (defined as
      opioid prescriptions per 100 population). Low values indicate a lack of
      Take-Back capacity in the county.
    </em>
  </div>
);

export default InfoPanel;
