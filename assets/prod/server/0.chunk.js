exports.ids = [0];
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _css = __webpack_require__(31);

var _button = __webpack_require__(30);

var _button2 = _interopRequireDefault(_button);

var _css2 = __webpack_require__(37);

var _tag = __webpack_require__(36);

var _tag2 = _interopRequireDefault(_tag);

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

var _dec, _class;
// 进入组件和离开组件的动画

// jsx -> js对象 -> Dom元素,把reactDOM单独出来是因为有可能吧js对象渲染为DOM/APP

// import Login from 'containers/Login/Login';


var _util = __webpack_require__(40);

var _reactRouterDom = __webpack_require__(6);

var _CSSTransitionGroup = __webpack_require__(16);

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(22);

var _CommentInput = __webpack_require__(26);

var _CommentInput2 = _interopRequireDefault(_CommentInput);

var _CommentList = __webpack_require__(27);

var _CommentList2 = _interopRequireDefault(_CommentList);

var _Loading = __webpack_require__(18);

var _Loading2 = _interopRequireDefault(_Loading);

var _login = __webpack_require__(19);

var _index = __webpack_require__(28);

var _index2 = _interopRequireDefault(_index);

var _axios = __webpack_require__(38);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// bring history
var CommentApp = (_dec = (0, _reactRedux.connect)(function (state) {
    return {
        login: state.login
    };
}, function (dispatch) {
    return {
        signOutAction: function signOutAction() {
            dispatch((0, _login.signOut)());
        },
        signInAction: function signInAction() {
            dispatch((0, _login.signIn)());
        }
    };
}), (0, _reactRouterDom.withRouter)(_class = _dec(_class = function (_Component) {
    (0, _inherits3.default)(CommentApp, _Component);

    function CommentApp(props) {
        (0, _classCallCheck3.default)(this, CommentApp);
        return (0, _possibleConstructorReturn3.default)(this, (CommentApp.__proto__ || (0, _getPrototypeOf2.default)(CommentApp)).call(this, props));
    }

    (0, _createClass3.default)(CommentApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._redirectSignInValidate(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this._redirectSignOutValidate(nextProps);
        }
        /**
         * 登出
         * 
         * @param {any} e
         * 
         * @memberOf CommentApp
         */

    }, {
        key: 'handleSignOut',
        value: function handleSignOut(e) {
            this.props.signOutAction();
        }
        /**
         * 验证需要跳转登录
         * 
         * @param {any} validataProps
         * 
         * @memberOf CommentApp
         */

    }, {
        key: '_redirectSignOutValidate',
        value: function _redirectSignOutValidate(validataProps) {
            var login = validataProps.login,
                history = validataProps.history;

            if (!login.isAuthenticating_in && !login.user) {
                history.push('Login', {});
            }
        }
        /**
         * 验证用户是否已登录
         * 
         * @param {any} validataProps
         * 
         * @memberOf CommentApp
         */

    }, {
        key: '_redirectSignInValidate',
        value: function _redirectSignInValidate(validataProps) {
            !this.props.login.user && this.props.signInAction();
        }
    }, {
        key: 'render',
        value: function render() {
            var userName = (0, _util.getDataDeep)(['user', 'userName'], this.props.login);
            return _react2.default.createElement(
                _CSSTransitionGroup2.default,
                {
                    transitionName: 'slideIn',
                    transitionEnterTimeout: 500,
                    transitionLeaveTimeout: 300,
                    transitionAppear: true,
                    transitionAppearTimeout: 500 },
                _react2.default.createElement(
                    'div',
                    { className: _index2.default.wrapper },
                    _react2.default.createElement(
                        'div',
                        { className: _index2.default.container },
                        _react2.default.createElement(
                            'div',
                            { className: _index2.default.header },
                            _react2.default.createElement(
                                _tag2.default,
                                { 'data-seed': 'logId' },
                                'welcome, ' + userName
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: _index2.default.content },
                            _react2.default.createElement(_CommentInput2.default, null),
                            _react2.default.createElement(_CommentList2.default, null)
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: _index2.default.footer },
                            _react2.default.createElement(
                                _button2.default,
                                {
                                    type: 'warning',
                                    onClick: this.handleSignOut.bind(this) },
                                'SIGNOUT'
                            )
                        )
                    )
                )
            );
        }
    }]);
    return CommentApp;
}(_react.Component)) || _class) || _class);
exports.default = CommentApp;

