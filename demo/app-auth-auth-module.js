(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-auth-auth-module"],{

/***/ "./node_modules/angularx-social-login/angularx-social-login.es5.js":
/*!*************************************************************************!*\
  !*** ./node_modules/angularx-social-login/angularx-social-login.es5.js ***!
  \*************************************************************************/
/*! exports provided: AuthService, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule, SocialUser, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthServiceConfig", function() { return AuthServiceConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacebookLoginProvider", function() { return FacebookLoginProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleLoginProvider", function() { return GoogleLoginProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocialLoginModule", function() { return SocialLoginModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocialUser", function() { return SocialUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return BaseLoginProvider; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");




/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AuthServiceConfig = /** @class */ (function () {
    function AuthServiceConfig(providers) {
        this.lazyLoad = false;
        this.providers = new Map();
        for (var i = 0; i < providers.length; i++) {
            /** @type {?} */
            var element = providers[i];
            this.providers.set(element.id, element.provider);
            this.lazyLoad = this.lazyLoad || element.lazyLoad;
        }
    }
    return AuthServiceConfig;
}());
var AuthService = /** @class */ (function () {
    function AuthService(config) {
        this._user = null;
        this._authState = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
        this._readyState = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]([]);
        this.initialized = false;
        this.providers = config.providers;
        if (!config.lazyLoad) {
            this.initialize();
        }
    }
    Object.defineProperty(AuthService.prototype, "authState", {
        get: /**
         * @return {?}
         */
        function () {
            return this._authState.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "readyState", {
        /** Provides an array of provider ID's as they become ready */
        get: /**
         * Provides an array of provider ID's as they become ready
         * @return {?}
         */
        function () {
            return this._readyState.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    AuthService.prototype.initialize = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.initialized = true;
        this.providers.forEach((/**
         * @param {?} provider
         * @param {?} key
         * @return {?}
         */
        function (provider, key) {
            provider.initialize().then((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var readyProviders = _this._readyState.getValue();
                readyProviders.push(key);
                _this._readyState.next(readyProviders);
                provider.getLoginStatus().then((/**
                 * @param {?} user
                 * @return {?}
                 */
                function (user) {
                    user.provider = key;
                    _this._user = user;
                    _this._authState.next(user);
                })).catch((/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    _this._authState.next(null);
                }));
            }));
        }));
    };
    /**
     * @param {?} providerId
     * @param {?=} opt
     * @return {?}
     */
    AuthService.prototype.signIn = /**
     * @param {?} providerId
     * @param {?=} opt
     * @return {?}
     */
    function (providerId, opt) {
        var _this = this;
        if (!this.initialized) {
            this.initialize();
        }
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            /** @type {?} */
            var providerObject = _this.providers.get(providerId);
            if (providerObject) {
                providerObject.signIn(opt).then((/**
                 * @param {?} user
                 * @return {?}
                 */
                function (user) {
                    user.provider = providerId;
                    resolve(user);
                    _this._user = user;
                    _this._authState.next(user);
                })).catch((/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    reject(err);
                }));
            }
            else {
                reject(AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
            }
        }));
    };
    /**
     * @param {?=} revoke
     * @return {?}
     */
    AuthService.prototype.signOut = /**
     * @param {?=} revoke
     * @return {?}
     */
    function (revoke) {
        var _this = this;
        if (revoke === void 0) { revoke = false; }
        if (!this.initialized) {
            this.initialize();
        }
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            if (!_this._user) {
                reject(AuthService.ERR_NOT_LOGGED_IN);
            }
            else {
                /** @type {?} */
                var providerId = _this._user.provider;
                /** @type {?} */
                var providerObject = _this.providers.get(providerId);
                if (providerObject) {
                    providerObject.signOut(revoke).then((/**
                     * @return {?}
                     */
                    function () {
                        resolve();
                        _this._user = null;
                        _this._authState.next(null);
                    })).catch((/**
                     * @param {?} err
                     * @return {?}
                     */
                    function (err) {
                        reject(err);
                    }));
                }
                else {
                    reject(AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND);
                }
            }
        }));
    };
    AuthService.ERR_LOGIN_PROVIDER_NOT_FOUND = 'Login provider not found';
    AuthService.ERR_NOT_LOGGED_IN = 'Not logged in';
    AuthService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: AuthServiceConfig }
    ]; };
    return AuthService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SocialLoginModule = /** @class */ (function () {
    function SocialLoginModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    SocialLoginModule.initialize = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: SocialLoginModule,
            providers: [
                AuthService,
                {
                    provide: AuthServiceConfig,
                    useValue: config
                }
            ]
        };
    };
    SocialLoginModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
                    ],
                    providers: [
                        AuthService
                    ]
                },] },
    ];
    return SocialLoginModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SocialUser = /** @class */ (function () {
    function SocialUser() {
    }
    return SocialUser;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
BaseLoginProvider = /** @class */ (function () {
    function BaseLoginProvider() {
        this._readyState = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
    }
    /**
     * @protected
     * @return {?}
     */
    BaseLoginProvider.prototype.onReady = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this._readyState.subscribe((/**
             * @param {?} isReady
             * @return {?}
             */
            function (isReady) {
                if (isReady) {
                    resolve();
                }
            }));
        }));
    };
    /**
     * @param {?} id
     * @param {?} src
     * @param {?} onload
     * @param {?=} async
     * @param {?=} inner_text_content
     * @return {?}
     */
    BaseLoginProvider.prototype.loadScript = /**
     * @param {?} id
     * @param {?} src
     * @param {?} onload
     * @param {?=} async
     * @param {?=} inner_text_content
     * @return {?}
     */
    function (id, src, onload, async, inner_text_content) {
        if (async === void 0) { async = true; }
        // get document if platform is only browser
        if (typeof document !== 'undefined' && !document.getElementById(id)) {
            /** @type {?} */
            var signInJS = document.createElement('script');
            signInJS.async = async;
            signInJS.src = src;
            signInJS.onload = onload;
            /*
            if (inner_text_content) // LinkedIn
                signInJS.text = inner_text_content;
            */
            document.head.appendChild(signInJS);
        }
    };
    return BaseLoginProvider;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var GoogleLoginProvider = /** @class */ (function (_super) {
    __extends(GoogleLoginProvider, _super);
    function GoogleLoginProvider(clientId, opt) {
        if (opt === void 0) { opt = { scope: 'email' }; }
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.opt = opt;
        return _this;
    }
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.initialize = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.loadScript(GoogleLoginProvider.PROVIDER_ID, 'https://apis.google.com/js/platform.js', (/**
             * @return {?}
             */
            function () {
                gapi.load('auth2', (/**
                 * @return {?}
                 */
                function () {
                    _this.auth2 = gapi.auth2.init(__assign({}, _this.opt, { client_id: _this.clientId }));
                    _this.auth2.then((/**
                     * @return {?}
                     */
                    function () {
                        _this._readyState.next(true);
                        resolve();
                    })).catch((/**
                     * @param {?} err
                     * @return {?}
                     */
                    function (err) {
                        reject(err);
                    }));
                }));
            }));
        }));
    };
    /**
     * @return {?}
     */
    GoogleLoginProvider.prototype.getLoginStatus = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.onReady().then((/**
             * @return {?}
             */
            function () {
                if (_this.auth2.isSignedIn.get()) {
                    /** @type {?} */
                    var user = new SocialUser();
                    /** @type {?} */
                    var profile = _this.auth2.currentUser.get().getBasicProfile();
                    /** @type {?} */
                    var token = _this.auth2.currentUser.get().getAuthResponse(true).access_token;
                    /** @type {?} */
                    var backendToken = _this.auth2.currentUser.get().getAuthResponse(true).id_token;
                    user.id = profile.getId();
                    user.name = profile.getName();
                    user.email = profile.getEmail();
                    user.photoUrl = profile.getImageUrl();
                    user.firstName = profile.getGivenName();
                    user.lastName = profile.getFamilyName();
                    user.authToken = token;
                    user.idToken = backendToken;
                    resolve(user);
                }
                else {
                    reject('No user is currently logged in.');
                }
            }));
        }));
    };
    /**
     * @param {?=} opt
     * @return {?}
     */
    GoogleLoginProvider.prototype.signIn = /**
     * @param {?=} opt
     * @return {?}
     */
    function (opt) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.onReady().then((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var offlineAccess = (opt && opt.offline_access) || (_this.opt && _this.opt.offline_access);
                /** @type {?} */
                var promise = !offlineAccess ? _this.auth2.signIn(opt) : _this.auth2.grantOfflineAccess(opt);
                promise.then((/**
                 * @param {?} response
                 * @return {?}
                 */
                function (response) {
                    /** @type {?} */
                    var user = new SocialUser();
                    /** @type {?} */
                    var profile = _this.auth2.currentUser.get().getBasicProfile();
                    /** @type {?} */
                    var token = _this.auth2.currentUser.get().getAuthResponse(true).access_token;
                    /** @type {?} */
                    var backendToken = _this.auth2.currentUser.get().getAuthResponse(true).id_token;
                    user.id = profile.getId();
                    user.name = profile.getName();
                    user.email = profile.getEmail();
                    user.photoUrl = profile.getImageUrl();
                    user.firstName = profile.getGivenName();
                    user.lastName = profile.getFamilyName();
                    user.authToken = token;
                    user.idToken = backendToken;
                    if (response && response.code) {
                        user.authorizationCode = response.code;
                    }
                    resolve(user);
                }), (/**
                 * @param {?} closed
                 * @return {?}
                 */
                function (closed) {
                    reject('User cancelled login or did not fully authorize.');
                })).catch((/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    reject(err);
                }));
            }));
        }));
    };
    /**
     * @param {?=} revoke
     * @return {?}
     */
    GoogleLoginProvider.prototype.signOut = /**
     * @param {?=} revoke
     * @return {?}
     */
    function (revoke) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.onReady().then((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var signOutPromise;
                if (revoke) {
                    signOutPromise = _this.auth2.disconnect();
                }
                else {
                    signOutPromise = _this.auth2.signOut();
                }
                signOutPromise.then((/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                })).catch((/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    reject(err);
                }));
            }));
        }));
    };
    GoogleLoginProvider.PROVIDER_ID = 'GOOGLE';
    return GoogleLoginProvider;
}(BaseLoginProvider));

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FacebookLoginProvider = /** @class */ (function (_super) {
    __extends$1(FacebookLoginProvider, _super);
    function FacebookLoginProvider(clientId, opt, locale, fields, version) {
        if (opt === void 0) { opt = { scope: 'email,public_profile' }; }
        if (locale === void 0) { locale = 'en_US'; }
        if (fields === void 0) { fields = 'name,email,picture,first_name,last_name'; }
        if (version === void 0) { version = 'v4.0'; }
        var _this = _super.call(this) || this;
        _this.clientId = clientId;
        _this.opt = opt;
        _this.locale = locale;
        _this.fields = fields;
        _this.version = version;
        return _this;
    }
    /**
     * @return {?}
     */
    FacebookLoginProvider.prototype.initialize = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.loadScript(FacebookLoginProvider.PROVIDER_ID, "//connect.facebook.net/" + _this.locale + "/sdk.js", (/**
             * @return {?}
             */
            function () {
                FB.init({
                    appId: _this.clientId,
                    autoLogAppEvents: true,
                    cookie: true,
                    xfbml: true,
                    version: _this.version
                });
                // FB.AppEvents.logPageView(); #FIX for #18
                _this._readyState.next(true);
                resolve();
            }));
        }));
    };
    /**
     * @return {?}
     */
    FacebookLoginProvider.prototype.getLoginStatus = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.onReady().then((/**
             * @return {?}
             */
            function () {
                FB.getLoginStatus((/**
                 * @param {?} response
                 * @return {?}
                 */
                function (response) {
                    if (response.status === 'connected') {
                        /** @type {?} */
                        var authResponse_1 = response.authResponse;
                        FB.api("/me?fields=" + _this.fields, (/**
                         * @param {?} fbUser
                         * @return {?}
                         */
                        function (fbUser) {
                            /** @type {?} */
                            var user = new SocialUser();
                            user.id = fbUser.id;
                            user.name = fbUser.name;
                            user.email = fbUser.email;
                            user.photoUrl = 'https://graph.facebook.com/' + fbUser.id + '/picture?type=normal';
                            user.firstName = fbUser.first_name;
                            user.lastName = fbUser.last_name;
                            user.authToken = authResponse_1.accessToken;
                            user.facebook = fbUser;
                            resolve(user);
                        }));
                    }
                    else {
                        reject('No user is currently logged in.');
                    }
                }));
            }));
        }));
    };
    /**
     * @param {?=} opt
     * @return {?}
     */
    FacebookLoginProvider.prototype.signIn = /**
     * @param {?=} opt
     * @return {?}
     */
    function (opt) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.onReady().then((/**
             * @return {?}
             */
            function () {
                FB.login((/**
                 * @param {?} response
                 * @return {?}
                 */
                function (response) {
                    if (response.authResponse) {
                        /** @type {?} */
                        var authResponse_2 = response.authResponse;
                        FB.api("/me?fields=" + _this.fields, (/**
                         * @param {?} fbUser
                         * @return {?}
                         */
                        function (fbUser) {
                            /** @type {?} */
                            var user = new SocialUser();
                            user.id = fbUser.id;
                            user.name = fbUser.name;
                            user.email = fbUser.email;
                            user.photoUrl = 'https://graph.facebook.com/' + fbUser.id + '/picture?type=normal';
                            user.firstName = fbUser.first_name;
                            user.lastName = fbUser.last_name;
                            user.authToken = authResponse_2.accessToken;
                            user.facebook = fbUser;
                            resolve(user);
                        }));
                    }
                    else {
                        reject('User cancelled login or did not fully authorize.');
                    }
                }), _this.opt);
            }));
        }));
    };
    /**
     * @return {?}
     */
    FacebookLoginProvider.prototype.signOut = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.onReady().then((/**
             * @return {?}
             */
            function () {
                FB.logout((/**
                 * @param {?} response
                 * @return {?}
                 */
                function (response) {
                    resolve();
                }));
            }));
        }));
    };
    FacebookLoginProvider.PROVIDER_ID = 'FACEBOOK';
    return FacebookLoginProvider;
}(BaseLoginProvider));


//# sourceMappingURL=angularx-social-login.es5.js.map


/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/Observable.js":
/*!******************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/Observable.js ***!
  \******************************************************/
/*! exports provided: Observable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]; });


//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/Subject.js":
/*!***************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/Subject.js ***!
  \***************************************************/
/*! exports provided: Subject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Subject", function() { return rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]; });


//# sourceMappingURL=Subject.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/add/operator/catch.js ***!
  \**************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _operator_catch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../operator/catch */ "./node_modules/rxjs-compat/_esm5/operator/catch.js");


rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].prototype.catch = _operator_catch__WEBPACK_IMPORTED_MODULE_1__["_catch"];
rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].prototype._catch = _operator_catch__WEBPACK_IMPORTED_MODULE_1__["_catch"];
//# sourceMappingURL=catch.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/operator/catch.js":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/operator/catch.js ***!
  \**********************************************************/
/*! exports provided: _catch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_catch", function() { return _catch; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");

/**
 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
 *
 * <img src="./img/catch.png" width="100%">
 *
 * @example <caption>Continues with a different Observable when there's an error</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 * 	   if (n == 4) {
 * 	     throw 'four!';
 *     }
 *	   return n;
 *   })
 *   .catch(err => Observable.of('I', 'II', 'III', 'IV', 'V'))
 *   .subscribe(x => console.log(x));
 *   // 1, 2, 3, I, II, III, IV, V
 *
 * @example <caption>Retries the caught source Observable again in case of error, similar to retry() operator</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 * 	   if (n === 4) {
 * 	     throw 'four!';
 *     }
 * 	   return n;
 *   })
 *   .catch((err, caught) => caught)
 *   .take(30)
 *   .subscribe(x => console.log(x));
 *   // 1, 2, 3, 1, 2, 3, ...
 *
 * @example <caption>Throws a new error when the source Observable throws an error</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 *     if (n == 4) {
 *       throw 'four!';
 *     }
 *     return n;
 *   })
 *   .catch(err => {
 *     throw 'error in source. Details: ' + err;
 *   })
 *   .subscribe(
 *     x => console.log(x),
 *     err => console.log(err)
 *   );
 *   // 1, 2, 3, error in source. Details: four!
 *
 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
 *  is returned by the `selector` will be used to continue the observable chain.
 * @return {Observable} An observable that originates from either the source or the observable returned by the
 *  catch `selector` function.
 * @method catch
 * @name catch
 * @owner Observable
 */
function _catch(selector) {
    return Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["catchError"])(selector)(this);
}
//# sourceMappingURL=catch.js.map

/***/ }),

/***/ "./src/app/auth/auth-guard.service.ts":
/*!********************************************!*\
  !*** ./src/app/auth/auth-guard.service.ts ***!
  \********************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        var user = window.user;
        if (user)
            return true;
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login']);
        return false;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/auth/auth-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/auth/auth-routing.module.ts ***!
  \*********************************************/
/*! exports provided: AuthRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRoutingModule", function() { return AuthRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.component */ "./src/app/auth/login/login.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./register/register.component */ "./src/app/auth/register/register.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [{
        path: 'auth',
        children: [{
                path: '',
                redirectTo: '/auth/login',
                pathMatch: 'full'
            }, {
                path: 'login',
                component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"]
            }, {
                path: 'register',
                component: _register_register_component__WEBPACK_IMPORTED_MODULE_3__["RegisterComponent"]
            }]
    }];
var AuthRoutingModule = /** @class */ (function () {
    function AuthRoutingModule() {
    }
    AuthRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AuthRoutingModule);
    return AuthRoutingModule;
}());



/***/ }),

