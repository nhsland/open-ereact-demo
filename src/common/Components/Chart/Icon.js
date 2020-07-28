import React from 'react';

export const Circle = () => {
  return (
    <svg width="16" height="16">
      <circle cx="8" cy="8" r="7" fill="#fff" strokeWidth={1} stroke="#000" />
    </svg>
  );
};

export const Square = () => {
  return (
    <svg width="16" height="16">
      <rect width="14" height="14" fill="#fff" strokeWidth={1} stroke="#000" />
    </svg>
  );
};

export const Daimnond = () => {
  return (
    <svg width="16" height="16">
      <polygon
        points="0,7 7,0 14,7 7,14"
        fill="#fff"
        strokeWidth={1}
        stroke="#000"
      />
    </svg>
  );
};

export const Hexagon = () => {
  return (
    <svg width="16" height="16">
      <polygon
        points="0,10 0,4 7,0 14,4 14,10 7,14"
        fill="#fff"
        strokeWidth={1}
        stroke="#000"
      />
    </svg>
  );
};

export const Triangle = () => {
  return (
    <svg width="16" height="16">
      <polygon
        points="0,14 7,0 14,14"
        fill="#fff"
        strokeWidth={1}
        stroke="#000"
      />
    </svg>
  );
};

export const TriangleMirrow = () => {
  return (
    <svg width="16" height="16">
      <polygon
        points="0,1 14,1 7,14"
        fill="#fff"
        strokeWidth={1}
        stroke="#000"
      />
    </svg>
  );
};
