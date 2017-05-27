exports.ids = [1];
exports.modules = [
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _css = __webpack_require__(35);

var _button = __webpack_require__(34);

var _button2 = _interopRequireDefault(_button);

var _css2 = __webpack_require__(39);

var _carousel = __webpack_require__(38);

var _carousel2 = _interopRequireDefault(_carousel);

var _getPrototypeOf = __webpack_require__(0);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(1);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(4);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3);

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _comment = __webpack_require__(17);

var _reactRedux = __webpack_require__(22);

var _reactRouterDom = __webpack_require__(6);

var _login = __webpack_require__(19);

var _CSSTransitionGroup = __webpack_require__(16);

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _index = __webpack_require__(29);

var _index2 = _interopRequireDefault(_index);

var _Loading = __webpack_require__(18);

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = (_dec = (0, _reactRedux.connect)(function (state) {
    return {
        login: state.login
    };
}, function (dispatch) {
    return {
        signInAction: function signInAction(user) {
            dispatch((0, _login.signIn)(user));
        }
    };
}), (0, _reactRouterDom.withRouter)(_class = _dec(_class = function (_Component) {
    (0, _inherits3.default)(Login, _Component);

    function Login(props) {
        (0, _classCallCheck3.default)(this, Login);

        /**
         * 通过js引入的图片webpack不会打包
         * 通过require的东西会被打包到bundle
         * 返回的是imgs/xxx.jpeg
         * 即url-loader处理过的路径
         */
        var _this = (0, _possibleConstructorReturn3.default)(this, (Login.__proto__ || (0, _getPrototypeOf2.default)(Login)).call(this, props));

        _this.state = {
            data: [__webpack_require__(31), __webpack_require__(30), __webpack_require__(32), __webpack_require__(33)]
        };
        return _this;
    }

    (0, _createClass3.default)(Login, [{
        key: 'handleLogin',
        value: function handleLogin() {
            this.props.signInAction({
                userName: 'JOE',
                content: 'now'
            });
        }
    }, {
        key: 'handleImage',
        value: function handleImage(e) {
            e.preventDefault();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this._validateSignOut(nextProps);
        }
    }, {
        key: '_validateSignOut',
        value: function _validateSignOut(validateProps) {
            var login = validateProps.login,
                history = validateProps.history;

            if (login.isAuthenticating_in && login.isAuthenticate_success) {
                history.push('/', {});
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var page_height = document.documentElement.clientHeight;
            return _react2.default.createElement(
                _CSSTransitionGroup2.default,
                {
                    transitionName: 'example',
                    transitionEnterTimeout: 500,
                    transitionLeaveTimeout: 300,
                    transitionAppear: true,
                    transitionAppearTimeout: 500 },
                _react2.default.createElement(
                    'div',
                    { className: _index2.default.medium },
                    _react2.default.createElement(
                        _carousel2.default,
                        {
                            className: _index2.default.my_carousel,
                            style: { height: '100%' }
                            // autoplay={true} 
                            , infinite: true
                        },
                        this.state.data.map(function (ii) {
                            return _react2.default.createElement(
                                'a',
                                { href: 'http://www.baidu.com', key: ii, onClick: _this2.handleImage.bind(_this2) },
                                _react2.default.createElement('img', {
                                    style: { height: page_height },
                                    src: '' + ii
                                })
                            );
                        })
                    ),
                    this.props.login.isAuthenticating_in && !this.props.login.isAuthenticate_success ? _react2.default.createElement(_Loading2.default, { loading_content: 'loading_content' }) : null,
                    _react2.default.createElement(
                        'div',
                        { className: '' + _index2.default.login },
                        _react2.default.createElement(
                            _button2.default,
                            {
                                // size='small'
                                inline: true,
                                onClick: this.handleLogin.bind(this),
                                style: { backgroundColor: 'red', color: '#fff' } },
                            '\u767B\u5F55/\u6CE8\u518C'
                        ),
                        _react2.default.createElement(
                            _button2.default,
                            {
                                // size='small'
                                inline: true,
                                style: { color: 'red' } },
                            '\u8FDB\u5165&\u4F53\u9A8C'
                        )
                    )
                )
            );
        }
    }]);
    return Login;
}(_react.Component)) || _class) || _class);
exports.default = Login;

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.afterDeleteComment = exports.deleteComment = exports.addComment = exports.initComments = undefined;

var _toConsumableArray2 = __webpack_require__(21);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// action types
var INIT_COMMENTS = 'INIT_COMMENTS';
var ADD_COMMENT = 'ADD_COMMENT';
var DELETE_COMMENT = 'DELETE_COMMENT';
var AFTER_DELETE_COMMENT = 'AFTER_DELETE_COMMENT';

exports.default = function (state, action) {
    if (!state) {
        state = {
            comments: [],
            test: ''
        };
    }
    switch (action.type) {
        case INIT_COMMENTS:
            return {
                comments: action.comments
            };
        case ADD_COMMENT:
            console.log('nextconment===========', [].concat((0, _toConsumableArray3.default)(state.comments), [action.comment]));
            return {
                comments: [].concat((0, _toConsumableArray3.default)(state.comments), [action.comment])
            };
        case DELETE_COMMENT:
            return {
                comments: [].concat((0, _toConsumableArray3.default)(state.comments.slice(0, action.commentIndex)), (0, _toConsumableArray3.default)(state.comments.slice(action.commentIndex + 1)))
            };
        case AFTER_DELETE_COMMENT:
            return {
                comments: [].concat((0, _toConsumableArray3.default)(state.comments), [action.comment])
            };
        default:
            return state;
    }
};
// action creators


var initComments = exports.initComments = function initComments(comments) {
    return { type: INIT_COMMENTS, comments: comments };
};
var addComment = exports.addComment = function addComment(comment) {
    return { type: ADD_COMMENT, comment: comment };
};

var deleteComment = exports.deleteComment = function deleteComment(commentIndex) {
    return { type: DELETE_COMMENT, commentIndex: commentIndex };
};

var afterDeleteComment = exports.afterDeleteComment = function afterDeleteComment(comment) {
    return { type: AFTER_DELETE_COMMENT, comment: comment };
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _CSSTransitionGroup = __webpack_require__(16);

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _index = __webpack_require__(20);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    var loading_content = props.loading_content;

    return _react2.default.createElement(
        _CSSTransitionGroup2.default,
        {
            transitionName: 'example',
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 300,
            transitionAppear: true,
            transitionAppearTimeout: 500 },
        _react2.default.createElement(
            'div',
            { className: _index2.default.login_container },
            _react2.default.createElement(
                'div',
                { className: _index2.default.sk_fading_circle },
                _react2.default.createElement('div', { className: '' + _index2.default.sk_circle }),
                _react2.default.createElement('div', { className: _index2.default.sk_circle + ' ' + _index2.default.sk_circle2 }),
                _react2.default.createElement('div', { className: _index2.default.sk_circle + ' ' + _index2.default.sk_circle3 }),
                _react2.default.createElement('div', { className: _index2.default.sk_circle + ' ' + _index2.default.sk_circle4 }),
                _react2.default.createElement('div', { className: _index2.default.sk_circle + ' ' + _index2.default.sk_circle5 }),
                _react2.default.createElement('div', { className: _index2.default.sk_circle + ' ' + _index2.default.sk_circle6 }),
                _react2.default.createElement('div', { className: _index2.default.sk_circle + ' ' + _index2.default.sk_circle7 }),
                _react2.default.createElement('div', { className: _index2.default.sk_circle + ' ' + _index2.default.sk_circle8 }),
                _react2.default.createElement('div', { className: _index2.default.sk_circle + ' ' + _index2.default.sk_circle9 }),
                _react2.default.createElement('div', { className: _index2.default.sk_circle + ' ' + _index2.default.sk_circle10 }),
                _react2.default.createElement('div', { className: _index2.default.sk_circle + ' ' + _index2.default.sk_circle11 }),
                _react2.default.createElement('div', { className: _index2.default.sk_circle + ' ' + _index2.default.sk_circle12 })
            ),
            _react2.default.createElement(
                'div',
                null,
                loading_content
            )
        )
    );
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signOut = exports.signIn = undefined;

var _extends2 = __webpack_require__(37);

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// action types
var SIGN_IN = 'SIGN_IN';
var SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
var SIGN_IN_FAIL = 'SIGN_IN_FAIL';
var SIGN_OUT = 'SIGN_OUT';
var SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
var SIGN_OUT_FAIL = 'SIGN_OUT_FAIL';

exports.default = function (state, action) {
    if (!state) {
        state = {
            user: null,
            isAuthenticating_in: false,
            isAuthenticating_out: false,
            isAuthenticate_success: false,
            isAuthenticate_fail: false
        };
    }
    switch (action.type) {
        case SIGN_IN:
            return (0, _extends3.default)({}, state, {
                isAuthenticating_in: true,
                isAuthenticate_success: false,
                isAuthenticate_fail: false
            });
        case SIGN_IN_SUCCESS:
            return (0, _extends3.default)({}, state, {
                user: action.result,
                isAuthenticating_in: true,
                isAuthenticate_success: true,
                isAuthenticate_fail: false
            });
        case SIGN_IN_FAIL:
            return (0, _extends3.default)({}, state, {
                isAuthenticating_in: true,
                isAuthenticate_success: false,
                isAuthenticate_fail: true
            });
        case SIGN_OUT:
            return (0, _extends3.default)({}, state, {
                isAuthenticating_in: false,
                isAuthenticating_out: true,
                isAuthenticate_success: false,
                isAuthenticate_fail: false

            });
        case SIGN_OUT_SUCCESS:
            return (0, _extends3.default)({}, state, {
                user: null,
                isAuthenticating_out: true,
                isAuthenticate_success: true,
                isAuthenticate_fail: false

            });
        case SIGN_OUT_FAIL:
            return (0, _extends3.default)({}, state, {
                isAuthenticating_out: true,
                isAuthenticate_success: false,
                isAuthenticate_fail: true

            });
        default:
            return state;
    }
};
// action creators


var signIn = exports.signIn = function signIn(user) {
    return { type: SIGN_IN, user: user };
};
var signOut = exports.signOut = function signOut(user) {
    return { type: SIGN_OUT, user: user };
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {
	"login_container": "index_login_container",
	"loginContainer": "index_login_container",
	"sk_fading_circle": "index_sk_fading_circle",
	"skFadingCircle": "index_sk_fading_circle",
	"sk_circle": "index_sk_circle",
	"skCircle": "index_sk_circle",
	"sk-circleFadeDelay": "index_sk-circleFadeDelay",
	"skCircleFadeDelay": "index_sk-circleFadeDelay",
	"sk_circle2": "index_sk_circle2",
	"skCircle2": "index_sk_circle2",
	"sk_circle3": "index_sk_circle3",
	"skCircle3": "index_sk_circle3",
	"sk_circle4": "index_sk_circle4",
	"skCircle4": "index_sk_circle4",
	"sk_circle5": "index_sk_circle5",
	"skCircle5": "index_sk_circle5",
	"sk_circle6": "index_sk_circle6",
	"skCircle6": "index_sk_circle6",
	"sk_circle7": "index_sk_circle7",
	"skCircle7": "index_sk_circle7",
	"sk_circle8": "index_sk_circle8",
	"skCircle8": "index_sk_circle8",
	"sk_circle9": "index_sk_circle9",
	"skCircle9": "index_sk_circle9",
	"sk_circle10": "index_sk_circle10",
	"skCircle10": "index_sk_circle10",
	"sk_circle11": "index_sk_circle11",
	"skCircle11": "index_sk_circle11",
	"sk_circle12": "index_sk_circle12",
	"skCircle12": "index_sk_circle12"
};

/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, exports) {

module.exports = {
	"medium": "index_medium",
	"my_carousel": "index_my_carousel",
	"myCarousel": "index_my_carousel",
	"login": "index_login"
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "imgs/1b47bb675b7deb8df6e3527363098882-be1aa.jpeg";

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "imgs/43159800e84286929d5462183144176f-a6f7f.jpeg";

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "imgs/acf4842e063a80de2a86c15f17b0430a-ed1b2.jpg";

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "imgs/ff08c0582da0431d70a99098a4132c38-5a365.jpeg";

/***/ })
];;