/***/ }),
/* 14 */,
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

var _react = __webpack_require__(0);

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

var _extends2 = __webpack_require__(33);

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
/* 23 */
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

var _CSSTransitionGroup = __webpack_require__(16);

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//ComponentWillRecieveProps -> shouldComponentUpdate -> ComponentWillMount -> render -> ComponentDidMount
var Comment = function (_Component) {
    (0, _inherits3.default)(Comment, _Component);

    function Comment() {
        (0, _classCallCheck3.default)(this, Comment);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Comment.__proto__ || (0, _getPrototypeOf2.default)(Comment)).call(this));

        _this.state = {
            timeString: ''
        };
        return _this;
    }
    // componentWillMount() {
    //     this._updateTimeString();
    //     this._timer = setInterval(
    //         this._updateTimeString.bind(this), 
    //         5000
    //     )
    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('------------------------->ssssssss')
    //     if (nextProps.comment.username == this.props.comment.username) {
    //         return false;
    //     }
    //     return true
    // }
    // componentWillUnmount() {
    //     clearInterval(this._timer);
    // }


    (0, _createClass3.default)(Comment, [{
        key: '_updateTimeString',
        value: function _updateTimeString() {
            var comment = this.props.comment;
            var duration = (+Date.now() - comment.createTime) / 1000;
            this.setState({
                timeString: duration > 60 ? Math.round(duration / 60) + '\u5206\u949F\u524D' : Math.round(Math.max(duration, 1)) + ' \u79D2\u524D'
            });
        }
    }, {
        key: 'handleDeleteComment',
        value: function handleDeleteComment() {
            if (this.props.onDeleteComment) {
                this.props.onDeleteComment(this.props.index);
            }
        }
    }, {
        key: '_getProcessedContent',
        value: function _getProcessedContent(content) {
            return content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/`([\S\s]+?)`/g, '<code>$1</code>');
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'comment' },
                _react2.default.createElement(
                    'div',
                    { className: 'comment-user' },
                    _react2.default.createElement(
                        'span',
                        null,
                        this.props.comment.username
                    ),
                    _react2.default.createElement('p', { dangerouslySetInnerHTML: {
                            __html: this._getProcessedContent(this.props.comment.content)
                        } }),
                    _react2.default.createElement(
                        'span',
                        null,
                        this.state.timeString
                    ),
                    _react2.default.createElement(
                        'span',
                        { onClick: this.handleDeleteComment.bind(this) },
                        '\u5220\u9664'
                    )
                )
            );
        }
    }]);
    return Comment;
}(_react.Component);

exports.default = Comment;

