import React from 'react';

const Image = props => {
	console.log(props);
	return <img src={props.image.urls.thumb} alt="simple " />;
};

export default Image;
