import React from 'react';

interface size{
    size: string
}

const DotLoading:React.FC<size> = ({size}) => {

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent:"center"
      };
    
      const animationKeyframes = `
        @keyframes colorChange {
          0% {
            background: rgb(243, 224, 255);
          }
          40% {
            background: tomato;
          }
          100% {
            background: rgb(243, 224, 255);
          }
        }
      `;
    
      const divStyle: React.CSSProperties = {
        height: size,
        width: size,
        background: 'rgb(243, 224, 255)',
        marginRight: '2px',
        borderRadius: '100%',
        animation: 'colorChange 1s infinite',
      };
    
      const firstDivStyle: React.CSSProperties = {
        ...divStyle,
        animationDelay: '0s',
      };
    
      const secondDivStyle: React.CSSProperties = {
        ...divStyle,
        animationDelay: '250ms',
      };
    
      const thirdDivStyle: React.CSSProperties = {
        ...divStyle,
        animationDelay: '500ms',
      };
    
      const fourthDivStyle: React.CSSProperties = {
        ...divStyle,
        animationDelay: '750ms',
      };
    return (
        <>
        <style>{animationKeyframes}</style>
        <div style={containerStyle}>
	<div style={firstDivStyle}></div>
	<div style={secondDivStyle}></div>
	<div style={thirdDivStyle}></div>
	<div style={fourthDivStyle}></div>
</div>
        </>
    );
};

export default DotLoading;