/***/ }),
/* 24 */
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

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommentInput = function (_Component) {
	(0, _inherits3.default)(CommentInput, _Component);

	function CommentInput(props) {
		(0, _classCallCheck3.default)(this, CommentInput);

		var _this = (0, _possibleConstructorReturn3.default)(this, (CommentInput.__proto__ || (0, _getPrototypeOf2.default)(CommentInput)).call(this, props));

		_this.state = {
			username: props.username,
			content: ''
		};
		return _this;
	}

	(0, _createClass3.default)(CommentInput, [{
		key: 'handleUsernameChange',
		value: function handleUsernameChange(event) {
			this.setState({
				username: event.target.value
			});
		}
	}, {
		key: 'handleContentChange',
		value: function handleContentChange(event) {
			this.setState({
				content: event.target.value
			});
		}
	}, {
		key: 'handleSubmit',
		value: function handleSubmit() {
			if (this.props.onSubmit) {
				var _state = this.state,
				    username = _state.username,
				    content = _state.content;

				this.props.onSubmit({
					username: username,
					content: content,
					// 变成毫秒级的表示
					createTime: +new Date()
				});
			}
			this.setState({
				content: ''
			});
		}
	}, {
		key: 'handleUsernameBlur',
		value: function handleUsernameBlur(event) {
			// this._saveUsername(event.target.value);
			if (this.props.onUserNameInputBlur) {
				this.props.onUserNameInputBlur(event.target.value);
			}
		}
	}, {
		key: '_saveUsername',
		value: function _saveUsername(name) {
			localStorage.setItem('username', name);
		}
	}, {
		key: '_loadUsername',
		value: function _loadUsername() {
			var username = localStorage.getItem('username');
			if (username) {
				this.setState({
					username: username
				});
			}
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			if (typeof window !== 'undefined') {
				this._loadUsername();
			}
		}
	}, {
		key: 'handleImmutable',
		value: function handleImmutable() {
			this.setState({
				immutable: {
					data: 222
				}
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.textarea.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				'div',
				{ className: 'comment-input' },
				_react2.default.createElement(
					'div',
					{ className: 'comment-field' },
					_react2.default.createElement(
						'span',
						{ className: 'comment-field-name' },
						'\u7528\u6237\u540D:'
					),
					_react2.default.createElement(
						'div',
						{ className: 'comment-field-input' },
						_react2.default.createElement('input', { type: 'text',
							value: this.state.username,
							onChange: this.handleUsernameChange.bind(this),
							onBlur: this.handleUsernameBlur.bind(this),
							ref: function ref(input) {
								_this2.input = input;
							} })
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'comment-field' },
					_react2.default.createElement(
						'span',
						{ className: 'comment-field-name' },
						'\u8BC4\u8BBA:'
					),
					_react2.default.createElement(
						'div',
						{ className: 'comment-field-input' },
						_react2.default.createElement('textarea', {
							value: this.state.content,
							onChange: this.handleContentChange.bind(this),
							ref: function ref(textarea) {
								_this2.textarea = textarea;
							} })
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'comment-field-button' },
					_react2.default.createElement('input', { type: 'button', value: '\u53D1\u5E03', onClick: this.handleSubmit.bind(this) })
				),
				this.props.children
			);
		}
	}]);
	return CommentInput;
}(_react.Component); // import { Button } from 'antd-mobile'


exports.default = CommentInput;

CommentInput.propTypes = {
	onSubmit: _react.PropTypes.func
};

/***/ }),
/* 25 */
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

var _CSSTransitionGroup = __webpack_require__(16);

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Comment = __webpack_require__(23);

var _Comment2 = _interopRequireDefault(_Comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommentList = function (_Component) {
    (0, _inherits3.default)(CommentList, _Component);

    function CommentList() {
        (0, _classCallCheck3.default)(this, CommentList);
        return (0, _possibleConstructorReturn3.default)(this, (CommentList.__proto__ || (0, _getPrototypeOf2.default)(CommentList)).apply(this, arguments));
    }

    (0, _createClass3.default)(CommentList, [{
        key: 'handleDeleteComment',
        value: function handleDeleteComment(index) {
            if (this.props.onDeleteComment) {
                this.props.onDeleteComment(index);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var comments = this.props.comments || [];
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _CSSTransitionGroup2.default,
                    {
                        transitionName: 'example',
                        transitionEnterTimeout: 500,
                        transitionLeaveTimeout: 300,
                        transitionAppear: true,
                        transitionAppearTimeout: 500 },
                    comments.map(function (item, i) {
                        return _react2.default.createElement(_Comment2.default, {
                            comment: item,
                            key: i,
                            index: i,
                            onDeleteComment: _this2.handleDeleteComment.bind(_this2)
                        });
                    })
                )
            );
        }
    }]);
    return CommentList;
}(_react.Component);

exports.default = CommentList;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(32);

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = __webpack_require__(21);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = __webpack_require__(39);

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(22);

var _CommentInput = __webpack_require__(24);

var _CommentInput2 = _interopRequireDefault(_CommentInput);

