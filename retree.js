"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.prepareData = prepareData;
exports.getChecked = getChecked;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReTree = function (_React$Component) {
	_inherits(ReTree, _React$Component);

	function ReTree() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, ReTree);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReTree.__proto__ || Object.getPrototypeOf(ReTree)).call.apply(_ref, [this].concat(args))), _this), _this.onCheck = function (x) {
			return _this.props.onChange(setPropCascadingDFS(_this.props.data, "id", x, "checked", true));
		}, _this.onUncheck = function (x) {
			return _this.props.onChange(setPropCascadingDFS(_this.props.data, "id", x, "checked", false));
		}, _this.onCollapse = function (x) {
			return _this.props.onChange(setPropDFS(_this.props.data, "id", x, "collapsed", true));
		}, _this.onUncollapse = function (x) {
			return _this.props.onChange(setPropDFS(_this.props.data, "id", x, "collapsed", false));
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(ReTree, [{
		key: "render",


		/*filterRepo = (e) => {
  	this.setState({searchString:e.target.value}, ()=> this.props.onChange(treeFilter(this.props.data, this.state.searchString)));
  }*/

		value: function render() {
			return _react2.default.createElement(StatelessTree, {
				onCollapse: this.onCollapse,
				onUncollapse: this.onUncollapse,
				onCheck: this.onCheck,
				onUncheck: this.onUncheck,
				id: this.props.data.id,
				label: this.props.data.label,
				collapsed: this.props.data.collapsed,
				checked: this.props.data.checked,
				children: this.props.data.children
			});
		}
	}]);

	return ReTree;
}(_react2.default.Component);

exports.default = ReTree;
function prepareData(x) {
	x.checked = false;
	x.hidden = false;
	x.path === 'root' ? x.collapsed = false : x.collapsed = true;
	if (x.children) x.children.map(prepareData);
	//console.log(x);
	return x;
}

function setPropDFS(x, key, keyVal, prop, value) {
	//console.log(`Finding node with ${key}=${keyVal} to set ${prop}=${value}`)
	if (x[key] === keyVal) {
		x[prop] = value;
		//console.log(x)
		return x;
	} else {
		if (x.children) {
			x.children.map(function (t) {
				return setPropDFS(t, key, keyVal, prop, value);
			});
			//console.log(x)
			return x;
		} else {
			//console.log('Node not found');
			return x;
		}
	}
}

function setPropCascadingDFS(x, key, keyVal, prop, value) {
	//console.log(`Finding node with ${key}=${keyVal} to set ${prop}=${value}`)
	if (x[key] === keyVal) setPropCascadingNoFilter(x, prop, value);else {
		if (x.children) {
			x.children.map(function (t) {
				return setPropCascadingDFS(t, key, keyVal, prop, value);
			});
			//console.log(x)
			return x;
		} else {
			//console.log('Node not found');
			return x;
		}
	}
}

function setPropCascadingNoFilter(x, prop, value) {
	if (x.hidden === false) {
		x[prop] = value;
		if (x.children) x.children.map(function (t) {
			return setPropCascadingNoFilter(t, prop, value);
		});
	}
	return x;
}

function getChecked(x, accum) {
	if (x.checked) accum.add(x);
	if (x.children) for (var i = 0; i < x.children.length; i++) {
		accum = getChecked(x.children[i], accum);
	}return accum;
}

var StatelessTree = function (_React$Component2) {
	_inherits(StatelessTree, _React$Component2);

	function StatelessTree() {
		var _ref2;

		var _temp2, _this2, _ret2;

		_classCallCheck(this, StatelessTree);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = StatelessTree.__proto__ || Object.getPrototypeOf(StatelessTree)).call.apply(_ref2, [this].concat(args))), _this2), _this2.toggleCollapse = function () {
			return _this2.props.collapsed ? _this2.props.onUncollapse(_this2.props.id) : _this2.props.onCollapse(_this2.props.id);
		}, _this2.toggleChecked = function () {
			return _this2.props.checked ? _this2.props.onUncheck(_this2.props.id) : _this2.props.onCheck(_this2.props.id);
		}, _temp2), _possibleConstructorReturn(_this2, _ret2);
	}

	_createClass(StatelessTree, [{
		key: "render",
		value: function render() {
			var _this3 = this;

			if (!this.props.hidden) return _react2.default.createElement(
				"div",
				{ className: this.props.className },
				this.props.children && this.props.children.length ? _react2.default.createElement("span", { className: this.props.collapsed ? 'tree-view_arrow-collapsed tree-view_arrow' : 'tree-view_arrow', onClick: this.toggleCollapse }) : _react2.default.createElement("span", { className: "tree-view_children spacer" }),
				this.props.checkable ? _react2.default.createElement("input", {
					type: "checkbox",
					checked: this.props.checked,
					onChange: this.toggleChecked }) : "",
				_react2.default.createElement(
					"span",
					null,
					" ",
					" ",
					this.props.label
				),
				this.props.children && this.props.children.length ? _react2.default.createElement(
					"div",
					null,
					this.props.children.map(function (t, i) {
						return _react2.default.createElement(StatelessTree, {
							checkable: true,
							collapsed: t.collapsed,
							onCheck: _this3.props.onCheck,
							onUncheck: _this3.props.onUncheck,
							onCollapse: _this3.props.onCollapse,
							onUncollapse: _this3.props.onUncollapse,
							checked: t.checked,
							className: _this3.props.collapsed ? "tree-view_children tree-view_children-collapsed" : "tree-view_children",
							id: t.id,
							key: t.id,
							label: t.label,
							children: t.children,
							hidden: t.hidden
						});
					})
				) : ""
			);else return null;
		}
	}]);

	return StatelessTree;
}(_react2.default.Component);
