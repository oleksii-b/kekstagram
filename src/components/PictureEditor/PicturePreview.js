import React from 'react';
import styled from 'styled-components';


const PicturePreview = styled.img`
  transform: scale(${(props) => props.scale / 100});
`;

export default PicturePreview;
