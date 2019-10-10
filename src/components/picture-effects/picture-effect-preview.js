import React from 'react';
import styled from 'styled-components';

import {getEffectLevelValue} from 'utils/helpers';


const PictureEffectPreview = styled.div`
  filter: ${(props) => getEffectLevelValue(props)};
`;

export default PictureEffectPreview;
