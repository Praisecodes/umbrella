import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

interface Props extends IconProps { }

const SearchIcon: React.FC<Props> = ({ svgProps, pathProps, color }) => {
  return (
    <Svg {...svgProps} width={svgProps?.width ?? 15} height={svgProps?.height ?? 15} fill={svgProps?.fill ?? "none"} viewBox={svgProps?.viewBox ?? "0 0 15 15"}>
      <Path
        {...pathProps}
        d="M14.1 14.5051C14.4833 14.8815 15.075 14.3006 14.6917 13.9325L11.5667 10.8564C12.6631 9.66577 13.2691 8.11724 13.2667 6.51218C13.2667 2.92066 10.2917 0 6.63333 0C2.975 0 0 2.92066 0 6.51218C0 10.1037 2.975 13.0244 6.63333 13.0244C8.28333 13.0244 9.80833 12.4271 10.975 11.4372L14.1 14.5051ZM0.8325 6.51218C0.8325 3.37062 3.44083 0.818113 6.6325 0.818113C9.8325 0.818113 12.4325 3.37062 12.4325 6.51218C12.4325 9.65373 9.8325 12.2062 6.6325 12.2062C3.44083 12.2062 0.8325 9.65373 0.8325 6.51218Z"
        fill={color ?? "#353535"}
      />
    </Svg>
  )
}

export default SearchIcon;
