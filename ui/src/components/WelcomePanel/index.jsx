import React from 'react';

const WelcomePanel = ({ takeBackFilter, toggleTakeBackfilter }) => (
  <div id="welcome">
    <p className="welcome-paragraph">
      In 2016, 175 Americans died each day from prescription related overdoses
      (over 64,000 deaths in total) 70% of those that abuse prescription
      medication first obtained them from friends and family. Help America
      flight the epidemic of prescription drug abuse!
    </p>
    <h3 className="welcome-h3">I'm a member of the public:</h3>
    <p className="welcome-desc">
      Help protect your family, community, and our environment by disposing of
      expired, unused, and unwanted medication at a licensed take-back location
      near you.
    </p>
    <br />
    <ol>
      <li>Enter your zip code using the search box above</li>
      <li>Click above to turn on take-back locations in your area</li>
      <li>Click on a specific take-back location for additional information</li>
      <li>Call ahead to confirm location, hours, and accepted substances</li>
      <li>Return your medication to the licensed take-back site</li>
    </ol>
    <h3>I'm a public health practitioner:</h3>
    <p className="welcome-desc">
      Find counties that are at high risk for opioid abuse and are underserved
      by existing take-back programs.
    </p>
    <ol>
      <li>Enter a local zip code using the search box above</li>
      <li>
        Compare counties in your state using the provided opioid risk and
        capacity measures
      </li>
      <li>Target communities that need additional take-back locations</li>
    </ol>
  </div>
);

export default WelcomePanel;
