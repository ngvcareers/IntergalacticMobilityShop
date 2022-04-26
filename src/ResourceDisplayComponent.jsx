import React from 'react';
import { resourceTable } from './util/utils.js';
import sampleSS from '../public/sampleSS.jpg';
export const ResourceDisplayComponent = (props) => {
    const { resource } = props;
    const img = sampleSS;
    function displayResource() {
        const nameList = resource.map((res) => resourceTable(res, img));
        return nameList;
    };
    return (<div>
        {displayResource()}
    </div>
    );
};