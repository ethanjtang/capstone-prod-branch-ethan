// app/calculator/page.tsx
"use client"; // Mark this as a Client Component for client-side hooks

// Important for creation of the logo top right
import Layout from "./calculator_layout";
import { useState } from "react";

import Link from "next/link";

import './custom_radio.css';

const page_title = "Calculator"
const page_caption = "How sustainable is your lifestyle?"

const CalculatorPage: React.FC = () => {

  // Used to track Energy Consumption radio selection.
  const [energyUsage, setEnergyUsage] = useState<string | null>(null);

  // Used to track Percent Renewable Energy radio selection.
  const [percentRenewable, setPercentRenewable] = useState<string | null>(null); 

  // Used to track Water Usage radio selection.
  const [waterUsage, setWaterUsage] = useState<string | null>(null); 

  // Used to track CO2 Level radio selection.
  const [airQuality, setAirQuality] = useState<string | null>(null); 
  
  const handleEnergyUsage = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setEnergyUsage(event.target.id); };

  const handlePercentRenewable = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setPercentRenewable(event.target.id); };
    
  const handleWaterUsage = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setWaterUsage(event.target.id); };

  const handleAirQuality = (event: React.ChangeEvent<HTMLInputElement>) => { 
    setAirQuality(event.target.id); };
    
  const calculateScore = () => {
    const sustainabilityGrade = document.getElementById("sustainabilityScoreLabel");
    const sustainabilityExplanation = document.getElementById("sustainabilityScoreExplanation");

    let sustainabilityScoreInt:number = -1;
    let energyConsumptionScore:number;
    let renewableEnergyScore:number;
    let waterConsumptionScore:number;
    let airQualityScore:number;

    switch (energyUsage) {
      case "energy1": energyConsumptionScore = 5; break;
      case "energy2": energyConsumptionScore = 4; break;
      case "energy3": energyConsumptionScore = 3; break;
      case "energy4": energyConsumptionScore = 2; break;
      case "energy5": energyConsumptionScore = 1; break;
      default: energyConsumptionScore = 0;
    }

    switch (percentRenewable) {
      case "renew1": renewableEnergyScore = 1; break;
      case "renew2": renewableEnergyScore = 2; break;
      case "renew3": renewableEnergyScore = 3; break;
      case "renew4": renewableEnergyScore = 4; break;
      case "renew5": renewableEnergyScore = 5; break;
      default: renewableEnergyScore = 0;
    }

    switch (waterUsage) {
      case "water1": waterConsumptionScore = 5; break;
      case "water2": waterConsumptionScore = 4; break;
      case "water3": waterConsumptionScore = 3; break;
      case "water4": waterConsumptionScore = 2; break;
      case "water5": waterConsumptionScore = 1; break;
      default: waterConsumptionScore = 0;
    }

    switch (airQuality) {
      case "air1": airQualityScore = 5; break;
      case "air2": airQualityScore = 4; break;
      case "air3": airQualityScore = 3; break;
      case "air4": airQualityScore = 2; break;
      case "air5": airQualityScore = 1; break;
      default: airQualityScore = 0;
    }

    {/* TODO: Create more complex scoring system */}
    {/* WIll need to add more metrics and weighed/curved scoring systems */}
    sustainabilityScoreInt = 5 * 
                            (energyConsumptionScore + 
                             renewableEnergyScore +
                             waterConsumptionScore +
                             airQualityScore);
    
    let sustainabilityScore = "";
    let sustainabilityScoreDetail = "";

    if (!sustainabilityGrade|| !sustainabilityExplanation)
    {
      console.error("No element found.");
    }
    else
    {
      if (sustainabilityScoreInt > 0 && sustainabilityScoreInt <= 25) {
        sustainabilityScore = `F (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "Oh no! A score of F indicates that multiple areas of your home and lifestyle can be improved to become more sustainable.";
      }
      else if (sustainabilityScoreInt > 25 && sustainabilityScoreInt <= 50) {
        sustainabilityScore = `D (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "Oh no! A score of D indicates that one or more areas of your home and lifestyle can be improved to become more sustainable.";
      }
      else if (sustainabilityScoreInt > 50 && sustainabilityScoreInt <= 65) {
        sustainabilityScore = `C (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "You are doing alright! A score of C indicates that your home and lifestyle are somewhat helping to create a cleaner environment.";
      }
      else if (sustainabilityScoreInt > 65 && sustainabilityScoreInt <= 80) {
        sustainabilityScore = `B (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "Good job! Your home and lifestyle for the most part are helping create a cleaner environment!";
      }
      else if (sustainabilityScoreInt > 80 && sustainabilityScoreInt <= 99) {
        sustainabilityScore = `A (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "Nice job! Your home and lifestyle are helping create a cleaner environment!";
      }
      else if (sustainabilityScoreInt == 100) {
        sustainabilityScore = `S (${sustainabilityScoreInt})`;
        sustainabilityScoreDetail = "Perfect! Your home and lifestyle are helping create a cleaner environment!";
      }
      else
      {
        sustainabilityScore = "Error!";
        sustainabilityScoreDetail = "Please select a value for each category."
      }

      sustainabilityGrade.textContent = sustainabilityScore;
      sustainabilityExplanation.textContent = sustainabilityScoreDetail;
    }
  }

  return (
    
    <Layout>
      {/*} CSS grid to center content like home tsx page*/}
      <div className="default-page-bg"> {/*Calculator Background here*/}
        <div className = "flex flex-col w-1/2 mt-6 mb-6 bg-white shadow-lg rounded-lg p-1">
          <h1 className="title text-center">
            {page_title}
          </h1>
          <p className="caption text-center mx-auto break-words max-w-[90%] sm:max-w-[70%]">
            {page_caption}
          </p>
        </div>

        {/* Main Content Section */}
        <div className="flex-col-centered w-2/3 bg-white shadow-lg rounded-lg p-8 gap-[4vh]">
          {/* Monthly Energy Consumption */}
          <div className="sus-calc-topic">
            <label className="sus-calc-title"> 
            Monthly Energy Consumption (kWh) 
            </label>
            <p> 
              Found on your monthly energy utility bill
            </p>
          </div>
          <div className="sus-calc-input">
            <div className="flex-row-centered w-full">
              {/* Radio options */}
              <div className="sus-calc-bubble"> 
                <input type="radio" id="energy1" name="energy_consume" className="hoverable-bubble-div custom-radio" onChange={handleEnergyUsage}/> 
                  <label htmlFor="energy1" className="text-lg">
                    &lt;500
                  </label> 
              </div>
              <div className="sus-calc-bubble"> 
                <input type="radio" id="energy2" name="energy_consume" className="hoverable-bubble-div custom-radio" onChange={handleEnergyUsage}/> 
                  <label htmlFor="energy2" className="text-lg">
                    500 to 650
                  </label> 
              </div>
              <div className="sus-calc-bubble"> 
                <input type="radio" id="energy3" name="energy_consume" className="hoverable-bubble-div custom-radio" onChange={handleEnergyUsage}/> 
                  <label htmlFor="energy3" className="text-lg">
                    650 to 850
                  </label> 
              </div>
              <div className="sus-calc-bubble"> 
                <input type="radio" id="energy4" name="energy_consume" className="hoverable-bubble-div custom-radio" onChange={handleEnergyUsage}/>  
                  <label htmlFor="energy4" className="text-lg">
                    850 to 1000
                  </label> 
              </div>
              <div className="sus-calc-bubble"> 
                <input type="radio" id="energy5" name="energy_consume" className="hoverable-bubble-div custom-radio" onChange={handleEnergyUsage}/> 
                  <label htmlFor="energy5" className="text-lg">
                    1000+
                  </label> 
              </div>
            </div>
          </div>
          
          <hr className="border-gray-600 w-3/4" style={{ opacity: 0.50, borderWidth: '1px' }} />
          
          {/* Percent Renweable Energy */}
          <div className="sus-calc-topic">
            <label className="sus-calc-title"> 
              % Renewable Energy 
            </label>
            <p> 
              Found on your monthly energy utility bill
            </p>
          </div>
          
          <div className="sus-calc-input">
            {/* Radio options */}
            <div className="flex-row-centered w-full">
              <div className="sus-calc-bubble">
                  <input type="radio" id="renew1" name="renew_energy"  className="hoverable-bubble-div custom-radio" onChange={handlePercentRenewable}/> 
                  <label htmlFor="renew1" className="text-lg">
                    &lt;20%
                  </label> 
              </div>
              <div className="sus-calc-bubble"> 
                <input type="radio" id="renew2" name="renew_energy"  className="hoverable-bubble-div custom-radio" onChange={handlePercentRenewable}/> 
                  <label htmlFor="renew2" className="text-lg">
                    20 to 40%
                  </label> 
              </div>
              <div className="sus-calc-bubble"> 
                <input type="radio" id="renew3" name="renew_energy"  className="hoverable-bubble-div custom-radio" onChange={handlePercentRenewable}/>  
                  <label htmlFor="renew3" className="text-lg">
                    40 to 60%
                  </label> 
              </div>
              <div className="sus-calc-bubble"> 
                <input type="radio" id="renew4" name="renew_energy"  className="hoverable-bubble-div custom-radio" onChange={handlePercentRenewable}/> 
                  <label htmlFor="renew4" className="text-lg">
                    60 to 80%
                  </label> 
              </div>
              <div className="sus-calc-bubble"> 
                <input type="radio" id="renew5" name="renew_energy" className="hoverable-bubble-div custom-radio" onChange={handlePercentRenewable}/> 
                  <label htmlFor="renew5" className="text-lg">
                    80+%
                  </label> 
              </div>
            </div>
          </div>

          <hr className="border-gray-600 w-3/4" style={{ opacity: 0.50, borderWidth: '1px' }} />
          { /* Monthly Water Usage */}
          <div className="sus-calc-topic">
            <label className="sus-calc-title"> 
              Monthly Water Usage (gal) 
            </label>
            <p> 
              Found on your monthly water utility bill
            </p>
          </div>
          <div className="sus-calc-input">
          <div className="flex-row-centered w-full">
          {/* Radio options */}
            <div className="sus-calc-bubble"> 
              <input type="radio" id="water1" name="water_usage" className="hoverable-bubble-div custom-radio" onChange={handleWaterUsage}/> 
                <label htmlFor="water1" className="text-lg">
                  &lt;50
                </label> 
            </div>
            <div className="sus-calc-bubble"> 
              <input type="radio" id="water2" name="water_usage" className="hoverable-bubble-div custom-radio" onChange={handleWaterUsage}/> 
                <label htmlFor="water2" className="text-lg">
                  50 to 70
                </label> 
            </div>
            <div className="sus-calc-bubble"> 
              <input type="radio" id="water3" name="water_usage" className="hoverable-bubble-div custom-radio" onChange={handleWaterUsage}/> 
                <label htmlFor="water3" className="text-lg">
                  70 to 90
                </label> 
            </div>
            <div className="sus-calc-bubble"> 
              <input type="radio" id="water4" name="water_usage" className="hoverable-bubble-div custom-radio" onChange={handleWaterUsage}/> 
                <label htmlFor="water4" className="text-lg">
                  90 to 110
                </label> 
            </div>
            <div className="sus-calc-bubble"> 
              <input type="radio" id="water5" name="water_usage" className="hoverable-bubble-div custom-radio" onChange={handleWaterUsage}/> 
                <label htmlFor="water5" className="text-lg">
                  110+
                </label> 
            </div>
          </div>
        </div>

      <hr className="border-gray-600 w-3/4" style={{ opacity: 0.50, borderWidth: '1px' }} />

        { /* CO2 Level (Air Quality) */}
          <div className="sus-calc-topic">
            <label className="sus-calc-title"> 
              Air Quality: CO2 Level (ppm) 
            </label>
            <p> 
              Measured using a commercial CO2 detector
            </p>
          </div>
        <div className="sus-calc-input">
        <div className="flex-row-centered w-full">
          {/* Radio options */}
          <div className="sus-calc-bubble"> 
            <input type="radio" id="air1" name="air_quality" className="hoverable-bubble-div custom-radio" onChange={handleAirQuality}/> 
              <label htmlFor="air1" className="text-lg">
                &lt;400
              </label> 
          </div>
          <div className="sus-calc-bubble"> 
            <input type="radio" id="air2" name="air_quality" className="hoverable-bubble-div custom-radio" onChange={handleAirQuality}/> 
              <label htmlFor="air2" className="text-lg">
                400 to 500
              </label> 
          </div>
          <div className="sus-calc-bubble"> 
            <input type="radio" id="air3" name="air_quality" className="hoverable-bubble-div custom-radio" onChange={handleAirQuality}/> 
              <label htmlFor="air3" className="text-lg">
                500 to 600
              </label> 
          </div>
          <div className="sus-calc-bubble"> 
            <input type="radio" id="air4" name="air_quality" className="hoverable-bubble-div custom-radio" onChange={handleAirQuality}/> 
              <label htmlFor="air4" className="text-lg">
                600 to 700
              </label> 
          </div>
          <div className="sus-calc-bubble"> 
            <input type="radio" id="air5" name="air_quality" className="hoverable-bubble-div custom-radio" onChange={handleAirQuality}/> 
              <label htmlFor="air5" className="text-lg">
                700+
              </label> 
          </div>
          </div>

          {/*Calculate Score Button*/}
          <div>
            <button
              onClick={calculateScore}
              className="bg-greenify-button-green rounded-full shadow-sm border border-solid border-black/[.08] transition-colors flex items-center justify-center text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-coffee-green"
              >
              Calculate Score
            </button>
          </div>

          { /* Label to display sustainability score */}
          <div className="flex-col-centered">
            <label htmlFor="sustainabilityScoreLabel" id="sustainabilityScoreLabel" className="text-6xl font-semibold mb-2"> </label>
           <label 
            htmlFor="sustainabilityScoreExplanation" 
            id="sustainabilityScoreExplanation" 
            className="text-2xl block text-center">
          </label>         
          </div>
        </div>
      </div>
      
      {/* Footer link to FAQ */}
      <div className="flex-row-centered h-[8vh]">
        <Link className="flex-row-centered gap-[0.75vw]" href="/faq" passHref>
          <i className="footer-icon fa-solid fa-lg fa-question-circle mr-1"></i> {/*} Question Mark Icon*/}
          <p className="footer-text hoverable-div"> How is sustainability score calculated? </p>
        </Link>
      </div>

    </div>
    </Layout>
  );
};

export default CalculatorPage;
