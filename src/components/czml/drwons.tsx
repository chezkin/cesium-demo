import React, { ChangeEvent, useEffect, useState } from 'react'
import { CzmlDocument, CzmlItem, CzmlPath } from './czmlTypes'
import useDrwon from './useDrwon';
import { czml, jesToTlvPath, gazaToTlvPath, documentCzml } from './mokData';


const Drwons = () => {
    const [documentData, setDocumentData] = useState<CzmlDocument>(documentCzml);
    const [pathEntitiesData, setPathEntities] = useState<CzmlPath[]>([jesToTlvPath, gazaToTlvPath]);

    const [czmlDataSource, setCzmlDataSource] = useState<CzmlItem[]>([documentData, ...pathEntitiesData]);
    const [trackedEntityID, setTrackedEntityID] = useState<string>(gazaToTlvPath.id);

    useDrwon({czmlDataSource, trackedEntityID});

    const handelChangeMultiplier = (e: ChangeEvent<HTMLInputElement>) => {
        setDocumentData({...documentData, clock: {...documentData.clock, multiplier: Number(e.target.value)}})
    }

    const handleEntitySelection = (entityId: string) => {
        setTrackedEntityID(entityId);
    };

    useEffect(() => {
        setCzmlDataSource([documentData, ...pathEntitiesData]);
    }, [documentData, pathEntitiesData]);
    

  return (
    <div style={{
        position: 'absolute', top: '24px', left: '56px', zIndex: 444, 
        height: '400px', width: '250px', backgroundColor: 'rgba(222,222,222,0.7)'
        }} >
            <label>Slider Value: {documentData.clock.multiplier}</label>
                <input
                    type="range"
                    min="0.1"
                    max="23"
                    value={documentData.clock.multiplier}
                    onChange={handelChangeMultiplier}
                    style={{ width: '90%' }}
                />

                 {/* Buttons for path entities */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {pathEntitiesData.map((entity) => (
                    <button
                        key={entity.id}
                        onClick={() => handleEntitySelection(entity.id)}
                        style={{
                            padding: '10px',
                            backgroundColor: trackedEntityID === entity.id ? 'blue' : 'white',
                            color: trackedEntityID === entity.id ? 'white' : 'black',
                            border: '1px solid gray',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        {entity.name}
                    </button>
                ))}
            </div>
        
    </div>
  )
}

export default Drwons;