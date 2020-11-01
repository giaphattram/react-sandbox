import React from 'react';
const validationcomponent = (props) => {
	let outputText = ''
	if (props.inputLength < 5){
		outputText = 'Text too short';
	}else{
		outputText = 'Text long enough';
	}
	return(
		<div className = 'ValidationComponent'>
			<p>Validation COmponent: {outputText}</p>
		</div>
	)
}
export default validationcomponent
