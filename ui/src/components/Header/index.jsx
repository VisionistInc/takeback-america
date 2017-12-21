import React from 'react';

import takeBackLogoSrc from 'img/logo-takeback.png';
import visionistLogoSrc from 'img/logo-visionist.png';
import hhsLogoSrc from 'img/logo-hhs.png';

const HeaderV2 = ({
  searchZipCode,
  takeBackFilter,
  toggleTakeBackfilter,
  validateZipcode,
  validZipcode
}) => (
  <div id="header">
    <div id="header-logo-takeback">
      <img
        src={takeBackLogoSrc}
        width="117px"
        height="130px"
        alt="Take-Back America Logo"
      />
    </div>
    <div id="header-text">
      <h1>
        <em>Help Take-Back America from the Opioid Crisis.</em>
      </h1>

      <div>
        Drug take-back centers are a vital piece of a community opioid
        prevention strategy. Where are take-back centers currently located? What
        areas are still underserved? Using data provided by HHS, DEA, and
        others, Take-Back AMERICA helps health practitioners and the public
        address these questions. Use the map below to find drug disposal centers
        near you while highlighting at-risk communities that are still in need
        of take-back locations.
      </div>

      <div>
        How does your area stack up?
        <input
          type="text"
          id="header-search"
          placeholder="Search by ZIP code"
          onChange={validateZipcode}
          onKeyPress={searchZipCode}
        />
        {!validZipcode && (
          <span className="invalid-zip">Please enter a valid zipcode</span>
        )}
        <div
          id="info-options"
          title="When checked, will place points on the map to indicate known prescription take-back locations."
        >
          <input
            type="checkbox"
            id="show-locations"
            name="show-locations"
            checked={takeBackFilter}
            onClick={toggleTakeBackfilter}
          />
          <label htmlFor="show-locations">
            Show Take-Back locations on map
          </label>
        </div>
      </div>
    </div>
    <div id="header-about">
      <div>
        <a
          href="https://www.visionistinc.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={visionistLogoSrc}
            style={{ top: '-4px' }}
            alt="Visionist Inc logo"
          />
        </a>
        <a
          href="https://www.hhs.gov/about/news/2017/12/08/hhs-announces-winners-hhs-opioid-code-thon.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={hhsLogoSrc} alt="HHS logo" />
        </a>
      </div>
      <div>
        Take-Back America is a tool developed by data scientists and engineers
        from{' '}
        <a
          href="https://www.visionistinc.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visionist, Inc.
        </a>{' '}
        during the U.S. Department of Health &amp; Human Services
        <a
          href="https://www.hhs.gov/about/news/2017/12/08/hhs-announces-winners-hhs-opioid-code-thon.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          24-hour Opioid Code-a-Thon
        </a>.
      </div>
      <div id="header-about-links">
        <span>&#x27a4;</span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/VisionistInc/takeback-america/wiki"
        >
          What’s next?
        </a>
        <span>&#x27a4;</span>
        <a href="mailto:takeback-team@visionistinc.com">Contact the team</a>
      </div>
    </div>
  </div>
);

export default HeaderV2;
