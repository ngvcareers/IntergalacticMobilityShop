import React from 'react';
import { StyledRDDiv, StyledLinkDiv, StyledRDChildDiv, StyledRDFlexDiv } from '../styledComponents/StyledDashboard';
import { Link } from 'react-router-dom';
import AddFavourite from '../AddFavourite';
import { StyledRDFavDiv } from '../styledComponents/StyledDashboard/StyledTable';
export function resourceTable(resource, img) {
    return (
        <StyledRDDiv key={resource.name}>
            <div style={{ border: '1px solid white' }}>
                <img src={img} alt="img_placeholder" />
            </div>
            <StyledRDFlexDiv>
                <StyledRDFavDiv>
                    <AddFavourite resName={resource.name} />
                </StyledRDFavDiv>
                <StyledRDChildDiv>
                    Name: {resource.name}
                </StyledRDChildDiv>
                <StyledRDChildDiv>
                    Model:{resource.model}
                </StyledRDChildDiv>
                <StyledRDChildDiv>
                    cost in credits: {resource.cost_in_credits}
                </StyledRDChildDiv>
                <StyledLinkDiv>
                    <Link to={`/${resource.name.replace(/\//gi, '$')}`} style={{ color: 'blue' }}>click to see more</Link >
                </StyledLinkDiv>
            </StyledRDFlexDiv>
        </StyledRDDiv>);
}
