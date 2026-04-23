import React, { createContext, useContext, useState } from 'react';
import initialSiteSystems from '../data/siteSystems.json';

const SelectionContext = createContext();

export const useSelection = () => {
  return useContext(SelectionContext);
};

export const SelectionProvider = ({ children }) => {
  const [selections, setSelections] = useState({});
  const [siteSystems] = useState(initialSiteSystems.siteSystems);

  // setSelection(systemName, optionData)
  const setSelection = (systemName, optionData) => {
    setSelections(prev => ({
      ...prev,
      [systemName]: optionData
    }));
  };

  // Calculates the aggregated radar data
  // Returns an array mapped to radarAxes
  const getRadarData = (radarAxes) => {
    // initialize sums
    let axisSums = {};
    let axisCounts = {};
    
    radarAxes.forEach(axis => {
      axisSums[axis.id] = 0;
      axisCounts[axis.id] = 0;
    });

    // aggregate
    Object.values(selections).forEach(option => {
      if (option.radarWeights) {
        Object.keys(option.radarWeights).forEach(key => {
          if (axisSums[key] !== undefined) {
             axisSums[key] += option.radarWeights[key];
             axisCounts[key] += 1;
          }
        });
      }
    });

    // avg and map for Recharts
    return radarAxes.map(axis => {
      // If nothing selected yet, return 0
      const val = axisCounts[axis.id] === 0 ? 0 : (axisSums[axis.id] / axisCounts[axis.id]) * 20; // x20 to make it 0-100 scale (Assuming 1-5 raw weights)
      return {
        subject: axis.radarChartName,
        A: val,
        fullMark: 100
      };
    });
  };

  return (
    <SelectionContext.Provider value={{
      siteSystems,
      selections,
      setSelection,
      getRadarData
    }}>
      {children}
    </SelectionContext.Provider>
  );
};
