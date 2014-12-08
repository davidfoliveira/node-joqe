# JOQE - Javascript Object Query Engine

## Installing

	npm install joqe

## Using

	var
	    joqe      = require('joqe'),
	    SOMEDATA  = [{X:"1",Y:"2",tags:"cow meat muu"},{X:"1",Y:"3",tags:"salmon fish slurp"},{X:"1",Y:"4",tags:"pork meat oinc"}];

	joqe.find(SOMEDATA,'[X="1"][Y="4"][tags*="meat"]');
	// Returns the last element
