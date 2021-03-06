Expression.TruthValue = function TruthValue(v) {

};

_ = Expression.TruthValue.prototype = Object.create(Expression.prototype);

Expression.True = new Expression.TruthValue();
Expression.False = new Expression.TruthValue();

//Only difference:
Expression.False['~'] = function () {
	return Expression.True;
};


_['~'] = function () {
	return Expression.False;
};
_['V'] = function (e) {
	return e === Expression.True ? e : this;
};
_['^'] = function (e) {
	return e === Expression.True ? this : e;
};


Expression.Statement = function (x, y, operator) {
	var arr = [x,y];
	arr.operator = operator;
	arr.__proto__ = Expression.Statement.prototype;
	return arr;
};
//todo: truth value type?
_ = Expression.Statement.prototype = Object.create(Expression.prototype);
_.constructor = Expression.Statement;
_['='] = function () {
	
};
_['<'] = function () {
	// a < b < c
	// (a < b) = b
	// b < c
	
	// a < (b < c)
	// a < b .. (b < c) = b
	// (a < b) = a.
};
_.solve = function (vars) {
	// a = b
	// If b has an additive inverse?
	
	// a - b = 0
	var a_b = (this.a)['-'](this.b);
	/*
	Examples:
	(1,2,3) - (x,y,z) = 0 (solve for x,y,z)
	(1,2,3) - x = 0 (solve for x)
	*/
	return a_b.roots(vars);
};