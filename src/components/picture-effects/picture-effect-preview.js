import React from 'react';
import styled from 'styled-components';

import {getEffectLevelValue} from 'utils/helpers';

const PictureEffectPreview = styled.div`
  background-image: url(${(props) => props.src});
  filter: ${(props) => getEffectLevelValue(props)};
`;

export default PictureEffectPreview;