/***/ "./src/app/auth/auth.component.scss":
/*!******************************************!*\
  !*** ./src/app/auth/auth.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-elevation-z0{box-shadow:0px 0px 0px 0px rgba(0,0,0,0.2),0px 0px 0px 0px rgba(0,0,0,0.14),0px 0px 0px 0px rgba(0,0,0,0.12)}.mat-elevation-z1{box-shadow:0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)}.mat-elevation-z2{box-shadow:0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)}.mat-elevation-z3{box-shadow:0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)}.mat-elevation-z4{box-shadow:0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)}.mat-elevation-z5{box-shadow:0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)}.mat-elevation-z6{box-shadow:0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)}.mat-elevation-z7{box-shadow:0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)}.mat-elevation-z8{box-shadow:0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)}.mat-elevation-z9{box-shadow:0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)}.mat-elevation-z10{box-shadow:0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)}.mat-elevation-z11{box-shadow:0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)}.mat-elevation-z12{box-shadow:0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)}.mat-elevation-z13{box-shadow:0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)}.mat-elevation-z14{box-shadow:0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)}.mat-elevation-z15{box-shadow:0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)}.mat-elevation-z16{box-shadow:0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)}.mat-elevation-z17{box-shadow:0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)}.mat-elevation-z18{box-shadow:0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)}.mat-elevation-z19{box-shadow:0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)}.mat-elevation-z20{box-shadow:0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)}.mat-elevation-z21{box-shadow:0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)}.mat-elevation-z22{box-shadow:0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)}.mat-elevation-z23{box-shadow:0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)}.mat-elevation-z24{box-shadow:0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)}.mat-badge-content{font-weight:600;font-size:12px;font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-badge-small .mat-badge-content{font-size:6px}.mat-badge-large .mat-badge-content{font-size:24px}.mat-h1,.mat-headline,.mat-typography h1{font:400 24px/32px Roboto, \"Helvetica Neue\", sans-serif;margin:0 0 16px}.mat-h2,.mat-title,.mat-typography h2{font:500 20px/32px Roboto, \"Helvetica Neue\", sans-serif;margin:0 0 16px}.mat-h3,.mat-subheading-2,.mat-typography h3{font:400 16px/28px Roboto, \"Helvetica Neue\", sans-serif;margin:0 0 16px}.mat-h4,.mat-subheading-1,.mat-typography h4{font:400 15px/24px Roboto, \"Helvetica Neue\", sans-serif;margin:0 0 16px}.mat-h5,.mat-typography h5{font:400 11.62px/20px Roboto, \"Helvetica Neue\", sans-serif;margin:0 0 12px}.mat-h6,.mat-typography h6{font:400 9.38px/20px Roboto, \"Helvetica Neue\", sans-serif;margin:0 0 12px}.mat-body-strong,.mat-body-2{font:500 14px/24px Roboto, \"Helvetica Neue\", sans-serif}.mat-body,.mat-body-1,.mat-typography{font:400 14px/20px Roboto, \"Helvetica Neue\", sans-serif}.mat-body p,.mat-body-1 p,.mat-typography p{margin:0 0 12px}.mat-small,.mat-caption{font:400 12px/20px Roboto, \"Helvetica Neue\", sans-serif}.mat-display-4,.mat-typography .mat-display-4{font:300 112px/112px Roboto, \"Helvetica Neue\", sans-serif;margin:0 0 56px;letter-spacing:-0.05em}.mat-display-3,.mat-typography .mat-display-3{font:400 56px/56px Roboto, \"Helvetica Neue\", sans-serif;margin:0 0 64px;letter-spacing:-0.02em}.mat-display-2,.mat-typography .mat-display-2{font:400 45px/48px Roboto, \"Helvetica Neue\", sans-serif;margin:0 0 64px;letter-spacing:-0.005em}.mat-display-1,.mat-typography .mat-display-1{font:400 34px/40px Roboto, \"Helvetica Neue\", sans-serif;margin:0 0 64px}.mat-bottom-sheet-container{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:16px;font-weight:400}.mat-button,.mat-raised-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button,.mat-fab,.mat-mini-fab{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:14px;font-weight:500}.mat-button-toggle{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-card{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-card-title{font-size:24px;font-weight:400}.mat-card-subtitle,.mat-card-content,.mat-card-header .mat-card-title{font-size:14px}.mat-checkbox{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-checkbox-layout .mat-checkbox-label{line-height:24px}.mat-chip{font-size:13px;line-height:18px}.mat-chip .mat-chip-trailing-icon.mat-icon,.mat-chip .mat-chip-remove.mat-icon{font-size:18px}.mat-table{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-header-cell{font-size:12px;font-weight:500}.mat-cell,.mat-footer-cell{font-size:14px}.mat-calendar{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-calendar-body{font-size:13px}.mat-calendar-body-label,.mat-calendar-period-button{font-size:14px;font-weight:500}.mat-calendar-table-header th{font-size:11px;font-weight:400}.mat-dialog-title{font:500 20px/32px Roboto, \"Helvetica Neue\", sans-serif}.mat-expansion-panel-header{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:15px;font-weight:400}.mat-expansion-panel-content{font:400 14px/20px Roboto, \"Helvetica Neue\", sans-serif}.mat-form-field{font-size:inherit;font-weight:400;line-height:1.125;font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-form-field-wrapper{padding-bottom:1.34375em}.mat-form-field-prefix .mat-icon,.mat-form-field-suffix .mat-icon{font-size:150%;line-height:1.125}.mat-form-field-prefix .mat-icon-button,.mat-form-field-suffix .mat-icon-button{height:1.5em;width:1.5em}.mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field-suffix .mat-icon-button .mat-icon{height:1.125em;line-height:1.125}.mat-form-field-infix{padding:.5em 0;border-top:.84375em solid transparent}.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.34375em) scale(.75);transform:translateY(-1.34375em) scale(.75);width:133.33333333%}.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.34374em) scale(.75);transform:translateY(-1.34374em) scale(.75);width:133.33334333%}.mat-form-field-label-wrapper{top:-.84375em;padding-top:.84375em}.mat-form-field-label{top:1.34375em}.mat-form-field-underline{bottom:1.34375em}.mat-form-field-subscript-wrapper{font-size:75%;margin-top:.66666667em;top:calc(100% - 1.79166667em)}.mat-form-field-appearance-legacy .mat-form-field-wrapper{padding-bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-infix{padding:.4375em 0}.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(0.001px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(0.001px);-ms-transform:translateY(-1.28125em) scale(.75);width:133.33333333%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(0.00101px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(0.00101px);-ms-transform:translateY(-1.28124em) scale(.75);width:133.33334333%}.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(0.00102px);transform:translateY(-1.28125em) scale(.75) perspective(100px) translateZ(0.00102px);-ms-transform:translateY(-1.28123em) scale(.75);width:133.33335333%}.mat-form-field-appearance-legacy .mat-form-field-label{top:1.28125em}.mat-form-field-appearance-legacy .mat-form-field-underline{bottom:1.25em}.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper{margin-top:.54166667em;top:calc(100% - 1.66666667em)}.mat-form-field-appearance-fill .mat-form-field-infix{padding:.25em 0 .75em 0}.mat-form-field-appearance-fill .mat-form-field-label{top:1.09375em;margin-top:-.5em}.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-.59375em) scale(.75);transform:translateY(-.59375em) scale(.75);width:133.33333333%}.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-.59374em) scale(.75);transform:translateY(-.59374em) scale(.75);width:133.33334333%}.mat-form-field-appearance-outline .mat-form-field-infix{padding:1em 0 1em 0}.mat-form-field-appearance-outline .mat-form-field-label{top:1.84375em;margin-top:-.25em}.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.59375em) scale(.75);transform:translateY(-1.59375em) scale(.75);width:133.33333333%}.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown)+.mat-form-field-label-wrapper .mat-form-field-label{-webkit-transform:translateY(-1.59374em) scale(.75);transform:translateY(-1.59374em) scale(.75);width:133.33334333%}.mat-grid-tile-header,.mat-grid-tile-footer{font-size:14px}.mat-grid-tile-header .mat-line,.mat-grid-tile-footer .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-grid-tile-header .mat-line:nth-child(n+2),.mat-grid-tile-footer .mat-line:nth-child(n+2){font-size:12px}input.mat-input-element{margin-top:-.0625em}.mat-menu-item{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:16px;font-weight:400}.mat-paginator,.mat-paginator-page-size .mat-select-trigger{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:12px}.mat-radio-button{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-select{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-select-trigger{height:1.125em}.mat-slide-toggle-content{font:400 14px/20px Roboto, \"Helvetica Neue\", sans-serif}.mat-slider-thumb-label-text{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:12px;font-weight:500}.mat-stepper-vertical,.mat-stepper-horizontal{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-step-label{font-size:14px;font-weight:400}.mat-step-label-selected{font-size:14px;font-weight:500}.mat-tab-group{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-tab-label,.mat-tab-link{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:14px;font-weight:500}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font:500 20px/32px Roboto, \"Helvetica Neue\", sans-serif;margin:0}.mat-tooltip{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:10px;padding-top:6px;padding-bottom:6px}.mat-tooltip-handset{font-size:14px;padding-top:9px;padding-bottom:9px}.mat-list-item{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-list-option{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-list .mat-list-item,.mat-nav-list .mat-list-item,.mat-selection-list .mat-list-item{font-size:16px}.mat-list .mat-list-item .mat-line,.mat-nav-list .mat-list-item .mat-line,.mat-selection-list .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list .mat-list-item .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-list-option,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-option{font-size:16px}.mat-list .mat-list-option .mat-line,.mat-nav-list .mat-list-option .mat-line,.mat-selection-list .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list .mat-list-option .mat-line:nth-child(n+2){font-size:14px}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:14px;font-weight:500}.mat-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-item,.mat-selection-list[dense] .mat-list-item{font-size:12px}.mat-list[dense] .mat-list-item .mat-line,.mat-nav-list[dense] .mat-list-item .mat-line,.mat-selection-list[dense] .mat-list-item .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-item .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-item .mat-line:nth-child(n+2){font-size:12px}.mat-list[dense] .mat-list-option,.mat-nav-list[dense] .mat-list-option,.mat-selection-list[dense] .mat-list-option{font-size:12px}.mat-list[dense] .mat-list-option .mat-line,.mat-nav-list[dense] .mat-list-option .mat-line,.mat-selection-list[dense] .mat-list-option .mat-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;box-sizing:border-box}.mat-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-nav-list[dense] .mat-list-option .mat-line:nth-child(n+2),.mat-selection-list[dense] .mat-list-option .mat-line:nth-child(n+2){font-size:12px}.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader,.mat-selection-list[dense] .mat-subheader{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:12px;font-weight:500}.mat-option{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:16px}.mat-optgroup-label{font:500 14px/24px Roboto, \"Helvetica Neue\", sans-serif}.mat-simple-snackbar{font-family:Roboto, \"Helvetica Neue\", sans-serif;font-size:14px}.mat-simple-snackbar-action{line-height:1;font-family:inherit;font-size:inherit;font-weight:500}.mat-tree{font-family:Roboto, \"Helvetica Neue\", sans-serif}.mat-tree-node{font-weight:400;font-size:14px}.mat-ripple{overflow:hidden}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;-webkit-transition:opacity,-webkit-transform 0ms cubic-bezier(0, 0, 0.2, 1);transition:opacity,-webkit-transform 0ms cubic-bezier(0, 0, 0.2, 1);transition:opacity,transform 0ms cubic-bezier(0, 0, 0.2, 1);transition:opacity,transform 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 0ms cubic-bezier(0, 0, 0.2, 1);-webkit-transform:scale(0);transform:scale(0)}@media screen and (-ms-high-contrast: active){.mat-ripple-element{display:none}}.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;outline:0;-webkit-appearance:none;-moz-appearance:none}.cdk-overlay-container,.cdk-global-overlay-wrapper{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-overlay-container:empty{display:none}.cdk-global-overlay-wrapper{display:-webkit-box;display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:-webkit-box;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;-webkit-transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);transition:opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:1}@media screen and (-ms-high-contrast: active){.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:0.6}}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,0.288)}.cdk-overlay-transparent-backdrop,.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing{opacity:0}.cdk-overlay-connected-position-bounding-box{position:absolute;z-index:1000;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock{position:fixed;width:100%;overflow-y:scroll}@-webkit-keyframes cdk-text-field-autofill-start{/*!*/}@keyframes cdk-text-field-autofill-start{/*!*/}@-webkit-keyframes cdk-text-field-autofill-end{/*!*/}@keyframes cdk-text-field-autofill-end{/*!*/}.cdk-text-field-autofill-monitored:-webkit-autofill{-webkit-animation-name:cdk-text-field-autofill-start;animation-name:cdk-text-field-autofill-start}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){-webkit-animation-name:cdk-text-field-autofill-end;animation-name:cdk-text-field-autofill-end}textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{height:auto !important;overflow:hidden !important;padding:2px 0 !important;box-sizing:content-box !important}.cafe-teal .bg-color{background-color:#26a69a !important}.cafe-teal .bg-color-accent{background-color:#f48fb1 !important}.cafe-teal .mat-ripple-element{background-color:rgba(0,0,0,0.1)}.cafe-teal .mat-option{color:rgba(0,0,0,0.87)}.cafe-teal .mat-option:hover:not(.mat-option-disabled),.cafe-teal .mat-option:focus:not(.mat-option-disabled){background:rgba(0,0,0,0.04)}.cafe-teal .mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled){background:rgba(0,0,0,0.04)}.cafe-teal .mat-option.mat-active{background:rgba(0,0,0,0.04);color:rgba(0,0,0,0.87)}.cafe-teal .mat-option.mat-option-disabled{color:rgba(0,0,0,0.38)}.cafe-teal .mat-primary .mat-option.mat-selected:not(.mat-option-disabled){color:#26a69a}.cafe-teal .mat-accent .mat-option.mat-selected:not(.mat-option-disabled){color:#f48fb1}.cafe-teal .mat-warn .mat-option.mat-selected:not(.mat-option-disabled){color:#f44336}.cafe-teal .mat-optgroup-label{color:rgba(0,0,0,0.54)}.cafe-teal .mat-optgroup-disabled .mat-optgroup-label{color:rgba(0,0,0,0.38)}.cafe-teal .mat-pseudo-checkbox{color:rgba(0,0,0,0.54)}.cafe-teal .mat-pseudo-checkbox::after{color:#fafafa}.cafe-teal .mat-pseudo-checkbox-checked,.cafe-teal .mat-pseudo-checkbox-indeterminate,.cafe-teal .mat-accent .mat-pseudo-checkbox-checked,.cafe-teal .mat-accent .mat-pseudo-checkbox-indeterminate{background:#f48fb1}.cafe-teal .mat-primary .mat-pseudo-checkbox-checked,.cafe-teal .mat-primary .mat-pseudo-checkbox-indeterminate{background:#26a69a}.cafe-teal .mat-warn .mat-pseudo-checkbox-checked,.cafe-teal .mat-warn .mat-pseudo-checkbox-indeterminate{background:#f44336}.cafe-teal .mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,.cafe-teal .mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled{background:#b0b0b0}.cafe-teal .mat-app-background,.cafe-teal.mat-app-background{background-color:#fafafa;color:rgba(0,0,0,0.87)}.mat-theme-loaded-marker{display:none}.cafe-teal .mat-autocomplete-panel{background:#fff;color:rgba(0,0,0,0.87)}.cafe-teal .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover){background:#fff}.cafe-teal .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled){color:rgba(0,0,0,0.87)}.cafe-teal .mat-badge-content{color:rgba(0,0,0,0.87);background:#26a69a}.cafe-teal .mat-badge-accent .mat-badge-content{background:#f48fb1;color:rgba(0,0,0,0.87)}.cafe-teal .mat-badge-warn .mat-badge-content{color:#fff;background:#f44336}.cafe-teal .mat-badge{position:relative}.cafe-teal .mat-badge-hidden .mat-badge-content{display:none}.cafe-teal .mat-badge-content{position:absolute;text-align:center;display:inline-block;border-radius:50%;-webkit-transition:-webkit-transform 200ms ease-in-out;transition:-webkit-transform 200ms ease-in-out;transition:transform 200ms ease-in-out;transition:transform 200ms ease-in-out, -webkit-transform 200ms ease-in-out;-webkit-transform:scale(0.6);transform:scale(0.6);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;pointer-events:none}.cafe-teal .mat-badge-content.mat-badge-active{-webkit-transform:none;transform:none}.cafe-teal .mat-badge-small .mat-badge-content{width:16px;height:16px;line-height:16px}@media screen and (-ms-high-contrast: active){.cafe-teal .mat-badge-small .mat-badge-content{outline:solid 1px;border-radius:0}}.cafe-teal .mat-badge-small.mat-badge-above .mat-badge-content{top:-8px}.cafe-teal .mat-badge-small.mat-badge-below .mat-badge-content{bottom:-8px}.cafe-teal .mat-badge-small.mat-badge-before .mat-badge-content{left:-16px}[dir='rtl'] .cafe-teal .mat-badge-small.mat-badge-before .mat-badge-content{left:auto;right:-16px}.cafe-teal .mat-badge-small.mat-badge-after .mat-badge-content{right:-16px}[dir='rtl'] .cafe-teal .mat-badge-small.mat-badge-after .mat-badge-content{right:auto;left:-16px}.cafe-teal .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content{left:-8px}[dir='rtl'] .cafe-teal .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content{left:auto;right:-8px}.cafe-teal .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content{right:-8px}[dir='rtl'] .cafe-teal .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content{right:auto;left:-8px}.cafe-teal .mat-badge-medium .mat-badge-content{width:22px;height:22px;line-height:22px}@media screen and (-ms-high-contrast: active){.cafe-teal .mat-badge-medium .mat-badge-content{outline:solid 1px;border-radius:0}}.cafe-teal .mat-badge-medium.mat-badge-above .mat-badge-content{top:-11px}.cafe-teal .mat-badge-medium.mat-badge-below .mat-badge-content{bottom:-11px}.cafe-teal .mat-badge-medium.mat-badge-before .mat-badge-content{left:-22px}[dir='rtl'] .cafe-teal .mat-badge-medium.mat-badge-before .mat-badge-content{left:auto;right:-22px}.cafe-teal .mat-badge-medium.mat-badge-after .mat-badge-content{right:-22px}[dir='rtl'] .cafe-teal .mat-badge-medium.mat-badge-after .mat-badge-content{right:auto;left:-22px}.cafe-teal .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content{left:-11px}[dir='rtl'] .cafe-teal .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content{left:auto;right:-11px}.cafe-teal .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content{right:-11px}[dir='rtl'] .cafe-teal .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content{right:auto;left:-11px}.cafe-teal .mat-badge-large .mat-badge-content{width:28px;height:28px;line-height:28px}@media screen and (-ms-high-contrast: active){.cafe-teal .mat-badge-large .mat-badge-content{outline:solid 1px;border-radius:0}}.cafe-teal .mat-badge-large.mat-badge-above .mat-badge-content{top:-14px}.cafe-teal .mat-badge-large.mat-badge-below .mat-badge-content{bottom:-14px}.cafe-teal .mat-badge-large.mat-badge-before .mat-badge-content{left:-28px}[dir='rtl'] .cafe-teal .mat-badge-large.mat-badge-before .mat-badge-content{left:auto;right:-28px}.cafe-teal .mat-badge-large.mat-badge-after .mat-badge-content{right:-28px}[dir='rtl'] .cafe-teal .mat-badge-large.mat-badge-after .mat-badge-content{right:auto;left:-28px}.cafe-teal .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content{left:-14px}[dir='rtl'] .cafe-teal .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content{left:auto;right:-14px}.cafe-teal .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content{right:-14px}[dir='rtl'] .cafe-teal .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content{right:auto;left:-14px}.cafe-teal .mat-bottom-sheet-container{background:#fff;color:rgba(0,0,0,0.87)}.cafe-teal .mat-button,.cafe-teal .mat-icon-button,.cafe-teal .mat-stroked-button{color:inherit;background:transparent}.cafe-teal .mat-button.mat-primary,.cafe-teal .mat-icon-button.mat-primary,.cafe-teal .mat-stroked-button.mat-primary{color:#26a69a}.cafe-teal .mat-button.mat-accent,.cafe-teal .mat-icon-button.mat-accent,.cafe-teal .mat-stroked-button.mat-accent{color:#f48fb1}.cafe-teal .mat-button.mat-warn,.cafe-teal .mat-icon-button.mat-warn,.cafe-teal .mat-stroked-button.mat-warn{color:#f44336}.cafe-teal .mat-button.mat-primary[disabled],.cafe-teal .mat-button.mat-accent[disabled],.cafe-teal .mat-button.mat-warn[disabled],.cafe-teal .mat-button[disabled][disabled],.cafe-teal .mat-icon-button.mat-primary[disabled],.cafe-teal .mat-icon-button.mat-accent[disabled],.cafe-teal .mat-icon-button.mat-warn[disabled],.cafe-teal .mat-icon-button[disabled][disabled],.cafe-teal .mat-stroked-button.mat-primary[disabled],.cafe-teal .mat-stroked-button.mat-accent[disabled],.cafe-teal .mat-stroked-button.mat-warn[disabled],.cafe-teal .mat-stroked-button[disabled][disabled]{color:rgba(0,0,0,0.26)}.cafe-teal .mat-button.mat-primary .mat-button-focus-overlay,.cafe-teal .mat-icon-button.mat-primary .mat-button-focus-overlay,.cafe-teal .mat-stroked-button.mat-primary .mat-button-focus-overlay{background-color:rgba(38,166,154,0.12)}.cafe-teal .mat-button.mat-accent .mat-button-focus-overlay,.cafe-teal .mat-icon-button.mat-accent .mat-button-focus-overlay,.cafe-teal .mat-stroked-button.mat-accent .mat-button-focus-overlay{background-color:rgba(244,143,177,0.12)}.cafe-teal .mat-button.mat-warn .mat-button-focus-overlay,.cafe-teal .mat-icon-button.mat-warn .mat-button-focus-overlay,.cafe-teal .mat-stroked-button.mat-warn .mat-button-focus-overlay{background-color:rgba(244,67,54,0.12)}.cafe-teal .mat-button[disabled] .mat-button-focus-overlay,.cafe-teal .mat-icon-button[disabled] .mat-button-focus-overlay,.cafe-teal .mat-stroked-button[disabled] .mat-button-focus-overlay{background-color:transparent}.cafe-teal .mat-button.mat-primary .mat-ripple-element,.cafe-teal .mat-icon-button.mat-primary .mat-ripple-element,.cafe-teal .mat-stroked-button.mat-primary .mat-ripple-element{background-color:rgba(38,166,154,0.1)}.cafe-teal .mat-button.mat-accent .mat-ripple-element,.cafe-teal .mat-icon-button.mat-accent .mat-ripple-element,.cafe-teal .mat-stroked-button.mat-accent .mat-ripple-element{background-color:rgba(244,143,177,0.1)}.cafe-teal .mat-button.mat-warn .mat-ripple-element,.cafe-teal .mat-icon-button.mat-warn .mat-ripple-element,.cafe-teal .mat-stroked-button.mat-warn .mat-ripple-element{background-color:rgba(244,67,54,0.1)}.cafe-teal .mat-flat-button,.cafe-teal .mat-raised-button,.cafe-teal .mat-fab,.cafe-teal .mat-mini-fab{color:rgba(0,0,0,0.87);background-color:#fff}.cafe-teal .mat-flat-button.mat-primary,.cafe-teal .mat-raised-button.mat-primary,.cafe-teal .mat-fab.mat-primary,.cafe-teal .mat-mini-fab.mat-primary{color:rgba(0,0,0,0.87)}.cafe-teal .mat-flat-button.mat-accent,.cafe-teal .mat-raised-button.mat-accent,.cafe-teal .mat-fab.mat-accent,.cafe-teal .mat-mini-fab.mat-accent{color:rgba(0,0,0,0.87)}.cafe-teal .mat-flat-button.mat-warn,.cafe-teal .mat-raised-button.mat-warn,.cafe-teal .mat-fab.mat-warn,.cafe-teal .mat-mini-fab.mat-warn{color:#fff}.cafe-teal .mat-flat-button.mat-primary[disabled],.cafe-teal .mat-flat-button.mat-accent[disabled],.cafe-teal .mat-flat-button.mat-warn[disabled],.cafe-teal .mat-flat-button[disabled][disabled],.cafe-teal .mat-raised-button.mat-primary[disabled],.cafe-teal .mat-raised-button.mat-accent[disabled],.cafe-teal .mat-raised-button.mat-warn[disabled],.cafe-teal .mat-raised-button[disabled][disabled],.cafe-teal .mat-fab.mat-primary[disabled],.cafe-teal .mat-fab.mat-accent[disabled],.cafe-teal .mat-fab.mat-warn[disabled],.cafe-teal .mat-fab[disabled][disabled],.cafe-teal .mat-mini-fab.mat-primary[disabled],.cafe-teal .mat-mini-fab.mat-accent[disabled],.cafe-teal .mat-mini-fab.mat-warn[disabled],.cafe-teal .mat-mini-fab[disabled][disabled]{color:rgba(0,0,0,0.26)}.cafe-teal .mat-flat-button.mat-primary,.cafe-teal .mat-raised-button.mat-primary,.cafe-teal .mat-fab.mat-primary,.cafe-teal .mat-mini-fab.mat-primary{background-color:#26a69a}.cafe-teal .mat-flat-button.mat-accent,.cafe-teal .mat-raised-button.mat-accent,.cafe-teal .mat-fab.mat-accent,.cafe-teal .mat-mini-fab.mat-accent{background-color:#f48fb1}.cafe-teal .mat-flat-button.mat-warn,.cafe-teal .mat-raised-button.mat-warn,.cafe-teal .mat-fab.mat-warn,.cafe-teal .mat-mini-fab.mat-warn{background-color:#f44336}.cafe-teal .mat-flat-button.mat-primary[disabled],.cafe-teal .mat-flat-button.mat-accent[disabled],.cafe-teal .mat-flat-button.mat-warn[disabled],.cafe-teal .mat-flat-button[disabled][disabled],.cafe-teal .mat-raised-button.mat-primary[disabled],.cafe-teal .mat-raised-button.mat-accent[disabled],.cafe-teal .mat-raised-button.mat-warn[disabled],.cafe-teal .mat-raised-button[disabled][disabled],.cafe-teal .mat-fab.mat-primary[disabled],.cafe-teal .mat-fab.mat-accent[disabled],.cafe-teal .mat-fab.mat-warn[disabled],.cafe-teal .mat-fab[disabled][disabled],.cafe-teal .mat-mini-fab.mat-primary[disabled],.cafe-teal .mat-mini-fab.mat-accent[disabled],.cafe-teal .mat-mini-fab.mat-warn[disabled],.cafe-teal .mat-mini-fab[disabled][disabled]{background-color:rgba(0,0,0,0.12)}.cafe-teal .mat-flat-button.mat-primary .mat-ripple-element,.cafe-teal .mat-raised-button.mat-primary .mat-ripple-element,.cafe-teal .mat-fab.mat-primary .mat-ripple-element,.cafe-teal .mat-mini-fab.mat-primary .mat-ripple-element{background-color:rgba(0,0,0,0.1)}.cafe-teal .mat-flat-button.mat-accent .mat-ripple-element,.cafe-teal .mat-raised-button.mat-accent .mat-ripple-element,.cafe-teal .mat-fab.mat-accent .mat-ripple-element,.cafe-teal .mat-mini-fab.mat-accent .mat-ripple-element{background-color:rgba(0,0,0,0.1)}.cafe-teal .mat-flat-button.mat-warn .mat-ripple-element,.cafe-teal .mat-raised-button.mat-warn .mat-ripple-element,.cafe-teal .mat-fab.mat-warn .mat-ripple-element,.cafe-teal .mat-mini-fab.mat-warn .mat-ripple-element{background-color:rgba(255,255,255,0.1)}.cafe-teal .mat-icon-button.mat-primary .mat-ripple-element{background-color:rgba(38,166,154,0.2)}.cafe-teal .mat-icon-button.mat-accent .mat-ripple-element{background-color:rgba(244,143,177,0.2)}.cafe-teal .mat-icon-button.mat-warn .mat-ripple-element{background-color:rgba(244,67,54,0.2)}.cafe-teal .mat-button-toggle{color:rgba(0,0,0,0.38)}.cafe-teal .mat-button-toggle .mat-button-toggle-focus-overlay{background-color:rgba(0,0,0,0.12)}.cafe-teal .mat-button-toggle-checked{background-color:#e0e0e0;color:rgba(0,0,0,0.54)}.cafe-teal .mat-button-toggle-disabled{background-color:#eee;color:rgba(0,0,0,0.26)}.cafe-teal .mat-button-toggle-disabled.mat-button-toggle-checked{background-color:#bdbdbd}.cafe-teal .mat-card{background:#fff;color:rgba(0,0,0,0.87)}.cafe-teal .mat-card-subtitle{color:rgba(0,0,0,0.54)}.cafe-teal .mat-checkbox-frame{border-color:rgba(0,0,0,0.54)}.cafe-teal .mat-checkbox-checkmark{fill:#fafafa}.cafe-teal .mat-checkbox-checkmark-path{stroke:#fafafa !important}@media screen and (-ms-high-contrast: black-on-white){.cafe-teal .mat-checkbox-checkmark-path{stroke:#000 !important}}.cafe-teal .mat-checkbox-mixedmark{background-color:#fafafa}.cafe-teal .mat-checkbox-indeterminate.mat-primary .mat-checkbox-background,.cafe-teal .mat-checkbox-checked.mat-primary .mat-checkbox-background{background-color:#26a69a}.cafe-teal .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background,.cafe-teal .mat-checkbox-checked.mat-accent .mat-checkbox-background{background-color:#f48fb1}.cafe-teal .mat-checkbox-indeterminate.mat-warn .mat-checkbox-background,.cafe-teal .mat-checkbox-checked.mat-warn .mat-checkbox-background{background-color:#f44336}.cafe-teal .mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background,.cafe-teal .mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background{background-color:#b0b0b0}.cafe-teal .mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame{border-color:#b0b0b0}.cafe-teal .mat-checkbox-disabled .mat-checkbox-label{color:#b0b0b0}@media screen and (-ms-high-contrast: active){.cafe-teal .mat-checkbox-disabled{opacity:0.5}}@media screen and (-ms-high-contrast: active){.cafe-teal .mat-checkbox-background{background:none}}.cafe-teal .mat-checkbox:not(.mat-checkbox-disabled).mat-primary .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(38,166,154,0.26)}.cafe-teal .mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(244,143,177,0.26)}.cafe-teal .mat-checkbox:not(.mat-checkbox-disabled).mat-warn .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(244,67,54,0.26)}.cafe-teal .mat-chip.mat-standard-chip{background-color:#e0e0e0;color:rgba(0,0,0,0.87)}.cafe-teal .mat-chip.mat-standard-chip .mat-chip-remove{color:rgba(0,0,0,0.87);opacity:0.4}.cafe-teal .mat-chip.mat-standard-chip .mat-chip-remove:hover{opacity:0.54}.cafe-teal .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary{background-color:#26a69a;color:rgba(0,0,0,0.87)}.cafe-teal .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove{color:rgba(0,0,0,0.87);opacity:0.4}.cafe-teal .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove:hover{opacity:0.54}.cafe-teal .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn{background-color:#f44336;color:#fff}.cafe-teal .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove{color:#fff;opacity:0.4}.cafe-teal .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove:hover{opacity:0.54}.cafe-teal .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent{background-color:#f48fb1;color:rgba(0,0,0,0.87)}.cafe-teal .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove{color:rgba(0,0,0,0.87);opacity:0.4}.cafe-teal .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove:hover{opacity:0.54}.cafe-teal .mat-table{background:#fff}.cafe-teal .mat-table thead,.cafe-teal .mat-table tbody,.cafe-teal .mat-table tfoot,.cafe-teal mat-header-row,.cafe-teal mat-row,.cafe-teal mat-footer-row,.cafe-teal [mat-header-row],.cafe-teal [mat-row],.cafe-teal [mat-footer-row],.cafe-teal .mat-table-sticky{background:inherit}.cafe-teal mat-row,.cafe-teal mat-header-row,.cafe-teal mat-footer-row,.cafe-teal th.mat-header-cell,.cafe-teal td.mat-cell,.cafe-teal td.mat-footer-cell{border-bottom-color:rgba(0,0,0,0.12)}.cafe-teal .mat-header-cell{color:rgba(0,0,0,0.54)}.cafe-teal .mat-cell,.cafe-teal .mat-footer-cell{color:rgba(0,0,0,0.87)}.cafe-teal .mat-calendar-arrow{border-top-color:rgba(0,0,0,0.54)}.cafe-teal .mat-datepicker-toggle,.cafe-teal .mat-datepicker-content .mat-calendar-next-button,.cafe-teal .mat-datepicker-content .mat-calendar-previous-button{color:rgba(0,0,0,0.54)}.cafe-teal .mat-calendar-table-header{color:rgba(0,0,0,0.38)}.cafe-teal .mat-calendar-table-header-divider::after{background:rgba(0,0,0,0.12)}.cafe-teal .mat-calendar-body-label{color:rgba(0,0,0,0.54)}.cafe-teal .mat-calendar-body-cell-content{color:rgba(0,0,0,0.87);border-color:transparent}.cafe-teal .mat-calendar-body-disabled>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected){color:rgba(0,0,0,0.38)}.cafe-teal .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected),.cafe-teal .cdk-keyboard-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected),.cafe-teal .cdk-program-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected){background-color:rgba(0,0,0,0.04)}.cafe-teal .mat-calendar-body-today:not(.mat-calendar-body-selected){border-color:rgba(0,0,0,0.38)}.cafe-teal .mat-calendar-body-disabled>.mat-calendar-body-today:not(.mat-calendar-body-selected){border-color:rgba(0,0,0,0.18)}.cafe-teal .mat-calendar-body-selected{background-color:#26a69a;color:rgba(0,0,0,0.87)}.cafe-teal .mat-calendar-body-disabled>.mat-calendar-body-selected{background-color:rgba(38,166,154,0.4)}.cafe-teal .mat-calendar-body-today.mat-calendar-body-selected{box-shadow:inset 0 0 0 1px rgba(0,0,0,0.87)}.cafe-teal .mat-datepicker-content{background-color:#fff;color:rgba(0,0,0,0.87)}.cafe-teal .mat-datepicker-content.mat-accent .mat-calendar-body-selected{background-color:#f48fb1;color:rgba(0,0,0,0.87)}.cafe-teal .mat-datepicker-content.mat-accent .mat-calendar-body-disabled>.mat-calendar-body-selected{background-color:rgba(244,143,177,0.4)}.cafe-teal .mat-datepicker-content.mat-accent .mat-calendar-body-today.mat-calendar-body-selected{box-shadow:inset 0 0 0 1px rgba(0,0,0,0.87)}.cafe-teal .mat-datepicker-content.mat-warn .mat-calendar-body-selected{background-color:#f44336;color:#fff}.cafe-teal .mat-datepicker-content.mat-warn .mat-calendar-body-disabled>.mat-calendar-body-selected{background-color:rgba(244,67,54,0.4)}.cafe-teal .mat-datepicker-content.mat-warn .mat-calendar-body-today.mat-calendar-body-selected{box-shadow:inset 0 0 0 1px #fff}.cafe-teal .mat-datepicker-toggle-active{color:#26a69a}.cafe-teal .mat-datepicker-toggle-active.mat-accent{color:#f48fb1}.cafe-teal .mat-datepicker-toggle-active.mat-warn{color:#f44336}.cafe-teal .mat-dialog-container{background:#fff;color:rgba(0,0,0,0.87)}.cafe-teal .mat-divider{border-top-color:rgba(0,0,0,0.12)}.cafe-teal .mat-divider-vertical{border-right-color:rgba(0,0,0,0.12)}.cafe-teal .mat-expansion-panel{background:#fff;color:rgba(0,0,0,0.87)}.cafe-teal .mat-action-row{border-top-color:rgba(0,0,0,0.12)}.cafe-teal .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-keyboard-focused,.cafe-teal .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-program-focused,.cafe-teal .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover{background:rgba(0,0,0,0.04)}@media (hover: none){.cafe-teal .mat-expansion-panel:not(.mat-expanded):not([aria-disabled='true']) .mat-expansion-panel-header:hover{background:#fff}}.cafe-teal .mat-expansion-panel-header-title{color:rgba(0,0,0,0.87)}.cafe-teal .mat-expansion-panel-header-description,.cafe-teal .mat-expansion-indicator::after{color:rgba(0,0,0,0.54)}.cafe-teal .mat-expansion-panel-header[aria-disabled='true']{color:rgba(0,0,0,0.26)}.cafe-teal .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-title,.cafe-teal .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-description{color:inherit}.cafe-teal .mat-form-field-label{color:rgba(0,0,0,0.6)}.cafe-teal .mat-hint{color:rgba(0,0,0,0.6)}.cafe-teal .mat-form-field.mat-focused .mat-form-field-label{color:#26a69a}.cafe-teal .mat-form-field.mat-focused .mat-form-field-label.mat-accent{color:#f48fb1}.cafe-teal .mat-form-field.mat-focused .mat-form-field-label.mat-warn{color:#f44336}.cafe-teal .mat-focused .mat-form-field-required-marker{color:#f48fb1}.cafe-teal .mat-form-field-ripple{background-color:rgba(0,0,0,0.87)}.cafe-teal .mat-form-field.mat-focused .mat-form-field-ripple{background-color:#26a69a}.cafe-teal .mat-form-field.mat-focused .mat-form-field-ripple.mat-accent{background-color:#f48fb1}.cafe-teal .mat-form-field.mat-focused .mat-form-field-ripple.mat-warn{background-color:#f44336}.cafe-teal .mat-form-field.mat-form-field-invalid .mat-form-field-label{color:#f44336}.cafe-teal .mat-form-field.mat-form-field-invalid .mat-form-field-label.mat-accent,.cafe-teal .mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker{color:#f44336}.cafe-teal .mat-form-field.mat-form-field-invalid .mat-form-field-ripple,.cafe-teal .mat-form-field.mat-form-field-invalid .mat-form-field-ripple.mat-accent{background-color:#f44336}.cafe-teal .mat-error{color:#f44336}.cafe-teal .mat-form-field-appearance-legacy .mat-form-field-label{color:rgba(0,0,0,0.54)}.cafe-teal .mat-form-field-appearance-legacy .mat-hint{color:rgba(0,0,0,0.54)}.cafe-teal .mat-form-field-appearance-legacy .mat-form-field-underline{background-color:rgba(0,0,0,0.42)}.cafe-teal .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{background-image:-webkit-gradient(linear, left top, right top, from(rgba(0,0,0,0.42)), color-stop(33%, rgba(0,0,0,0.42)), color-stop(0%, transparent));background-image:linear-gradient(to right, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.42) 33%, transparent 0%);background-size:4px 100%;background-repeat:repeat-x}.cafe-teal .mat-form-field-appearance-standard .mat-form-field-underline{background-color:rgba(0,0,0,0.42)}.cafe-teal .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{background-image:-webkit-gradient(linear, left top, right top, from(rgba(0,0,0,0.42)), color-stop(33%, rgba(0,0,0,0.42)), color-stop(0%, transparent));background-image:linear-gradient(to right, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.42) 33%, transparent 0%);background-size:4px 100%;background-repeat:repeat-x}.cafe-teal .mat-form-field-appearance-fill .mat-form-field-flex{background-color:rgba(0,0,0,0.04)}.cafe-teal .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex{background-color:rgba(0,0,0,0.02)}.cafe-teal .mat-form-field-appearance-fill .mat-form-field-underline::before{background-color:rgba(0,0,0,0.42)}.cafe-teal .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-label{color:rgba(0,0,0,0.38)}.cafe-teal .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-underline::before{background-color:transparent}.cafe-teal .mat-form-field-appearance-outline .mat-form-field-outline{color:rgba(0,0,0,0.12)}.cafe-teal .mat-form-field-appearance-outline .mat-form-field-outline-thick{color:rgba(0,0,0,0.87)}.cafe-teal .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick{color:#26a69a}.cafe-teal .mat-form-field-appearance-outline.mat-focused.mat-accent .mat-form-field-outline-thick{color:#f48fb1}.cafe-teal .mat-form-field-appearance-outline.mat-focused.mat-warn .mat-form-field-outline-thick{color:#f44336}.cafe-teal .mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick{color:#f44336}.cafe-teal .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-label{color:rgba(0,0,0,0.38)}.cafe-teal .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline{color:rgba(0,0,0,0.06)}.cafe-teal .mat-icon.mat-primary{color:#26a69a}.cafe-teal .mat-icon.mat-accent{color:#f48fb1}.cafe-teal .mat-icon.mat-warn{color:#f44336}.cafe-teal .mat-input-element:disabled{color:rgba(0,0,0,0.38)}.cafe-teal .mat-input-element{caret-color:#26a69a}.cafe-teal .mat-input-element::-webkit-input-placeholder{color:rgba(0,0,0,0.42)}.cafe-teal .mat-input-element::-moz-placeholder{color:rgba(0,0,0,0.42)}.cafe-teal .mat-input-element::-ms-input-placeholder{color:rgba(0,0,0,0.42)}.cafe-teal .mat-input-element::placeholder{color:rgba(0,0,0,0.42)}.cafe-teal .mat-input-element::-moz-placeholder{color:rgba(0,0,0,0.42)}.cafe-teal .mat-input-element::-webkit-input-placeholder{color:rgba(0,0,0,0.42)}.cafe-teal .mat-input-element:-ms-input-placeholder{color:rgba(0,0,0,0.42)}.cafe-teal .mat-accent .mat-input-element{caret-color:#f48fb1}.cafe-teal .mat-warn .mat-input-element,.cafe-teal .mat-form-field-invalid .mat-input-element{caret-color:#f44336}.cafe-teal .mat-list .mat-list-item,.cafe-teal .mat-nav-list .mat-list-item,.cafe-teal .mat-selection-list .mat-list-item{color:rgba(0,0,0,0.87)}.cafe-teal .mat-list .mat-list-option,.cafe-teal .mat-nav-list .mat-list-option,.cafe-teal .mat-selection-list .mat-list-option{color:rgba(0,0,0,0.87)}.cafe-teal .mat-list .mat-subheader,.cafe-teal .mat-nav-list .mat-subheader,.cafe-teal .mat-selection-list .mat-subheader{color:rgba(0,0,0,0.54)}.cafe-teal .mat-list-item-disabled{background-color:#eee}.cafe-teal .mat-list-option:hover,.cafe-teal .mat-list-option.mat-list-item-focus,.cafe-teal .mat-nav-list .mat-list-item:hover,.cafe-teal .mat-nav-list .mat-list-item.mat-list-item-focus{background:rgba(0,0,0,0.04)}.cafe-teal .mat-menu-panel{background:#fff}.cafe-teal .mat-menu-item{background:transparent;color:rgba(0,0,0,0.87)}.cafe-teal .mat-menu-item[disabled],.cafe-teal .mat-menu-item[disabled]::after{color:rgba(0,0,0,0.38)}.cafe-teal .mat-menu-item .mat-icon:not([color]),.cafe-teal .mat-menu-item-submenu-trigger::after{color:rgba(0,0,0,0.54)}.cafe-teal .mat-menu-item:hover:not([disabled]),.cafe-teal .mat-menu-item.cdk-program-focused:not([disabled]),.cafe-teal .mat-menu-item.cdk-keyboard-focused:not([disabled]),.cafe-teal .mat-menu-item-highlighted:not([disabled]){background:rgba(0,0,0,0.04)}.cafe-teal .mat-paginator{background:#fff}.cafe-teal .mat-paginator,.cafe-teal .mat-paginator-page-size .mat-select-trigger{color:rgba(0,0,0,0.54)}.cafe-teal .mat-paginator-decrement,.cafe-teal .mat-paginator-increment{border-top:2px solid rgba(0,0,0,0.54);border-right:2px solid rgba(0,0,0,0.54)}.cafe-teal .mat-paginator-first,.cafe-teal .mat-paginator-last{border-top:2px solid rgba(0,0,0,0.54)}.cafe-teal .mat-icon-button[disabled] .mat-paginator-decrement,.cafe-teal .mat-icon-button[disabled] .mat-paginator-increment,.cafe-teal .mat-icon-button[disabled] .mat-paginator-first,.cafe-teal .mat-icon-button[disabled] .mat-paginator-last{border-color:rgba(0,0,0,0.38)}.cafe-teal .mat-progress-bar-background{fill:#b2dfdb}.cafe-teal .mat-progress-bar-buffer{background-color:#b2dfdb}.cafe-teal .mat-progress-bar-fill::after{background-color:#26a69a}.cafe-teal .mat-progress-bar.mat-accent .mat-progress-bar-background{fill:#f8bbd0}.cafe-teal .mat-progress-bar.mat-accent .mat-progress-bar-buffer{background-color:#f8bbd0}.cafe-teal .mat-progress-bar.mat-accent .mat-progress-bar-fill::after{background-color:#f48fb1}.cafe-teal .mat-progress-bar.mat-warn .mat-progress-bar-background{fill:#ffcdd2}.cafe-teal .mat-progress-bar.mat-warn .mat-progress-bar-buffer{background-color:#ffcdd2}.cafe-teal .mat-progress-bar.mat-warn .mat-progress-bar-fill::after{background-color:#f44336}.cafe-teal .mat-progress-spinner circle,.cafe-teal .mat-spinner circle{stroke:#26a69a}.cafe-teal .mat-progress-spinner.mat-accent circle,.cafe-teal .mat-spinner.mat-accent circle{stroke:#f48fb1}.cafe-teal .mat-progress-spinner.mat-warn circle,.cafe-teal .mat-spinner.mat-warn circle{stroke:#f44336}.cafe-teal .mat-radio-outer-circle{border-color:rgba(0,0,0,0.54)}.cafe-teal .mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle{border-color:#26a69a}.cafe-teal .mat-radio-button.mat-primary .mat-radio-inner-circle{background-color:#26a69a}.cafe-teal .mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element{background-color:rgba(38,166,154,0.26)}.cafe-teal .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle{border-color:#f48fb1}.cafe-teal .mat-radio-button.mat-accent .mat-radio-inner-circle{background-color:#f48fb1}.cafe-teal .mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element{background-color:rgba(244,143,177,0.26)}.cafe-teal .mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle{border-color:#f44336}.cafe-teal .mat-radio-button.mat-warn .mat-radio-inner-circle{background-color:#f44336}.cafe-teal .mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element{background-color:rgba(244,67,54,0.26)}.cafe-teal .mat-radio-button.mat-radio-disabled.mat-radio-checked .mat-radio-outer-circle,.cafe-teal .mat-radio-button.mat-radio-disabled .mat-radio-outer-circle{border-color:rgba(0,0,0,0.38)}.cafe-teal .mat-radio-button.mat-radio-disabled .mat-radio-ripple .mat-ripple-element,.cafe-teal .mat-radio-button.mat-radio-disabled .mat-radio-inner-circle{background-color:rgba(0,0,0,0.38)}.cafe-teal .mat-radio-button.mat-radio-disabled .mat-radio-label-content{color:rgba(0,0,0,0.38)}.cafe-teal .mat-select-content,.cafe-teal .mat-select-panel-done-animating{background:#fff}.cafe-teal .mat-select-value{color:rgba(0,0,0,0.87)}.cafe-teal .mat-select-placeholder{color:rgba(0,0,0,0.42)}.cafe-teal .mat-select-disabled .mat-select-value{color:rgba(0,0,0,0.38)}.cafe-teal .mat-select-arrow{color:rgba(0,0,0,0.54)}.cafe-teal .mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple){background:rgba(0,0,0,0.12)}.cafe-teal .mat-form-field.mat-focused.mat-primary .mat-select-arrow{color:#26a69a}.cafe-teal .mat-form-field.mat-focused.mat-accent .mat-select-arrow{color:#f48fb1}.cafe-teal .mat-form-field.mat-focused.mat-warn .mat-select-arrow{color:#f44336}.cafe-teal .mat-form-field .mat-select.mat-select-invalid .mat-select-arrow{color:#f44336}.cafe-teal .mat-form-field .mat-select.mat-select-disabled .mat-select-arrow{color:rgba(0,0,0,0.38)}.cafe-teal .mat-drawer-container{background-color:#fafafa;color:rgba(0,0,0,0.87)}.cafe-teal .mat-drawer{background-color:#fff;color:rgba(0,0,0,0.87)}.cafe-teal .mat-drawer.mat-drawer-push{background-color:#fff}.cafe-teal .mat-drawer-backdrop.mat-drawer-shown{background-color:rgba(0,0,0,0.6)}.cafe-teal .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#e91e63}.cafe-teal .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(233,30,99,0.5)}.cafe-teal .mat-slide-toggle:not(.mat-checked) .mat-ripple-element{background-color:rgba(0,0,0,0.06)}.cafe-teal .mat-slide-toggle .mat-ripple-element{background-color:rgba(233,30,99,0.12)}.cafe-teal .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#009688}.cafe-teal .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(0,150,136,0.5)}.cafe-teal .mat-slide-toggle.mat-primary:not(.mat-checked) .mat-ripple-element{background-color:rgba(0,0,0,0.06)}.cafe-teal .mat-slide-toggle.mat-primary .mat-ripple-element{background-color:rgba(0,150,136,0.12)}.cafe-teal .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#f44336}.cafe-teal .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(244,67,54,0.5)}.cafe-teal .mat-slide-toggle.mat-warn:not(.mat-checked) .mat-ripple-element{background-color:rgba(0,0,0,0.06)}.cafe-teal .mat-slide-toggle.mat-warn .mat-ripple-element{background-color:rgba(244,67,54,0.12)}.cafe-teal .mat-disabled .mat-slide-toggle-thumb{background-color:#bdbdbd}.cafe-teal .mat-disabled .mat-slide-toggle-bar{background-color:rgba(0,0,0,0.1)}.cafe-teal .mat-slide-toggle-thumb{background-color:#fafafa}.cafe-teal .mat-slide-toggle-bar{background-color:rgba(0,0,0,0.38)}.cafe-teal .mat-slider-track-background{background-color:rgba(0,0,0,0.26)}.cafe-teal .mat-primary .mat-slider-track-fill,.cafe-teal .mat-primary .mat-slider-thumb,.cafe-teal .mat-primary .mat-slider-thumb-label{background-color:#26a69a}.cafe-teal .mat-primary .mat-slider-thumb-label-text{color:rgba(0,0,0,0.87)}.cafe-teal .mat-accent .mat-slider-track-fill,.cafe-teal .mat-accent .mat-slider-thumb,.cafe-teal .mat-accent .mat-slider-thumb-label{background-color:#f48fb1}.cafe-teal .mat-accent .mat-slider-thumb-label-text{color:rgba(0,0,0,0.87)}.cafe-teal .mat-warn .mat-slider-track-fill,.cafe-teal .mat-warn .mat-slider-thumb,.cafe-teal .mat-warn .mat-slider-thumb-label{background-color:#f44336}.cafe-teal .mat-warn .mat-slider-thumb-label-text{color:#fff}.cafe-teal .mat-slider-focus-ring{background-color:rgba(244,143,177,0.2)}.cafe-teal .mat-slider:hover .mat-slider-track-background,.cafe-teal .cdk-focused .mat-slider-track-background{background-color:rgba(0,0,0,0.38)}.cafe-teal .mat-slider-disabled .mat-slider-track-background,.cafe-teal .mat-slider-disabled .mat-slider-track-fill,.cafe-teal .mat-slider-disabled .mat-slider-thumb{background-color:rgba(0,0,0,0.26)}.cafe-teal .mat-slider-disabled:hover .mat-slider-track-background{background-color:rgba(0,0,0,0.26)}.cafe-teal .mat-slider-min-value .mat-slider-focus-ring{background-color:rgba(0,0,0,0.12)}.cafe-teal .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,.cafe-teal .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label{background-color:rgba(0,0,0,0.87)}.cafe-teal .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,.cafe-teal .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label{background-color:rgba(0,0,0,0.26)}.cafe-teal .mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb{border-color:rgba(0,0,0,0.26);background-color:transparent}.cafe-teal .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb,.cafe-teal .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb{border-color:rgba(0,0,0,0.38)}.cafe-teal .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb,.cafe-teal .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb{border-color:rgba(0,0,0,0.26)}.cafe-teal .mat-slider-has-ticks .mat-slider-wrapper::after{border-color:rgba(0,0,0,0.7)}.cafe-teal .mat-slider-horizontal .mat-slider-ticks{background-image:repeating-linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.7) 2px, transparent 0, transparent);background-image:-moz-repeating-linear-gradient(0.0001deg, rgba(0,0,0,0.7), rgba(0,0,0,0.7) 2px, transparent 0, transparent)}.cafe-teal .mat-slider-vertical .mat-slider-ticks{background-image:repeating-linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7) 2px, transparent 0, transparent)}.cafe-teal .mat-step-header.cdk-keyboard-focused,.cafe-teal .mat-step-header.cdk-program-focused,.cafe-teal .mat-step-header:hover{background-color:rgba(0,0,0,0.04)}.cafe-teal .mat-step-header .mat-step-label,.cafe-teal .mat-step-header .mat-step-optional{color:rgba(0,0,0,0.38)}.cafe-teal .mat-step-header .mat-step-icon{background-color:#26a69a;color:rgba(0,0,0,0.87)}.cafe-teal .mat-step-header .mat-step-icon-not-touched{background-color:rgba(0,0,0,0.38);color:rgba(0,0,0,0.87)}.cafe-teal .mat-step-header .mat-step-label.mat-step-label-active{color:rgba(0,0,0,0.87)}.cafe-teal .mat-stepper-horizontal,.cafe-teal .mat-stepper-vertical{background-color:#fff}.cafe-teal .mat-stepper-vertical-line::before{border-left-color:rgba(0,0,0,0.12)}.cafe-teal .mat-stepper-horizontal-line{border-top-color:rgba(0,0,0,0.12)}.cafe-teal .mat-sort-header-arrow{color:#757575}.cafe-teal .mat-tab-nav-bar,.cafe-teal .mat-tab-header{border-bottom:1px solid rgba(0,0,0,0.12)}.cafe-teal .mat-tab-group-inverted-header .mat-tab-nav-bar,.cafe-teal .mat-tab-group-inverted-header .mat-tab-header{border-top:1px solid rgba(0,0,0,0.12);border-bottom:none}.cafe-teal .mat-tab-label,.cafe-teal .mat-tab-link{color:rgba(0,0,0,0.87)}.cafe-teal .mat-tab-label.mat-tab-disabled,.cafe-teal .mat-tab-link.mat-tab-disabled{color:rgba(0,0,0,0.38)}.cafe-teal .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,0.87)}.cafe-teal .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,0.38)}.cafe-teal .mat-tab-group[class*='mat-background-'] .mat-tab-header,.cafe-teal .mat-tab-nav-bar[class*='mat-background-']{border-bottom:none;border-top:none}.cafe-teal .mat-tab-group.mat-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled){background-color:rgba(178,223,219,0.3)}.cafe-teal .mat-tab-group.mat-primary .mat-ink-bar,.cafe-teal .mat-tab-nav-bar.mat-primary .mat-ink-bar{background-color:#26a69a}.cafe-teal .mat-tab-group.mat-primary.mat-background-primary .mat-ink-bar,.cafe-teal .mat-tab-nav-bar.mat-primary.mat-background-primary .mat-ink-bar{background-color:rgba(0,0,0,0.87)}.cafe-teal .mat-tab-group.mat-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled){background-color:rgba(248,187,208,0.3)}.cafe-teal .mat-tab-group.mat-accent .mat-ink-bar,.cafe-teal .mat-tab-nav-bar.mat-accent .mat-ink-bar{background-color:#f48fb1}.cafe-teal .mat-tab-group.mat-accent.mat-background-accent .mat-ink-bar,.cafe-teal .mat-tab-nav-bar.mat-accent.mat-background-accent .mat-ink-bar{background-color:rgba(0,0,0,0.87)}.cafe-teal .mat-tab-group.mat-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled){background-color:rgba(255,205,210,0.3)}.cafe-teal .mat-tab-group.mat-warn .mat-ink-bar,.cafe-teal .mat-tab-nav-bar.mat-warn .mat-ink-bar{background-color:#f44336}.cafe-teal .mat-tab-group.mat-warn.mat-background-warn .mat-ink-bar,.cafe-teal .mat-tab-nav-bar.mat-warn.mat-background-warn .mat-ink-bar{background-color:#fff}.cafe-teal .mat-tab-group.mat-background-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-background-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-background-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-background-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled){background-color:rgba(178,223,219,0.3)}.cafe-teal .mat-tab-group.mat-background-primary .mat-tab-header,.cafe-teal .mat-tab-group.mat-background-primary .mat-tab-links,.cafe-teal .mat-tab-nav-bar.mat-background-primary .mat-tab-header,.cafe-teal .mat-tab-nav-bar.mat-background-primary .mat-tab-links{background-color:#26a69a}.cafe-teal .mat-tab-group.mat-background-primary .mat-tab-label,.cafe-teal .mat-tab-group.mat-background-primary .mat-tab-link,.cafe-teal .mat-tab-nav-bar.mat-background-primary .mat-tab-label,.cafe-teal .mat-tab-nav-bar.mat-background-primary .mat-tab-link{color:rgba(0,0,0,0.87)}.cafe-teal .mat-tab-group.mat-background-primary .mat-tab-label.mat-tab-disabled,.cafe-teal .mat-tab-group.mat-background-primary .mat-tab-link.mat-tab-disabled,.cafe-teal .mat-tab-nav-bar.mat-background-primary .mat-tab-label.mat-tab-disabled,.cafe-teal .mat-tab-nav-bar.mat-background-primary .mat-tab-link.mat-tab-disabled{color:rgba(0,0,0,0.4)}.cafe-teal .mat-tab-group.mat-background-primary .mat-tab-header-pagination-chevron,.cafe-teal .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,0.87)}.cafe-teal .mat-tab-group.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,.cafe-teal .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,0.4)}.cafe-teal .mat-tab-group.mat-background-primary .mat-ripple-element,.cafe-teal .mat-tab-nav-bar.mat-background-primary .mat-ripple-element{background-color:rgba(0,0,0,0.12)}.cafe-teal .mat-tab-group.mat-background-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-background-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-background-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-background-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled){background-color:rgba(248,187,208,0.3)}.cafe-teal .mat-tab-group.mat-background-accent .mat-tab-header,.cafe-teal .mat-tab-group.mat-background-accent .mat-tab-links,.cafe-teal .mat-tab-nav-bar.mat-background-accent .mat-tab-header,.cafe-teal .mat-tab-nav-bar.mat-background-accent .mat-tab-links{background-color:#f48fb1}.cafe-teal .mat-tab-group.mat-background-accent .mat-tab-label,.cafe-teal .mat-tab-group.mat-background-accent .mat-tab-link,.cafe-teal .mat-tab-nav-bar.mat-background-accent .mat-tab-label,.cafe-teal .mat-tab-nav-bar.mat-background-accent .mat-tab-link{color:rgba(0,0,0,0.87)}.cafe-teal .mat-tab-group.mat-background-accent .mat-tab-label.mat-tab-disabled,.cafe-teal .mat-tab-group.mat-background-accent .mat-tab-link.mat-tab-disabled,.cafe-teal .mat-tab-nav-bar.mat-background-accent .mat-tab-label.mat-tab-disabled,.cafe-teal .mat-tab-nav-bar.mat-background-accent .mat-tab-link.mat-tab-disabled{color:rgba(0,0,0,0.4)}.cafe-teal .mat-tab-group.mat-background-accent .mat-tab-header-pagination-chevron,.cafe-teal .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,0.87)}.cafe-teal .mat-tab-group.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,.cafe-teal .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,0.4)}.cafe-teal .mat-tab-group.mat-background-accent .mat-ripple-element,.cafe-teal .mat-tab-nav-bar.mat-background-accent .mat-ripple-element{background-color:rgba(0,0,0,0.12)}.cafe-teal .mat-tab-group.mat-background-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-background-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-background-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-group.mat-background-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-teal .mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled){background-color:rgba(255,205,210,0.3)}.cafe-teal .mat-tab-group.mat-background-warn .mat-tab-header,.cafe-teal .mat-tab-group.mat-background-warn .mat-tab-links,.cafe-teal .mat-tab-nav-bar.mat-background-warn .mat-tab-header,.cafe-teal .mat-tab-nav-bar.mat-background-warn .mat-tab-links{background-color:#f44336}.cafe-teal .mat-tab-group.mat-background-warn .mat-tab-label,.cafe-teal .mat-tab-group.mat-background-warn .mat-tab-link,.cafe-teal .mat-tab-nav-bar.mat-background-warn .mat-tab-label,.cafe-teal .mat-tab-nav-bar.mat-background-warn .mat-tab-link{color:#fff}.cafe-teal .mat-tab-group.mat-background-warn .mat-tab-label.mat-tab-disabled,.cafe-teal .mat-tab-group.mat-background-warn .mat-tab-link.mat-tab-disabled,.cafe-teal .mat-tab-nav-bar.mat-background-warn .mat-tab-label.mat-tab-disabled,.cafe-teal .mat-tab-nav-bar.mat-background-warn .mat-tab-link.mat-tab-disabled{color:rgba(255,255,255,0.4)}.cafe-teal .mat-tab-group.mat-background-warn .mat-tab-header-pagination-chevron,.cafe-teal .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-chevron{border-color:#fff}.cafe-teal .mat-tab-group.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,.cafe-teal .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(255,255,255,0.4)}.cafe-teal .mat-tab-group.mat-background-warn .mat-ripple-element,.cafe-teal .mat-tab-nav-bar.mat-background-warn .mat-ripple-element{background-color:rgba(255,255,255,0.12)}.cafe-teal .mat-toolbar{background:#f5f5f5;color:rgba(0,0,0,0.87)}.cafe-teal .mat-toolbar.mat-primary{background:#26a69a;color:rgba(0,0,0,0.87)}.cafe-teal .mat-toolbar.mat-accent{background:#f48fb1;color:rgba(0,0,0,0.87)}.cafe-teal .mat-toolbar.mat-warn{background:#f44336;color:#fff}.cafe-teal .mat-toolbar .mat-form-field-underline,.cafe-teal .mat-toolbar .mat-form-field-ripple,.cafe-teal .mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.cafe-teal .mat-toolbar .mat-form-field-label,.cafe-teal .mat-toolbar .mat-focused .mat-form-field-label,.cafe-teal .mat-toolbar .mat-select-value,.cafe-teal .mat-toolbar .mat-select-arrow,.cafe-teal .mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.cafe-teal .mat-toolbar .mat-input-element{caret-color:currentColor}.cafe-teal .mat-tooltip{background:rgba(97,97,97,0.9)}.cafe-teal .mat-tree{background:#fff}.cafe-teal .mat-tree-node{color:rgba(0,0,0,0.87)}.cafe-teal .mat-snack-bar-container{background:#323232;color:#fff}.cafe-teal .mat-simple-snackbar-action{color:#f48fb1}.cafe-pink .bg-color{background-color:#ec407a !important}.cafe-pink .bg-color-accent{background-color:#80cbc4 !important}.cafe-pink .mat-ripple-element{background-color:rgba(0,0,0,0.1)}.cafe-pink .mat-option{color:rgba(0,0,0,0.87)}.cafe-pink .mat-option:hover:not(.mat-option-disabled),.cafe-pink .mat-option:focus:not(.mat-option-disabled){background:rgba(0,0,0,0.04)}.cafe-pink .mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled){background:rgba(0,0,0,0.04)}.cafe-pink .mat-option.mat-active{background:rgba(0,0,0,0.04);color:rgba(0,0,0,0.87)}.cafe-pink .mat-option.mat-option-disabled{color:rgba(0,0,0,0.38)}.cafe-pink .mat-primary .mat-option.mat-selected:not(.mat-option-disabled){color:#ec407a}.cafe-pink .mat-accent .mat-option.mat-selected:not(.mat-option-disabled){color:#80cbc4}.cafe-pink .mat-warn .mat-option.mat-selected:not(.mat-option-disabled){color:#f44336}.cafe-pink .mat-optgroup-label{color:rgba(0,0,0,0.54)}.cafe-pink .mat-optgroup-disabled .mat-optgroup-label{color:rgba(0,0,0,0.38)}.cafe-pink .mat-pseudo-checkbox{color:rgba(0,0,0,0.54)}.cafe-pink .mat-pseudo-checkbox::after{color:#fafafa}.cafe-pink .mat-pseudo-checkbox-checked,.cafe-pink .mat-pseudo-checkbox-indeterminate,.cafe-pink .mat-accent .mat-pseudo-checkbox-checked,.cafe-pink .mat-accent .mat-pseudo-checkbox-indeterminate{background:#80cbc4}.cafe-pink .mat-primary .mat-pseudo-checkbox-checked,.cafe-pink .mat-primary .mat-pseudo-checkbox-indeterminate{background:#ec407a}.cafe-pink .mat-warn .mat-pseudo-checkbox-checked,.cafe-pink .mat-warn .mat-pseudo-checkbox-indeterminate{background:#f44336}.cafe-pink .mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,.cafe-pink .mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled{background:#b0b0b0}.cafe-pink .mat-app-background,.cafe-pink.mat-app-background{background-color:#fafafa;color:rgba(0,0,0,0.87)}.mat-theme-loaded-marker{display:none}.cafe-pink .mat-autocomplete-panel{background:#fff;color:rgba(0,0,0,0.87)}.cafe-pink .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover){background:#fff}.cafe-pink .mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled){color:rgba(0,0,0,0.87)}.cafe-pink .mat-badge-content{color:rgba(0,0,0,0.87);background:#ec407a}.cafe-pink .mat-badge-accent .mat-badge-content{background:#80cbc4;color:rgba(0,0,0,0.87)}.cafe-pink .mat-badge-warn .mat-badge-content{color:#fff;background:#f44336}.cafe-pink .mat-badge{position:relative}.cafe-pink .mat-badge-hidden .mat-badge-content{display:none}.cafe-pink .mat-badge-content{position:absolute;text-align:center;display:inline-block;border-radius:50%;-webkit-transition:-webkit-transform 200ms ease-in-out;transition:-webkit-transform 200ms ease-in-out;transition:transform 200ms ease-in-out;transition:transform 200ms ease-in-out, -webkit-transform 200ms ease-in-out;-webkit-transform:scale(0.6);transform:scale(0.6);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;pointer-events:none}.cafe-pink .mat-badge-content.mat-badge-active{-webkit-transform:none;transform:none}.cafe-pink .mat-badge-small .mat-badge-content{width:16px;height:16px;line-height:16px}@media screen and (-ms-high-contrast: active){.cafe-pink .mat-badge-small .mat-badge-content{outline:solid 1px;border-radius:0}}.cafe-pink .mat-badge-small.mat-badge-above .mat-badge-content{top:-8px}.cafe-pink .mat-badge-small.mat-badge-below .mat-badge-content{bottom:-8px}.cafe-pink .mat-badge-small.mat-badge-before .mat-badge-content{left:-16px}[dir='rtl'] .cafe-pink .mat-badge-small.mat-badge-before .mat-badge-content{left:auto;right:-16px}.cafe-pink .mat-badge-small.mat-badge-after .mat-badge-content{right:-16px}[dir='rtl'] .cafe-pink .mat-badge-small.mat-badge-after .mat-badge-content{right:auto;left:-16px}.cafe-pink .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content{left:-8px}[dir='rtl'] .cafe-pink .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content{left:auto;right:-8px}.cafe-pink .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content{right:-8px}[dir='rtl'] .cafe-pink .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content{right:auto;left:-8px}.cafe-pink .mat-badge-medium .mat-badge-content{width:22px;height:22px;line-height:22px}@media screen and (-ms-high-contrast: active){.cafe-pink .mat-badge-medium .mat-badge-content{outline:solid 1px;border-radius:0}}.cafe-pink .mat-badge-medium.mat-badge-above .mat-badge-content{top:-11px}.cafe-pink .mat-badge-medium.mat-badge-below .mat-badge-content{bottom:-11px}.cafe-pink .mat-badge-medium.mat-badge-before .mat-badge-content{left:-22px}[dir='rtl'] .cafe-pink .mat-badge-medium.mat-badge-before .mat-badge-content{left:auto;right:-22px}.cafe-pink .mat-badge-medium.mat-badge-after .mat-badge-content{right:-22px}[dir='rtl'] .cafe-pink .mat-badge-medium.mat-badge-after .mat-badge-content{right:auto;left:-22px}.cafe-pink .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content{left:-11px}[dir='rtl'] .cafe-pink .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content{left:auto;right:-11px}.cafe-pink .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content{right:-11px}[dir='rtl'] .cafe-pink .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content{right:auto;left:-11px}.cafe-pink .mat-badge-large .mat-badge-content{width:28px;height:28px;line-height:28px}@media screen and (-ms-high-contrast: active){.cafe-pink .mat-badge-large .mat-badge-content{outline:solid 1px;border-radius:0}}.cafe-pink .mat-badge-large.mat-badge-above .mat-badge-content{top:-14px}.cafe-pink .mat-badge-large.mat-badge-below .mat-badge-content{bottom:-14px}.cafe-pink .mat-badge-large.mat-badge-before .mat-badge-content{left:-28px}[dir='rtl'] .cafe-pink .mat-badge-large.mat-badge-before .mat-badge-content{left:auto;right:-28px}.cafe-pink .mat-badge-large.mat-badge-after .mat-badge-content{right:-28px}[dir='rtl'] .cafe-pink .mat-badge-large.mat-badge-after .mat-badge-content{right:auto;left:-28px}.cafe-pink .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content{left:-14px}[dir='rtl'] .cafe-pink .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content{left:auto;right:-14px}.cafe-pink .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content{right:-14px}[dir='rtl'] .cafe-pink .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content{right:auto;left:-14px}.cafe-pink .mat-bottom-sheet-container{background:#fff;color:rgba(0,0,0,0.87)}.cafe-pink .mat-button,.cafe-pink .mat-icon-button,.cafe-pink .mat-stroked-button{color:inherit;background:transparent}.cafe-pink .mat-button.mat-primary,.cafe-pink .mat-icon-button.mat-primary,.cafe-pink .mat-stroked-button.mat-primary{color:#ec407a}.cafe-pink .mat-button.mat-accent,.cafe-pink .mat-icon-button.mat-accent,.cafe-pink .mat-stroked-button.mat-accent{color:#80cbc4}.cafe-pink .mat-button.mat-warn,.cafe-pink .mat-icon-button.mat-warn,.cafe-pink .mat-stroked-button.mat-warn{color:#f44336}.cafe-pink .mat-button.mat-primary[disabled],.cafe-pink .mat-button.mat-accent[disabled],.cafe-pink .mat-button.mat-warn[disabled],.cafe-pink .mat-button[disabled][disabled],.cafe-pink .mat-icon-button.mat-primary[disabled],.cafe-pink .mat-icon-button.mat-accent[disabled],.cafe-pink .mat-icon-button.mat-warn[disabled],.cafe-pink .mat-icon-button[disabled][disabled],.cafe-pink .mat-stroked-button.mat-primary[disabled],.cafe-pink .mat-stroked-button.mat-accent[disabled],.cafe-pink .mat-stroked-button.mat-warn[disabled],.cafe-pink .mat-stroked-button[disabled][disabled]{color:rgba(0,0,0,0.26)}.cafe-pink .mat-button.mat-primary .mat-button-focus-overlay,.cafe-pink .mat-icon-button.mat-primary .mat-button-focus-overlay,.cafe-pink .mat-stroked-button.mat-primary .mat-button-focus-overlay{background-color:rgba(236,64,122,0.12)}.cafe-pink .mat-button.mat-accent .mat-button-focus-overlay,.cafe-pink .mat-icon-button.mat-accent .mat-button-focus-overlay,.cafe-pink .mat-stroked-button.mat-accent .mat-button-focus-overlay{background-color:rgba(128,203,196,0.12)}.cafe-pink .mat-button.mat-warn .mat-button-focus-overlay,.cafe-pink .mat-icon-button.mat-warn .mat-button-focus-overlay,.cafe-pink .mat-stroked-button.mat-warn .mat-button-focus-overlay{background-color:rgba(244,67,54,0.12)}.cafe-pink .mat-button[disabled] .mat-button-focus-overlay,.cafe-pink .mat-icon-button[disabled] .mat-button-focus-overlay,.cafe-pink .mat-stroked-button[disabled] .mat-button-focus-overlay{background-color:transparent}.cafe-pink .mat-button.mat-primary .mat-ripple-element,.cafe-pink .mat-icon-button.mat-primary .mat-ripple-element,.cafe-pink .mat-stroked-button.mat-primary .mat-ripple-element{background-color:rgba(236,64,122,0.1)}.cafe-pink .mat-button.mat-accent .mat-ripple-element,.cafe-pink .mat-icon-button.mat-accent .mat-ripple-element,.cafe-pink .mat-stroked-button.mat-accent .mat-ripple-element{background-color:rgba(128,203,196,0.1)}.cafe-pink .mat-button.mat-warn .mat-ripple-element,.cafe-pink .mat-icon-button.mat-warn .mat-ripple-element,.cafe-pink .mat-stroked-button.mat-warn .mat-ripple-element{background-color:rgba(244,67,54,0.1)}.cafe-pink .mat-flat-button,.cafe-pink .mat-raised-button,.cafe-pink .mat-fab,.cafe-pink .mat-mini-fab{color:rgba(0,0,0,0.87);background-color:#fff}.cafe-pink .mat-flat-button.mat-primary,.cafe-pink .mat-raised-button.mat-primary,.cafe-pink .mat-fab.mat-primary,.cafe-pink .mat-mini-fab.mat-primary{color:rgba(0,0,0,0.87)}.cafe-pink .mat-flat-button.mat-accent,.cafe-pink .mat-raised-button.mat-accent,.cafe-pink .mat-fab.mat-accent,.cafe-pink .mat-mini-fab.mat-accent{color:rgba(0,0,0,0.87)}.cafe-pink .mat-flat-button.mat-warn,.cafe-pink .mat-raised-button.mat-warn,.cafe-pink .mat-fab.mat-warn,.cafe-pink .mat-mini-fab.mat-warn{color:#fff}.cafe-pink .mat-flat-button.mat-primary[disabled],.cafe-pink .mat-flat-button.mat-accent[disabled],.cafe-pink .mat-flat-button.mat-warn[disabled],.cafe-pink .mat-flat-button[disabled][disabled],.cafe-pink .mat-raised-button.mat-primary[disabled],.cafe-pink .mat-raised-button.mat-accent[disabled],.cafe-pink .mat-raised-button.mat-warn[disabled],.cafe-pink .mat-raised-button[disabled][disabled],.cafe-pink .mat-fab.mat-primary[disabled],.cafe-pink .mat-fab.mat-accent[disabled],.cafe-pink .mat-fab.mat-warn[disabled],.cafe-pink .mat-fab[disabled][disabled],.cafe-pink .mat-mini-fab.mat-primary[disabled],.cafe-pink .mat-mini-fab.mat-accent[disabled],.cafe-pink .mat-mini-fab.mat-warn[disabled],.cafe-pink .mat-mini-fab[disabled][disabled]{color:rgba(0,0,0,0.26)}.cafe-pink .mat-flat-button.mat-primary,.cafe-pink .mat-raised-button.mat-primary,.cafe-pink .mat-fab.mat-primary,.cafe-pink .mat-mini-fab.mat-primary{background-color:#ec407a}.cafe-pink .mat-flat-button.mat-accent,.cafe-pink .mat-raised-button.mat-accent,.cafe-pink .mat-fab.mat-accent,.cafe-pink .mat-mini-fab.mat-accent{background-color:#80cbc4}.cafe-pink .mat-flat-button.mat-warn,.cafe-pink .mat-raised-button.mat-warn,.cafe-pink .mat-fab.mat-warn,.cafe-pink .mat-mini-fab.mat-warn{background-color:#f44336}.cafe-pink .mat-flat-button.mat-primary[disabled],.cafe-pink .mat-flat-button.mat-accent[disabled],.cafe-pink .mat-flat-button.mat-warn[disabled],.cafe-pink .mat-flat-button[disabled][disabled],.cafe-pink .mat-raised-button.mat-primary[disabled],.cafe-pink .mat-raised-button.mat-accent[disabled],.cafe-pink .mat-raised-button.mat-warn[disabled],.cafe-pink .mat-raised-button[disabled][disabled],.cafe-pink .mat-fab.mat-primary[disabled],.cafe-pink .mat-fab.mat-accent[disabled],.cafe-pink .mat-fab.mat-warn[disabled],.cafe-pink .mat-fab[disabled][disabled],.cafe-pink .mat-mini-fab.mat-primary[disabled],.cafe-pink .mat-mini-fab.mat-accent[disabled],.cafe-pink .mat-mini-fab.mat-warn[disabled],.cafe-pink .mat-mini-fab[disabled][disabled]{background-color:rgba(0,0,0,0.12)}.cafe-pink .mat-flat-button.mat-primary .mat-ripple-element,.cafe-pink .mat-raised-button.mat-primary .mat-ripple-element,.cafe-pink .mat-fab.mat-primary .mat-ripple-element,.cafe-pink .mat-mini-fab.mat-primary .mat-ripple-element{background-color:rgba(0,0,0,0.1)}.cafe-pink .mat-flat-button.mat-accent .mat-ripple-element,.cafe-pink .mat-raised-button.mat-accent .mat-ripple-element,.cafe-pink .mat-fab.mat-accent .mat-ripple-element,.cafe-pink .mat-mini-fab.mat-accent .mat-ripple-element{background-color:rgba(0,0,0,0.1)}.cafe-pink .mat-flat-button.mat-warn .mat-ripple-element,.cafe-pink .mat-raised-button.mat-warn .mat-ripple-element,.cafe-pink .mat-fab.mat-warn .mat-ripple-element,.cafe-pink .mat-mini-fab.mat-warn .mat-ripple-element{background-color:rgba(255,255,255,0.1)}.cafe-pink .mat-icon-button.mat-primary .mat-ripple-element{background-color:rgba(236,64,122,0.2)}.cafe-pink .mat-icon-button.mat-accent .mat-ripple-element{background-color:rgba(128,203,196,0.2)}.cafe-pink .mat-icon-button.mat-warn .mat-ripple-element{background-color:rgba(244,67,54,0.2)}.cafe-pink .mat-button-toggle{color:rgba(0,0,0,0.38)}.cafe-pink .mat-button-toggle .mat-button-toggle-focus-overlay{background-color:rgba(0,0,0,0.12)}.cafe-pink .mat-button-toggle-checked{background-color:#e0e0e0;color:rgba(0,0,0,0.54)}.cafe-pink .mat-button-toggle-disabled{background-color:#eee;color:rgba(0,0,0,0.26)}.cafe-pink .mat-button-toggle-disabled.mat-button-toggle-checked{background-color:#bdbdbd}.cafe-pink .mat-card{background:#fff;color:rgba(0,0,0,0.87)}.cafe-pink .mat-card-subtitle{color:rgba(0,0,0,0.54)}.cafe-pink .mat-checkbox-frame{border-color:rgba(0,0,0,0.54)}.cafe-pink .mat-checkbox-checkmark{fill:#fafafa}.cafe-pink .mat-checkbox-checkmark-path{stroke:#fafafa !important}@media screen and (-ms-high-contrast: black-on-white){.cafe-pink .mat-checkbox-checkmark-path{stroke:#000 !important}}.cafe-pink .mat-checkbox-mixedmark{background-color:#fafafa}.cafe-pink .mat-checkbox-indeterminate.mat-primary .mat-checkbox-background,.cafe-pink .mat-checkbox-checked.mat-primary .mat-checkbox-background{background-color:#ec407a}.cafe-pink .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background,.cafe-pink .mat-checkbox-checked.mat-accent .mat-checkbox-background{background-color:#80cbc4}.cafe-pink .mat-checkbox-indeterminate.mat-warn .mat-checkbox-background,.cafe-pink .mat-checkbox-checked.mat-warn .mat-checkbox-background{background-color:#f44336}.cafe-pink .mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background,.cafe-pink .mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background{background-color:#b0b0b0}.cafe-pink .mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame{border-color:#b0b0b0}.cafe-pink .mat-checkbox-disabled .mat-checkbox-label{color:#b0b0b0}@media screen and (-ms-high-contrast: active){.cafe-pink .mat-checkbox-disabled{opacity:0.5}}@media screen and (-ms-high-contrast: active){.cafe-pink .mat-checkbox-background{background:none}}.cafe-pink .mat-checkbox:not(.mat-checkbox-disabled).mat-primary .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(236,64,122,0.26)}.cafe-pink .mat-checkbox:not(.mat-checkbox-disabled).mat-accent .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(128,203,196,0.26)}.cafe-pink .mat-checkbox:not(.mat-checkbox-disabled).mat-warn .mat-checkbox-ripple .mat-ripple-element{background-color:rgba(244,67,54,0.26)}.cafe-pink .mat-chip.mat-standard-chip{background-color:#e0e0e0;color:rgba(0,0,0,0.87)}.cafe-pink .mat-chip.mat-standard-chip .mat-chip-remove{color:rgba(0,0,0,0.87);opacity:0.4}.cafe-pink .mat-chip.mat-standard-chip .mat-chip-remove:hover{opacity:0.54}.cafe-pink .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary{background-color:#ec407a;color:rgba(0,0,0,0.87)}.cafe-pink .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove{color:rgba(0,0,0,0.87);opacity:0.4}.cafe-pink .mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove:hover{opacity:0.54}.cafe-pink .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn{background-color:#f44336;color:#fff}.cafe-pink .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove{color:#fff;opacity:0.4}.cafe-pink .mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove:hover{opacity:0.54}.cafe-pink .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent{background-color:#80cbc4;color:rgba(0,0,0,0.87)}.cafe-pink .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove{color:rgba(0,0,0,0.87);opacity:0.4}.cafe-pink .mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove:hover{opacity:0.54}.cafe-pink .mat-table{background:#fff}.cafe-pink .mat-table thead,.cafe-pink .mat-table tbody,.cafe-pink .mat-table tfoot,.cafe-pink mat-header-row,.cafe-pink mat-row,.cafe-pink mat-footer-row,.cafe-pink [mat-header-row],.cafe-pink [mat-row],.cafe-pink [mat-footer-row],.cafe-pink .mat-table-sticky{background:inherit}.cafe-pink mat-row,.cafe-pink mat-header-row,.cafe-pink mat-footer-row,.cafe-pink th.mat-header-cell,.cafe-pink td.mat-cell,.cafe-pink td.mat-footer-cell{border-bottom-color:rgba(0,0,0,0.12)}.cafe-pink .mat-header-cell{color:rgba(0,0,0,0.54)}.cafe-pink .mat-cell,.cafe-pink .mat-footer-cell{color:rgba(0,0,0,0.87)}.cafe-pink .mat-calendar-arrow{border-top-color:rgba(0,0,0,0.54)}.cafe-pink .mat-datepicker-toggle,.cafe-pink .mat-datepicker-content .mat-calendar-next-button,.cafe-pink .mat-datepicker-content .mat-calendar-previous-button{color:rgba(0,0,0,0.54)}.cafe-pink .mat-calendar-table-header{color:rgba(0,0,0,0.38)}.cafe-pink .mat-calendar-table-header-divider::after{background:rgba(0,0,0,0.12)}.cafe-pink .mat-calendar-body-label{color:rgba(0,0,0,0.54)}.cafe-pink .mat-calendar-body-cell-content{color:rgba(0,0,0,0.87);border-color:transparent}.cafe-pink .mat-calendar-body-disabled>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected){color:rgba(0,0,0,0.38)}.cafe-pink .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected),.cafe-pink .cdk-keyboard-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected),.cafe-pink .cdk-program-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected){background-color:rgba(0,0,0,0.04)}.cafe-pink .mat-calendar-body-today:not(.mat-calendar-body-selected){border-color:rgba(0,0,0,0.38)}.cafe-pink .mat-calendar-body-disabled>.mat-calendar-body-today:not(.mat-calendar-body-selected){border-color:rgba(0,0,0,0.18)}.cafe-pink .mat-calendar-body-selected{background-color:#ec407a;color:rgba(0,0,0,0.87)}.cafe-pink .mat-calendar-body-disabled>.mat-calendar-body-selected{background-color:rgba(236,64,122,0.4)}.cafe-pink .mat-calendar-body-today.mat-calendar-body-selected{box-shadow:inset 0 0 0 1px rgba(0,0,0,0.87)}.cafe-pink .mat-datepicker-content{background-color:#fff;color:rgba(0,0,0,0.87)}.cafe-pink .mat-datepicker-content.mat-accent .mat-calendar-body-selected{background-color:#80cbc4;color:rgba(0,0,0,0.87)}.cafe-pink .mat-datepicker-content.mat-accent .mat-calendar-body-disabled>.mat-calendar-body-selected{background-color:rgba(128,203,196,0.4)}.cafe-pink .mat-datepicker-content.mat-accent .mat-calendar-body-today.mat-calendar-body-selected{box-shadow:inset 0 0 0 1px rgba(0,0,0,0.87)}.cafe-pink .mat-datepicker-content.mat-warn .mat-calendar-body-selected{background-color:#f44336;color:#fff}.cafe-pink .mat-datepicker-content.mat-warn .mat-calendar-body-disabled>.mat-calendar-body-selected{background-color:rgba(244,67,54,0.4)}.cafe-pink .mat-datepicker-content.mat-warn .mat-calendar-body-today.mat-calendar-body-selected{box-shadow:inset 0 0 0 1px #fff}.cafe-pink .mat-datepicker-toggle-active{color:#ec407a}.cafe-pink .mat-datepicker-toggle-active.mat-accent{color:#80cbc4}.cafe-pink .mat-datepicker-toggle-active.mat-warn{color:#f44336}.cafe-pink .mat-dialog-container{background:#fff;color:rgba(0,0,0,0.87)}.cafe-pink .mat-divider{border-top-color:rgba(0,0,0,0.12)}.cafe-pink .mat-divider-vertical{border-right-color:rgba(0,0,0,0.12)}.cafe-pink .mat-expansion-panel{background:#fff;color:rgba(0,0,0,0.87)}.cafe-pink .mat-action-row{border-top-color:rgba(0,0,0,0.12)}.cafe-pink .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-keyboard-focused,.cafe-pink .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']).cdk-program-focused,.cafe-pink .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled='true']):hover{background:rgba(0,0,0,0.04)}@media (hover: none){.cafe-pink .mat-expansion-panel:not(.mat-expanded):not([aria-disabled='true']) .mat-expansion-panel-header:hover{background:#fff}}.cafe-pink .mat-expansion-panel-header-title{color:rgba(0,0,0,0.87)}.cafe-pink .mat-expansion-panel-header-description,.cafe-pink .mat-expansion-indicator::after{color:rgba(0,0,0,0.54)}.cafe-pink .mat-expansion-panel-header[aria-disabled='true']{color:rgba(0,0,0,0.26)}.cafe-pink .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-title,.cafe-pink .mat-expansion-panel-header[aria-disabled='true'] .mat-expansion-panel-header-description{color:inherit}.cafe-pink .mat-form-field-label{color:rgba(0,0,0,0.6)}.cafe-pink .mat-hint{color:rgba(0,0,0,0.6)}.cafe-pink .mat-form-field.mat-focused .mat-form-field-label{color:#ec407a}.cafe-pink .mat-form-field.mat-focused .mat-form-field-label.mat-accent{color:#80cbc4}.cafe-pink .mat-form-field.mat-focused .mat-form-field-label.mat-warn{color:#f44336}.cafe-pink .mat-focused .mat-form-field-required-marker{color:#80cbc4}.cafe-pink .mat-form-field-ripple{background-color:rgba(0,0,0,0.87)}.cafe-pink .mat-form-field.mat-focused .mat-form-field-ripple{background-color:#ec407a}.cafe-pink .mat-form-field.mat-focused .mat-form-field-ripple.mat-accent{background-color:#80cbc4}.cafe-pink .mat-form-field.mat-focused .mat-form-field-ripple.mat-warn{background-color:#f44336}.cafe-pink .mat-form-field.mat-form-field-invalid .mat-form-field-label{color:#f44336}.cafe-pink .mat-form-field.mat-form-field-invalid .mat-form-field-label.mat-accent,.cafe-pink .mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker{color:#f44336}.cafe-pink .mat-form-field.mat-form-field-invalid .mat-form-field-ripple,.cafe-pink .mat-form-field.mat-form-field-invalid .mat-form-field-ripple.mat-accent{background-color:#f44336}.cafe-pink .mat-error{color:#f44336}.cafe-pink .mat-form-field-appearance-legacy .mat-form-field-label{color:rgba(0,0,0,0.54)}.cafe-pink .mat-form-field-appearance-legacy .mat-hint{color:rgba(0,0,0,0.54)}.cafe-pink .mat-form-field-appearance-legacy .mat-form-field-underline{background-color:rgba(0,0,0,0.42)}.cafe-pink .mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline{background-image:-webkit-gradient(linear, left top, right top, from(rgba(0,0,0,0.42)), color-stop(33%, rgba(0,0,0,0.42)), color-stop(0%, transparent));background-image:linear-gradient(to right, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.42) 33%, transparent 0%);background-size:4px 100%;background-repeat:repeat-x}.cafe-pink .mat-form-field-appearance-standard .mat-form-field-underline{background-color:rgba(0,0,0,0.42)}.cafe-pink .mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline{background-image:-webkit-gradient(linear, left top, right top, from(rgba(0,0,0,0.42)), color-stop(33%, rgba(0,0,0,0.42)), color-stop(0%, transparent));background-image:linear-gradient(to right, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.42) 33%, transparent 0%);background-size:4px 100%;background-repeat:repeat-x}.cafe-pink .mat-form-field-appearance-fill .mat-form-field-flex{background-color:rgba(0,0,0,0.04)}.cafe-pink .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex{background-color:rgba(0,0,0,0.02)}.cafe-pink .mat-form-field-appearance-fill .mat-form-field-underline::before{background-color:rgba(0,0,0,0.42)}.cafe-pink .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-label{color:rgba(0,0,0,0.38)}.cafe-pink .mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-underline::before{background-color:transparent}.cafe-pink .mat-form-field-appearance-outline .mat-form-field-outline{color:rgba(0,0,0,0.12)}.cafe-pink .mat-form-field-appearance-outline .mat-form-field-outline-thick{color:rgba(0,0,0,0.87)}.cafe-pink .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick{color:#ec407a}.cafe-pink .mat-form-field-appearance-outline.mat-focused.mat-accent .mat-form-field-outline-thick{color:#80cbc4}.cafe-pink .mat-form-field-appearance-outline.mat-focused.mat-warn .mat-form-field-outline-thick{color:#f44336}.cafe-pink .mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick{color:#f44336}.cafe-pink .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-label{color:rgba(0,0,0,0.38)}.cafe-pink .mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline{color:rgba(0,0,0,0.06)}.cafe-pink .mat-icon.mat-primary{color:#ec407a}.cafe-pink .mat-icon.mat-accent{color:#80cbc4}.cafe-pink .mat-icon.mat-warn{color:#f44336}.cafe-pink .mat-input-element:disabled{color:rgba(0,0,0,0.38)}.cafe-pink .mat-input-element{caret-color:#ec407a}.cafe-pink .mat-input-element::-webkit-input-placeholder{color:rgba(0,0,0,0.42)}.cafe-pink .mat-input-element::-moz-placeholder{color:rgba(0,0,0,0.42)}.cafe-pink .mat-input-element::-ms-input-placeholder{color:rgba(0,0,0,0.42)}.cafe-pink .mat-input-element::placeholder{color:rgba(0,0,0,0.42)}.cafe-pink .mat-input-element::-moz-placeholder{color:rgba(0,0,0,0.42)}.cafe-pink .mat-input-element::-webkit-input-placeholder{color:rgba(0,0,0,0.42)}.cafe-pink .mat-input-element:-ms-input-placeholder{color:rgba(0,0,0,0.42)}.cafe-pink .mat-accent .mat-input-element{caret-color:#80cbc4}.cafe-pink .mat-warn .mat-input-element,.cafe-pink .mat-form-field-invalid .mat-input-element{caret-color:#f44336}.cafe-pink .mat-list .mat-list-item,.cafe-pink .mat-nav-list .mat-list-item,.cafe-pink .mat-selection-list .mat-list-item{color:rgba(0,0,0,0.87)}.cafe-pink .mat-list .mat-list-option,.cafe-pink .mat-nav-list .mat-list-option,.cafe-pink .mat-selection-list .mat-list-option{color:rgba(0,0,0,0.87)}.cafe-pink .mat-list .mat-subheader,.cafe-pink .mat-nav-list .mat-subheader,.cafe-pink .mat-selection-list .mat-subheader{color:rgba(0,0,0,0.54)}.cafe-pink .mat-list-item-disabled{background-color:#eee}.cafe-pink .mat-list-option:hover,.cafe-pink .mat-list-option.mat-list-item-focus,.cafe-pink .mat-nav-list .mat-list-item:hover,.cafe-pink .mat-nav-list .mat-list-item.mat-list-item-focus{background:rgba(0,0,0,0.04)}.cafe-pink .mat-menu-panel{background:#fff}.cafe-pink .mat-menu-item{background:transparent;color:rgba(0,0,0,0.87)}.cafe-pink .mat-menu-item[disabled],.cafe-pink .mat-menu-item[disabled]::after{color:rgba(0,0,0,0.38)}.cafe-pink .mat-menu-item .mat-icon:not([color]),.cafe-pink .mat-menu-item-submenu-trigger::after{color:rgba(0,0,0,0.54)}.cafe-pink .mat-menu-item:hover:not([disabled]),.cafe-pink .mat-menu-item.cdk-program-focused:not([disabled]),.cafe-pink .mat-menu-item.cdk-keyboard-focused:not([disabled]),.cafe-pink .mat-menu-item-highlighted:not([disabled]){background:rgba(0,0,0,0.04)}.cafe-pink .mat-paginator{background:#fff}.cafe-pink .mat-paginator,.cafe-pink .mat-paginator-page-size .mat-select-trigger{color:rgba(0,0,0,0.54)}.cafe-pink .mat-paginator-decrement,.cafe-pink .mat-paginator-increment{border-top:2px solid rgba(0,0,0,0.54);border-right:2px solid rgba(0,0,0,0.54)}.cafe-pink .mat-paginator-first,.cafe-pink .mat-paginator-last{border-top:2px solid rgba(0,0,0,0.54)}.cafe-pink .mat-icon-button[disabled] .mat-paginator-decrement,.cafe-pink .mat-icon-button[disabled] .mat-paginator-increment,.cafe-pink .mat-icon-button[disabled] .mat-paginator-first,.cafe-pink .mat-icon-button[disabled] .mat-paginator-last{border-color:rgba(0,0,0,0.38)}.cafe-pink .mat-progress-bar-background{fill:#f8bbd0}.cafe-pink .mat-progress-bar-buffer{background-color:#f8bbd0}.cafe-pink .mat-progress-bar-fill::after{background-color:#ec407a}.cafe-pink .mat-progress-bar.mat-accent .mat-progress-bar-background{fill:#b2dfdb}.cafe-pink .mat-progress-bar.mat-accent .mat-progress-bar-buffer{background-color:#b2dfdb}.cafe-pink .mat-progress-bar.mat-accent .mat-progress-bar-fill::after{background-color:#80cbc4}.cafe-pink .mat-progress-bar.mat-warn .mat-progress-bar-background{fill:#ffcdd2}.cafe-pink .mat-progress-bar.mat-warn .mat-progress-bar-buffer{background-color:#ffcdd2}.cafe-pink .mat-progress-bar.mat-warn .mat-progress-bar-fill::after{background-color:#f44336}.cafe-pink .mat-progress-spinner circle,.cafe-pink .mat-spinner circle{stroke:#ec407a}.cafe-pink .mat-progress-spinner.mat-accent circle,.cafe-pink .mat-spinner.mat-accent circle{stroke:#80cbc4}.cafe-pink .mat-progress-spinner.mat-warn circle,.cafe-pink .mat-spinner.mat-warn circle{stroke:#f44336}.cafe-pink .mat-radio-outer-circle{border-color:rgba(0,0,0,0.54)}.cafe-pink .mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle{border-color:#ec407a}.cafe-pink .mat-radio-button.mat-primary .mat-radio-inner-circle{background-color:#ec407a}.cafe-pink .mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element{background-color:rgba(236,64,122,0.26)}.cafe-pink .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle{border-color:#80cbc4}.cafe-pink .mat-radio-button.mat-accent .mat-radio-inner-circle{background-color:#80cbc4}.cafe-pink .mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element{background-color:rgba(128,203,196,0.26)}.cafe-pink .mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle{border-color:#f44336}.cafe-pink .mat-radio-button.mat-warn .mat-radio-inner-circle{background-color:#f44336}.cafe-pink .mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element{background-color:rgba(244,67,54,0.26)}.cafe-pink .mat-radio-button.mat-radio-disabled.mat-radio-checked .mat-radio-outer-circle,.cafe-pink .mat-radio-button.mat-radio-disabled .mat-radio-outer-circle{border-color:rgba(0,0,0,0.38)}.cafe-pink .mat-radio-button.mat-radio-disabled .mat-radio-ripple .mat-ripple-element,.cafe-pink .mat-radio-button.mat-radio-disabled .mat-radio-inner-circle{background-color:rgba(0,0,0,0.38)}.cafe-pink .mat-radio-button.mat-radio-disabled .mat-radio-label-content{color:rgba(0,0,0,0.38)}.cafe-pink .mat-select-content,.cafe-pink .mat-select-panel-done-animating{background:#fff}.cafe-pink .mat-select-value{color:rgba(0,0,0,0.87)}.cafe-pink .mat-select-placeholder{color:rgba(0,0,0,0.42)}.cafe-pink .mat-select-disabled .mat-select-value{color:rgba(0,0,0,0.38)}.cafe-pink .mat-select-arrow{color:rgba(0,0,0,0.54)}.cafe-pink .mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple){background:rgba(0,0,0,0.12)}.cafe-pink .mat-form-field.mat-focused.mat-primary .mat-select-arrow{color:#ec407a}.cafe-pink .mat-form-field.mat-focused.mat-accent .mat-select-arrow{color:#80cbc4}.cafe-pink .mat-form-field.mat-focused.mat-warn .mat-select-arrow{color:#f44336}.cafe-pink .mat-form-field .mat-select.mat-select-invalid .mat-select-arrow{color:#f44336}.cafe-pink .mat-form-field .mat-select.mat-select-disabled .mat-select-arrow{color:rgba(0,0,0,0.38)}.cafe-pink .mat-drawer-container{background-color:#fafafa;color:rgba(0,0,0,0.87)}.cafe-pink .mat-drawer{background-color:#fff;color:rgba(0,0,0,0.87)}.cafe-pink .mat-drawer.mat-drawer-push{background-color:#fff}.cafe-pink .mat-drawer-backdrop.mat-drawer-shown{background-color:rgba(0,0,0,0.6)}.cafe-pink .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#009688}.cafe-pink .mat-slide-toggle.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(0,150,136,0.5)}.cafe-pink .mat-slide-toggle:not(.mat-checked) .mat-ripple-element{background-color:rgba(0,0,0,0.06)}.cafe-pink .mat-slide-toggle .mat-ripple-element{background-color:rgba(0,150,136,0.12)}.cafe-pink .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#e91e63}.cafe-pink .mat-slide-toggle.mat-primary.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(233,30,99,0.5)}.cafe-pink .mat-slide-toggle.mat-primary:not(.mat-checked) .mat-ripple-element{background-color:rgba(0,0,0,0.06)}.cafe-pink .mat-slide-toggle.mat-primary .mat-ripple-element{background-color:rgba(233,30,99,0.12)}.cafe-pink .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-thumb{background-color:#f44336}.cafe-pink .mat-slide-toggle.mat-warn.mat-checked:not(.mat-disabled) .mat-slide-toggle-bar{background-color:rgba(244,67,54,0.5)}.cafe-pink .mat-slide-toggle.mat-warn:not(.mat-checked) .mat-ripple-element{background-color:rgba(0,0,0,0.06)}.cafe-pink .mat-slide-toggle.mat-warn .mat-ripple-element{background-color:rgba(244,67,54,0.12)}.cafe-pink .mat-disabled .mat-slide-toggle-thumb{background-color:#bdbdbd}.cafe-pink .mat-disabled .mat-slide-toggle-bar{background-color:rgba(0,0,0,0.1)}.cafe-pink .mat-slide-toggle-thumb{background-color:#fafafa}.cafe-pink .mat-slide-toggle-bar{background-color:rgba(0,0,0,0.38)}.cafe-pink .mat-slider-track-background{background-color:rgba(0,0,0,0.26)}.cafe-pink .mat-primary .mat-slider-track-fill,.cafe-pink .mat-primary .mat-slider-thumb,.cafe-pink .mat-primary .mat-slider-thumb-label{background-color:#ec407a}.cafe-pink .mat-primary .mat-slider-thumb-label-text{color:rgba(0,0,0,0.87)}.cafe-pink .mat-accent .mat-slider-track-fill,.cafe-pink .mat-accent .mat-slider-thumb,.cafe-pink .mat-accent .mat-slider-thumb-label{background-color:#80cbc4}.cafe-pink .mat-accent .mat-slider-thumb-label-text{color:rgba(0,0,0,0.87)}.cafe-pink .mat-warn .mat-slider-track-fill,.cafe-pink .mat-warn .mat-slider-thumb,.cafe-pink .mat-warn .mat-slider-thumb-label{background-color:#f44336}.cafe-pink .mat-warn .mat-slider-thumb-label-text{color:#fff}.cafe-pink .mat-slider-focus-ring{background-color:rgba(128,203,196,0.2)}.cafe-pink .mat-slider:hover .mat-slider-track-background,.cafe-pink .cdk-focused .mat-slider-track-background{background-color:rgba(0,0,0,0.38)}.cafe-pink .mat-slider-disabled .mat-slider-track-background,.cafe-pink .mat-slider-disabled .mat-slider-track-fill,.cafe-pink .mat-slider-disabled .mat-slider-thumb{background-color:rgba(0,0,0,0.26)}.cafe-pink .mat-slider-disabled:hover .mat-slider-track-background{background-color:rgba(0,0,0,0.26)}.cafe-pink .mat-slider-min-value .mat-slider-focus-ring{background-color:rgba(0,0,0,0.12)}.cafe-pink .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,.cafe-pink .mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label{background-color:rgba(0,0,0,0.87)}.cafe-pink .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,.cafe-pink .mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label{background-color:rgba(0,0,0,0.26)}.cafe-pink .mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb{border-color:rgba(0,0,0,0.26);background-color:transparent}.cafe-pink .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb,.cafe-pink .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb{border-color:rgba(0,0,0,0.38)}.cafe-pink .mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb,.cafe-pink .mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb{border-color:rgba(0,0,0,0.26)}.cafe-pink .mat-slider-has-ticks .mat-slider-wrapper::after{border-color:rgba(0,0,0,0.7)}.cafe-pink .mat-slider-horizontal .mat-slider-ticks{background-image:repeating-linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.7) 2px, transparent 0, transparent);background-image:-moz-repeating-linear-gradient(0.0001deg, rgba(0,0,0,0.7), rgba(0,0,0,0.7) 2px, transparent 0, transparent)}.cafe-pink .mat-slider-vertical .mat-slider-ticks{background-image:repeating-linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7) 2px, transparent 0, transparent)}.cafe-pink .mat-step-header.cdk-keyboard-focused,.cafe-pink .mat-step-header.cdk-program-focused,.cafe-pink .mat-step-header:hover{background-color:rgba(0,0,0,0.04)}.cafe-pink .mat-step-header .mat-step-label,.cafe-pink .mat-step-header .mat-step-optional{color:rgba(0,0,0,0.38)}.cafe-pink .mat-step-header .mat-step-icon{background-color:#ec407a;color:rgba(0,0,0,0.87)}.cafe-pink .mat-step-header .mat-step-icon-not-touched{background-color:rgba(0,0,0,0.38);color:rgba(0,0,0,0.87)}.cafe-pink .mat-step-header .mat-step-label.mat-step-label-active{color:rgba(0,0,0,0.87)}.cafe-pink .mat-stepper-horizontal,.cafe-pink .mat-stepper-vertical{background-color:#fff}.cafe-pink .mat-stepper-vertical-line::before{border-left-color:rgba(0,0,0,0.12)}.cafe-pink .mat-stepper-horizontal-line{border-top-color:rgba(0,0,0,0.12)}.cafe-pink .mat-sort-header-arrow{color:#757575}.cafe-pink .mat-tab-nav-bar,.cafe-pink .mat-tab-header{border-bottom:1px solid rgba(0,0,0,0.12)}.cafe-pink .mat-tab-group-inverted-header .mat-tab-nav-bar,.cafe-pink .mat-tab-group-inverted-header .mat-tab-header{border-top:1px solid rgba(0,0,0,0.12);border-bottom:none}.cafe-pink .mat-tab-label,.cafe-pink .mat-tab-link{color:rgba(0,0,0,0.87)}.cafe-pink .mat-tab-label.mat-tab-disabled,.cafe-pink .mat-tab-link.mat-tab-disabled{color:rgba(0,0,0,0.38)}.cafe-pink .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,0.87)}.cafe-pink .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,0.38)}.cafe-pink .mat-tab-group[class*='mat-background-'] .mat-tab-header,.cafe-pink .mat-tab-nav-bar[class*='mat-background-']{border-bottom:none;border-top:none}.cafe-pink .mat-tab-group.mat-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled){background-color:rgba(248,187,208,0.3)}.cafe-pink .mat-tab-group.mat-primary .mat-ink-bar,.cafe-pink .mat-tab-nav-bar.mat-primary .mat-ink-bar{background-color:#ec407a}.cafe-pink .mat-tab-group.mat-primary.mat-background-primary .mat-ink-bar,.cafe-pink .mat-tab-nav-bar.mat-primary.mat-background-primary .mat-ink-bar{background-color:rgba(0,0,0,0.87)}.cafe-pink .mat-tab-group.mat-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled){background-color:rgba(178,223,219,0.3)}.cafe-pink .mat-tab-group.mat-accent .mat-ink-bar,.cafe-pink .mat-tab-nav-bar.mat-accent .mat-ink-bar{background-color:#80cbc4}.cafe-pink .mat-tab-group.mat-accent.mat-background-accent .mat-ink-bar,.cafe-pink .mat-tab-nav-bar.mat-accent.mat-background-accent .mat-ink-bar{background-color:rgba(0,0,0,0.87)}.cafe-pink .mat-tab-group.mat-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled){background-color:rgba(255,205,210,0.3)}.cafe-pink .mat-tab-group.mat-warn .mat-ink-bar,.cafe-pink .mat-tab-nav-bar.mat-warn .mat-ink-bar{background-color:#f44336}.cafe-pink .mat-tab-group.mat-warn.mat-background-warn .mat-ink-bar,.cafe-pink .mat-tab-nav-bar.mat-warn.mat-background-warn .mat-ink-bar{background-color:#fff}.cafe-pink .mat-tab-group.mat-background-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-background-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-background-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-background-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled){background-color:rgba(248,187,208,0.3)}.cafe-pink .mat-tab-group.mat-background-primary .mat-tab-header,.cafe-pink .mat-tab-group.mat-background-primary .mat-tab-links,.cafe-pink .mat-tab-nav-bar.mat-background-primary .mat-tab-header,.cafe-pink .mat-tab-nav-bar.mat-background-primary .mat-tab-links{background-color:#ec407a}.cafe-pink .mat-tab-group.mat-background-primary .mat-tab-label,.cafe-pink .mat-tab-group.mat-background-primary .mat-tab-link,.cafe-pink .mat-tab-nav-bar.mat-background-primary .mat-tab-label,.cafe-pink .mat-tab-nav-bar.mat-background-primary .mat-tab-link{color:rgba(0,0,0,0.87)}.cafe-pink .mat-tab-group.mat-background-primary .mat-tab-label.mat-tab-disabled,.cafe-pink .mat-tab-group.mat-background-primary .mat-tab-link.mat-tab-disabled,.cafe-pink .mat-tab-nav-bar.mat-background-primary .mat-tab-label.mat-tab-disabled,.cafe-pink .mat-tab-nav-bar.mat-background-primary .mat-tab-link.mat-tab-disabled{color:rgba(0,0,0,0.4)}.cafe-pink .mat-tab-group.mat-background-primary .mat-tab-header-pagination-chevron,.cafe-pink .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,0.87)}.cafe-pink .mat-tab-group.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,.cafe-pink .mat-tab-nav-bar.mat-background-primary .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,0.4)}.cafe-pink .mat-tab-group.mat-background-primary .mat-ripple-element,.cafe-pink .mat-tab-nav-bar.mat-background-primary .mat-ripple-element{background-color:rgba(0,0,0,0.12)}.cafe-pink .mat-tab-group.mat-background-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-background-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-background-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-background-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled){background-color:rgba(178,223,219,0.3)}.cafe-pink .mat-tab-group.mat-background-accent .mat-tab-header,.cafe-pink .mat-tab-group.mat-background-accent .mat-tab-links,.cafe-pink .mat-tab-nav-bar.mat-background-accent .mat-tab-header,.cafe-pink .mat-tab-nav-bar.mat-background-accent .mat-tab-links{background-color:#80cbc4}.cafe-pink .mat-tab-group.mat-background-accent .mat-tab-label,.cafe-pink .mat-tab-group.mat-background-accent .mat-tab-link,.cafe-pink .mat-tab-nav-bar.mat-background-accent .mat-tab-label,.cafe-pink .mat-tab-nav-bar.mat-background-accent .mat-tab-link{color:rgba(0,0,0,0.87)}.cafe-pink .mat-tab-group.mat-background-accent .mat-tab-label.mat-tab-disabled,.cafe-pink .mat-tab-group.mat-background-accent .mat-tab-link.mat-tab-disabled,.cafe-pink .mat-tab-nav-bar.mat-background-accent .mat-tab-label.mat-tab-disabled,.cafe-pink .mat-tab-nav-bar.mat-background-accent .mat-tab-link.mat-tab-disabled{color:rgba(0,0,0,0.4)}.cafe-pink .mat-tab-group.mat-background-accent .mat-tab-header-pagination-chevron,.cafe-pink .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,0.87)}.cafe-pink .mat-tab-group.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,.cafe-pink .mat-tab-nav-bar.mat-background-accent .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(0,0,0,0.4)}.cafe-pink .mat-tab-group.mat-background-accent .mat-ripple-element,.cafe-pink .mat-tab-nav-bar.mat-background-accent .mat-ripple-element{background-color:rgba(0,0,0,0.12)}.cafe-pink .mat-tab-group.mat-background-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-background-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-background-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-group.mat-background-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),.cafe-pink .mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled){background-color:rgba(255,205,210,0.3)}.cafe-pink .mat-tab-group.mat-background-warn .mat-tab-header,.cafe-pink .mat-tab-group.mat-background-warn .mat-tab-links,.cafe-pink .mat-tab-nav-bar.mat-background-warn .mat-tab-header,.cafe-pink .mat-tab-nav-bar.mat-background-warn .mat-tab-links{background-color:#f44336}.cafe-pink .mat-tab-group.mat-background-warn .mat-tab-label,.cafe-pink .mat-tab-group.mat-background-warn .mat-tab-link,.cafe-pink .mat-tab-nav-bar.mat-background-warn .mat-tab-label,.cafe-pink .mat-tab-nav-bar.mat-background-warn .mat-tab-link{color:#fff}.cafe-pink .mat-tab-group.mat-background-warn .mat-tab-label.mat-tab-disabled,.cafe-pink .mat-tab-group.mat-background-warn .mat-tab-link.mat-tab-disabled,.cafe-pink .mat-tab-nav-bar.mat-background-warn .mat-tab-label.mat-tab-disabled,.cafe-pink .mat-tab-nav-bar.mat-background-warn .mat-tab-link.mat-tab-disabled{color:rgba(255,255,255,0.4)}.cafe-pink .mat-tab-group.mat-background-warn .mat-tab-header-pagination-chevron,.cafe-pink .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-chevron{border-color:#fff}.cafe-pink .mat-tab-group.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,.cafe-pink .mat-tab-nav-bar.mat-background-warn .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron{border-color:rgba(255,255,255,0.4)}.cafe-pink .mat-tab-group.mat-background-warn .mat-ripple-element,.cafe-pink .mat-tab-nav-bar.mat-background-warn .mat-ripple-element{background-color:rgba(255,255,255,0.12)}.cafe-pink .mat-toolbar{background:#f5f5f5;color:rgba(0,0,0,0.87)}.cafe-pink .mat-toolbar.mat-primary{background:#ec407a;color:rgba(0,0,0,0.87)}.cafe-pink .mat-toolbar.mat-accent{background:#80cbc4;color:rgba(0,0,0,0.87)}.cafe-pink .mat-toolbar.mat-warn{background:#f44336;color:#fff}.cafe-pink .mat-toolbar .mat-form-field-underline,.cafe-pink .mat-toolbar .mat-form-field-ripple,.cafe-pink .mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.cafe-pink .mat-toolbar .mat-form-field-label,.cafe-pink .mat-toolbar .mat-focused .mat-form-field-label,.cafe-pink .mat-toolbar .mat-select-value,.cafe-pink .mat-toolbar .mat-select-arrow,.cafe-pink .mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.cafe-pink .mat-toolbar .mat-input-element{caret-color:currentColor}.cafe-pink .mat-tooltip{background:rgba(97,97,97,0.9)}.cafe-pink .mat-tree{background:#fff}.cafe-pink .mat-tree-node{color:rgba(0,0,0,0.87)}.cafe-pink .mat-snack-bar-container{background:#323232;color:#fff}.cafe-pink .mat-simple-snackbar-action{color:#80cbc4}.login{margin-top:50px}.login .login-container{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.login .login-container>*{width:100%}.actions{padding:15px !important}.actions button{margin-right:10px;color:#fff}.actions .gsignin-btn{color:#0e0e0e;margin:20px 0 0 0}.spinner{z-index:9;margin-top:10px;margin-left:7px;position:absolute}.error-msg{color:#f48fb1;text-align:center;font-size:16px}\n"

/***/ }),

