"use strict";


// Query over data
exports.query = function(data,xpr) {

    var
        set = (data instanceof Array) ? data : [data];

	return _queryList(set,xpr);

};
exports.find = exports.query;


function _queryList(inSet,xpr) {

    var
        matched = false,
        set     = inSet;

    if ( set == null || !set instanceof Array )
        return [];

    // While we have expressions
    while ( !xpr.match(/^\s*$/) ) {
        matched = false;
        xpr = xpr.replace(/^(?:\s*(>>|\+{1,2}])\s?|(\s+))?([\w\-\.]+)?\[([\w\-]+)\s*([\|\*\~\$\!\^=]*=)\s*\"([^"]*)\"\s*\]/,function(all,sym,spaces,name,prop,op,val){
            matched = true;

            var
                preSel  = _ps_myChilds;

            if ( spaces ) {
                set = _ps_myChilds(set);
                console.log("SPACES: ",set.length);
                return "";
            }
            else if ( sym ) {
                if ( sym == ">>" )
                    preSel = _ps_allChilds;
                else if ( sym == "+" )
                    preSel = _ps_nearBrothers;
                else if ( sym == "++" )
                    preSel = _ps_allBrothers;
            }

            // Apply preSel
            var
                _set = preSel(set),
                _res = [];

//            console.log("N: ",name);
//            console.log("P: ",prop);
//            console.log("O: ",op);
//            console.log("V: ",val);
//            console.log("ON: "+_set.length+" items");

            // Reduce data
            _set.forEach(function(item){
                if ( item == null || typeof item != "object" )
                    return;
                if ( _itemMatch(item,prop,op,val) )
                    _res.push(item);
            });

//            console.log("REDUCED SET TO "+_res.length+" ITEM(S)");
            set = _res;
            return "";
        });
        if ( !matched && !xpr.match(/^\s*$/) ) {
            console.log("Cannot parse expression after '"+xpr+"'");
			break;
        }
    }

    return set;

}

function _itemMatch(item,prop,attrOp,attrVal) {

    var
        val = item[prop];

    if ( val == null )
        return false;
    if ( attrOp == "=" || attrOp == "==" )
        return (val == attrVal);
    if ( attrOp == "!=" )
        return (val != attrVal);
    else if ( attrOp == "|=" )
        return (val == attrVal || val.indexOf(attrVal+"-") == 0);
    else if ( attrOp == "*=" )
        return (val.indexOf(attrVal) > -1);
    else if ( attrOp == "~=" ) {
        attrVal = attrVal.replace(/^\s+|\s+$/g,"");
        return (val == attrVal || val.substring(0,attrVal.length+1) == attrVal+" " || val.substring(val.length-attrVal.length-1,val.length) == " "+attrVal || val.indexOf(" "+attrVal+" ") > -1 );
    }
    else if ( attrOp == "$=" )
        return (val == attrVal || val.substring(val.length-attrVal.length,val.length) == attrVal);
    else if ( attrOp == "^=" )
        return (val == attrVal || val.substring(0,attrVal.length) == attrVal);
}

function _ps_myChilds(el) {

    var
        res = [];

    if ( typeof el == "object" ) {
        if ( el instanceof Array ) {
            el.forEach(function(sel){
                res.push(sel);
            });
        }
        else {
            for ( var p in el ) {
                if ( typeof el[p] == "object" && !(el[p] instanceof Array) ) {
                    res.push(el[p]);
                }
            }
        }
    }

    return res;

}

function _ps_allChilds(el) {

    var
        res = [];

    if ( typeof el == "object" ) {
        res.push(el);
        if ( el instanceof Array ) {
            el.forEach(function(sel){
                res.push(sel);
                res = res.concat(_ps_allChilds(sel));
            });
        }
        else {
            for ( var p in el ) {
                if ( typeof el[p] == "object" ) {
                    if ( el[p] instanceof Array )
                        res = res.concat(_ps_allChilds(el[p]));
                    else
                        res.push(el[p]);

                }
            }
        }
    }

    return res;

}
