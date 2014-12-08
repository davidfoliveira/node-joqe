# JOQE - Javascript Object Query Engine

## Installing

	npm install joqe

## Using

	var
	    joqe      = require('joqe'),
	    SOMEDATA  = [{X:"1",Y:"2",tags:"cow meat muu"},{X:"1",Y:"3",tags:"salmon fish slurp"},{X:"1",Y:"4",tags:"pork meat oinc"}];

	joqe.find(SOMEDATA,'[X="1"][Y="4"][tags*="meat"]');
	// Returns the last element

## Supported operators

- `=` or `==` : Equal to;
- `!=` : Not Equal Selector;
- `|=` : Contains Prefix - Selects elements which the value of the specified property is either equal to a given string or starting with that string followed by a hyphen (-);
- `*=` : Contains - Selects elements which the value of the specified property contains the following text;
- `~=` : Contains Word - Selects elements which the value of the specified property contains a given word, delimited by spaces;
- `^=` : Starts With;
- `$=` : Ends With;