var _comment = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Login from 'containers/Login/Login'
var CommentInputContainer = function (_Component) {
    (0, _inherits3.default)(CommentInputContainer, _Component);

    function CommentInputContainer() {
        (0, _classCallCheck3.default)(this, CommentInputContainer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CommentInputContainer.__proto__ || (0, _getPrototypeOf2.default)(CommentInputContainer)).call(this));

        _this.state = {
            username: ''
        };
        return _this;
    }

    (0, _createClass3.default)(CommentInputContainer, [{
        key: '_loadUsername',
        value: function _loadUsername() {
            var username = localStorage.getItem('username');
            if (username) {
                this.setState({
                    username: username
                });
            }
        }
    }, {
        key: '_saveUsername',
        value: function _saveUsername(name) {
            localStorage.setItem('username', name);
        }
    }, {
        key: 'handleSubmitComment',
        value: function handleSubmitComment(comment) {
            if (!comment) return;
            if (!comment.username) return alert('请输入用户名');
            if (!comment.content) return alert('请输入评论内容');
            if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) !== undefined) {
                var comments = this.props.comments;

                var newComments = [].concat((0, _toConsumableArray3.default)(comments), [comment]);
                localStorage.setItem('comments', (0, _stringify2.default)(newComments));
            }
            if (this.props.onSubmit) {
                this.props.onSubmit(comment);
            }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            // 浏览器环境
            if (typeof window !== 'undefined') {
                this._loadUsername();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_CommentInput2.default, {
                username: this.state.username,
                onUserNameInputBlur: this._saveUsername.bind(this),
                onSubmit: this.handleSubmitComment.bind(this) });
        }
    }]);
    return CommentInputContainer;
}(_react.Component);
// 不同的connect组件只要引入了相同的state,就会同步渲染
// connect组件内部对mapToProps进行前后比对,如果一样,则不做渲染
// 等于改变了props,触发了componentReceive -> shouleComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate


var mapStateToProps = function mapStateToProps(state) {
    return {
        comments: state.comment.comments
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onSubmit: function onSubmit(comment) {
            dispatch((0, _comment.addComment)(comment));
        }
    };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CommentInputContainer);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(32);

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = __webpack_require__(21);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(22);

var _CommentList = __webpack_require__(25);

var _CommentList2 = _interopRequireDefault(_CommentList);

var _comment = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// smart组件 
// 负责评论列表数据的加载、初始化和删除
var CommentListContainer = function (_Component) {
    (0, _inherits3.default)(CommentListContainer, _Component);

    function CommentListContainer() {
        (0, _classCallCheck3.default)(this, CommentListContainer);
        return (0, _possibleConstructorReturn3.default)(this, (CommentListContainer.__proto__ || (0, _getPrototypeOf2.default)(CommentListContainer)).apply(this, arguments));
    }

    (0, _createClass3.default)(CommentListContainer, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            // 浏览器环境
            if (typeof window !== 'undefined') {
                this._loadComments();
            }
        }
    }, {
        key: '_loadComments',
        value: function _loadComments() {
            var comments = localStorage.getItem('comments');
            comments = comments ? JSON.parse(comments) : [];
            // this.props.initComments(comments);
        }
    }, {
        key: 'handleDeleteComment',
        value: function handleDeleteComment(index) {
            var comments = this.props.comments;

            var newComments = [].concat((0, _toConsumableArray3.default)(comments.slice(0, index)), (0, _toConsumableArray3.default)(comments.slice(index + 1)));
            localStorage.setItem('comments', (0, _stringify2.default)(newComments));
            if (this.props.onDeleteComment) {
                this.props.onDeleteComment(index);
            }
            // setTimeout(() => {
            //     this.props.onAfterDeleteComment({
            //         username: 'joechan',
            //         content: 'thunk_test'
            //     })
            // }, 1000)
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_CommentList2.default, {
                comments: this.props.comments,
                onDeleteComment: this.handleDeleteComment.bind(this) });
        }
    }]);
    return CommentListContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        comments: state.comment.comments
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        // 提供给 CommentListContainer
        // 当从 LocalStorage 加载评论列表以后就会通过这个方法
        // 把评论列表初始化到 state 当中
        initComments: function initComments(comments) {
            dispatch((0, _comment.initComments)(comments));
        },
        // 删除评论
        onDeleteComment: function onDeleteComment(commentIndex) {
            dispatch((0, _comment.deleteComment)(commentIndex));
        },
        // 测试after删除
        onAfterDeleteComment: function onAfterDeleteComment(comment) {
            dispatch((0, _comment.afterDeleteComment)(comment));
        }
    };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CommentListContainer);

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = {
	"wrapper": "index_wrapper",
	"container": "index_container",
	"header": "index_header",
	"footer": "index_footer",
	"content": "index_content"
};

/***/ })
];;