/***/ "./src/app/auth/auth.module.ts":
/*!*************************************!*\
  !*** ./src/app/auth/auth.module.ts ***!
  \*************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "./src/app/auth/login/login.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./register/register.component */ "./src/app/auth/register/register.component.ts");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _token_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./token.storage */ "./src/app/auth/token.storage.ts");
/* harmony import */ var _auth_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./auth-routing.module */ "./src/app/auth/auth-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
                _auth_routing_module__WEBPACK_IMPORTED_MODULE_7__["AuthRoutingModule"],
            ],
            declarations: [
                _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"],
                _register_register_component__WEBPACK_IMPORTED_MODULE_4__["RegisterComponent"]
            ],
            providers: [
                _auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
                _token_storage__WEBPACK_IMPORTED_MODULE_6__["TokenStorage"]
            ]
        })
    ], AuthModule);
    return AuthModule;
}());



/***/ }),

/***/ "./src/app/auth/auth.service.ts":
/*!**************************************!*\
  !*** ./src/app/auth/auth.service.ts ***!
  \**************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var _token_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./token.storage */ "./src/app/auth/token.storage.ts");
/* harmony import */ var _env_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @env/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var AuthService = /** @class */ (function () {
    function AuthService(http, token, socialAuthService) {
        this.http = http;
        this.token = token;
        this.socialAuthService = socialAuthService;
        this.$userSource = new rxjs_Subject__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
    }
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        return rxjs_Observable__WEBPACK_IMPORTED_MODULE_2__["Observable"].create(function (observer) {
            _this.http.post(_env_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].endPoint + 'auth/login', {
                email: email,
                password: password
            }).subscribe(function (data) {
                observer.next({ user: data.user });
                _this.setUser(data.user);
                _this.token.saveToken(data.token);
                observer.complete();
            }, function (error) {
                if (error.status === 401) {
                    return observer.next(error);
                }
            });
        });
    };
    AuthService.prototype.register = function (fullname, email, password, repeatPassword) {
        var _this = this;
        return rxjs_Observable__WEBPACK_IMPORTED_MODULE_2__["Observable"].create(function (observer) {
            _this.http.post(_env_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].endPoint + 'auth/register', {
                fullname: fullname,
                email: email,
                password: password,
                repeatPassword: repeatPassword
            }).subscribe(function (data) {
                observer.next({ user: data.user });
                _this.setUser(data.user);
                _this.token.saveToken(data.token);
                observer.complete();
            });
        });
    };
    AuthService.prototype.setUser = function (user) {
        if (user) {
            user.isAdmin = (user.roles.indexOf('admin') > -1);
        }
        this.$userSource.next(user);
        window.user = user;
    };
    AuthService.prototype.getUser = function () {
        return this.$userSource.asObservable();
    };
    AuthService.prototype.me = function () {
        var _this = this;
        return rxjs_Observable__WEBPACK_IMPORTED_MODULE_2__["Observable"].create(function (observer) {
            var tokenVal = _this.token.getToken();
            if (!tokenVal) {
                return observer.complete();
            }
            _this.http.get(_env_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].endPoint + 'auth/me').subscribe(function (data) {
                observer.next({ user: data.user });
                _this.setUser(data.user);
                observer.complete();
            });
        });
    };
    AuthService.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.token.signOut();
                this.setUser(null);
                delete window.user;
                this.socialAuthService.authState.subscribe(function (user) {
                    if (user) {
                        _this.socialAuthService.signOut();
                    }
                });
                return [2 /*return*/, true];
            });
        });
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _token_storage__WEBPACK_IMPORTED_MODULE_5__["TokenStorage"],
            angularx_social_login__WEBPACK_IMPORTED_MODULE_4__["AuthService"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/auth/login/login.component.html":
/*!*************************************************!*\
  !*** ./src/app/auth/login/login.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div fxLayout=\"row\" fxLayoutAlign=\"center\" class=\"login\">\r\n  <div fxFlex=\"40%\" fxFlex.xs=\"90%\" fxFlex.sm=\"70%\">\r\n    <mat-toolbar color=\"primary\">\r\n        <span>Login</span>\r\n    </mat-toolbar>\r\n    <mat-card>\r\n      <mat-card-content>\r\n        <form (ngSubmit)=\"login()\" fxLayout=\"row\" fxLayoutAlign=\"center\">\r\n          <div fxFlex=\"80%\" class=\"login-container\">\r\n            <mat-form-field appearance=\"legacy\">\r\n              <input matInput placeholder=\"Email\" [(ngModel)]=\"email\" name=\"email\" required>\r\n            </mat-form-field>\r\n            <mat-form-field>\r\n              <input matInput placeholder=\"Password\" [(ngModel)]=\"password\" type=\"password\" name=\"password\" required>\r\n            </mat-form-field>\r\n\r\n            <mat-card-actions class=\"actions\">\r\n              <mat-spinner [diameter]=\"15\" *ngIf=\"processing\" class=\"spinner\"></mat-spinner>\r\n              <button mat-raised-button [disabled]=\"processing\"  color=\"accent\">\r\n                Submit\r\n              </button>\r\n              <span>Don't have an account ? <a [routerLink]=\"['/auth/register']\" >register</a> here</span>\r\n\r\n              <button mat-raised-button (click)=\"signInWithGoogle()\" class=\"gsignin-btn\">\r\n                <span class=\"icon icon-google\"></span>Signin With Google\r\n              </button>\r\n            </mat-card-actions>\r\n            \r\n            <span class=\"error-msg\" *ngIf=\"errorMsg\">{{errorMsg}}</span>\r\n            \r\n          </div>\r\n        </form>\r\n      </mat-card-content>\r\n      \r\n    </mat-card>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/auth/login/login.component.ts":
/*!***********************************************!*\
  !*** ./src/app/auth/login/login.component.ts ***!
  \***********************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var _auth_guard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth-guard.service */ "./src/app/auth/auth-guard.service.ts");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var _token_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../token.storage */ "./src/app/auth/token.storage.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, router, authGuard, socialAuthService, authToken) {
        this.authService = authService;
        this.router = router;
        this.authGuard = authGuard;
        this.socialAuthService = socialAuthService;
        this.authToken = authToken;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.authGuard.canActivate()) {
            this.router.navigate(['/dashboard']);
        }
        this.socialAuthService.authState.subscribe(function (user) {
            if (user) {
                console.log(user);
                var newUser = {
                    email: user.email,
                    fullname: user.name,
                    roles: []
                };
                _this.authService.setUser(newUser);
                _this.authToken.saveToken(user.idToken);
                _this.router.navigate(['/dashboard']);
            }
        });
    };
    LoginComponent.prototype.signInWithGoogle = function () {
        this.socialAuthService.signIn(angularx_social_login__WEBPACK_IMPORTED_MODULE_6__["GoogleLoginProvider"].PROVIDER_ID);
    };
    LoginComponent.prototype.signInWithFB = function () {
        this.socialAuthService.signIn(angularx_social_login__WEBPACK_IMPORTED_MODULE_6__["FacebookLoginProvider"].PROVIDER_ID);
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.errorMsg = null;
        this.processing = true;
        var loginSubscription;
        loginSubscription = this.authService.login(this.email, this.password);
        loginSubscription.subscribe(function (data) {
            if (data instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpErrorResponse"]) {
                _this.errorMsg = 'Invalid email or password';
            }
            else {
                _this.router.navigate(['/dashboard']);
            }
            _this.processing = false;
        }, function (error) {
            _this.errorMsg = error;
        }, function () {
            _this.processing = false;
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/auth/login/login.component.html"),
            styles: [__webpack_require__(/*! ../auth.component.scss */ "./src/app/auth/auth.component.scss")]
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"], angularx_social_login__WEBPACK_IMPORTED_MODULE_6__["AuthService"],
            _token_storage__WEBPACK_IMPORTED_MODULE_7__["TokenStorage"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/auth/register/register.component.html":
/*!*******************************************************!*\
  !*** ./src/app/auth/register/register.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxLayoutAlign=\"center\" class=\"login\">\r\n  <div fxFlex=\"40%\" fxFlex.xs=\"90%\" fxFlex.sm=\"70%\">\r\n    <mat-toolbar color=\"primary\">\r\n      <span>Register</span>\r\n    </mat-toolbar>\r\n    <mat-card class=\"example-card\">\r\n      <mat-card-content>\r\n        <form class=\"example-form\">\r\n          <table cellspacing=\"0\" [formGroup]=\"userForm\">\r\n            <tr>\r\n              <td>\r\n                <mat-form-field>\r\n                  <input matInput placeholder=\"Fullname\" formControlName=\"fullname\" name=\"fullname\" required>\r\n                </mat-form-field>\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <td>\r\n                <mat-form-field>\r\n                  <input matInput placeholder=\"Email\" formControlName=\"email\" name=\"email\" required>\r\n                  <mat-error *ngIf=\"email.invalid && email.errors.email\">Invalid email address</mat-error>\r\n                </mat-form-field>\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <td>\r\n                <mat-form-field>\r\n                  <input matInput placeholder=\"Password\" formControlName=\"password\" type=\"password\" name=\"password\" required>\r\n                </mat-form-field>\r\n              </td>\r\n            </tr>\r\n            <tr>\r\n              <td>\r\n                <mat-form-field>\r\n                  <input matInput placeholder=\"Reapet Password\" formControlName=\"repeatPassword\" type=\"password\" name=\"repeatPassword\" required>\r\n                  <mat-error *ngIf=\"repeatPassword.invalid && repeatPassword.errors.passwordMatch\">Password mismatch</mat-error>\r\n                </mat-form-field>\r\n              </td>\r\n            </tr>\r\n          </table>\r\n        </form>\r\n      </mat-card-content>\r\n      <mat-card-actions class=\"actions\">\r\n        <button mat-raised-button (click)=\"register()\" color=\"accent\">Register</button>\r\n        <span>Already have an account ? <a [routerLink]=\"['/auth/login']\">login</a> here</span>\r\n      </mat-card-actions>\r\n    </mat-card>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/auth/register/register.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/auth/register/register.component.ts ***!
  \*****************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth.service */ "./src/app/auth/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.userForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            fullname: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].email]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]),
            repeatPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, this.passwordsMatchValidator])
        });
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.passwordsMatchValidator = function (control) {
        var password = control.root.get('password');
        return password && control.value !== password.value ? {
            passwordMatch: true
        } : null;
    };
    Object.defineProperty(RegisterComponent.prototype, "fullname", {
        get: function () { return this.userForm.get('fullname'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "email", {
        get: function () { return this.userForm.get('email'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "password", {
        get: function () { return this.userForm.get('password'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "repeatPassword", {
        get: function () { return this.userForm.get('repeatPassword'); },
        enumerable: true,
        configurable: true
    });
    RegisterComponent.prototype.register = function () {
        var _this = this;
        if (!this.userForm.valid)
            return;
        var _a = this.userForm.getRawValue(), fullname = _a.fullname, email = _a.email, password = _a.password, repeatPassword = _a.repeatPassword;
        this.authService.register(fullname, email, password, repeatPassword)
            .subscribe(function (data) {
            _this.router.navigate(['']);
        });
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/auth/register/register.component.html"),
            styles: [__webpack_require__(/*! ../auth.component.scss */ "./src/app/auth/auth.component.scss")]
        }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ })

}]);
//# sourceMappingURL=app-auth-auth-module.js.map