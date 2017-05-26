exports.ids = [2];
exports.modules = {

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getPrototypeOf = __webpack_require__(1);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(5);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(4);

var _inherits3 = _interopRequireDefault(_inherits2);

var _class;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoMatch = (0, _reactRouterDom.withRouter)(_class = function (_Component) {
    (0, _inherits3.default)(NoMatch, _Component);

    function NoMatch() {
        (0, _classCallCheck3.default)(this, NoMatch);
        return (0, _possibleConstructorReturn3.default)(this, (NoMatch.__proto__ || (0, _getPrototypeOf2.default)(NoMatch)).apply(this, arguments));
    }

    (0, _createClass3.default)(NoMatch, [{
        key: 'render',
        value: function render() {
            var location = this.props.location;

            return _react2.default.createElement(
                'div',
                null,
                'this is a 404 page',
                location.pathname
            );
        }
    }]);
    return NoMatch;
}(_react.Component)) || _class;

exports.default = NoMatch;

/***/ })

};;