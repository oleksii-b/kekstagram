import React from 'react';
import styled from 'styled-components';

import {getEffectLevelValue} from 'utils/helpers';


const PicturePreview = styled.img`
  filter: ${(props) => getEffectLevelValue(props)};
  transform: scale(${(props) => props.scale / 100});
`;

export default PicturePreview;
