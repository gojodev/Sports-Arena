(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/fuse.js/dist/fuse.cjs
  var require_fuse = __commonJS({
    "node_modules/fuse.js/dist/fuse.cjs"(exports, module) {
      "use strict";
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          })), keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _objectSpread2(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = null != arguments[i] ? arguments[i] : {};
          i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
        return target;
      }
      function _typeof(obj) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
          return typeof obj2;
        } : function(obj2) {
          return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        }, _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }
      function _defineProperty(obj, key, value) {
        key = _toPropertyKey(key);
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        Object.defineProperty(subClass, "prototype", {
          writable: false
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
      }
      function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
          return o2.__proto__ || Object.getPrototypeOf(o2);
        };
        return _getPrototypeOf(o);
      }
      function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
          o2.__proto__ = p2;
          return o2;
        };
        return _setPrototypeOf(o, p);
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct) return false;
        if (Reflect.construct.sham) return false;
        if (typeof Proxy === "function") return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e) {
          return false;
        }
      }
      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
      }
      function _possibleConstructorReturn(self, call) {
        if (call && (typeof call === "object" || typeof call === "function")) {
          return call;
        } else if (call !== void 0) {
          throw new TypeError("Derived constructors may only return object or undefined");
        }
        return _assertThisInitialized(self);
      }
      function _createSuper(Derived) {
        var hasNativeReflectConstruct = _isNativeReflectConstruct();
        return function _createSuperInternal() {
          var Super = _getPrototypeOf(Derived), result;
          if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
      }
      function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (typeof res !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
      }
      function isArray(value) {
        return !Array.isArray ? getTag(value) === "[object Array]" : Array.isArray(value);
      }
      var INFINITY = 1 / 0;
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      function isString(value) {
        return typeof value === "string";
      }
      function isNumber(value) {
        return typeof value === "number";
      }
      function isBoolean(value) {
        return value === true || value === false || isObjectLike(value) && getTag(value) == "[object Boolean]";
      }
      function isObject(value) {
        return _typeof(value) === "object";
      }
      function isObjectLike(value) {
        return isObject(value) && value !== null;
      }
      function isDefined(value) {
        return value !== void 0 && value !== null;
      }
      function isBlank(value) {
        return !value.trim().length;
      }
      function getTag(value) {
        return value == null ? value === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
      }
      var INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
      var LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = function LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY2(key) {
        return "Invalid value for key ".concat(key);
      };
      var PATTERN_LENGTH_TOO_LARGE = function PATTERN_LENGTH_TOO_LARGE2(max) {
        return "Pattern length exceeds max of ".concat(max, ".");
      };
      var MISSING_KEY_PROPERTY = function MISSING_KEY_PROPERTY2(name) {
        return "Missing ".concat(name, " property in key");
      };
      var INVALID_KEY_WEIGHT_VALUE = function INVALID_KEY_WEIGHT_VALUE2(key) {
        return "Property 'weight' in key '".concat(key, "' must be a positive integer");
      };
      var hasOwn = Object.prototype.hasOwnProperty;
      var KeyStore = /* @__PURE__ */ function() {
        function KeyStore2(keys) {
          var _this = this;
          _classCallCheck(this, KeyStore2);
          this._keys = [];
          this._keyMap = {};
          var totalWeight = 0;
          keys.forEach(function(key) {
            var obj = createKey(key);
            _this._keys.push(obj);
            _this._keyMap[obj.id] = obj;
            totalWeight += obj.weight;
          });
          this._keys.forEach(function(key) {
            key.weight /= totalWeight;
          });
        }
        _createClass(KeyStore2, [{
          key: "get",
          value: function get2(keyId) {
            return this._keyMap[keyId];
          }
        }, {
          key: "keys",
          value: function keys() {
            return this._keys;
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            return JSON.stringify(this._keys);
          }
        }]);
        return KeyStore2;
      }();
      function createKey(key) {
        var path = null;
        var id = null;
        var src = null;
        var weight = 1;
        var getFn = null;
        if (isString(key) || isArray(key)) {
          src = key;
          path = createKeyPath(key);
          id = createKeyId(key);
        } else {
          if (!hasOwn.call(key, "name")) {
            throw new Error(MISSING_KEY_PROPERTY("name"));
          }
          var name = key.name;
          src = name;
          if (hasOwn.call(key, "weight")) {
            weight = key.weight;
            if (weight <= 0) {
              throw new Error(INVALID_KEY_WEIGHT_VALUE(name));
            }
          }
          path = createKeyPath(name);
          id = createKeyId(name);
          getFn = key.getFn;
        }
        return {
          path,
          id,
          weight,
          src,
          getFn
        };
      }
      function createKeyPath(key) {
        return isArray(key) ? key : key.split(".");
      }
      function createKeyId(key) {
        return isArray(key) ? key.join(".") : key;
      }
      function get(obj, path) {
        var list = [];
        var arr = false;
        var deepGet = function deepGet2(obj2, path2, index) {
          if (!isDefined(obj2)) {
            return;
          }
          if (!path2[index]) {
            list.push(obj2);
          } else {
            var key = path2[index];
            var value = obj2[key];
            if (!isDefined(value)) {
              return;
            }
            if (index === path2.length - 1 && (isString(value) || isNumber(value) || isBoolean(value))) {
              list.push(toString(value));
            } else if (isArray(value)) {
              arr = true;
              for (var i = 0, len = value.length; i < len; i += 1) {
                deepGet2(value[i], path2, index + 1);
              }
            } else if (path2.length) {
              deepGet2(value, path2, index + 1);
            }
          }
        };
        deepGet(obj, isString(path) ? path.split(".") : path, 0);
        return arr ? list : list[0];
      }
      var MatchOptions = {
        // Whether the matches should be included in the result set. When `true`, each record in the result
        // set will include the indices of the matched characters.
        // These can consequently be used for highlighting purposes.
        includeMatches: false,
        // When `true`, the matching function will continue to the end of a search pattern even if
        // a perfect match has already been located in the string.
        findAllMatches: false,
        // Minimum number of characters that must be matched before a result is considered a match
        minMatchCharLength: 1
      };
      var BasicOptions = {
        // When `true`, the algorithm continues searching to the end of the input even if a perfect
        // match is found before the end of the same input.
        isCaseSensitive: false,
        // When true, the matching function will continue to the end of a search pattern even if
        includeScore: false,
        // List of properties that will be searched. This also supports nested properties.
        keys: [],
        // Whether to sort the result list, by score
        shouldSort: true,
        // Default sort function: sort by ascending score, ascending index
        sortFn: function sortFn(a, b) {
          return a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1;
        }
      };
      var FuzzyOptions = {
        // Approximately where in the text is the pattern expected to be found?
        location: 0,
        // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
        // (of both letters and location), a threshold of '1.0' would match anything.
        threshold: 0.6,
        // Determines how close the match must be to the fuzzy location (specified above).
        // An exact letter match which is 'distance' characters away from the fuzzy location
        // would score as a complete mismatch. A distance of '0' requires the match be at
        // the exact location specified, a threshold of '1000' would require a perfect match
        // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
        distance: 100
      };
      var AdvancedOptions = {
        // When `true`, it enables the use of unix-like search commands
        useExtendedSearch: false,
        // The get function to use when fetching an object's properties.
        // The default will search nested paths *ie foo.bar.baz*
        getFn: get,
        // When `true`, search will ignore `location` and `distance`, so it won't matter
        // where in the string the pattern appears.
        // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
        ignoreLocation: false,
        // When `true`, the calculation for the relevance score (used for sorting) will
        // ignore the field-length norm.
        // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
        ignoreFieldNorm: false,
        // The weight to determine how much field length norm effects scoring.
        fieldNormWeight: 1
      };
      var Config = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, BasicOptions), MatchOptions), FuzzyOptions), AdvancedOptions);
      var SPACE = /[^ ]+/g;
      function norm() {
        var weight = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
        var mantissa = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3;
        var cache = /* @__PURE__ */ new Map();
        var m = Math.pow(10, mantissa);
        return {
          get: function get2(value) {
            var numTokens = value.match(SPACE).length;
            if (cache.has(numTokens)) {
              return cache.get(numTokens);
            }
            var norm2 = 1 / Math.pow(numTokens, 0.5 * weight);
            var n = parseFloat(Math.round(norm2 * m) / m);
            cache.set(numTokens, n);
            return n;
          },
          clear: function clear() {
            cache.clear();
          }
        };
      }
      var FuseIndex = /* @__PURE__ */ function() {
        function FuseIndex2() {
          var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref$getFn = _ref.getFn, getFn = _ref$getFn === void 0 ? Config.getFn : _ref$getFn, _ref$fieldNormWeight = _ref.fieldNormWeight, fieldNormWeight = _ref$fieldNormWeight === void 0 ? Config.fieldNormWeight : _ref$fieldNormWeight;
          _classCallCheck(this, FuseIndex2);
          this.norm = norm(fieldNormWeight, 3);
          this.getFn = getFn;
          this.isCreated = false;
          this.setIndexRecords();
        }
        _createClass(FuseIndex2, [{
          key: "setSources",
          value: function setSources() {
            var docs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
            this.docs = docs;
          }
        }, {
          key: "setIndexRecords",
          value: function setIndexRecords() {
            var records = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
            this.records = records;
          }
        }, {
          key: "setKeys",
          value: function setKeys() {
            var _this = this;
            var keys = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
            this.keys = keys;
            this._keysMap = {};
            keys.forEach(function(key, idx) {
              _this._keysMap[key.id] = idx;
            });
          }
        }, {
          key: "create",
          value: function create() {
            var _this2 = this;
            if (this.isCreated || !this.docs.length) {
              return;
            }
            this.isCreated = true;
            if (isString(this.docs[0])) {
              this.docs.forEach(function(doc, docIndex) {
                _this2._addString(doc, docIndex);
              });
            } else {
              this.docs.forEach(function(doc, docIndex) {
                _this2._addObject(doc, docIndex);
              });
            }
            this.norm.clear();
          }
          // Adds a doc to the end of the index
        }, {
          key: "add",
          value: function add(doc) {
            var idx = this.size();
            if (isString(doc)) {
              this._addString(doc, idx);
            } else {
              this._addObject(doc, idx);
            }
          }
          // Removes the doc at the specified index of the index
        }, {
          key: "removeAt",
          value: function removeAt(idx) {
            this.records.splice(idx, 1);
            for (var i = idx, len = this.size(); i < len; i += 1) {
              this.records[i].i -= 1;
            }
          }
        }, {
          key: "getValueForItemAtKeyId",
          value: function getValueForItemAtKeyId(item, keyId) {
            return item[this._keysMap[keyId]];
          }
        }, {
          key: "size",
          value: function size() {
            return this.records.length;
          }
        }, {
          key: "_addString",
          value: function _addString(doc, docIndex) {
            if (!isDefined(doc) || isBlank(doc)) {
              return;
            }
            var record = {
              v: doc,
              i: docIndex,
              n: this.norm.get(doc)
            };
            this.records.push(record);
          }
        }, {
          key: "_addObject",
          value: function _addObject(doc, docIndex) {
            var _this3 = this;
            var record = {
              i: docIndex,
              $: {}
            };
            this.keys.forEach(function(key, keyIndex) {
              var value = key.getFn ? key.getFn(doc) : _this3.getFn(doc, key.path);
              if (!isDefined(value)) {
                return;
              }
              if (isArray(value)) {
                var subRecords = [];
                var stack = [{
                  nestedArrIndex: -1,
                  value
                }];
                while (stack.length) {
                  var _stack$pop = stack.pop(), nestedArrIndex = _stack$pop.nestedArrIndex, _value = _stack$pop.value;
                  if (!isDefined(_value)) {
                    continue;
                  }
                  if (isString(_value) && !isBlank(_value)) {
                    var subRecord = {
                      v: _value,
                      i: nestedArrIndex,
                      n: _this3.norm.get(_value)
                    };
                    subRecords.push(subRecord);
                  } else if (isArray(_value)) {
                    _value.forEach(function(item, k) {
                      stack.push({
                        nestedArrIndex: k,
                        value: item
                      });
                    });
                  } else ;
                }
                record.$[keyIndex] = subRecords;
              } else if (isString(value) && !isBlank(value)) {
                var _subRecord = {
                  v: value,
                  n: _this3.norm.get(value)
                };
                record.$[keyIndex] = _subRecord;
              }
            });
            this.records.push(record);
          }
        }, {
          key: "toJSON",
          value: function toJSON() {
            return {
              keys: this.keys,
              records: this.records
            };
          }
        }]);
        return FuseIndex2;
      }();
      function createIndex(keys, docs) {
        var _ref2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, _ref2$getFn = _ref2.getFn, getFn = _ref2$getFn === void 0 ? Config.getFn : _ref2$getFn, _ref2$fieldNormWeight = _ref2.fieldNormWeight, fieldNormWeight = _ref2$fieldNormWeight === void 0 ? Config.fieldNormWeight : _ref2$fieldNormWeight;
        var myIndex = new FuseIndex({
          getFn,
          fieldNormWeight
        });
        myIndex.setKeys(keys.map(createKey));
        myIndex.setSources(docs);
        myIndex.create();
        return myIndex;
      }
      function parseIndex(data) {
        var _ref3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref3$getFn = _ref3.getFn, getFn = _ref3$getFn === void 0 ? Config.getFn : _ref3$getFn, _ref3$fieldNormWeight = _ref3.fieldNormWeight, fieldNormWeight = _ref3$fieldNormWeight === void 0 ? Config.fieldNormWeight : _ref3$fieldNormWeight;
        var keys = data.keys, records = data.records;
        var myIndex = new FuseIndex({
          getFn,
          fieldNormWeight
        });
        myIndex.setKeys(keys);
        myIndex.setIndexRecords(records);
        return myIndex;
      }
      function computeScore$1(pattern) {
        var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$errors = _ref.errors, errors = _ref$errors === void 0 ? 0 : _ref$errors, _ref$currentLocation = _ref.currentLocation, currentLocation = _ref$currentLocation === void 0 ? 0 : _ref$currentLocation, _ref$expectedLocation = _ref.expectedLocation, expectedLocation = _ref$expectedLocation === void 0 ? 0 : _ref$expectedLocation, _ref$distance = _ref.distance, distance = _ref$distance === void 0 ? Config.distance : _ref$distance, _ref$ignoreLocation = _ref.ignoreLocation, ignoreLocation = _ref$ignoreLocation === void 0 ? Config.ignoreLocation : _ref$ignoreLocation;
        var accuracy = errors / pattern.length;
        if (ignoreLocation) {
          return accuracy;
        }
        var proximity = Math.abs(expectedLocation - currentLocation);
        if (!distance) {
          return proximity ? 1 : accuracy;
        }
        return accuracy + proximity / distance;
      }
      function convertMaskToIndices() {
        var matchmask = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        var minMatchCharLength = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Config.minMatchCharLength;
        var indices = [];
        var start = -1;
        var end = -1;
        var i = 0;
        for (var len = matchmask.length; i < len; i += 1) {
          var match = matchmask[i];
          if (match && start === -1) {
            start = i;
          } else if (!match && start !== -1) {
            end = i - 1;
            if (end - start + 1 >= minMatchCharLength) {
              indices.push([start, end]);
            }
            start = -1;
          }
        }
        if (matchmask[i - 1] && i - start >= minMatchCharLength) {
          indices.push([start, i - 1]);
        }
        return indices;
      }
      var MAX_BITS = 32;
      function search(text, pattern, patternAlphabet) {
        var _ref = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, _ref$location = _ref.location, location = _ref$location === void 0 ? Config.location : _ref$location, _ref$distance = _ref.distance, distance = _ref$distance === void 0 ? Config.distance : _ref$distance, _ref$threshold = _ref.threshold, threshold = _ref$threshold === void 0 ? Config.threshold : _ref$threshold, _ref$findAllMatches = _ref.findAllMatches, findAllMatches = _ref$findAllMatches === void 0 ? Config.findAllMatches : _ref$findAllMatches, _ref$minMatchCharLeng = _ref.minMatchCharLength, minMatchCharLength = _ref$minMatchCharLeng === void 0 ? Config.minMatchCharLength : _ref$minMatchCharLeng, _ref$includeMatches = _ref.includeMatches, includeMatches = _ref$includeMatches === void 0 ? Config.includeMatches : _ref$includeMatches, _ref$ignoreLocation = _ref.ignoreLocation, ignoreLocation = _ref$ignoreLocation === void 0 ? Config.ignoreLocation : _ref$ignoreLocation;
        if (pattern.length > MAX_BITS) {
          throw new Error(PATTERN_LENGTH_TOO_LARGE(MAX_BITS));
        }
        var patternLen = pattern.length;
        var textLen = text.length;
        var expectedLocation = Math.max(0, Math.min(location, textLen));
        var currentThreshold = threshold;
        var bestLocation = expectedLocation;
        var computeMatches = minMatchCharLength > 1 || includeMatches;
        var matchMask = computeMatches ? Array(textLen) : [];
        var index;
        while ((index = text.indexOf(pattern, bestLocation)) > -1) {
          var score = computeScore$1(pattern, {
            currentLocation: index,
            expectedLocation,
            distance,
            ignoreLocation
          });
          currentThreshold = Math.min(score, currentThreshold);
          bestLocation = index + patternLen;
          if (computeMatches) {
            var i = 0;
            while (i < patternLen) {
              matchMask[index + i] = 1;
              i += 1;
            }
          }
        }
        bestLocation = -1;
        var lastBitArr = [];
        var finalScore = 1;
        var binMax = patternLen + textLen;
        var mask = 1 << patternLen - 1;
        for (var _i = 0; _i < patternLen; _i += 1) {
          var binMin = 0;
          var binMid = binMax;
          while (binMin < binMid) {
            var _score = computeScore$1(pattern, {
              errors: _i,
              currentLocation: expectedLocation + binMid,
              expectedLocation,
              distance,
              ignoreLocation
            });
            if (_score <= currentThreshold) {
              binMin = binMid;
            } else {
              binMax = binMid;
            }
            binMid = Math.floor((binMax - binMin) / 2 + binMin);
          }
          binMax = binMid;
          var start = Math.max(1, expectedLocation - binMid + 1);
          var finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;
          var bitArr = Array(finish + 2);
          bitArr[finish + 1] = (1 << _i) - 1;
          for (var j = finish; j >= start; j -= 1) {
            var currentLocation = j - 1;
            var charMatch = patternAlphabet[text.charAt(currentLocation)];
            if (computeMatches) {
              matchMask[currentLocation] = +!!charMatch;
            }
            bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;
            if (_i) {
              bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
            }
            if (bitArr[j] & mask) {
              finalScore = computeScore$1(pattern, {
                errors: _i,
                currentLocation,
                expectedLocation,
                distance,
                ignoreLocation
              });
              if (finalScore <= currentThreshold) {
                currentThreshold = finalScore;
                bestLocation = currentLocation;
                if (bestLocation <= expectedLocation) {
                  break;
                }
                start = Math.max(1, 2 * expectedLocation - bestLocation);
              }
            }
          }
          var _score2 = computeScore$1(pattern, {
            errors: _i + 1,
            currentLocation: expectedLocation,
            expectedLocation,
            distance,
            ignoreLocation
          });
          if (_score2 > currentThreshold) {
            break;
          }
          lastBitArr = bitArr;
        }
        var result = {
          isMatch: bestLocation >= 0,
          // Count exact matches (those with a score of 0) to be "almost" exact
          score: Math.max(1e-3, finalScore)
        };
        if (computeMatches) {
          var indices = convertMaskToIndices(matchMask, minMatchCharLength);
          if (!indices.length) {
            result.isMatch = false;
          } else if (includeMatches) {
            result.indices = indices;
          }
        }
        return result;
      }
      function createPatternAlphabet(pattern) {
        var mask = {};
        for (var i = 0, len = pattern.length; i < len; i += 1) {
          var _char = pattern.charAt(i);
          mask[_char] = (mask[_char] || 0) | 1 << len - i - 1;
        }
        return mask;
      }
      var BitapSearch = /* @__PURE__ */ function() {
        function BitapSearch2(pattern) {
          var _this = this;
          var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$location = _ref.location, location = _ref$location === void 0 ? Config.location : _ref$location, _ref$threshold = _ref.threshold, threshold = _ref$threshold === void 0 ? Config.threshold : _ref$threshold, _ref$distance = _ref.distance, distance = _ref$distance === void 0 ? Config.distance : _ref$distance, _ref$includeMatches = _ref.includeMatches, includeMatches = _ref$includeMatches === void 0 ? Config.includeMatches : _ref$includeMatches, _ref$findAllMatches = _ref.findAllMatches, findAllMatches = _ref$findAllMatches === void 0 ? Config.findAllMatches : _ref$findAllMatches, _ref$minMatchCharLeng = _ref.minMatchCharLength, minMatchCharLength = _ref$minMatchCharLeng === void 0 ? Config.minMatchCharLength : _ref$minMatchCharLeng, _ref$isCaseSensitive = _ref.isCaseSensitive, isCaseSensitive = _ref$isCaseSensitive === void 0 ? Config.isCaseSensitive : _ref$isCaseSensitive, _ref$ignoreLocation = _ref.ignoreLocation, ignoreLocation = _ref$ignoreLocation === void 0 ? Config.ignoreLocation : _ref$ignoreLocation;
          _classCallCheck(this, BitapSearch2);
          this.options = {
            location,
            threshold,
            distance,
            includeMatches,
            findAllMatches,
            minMatchCharLength,
            isCaseSensitive,
            ignoreLocation
          };
          this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
          this.chunks = [];
          if (!this.pattern.length) {
            return;
          }
          var addChunk = function addChunk2(pattern2, startIndex2) {
            _this.chunks.push({
              pattern: pattern2,
              alphabet: createPatternAlphabet(pattern2),
              startIndex: startIndex2
            });
          };
          var len = this.pattern.length;
          if (len > MAX_BITS) {
            var i = 0;
            var remainder = len % MAX_BITS;
            var end = len - remainder;
            while (i < end) {
              addChunk(this.pattern.substr(i, MAX_BITS), i);
              i += MAX_BITS;
            }
            if (remainder) {
              var startIndex = len - MAX_BITS;
              addChunk(this.pattern.substr(startIndex), startIndex);
            }
          } else {
            addChunk(this.pattern, 0);
          }
        }
        _createClass(BitapSearch2, [{
          key: "searchIn",
          value: function searchIn(text) {
            var _this$options = this.options, isCaseSensitive = _this$options.isCaseSensitive, includeMatches = _this$options.includeMatches;
            if (!isCaseSensitive) {
              text = text.toLowerCase();
            }
            if (this.pattern === text) {
              var _result = {
                isMatch: true,
                score: 0
              };
              if (includeMatches) {
                _result.indices = [[0, text.length - 1]];
              }
              return _result;
            }
            var _this$options2 = this.options, location = _this$options2.location, distance = _this$options2.distance, threshold = _this$options2.threshold, findAllMatches = _this$options2.findAllMatches, minMatchCharLength = _this$options2.minMatchCharLength, ignoreLocation = _this$options2.ignoreLocation;
            var allIndices = [];
            var totalScore = 0;
            var hasMatches = false;
            this.chunks.forEach(function(_ref2) {
              var pattern = _ref2.pattern, alphabet = _ref2.alphabet, startIndex = _ref2.startIndex;
              var _search = search(text, pattern, alphabet, {
                location: location + startIndex,
                distance,
                threshold,
                findAllMatches,
                minMatchCharLength,
                includeMatches,
                ignoreLocation
              }), isMatch = _search.isMatch, score = _search.score, indices = _search.indices;
              if (isMatch) {
                hasMatches = true;
              }
              totalScore += score;
              if (isMatch && indices) {
                allIndices = [].concat(_toConsumableArray(allIndices), _toConsumableArray(indices));
              }
            });
            var result = {
              isMatch: hasMatches,
              score: hasMatches ? totalScore / this.chunks.length : 1
            };
            if (hasMatches && includeMatches) {
              result.indices = allIndices;
            }
            return result;
          }
        }]);
        return BitapSearch2;
      }();
      var BaseMatch = /* @__PURE__ */ function() {
        function BaseMatch2(pattern) {
          _classCallCheck(this, BaseMatch2);
          this.pattern = pattern;
        }
        _createClass(BaseMatch2, [{
          key: "search",
          value: function search2() {
          }
        }], [{
          key: "isMultiMatch",
          value: function isMultiMatch(pattern) {
            return getMatch(pattern, this.multiRegex);
          }
        }, {
          key: "isSingleMatch",
          value: function isSingleMatch(pattern) {
            return getMatch(pattern, this.singleRegex);
          }
        }]);
        return BaseMatch2;
      }();
      function getMatch(pattern, exp) {
        var matches = pattern.match(exp);
        return matches ? matches[1] : null;
      }
      var ExactMatch = /* @__PURE__ */ function(_BaseMatch) {
        _inherits(ExactMatch2, _BaseMatch);
        var _super = _createSuper(ExactMatch2);
        function ExactMatch2(pattern) {
          _classCallCheck(this, ExactMatch2);
          return _super.call(this, pattern);
        }
        _createClass(ExactMatch2, [{
          key: "search",
          value: function search2(text) {
            var isMatch = text === this.pattern;
            return {
              isMatch,
              score: isMatch ? 0 : 1,
              indices: [0, this.pattern.length - 1]
            };
          }
        }], [{
          key: "type",
          get: function get2() {
            return "exact";
          }
        }, {
          key: "multiRegex",
          get: function get2() {
            return /^="(.*)"$/;
          }
        }, {
          key: "singleRegex",
          get: function get2() {
            return /^=(.*)$/;
          }
        }]);
        return ExactMatch2;
      }(BaseMatch);
      var InverseExactMatch = /* @__PURE__ */ function(_BaseMatch) {
        _inherits(InverseExactMatch2, _BaseMatch);
        var _super = _createSuper(InverseExactMatch2);
        function InverseExactMatch2(pattern) {
          _classCallCheck(this, InverseExactMatch2);
          return _super.call(this, pattern);
        }
        _createClass(InverseExactMatch2, [{
          key: "search",
          value: function search2(text) {
            var index = text.indexOf(this.pattern);
            var isMatch = index === -1;
            return {
              isMatch,
              score: isMatch ? 0 : 1,
              indices: [0, text.length - 1]
            };
          }
        }], [{
          key: "type",
          get: function get2() {
            return "inverse-exact";
          }
        }, {
          key: "multiRegex",
          get: function get2() {
            return /^!"(.*)"$/;
          }
        }, {
          key: "singleRegex",
          get: function get2() {
            return /^!(.*)$/;
          }
        }]);
        return InverseExactMatch2;
      }(BaseMatch);
      var PrefixExactMatch = /* @__PURE__ */ function(_BaseMatch) {
        _inherits(PrefixExactMatch2, _BaseMatch);
        var _super = _createSuper(PrefixExactMatch2);
        function PrefixExactMatch2(pattern) {
          _classCallCheck(this, PrefixExactMatch2);
          return _super.call(this, pattern);
        }
        _createClass(PrefixExactMatch2, [{
          key: "search",
          value: function search2(text) {
            var isMatch = text.startsWith(this.pattern);
            return {
              isMatch,
              score: isMatch ? 0 : 1,
              indices: [0, this.pattern.length - 1]
            };
          }
        }], [{
          key: "type",
          get: function get2() {
            return "prefix-exact";
          }
        }, {
          key: "multiRegex",
          get: function get2() {
            return /^\^"(.*)"$/;
          }
        }, {
          key: "singleRegex",
          get: function get2() {
            return /^\^(.*)$/;
          }
        }]);
        return PrefixExactMatch2;
      }(BaseMatch);
      var InversePrefixExactMatch = /* @__PURE__ */ function(_BaseMatch) {
        _inherits(InversePrefixExactMatch2, _BaseMatch);
        var _super = _createSuper(InversePrefixExactMatch2);
        function InversePrefixExactMatch2(pattern) {
          _classCallCheck(this, InversePrefixExactMatch2);
          return _super.call(this, pattern);
        }
        _createClass(InversePrefixExactMatch2, [{
          key: "search",
          value: function search2(text) {
            var isMatch = !text.startsWith(this.pattern);
            return {
              isMatch,
              score: isMatch ? 0 : 1,
              indices: [0, text.length - 1]
            };
          }
        }], [{
          key: "type",
          get: function get2() {
            return "inverse-prefix-exact";
          }
        }, {
          key: "multiRegex",
          get: function get2() {
            return /^!\^"(.*)"$/;
          }
        }, {
          key: "singleRegex",
          get: function get2() {
            return /^!\^(.*)$/;
          }
        }]);
        return InversePrefixExactMatch2;
      }(BaseMatch);
      var SuffixExactMatch = /* @__PURE__ */ function(_BaseMatch) {
        _inherits(SuffixExactMatch2, _BaseMatch);
        var _super = _createSuper(SuffixExactMatch2);
        function SuffixExactMatch2(pattern) {
          _classCallCheck(this, SuffixExactMatch2);
          return _super.call(this, pattern);
        }
        _createClass(SuffixExactMatch2, [{
          key: "search",
          value: function search2(text) {
            var isMatch = text.endsWith(this.pattern);
            return {
              isMatch,
              score: isMatch ? 0 : 1,
              indices: [text.length - this.pattern.length, text.length - 1]
            };
          }
        }], [{
          key: "type",
          get: function get2() {
            return "suffix-exact";
          }
        }, {
          key: "multiRegex",
          get: function get2() {
            return /^"(.*)"\$$/;
          }
        }, {
          key: "singleRegex",
          get: function get2() {
            return /^(.*)\$$/;
          }
        }]);
        return SuffixExactMatch2;
      }(BaseMatch);
      var InverseSuffixExactMatch = /* @__PURE__ */ function(_BaseMatch) {
        _inherits(InverseSuffixExactMatch2, _BaseMatch);
        var _super = _createSuper(InverseSuffixExactMatch2);
        function InverseSuffixExactMatch2(pattern) {
          _classCallCheck(this, InverseSuffixExactMatch2);
          return _super.call(this, pattern);
        }
        _createClass(InverseSuffixExactMatch2, [{
          key: "search",
          value: function search2(text) {
            var isMatch = !text.endsWith(this.pattern);
            return {
              isMatch,
              score: isMatch ? 0 : 1,
              indices: [0, text.length - 1]
            };
          }
        }], [{
          key: "type",
          get: function get2() {
            return "inverse-suffix-exact";
          }
        }, {
          key: "multiRegex",
          get: function get2() {
            return /^!"(.*)"\$$/;
          }
        }, {
          key: "singleRegex",
          get: function get2() {
            return /^!(.*)\$$/;
          }
        }]);
        return InverseSuffixExactMatch2;
      }(BaseMatch);
      var FuzzyMatch = /* @__PURE__ */ function(_BaseMatch) {
        _inherits(FuzzyMatch2, _BaseMatch);
        var _super = _createSuper(FuzzyMatch2);
        function FuzzyMatch2(pattern) {
          var _this;
          var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$location = _ref.location, location = _ref$location === void 0 ? Config.location : _ref$location, _ref$threshold = _ref.threshold, threshold = _ref$threshold === void 0 ? Config.threshold : _ref$threshold, _ref$distance = _ref.distance, distance = _ref$distance === void 0 ? Config.distance : _ref$distance, _ref$includeMatches = _ref.includeMatches, includeMatches = _ref$includeMatches === void 0 ? Config.includeMatches : _ref$includeMatches, _ref$findAllMatches = _ref.findAllMatches, findAllMatches = _ref$findAllMatches === void 0 ? Config.findAllMatches : _ref$findAllMatches, _ref$minMatchCharLeng = _ref.minMatchCharLength, minMatchCharLength = _ref$minMatchCharLeng === void 0 ? Config.minMatchCharLength : _ref$minMatchCharLeng, _ref$isCaseSensitive = _ref.isCaseSensitive, isCaseSensitive = _ref$isCaseSensitive === void 0 ? Config.isCaseSensitive : _ref$isCaseSensitive, _ref$ignoreLocation = _ref.ignoreLocation, ignoreLocation = _ref$ignoreLocation === void 0 ? Config.ignoreLocation : _ref$ignoreLocation;
          _classCallCheck(this, FuzzyMatch2);
          _this = _super.call(this, pattern);
          _this._bitapSearch = new BitapSearch(pattern, {
            location,
            threshold,
            distance,
            includeMatches,
            findAllMatches,
            minMatchCharLength,
            isCaseSensitive,
            ignoreLocation
          });
          return _this;
        }
        _createClass(FuzzyMatch2, [{
          key: "search",
          value: function search2(text) {
            return this._bitapSearch.searchIn(text);
          }
        }], [{
          key: "type",
          get: function get2() {
            return "fuzzy";
          }
        }, {
          key: "multiRegex",
          get: function get2() {
            return /^"(.*)"$/;
          }
        }, {
          key: "singleRegex",
          get: function get2() {
            return /^(.*)$/;
          }
        }]);
        return FuzzyMatch2;
      }(BaseMatch);
      var IncludeMatch = /* @__PURE__ */ function(_BaseMatch) {
        _inherits(IncludeMatch2, _BaseMatch);
        var _super = _createSuper(IncludeMatch2);
        function IncludeMatch2(pattern) {
          _classCallCheck(this, IncludeMatch2);
          return _super.call(this, pattern);
        }
        _createClass(IncludeMatch2, [{
          key: "search",
          value: function search2(text) {
            var location = 0;
            var index;
            var indices = [];
            var patternLen = this.pattern.length;
            while ((index = text.indexOf(this.pattern, location)) > -1) {
              location = index + patternLen;
              indices.push([index, location - 1]);
            }
            var isMatch = !!indices.length;
            return {
              isMatch,
              score: isMatch ? 0 : 1,
              indices
            };
          }
        }], [{
          key: "type",
          get: function get2() {
            return "include";
          }
        }, {
          key: "multiRegex",
          get: function get2() {
            return /^'"(.*)"$/;
          }
        }, {
          key: "singleRegex",
          get: function get2() {
            return /^'(.*)$/;
          }
        }]);
        return IncludeMatch2;
      }(BaseMatch);
      var searchers = [ExactMatch, IncludeMatch, PrefixExactMatch, InversePrefixExactMatch, InverseSuffixExactMatch, SuffixExactMatch, InverseExactMatch, FuzzyMatch];
      var searchersLen = searchers.length;
      var SPACE_RE = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
      var OR_TOKEN = "|";
      function parseQuery(pattern) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return pattern.split(OR_TOKEN).map(function(item) {
          var query = item.trim().split(SPACE_RE).filter(function(item2) {
            return item2 && !!item2.trim();
          });
          var results = [];
          for (var i = 0, len = query.length; i < len; i += 1) {
            var queryItem = query[i];
            var found = false;
            var idx = -1;
            while (!found && ++idx < searchersLen) {
              var searcher = searchers[idx];
              var token = searcher.isMultiMatch(queryItem);
              if (token) {
                results.push(new searcher(token, options));
                found = true;
              }
            }
            if (found) {
              continue;
            }
            idx = -1;
            while (++idx < searchersLen) {
              var _searcher = searchers[idx];
              var _token = _searcher.isSingleMatch(queryItem);
              if (_token) {
                results.push(new _searcher(_token, options));
                break;
              }
            }
          }
          return results;
        });
      }
      var MultiMatchSet = /* @__PURE__ */ new Set([FuzzyMatch.type, IncludeMatch.type]);
      var ExtendedSearch = /* @__PURE__ */ function() {
        function ExtendedSearch2(pattern) {
          var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$isCaseSensitive = _ref.isCaseSensitive, isCaseSensitive = _ref$isCaseSensitive === void 0 ? Config.isCaseSensitive : _ref$isCaseSensitive, _ref$includeMatches = _ref.includeMatches, includeMatches = _ref$includeMatches === void 0 ? Config.includeMatches : _ref$includeMatches, _ref$minMatchCharLeng = _ref.minMatchCharLength, minMatchCharLength = _ref$minMatchCharLeng === void 0 ? Config.minMatchCharLength : _ref$minMatchCharLeng, _ref$ignoreLocation = _ref.ignoreLocation, ignoreLocation = _ref$ignoreLocation === void 0 ? Config.ignoreLocation : _ref$ignoreLocation, _ref$findAllMatches = _ref.findAllMatches, findAllMatches = _ref$findAllMatches === void 0 ? Config.findAllMatches : _ref$findAllMatches, _ref$location = _ref.location, location = _ref$location === void 0 ? Config.location : _ref$location, _ref$threshold = _ref.threshold, threshold = _ref$threshold === void 0 ? Config.threshold : _ref$threshold, _ref$distance = _ref.distance, distance = _ref$distance === void 0 ? Config.distance : _ref$distance;
          _classCallCheck(this, ExtendedSearch2);
          this.query = null;
          this.options = {
            isCaseSensitive,
            includeMatches,
            minMatchCharLength,
            findAllMatches,
            ignoreLocation,
            location,
            threshold,
            distance
          };
          this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
          this.query = parseQuery(this.pattern, this.options);
        }
        _createClass(ExtendedSearch2, [{
          key: "searchIn",
          value: function searchIn(text) {
            var query = this.query;
            if (!query) {
              return {
                isMatch: false,
                score: 1
              };
            }
            var _this$options = this.options, includeMatches = _this$options.includeMatches, isCaseSensitive = _this$options.isCaseSensitive;
            text = isCaseSensitive ? text : text.toLowerCase();
            var numMatches = 0;
            var allIndices = [];
            var totalScore = 0;
            for (var i = 0, qLen = query.length; i < qLen; i += 1) {
              var searchers2 = query[i];
              allIndices.length = 0;
              numMatches = 0;
              for (var j = 0, pLen = searchers2.length; j < pLen; j += 1) {
                var searcher = searchers2[j];
                var _searcher$search = searcher.search(text), isMatch = _searcher$search.isMatch, indices = _searcher$search.indices, score = _searcher$search.score;
                if (isMatch) {
                  numMatches += 1;
                  totalScore += score;
                  if (includeMatches) {
                    var type = searcher.constructor.type;
                    if (MultiMatchSet.has(type)) {
                      allIndices = [].concat(_toConsumableArray(allIndices), _toConsumableArray(indices));
                    } else {
                      allIndices.push(indices);
                    }
                  }
                } else {
                  totalScore = 0;
                  numMatches = 0;
                  allIndices.length = 0;
                  break;
                }
              }
              if (numMatches) {
                var result = {
                  isMatch: true,
                  score: totalScore / numMatches
                };
                if (includeMatches) {
                  result.indices = allIndices;
                }
                return result;
              }
            }
            return {
              isMatch: false,
              score: 1
            };
          }
        }], [{
          key: "condition",
          value: function condition(_, options) {
            return options.useExtendedSearch;
          }
        }]);
        return ExtendedSearch2;
      }();
      var registeredSearchers = [];
      function register() {
        registeredSearchers.push.apply(registeredSearchers, arguments);
      }
      function createSearcher(pattern, options) {
        for (var i = 0, len = registeredSearchers.length; i < len; i += 1) {
          var searcherClass = registeredSearchers[i];
          if (searcherClass.condition(pattern, options)) {
            return new searcherClass(pattern, options);
          }
        }
        return new BitapSearch(pattern, options);
      }
      var LogicalOperator = {
        AND: "$and",
        OR: "$or"
      };
      var KeyType = {
        PATH: "$path",
        PATTERN: "$val"
      };
      var isExpression = function isExpression2(query) {
        return !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
      };
      var isPath = function isPath2(query) {
        return !!query[KeyType.PATH];
      };
      var isLeaf = function isLeaf2(query) {
        return !isArray(query) && isObject(query) && !isExpression(query);
      };
      var convertToExplicit = function convertToExplicit2(query) {
        return _defineProperty({}, LogicalOperator.AND, Object.keys(query).map(function(key) {
          return _defineProperty({}, key, query[key]);
        }));
      };
      function parse(query, options) {
        var _ref3 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, _ref3$auto = _ref3.auto, auto = _ref3$auto === void 0 ? true : _ref3$auto;
        var next = function next2(query2) {
          var keys = Object.keys(query2);
          var isQueryPath = isPath(query2);
          if (!isQueryPath && keys.length > 1 && !isExpression(query2)) {
            return next2(convertToExplicit(query2));
          }
          if (isLeaf(query2)) {
            var key = isQueryPath ? query2[KeyType.PATH] : keys[0];
            var pattern = isQueryPath ? query2[KeyType.PATTERN] : query2[key];
            if (!isString(pattern)) {
              throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
            }
            var obj = {
              keyId: createKeyId(key),
              pattern
            };
            if (auto) {
              obj.searcher = createSearcher(pattern, options);
            }
            return obj;
          }
          var node = {
            children: [],
            operator: keys[0]
          };
          keys.forEach(function(key2) {
            var value = query2[key2];
            if (isArray(value)) {
              value.forEach(function(item) {
                node.children.push(next2(item));
              });
            }
          });
          return node;
        };
        if (!isExpression(query)) {
          query = convertToExplicit(query);
        }
        return next(query);
      }
      function computeScore(results, _ref) {
        var _ref$ignoreFieldNorm = _ref.ignoreFieldNorm, ignoreFieldNorm = _ref$ignoreFieldNorm === void 0 ? Config.ignoreFieldNorm : _ref$ignoreFieldNorm;
        results.forEach(function(result) {
          var totalScore = 1;
          result.matches.forEach(function(_ref2) {
            var key = _ref2.key, norm2 = _ref2.norm, score = _ref2.score;
            var weight = key ? key.weight : null;
            totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm2));
          });
          result.score = totalScore;
        });
      }
      function transformMatches(result, data) {
        var matches = result.matches;
        data.matches = [];
        if (!isDefined(matches)) {
          return;
        }
        matches.forEach(function(match) {
          if (!isDefined(match.indices) || !match.indices.length) {
            return;
          }
          var indices = match.indices, value = match.value;
          var obj = {
            indices,
            value
          };
          if (match.key) {
            obj.key = match.key.src;
          }
          if (match.idx > -1) {
            obj.refIndex = match.idx;
          }
          data.matches.push(obj);
        });
      }
      function transformScore(result, data) {
        data.score = result.score;
      }
      function format(results, docs) {
        var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, _ref$includeMatches = _ref.includeMatches, includeMatches = _ref$includeMatches === void 0 ? Config.includeMatches : _ref$includeMatches, _ref$includeScore = _ref.includeScore, includeScore = _ref$includeScore === void 0 ? Config.includeScore : _ref$includeScore;
        var transformers = [];
        if (includeMatches) transformers.push(transformMatches);
        if (includeScore) transformers.push(transformScore);
        return results.map(function(result) {
          var idx = result.idx;
          var data = {
            item: docs[idx],
            refIndex: idx
          };
          if (transformers.length) {
            transformers.forEach(function(transformer) {
              transformer(result, data);
            });
          }
          return data;
        });
      }
      var Fuse$1 = /* @__PURE__ */ function() {
        function Fuse3(docs) {
          var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          var index = arguments.length > 2 ? arguments[2] : void 0;
          _classCallCheck(this, Fuse3);
          this.options = _objectSpread2(_objectSpread2({}, Config), options);
          if (this.options.useExtendedSearch && false) {
            throw new Error(EXTENDED_SEARCH_UNAVAILABLE);
          }
          this._keyStore = new KeyStore(this.options.keys);
          this.setCollection(docs, index);
        }
        _createClass(Fuse3, [{
          key: "setCollection",
          value: function setCollection(docs, index) {
            this._docs = docs;
            if (index && !(index instanceof FuseIndex)) {
              throw new Error(INCORRECT_INDEX_TYPE);
            }
            this._myIndex = index || createIndex(this.options.keys, this._docs, {
              getFn: this.options.getFn,
              fieldNormWeight: this.options.fieldNormWeight
            });
          }
        }, {
          key: "add",
          value: function add(doc) {
            if (!isDefined(doc)) {
              return;
            }
            this._docs.push(doc);
            this._myIndex.add(doc);
          }
        }, {
          key: "remove",
          value: function remove() {
            var predicate = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function() {
              return false;
            };
            var results = [];
            for (var i = 0, len = this._docs.length; i < len; i += 1) {
              var doc = this._docs[i];
              if (predicate(doc, i)) {
                this.removeAt(i);
                i -= 1;
                len -= 1;
                results.push(doc);
              }
            }
            return results;
          }
        }, {
          key: "removeAt",
          value: function removeAt(idx) {
            this._docs.splice(idx, 1);
            this._myIndex.removeAt(idx);
          }
        }, {
          key: "getIndex",
          value: function getIndex() {
            return this._myIndex;
          }
        }, {
          key: "search",
          value: function search2(query) {
            var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? -1 : _ref$limit;
            var _this$options = this.options, includeMatches = _this$options.includeMatches, includeScore = _this$options.includeScore, shouldSort = _this$options.shouldSort, sortFn = _this$options.sortFn, ignoreFieldNorm = _this$options.ignoreFieldNorm;
            var results = isString(query) ? isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
            computeScore(results, {
              ignoreFieldNorm
            });
            if (shouldSort) {
              results.sort(sortFn);
            }
            if (isNumber(limit) && limit > -1) {
              results = results.slice(0, limit);
            }
            return format(results, this._docs, {
              includeMatches,
              includeScore
            });
          }
        }, {
          key: "_searchStringList",
          value: function _searchStringList(query) {
            var searcher = createSearcher(query, this.options);
            var records = this._myIndex.records;
            var results = [];
            records.forEach(function(_ref2) {
              var text = _ref2.v, idx = _ref2.i, norm2 = _ref2.n;
              if (!isDefined(text)) {
                return;
              }
              var _searcher$searchIn = searcher.searchIn(text), isMatch = _searcher$searchIn.isMatch, score = _searcher$searchIn.score, indices = _searcher$searchIn.indices;
              if (isMatch) {
                results.push({
                  item: text,
                  idx,
                  matches: [{
                    score,
                    value: text,
                    norm: norm2,
                    indices
                  }]
                });
              }
            });
            return results;
          }
        }, {
          key: "_searchLogical",
          value: function _searchLogical(query) {
            var _this = this;
            var expression = parse(query, this.options);
            var evaluate = function evaluate2(node, item, idx) {
              if (!node.children) {
                var keyId = node.keyId, searcher = node.searcher;
                var matches = _this._findMatches({
                  key: _this._keyStore.get(keyId),
                  value: _this._myIndex.getValueForItemAtKeyId(item, keyId),
                  searcher
                });
                if (matches && matches.length) {
                  return [{
                    idx,
                    item,
                    matches
                  }];
                }
                return [];
              }
              var res = [];
              for (var i = 0, len = node.children.length; i < len; i += 1) {
                var child = node.children[i];
                var result = evaluate2(child, item, idx);
                if (result.length) {
                  res.push.apply(res, _toConsumableArray(result));
                } else if (node.operator === LogicalOperator.AND) {
                  return [];
                }
              }
              return res;
            };
            var records = this._myIndex.records;
            var resultMap = {};
            var results = [];
            records.forEach(function(_ref3) {
              var item = _ref3.$, idx = _ref3.i;
              if (isDefined(item)) {
                var expResults = evaluate(expression, item, idx);
                if (expResults.length) {
                  if (!resultMap[idx]) {
                    resultMap[idx] = {
                      idx,
                      item,
                      matches: []
                    };
                    results.push(resultMap[idx]);
                  }
                  expResults.forEach(function(_ref4) {
                    var _resultMap$idx$matche;
                    var matches = _ref4.matches;
                    (_resultMap$idx$matche = resultMap[idx].matches).push.apply(_resultMap$idx$matche, _toConsumableArray(matches));
                  });
                }
              }
            });
            return results;
          }
        }, {
          key: "_searchObjectList",
          value: function _searchObjectList(query) {
            var _this2 = this;
            var searcher = createSearcher(query, this.options);
            var _this$_myIndex = this._myIndex, keys = _this$_myIndex.keys, records = _this$_myIndex.records;
            var results = [];
            records.forEach(function(_ref5) {
              var item = _ref5.$, idx = _ref5.i;
              if (!isDefined(item)) {
                return;
              }
              var matches = [];
              keys.forEach(function(key, keyIndex) {
                matches.push.apply(matches, _toConsumableArray(_this2._findMatches({
                  key,
                  value: item[keyIndex],
                  searcher
                })));
              });
              if (matches.length) {
                results.push({
                  idx,
                  item,
                  matches
                });
              }
            });
            return results;
          }
        }, {
          key: "_findMatches",
          value: function _findMatches(_ref6) {
            var key = _ref6.key, value = _ref6.value, searcher = _ref6.searcher;
            if (!isDefined(value)) {
              return [];
            }
            var matches = [];
            if (isArray(value)) {
              value.forEach(function(_ref7) {
                var text2 = _ref7.v, idx = _ref7.i, norm3 = _ref7.n;
                if (!isDefined(text2)) {
                  return;
                }
                var _searcher$searchIn2 = searcher.searchIn(text2), isMatch2 = _searcher$searchIn2.isMatch, score2 = _searcher$searchIn2.score, indices2 = _searcher$searchIn2.indices;
                if (isMatch2) {
                  matches.push({
                    score: score2,
                    key,
                    value: text2,
                    idx,
                    norm: norm3,
                    indices: indices2
                  });
                }
              });
            } else {
              var text = value.v, norm2 = value.n;
              var _searcher$searchIn3 = searcher.searchIn(text), isMatch = _searcher$searchIn3.isMatch, score = _searcher$searchIn3.score, indices = _searcher$searchIn3.indices;
              if (isMatch) {
                matches.push({
                  score,
                  key,
                  value: text,
                  norm: norm2,
                  indices
                });
              }
            }
            return matches;
          }
        }]);
        return Fuse3;
      }();
      Fuse$1.version = "7.0.0";
      Fuse$1.createIndex = createIndex;
      Fuse$1.parseIndex = parseIndex;
      Fuse$1.config = Config;
      {
        Fuse$1.parseQuery = parse;
      }
      {
        register(ExtendedSearch);
      }
      var Fuse2 = Fuse$1;
      module.exports = Fuse2;
    }
  });

  // public/javascripts/search.js
  var Fuse = require_fuse();
  var clubs = [];
  var fuse = new Fuse(clubs, {
    keys: ["name", "sport"],
    threshold: 0.3
  });
  async function loadClubs() {
    const response = await fetch("https://showallclubs-77hki32qna-nw.a.run.app", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      clubs = Object.keys(data.clubs).map((clubKey) => ({
        name: clubKey,
        sport: data.clubs[clubKey].sport,
        caloryBurnRate: data.clubs[clubKey].caloryBurnRate
      }));
      console.log("Transformed Clubs:", clubs);
      console.log(fuse.list);
      fuse.setCollection(clubs);
    } else {
      console.error("Failed to load clubs");
    }
  }
  loadClubs();
  var userInput = document.getElementById("userInput");
  var resultsDiv = document.getElementById("results");
  userInput.addEventListener("input", () => {
    const query = userInput.value;
    const results = fuse.search(query);
    resultsDiv.innerHTML = "";
    results.forEach((result) => {
      const club = result.item;
      const div = document.createElement("div");
      div.classList.add("result");
      div.textContent = "".concat(club.name, " -	Sport: ").concat(club.sport, " -	Calory Burn Rate: ").concat(club.caloryBurnRate, "cal/hr");
      resultsDiv.appendChild(div);
    });
    if (results.length === 0) {
      resultsDiv.textContent = "No clubs found.";
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2Z1c2UuanMvZGlzdC9mdXNlLmNqcyIsICJzZWFyY2guanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogRnVzZS5qcyB2Ny4wLjAgLSBMaWdodHdlaWdodCBmdXp6eS1zZWFyY2ggKGh0dHA6Ly9mdXNlanMuaW8pXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDIzIEtpcm8gUmlzayAoaHR0cDovL2tpcm8ubWUpXG4gKiBBbGwgUmlnaHRzIFJlc2VydmVkLiBBcGFjaGUgU29mdHdhcmUgTGljZW5zZSAyLjBcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7XG4gICAgZW51bWVyYWJsZU9ubHkgJiYgKHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTtcbiAgICB9KSksIGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTtcbiAgfVxuICByZXR1cm4ga2V5cztcbn1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQyKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBudWxsICE9IGFyZ3VtZW50c1tpXSA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIGkgJSAyID8gb3duS2V5cyhPYmplY3Qoc291cmNlKSwgITApLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoc291cmNlKSkgOiBvd25LZXlzKE9iamVjdChzb3VyY2UpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgX3R5cGVvZihvYmopO1xufVxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIF90b1Byb3BlcnR5S2V5KGRlc2NyaXB0b3Iua2V5KSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGtleSA9IF90b1Byb3BlcnR5S2V5KGtleSk7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3ViQ2xhc3MsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufVxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gICAgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTtcbiAgfTtcbiAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTtcbn1cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZi5iaW5kKCkgOiBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7XG4gIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTtcbiAgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTtcbiAgdHJ5IHtcbiAgICBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoQm9vbGVhbiwgW10sIGZ1bmN0aW9uICgpIHt9KSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG4gIHJldHVybiBzZWxmO1xufVxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfSBlbHNlIGlmIChjYWxsICE9PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRGVyaXZlZCBjb25zdHJ1Y3RvcnMgbWF5IG9ubHkgcmV0dXJuIG9iamVjdCBvciB1bmRlZmluZWRcIik7XG4gIH1cbiAgcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59XG5mdW5jdGlvbiBfY3JlYXRlU3VwZXIoRGVyaXZlZCkge1xuICB2YXIgaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIF9jcmVhdGVTdXBlckludGVybmFsKCkge1xuICAgIHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSxcbiAgICAgIHJlc3VsdDtcbiAgICBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkge1xuICAgICAgdmFyIE5ld1RhcmdldCA9IF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3RvcjtcbiAgICAgIHJlc3VsdCA9IFJlZmxlY3QuY29uc3RydWN0KFN1cGVyLCBhcmd1bWVudHMsIE5ld1RhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IFN1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpO1xuICB9O1xufVxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gX2FycmF5V2l0aG91dEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IF9ub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkoYXJyKTtcbn1cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVyW1N5bWJvbC5pdGVyYXRvcl0gIT0gbnVsbCB8fCBpdGVyW1wiQEBpdGVyYXRvclwiXSAhPSBudWxsKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn1cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIGFycjJbaV0gPSBhcnJbaV07XG4gIHJldHVybiBhcnIyO1xufVxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZShpbnB1dCwgaGludCkge1xuICBpZiAodHlwZW9mIGlucHV0ICE9PSBcIm9iamVjdFwiIHx8IGlucHV0ID09PSBudWxsKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBwcmltID0gaW5wdXRbU3ltYm9sLnRvUHJpbWl0aXZlXTtcbiAgaWYgKHByaW0gIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmICh0eXBlb2YgcmVzICE9PSBcIm9iamVjdFwiKSByZXR1cm4gcmVzO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTtcbiAgfVxuICByZXR1cm4gKGhpbnQgPT09IFwic3RyaW5nXCIgPyBTdHJpbmcgOiBOdW1iZXIpKGlucHV0KTtcbn1cbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykge1xuICB2YXIga2V5ID0gX3RvUHJpbWl0aXZlKGFyZywgXCJzdHJpbmdcIik7XG4gIHJldHVybiB0eXBlb2Yga2V5ID09PSBcInN5bWJvbFwiID8ga2V5IDogU3RyaW5nKGtleSk7XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuICFBcnJheS5pc0FycmF5ID8gZ2V0VGFnKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA6IEFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG4vLyBBZGFwdGVkIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvbWFzdGVyLy5pbnRlcm5hbC9iYXNlVG9TdHJpbmcuanNcbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IHZhbHVlICsgJyc7XG4gIHJldHVybiByZXN1bHQgPT0gJzAnICYmIDEgLyB2YWx1ZSA9PSAtSU5GSU5JVFkgPyAnLTAnIDogcmVzdWx0O1xufVxuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbn1cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInO1xufVxuXG4vLyBBZGFwdGVkIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvbWFzdGVyL2lzQm9vbGVhbi5qc1xuZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2UgfHwgaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBnZXRUYWcodmFsdWUpID09ICdbb2JqZWN0IEJvb2xlYW5dJztcbn1cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBfdHlwZW9mKHZhbHVlKSA9PT0gJ29iamVjdCc7XG59XG5cbi8vIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWx1ZSkgJiYgdmFsdWUgIT09IG51bGw7XG59XG5mdW5jdGlvbiBpc0RlZmluZWQodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGw7XG59XG5mdW5jdGlvbiBpc0JsYW5rKHZhbHVlKSB7XG4gIHJldHVybiAhdmFsdWUudHJpbSgpLmxlbmd0aDtcbn1cblxuLy8gR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuLy8gQWRhcHRlZCBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vbG9kYXNoL2xvZGFzaC9ibG9iL21hc3Rlci8uaW50ZXJuYWwvZ2V0VGFnLmpzXG5mdW5jdGlvbiBnZXRUYWcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gJ1tvYmplY3QgVW5kZWZpbmVkXScgOiAnW29iamVjdCBOdWxsXScgOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG52YXIgRVhURU5ERURfU0VBUkNIX1VOQVZBSUxBQkxFID0gJ0V4dGVuZGVkIHNlYXJjaCBpcyBub3QgYXZhaWxhYmxlJztcbnZhciBJTkNPUlJFQ1RfSU5ERVhfVFlQRSA9IFwiSW5jb3JyZWN0ICdpbmRleCcgdHlwZVwiO1xudmFyIExPR0lDQUxfU0VBUkNIX0lOVkFMSURfUVVFUllfRk9SX0tFWSA9IGZ1bmN0aW9uIExPR0lDQUxfU0VBUkNIX0lOVkFMSURfUVVFUllfRk9SX0tFWShrZXkpIHtcbiAgcmV0dXJuIFwiSW52YWxpZCB2YWx1ZSBmb3Iga2V5IFwiLmNvbmNhdChrZXkpO1xufTtcbnZhciBQQVRURVJOX0xFTkdUSF9UT09fTEFSR0UgPSBmdW5jdGlvbiBQQVRURVJOX0xFTkdUSF9UT09fTEFSR0UobWF4KSB7XG4gIHJldHVybiBcIlBhdHRlcm4gbGVuZ3RoIGV4Y2VlZHMgbWF4IG9mIFwiLmNvbmNhdChtYXgsIFwiLlwiKTtcbn07XG52YXIgTUlTU0lOR19LRVlfUFJPUEVSVFkgPSBmdW5jdGlvbiBNSVNTSU5HX0tFWV9QUk9QRVJUWShuYW1lKSB7XG4gIHJldHVybiBcIk1pc3NpbmcgXCIuY29uY2F0KG5hbWUsIFwiIHByb3BlcnR5IGluIGtleVwiKTtcbn07XG52YXIgSU5WQUxJRF9LRVlfV0VJR0hUX1ZBTFVFID0gZnVuY3Rpb24gSU5WQUxJRF9LRVlfV0VJR0hUX1ZBTFVFKGtleSkge1xuICByZXR1cm4gXCJQcm9wZXJ0eSAnd2VpZ2h0JyBpbiBrZXkgJ1wiLmNvbmNhdChrZXksIFwiJyBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlclwiKTtcbn07XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIEtleVN0b3JlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gS2V5U3RvcmUoa2V5cykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEtleVN0b3JlKTtcbiAgICB0aGlzLl9rZXlzID0gW107XG4gICAgdGhpcy5fa2V5TWFwID0ge307XG4gICAgdmFyIHRvdGFsV2VpZ2h0ID0gMDtcbiAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIG9iaiA9IGNyZWF0ZUtleShrZXkpO1xuICAgICAgX3RoaXMuX2tleXMucHVzaChvYmopO1xuICAgICAgX3RoaXMuX2tleU1hcFtvYmouaWRdID0gb2JqO1xuICAgICAgdG90YWxXZWlnaHQgKz0gb2JqLndlaWdodDtcbiAgICB9KTtcblxuICAgIC8vIE5vcm1hbGl6ZSB3ZWlnaHRzIHNvIHRoYXQgdGhlaXIgc3VtIGlzIGVxdWFsIHRvIDFcbiAgICB0aGlzLl9rZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAga2V5LndlaWdodCAvPSB0b3RhbFdlaWdodDtcbiAgICB9KTtcbiAgfVxuICBfY3JlYXRlQ2xhc3MoS2V5U3RvcmUsIFt7XG4gICAga2V5OiBcImdldFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXQoa2V5SWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9rZXlNYXBba2V5SWRdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJrZXlzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGtleXMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fa2V5cztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidG9KU09OXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLl9rZXlzKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEtleVN0b3JlO1xufSgpO1xuZnVuY3Rpb24gY3JlYXRlS2V5KGtleSkge1xuICB2YXIgcGF0aCA9IG51bGw7XG4gIHZhciBpZCA9IG51bGw7XG4gIHZhciBzcmMgPSBudWxsO1xuICB2YXIgd2VpZ2h0ID0gMTtcbiAgdmFyIGdldEZuID0gbnVsbDtcbiAgaWYgKGlzU3RyaW5nKGtleSkgfHwgaXNBcnJheShrZXkpKSB7XG4gICAgc3JjID0ga2V5O1xuICAgIHBhdGggPSBjcmVhdGVLZXlQYXRoKGtleSk7XG4gICAgaWQgPSBjcmVhdGVLZXlJZChrZXkpO1xuICB9IGVsc2Uge1xuICAgIGlmICghaGFzT3duLmNhbGwoa2V5LCAnbmFtZScpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoTUlTU0lOR19LRVlfUFJPUEVSVFkoJ25hbWUnKSk7XG4gICAgfVxuICAgIHZhciBuYW1lID0ga2V5Lm5hbWU7XG4gICAgc3JjID0gbmFtZTtcbiAgICBpZiAoaGFzT3duLmNhbGwoa2V5LCAnd2VpZ2h0JykpIHtcbiAgICAgIHdlaWdodCA9IGtleS53ZWlnaHQ7XG4gICAgICBpZiAod2VpZ2h0IDw9IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfS0VZX1dFSUdIVF9WQUxVRShuYW1lKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHBhdGggPSBjcmVhdGVLZXlQYXRoKG5hbWUpO1xuICAgIGlkID0gY3JlYXRlS2V5SWQobmFtZSk7XG4gICAgZ2V0Rm4gPSBrZXkuZ2V0Rm47XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBwYXRoOiBwYXRoLFxuICAgIGlkOiBpZCxcbiAgICB3ZWlnaHQ6IHdlaWdodCxcbiAgICBzcmM6IHNyYyxcbiAgICBnZXRGbjogZ2V0Rm5cbiAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUtleVBhdGgoa2V5KSB7XG4gIHJldHVybiBpc0FycmF5KGtleSkgPyBrZXkgOiBrZXkuc3BsaXQoJy4nKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUtleUlkKGtleSkge1xuICByZXR1cm4gaXNBcnJheShrZXkpID8ga2V5LmpvaW4oJy4nKSA6IGtleTtcbn1cblxuZnVuY3Rpb24gZ2V0KG9iaiwgcGF0aCkge1xuICB2YXIgbGlzdCA9IFtdO1xuICB2YXIgYXJyID0gZmFsc2U7XG4gIHZhciBkZWVwR2V0ID0gZnVuY3Rpb24gZGVlcEdldChvYmosIHBhdGgsIGluZGV4KSB7XG4gICAgaWYgKCFpc0RlZmluZWQob2JqKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXBhdGhbaW5kZXhdKSB7XG4gICAgICAvLyBJZiB0aGVyZSdzIG5vIHBhdGggbGVmdCwgd2UndmUgYXJyaXZlZCBhdCB0aGUgb2JqZWN0IHdlIGNhcmUgYWJvdXQuXG4gICAgICBsaXN0LnB1c2gob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGtleSA9IHBhdGhbaW5kZXhdO1xuICAgICAgdmFyIHZhbHVlID0gb2JqW2tleV07XG4gICAgICBpZiAoIWlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZSdyZSBhdCB0aGUgbGFzdCB2YWx1ZSBpbiB0aGUgcGF0aCwgYW5kIGlmIGl0J3MgYSBzdHJpbmcvbnVtYmVyL2Jvb2wsXG4gICAgICAvLyBhZGQgaXQgdG8gdGhlIGxpc3RcbiAgICAgIGlmIChpbmRleCA9PT0gcGF0aC5sZW5ndGggLSAxICYmIChpc1N0cmluZyh2YWx1ZSkgfHwgaXNOdW1iZXIodmFsdWUpIHx8IGlzQm9vbGVhbih2YWx1ZSkpKSB7XG4gICAgICAgIGxpc3QucHVzaCh0b1N0cmluZyh2YWx1ZSkpO1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBhcnIgPSB0cnVlO1xuICAgICAgICAvLyBTZWFyY2ggZWFjaCBpdGVtIGluIHRoZSBhcnJheS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHZhbHVlLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgZGVlcEdldCh2YWx1ZVtpXSwgcGF0aCwgaW5kZXggKyAxKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwYXRoLmxlbmd0aCkge1xuICAgICAgICAvLyBBbiBvYmplY3QuIFJlY3Vyc2UgZnVydGhlci5cbiAgICAgICAgZGVlcEdldCh2YWx1ZSwgcGF0aCwgaW5kZXggKyAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHkgKHNpbmNlIHBhdGggdXNlZCB0byBiZSBhIHN0cmluZylcbiAgZGVlcEdldChvYmosIGlzU3RyaW5nKHBhdGgpID8gcGF0aC5zcGxpdCgnLicpIDogcGF0aCwgMCk7XG4gIHJldHVybiBhcnIgPyBsaXN0IDogbGlzdFswXTtcbn1cblxudmFyIE1hdGNoT3B0aW9ucyA9IHtcbiAgLy8gV2hldGhlciB0aGUgbWF0Y2hlcyBzaG91bGQgYmUgaW5jbHVkZWQgaW4gdGhlIHJlc3VsdCBzZXQuIFdoZW4gYHRydWVgLCBlYWNoIHJlY29yZCBpbiB0aGUgcmVzdWx0XG4gIC8vIHNldCB3aWxsIGluY2x1ZGUgdGhlIGluZGljZXMgb2YgdGhlIG1hdGNoZWQgY2hhcmFjdGVycy5cbiAgLy8gVGhlc2UgY2FuIGNvbnNlcXVlbnRseSBiZSB1c2VkIGZvciBoaWdobGlnaHRpbmcgcHVycG9zZXMuXG4gIGluY2x1ZGVNYXRjaGVzOiBmYWxzZSxcbiAgLy8gV2hlbiBgdHJ1ZWAsIHRoZSBtYXRjaGluZyBmdW5jdGlvbiB3aWxsIGNvbnRpbnVlIHRvIHRoZSBlbmQgb2YgYSBzZWFyY2ggcGF0dGVybiBldmVuIGlmXG4gIC8vIGEgcGVyZmVjdCBtYXRjaCBoYXMgYWxyZWFkeSBiZWVuIGxvY2F0ZWQgaW4gdGhlIHN0cmluZy5cbiAgZmluZEFsbE1hdGNoZXM6IGZhbHNlLFxuICAvLyBNaW5pbXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRoYXQgbXVzdCBiZSBtYXRjaGVkIGJlZm9yZSBhIHJlc3VsdCBpcyBjb25zaWRlcmVkIGEgbWF0Y2hcbiAgbWluTWF0Y2hDaGFyTGVuZ3RoOiAxXG59O1xudmFyIEJhc2ljT3B0aW9ucyA9IHtcbiAgLy8gV2hlbiBgdHJ1ZWAsIHRoZSBhbGdvcml0aG0gY29udGludWVzIHNlYXJjaGluZyB0byB0aGUgZW5kIG9mIHRoZSBpbnB1dCBldmVuIGlmIGEgcGVyZmVjdFxuICAvLyBtYXRjaCBpcyBmb3VuZCBiZWZvcmUgdGhlIGVuZCBvZiB0aGUgc2FtZSBpbnB1dC5cbiAgaXNDYXNlU2Vuc2l0aXZlOiBmYWxzZSxcbiAgLy8gV2hlbiB0cnVlLCB0aGUgbWF0Y2hpbmcgZnVuY3Rpb24gd2lsbCBjb250aW51ZSB0byB0aGUgZW5kIG9mIGEgc2VhcmNoIHBhdHRlcm4gZXZlbiBpZlxuICBpbmNsdWRlU2NvcmU6IGZhbHNlLFxuICAvLyBMaXN0IG9mIHByb3BlcnRpZXMgdGhhdCB3aWxsIGJlIHNlYXJjaGVkLiBUaGlzIGFsc28gc3VwcG9ydHMgbmVzdGVkIHByb3BlcnRpZXMuXG4gIGtleXM6IFtdLFxuICAvLyBXaGV0aGVyIHRvIHNvcnQgdGhlIHJlc3VsdCBsaXN0LCBieSBzY29yZVxuICBzaG91bGRTb3J0OiB0cnVlLFxuICAvLyBEZWZhdWx0IHNvcnQgZnVuY3Rpb246IHNvcnQgYnkgYXNjZW5kaW5nIHNjb3JlLCBhc2NlbmRpbmcgaW5kZXhcbiAgc29ydEZuOiBmdW5jdGlvbiBzb3J0Rm4oYSwgYikge1xuICAgIHJldHVybiBhLnNjb3JlID09PSBiLnNjb3JlID8gYS5pZHggPCBiLmlkeCA/IC0xIDogMSA6IGEuc2NvcmUgPCBiLnNjb3JlID8gLTEgOiAxO1xuICB9XG59O1xudmFyIEZ1enp5T3B0aW9ucyA9IHtcbiAgLy8gQXBwcm94aW1hdGVseSB3aGVyZSBpbiB0aGUgdGV4dCBpcyB0aGUgcGF0dGVybiBleHBlY3RlZCB0byBiZSBmb3VuZD9cbiAgbG9jYXRpb246IDAsXG4gIC8vIEF0IHdoYXQgcG9pbnQgZG9lcyB0aGUgbWF0Y2ggYWxnb3JpdGhtIGdpdmUgdXAuIEEgdGhyZXNob2xkIG9mICcwLjAnIHJlcXVpcmVzIGEgcGVyZmVjdCBtYXRjaFxuICAvLyAob2YgYm90aCBsZXR0ZXJzIGFuZCBsb2NhdGlvbiksIGEgdGhyZXNob2xkIG9mICcxLjAnIHdvdWxkIG1hdGNoIGFueXRoaW5nLlxuICB0aHJlc2hvbGQ6IDAuNixcbiAgLy8gRGV0ZXJtaW5lcyBob3cgY2xvc2UgdGhlIG1hdGNoIG11c3QgYmUgdG8gdGhlIGZ1enp5IGxvY2F0aW9uIChzcGVjaWZpZWQgYWJvdmUpLlxuICAvLyBBbiBleGFjdCBsZXR0ZXIgbWF0Y2ggd2hpY2ggaXMgJ2Rpc3RhbmNlJyBjaGFyYWN0ZXJzIGF3YXkgZnJvbSB0aGUgZnV6enkgbG9jYXRpb25cbiAgLy8gd291bGQgc2NvcmUgYXMgYSBjb21wbGV0ZSBtaXNtYXRjaC4gQSBkaXN0YW5jZSBvZiAnMCcgcmVxdWlyZXMgdGhlIG1hdGNoIGJlIGF0XG4gIC8vIHRoZSBleGFjdCBsb2NhdGlvbiBzcGVjaWZpZWQsIGEgdGhyZXNob2xkIG9mICcxMDAwJyB3b3VsZCByZXF1aXJlIGEgcGVyZmVjdCBtYXRjaFxuICAvLyB0byBiZSB3aXRoaW4gODAwIGNoYXJhY3RlcnMgb2YgdGhlIGZ1enp5IGxvY2F0aW9uIHRvIGJlIGZvdW5kIHVzaW5nIGEgMC44IHRocmVzaG9sZC5cbiAgZGlzdGFuY2U6IDEwMFxufTtcbnZhciBBZHZhbmNlZE9wdGlvbnMgPSB7XG4gIC8vIFdoZW4gYHRydWVgLCBpdCBlbmFibGVzIHRoZSB1c2Ugb2YgdW5peC1saWtlIHNlYXJjaCBjb21tYW5kc1xuICB1c2VFeHRlbmRlZFNlYXJjaDogZmFsc2UsXG4gIC8vIFRoZSBnZXQgZnVuY3Rpb24gdG8gdXNlIHdoZW4gZmV0Y2hpbmcgYW4gb2JqZWN0J3MgcHJvcGVydGllcy5cbiAgLy8gVGhlIGRlZmF1bHQgd2lsbCBzZWFyY2ggbmVzdGVkIHBhdGhzICppZSBmb28uYmFyLmJheipcbiAgZ2V0Rm46IGdldCxcbiAgLy8gV2hlbiBgdHJ1ZWAsIHNlYXJjaCB3aWxsIGlnbm9yZSBgbG9jYXRpb25gIGFuZCBgZGlzdGFuY2VgLCBzbyBpdCB3b24ndCBtYXR0ZXJcbiAgLy8gd2hlcmUgaW4gdGhlIHN0cmluZyB0aGUgcGF0dGVybiBhcHBlYXJzLlxuICAvLyBNb3JlIGluZm86IGh0dHBzOi8vZnVzZWpzLmlvL2NvbmNlcHRzL3Njb3JpbmctdGhlb3J5Lmh0bWwjZnV6emluZXNzLXNjb3JlXG4gIGlnbm9yZUxvY2F0aW9uOiBmYWxzZSxcbiAgLy8gV2hlbiBgdHJ1ZWAsIHRoZSBjYWxjdWxhdGlvbiBmb3IgdGhlIHJlbGV2YW5jZSBzY29yZSAodXNlZCBmb3Igc29ydGluZykgd2lsbFxuICAvLyBpZ25vcmUgdGhlIGZpZWxkLWxlbmd0aCBub3JtLlxuICAvLyBNb3JlIGluZm86IGh0dHBzOi8vZnVzZWpzLmlvL2NvbmNlcHRzL3Njb3JpbmctdGhlb3J5Lmh0bWwjZmllbGQtbGVuZ3RoLW5vcm1cbiAgaWdub3JlRmllbGROb3JtOiBmYWxzZSxcbiAgLy8gVGhlIHdlaWdodCB0byBkZXRlcm1pbmUgaG93IG11Y2ggZmllbGQgbGVuZ3RoIG5vcm0gZWZmZWN0cyBzY29yaW5nLlxuICBmaWVsZE5vcm1XZWlnaHQ6IDFcbn07XG52YXIgQ29uZmlnID0gX29iamVjdFNwcmVhZDIoX29iamVjdFNwcmVhZDIoX29iamVjdFNwcmVhZDIoX29iamVjdFNwcmVhZDIoe30sIEJhc2ljT3B0aW9ucyksIE1hdGNoT3B0aW9ucyksIEZ1enp5T3B0aW9ucyksIEFkdmFuY2VkT3B0aW9ucyk7XG5cbnZhciBTUEFDRSA9IC9bXiBdKy9nO1xuXG4vLyBGaWVsZC1sZW5ndGggbm9ybTogdGhlIHNob3J0ZXIgdGhlIGZpZWxkLCB0aGUgaGlnaGVyIHRoZSB3ZWlnaHQuXG4vLyBTZXQgdG8gMyBkZWNpbWFscyB0byByZWR1Y2UgaW5kZXggc2l6ZS5cbmZ1bmN0aW9uIG5vcm0oKSB7XG4gIHZhciB3ZWlnaHQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDE7XG4gIHZhciBtYW50aXNzYSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMztcbiAgdmFyIGNhY2hlID0gbmV3IE1hcCgpO1xuICB2YXIgbSA9IE1hdGgucG93KDEwLCBtYW50aXNzYSk7XG4gIHJldHVybiB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQodmFsdWUpIHtcbiAgICAgIHZhciBudW1Ub2tlbnMgPSB2YWx1ZS5tYXRjaChTUEFDRSkubGVuZ3RoO1xuICAgICAgaWYgKGNhY2hlLmhhcyhudW1Ub2tlbnMpKSB7XG4gICAgICAgIHJldHVybiBjYWNoZS5nZXQobnVtVG9rZW5zKTtcbiAgICAgIH1cblxuICAgICAgLy8gRGVmYXVsdCBmdW5jdGlvbiBpcyAxL3NxcnQoeCksIHdlaWdodCBtYWtlcyB0aGF0IHZhcmlhYmxlXG4gICAgICB2YXIgbm9ybSA9IDEgLyBNYXRoLnBvdyhudW1Ub2tlbnMsIDAuNSAqIHdlaWdodCk7XG5cbiAgICAgIC8vIEluIHBsYWNlIG9mIGB0b0ZpeGVkKG1hbnRpc3NhKWAsIGZvciBmYXN0ZXIgY29tcHV0YXRpb25cbiAgICAgIHZhciBuID0gcGFyc2VGbG9hdChNYXRoLnJvdW5kKG5vcm0gKiBtKSAvIG0pO1xuICAgICAgY2FjaGUuc2V0KG51bVRva2Vucywgbik7XG4gICAgICByZXR1cm4gbjtcbiAgICB9LFxuICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIGNhY2hlLmNsZWFyKCk7XG4gICAgfVxuICB9O1xufVxuXG52YXIgRnVzZUluZGV4ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRnVzZUluZGV4KCkge1xuICAgIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fSxcbiAgICAgIF9yZWYkZ2V0Rm4gPSBfcmVmLmdldEZuLFxuICAgICAgZ2V0Rm4gPSBfcmVmJGdldEZuID09PSB2b2lkIDAgPyBDb25maWcuZ2V0Rm4gOiBfcmVmJGdldEZuLFxuICAgICAgX3JlZiRmaWVsZE5vcm1XZWlnaHQgPSBfcmVmLmZpZWxkTm9ybVdlaWdodCxcbiAgICAgIGZpZWxkTm9ybVdlaWdodCA9IF9yZWYkZmllbGROb3JtV2VpZ2h0ID09PSB2b2lkIDAgPyBDb25maWcuZmllbGROb3JtV2VpZ2h0IDogX3JlZiRmaWVsZE5vcm1XZWlnaHQ7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZ1c2VJbmRleCk7XG4gICAgdGhpcy5ub3JtID0gbm9ybShmaWVsZE5vcm1XZWlnaHQsIDMpO1xuICAgIHRoaXMuZ2V0Rm4gPSBnZXRGbjtcbiAgICB0aGlzLmlzQ3JlYXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuc2V0SW5kZXhSZWNvcmRzKCk7XG4gIH1cbiAgX2NyZWF0ZUNsYXNzKEZ1c2VJbmRleCwgW3tcbiAgICBrZXk6IFwic2V0U291cmNlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRTb3VyY2VzKCkge1xuICAgICAgdmFyIGRvY3MgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgICAgdGhpcy5kb2NzID0gZG9jcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0SW5kZXhSZWNvcmRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldEluZGV4UmVjb3JkcygpIHtcbiAgICAgIHZhciByZWNvcmRzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICAgIHRoaXMucmVjb3JkcyA9IHJlY29yZHM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNldEtleXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0S2V5cygpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICB2YXIga2V5cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogW107XG4gICAgICB0aGlzLmtleXMgPSBrZXlzO1xuICAgICAgdGhpcy5fa2V5c01hcCA9IHt9O1xuICAgICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXksIGlkeCkge1xuICAgICAgICBfdGhpcy5fa2V5c01hcFtrZXkuaWRdID0gaWR4O1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNyZWF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICAgIGlmICh0aGlzLmlzQ3JlYXRlZCB8fCAhdGhpcy5kb2NzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmlzQ3JlYXRlZCA9IHRydWU7XG5cbiAgICAgIC8vIExpc3QgaXMgQXJyYXk8U3RyaW5nPlxuICAgICAgaWYgKGlzU3RyaW5nKHRoaXMuZG9jc1swXSkpIHtcbiAgICAgICAgdGhpcy5kb2NzLmZvckVhY2goZnVuY3Rpb24gKGRvYywgZG9jSW5kZXgpIHtcbiAgICAgICAgICBfdGhpczIuX2FkZFN0cmluZyhkb2MsIGRvY0luZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBMaXN0IGlzIEFycmF5PE9iamVjdD5cbiAgICAgICAgdGhpcy5kb2NzLmZvckVhY2goZnVuY3Rpb24gKGRvYywgZG9jSW5kZXgpIHtcbiAgICAgICAgICBfdGhpczIuX2FkZE9iamVjdChkb2MsIGRvY0luZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLm5vcm0uY2xlYXIoKTtcbiAgICB9XG4gICAgLy8gQWRkcyBhIGRvYyB0byB0aGUgZW5kIG9mIHRoZSBpbmRleFxuICB9LCB7XG4gICAga2V5OiBcImFkZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGQoZG9jKSB7XG4gICAgICB2YXIgaWR4ID0gdGhpcy5zaXplKCk7XG4gICAgICBpZiAoaXNTdHJpbmcoZG9jKSkge1xuICAgICAgICB0aGlzLl9hZGRTdHJpbmcoZG9jLCBpZHgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fYWRkT2JqZWN0KGRvYywgaWR4KTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVtb3ZlcyB0aGUgZG9jIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggb2YgdGhlIGluZGV4XG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlQXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlQXQoaWR4KSB7XG4gICAgICB0aGlzLnJlY29yZHMuc3BsaWNlKGlkeCwgMSk7XG5cbiAgICAgIC8vIENoYW5nZSByZWYgaW5kZXggb2YgZXZlcnkgc3Vic3F1ZW50IGRvY1xuICAgICAgZm9yICh2YXIgaSA9IGlkeCwgbGVuID0gdGhpcy5zaXplKCk7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICB0aGlzLnJlY29yZHNbaV0uaSAtPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRWYWx1ZUZvckl0ZW1BdEtleUlkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFZhbHVlRm9ySXRlbUF0S2V5SWQoaXRlbSwga2V5SWQpIHtcbiAgICAgIHJldHVybiBpdGVtW3RoaXMuX2tleXNNYXBba2V5SWRdXTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2l6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzaXplKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVjb3Jkcy5sZW5ndGg7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9hZGRTdHJpbmdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2FkZFN0cmluZyhkb2MsIGRvY0luZGV4KSB7XG4gICAgICBpZiAoIWlzRGVmaW5lZChkb2MpIHx8IGlzQmxhbmsoZG9jKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgcmVjb3JkID0ge1xuICAgICAgICB2OiBkb2MsXG4gICAgICAgIGk6IGRvY0luZGV4LFxuICAgICAgICBuOiB0aGlzLm5vcm0uZ2V0KGRvYylcbiAgICAgIH07XG4gICAgICB0aGlzLnJlY29yZHMucHVzaChyZWNvcmQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfYWRkT2JqZWN0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9hZGRPYmplY3QoZG9jLCBkb2NJbmRleCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG4gICAgICB2YXIgcmVjb3JkID0ge1xuICAgICAgICBpOiBkb2NJbmRleCxcbiAgICAgICAgJDoge31cbiAgICAgIH07XG5cbiAgICAgIC8vIEl0ZXJhdGUgb3ZlciBldmVyeSBrZXkgKGkuZSwgcGF0aCksIGFuZCBmZXRjaCB0aGUgdmFsdWUgYXQgdGhhdCBrZXlcbiAgICAgIHRoaXMua2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXksIGtleUluZGV4KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGtleS5nZXRGbiA/IGtleS5nZXRGbihkb2MpIDogX3RoaXMzLmdldEZuKGRvYywga2V5LnBhdGgpO1xuICAgICAgICBpZiAoIWlzRGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgdmFyIHN1YlJlY29yZHMgPSBbXTtcbiAgICAgICAgICB2YXIgc3RhY2sgPSBbe1xuICAgICAgICAgICAgbmVzdGVkQXJySW5kZXg6IC0xLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgfV07XG4gICAgICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIF9zdGFjayRwb3AgPSBzdGFjay5wb3AoKSxcbiAgICAgICAgICAgICAgbmVzdGVkQXJySW5kZXggPSBfc3RhY2skcG9wLm5lc3RlZEFyckluZGV4LFxuICAgICAgICAgICAgICBfdmFsdWUgPSBfc3RhY2skcG9wLnZhbHVlO1xuICAgICAgICAgICAgaWYgKCFpc0RlZmluZWQoX3ZhbHVlKSkge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1N0cmluZyhfdmFsdWUpICYmICFpc0JsYW5rKF92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgdmFyIHN1YlJlY29yZCA9IHtcbiAgICAgICAgICAgICAgICB2OiBfdmFsdWUsXG4gICAgICAgICAgICAgICAgaTogbmVzdGVkQXJySW5kZXgsXG4gICAgICAgICAgICAgICAgbjogX3RoaXMzLm5vcm0uZ2V0KF92YWx1ZSlcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgc3ViUmVjb3Jkcy5wdXNoKHN1YlJlY29yZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoX3ZhbHVlKSkge1xuICAgICAgICAgICAgICBfdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaykge1xuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goe1xuICAgICAgICAgICAgICAgICAgbmVzdGVkQXJySW5kZXg6IGssXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlY29yZC4kW2tleUluZGV4XSA9IHN1YlJlY29yZHM7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcodmFsdWUpICYmICFpc0JsYW5rKHZhbHVlKSkge1xuICAgICAgICAgIHZhciBfc3ViUmVjb3JkID0ge1xuICAgICAgICAgICAgdjogdmFsdWUsXG4gICAgICAgICAgICBuOiBfdGhpczMubm9ybS5nZXQodmFsdWUpXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZWNvcmQuJFtrZXlJbmRleF0gPSBfc3ViUmVjb3JkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMucmVjb3Jkcy5wdXNoKHJlY29yZCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRvSlNPTlwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXlzOiB0aGlzLmtleXMsXG4gICAgICAgIHJlY29yZHM6IHRoaXMucmVjb3Jkc1xuICAgICAgfTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEZ1c2VJbmRleDtcbn0oKTtcbmZ1bmN0aW9uIGNyZWF0ZUluZGV4KGtleXMsIGRvY3MpIHtcbiAgdmFyIF9yZWYyID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fSxcbiAgICBfcmVmMiRnZXRGbiA9IF9yZWYyLmdldEZuLFxuICAgIGdldEZuID0gX3JlZjIkZ2V0Rm4gPT09IHZvaWQgMCA/IENvbmZpZy5nZXRGbiA6IF9yZWYyJGdldEZuLFxuICAgIF9yZWYyJGZpZWxkTm9ybVdlaWdodCA9IF9yZWYyLmZpZWxkTm9ybVdlaWdodCxcbiAgICBmaWVsZE5vcm1XZWlnaHQgPSBfcmVmMiRmaWVsZE5vcm1XZWlnaHQgPT09IHZvaWQgMCA/IENvbmZpZy5maWVsZE5vcm1XZWlnaHQgOiBfcmVmMiRmaWVsZE5vcm1XZWlnaHQ7XG4gIHZhciBteUluZGV4ID0gbmV3IEZ1c2VJbmRleCh7XG4gICAgZ2V0Rm46IGdldEZuLFxuICAgIGZpZWxkTm9ybVdlaWdodDogZmllbGROb3JtV2VpZ2h0XG4gIH0pO1xuICBteUluZGV4LnNldEtleXMoa2V5cy5tYXAoY3JlYXRlS2V5KSk7XG4gIG15SW5kZXguc2V0U291cmNlcyhkb2NzKTtcbiAgbXlJbmRleC5jcmVhdGUoKTtcbiAgcmV0dXJuIG15SW5kZXg7XG59XG5mdW5jdGlvbiBwYXJzZUluZGV4KGRhdGEpIHtcbiAgdmFyIF9yZWYzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fSxcbiAgICBfcmVmMyRnZXRGbiA9IF9yZWYzLmdldEZuLFxuICAgIGdldEZuID0gX3JlZjMkZ2V0Rm4gPT09IHZvaWQgMCA/IENvbmZpZy5nZXRGbiA6IF9yZWYzJGdldEZuLFxuICAgIF9yZWYzJGZpZWxkTm9ybVdlaWdodCA9IF9yZWYzLmZpZWxkTm9ybVdlaWdodCxcbiAgICBmaWVsZE5vcm1XZWlnaHQgPSBfcmVmMyRmaWVsZE5vcm1XZWlnaHQgPT09IHZvaWQgMCA/IENvbmZpZy5maWVsZE5vcm1XZWlnaHQgOiBfcmVmMyRmaWVsZE5vcm1XZWlnaHQ7XG4gIHZhciBrZXlzID0gZGF0YS5rZXlzLFxuICAgIHJlY29yZHMgPSBkYXRhLnJlY29yZHM7XG4gIHZhciBteUluZGV4ID0gbmV3IEZ1c2VJbmRleCh7XG4gICAgZ2V0Rm46IGdldEZuLFxuICAgIGZpZWxkTm9ybVdlaWdodDogZmllbGROb3JtV2VpZ2h0XG4gIH0pO1xuICBteUluZGV4LnNldEtleXMoa2V5cyk7XG4gIG15SW5kZXguc2V0SW5kZXhSZWNvcmRzKHJlY29yZHMpO1xuICByZXR1cm4gbXlJbmRleDtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZVNjb3JlJDEocGF0dGVybikge1xuICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge30sXG4gICAgX3JlZiRlcnJvcnMgPSBfcmVmLmVycm9ycyxcbiAgICBlcnJvcnMgPSBfcmVmJGVycm9ycyA9PT0gdm9pZCAwID8gMCA6IF9yZWYkZXJyb3JzLFxuICAgIF9yZWYkY3VycmVudExvY2F0aW9uID0gX3JlZi5jdXJyZW50TG9jYXRpb24sXG4gICAgY3VycmVudExvY2F0aW9uID0gX3JlZiRjdXJyZW50TG9jYXRpb24gPT09IHZvaWQgMCA/IDAgOiBfcmVmJGN1cnJlbnRMb2NhdGlvbixcbiAgICBfcmVmJGV4cGVjdGVkTG9jYXRpb24gPSBfcmVmLmV4cGVjdGVkTG9jYXRpb24sXG4gICAgZXhwZWN0ZWRMb2NhdGlvbiA9IF9yZWYkZXhwZWN0ZWRMb2NhdGlvbiA9PT0gdm9pZCAwID8gMCA6IF9yZWYkZXhwZWN0ZWRMb2NhdGlvbixcbiAgICBfcmVmJGRpc3RhbmNlID0gX3JlZi5kaXN0YW5jZSxcbiAgICBkaXN0YW5jZSA9IF9yZWYkZGlzdGFuY2UgPT09IHZvaWQgMCA/IENvbmZpZy5kaXN0YW5jZSA6IF9yZWYkZGlzdGFuY2UsXG4gICAgX3JlZiRpZ25vcmVMb2NhdGlvbiA9IF9yZWYuaWdub3JlTG9jYXRpb24sXG4gICAgaWdub3JlTG9jYXRpb24gPSBfcmVmJGlnbm9yZUxvY2F0aW9uID09PSB2b2lkIDAgPyBDb25maWcuaWdub3JlTG9jYXRpb24gOiBfcmVmJGlnbm9yZUxvY2F0aW9uO1xuICB2YXIgYWNjdXJhY3kgPSBlcnJvcnMgLyBwYXR0ZXJuLmxlbmd0aDtcbiAgaWYgKGlnbm9yZUxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIGFjY3VyYWN5O1xuICB9XG4gIHZhciBwcm94aW1pdHkgPSBNYXRoLmFicyhleHBlY3RlZExvY2F0aW9uIC0gY3VycmVudExvY2F0aW9uKTtcbiAgaWYgKCFkaXN0YW5jZSkge1xuICAgIC8vIERvZGdlIGRpdmlkZSBieSB6ZXJvIGVycm9yLlxuICAgIHJldHVybiBwcm94aW1pdHkgPyAxLjAgOiBhY2N1cmFjeTtcbiAgfVxuICByZXR1cm4gYWNjdXJhY3kgKyBwcm94aW1pdHkgLyBkaXN0YW5jZTtcbn1cblxuZnVuY3Rpb24gY29udmVydE1hc2tUb0luZGljZXMoKSB7XG4gIHZhciBtYXRjaG1hc2sgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICB2YXIgbWluTWF0Y2hDaGFyTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBDb25maWcubWluTWF0Y2hDaGFyTGVuZ3RoO1xuICB2YXIgaW5kaWNlcyA9IFtdO1xuICB2YXIgc3RhcnQgPSAtMTtcbiAgdmFyIGVuZCA9IC0xO1xuICB2YXIgaSA9IDA7XG4gIGZvciAodmFyIGxlbiA9IG1hdGNobWFzay5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgIHZhciBtYXRjaCA9IG1hdGNobWFza1tpXTtcbiAgICBpZiAobWF0Y2ggJiYgc3RhcnQgPT09IC0xKSB7XG4gICAgICBzdGFydCA9IGk7XG4gICAgfSBlbHNlIGlmICghbWF0Y2ggJiYgc3RhcnQgIT09IC0xKSB7XG4gICAgICBlbmQgPSBpIC0gMTtcbiAgICAgIGlmIChlbmQgLSBzdGFydCArIDEgPj0gbWluTWF0Y2hDaGFyTGVuZ3RoKSB7XG4gICAgICAgIGluZGljZXMucHVzaChbc3RhcnQsIGVuZF0pO1xuICAgICAgfVxuICAgICAgc3RhcnQgPSAtMTtcbiAgICB9XG4gIH1cblxuICAvLyAoaS0xIC0gc3RhcnQpICsgMSA9PiBpIC0gc3RhcnRcbiAgaWYgKG1hdGNobWFza1tpIC0gMV0gJiYgaSAtIHN0YXJ0ID49IG1pbk1hdGNoQ2hhckxlbmd0aCkge1xuICAgIGluZGljZXMucHVzaChbc3RhcnQsIGkgLSAxXSk7XG4gIH1cbiAgcmV0dXJuIGluZGljZXM7XG59XG5cbi8vIE1hY2hpbmUgd29yZCBzaXplXG52YXIgTUFYX0JJVFMgPSAzMjtcblxuZnVuY3Rpb24gc2VhcmNoKHRleHQsIHBhdHRlcm4sIHBhdHRlcm5BbHBoYWJldCkge1xuICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDoge30sXG4gICAgX3JlZiRsb2NhdGlvbiA9IF9yZWYubG9jYXRpb24sXG4gICAgbG9jYXRpb24gPSBfcmVmJGxvY2F0aW9uID09PSB2b2lkIDAgPyBDb25maWcubG9jYXRpb24gOiBfcmVmJGxvY2F0aW9uLFxuICAgIF9yZWYkZGlzdGFuY2UgPSBfcmVmLmRpc3RhbmNlLFxuICAgIGRpc3RhbmNlID0gX3JlZiRkaXN0YW5jZSA9PT0gdm9pZCAwID8gQ29uZmlnLmRpc3RhbmNlIDogX3JlZiRkaXN0YW5jZSxcbiAgICBfcmVmJHRocmVzaG9sZCA9IF9yZWYudGhyZXNob2xkLFxuICAgIHRocmVzaG9sZCA9IF9yZWYkdGhyZXNob2xkID09PSB2b2lkIDAgPyBDb25maWcudGhyZXNob2xkIDogX3JlZiR0aHJlc2hvbGQsXG4gICAgX3JlZiRmaW5kQWxsTWF0Y2hlcyA9IF9yZWYuZmluZEFsbE1hdGNoZXMsXG4gICAgZmluZEFsbE1hdGNoZXMgPSBfcmVmJGZpbmRBbGxNYXRjaGVzID09PSB2b2lkIDAgPyBDb25maWcuZmluZEFsbE1hdGNoZXMgOiBfcmVmJGZpbmRBbGxNYXRjaGVzLFxuICAgIF9yZWYkbWluTWF0Y2hDaGFyTGVuZyA9IF9yZWYubWluTWF0Y2hDaGFyTGVuZ3RoLFxuICAgIG1pbk1hdGNoQ2hhckxlbmd0aCA9IF9yZWYkbWluTWF0Y2hDaGFyTGVuZyA9PT0gdm9pZCAwID8gQ29uZmlnLm1pbk1hdGNoQ2hhckxlbmd0aCA6IF9yZWYkbWluTWF0Y2hDaGFyTGVuZyxcbiAgICBfcmVmJGluY2x1ZGVNYXRjaGVzID0gX3JlZi5pbmNsdWRlTWF0Y2hlcyxcbiAgICBpbmNsdWRlTWF0Y2hlcyA9IF9yZWYkaW5jbHVkZU1hdGNoZXMgPT09IHZvaWQgMCA/IENvbmZpZy5pbmNsdWRlTWF0Y2hlcyA6IF9yZWYkaW5jbHVkZU1hdGNoZXMsXG4gICAgX3JlZiRpZ25vcmVMb2NhdGlvbiA9IF9yZWYuaWdub3JlTG9jYXRpb24sXG4gICAgaWdub3JlTG9jYXRpb24gPSBfcmVmJGlnbm9yZUxvY2F0aW9uID09PSB2b2lkIDAgPyBDb25maWcuaWdub3JlTG9jYXRpb24gOiBfcmVmJGlnbm9yZUxvY2F0aW9uO1xuICBpZiAocGF0dGVybi5sZW5ndGggPiBNQVhfQklUUykge1xuICAgIHRocm93IG5ldyBFcnJvcihQQVRURVJOX0xFTkdUSF9UT09fTEFSR0UoTUFYX0JJVFMpKTtcbiAgfVxuICB2YXIgcGF0dGVybkxlbiA9IHBhdHRlcm4ubGVuZ3RoO1xuICAvLyBTZXQgc3RhcnRpbmcgbG9jYXRpb24gYXQgYmVnaW5uaW5nIHRleHQgYW5kIGluaXRpYWxpemUgdGhlIGFscGhhYmV0LlxuICB2YXIgdGV4dExlbiA9IHRleHQubGVuZ3RoO1xuICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlbiBsb2NhdGlvbiA+IHRleHQubGVuZ3RoXG4gIHZhciBleHBlY3RlZExvY2F0aW9uID0gTWF0aC5tYXgoMCwgTWF0aC5taW4obG9jYXRpb24sIHRleHRMZW4pKTtcbiAgLy8gSGlnaGVzdCBzY29yZSBiZXlvbmQgd2hpY2ggd2UgZ2l2ZSB1cC5cbiAgdmFyIGN1cnJlbnRUaHJlc2hvbGQgPSB0aHJlc2hvbGQ7XG4gIC8vIElzIHRoZXJlIGEgbmVhcmJ5IGV4YWN0IG1hdGNoPyAoc3BlZWR1cClcbiAgdmFyIGJlc3RMb2NhdGlvbiA9IGV4cGVjdGVkTG9jYXRpb247XG5cbiAgLy8gUGVyZm9ybWFuY2U6IG9ubHkgY29tcHV0ZXIgbWF0Y2hlcyB3aGVuIHRoZSBtaW5NYXRjaENoYXJMZW5ndGggPiAxXG4gIC8vIE9SIGlmIGBpbmNsdWRlTWF0Y2hlc2AgaXMgdHJ1ZS5cbiAgdmFyIGNvbXB1dGVNYXRjaGVzID0gbWluTWF0Y2hDaGFyTGVuZ3RoID4gMSB8fCBpbmNsdWRlTWF0Y2hlcztcbiAgLy8gQSBtYXNrIG9mIHRoZSBtYXRjaGVzLCB1c2VkIGZvciBidWlsZGluZyB0aGUgaW5kaWNlc1xuICB2YXIgbWF0Y2hNYXNrID0gY29tcHV0ZU1hdGNoZXMgPyBBcnJheSh0ZXh0TGVuKSA6IFtdO1xuICB2YXIgaW5kZXg7XG5cbiAgLy8gR2V0IGFsbCBleGFjdCBtYXRjaGVzLCBoZXJlIGZvciBzcGVlZCB1cFxuICB3aGlsZSAoKGluZGV4ID0gdGV4dC5pbmRleE9mKHBhdHRlcm4sIGJlc3RMb2NhdGlvbikpID4gLTEpIHtcbiAgICB2YXIgc2NvcmUgPSBjb21wdXRlU2NvcmUkMShwYXR0ZXJuLCB7XG4gICAgICBjdXJyZW50TG9jYXRpb246IGluZGV4LFxuICAgICAgZXhwZWN0ZWRMb2NhdGlvbjogZXhwZWN0ZWRMb2NhdGlvbixcbiAgICAgIGRpc3RhbmNlOiBkaXN0YW5jZSxcbiAgICAgIGlnbm9yZUxvY2F0aW9uOiBpZ25vcmVMb2NhdGlvblxuICAgIH0pO1xuICAgIGN1cnJlbnRUaHJlc2hvbGQgPSBNYXRoLm1pbihzY29yZSwgY3VycmVudFRocmVzaG9sZCk7XG4gICAgYmVzdExvY2F0aW9uID0gaW5kZXggKyBwYXR0ZXJuTGVuO1xuICAgIGlmIChjb21wdXRlTWF0Y2hlcykge1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgd2hpbGUgKGkgPCBwYXR0ZXJuTGVuKSB7XG4gICAgICAgIG1hdGNoTWFza1tpbmRleCArIGldID0gMTtcbiAgICAgICAgaSArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFJlc2V0IHRoZSBiZXN0IGxvY2F0aW9uXG4gIGJlc3RMb2NhdGlvbiA9IC0xO1xuICB2YXIgbGFzdEJpdEFyciA9IFtdO1xuICB2YXIgZmluYWxTY29yZSA9IDE7XG4gIHZhciBiaW5NYXggPSBwYXR0ZXJuTGVuICsgdGV4dExlbjtcbiAgdmFyIG1hc2sgPSAxIDw8IHBhdHRlcm5MZW4gLSAxO1xuICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgcGF0dGVybkxlbjsgX2kgKz0gMSkge1xuICAgIC8vIFNjYW4gZm9yIHRoZSBiZXN0IG1hdGNoOyBlYWNoIGl0ZXJhdGlvbiBhbGxvd3MgZm9yIG9uZSBtb3JlIGVycm9yLlxuICAgIC8vIFJ1biBhIGJpbmFyeSBzZWFyY2ggdG8gZGV0ZXJtaW5lIGhvdyBmYXIgZnJvbSB0aGUgbWF0Y2ggbG9jYXRpb24gd2UgY2FuIHN0cmF5XG4gICAgLy8gYXQgdGhpcyBlcnJvciBsZXZlbC5cbiAgICB2YXIgYmluTWluID0gMDtcbiAgICB2YXIgYmluTWlkID0gYmluTWF4O1xuICAgIHdoaWxlIChiaW5NaW4gPCBiaW5NaWQpIHtcbiAgICAgIHZhciBfc2NvcmUgPSBjb21wdXRlU2NvcmUkMShwYXR0ZXJuLCB7XG4gICAgICAgIGVycm9yczogX2ksXG4gICAgICAgIGN1cnJlbnRMb2NhdGlvbjogZXhwZWN0ZWRMb2NhdGlvbiArIGJpbk1pZCxcbiAgICAgICAgZXhwZWN0ZWRMb2NhdGlvbjogZXhwZWN0ZWRMb2NhdGlvbixcbiAgICAgICAgZGlzdGFuY2U6IGRpc3RhbmNlLFxuICAgICAgICBpZ25vcmVMb2NhdGlvbjogaWdub3JlTG9jYXRpb25cbiAgICAgIH0pO1xuICAgICAgaWYgKF9zY29yZSA8PSBjdXJyZW50VGhyZXNob2xkKSB7XG4gICAgICAgIGJpbk1pbiA9IGJpbk1pZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJpbk1heCA9IGJpbk1pZDtcbiAgICAgIH1cbiAgICAgIGJpbk1pZCA9IE1hdGguZmxvb3IoKGJpbk1heCAtIGJpbk1pbikgLyAyICsgYmluTWluKTtcbiAgICB9XG5cbiAgICAvLyBVc2UgdGhlIHJlc3VsdCBmcm9tIHRoaXMgaXRlcmF0aW9uIGFzIHRoZSBtYXhpbXVtIGZvciB0aGUgbmV4dC5cbiAgICBiaW5NYXggPSBiaW5NaWQ7XG4gICAgdmFyIHN0YXJ0ID0gTWF0aC5tYXgoMSwgZXhwZWN0ZWRMb2NhdGlvbiAtIGJpbk1pZCArIDEpO1xuICAgIHZhciBmaW5pc2ggPSBmaW5kQWxsTWF0Y2hlcyA/IHRleHRMZW4gOiBNYXRoLm1pbihleHBlY3RlZExvY2F0aW9uICsgYmluTWlkLCB0ZXh0TGVuKSArIHBhdHRlcm5MZW47XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBiaXQgYXJyYXlcbiAgICB2YXIgYml0QXJyID0gQXJyYXkoZmluaXNoICsgMik7XG4gICAgYml0QXJyW2ZpbmlzaCArIDFdID0gKDEgPDwgX2kpIC0gMTtcbiAgICBmb3IgKHZhciBqID0gZmluaXNoOyBqID49IHN0YXJ0OyBqIC09IDEpIHtcbiAgICAgIHZhciBjdXJyZW50TG9jYXRpb24gPSBqIC0gMTtcbiAgICAgIHZhciBjaGFyTWF0Y2ggPSBwYXR0ZXJuQWxwaGFiZXRbdGV4dC5jaGFyQXQoY3VycmVudExvY2F0aW9uKV07XG4gICAgICBpZiAoY29tcHV0ZU1hdGNoZXMpIHtcbiAgICAgICAgLy8gU3BlZWQgdXA6IHF1aWNrIGJvb2wgdG8gaW50IGNvbnZlcnNpb24gKGkuZSwgYGNoYXJNYXRjaCA/IDEgOiAwYClcbiAgICAgICAgbWF0Y2hNYXNrW2N1cnJlbnRMb2NhdGlvbl0gPSArISFjaGFyTWF0Y2g7XG4gICAgICB9XG5cbiAgICAgIC8vIEZpcnN0IHBhc3M6IGV4YWN0IG1hdGNoXG4gICAgICBiaXRBcnJbal0gPSAoYml0QXJyW2ogKyAxXSA8PCAxIHwgMSkgJiBjaGFyTWF0Y2g7XG5cbiAgICAgIC8vIFN1YnNlcXVlbnQgcGFzc2VzOiBmdXp6eSBtYXRjaFxuICAgICAgaWYgKF9pKSB7XG4gICAgICAgIGJpdEFycltqXSB8PSAobGFzdEJpdEFycltqICsgMV0gfCBsYXN0Qml0QXJyW2pdKSA8PCAxIHwgMSB8IGxhc3RCaXRBcnJbaiArIDFdO1xuICAgICAgfVxuICAgICAgaWYgKGJpdEFycltqXSAmIG1hc2spIHtcbiAgICAgICAgZmluYWxTY29yZSA9IGNvbXB1dGVTY29yZSQxKHBhdHRlcm4sIHtcbiAgICAgICAgICBlcnJvcnM6IF9pLFxuICAgICAgICAgIGN1cnJlbnRMb2NhdGlvbjogY3VycmVudExvY2F0aW9uLFxuICAgICAgICAgIGV4cGVjdGVkTG9jYXRpb246IGV4cGVjdGVkTG9jYXRpb24sXG4gICAgICAgICAgZGlzdGFuY2U6IGRpc3RhbmNlLFxuICAgICAgICAgIGlnbm9yZUxvY2F0aW9uOiBpZ25vcmVMb2NhdGlvblxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBUaGlzIG1hdGNoIHdpbGwgYWxtb3N0IGNlcnRhaW5seSBiZSBiZXR0ZXIgdGhhbiBhbnkgZXhpc3RpbmcgbWF0Y2guXG4gICAgICAgIC8vIEJ1dCBjaGVjayBhbnl3YXkuXG4gICAgICAgIGlmIChmaW5hbFNjb3JlIDw9IGN1cnJlbnRUaHJlc2hvbGQpIHtcbiAgICAgICAgICAvLyBJbmRlZWQgaXQgaXNcbiAgICAgICAgICBjdXJyZW50VGhyZXNob2xkID0gZmluYWxTY29yZTtcbiAgICAgICAgICBiZXN0TG9jYXRpb24gPSBjdXJyZW50TG9jYXRpb247XG5cbiAgICAgICAgICAvLyBBbHJlYWR5IHBhc3NlZCBgbG9jYCwgZG93bmhpbGwgZnJvbSBoZXJlIG9uIGluLlxuICAgICAgICAgIGlmIChiZXN0TG9jYXRpb24gPD0gZXhwZWN0ZWRMb2NhdGlvbikge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gV2hlbiBwYXNzaW5nIGBiZXN0TG9jYXRpb25gLCBkb24ndCBleGNlZWQgb3VyIGN1cnJlbnQgZGlzdGFuY2UgZnJvbSBgZXhwZWN0ZWRMb2NhdGlvbmAuXG4gICAgICAgICAgc3RhcnQgPSBNYXRoLm1heCgxLCAyICogZXhwZWN0ZWRMb2NhdGlvbiAtIGJlc3RMb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBObyBob3BlIGZvciBhIChiZXR0ZXIpIG1hdGNoIGF0IGdyZWF0ZXIgZXJyb3IgbGV2ZWxzLlxuICAgIHZhciBfc2NvcmUyID0gY29tcHV0ZVNjb3JlJDEocGF0dGVybiwge1xuICAgICAgZXJyb3JzOiBfaSArIDEsXG4gICAgICBjdXJyZW50TG9jYXRpb246IGV4cGVjdGVkTG9jYXRpb24sXG4gICAgICBleHBlY3RlZExvY2F0aW9uOiBleHBlY3RlZExvY2F0aW9uLFxuICAgICAgZGlzdGFuY2U6IGRpc3RhbmNlLFxuICAgICAgaWdub3JlTG9jYXRpb246IGlnbm9yZUxvY2F0aW9uXG4gICAgfSk7XG4gICAgaWYgKF9zY29yZTIgPiBjdXJyZW50VGhyZXNob2xkKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbGFzdEJpdEFyciA9IGJpdEFycjtcbiAgfVxuICB2YXIgcmVzdWx0ID0ge1xuICAgIGlzTWF0Y2g6IGJlc3RMb2NhdGlvbiA+PSAwLFxuICAgIC8vIENvdW50IGV4YWN0IG1hdGNoZXMgKHRob3NlIHdpdGggYSBzY29yZSBvZiAwKSB0byBiZSBcImFsbW9zdFwiIGV4YWN0XG4gICAgc2NvcmU6IE1hdGgubWF4KDAuMDAxLCBmaW5hbFNjb3JlKVxuICB9O1xuICBpZiAoY29tcHV0ZU1hdGNoZXMpIHtcbiAgICB2YXIgaW5kaWNlcyA9IGNvbnZlcnRNYXNrVG9JbmRpY2VzKG1hdGNoTWFzaywgbWluTWF0Y2hDaGFyTGVuZ3RoKTtcbiAgICBpZiAoIWluZGljZXMubGVuZ3RoKSB7XG4gICAgICByZXN1bHQuaXNNYXRjaCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoaW5jbHVkZU1hdGNoZXMpIHtcbiAgICAgIHJlc3VsdC5pbmRpY2VzID0gaW5kaWNlcztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGF0dGVybkFscGhhYmV0KHBhdHRlcm4pIHtcbiAgdmFyIG1hc2sgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhdHRlcm4ubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICB2YXIgX2NoYXIgPSBwYXR0ZXJuLmNoYXJBdChpKTtcbiAgICBtYXNrW19jaGFyXSA9IChtYXNrW19jaGFyXSB8fCAwKSB8IDEgPDwgbGVuIC0gaSAtIDE7XG4gIH1cbiAgcmV0dXJuIG1hc2s7XG59XG5cbnZhciBCaXRhcFNlYXJjaCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEJpdGFwU2VhcmNoKHBhdHRlcm4pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fSxcbiAgICAgIF9yZWYkbG9jYXRpb24gPSBfcmVmLmxvY2F0aW9uLFxuICAgICAgbG9jYXRpb24gPSBfcmVmJGxvY2F0aW9uID09PSB2b2lkIDAgPyBDb25maWcubG9jYXRpb24gOiBfcmVmJGxvY2F0aW9uLFxuICAgICAgX3JlZiR0aHJlc2hvbGQgPSBfcmVmLnRocmVzaG9sZCxcbiAgICAgIHRocmVzaG9sZCA9IF9yZWYkdGhyZXNob2xkID09PSB2b2lkIDAgPyBDb25maWcudGhyZXNob2xkIDogX3JlZiR0aHJlc2hvbGQsXG4gICAgICBfcmVmJGRpc3RhbmNlID0gX3JlZi5kaXN0YW5jZSxcbiAgICAgIGRpc3RhbmNlID0gX3JlZiRkaXN0YW5jZSA9PT0gdm9pZCAwID8gQ29uZmlnLmRpc3RhbmNlIDogX3JlZiRkaXN0YW5jZSxcbiAgICAgIF9yZWYkaW5jbHVkZU1hdGNoZXMgPSBfcmVmLmluY2x1ZGVNYXRjaGVzLFxuICAgICAgaW5jbHVkZU1hdGNoZXMgPSBfcmVmJGluY2x1ZGVNYXRjaGVzID09PSB2b2lkIDAgPyBDb25maWcuaW5jbHVkZU1hdGNoZXMgOiBfcmVmJGluY2x1ZGVNYXRjaGVzLFxuICAgICAgX3JlZiRmaW5kQWxsTWF0Y2hlcyA9IF9yZWYuZmluZEFsbE1hdGNoZXMsXG4gICAgICBmaW5kQWxsTWF0Y2hlcyA9IF9yZWYkZmluZEFsbE1hdGNoZXMgPT09IHZvaWQgMCA/IENvbmZpZy5maW5kQWxsTWF0Y2hlcyA6IF9yZWYkZmluZEFsbE1hdGNoZXMsXG4gICAgICBfcmVmJG1pbk1hdGNoQ2hhckxlbmcgPSBfcmVmLm1pbk1hdGNoQ2hhckxlbmd0aCxcbiAgICAgIG1pbk1hdGNoQ2hhckxlbmd0aCA9IF9yZWYkbWluTWF0Y2hDaGFyTGVuZyA9PT0gdm9pZCAwID8gQ29uZmlnLm1pbk1hdGNoQ2hhckxlbmd0aCA6IF9yZWYkbWluTWF0Y2hDaGFyTGVuZyxcbiAgICAgIF9yZWYkaXNDYXNlU2Vuc2l0aXZlID0gX3JlZi5pc0Nhc2VTZW5zaXRpdmUsXG4gICAgICBpc0Nhc2VTZW5zaXRpdmUgPSBfcmVmJGlzQ2FzZVNlbnNpdGl2ZSA9PT0gdm9pZCAwID8gQ29uZmlnLmlzQ2FzZVNlbnNpdGl2ZSA6IF9yZWYkaXNDYXNlU2Vuc2l0aXZlLFxuICAgICAgX3JlZiRpZ25vcmVMb2NhdGlvbiA9IF9yZWYuaWdub3JlTG9jYXRpb24sXG4gICAgICBpZ25vcmVMb2NhdGlvbiA9IF9yZWYkaWdub3JlTG9jYXRpb24gPT09IHZvaWQgMCA/IENvbmZpZy5pZ25vcmVMb2NhdGlvbiA6IF9yZWYkaWdub3JlTG9jYXRpb247XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJpdGFwU2VhcmNoKTtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICBsb2NhdGlvbjogbG9jYXRpb24sXG4gICAgICB0aHJlc2hvbGQ6IHRocmVzaG9sZCxcbiAgICAgIGRpc3RhbmNlOiBkaXN0YW5jZSxcbiAgICAgIGluY2x1ZGVNYXRjaGVzOiBpbmNsdWRlTWF0Y2hlcyxcbiAgICAgIGZpbmRBbGxNYXRjaGVzOiBmaW5kQWxsTWF0Y2hlcyxcbiAgICAgIG1pbk1hdGNoQ2hhckxlbmd0aDogbWluTWF0Y2hDaGFyTGVuZ3RoLFxuICAgICAgaXNDYXNlU2Vuc2l0aXZlOiBpc0Nhc2VTZW5zaXRpdmUsXG4gICAgICBpZ25vcmVMb2NhdGlvbjogaWdub3JlTG9jYXRpb25cbiAgICB9O1xuICAgIHRoaXMucGF0dGVybiA9IGlzQ2FzZVNlbnNpdGl2ZSA/IHBhdHRlcm4gOiBwYXR0ZXJuLnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy5jaHVua3MgPSBbXTtcbiAgICBpZiAoIXRoaXMucGF0dGVybi5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGFkZENodW5rID0gZnVuY3Rpb24gYWRkQ2h1bmsocGF0dGVybiwgc3RhcnRJbmRleCkge1xuICAgICAgX3RoaXMuY2h1bmtzLnB1c2goe1xuICAgICAgICBwYXR0ZXJuOiBwYXR0ZXJuLFxuICAgICAgICBhbHBoYWJldDogY3JlYXRlUGF0dGVybkFscGhhYmV0KHBhdHRlcm4pLFxuICAgICAgICBzdGFydEluZGV4OiBzdGFydEluZGV4XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBsZW4gPSB0aGlzLnBhdHRlcm4ubGVuZ3RoO1xuICAgIGlmIChsZW4gPiBNQVhfQklUUykge1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgdmFyIHJlbWFpbmRlciA9IGxlbiAlIE1BWF9CSVRTO1xuICAgICAgdmFyIGVuZCA9IGxlbiAtIHJlbWFpbmRlcjtcbiAgICAgIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgICAgIGFkZENodW5rKHRoaXMucGF0dGVybi5zdWJzdHIoaSwgTUFYX0JJVFMpLCBpKTtcbiAgICAgICAgaSArPSBNQVhfQklUUztcbiAgICAgIH1cbiAgICAgIGlmIChyZW1haW5kZXIpIHtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZXggPSBsZW4gLSBNQVhfQklUUztcbiAgICAgICAgYWRkQ2h1bmsodGhpcy5wYXR0ZXJuLnN1YnN0cihzdGFydEluZGV4KSwgc3RhcnRJbmRleCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZENodW5rKHRoaXMucGF0dGVybiwgMCk7XG4gICAgfVxuICB9XG4gIF9jcmVhdGVDbGFzcyhCaXRhcFNlYXJjaCwgW3tcbiAgICBrZXk6IFwic2VhcmNoSW5cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2VhcmNoSW4odGV4dCkge1xuICAgICAgdmFyIF90aGlzJG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXG4gICAgICAgIGlzQ2FzZVNlbnNpdGl2ZSA9IF90aGlzJG9wdGlvbnMuaXNDYXNlU2Vuc2l0aXZlLFxuICAgICAgICBpbmNsdWRlTWF0Y2hlcyA9IF90aGlzJG9wdGlvbnMuaW5jbHVkZU1hdGNoZXM7XG4gICAgICBpZiAoIWlzQ2FzZVNlbnNpdGl2ZSkge1xuICAgICAgICB0ZXh0ID0gdGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBFeGFjdCBtYXRjaFxuICAgICAgaWYgKHRoaXMucGF0dGVybiA9PT0gdGV4dCkge1xuICAgICAgICB2YXIgX3Jlc3VsdCA9IHtcbiAgICAgICAgICBpc01hdGNoOiB0cnVlLFxuICAgICAgICAgIHNjb3JlOiAwXG4gICAgICAgIH07XG4gICAgICAgIGlmIChpbmNsdWRlTWF0Y2hlcykge1xuICAgICAgICAgIF9yZXN1bHQuaW5kaWNlcyA9IFtbMCwgdGV4dC5sZW5ndGggLSAxXV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9yZXN1bHQ7XG4gICAgICB9XG5cbiAgICAgIC8vIE90aGVyd2lzZSwgdXNlIEJpdGFwIGFsZ29yaXRobVxuICAgICAgdmFyIF90aGlzJG9wdGlvbnMyID0gdGhpcy5vcHRpb25zLFxuICAgICAgICBsb2NhdGlvbiA9IF90aGlzJG9wdGlvbnMyLmxvY2F0aW9uLFxuICAgICAgICBkaXN0YW5jZSA9IF90aGlzJG9wdGlvbnMyLmRpc3RhbmNlLFxuICAgICAgICB0aHJlc2hvbGQgPSBfdGhpcyRvcHRpb25zMi50aHJlc2hvbGQsXG4gICAgICAgIGZpbmRBbGxNYXRjaGVzID0gX3RoaXMkb3B0aW9uczIuZmluZEFsbE1hdGNoZXMsXG4gICAgICAgIG1pbk1hdGNoQ2hhckxlbmd0aCA9IF90aGlzJG9wdGlvbnMyLm1pbk1hdGNoQ2hhckxlbmd0aCxcbiAgICAgICAgaWdub3JlTG9jYXRpb24gPSBfdGhpcyRvcHRpb25zMi5pZ25vcmVMb2NhdGlvbjtcbiAgICAgIHZhciBhbGxJbmRpY2VzID0gW107XG4gICAgICB2YXIgdG90YWxTY29yZSA9IDA7XG4gICAgICB2YXIgaGFzTWF0Y2hlcyA9IGZhbHNlO1xuICAgICAgdGhpcy5jaHVua3MuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgICAgdmFyIHBhdHRlcm4gPSBfcmVmMi5wYXR0ZXJuLFxuICAgICAgICAgIGFscGhhYmV0ID0gX3JlZjIuYWxwaGFiZXQsXG4gICAgICAgICAgc3RhcnRJbmRleCA9IF9yZWYyLnN0YXJ0SW5kZXg7XG4gICAgICAgIHZhciBfc2VhcmNoID0gc2VhcmNoKHRleHQsIHBhdHRlcm4sIGFscGhhYmV0LCB7XG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24gKyBzdGFydEluZGV4LFxuICAgICAgICAgICAgZGlzdGFuY2U6IGRpc3RhbmNlLFxuICAgICAgICAgICAgdGhyZXNob2xkOiB0aHJlc2hvbGQsXG4gICAgICAgICAgICBmaW5kQWxsTWF0Y2hlczogZmluZEFsbE1hdGNoZXMsXG4gICAgICAgICAgICBtaW5NYXRjaENoYXJMZW5ndGg6IG1pbk1hdGNoQ2hhckxlbmd0aCxcbiAgICAgICAgICAgIGluY2x1ZGVNYXRjaGVzOiBpbmNsdWRlTWF0Y2hlcyxcbiAgICAgICAgICAgIGlnbm9yZUxvY2F0aW9uOiBpZ25vcmVMb2NhdGlvblxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGlzTWF0Y2ggPSBfc2VhcmNoLmlzTWF0Y2gsXG4gICAgICAgICAgc2NvcmUgPSBfc2VhcmNoLnNjb3JlLFxuICAgICAgICAgIGluZGljZXMgPSBfc2VhcmNoLmluZGljZXM7XG4gICAgICAgIGlmIChpc01hdGNoKSB7XG4gICAgICAgICAgaGFzTWF0Y2hlcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdG90YWxTY29yZSArPSBzY29yZTtcbiAgICAgICAgaWYgKGlzTWF0Y2ggJiYgaW5kaWNlcykge1xuICAgICAgICAgIGFsbEluZGljZXMgPSBbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGFsbEluZGljZXMpLCBfdG9Db25zdW1hYmxlQXJyYXkoaW5kaWNlcykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIGlzTWF0Y2g6IGhhc01hdGNoZXMsXG4gICAgICAgIHNjb3JlOiBoYXNNYXRjaGVzID8gdG90YWxTY29yZSAvIHRoaXMuY2h1bmtzLmxlbmd0aCA6IDFcbiAgICAgIH07XG4gICAgICBpZiAoaGFzTWF0Y2hlcyAmJiBpbmNsdWRlTWF0Y2hlcykge1xuICAgICAgICByZXN1bHQuaW5kaWNlcyA9IGFsbEluZGljZXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQml0YXBTZWFyY2g7XG59KCk7XG5cbnZhciBCYXNlTWF0Y2ggPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBCYXNlTWF0Y2gocGF0dGVybikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCYXNlTWF0Y2gpO1xuICAgIHRoaXMucGF0dGVybiA9IHBhdHRlcm47XG4gIH1cbiAgX2NyZWF0ZUNsYXNzKEJhc2VNYXRjaCwgW3tcbiAgICBrZXk6IFwic2VhcmNoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNlYXJjaCggLyp0ZXh0Ki8pIHt9XG4gIH1dLCBbe1xuICAgIGtleTogXCJpc011bHRpTWF0Y2hcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNNdWx0aU1hdGNoKHBhdHRlcm4pIHtcbiAgICAgIHJldHVybiBnZXRNYXRjaChwYXR0ZXJuLCB0aGlzLm11bHRpUmVnZXgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpc1NpbmdsZU1hdGNoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzU2luZ2xlTWF0Y2gocGF0dGVybikge1xuICAgICAgcmV0dXJuIGdldE1hdGNoKHBhdHRlcm4sIHRoaXMuc2luZ2xlUmVnZXgpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQmFzZU1hdGNoO1xufSgpO1xuZnVuY3Rpb24gZ2V0TWF0Y2gocGF0dGVybiwgZXhwKSB7XG4gIHZhciBtYXRjaGVzID0gcGF0dGVybi5tYXRjaChleHApO1xuICByZXR1cm4gbWF0Y2hlcyA/IG1hdGNoZXNbMV0gOiBudWxsO1xufVxuXG52YXIgRXhhY3RNYXRjaCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0Jhc2VNYXRjaCkge1xuICBfaW5oZXJpdHMoRXhhY3RNYXRjaCwgX0Jhc2VNYXRjaCk7XG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoRXhhY3RNYXRjaCk7XG4gIGZ1bmN0aW9uIEV4YWN0TWF0Y2gocGF0dGVybikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFeGFjdE1hdGNoKTtcbiAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgcGF0dGVybik7XG4gIH1cbiAgX2NyZWF0ZUNsYXNzKEV4YWN0TWF0Y2gsIFt7XG4gICAga2V5OiBcInNlYXJjaFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZWFyY2godGV4dCkge1xuICAgICAgdmFyIGlzTWF0Y2ggPSB0ZXh0ID09PSB0aGlzLnBhdHRlcm47XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc01hdGNoOiBpc01hdGNoLFxuICAgICAgICBzY29yZTogaXNNYXRjaCA/IDAgOiAxLFxuICAgICAgICBpbmRpY2VzOiBbMCwgdGhpcy5wYXR0ZXJuLmxlbmd0aCAtIDFdXG4gICAgICB9O1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcInR5cGVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiAnZXhhY3QnO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJtdWx0aVJlZ2V4XCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gL149XCIoLiopXCIkLztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2luZ2xlUmVnZXhcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiAvXj0oLiopJC87XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBFeGFjdE1hdGNoO1xufShCYXNlTWF0Y2gpO1xuXG52YXIgSW52ZXJzZUV4YWN0TWF0Y2ggPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9CYXNlTWF0Y2gpIHtcbiAgX2luaGVyaXRzKEludmVyc2VFeGFjdE1hdGNoLCBfQmFzZU1hdGNoKTtcbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihJbnZlcnNlRXhhY3RNYXRjaCk7XG4gIGZ1bmN0aW9uIEludmVyc2VFeGFjdE1hdGNoKHBhdHRlcm4pIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgSW52ZXJzZUV4YWN0TWF0Y2gpO1xuICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBwYXR0ZXJuKTtcbiAgfVxuICBfY3JlYXRlQ2xhc3MoSW52ZXJzZUV4YWN0TWF0Y2gsIFt7XG4gICAga2V5OiBcInNlYXJjaFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZWFyY2godGV4dCkge1xuICAgICAgdmFyIGluZGV4ID0gdGV4dC5pbmRleE9mKHRoaXMucGF0dGVybik7XG4gICAgICB2YXIgaXNNYXRjaCA9IGluZGV4ID09PSAtMTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzTWF0Y2g6IGlzTWF0Y2gsXG4gICAgICAgIHNjb3JlOiBpc01hdGNoID8gMCA6IDEsXG4gICAgICAgIGluZGljZXM6IFswLCB0ZXh0Lmxlbmd0aCAtIDFdXG4gICAgICB9O1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcInR5cGVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiAnaW52ZXJzZS1leGFjdCc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm11bHRpUmVnZXhcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiAvXiFcIiguKilcIiQvO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzaW5nbGVSZWdleFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIC9eISguKikkLztcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEludmVyc2VFeGFjdE1hdGNoO1xufShCYXNlTWF0Y2gpO1xuXG52YXIgUHJlZml4RXhhY3RNYXRjaCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0Jhc2VNYXRjaCkge1xuICBfaW5oZXJpdHMoUHJlZml4RXhhY3RNYXRjaCwgX0Jhc2VNYXRjaCk7XG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoUHJlZml4RXhhY3RNYXRjaCk7XG4gIGZ1bmN0aW9uIFByZWZpeEV4YWN0TWF0Y2gocGF0dGVybikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQcmVmaXhFeGFjdE1hdGNoKTtcbiAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgcGF0dGVybik7XG4gIH1cbiAgX2NyZWF0ZUNsYXNzKFByZWZpeEV4YWN0TWF0Y2gsIFt7XG4gICAga2V5OiBcInNlYXJjaFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZWFyY2godGV4dCkge1xuICAgICAgdmFyIGlzTWF0Y2ggPSB0ZXh0LnN0YXJ0c1dpdGgodGhpcy5wYXR0ZXJuKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzTWF0Y2g6IGlzTWF0Y2gsXG4gICAgICAgIHNjb3JlOiBpc01hdGNoID8gMCA6IDEsXG4gICAgICAgIGluZGljZXM6IFswLCB0aGlzLnBhdHRlcm4ubGVuZ3RoIC0gMV1cbiAgICAgIH07XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwidHlwZVwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuICdwcmVmaXgtZXhhY3QnO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJtdWx0aVJlZ2V4XCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gL15cXF5cIiguKilcIiQvO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzaW5nbGVSZWdleFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIC9eXFxeKC4qKSQvO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gUHJlZml4RXhhY3RNYXRjaDtcbn0oQmFzZU1hdGNoKTtcblxudmFyIEludmVyc2VQcmVmaXhFeGFjdE1hdGNoID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfQmFzZU1hdGNoKSB7XG4gIF9pbmhlcml0cyhJbnZlcnNlUHJlZml4RXhhY3RNYXRjaCwgX0Jhc2VNYXRjaCk7XG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoSW52ZXJzZVByZWZpeEV4YWN0TWF0Y2gpO1xuICBmdW5jdGlvbiBJbnZlcnNlUHJlZml4RXhhY3RNYXRjaChwYXR0ZXJuKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEludmVyc2VQcmVmaXhFeGFjdE1hdGNoKTtcbiAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgcGF0dGVybik7XG4gIH1cbiAgX2NyZWF0ZUNsYXNzKEludmVyc2VQcmVmaXhFeGFjdE1hdGNoLCBbe1xuICAgIGtleTogXCJzZWFyY2hcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2VhcmNoKHRleHQpIHtcbiAgICAgIHZhciBpc01hdGNoID0gIXRleHQuc3RhcnRzV2l0aCh0aGlzLnBhdHRlcm4pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXNNYXRjaDogaXNNYXRjaCxcbiAgICAgICAgc2NvcmU6IGlzTWF0Y2ggPyAwIDogMSxcbiAgICAgICAgaW5kaWNlczogWzAsIHRleHQubGVuZ3RoIC0gMV1cbiAgICAgIH07XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwidHlwZVwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuICdpbnZlcnNlLXByZWZpeC1leGFjdCc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm11bHRpUmVnZXhcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiAvXiFcXF5cIiguKilcIiQvO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzaW5nbGVSZWdleFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIC9eIVxcXiguKikkLztcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEludmVyc2VQcmVmaXhFeGFjdE1hdGNoO1xufShCYXNlTWF0Y2gpO1xuXG52YXIgU3VmZml4RXhhY3RNYXRjaCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0Jhc2VNYXRjaCkge1xuICBfaW5oZXJpdHMoU3VmZml4RXhhY3RNYXRjaCwgX0Jhc2VNYXRjaCk7XG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoU3VmZml4RXhhY3RNYXRjaCk7XG4gIGZ1bmN0aW9uIFN1ZmZpeEV4YWN0TWF0Y2gocGF0dGVybikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTdWZmaXhFeGFjdE1hdGNoKTtcbiAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgcGF0dGVybik7XG4gIH1cbiAgX2NyZWF0ZUNsYXNzKFN1ZmZpeEV4YWN0TWF0Y2gsIFt7XG4gICAga2V5OiBcInNlYXJjaFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZWFyY2godGV4dCkge1xuICAgICAgdmFyIGlzTWF0Y2ggPSB0ZXh0LmVuZHNXaXRoKHRoaXMucGF0dGVybik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc01hdGNoOiBpc01hdGNoLFxuICAgICAgICBzY29yZTogaXNNYXRjaCA/IDAgOiAxLFxuICAgICAgICBpbmRpY2VzOiBbdGV4dC5sZW5ndGggLSB0aGlzLnBhdHRlcm4ubGVuZ3RoLCB0ZXh0Lmxlbmd0aCAtIDFdXG4gICAgICB9O1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcInR5cGVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiAnc3VmZml4LWV4YWN0JztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibXVsdGlSZWdleFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIC9eXCIoLiopXCJcXCQkLztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2luZ2xlUmVnZXhcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiAvXiguKilcXCQkLztcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFN1ZmZpeEV4YWN0TWF0Y2g7XG59KEJhc2VNYXRjaCk7XG5cbnZhciBJbnZlcnNlU3VmZml4RXhhY3RNYXRjaCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0Jhc2VNYXRjaCkge1xuICBfaW5oZXJpdHMoSW52ZXJzZVN1ZmZpeEV4YWN0TWF0Y2gsIF9CYXNlTWF0Y2gpO1xuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKEludmVyc2VTdWZmaXhFeGFjdE1hdGNoKTtcbiAgZnVuY3Rpb24gSW52ZXJzZVN1ZmZpeEV4YWN0TWF0Y2gocGF0dGVybikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBJbnZlcnNlU3VmZml4RXhhY3RNYXRjaCk7XG4gICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIHBhdHRlcm4pO1xuICB9XG4gIF9jcmVhdGVDbGFzcyhJbnZlcnNlU3VmZml4RXhhY3RNYXRjaCwgW3tcbiAgICBrZXk6IFwic2VhcmNoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNlYXJjaCh0ZXh0KSB7XG4gICAgICB2YXIgaXNNYXRjaCA9ICF0ZXh0LmVuZHNXaXRoKHRoaXMucGF0dGVybik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc01hdGNoOiBpc01hdGNoLFxuICAgICAgICBzY29yZTogaXNNYXRjaCA/IDAgOiAxLFxuICAgICAgICBpbmRpY2VzOiBbMCwgdGV4dC5sZW5ndGggLSAxXVxuICAgICAgfTtcbiAgICB9XG4gIH1dLCBbe1xuICAgIGtleTogXCJ0eXBlXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gJ2ludmVyc2Utc3VmZml4LWV4YWN0JztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibXVsdGlSZWdleFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIC9eIVwiKC4qKVwiXFwkJC87XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNpbmdsZVJlZ2V4XCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gL14hKC4qKVxcJCQvO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gSW52ZXJzZVN1ZmZpeEV4YWN0TWF0Y2g7XG59KEJhc2VNYXRjaCk7XG5cbnZhciBGdXp6eU1hdGNoID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfQmFzZU1hdGNoKSB7XG4gIF9pbmhlcml0cyhGdXp6eU1hdGNoLCBfQmFzZU1hdGNoKTtcbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihGdXp6eU1hdGNoKTtcbiAgZnVuY3Rpb24gRnV6enlNYXRjaChwYXR0ZXJuKSB7XG4gICAgdmFyIF90aGlzO1xuICAgIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fSxcbiAgICAgIF9yZWYkbG9jYXRpb24gPSBfcmVmLmxvY2F0aW9uLFxuICAgICAgbG9jYXRpb24gPSBfcmVmJGxvY2F0aW9uID09PSB2b2lkIDAgPyBDb25maWcubG9jYXRpb24gOiBfcmVmJGxvY2F0aW9uLFxuICAgICAgX3JlZiR0aHJlc2hvbGQgPSBfcmVmLnRocmVzaG9sZCxcbiAgICAgIHRocmVzaG9sZCA9IF9yZWYkdGhyZXNob2xkID09PSB2b2lkIDAgPyBDb25maWcudGhyZXNob2xkIDogX3JlZiR0aHJlc2hvbGQsXG4gICAgICBfcmVmJGRpc3RhbmNlID0gX3JlZi5kaXN0YW5jZSxcbiAgICAgIGRpc3RhbmNlID0gX3JlZiRkaXN0YW5jZSA9PT0gdm9pZCAwID8gQ29uZmlnLmRpc3RhbmNlIDogX3JlZiRkaXN0YW5jZSxcbiAgICAgIF9yZWYkaW5jbHVkZU1hdGNoZXMgPSBfcmVmLmluY2x1ZGVNYXRjaGVzLFxuICAgICAgaW5jbHVkZU1hdGNoZXMgPSBfcmVmJGluY2x1ZGVNYXRjaGVzID09PSB2b2lkIDAgPyBDb25maWcuaW5jbHVkZU1hdGNoZXMgOiBfcmVmJGluY2x1ZGVNYXRjaGVzLFxuICAgICAgX3JlZiRmaW5kQWxsTWF0Y2hlcyA9IF9yZWYuZmluZEFsbE1hdGNoZXMsXG4gICAgICBmaW5kQWxsTWF0Y2hlcyA9IF9yZWYkZmluZEFsbE1hdGNoZXMgPT09IHZvaWQgMCA/IENvbmZpZy5maW5kQWxsTWF0Y2hlcyA6IF9yZWYkZmluZEFsbE1hdGNoZXMsXG4gICAgICBfcmVmJG1pbk1hdGNoQ2hhckxlbmcgPSBfcmVmLm1pbk1hdGNoQ2hhckxlbmd0aCxcbiAgICAgIG1pbk1hdGNoQ2hhckxlbmd0aCA9IF9yZWYkbWluTWF0Y2hDaGFyTGVuZyA9PT0gdm9pZCAwID8gQ29uZmlnLm1pbk1hdGNoQ2hhckxlbmd0aCA6IF9yZWYkbWluTWF0Y2hDaGFyTGVuZyxcbiAgICAgIF9yZWYkaXNDYXNlU2Vuc2l0aXZlID0gX3JlZi5pc0Nhc2VTZW5zaXRpdmUsXG4gICAgICBpc0Nhc2VTZW5zaXRpdmUgPSBfcmVmJGlzQ2FzZVNlbnNpdGl2ZSA9PT0gdm9pZCAwID8gQ29uZmlnLmlzQ2FzZVNlbnNpdGl2ZSA6IF9yZWYkaXNDYXNlU2Vuc2l0aXZlLFxuICAgICAgX3JlZiRpZ25vcmVMb2NhdGlvbiA9IF9yZWYuaWdub3JlTG9jYXRpb24sXG4gICAgICBpZ25vcmVMb2NhdGlvbiA9IF9yZWYkaWdub3JlTG9jYXRpb24gPT09IHZvaWQgMCA/IENvbmZpZy5pZ25vcmVMb2NhdGlvbiA6IF9yZWYkaWdub3JlTG9jYXRpb247XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZ1enp5TWF0Y2gpO1xuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcGF0dGVybik7XG4gICAgX3RoaXMuX2JpdGFwU2VhcmNoID0gbmV3IEJpdGFwU2VhcmNoKHBhdHRlcm4sIHtcbiAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgIHRocmVzaG9sZDogdGhyZXNob2xkLFxuICAgICAgZGlzdGFuY2U6IGRpc3RhbmNlLFxuICAgICAgaW5jbHVkZU1hdGNoZXM6IGluY2x1ZGVNYXRjaGVzLFxuICAgICAgZmluZEFsbE1hdGNoZXM6IGZpbmRBbGxNYXRjaGVzLFxuICAgICAgbWluTWF0Y2hDaGFyTGVuZ3RoOiBtaW5NYXRjaENoYXJMZW5ndGgsXG4gICAgICBpc0Nhc2VTZW5zaXRpdmU6IGlzQ2FzZVNlbnNpdGl2ZSxcbiAgICAgIGlnbm9yZUxvY2F0aW9uOiBpZ25vcmVMb2NhdGlvblxuICAgIH0pO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICBfY3JlYXRlQ2xhc3MoRnV6enlNYXRjaCwgW3tcbiAgICBrZXk6IFwic2VhcmNoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNlYXJjaCh0ZXh0KSB7XG4gICAgICByZXR1cm4gdGhpcy5fYml0YXBTZWFyY2guc2VhcmNoSW4odGV4dCk7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwidHlwZVwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuICdmdXp6eSc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm11bHRpUmVnZXhcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiAvXlwiKC4qKVwiJC87XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNpbmdsZVJlZ2V4XCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gL14oLiopJC87XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBGdXp6eU1hdGNoO1xufShCYXNlTWF0Y2gpO1xuXG52YXIgSW5jbHVkZU1hdGNoID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfQmFzZU1hdGNoKSB7XG4gIF9pbmhlcml0cyhJbmNsdWRlTWF0Y2gsIF9CYXNlTWF0Y2gpO1xuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKEluY2x1ZGVNYXRjaCk7XG4gIGZ1bmN0aW9uIEluY2x1ZGVNYXRjaChwYXR0ZXJuKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEluY2x1ZGVNYXRjaCk7XG4gICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIHBhdHRlcm4pO1xuICB9XG4gIF9jcmVhdGVDbGFzcyhJbmNsdWRlTWF0Y2gsIFt7XG4gICAga2V5OiBcInNlYXJjaFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZWFyY2godGV4dCkge1xuICAgICAgdmFyIGxvY2F0aW9uID0gMDtcbiAgICAgIHZhciBpbmRleDtcbiAgICAgIHZhciBpbmRpY2VzID0gW107XG4gICAgICB2YXIgcGF0dGVybkxlbiA9IHRoaXMucGF0dGVybi5sZW5ndGg7XG5cbiAgICAgIC8vIEdldCBhbGwgZXhhY3QgbWF0Y2hlc1xuICAgICAgd2hpbGUgKChpbmRleCA9IHRleHQuaW5kZXhPZih0aGlzLnBhdHRlcm4sIGxvY2F0aW9uKSkgPiAtMSkge1xuICAgICAgICBsb2NhdGlvbiA9IGluZGV4ICsgcGF0dGVybkxlbjtcbiAgICAgICAgaW5kaWNlcy5wdXNoKFtpbmRleCwgbG9jYXRpb24gLSAxXSk7XG4gICAgICB9XG4gICAgICB2YXIgaXNNYXRjaCA9ICEhaW5kaWNlcy5sZW5ndGg7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpc01hdGNoOiBpc01hdGNoLFxuICAgICAgICBzY29yZTogaXNNYXRjaCA/IDAgOiAxLFxuICAgICAgICBpbmRpY2VzOiBpbmRpY2VzXG4gICAgICB9O1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcInR5cGVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiAnaW5jbHVkZSc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm11bHRpUmVnZXhcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiAvXidcIiguKilcIiQvO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzaW5nbGVSZWdleFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIC9eJyguKikkLztcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEluY2x1ZGVNYXRjaDtcbn0oQmFzZU1hdGNoKTtcblxuLy8gXHUyNzU3T3JkZXIgaXMgaW1wb3J0YW50LiBETyBOT1QgQ0hBTkdFLlxudmFyIHNlYXJjaGVycyA9IFtFeGFjdE1hdGNoLCBJbmNsdWRlTWF0Y2gsIFByZWZpeEV4YWN0TWF0Y2gsIEludmVyc2VQcmVmaXhFeGFjdE1hdGNoLCBJbnZlcnNlU3VmZml4RXhhY3RNYXRjaCwgU3VmZml4RXhhY3RNYXRjaCwgSW52ZXJzZUV4YWN0TWF0Y2gsIEZ1enp5TWF0Y2hdO1xudmFyIHNlYXJjaGVyc0xlbiA9IHNlYXJjaGVycy5sZW5ndGg7XG5cbi8vIFJlZ2V4IHRvIHNwbGl0IGJ5IHNwYWNlcywgYnV0IGtlZXAgYW55dGhpbmcgaW4gcXVvdGVzIHRvZ2V0aGVyXG52YXIgU1BBQ0VfUkUgPSAvICsoPz0oPzpbXlxcXCJdKlxcXCJbXlxcXCJdKlxcXCIpKlteXFxcIl0qJCkvO1xudmFyIE9SX1RPS0VOID0gJ3wnO1xuXG4vLyBSZXR1cm4gYSAyRCBhcnJheSByZXByZXNlbnRhdGlvbiBvZiB0aGUgcXVlcnksIGZvciBzaW1wbGVyIHBhcnNpbmcuXG4vLyBFeGFtcGxlOlxuLy8gXCJeY29yZSBnbyQgfCByYiQgfCBweSQgeHkkXCIgPT4gW1tcIl5jb3JlXCIsIFwiZ28kXCJdLCBbXCJyYiRcIl0sIFtcInB5JFwiLCBcInh5JFwiXV1cbmZ1bmN0aW9uIHBhcnNlUXVlcnkocGF0dGVybikge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gIHJldHVybiBwYXR0ZXJuLnNwbGl0KE9SX1RPS0VOKS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICB2YXIgcXVlcnkgPSBpdGVtLnRyaW0oKS5zcGxpdChTUEFDRV9SRSkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbSAmJiAhIWl0ZW0udHJpbSgpO1xuICAgIH0pO1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHF1ZXJ5Lmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICB2YXIgcXVlcnlJdGVtID0gcXVlcnlbaV07XG5cbiAgICAgIC8vIDEuIEhhbmRsZSBtdWx0aXBsZSBxdWVyeSBtYXRjaCAoaS5lLCBvbmNlIHRoYXQgYXJlIHF1b3RlZCwgbGlrZSBgXCJoZWxsbyB3b3JsZFwiYClcbiAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgICAgdmFyIGlkeCA9IC0xO1xuICAgICAgd2hpbGUgKCFmb3VuZCAmJiArK2lkeCA8IHNlYXJjaGVyc0xlbikge1xuICAgICAgICB2YXIgc2VhcmNoZXIgPSBzZWFyY2hlcnNbaWR4XTtcbiAgICAgICAgdmFyIHRva2VuID0gc2VhcmNoZXIuaXNNdWx0aU1hdGNoKHF1ZXJ5SXRlbSk7XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChuZXcgc2VhcmNoZXIodG9rZW4sIG9wdGlvbnMpKTtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gMi4gSGFuZGxlIHNpbmdsZSBxdWVyeSBtYXRjaGVzIChpLmUsIG9uY2UgdGhhdCBhcmUgKm5vdCogcXVvdGVkKVxuICAgICAgaWR4ID0gLTE7XG4gICAgICB3aGlsZSAoKytpZHggPCBzZWFyY2hlcnNMZW4pIHtcbiAgICAgICAgdmFyIF9zZWFyY2hlciA9IHNlYXJjaGVyc1tpZHhdO1xuICAgICAgICB2YXIgX3Rva2VuID0gX3NlYXJjaGVyLmlzU2luZ2xlTWF0Y2gocXVlcnlJdGVtKTtcbiAgICAgICAgaWYgKF90b2tlbikge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChuZXcgX3NlYXJjaGVyKF90b2tlbiwgb3B0aW9ucykpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9KTtcbn1cblxuLy8gVGhlc2UgZXh0ZW5kZWQgbWF0Y2hlcnMgY2FuIHJldHVybiBhbiBhcnJheSBvZiBtYXRjaGVzLCBhcyBvcHBvc2VkXG4vLyB0byBhIHNpbmdsIG1hdGNoXG52YXIgTXVsdGlNYXRjaFNldCA9IG5ldyBTZXQoW0Z1enp5TWF0Y2gudHlwZSwgSW5jbHVkZU1hdGNoLnR5cGVdKTtcblxuLyoqXG4gKiBDb21tYW5kLWxpa2Ugc2VhcmNoaW5nXG4gKiA9PT09PT09PT09PT09PT09PT09PT09XG4gKlxuICogR2l2ZW4gbXVsdGlwbGUgc2VhcmNoIHRlcm1zIGRlbGltaXRlZCBieSBzcGFjZXMuZS5nLiBgXmpzY3JpcHQgLnB5dGhvbiQgcnVieSAhamF2YWAsXG4gKiBzZWFyY2ggaW4gYSBnaXZlbiB0ZXh0LlxuICpcbiAqIFNlYXJjaCBzeW50YXg6XG4gKlxuICogfCBUb2tlbiAgICAgICB8IE1hdGNoIHR5cGUgICAgICAgICAgICAgICAgIHwgRGVzY3JpcHRpb24gICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAtLS0tLS0tLS0tLSB8IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHwgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gfFxuICogfCBganNjcmlwdGAgICB8IGZ1enp5LW1hdGNoICAgICAgICAgICAgICAgIHwgSXRlbXMgdGhhdCBmdXp6eSBtYXRjaCBganNjcmlwdGAgICAgICAgfFxuICogfCBgPXNjaGVtZWAgICB8IGV4YWN0LW1hdGNoICAgICAgICAgICAgICAgIHwgSXRlbXMgdGhhdCBhcmUgYHNjaGVtZWAgICAgICAgICAgICAgICAgfFxuICogfCBgJ3B5dGhvbmAgICB8IGluY2x1ZGUtbWF0Y2ggICAgICAgICAgICAgIHwgSXRlbXMgdGhhdCBpbmNsdWRlIGBweXRob25gICAgICAgICAgICAgfFxuICogfCBgIXJ1YnlgICAgICB8IGludmVyc2UtZXhhY3QtbWF0Y2ggICAgICAgIHwgSXRlbXMgdGhhdCBkbyBub3QgaW5jbHVkZSBgcnVieWAgICAgICAgfFxuICogfCBgXmphdmFgICAgICB8IHByZWZpeC1leGFjdC1tYXRjaCAgICAgICAgIHwgSXRlbXMgdGhhdCBzdGFydCB3aXRoIGBqYXZhYCAgICAgICAgICAgfFxuICogfCBgIV5lYXJsYW5nYCB8IGludmVyc2UtcHJlZml4LWV4YWN0LW1hdGNoIHwgSXRlbXMgdGhhdCBkbyBub3Qgc3RhcnQgd2l0aCBgZWFybGFuZ2AgfFxuICogfCBgLmpzJGAgICAgICB8IHN1ZmZpeC1leGFjdC1tYXRjaCAgICAgICAgIHwgSXRlbXMgdGhhdCBlbmQgd2l0aCBgLmpzYCAgICAgICAgICAgICAgfFxuICogfCBgIS5nbyRgICAgICB8IGludmVyc2Utc3VmZml4LWV4YWN0LW1hdGNoIHwgSXRlbXMgdGhhdCBkbyBub3QgZW5kIHdpdGggYC5nb2AgICAgICAgfFxuICpcbiAqIEEgc2luZ2xlIHBpcGUgY2hhcmFjdGVyIGFjdHMgYXMgYW4gT1Igb3BlcmF0b3IuIEZvciBleGFtcGxlLCB0aGUgZm9sbG93aW5nXG4gKiBxdWVyeSBtYXRjaGVzIGVudHJpZXMgdGhhdCBzdGFydCB3aXRoIGBjb3JlYCBhbmQgZW5kIHdpdGggZWl0aGVyYGdvYCwgYHJiYCxcbiAqIG9yYHB5YC5cbiAqXG4gKiBgYGBcbiAqIF5jb3JlIGdvJCB8IHJiJCB8IHB5JFxuICogYGBgXG4gKi9cbnZhciBFeHRlbmRlZFNlYXJjaCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEV4dGVuZGVkU2VhcmNoKHBhdHRlcm4pIHtcbiAgICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge30sXG4gICAgICBfcmVmJGlzQ2FzZVNlbnNpdGl2ZSA9IF9yZWYuaXNDYXNlU2Vuc2l0aXZlLFxuICAgICAgaXNDYXNlU2Vuc2l0aXZlID0gX3JlZiRpc0Nhc2VTZW5zaXRpdmUgPT09IHZvaWQgMCA/IENvbmZpZy5pc0Nhc2VTZW5zaXRpdmUgOiBfcmVmJGlzQ2FzZVNlbnNpdGl2ZSxcbiAgICAgIF9yZWYkaW5jbHVkZU1hdGNoZXMgPSBfcmVmLmluY2x1ZGVNYXRjaGVzLFxuICAgICAgaW5jbHVkZU1hdGNoZXMgPSBfcmVmJGluY2x1ZGVNYXRjaGVzID09PSB2b2lkIDAgPyBDb25maWcuaW5jbHVkZU1hdGNoZXMgOiBfcmVmJGluY2x1ZGVNYXRjaGVzLFxuICAgICAgX3JlZiRtaW5NYXRjaENoYXJMZW5nID0gX3JlZi5taW5NYXRjaENoYXJMZW5ndGgsXG4gICAgICBtaW5NYXRjaENoYXJMZW5ndGggPSBfcmVmJG1pbk1hdGNoQ2hhckxlbmcgPT09IHZvaWQgMCA/IENvbmZpZy5taW5NYXRjaENoYXJMZW5ndGggOiBfcmVmJG1pbk1hdGNoQ2hhckxlbmcsXG4gICAgICBfcmVmJGlnbm9yZUxvY2F0aW9uID0gX3JlZi5pZ25vcmVMb2NhdGlvbixcbiAgICAgIGlnbm9yZUxvY2F0aW9uID0gX3JlZiRpZ25vcmVMb2NhdGlvbiA9PT0gdm9pZCAwID8gQ29uZmlnLmlnbm9yZUxvY2F0aW9uIDogX3JlZiRpZ25vcmVMb2NhdGlvbixcbiAgICAgIF9yZWYkZmluZEFsbE1hdGNoZXMgPSBfcmVmLmZpbmRBbGxNYXRjaGVzLFxuICAgICAgZmluZEFsbE1hdGNoZXMgPSBfcmVmJGZpbmRBbGxNYXRjaGVzID09PSB2b2lkIDAgPyBDb25maWcuZmluZEFsbE1hdGNoZXMgOiBfcmVmJGZpbmRBbGxNYXRjaGVzLFxuICAgICAgX3JlZiRsb2NhdGlvbiA9IF9yZWYubG9jYXRpb24sXG4gICAgICBsb2NhdGlvbiA9IF9yZWYkbG9jYXRpb24gPT09IHZvaWQgMCA/IENvbmZpZy5sb2NhdGlvbiA6IF9yZWYkbG9jYXRpb24sXG4gICAgICBfcmVmJHRocmVzaG9sZCA9IF9yZWYudGhyZXNob2xkLFxuICAgICAgdGhyZXNob2xkID0gX3JlZiR0aHJlc2hvbGQgPT09IHZvaWQgMCA/IENvbmZpZy50aHJlc2hvbGQgOiBfcmVmJHRocmVzaG9sZCxcbiAgICAgIF9yZWYkZGlzdGFuY2UgPSBfcmVmLmRpc3RhbmNlLFxuICAgICAgZGlzdGFuY2UgPSBfcmVmJGRpc3RhbmNlID09PSB2b2lkIDAgPyBDb25maWcuZGlzdGFuY2UgOiBfcmVmJGRpc3RhbmNlO1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFeHRlbmRlZFNlYXJjaCk7XG4gICAgdGhpcy5xdWVyeSA9IG51bGw7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgaXNDYXNlU2Vuc2l0aXZlOiBpc0Nhc2VTZW5zaXRpdmUsXG4gICAgICBpbmNsdWRlTWF0Y2hlczogaW5jbHVkZU1hdGNoZXMsXG4gICAgICBtaW5NYXRjaENoYXJMZW5ndGg6IG1pbk1hdGNoQ2hhckxlbmd0aCxcbiAgICAgIGZpbmRBbGxNYXRjaGVzOiBmaW5kQWxsTWF0Y2hlcyxcbiAgICAgIGlnbm9yZUxvY2F0aW9uOiBpZ25vcmVMb2NhdGlvbixcbiAgICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICAgIHRocmVzaG9sZDogdGhyZXNob2xkLFxuICAgICAgZGlzdGFuY2U6IGRpc3RhbmNlXG4gICAgfTtcbiAgICB0aGlzLnBhdHRlcm4gPSBpc0Nhc2VTZW5zaXRpdmUgPyBwYXR0ZXJuIDogcGF0dGVybi50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMucXVlcnkgPSBwYXJzZVF1ZXJ5KHRoaXMucGF0dGVybiwgdGhpcy5vcHRpb25zKTtcbiAgfVxuICBfY3JlYXRlQ2xhc3MoRXh0ZW5kZWRTZWFyY2gsIFt7XG4gICAga2V5OiBcInNlYXJjaEluXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNlYXJjaEluKHRleHQpIHtcbiAgICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcnk7XG4gICAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaXNNYXRjaDogZmFsc2UsXG4gICAgICAgICAgc2NvcmU6IDFcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHZhciBfdGhpcyRvcHRpb25zID0gdGhpcy5vcHRpb25zLFxuICAgICAgICBpbmNsdWRlTWF0Y2hlcyA9IF90aGlzJG9wdGlvbnMuaW5jbHVkZU1hdGNoZXMsXG4gICAgICAgIGlzQ2FzZVNlbnNpdGl2ZSA9IF90aGlzJG9wdGlvbnMuaXNDYXNlU2Vuc2l0aXZlO1xuICAgICAgdGV4dCA9IGlzQ2FzZVNlbnNpdGl2ZSA/IHRleHQgOiB0ZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgICB2YXIgbnVtTWF0Y2hlcyA9IDA7XG4gICAgICB2YXIgYWxsSW5kaWNlcyA9IFtdO1xuICAgICAgdmFyIHRvdGFsU2NvcmUgPSAwO1xuXG4gICAgICAvLyBPUnNcbiAgICAgIGZvciAodmFyIGkgPSAwLCBxTGVuID0gcXVlcnkubGVuZ3RoOyBpIDwgcUxlbjsgaSArPSAxKSB7XG4gICAgICAgIHZhciBzZWFyY2hlcnMgPSBxdWVyeVtpXTtcblxuICAgICAgICAvLyBSZXNldCBpbmRpY2VzXG4gICAgICAgIGFsbEluZGljZXMubGVuZ3RoID0gMDtcbiAgICAgICAgbnVtTWF0Y2hlcyA9IDA7XG5cbiAgICAgICAgLy8gQU5Ec1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgcExlbiA9IHNlYXJjaGVycy5sZW5ndGg7IGogPCBwTGVuOyBqICs9IDEpIHtcbiAgICAgICAgICB2YXIgc2VhcmNoZXIgPSBzZWFyY2hlcnNbal07XG4gICAgICAgICAgdmFyIF9zZWFyY2hlciRzZWFyY2ggPSBzZWFyY2hlci5zZWFyY2godGV4dCksXG4gICAgICAgICAgICBpc01hdGNoID0gX3NlYXJjaGVyJHNlYXJjaC5pc01hdGNoLFxuICAgICAgICAgICAgaW5kaWNlcyA9IF9zZWFyY2hlciRzZWFyY2guaW5kaWNlcyxcbiAgICAgICAgICAgIHNjb3JlID0gX3NlYXJjaGVyJHNlYXJjaC5zY29yZTtcbiAgICAgICAgICBpZiAoaXNNYXRjaCkge1xuICAgICAgICAgICAgbnVtTWF0Y2hlcyArPSAxO1xuICAgICAgICAgICAgdG90YWxTY29yZSArPSBzY29yZTtcbiAgICAgICAgICAgIGlmIChpbmNsdWRlTWF0Y2hlcykge1xuICAgICAgICAgICAgICB2YXIgdHlwZSA9IHNlYXJjaGVyLmNvbnN0cnVjdG9yLnR5cGU7XG4gICAgICAgICAgICAgIGlmIChNdWx0aU1hdGNoU2V0Lmhhcyh0eXBlKSkge1xuICAgICAgICAgICAgICAgIGFsbEluZGljZXMgPSBbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGFsbEluZGljZXMpLCBfdG9Db25zdW1hYmxlQXJyYXkoaW5kaWNlcykpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsbEluZGljZXMucHVzaChpbmRpY2VzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b3RhbFNjb3JlID0gMDtcbiAgICAgICAgICAgIG51bU1hdGNoZXMgPSAwO1xuICAgICAgICAgICAgYWxsSW5kaWNlcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gT1IgY29uZGl0aW9uLCBzbyBpZiBUUlVFLCByZXR1cm5cbiAgICAgICAgaWYgKG51bU1hdGNoZXMpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgaXNNYXRjaDogdHJ1ZSxcbiAgICAgICAgICAgIHNjb3JlOiB0b3RhbFNjb3JlIC8gbnVtTWF0Y2hlc1xuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKGluY2x1ZGVNYXRjaGVzKSB7XG4gICAgICAgICAgICByZXN1bHQuaW5kaWNlcyA9IGFsbEluZGljZXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTm90aGluZyB3YXMgbWF0Y2hlZFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXNNYXRjaDogZmFsc2UsXG4gICAgICAgIHNjb3JlOiAxXG4gICAgICB9O1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcImNvbmRpdGlvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb25kaXRpb24oXywgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMudXNlRXh0ZW5kZWRTZWFyY2g7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBFeHRlbmRlZFNlYXJjaDtcbn0oKTtcblxudmFyIHJlZ2lzdGVyZWRTZWFyY2hlcnMgPSBbXTtcbmZ1bmN0aW9uIHJlZ2lzdGVyKCkge1xuICByZWdpc3RlcmVkU2VhcmNoZXJzLnB1c2guYXBwbHkocmVnaXN0ZXJlZFNlYXJjaGVycywgYXJndW1lbnRzKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVNlYXJjaGVyKHBhdHRlcm4sIG9wdGlvbnMpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHJlZ2lzdGVyZWRTZWFyY2hlcnMubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICB2YXIgc2VhcmNoZXJDbGFzcyA9IHJlZ2lzdGVyZWRTZWFyY2hlcnNbaV07XG4gICAgaWYgKHNlYXJjaGVyQ2xhc3MuY29uZGl0aW9uKHBhdHRlcm4sIG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gbmV3IHNlYXJjaGVyQ2xhc3MocGF0dGVybiwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgQml0YXBTZWFyY2gocGF0dGVybiwgb3B0aW9ucyk7XG59XG5cbnZhciBMb2dpY2FsT3BlcmF0b3IgPSB7XG4gIEFORDogJyRhbmQnLFxuICBPUjogJyRvcidcbn07XG52YXIgS2V5VHlwZSA9IHtcbiAgUEFUSDogJyRwYXRoJyxcbiAgUEFUVEVSTjogJyR2YWwnXG59O1xudmFyIGlzRXhwcmVzc2lvbiA9IGZ1bmN0aW9uIGlzRXhwcmVzc2lvbihxdWVyeSkge1xuICByZXR1cm4gISEocXVlcnlbTG9naWNhbE9wZXJhdG9yLkFORF0gfHwgcXVlcnlbTG9naWNhbE9wZXJhdG9yLk9SXSk7XG59O1xudmFyIGlzUGF0aCA9IGZ1bmN0aW9uIGlzUGF0aChxdWVyeSkge1xuICByZXR1cm4gISFxdWVyeVtLZXlUeXBlLlBBVEhdO1xufTtcbnZhciBpc0xlYWYgPSBmdW5jdGlvbiBpc0xlYWYocXVlcnkpIHtcbiAgcmV0dXJuICFpc0FycmF5KHF1ZXJ5KSAmJiBpc09iamVjdChxdWVyeSkgJiYgIWlzRXhwcmVzc2lvbihxdWVyeSk7XG59O1xudmFyIGNvbnZlcnRUb0V4cGxpY2l0ID0gZnVuY3Rpb24gY29udmVydFRvRXhwbGljaXQocXVlcnkpIHtcbiAgcmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh7fSwgTG9naWNhbE9wZXJhdG9yLkFORCwgT2JqZWN0LmtleXMocXVlcnkpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh7fSwga2V5LCBxdWVyeVtrZXldKTtcbiAgfSkpO1xufTtcblxuLy8gV2hlbiBgYXV0b2AgaXMgYHRydWVgLCB0aGUgcGFyc2UgZnVuY3Rpb24gd2lsbCBpbmZlciBhbmQgaW5pdGlhbGl6ZSBhbmQgYWRkXG4vLyB0aGUgYXBwcm9wcmlhdGUgYFNlYXJjaGVyYCBpbnN0YW5jZVxuZnVuY3Rpb24gcGFyc2UocXVlcnksIG9wdGlvbnMpIHtcbiAgdmFyIF9yZWYzID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fSxcbiAgICBfcmVmMyRhdXRvID0gX3JlZjMuYXV0byxcbiAgICBhdXRvID0gX3JlZjMkYXV0byA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9yZWYzJGF1dG87XG4gIHZhciBuZXh0ID0gZnVuY3Rpb24gbmV4dChxdWVyeSkge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMocXVlcnkpO1xuICAgIHZhciBpc1F1ZXJ5UGF0aCA9IGlzUGF0aChxdWVyeSk7XG4gICAgaWYgKCFpc1F1ZXJ5UGF0aCAmJiBrZXlzLmxlbmd0aCA+IDEgJiYgIWlzRXhwcmVzc2lvbihxdWVyeSkpIHtcbiAgICAgIHJldHVybiBuZXh0KGNvbnZlcnRUb0V4cGxpY2l0KHF1ZXJ5KSk7XG4gICAgfVxuICAgIGlmIChpc0xlYWYocXVlcnkpKSB7XG4gICAgICB2YXIga2V5ID0gaXNRdWVyeVBhdGggPyBxdWVyeVtLZXlUeXBlLlBBVEhdIDoga2V5c1swXTtcbiAgICAgIHZhciBwYXR0ZXJuID0gaXNRdWVyeVBhdGggPyBxdWVyeVtLZXlUeXBlLlBBVFRFUk5dIDogcXVlcnlba2V5XTtcbiAgICAgIGlmICghaXNTdHJpbmcocGF0dGVybikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKExPR0lDQUxfU0VBUkNIX0lOVkFMSURfUVVFUllfRk9SX0tFWShrZXkpKTtcbiAgICAgIH1cbiAgICAgIHZhciBvYmogPSB7XG4gICAgICAgIGtleUlkOiBjcmVhdGVLZXlJZChrZXkpLFxuICAgICAgICBwYXR0ZXJuOiBwYXR0ZXJuXG4gICAgICB9O1xuICAgICAgaWYgKGF1dG8pIHtcbiAgICAgICAgb2JqLnNlYXJjaGVyID0gY3JlYXRlU2VhcmNoZXIocGF0dGVybiwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICB2YXIgbm9kZSA9IHtcbiAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgIG9wZXJhdG9yOiBrZXlzWzBdXG4gICAgfTtcbiAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIHZhbHVlID0gcXVlcnlba2V5XTtcbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgbm9kZS5jaGlsZHJlbi5wdXNoKG5leHQoaXRlbSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcbiAgaWYgKCFpc0V4cHJlc3Npb24ocXVlcnkpKSB7XG4gICAgcXVlcnkgPSBjb252ZXJ0VG9FeHBsaWNpdChxdWVyeSk7XG4gIH1cbiAgcmV0dXJuIG5leHQocXVlcnkpO1xufVxuXG4vLyBQcmFjdGljYWwgc2NvcmluZyBmdW5jdGlvblxuZnVuY3Rpb24gY29tcHV0ZVNjb3JlKHJlc3VsdHMsIF9yZWYpIHtcbiAgdmFyIF9yZWYkaWdub3JlRmllbGROb3JtID0gX3JlZi5pZ25vcmVGaWVsZE5vcm0sXG4gICAgaWdub3JlRmllbGROb3JtID0gX3JlZiRpZ25vcmVGaWVsZE5vcm0gPT09IHZvaWQgMCA/IENvbmZpZy5pZ25vcmVGaWVsZE5vcm0gOiBfcmVmJGlnbm9yZUZpZWxkTm9ybTtcbiAgcmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICB2YXIgdG90YWxTY29yZSA9IDE7XG4gICAgcmVzdWx0Lm1hdGNoZXMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgIHZhciBrZXkgPSBfcmVmMi5rZXksXG4gICAgICAgIG5vcm0gPSBfcmVmMi5ub3JtLFxuICAgICAgICBzY29yZSA9IF9yZWYyLnNjb3JlO1xuICAgICAgdmFyIHdlaWdodCA9IGtleSA/IGtleS53ZWlnaHQgOiBudWxsO1xuICAgICAgdG90YWxTY29yZSAqPSBNYXRoLnBvdyhzY29yZSA9PT0gMCAmJiB3ZWlnaHQgPyBOdW1iZXIuRVBTSUxPTiA6IHNjb3JlLCAod2VpZ2h0IHx8IDEpICogKGlnbm9yZUZpZWxkTm9ybSA/IDEgOiBub3JtKSk7XG4gICAgfSk7XG4gICAgcmVzdWx0LnNjb3JlID0gdG90YWxTY29yZTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybU1hdGNoZXMocmVzdWx0LCBkYXRhKSB7XG4gIHZhciBtYXRjaGVzID0gcmVzdWx0Lm1hdGNoZXM7XG4gIGRhdGEubWF0Y2hlcyA9IFtdO1xuICBpZiAoIWlzRGVmaW5lZChtYXRjaGVzKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBtYXRjaGVzLmZvckVhY2goZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgaWYgKCFpc0RlZmluZWQobWF0Y2guaW5kaWNlcykgfHwgIW1hdGNoLmluZGljZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBpbmRpY2VzID0gbWF0Y2guaW5kaWNlcyxcbiAgICAgIHZhbHVlID0gbWF0Y2gudmFsdWU7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGluZGljZXM6IGluZGljZXMsXG4gICAgICB2YWx1ZTogdmFsdWVcbiAgICB9O1xuICAgIGlmIChtYXRjaC5rZXkpIHtcbiAgICAgIG9iai5rZXkgPSBtYXRjaC5rZXkuc3JjO1xuICAgIH1cbiAgICBpZiAobWF0Y2guaWR4ID4gLTEpIHtcbiAgICAgIG9iai5yZWZJbmRleCA9IG1hdGNoLmlkeDtcbiAgICB9XG4gICAgZGF0YS5tYXRjaGVzLnB1c2gob2JqKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybVNjb3JlKHJlc3VsdCwgZGF0YSkge1xuICBkYXRhLnNjb3JlID0gcmVzdWx0LnNjb3JlO1xufVxuXG5mdW5jdGlvbiBmb3JtYXQocmVzdWx0cywgZG9jcykge1xuICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge30sXG4gICAgX3JlZiRpbmNsdWRlTWF0Y2hlcyA9IF9yZWYuaW5jbHVkZU1hdGNoZXMsXG4gICAgaW5jbHVkZU1hdGNoZXMgPSBfcmVmJGluY2x1ZGVNYXRjaGVzID09PSB2b2lkIDAgPyBDb25maWcuaW5jbHVkZU1hdGNoZXMgOiBfcmVmJGluY2x1ZGVNYXRjaGVzLFxuICAgIF9yZWYkaW5jbHVkZVNjb3JlID0gX3JlZi5pbmNsdWRlU2NvcmUsXG4gICAgaW5jbHVkZVNjb3JlID0gX3JlZiRpbmNsdWRlU2NvcmUgPT09IHZvaWQgMCA/IENvbmZpZy5pbmNsdWRlU2NvcmUgOiBfcmVmJGluY2x1ZGVTY29yZTtcbiAgdmFyIHRyYW5zZm9ybWVycyA9IFtdO1xuICBpZiAoaW5jbHVkZU1hdGNoZXMpIHRyYW5zZm9ybWVycy5wdXNoKHRyYW5zZm9ybU1hdGNoZXMpO1xuICBpZiAoaW5jbHVkZVNjb3JlKSB0cmFuc2Zvcm1lcnMucHVzaCh0cmFuc2Zvcm1TY29yZSk7XG4gIHJldHVybiByZXN1bHRzLm1hcChmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgdmFyIGlkeCA9IHJlc3VsdC5pZHg7XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICBpdGVtOiBkb2NzW2lkeF0sXG4gICAgICByZWZJbmRleDogaWR4XG4gICAgfTtcbiAgICBpZiAodHJhbnNmb3JtZXJzLmxlbmd0aCkge1xuICAgICAgdHJhbnNmb3JtZXJzLmZvckVhY2goZnVuY3Rpb24gKHRyYW5zZm9ybWVyKSB7XG4gICAgICAgIHRyYW5zZm9ybWVyKHJlc3VsdCwgZGF0YSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0pO1xufVxuXG52YXIgRnVzZSQxID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRnVzZShkb2NzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgIHZhciBpbmRleCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkO1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGdXNlKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBfb2JqZWN0U3ByZWFkMihfb2JqZWN0U3ByZWFkMih7fSwgQ29uZmlnKSwgb3B0aW9ucyk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy51c2VFeHRlbmRlZFNlYXJjaCAmJiAhdHJ1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKEVYVEVOREVEX1NFQVJDSF9VTkFWQUlMQUJMRSk7XG4gICAgfVxuICAgIHRoaXMuX2tleVN0b3JlID0gbmV3IEtleVN0b3JlKHRoaXMub3B0aW9ucy5rZXlzKTtcbiAgICB0aGlzLnNldENvbGxlY3Rpb24oZG9jcywgaW5kZXgpO1xuICB9XG4gIF9jcmVhdGVDbGFzcyhGdXNlLCBbe1xuICAgIGtleTogXCJzZXRDb2xsZWN0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldENvbGxlY3Rpb24oZG9jcywgaW5kZXgpIHtcbiAgICAgIHRoaXMuX2RvY3MgPSBkb2NzO1xuICAgICAgaWYgKGluZGV4ICYmICEoaW5kZXggaW5zdGFuY2VvZiBGdXNlSW5kZXgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihJTkNPUlJFQ1RfSU5ERVhfVFlQRSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9teUluZGV4ID0gaW5kZXggfHwgY3JlYXRlSW5kZXgodGhpcy5vcHRpb25zLmtleXMsIHRoaXMuX2RvY3MsIHtcbiAgICAgICAgZ2V0Rm46IHRoaXMub3B0aW9ucy5nZXRGbixcbiAgICAgICAgZmllbGROb3JtV2VpZ2h0OiB0aGlzLm9wdGlvbnMuZmllbGROb3JtV2VpZ2h0XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZChkb2MpIHtcbiAgICAgIGlmICghaXNEZWZpbmVkKGRvYykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fZG9jcy5wdXNoKGRvYyk7XG4gICAgICB0aGlzLl9teUluZGV4LmFkZChkb2MpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW1vdmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgdmFyIHByZWRpY2F0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZnVuY3Rpb24gLyogZG9jLCBpZHggKi8gKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLl9kb2NzLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgIHZhciBkb2MgPSB0aGlzLl9kb2NzW2ldO1xuICAgICAgICBpZiAocHJlZGljYXRlKGRvYywgaSkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUF0KGkpO1xuICAgICAgICAgIGkgLT0gMTtcbiAgICAgICAgICBsZW4gLT0gMTtcbiAgICAgICAgICByZXN1bHRzLnB1c2goZG9jKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlbW92ZUF0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZUF0KGlkeCkge1xuICAgICAgdGhpcy5fZG9jcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIHRoaXMuX215SW5kZXgucmVtb3ZlQXQoaWR4KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0SW5kZXhcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0SW5kZXgoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbXlJbmRleDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2VhcmNoXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNlYXJjaChxdWVyeSkge1xuICAgICAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9LFxuICAgICAgICBfcmVmJGxpbWl0ID0gX3JlZi5saW1pdCxcbiAgICAgICAgbGltaXQgPSBfcmVmJGxpbWl0ID09PSB2b2lkIDAgPyAtMSA6IF9yZWYkbGltaXQ7XG4gICAgICB2YXIgX3RoaXMkb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcbiAgICAgICAgaW5jbHVkZU1hdGNoZXMgPSBfdGhpcyRvcHRpb25zLmluY2x1ZGVNYXRjaGVzLFxuICAgICAgICBpbmNsdWRlU2NvcmUgPSBfdGhpcyRvcHRpb25zLmluY2x1ZGVTY29yZSxcbiAgICAgICAgc2hvdWxkU29ydCA9IF90aGlzJG9wdGlvbnMuc2hvdWxkU29ydCxcbiAgICAgICAgc29ydEZuID0gX3RoaXMkb3B0aW9ucy5zb3J0Rm4sXG4gICAgICAgIGlnbm9yZUZpZWxkTm9ybSA9IF90aGlzJG9wdGlvbnMuaWdub3JlRmllbGROb3JtO1xuICAgICAgdmFyIHJlc3VsdHMgPSBpc1N0cmluZyhxdWVyeSkgPyBpc1N0cmluZyh0aGlzLl9kb2NzWzBdKSA/IHRoaXMuX3NlYXJjaFN0cmluZ0xpc3QocXVlcnkpIDogdGhpcy5fc2VhcmNoT2JqZWN0TGlzdChxdWVyeSkgOiB0aGlzLl9zZWFyY2hMb2dpY2FsKHF1ZXJ5KTtcbiAgICAgIGNvbXB1dGVTY29yZShyZXN1bHRzLCB7XG4gICAgICAgIGlnbm9yZUZpZWxkTm9ybTogaWdub3JlRmllbGROb3JtXG4gICAgICB9KTtcbiAgICAgIGlmIChzaG91bGRTb3J0KSB7XG4gICAgICAgIHJlc3VsdHMuc29ydChzb3J0Rm4pO1xuICAgICAgfVxuICAgICAgaWYgKGlzTnVtYmVyKGxpbWl0KSAmJiBsaW1pdCA+IC0xKSB7XG4gICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLnNsaWNlKDAsIGxpbWl0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmb3JtYXQocmVzdWx0cywgdGhpcy5fZG9jcywge1xuICAgICAgICBpbmNsdWRlTWF0Y2hlczogaW5jbHVkZU1hdGNoZXMsXG4gICAgICAgIGluY2x1ZGVTY29yZTogaW5jbHVkZVNjb3JlXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX3NlYXJjaFN0cmluZ0xpc3RcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NlYXJjaFN0cmluZ0xpc3QocXVlcnkpIHtcbiAgICAgIHZhciBzZWFyY2hlciA9IGNyZWF0ZVNlYXJjaGVyKHF1ZXJ5LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgdmFyIHJlY29yZHMgPSB0aGlzLl9teUluZGV4LnJlY29yZHM7XG4gICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgICAvLyBJdGVyYXRlIG92ZXIgZXZlcnkgc3RyaW5nIGluIHRoZSBpbmRleFxuICAgICAgcmVjb3Jkcy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgICB2YXIgdGV4dCA9IF9yZWYyLnYsXG4gICAgICAgICAgaWR4ID0gX3JlZjIuaSxcbiAgICAgICAgICBub3JtID0gX3JlZjIubjtcbiAgICAgICAgaWYgKCFpc0RlZmluZWQodGV4dCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9zZWFyY2hlciRzZWFyY2hJbiA9IHNlYXJjaGVyLnNlYXJjaEluKHRleHQpLFxuICAgICAgICAgIGlzTWF0Y2ggPSBfc2VhcmNoZXIkc2VhcmNoSW4uaXNNYXRjaCxcbiAgICAgICAgICBzY29yZSA9IF9zZWFyY2hlciRzZWFyY2hJbi5zY29yZSxcbiAgICAgICAgICBpbmRpY2VzID0gX3NlYXJjaGVyJHNlYXJjaEluLmluZGljZXM7XG4gICAgICAgIGlmIChpc01hdGNoKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICAgIGl0ZW06IHRleHQsXG4gICAgICAgICAgICBpZHg6IGlkeCxcbiAgICAgICAgICAgIG1hdGNoZXM6IFt7XG4gICAgICAgICAgICAgIHNjb3JlOiBzY29yZSxcbiAgICAgICAgICAgICAgdmFsdWU6IHRleHQsXG4gICAgICAgICAgICAgIG5vcm06IG5vcm0sXG4gICAgICAgICAgICAgIGluZGljZXM6IGluZGljZXNcbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9zZWFyY2hMb2dpY2FsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZWFyY2hMb2dpY2FsKHF1ZXJ5KSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgdmFyIGV4cHJlc3Npb24gPSBwYXJzZShxdWVyeSwgdGhpcy5vcHRpb25zKTtcbiAgICAgIHZhciBldmFsdWF0ZSA9IGZ1bmN0aW9uIGV2YWx1YXRlKG5vZGUsIGl0ZW0sIGlkeCkge1xuICAgICAgICBpZiAoIW5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICB2YXIga2V5SWQgPSBub2RlLmtleUlkLFxuICAgICAgICAgICAgc2VhcmNoZXIgPSBub2RlLnNlYXJjaGVyO1xuICAgICAgICAgIHZhciBtYXRjaGVzID0gX3RoaXMuX2ZpbmRNYXRjaGVzKHtcbiAgICAgICAgICAgIGtleTogX3RoaXMuX2tleVN0b3JlLmdldChrZXlJZCksXG4gICAgICAgICAgICB2YWx1ZTogX3RoaXMuX215SW5kZXguZ2V0VmFsdWVGb3JJdGVtQXRLZXlJZChpdGVtLCBrZXlJZCksXG4gICAgICAgICAgICBzZWFyY2hlcjogc2VhcmNoZXJcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAobWF0Y2hlcyAmJiBtYXRjaGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICAgIGlkeDogaWR4LFxuICAgICAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgICAgICBtYXRjaGVzOiBtYXRjaGVzXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgICB2YXIgY2hpbGQgPSBub2RlLmNoaWxkcmVuW2ldO1xuICAgICAgICAgIHZhciByZXN1bHQgPSBldmFsdWF0ZShjaGlsZCwgaXRlbSwgaWR4KTtcbiAgICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzLnB1c2guYXBwbHkocmVzLCBfdG9Db25zdW1hYmxlQXJyYXkocmVzdWx0KSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChub2RlLm9wZXJhdG9yID09PSBMb2dpY2FsT3BlcmF0b3IuQU5EKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9O1xuICAgICAgdmFyIHJlY29yZHMgPSB0aGlzLl9teUluZGV4LnJlY29yZHM7XG4gICAgICB2YXIgcmVzdWx0TWFwID0ge307XG4gICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgcmVjb3Jkcy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmMykge1xuICAgICAgICB2YXIgaXRlbSA9IF9yZWYzLiQsXG4gICAgICAgICAgaWR4ID0gX3JlZjMuaTtcbiAgICAgICAgaWYgKGlzRGVmaW5lZChpdGVtKSkge1xuICAgICAgICAgIHZhciBleHBSZXN1bHRzID0gZXZhbHVhdGUoZXhwcmVzc2lvbiwgaXRlbSwgaWR4KTtcbiAgICAgICAgICBpZiAoZXhwUmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIERlZHVwZSB3aGVuIGFkZGluZ1xuICAgICAgICAgICAgaWYgKCFyZXN1bHRNYXBbaWR4XSkge1xuICAgICAgICAgICAgICByZXN1bHRNYXBbaWR4XSA9IHtcbiAgICAgICAgICAgICAgICBpZHg6IGlkeCxcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgICAgICAgIG1hdGNoZXM6IFtdXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHRNYXBbaWR4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHBSZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKF9yZWY0KSB7XG4gICAgICAgICAgICAgIHZhciBfcmVzdWx0TWFwJGlkeCRtYXRjaGU7XG4gICAgICAgICAgICAgIHZhciBtYXRjaGVzID0gX3JlZjQubWF0Y2hlcztcbiAgICAgICAgICAgICAgKF9yZXN1bHRNYXAkaWR4JG1hdGNoZSA9IHJlc3VsdE1hcFtpZHhdLm1hdGNoZXMpLnB1c2guYXBwbHkoX3Jlc3VsdE1hcCRpZHgkbWF0Y2hlLCBfdG9Db25zdW1hYmxlQXJyYXkobWF0Y2hlcykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfc2VhcmNoT2JqZWN0TGlzdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2VhcmNoT2JqZWN0TGlzdChxdWVyeSkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG4gICAgICB2YXIgc2VhcmNoZXIgPSBjcmVhdGVTZWFyY2hlcihxdWVyeSwgdGhpcy5vcHRpb25zKTtcbiAgICAgIHZhciBfdGhpcyRfbXlJbmRleCA9IHRoaXMuX215SW5kZXgsXG4gICAgICAgIGtleXMgPSBfdGhpcyRfbXlJbmRleC5rZXlzLFxuICAgICAgICByZWNvcmRzID0gX3RoaXMkX215SW5kZXgucmVjb3JkcztcbiAgICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICAgIC8vIExpc3QgaXMgQXJyYXk8T2JqZWN0PlxuICAgICAgcmVjb3Jkcy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmNSkge1xuICAgICAgICB2YXIgaXRlbSA9IF9yZWY1LiQsXG4gICAgICAgICAgaWR4ID0gX3JlZjUuaTtcbiAgICAgICAgaWYgKCFpc0RlZmluZWQoaXRlbSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1hdGNoZXMgPSBbXTtcblxuICAgICAgICAvLyBJdGVyYXRlIG92ZXIgZXZlcnkga2V5IChpLmUsIHBhdGgpLCBhbmQgZmV0Y2ggdGhlIHZhbHVlIGF0IHRoYXQga2V5XG4gICAgICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5LCBrZXlJbmRleCkge1xuICAgICAgICAgIG1hdGNoZXMucHVzaC5hcHBseShtYXRjaGVzLCBfdG9Db25zdW1hYmxlQXJyYXkoX3RoaXMyLl9maW5kTWF0Y2hlcyh7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIHZhbHVlOiBpdGVtW2tleUluZGV4XSxcbiAgICAgICAgICAgIHNlYXJjaGVyOiBzZWFyY2hlclxuICAgICAgICAgIH0pKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobWF0Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgICAgaWR4OiBpZHgsXG4gICAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgICAgbWF0Y2hlczogbWF0Y2hlc1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfZmluZE1hdGNoZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2ZpbmRNYXRjaGVzKF9yZWY2KSB7XG4gICAgICB2YXIga2V5ID0gX3JlZjYua2V5LFxuICAgICAgICB2YWx1ZSA9IF9yZWY2LnZhbHVlLFxuICAgICAgICBzZWFyY2hlciA9IF9yZWY2LnNlYXJjaGVyO1xuICAgICAgaWYgKCFpc0RlZmluZWQodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIHZhciBtYXRjaGVzID0gW107XG4gICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjcpIHtcbiAgICAgICAgICB2YXIgdGV4dCA9IF9yZWY3LnYsXG4gICAgICAgICAgICBpZHggPSBfcmVmNy5pLFxuICAgICAgICAgICAgbm9ybSA9IF9yZWY3Lm47XG4gICAgICAgICAgaWYgKCFpc0RlZmluZWQodGV4dCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIF9zZWFyY2hlciRzZWFyY2hJbjIgPSBzZWFyY2hlci5zZWFyY2hJbih0ZXh0KSxcbiAgICAgICAgICAgIGlzTWF0Y2ggPSBfc2VhcmNoZXIkc2VhcmNoSW4yLmlzTWF0Y2gsXG4gICAgICAgICAgICBzY29yZSA9IF9zZWFyY2hlciRzZWFyY2hJbjIuc2NvcmUsXG4gICAgICAgICAgICBpbmRpY2VzID0gX3NlYXJjaGVyJHNlYXJjaEluMi5pbmRpY2VzO1xuICAgICAgICAgIGlmIChpc01hdGNoKSB7XG4gICAgICAgICAgICBtYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgICBzY29yZTogc2NvcmUsXG4gICAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgICB2YWx1ZTogdGV4dCxcbiAgICAgICAgICAgICAgaWR4OiBpZHgsXG4gICAgICAgICAgICAgIG5vcm06IG5vcm0sXG4gICAgICAgICAgICAgIGluZGljZXM6IGluZGljZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdGV4dCA9IHZhbHVlLnYsXG4gICAgICAgICAgbm9ybSA9IHZhbHVlLm47XG4gICAgICAgIHZhciBfc2VhcmNoZXIkc2VhcmNoSW4zID0gc2VhcmNoZXIuc2VhcmNoSW4odGV4dCksXG4gICAgICAgICAgaXNNYXRjaCA9IF9zZWFyY2hlciRzZWFyY2hJbjMuaXNNYXRjaCxcbiAgICAgICAgICBzY29yZSA9IF9zZWFyY2hlciRzZWFyY2hJbjMuc2NvcmUsXG4gICAgICAgICAgaW5kaWNlcyA9IF9zZWFyY2hlciRzZWFyY2hJbjMuaW5kaWNlcztcbiAgICAgICAgaWYgKGlzTWF0Y2gpIHtcbiAgICAgICAgICBtYXRjaGVzLnB1c2goe1xuICAgICAgICAgICAgc2NvcmU6IHNjb3JlLFxuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICB2YWx1ZTogdGV4dCxcbiAgICAgICAgICAgIG5vcm06IG5vcm0sXG4gICAgICAgICAgICBpbmRpY2VzOiBpbmRpY2VzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gRnVzZTtcbn0oKTtcblxuRnVzZSQxLnZlcnNpb24gPSAnNy4wLjAnO1xuRnVzZSQxLmNyZWF0ZUluZGV4ID0gY3JlYXRlSW5kZXg7XG5GdXNlJDEucGFyc2VJbmRleCA9IHBhcnNlSW5kZXg7XG5GdXNlJDEuY29uZmlnID0gQ29uZmlnO1xue1xuICBGdXNlJDEucGFyc2VRdWVyeSA9IHBhcnNlO1xufVxue1xuICByZWdpc3RlcihFeHRlbmRlZFNlYXJjaCk7XG59XG52YXIgRnVzZSA9IEZ1c2UkMTtcblxubW9kdWxlLmV4cG9ydHMgPSBGdXNlO1xuIiwgImNvbnN0IEZ1c2UgPSByZXF1aXJlKCdmdXNlLmpzJylcclxuXHJcbi8vIHRvZG8gd2lsbCBtYWtlIHRoaXMgaW5mb3JtYXRpb24gYmUgcmVhZCBmcm9tIHRoZSBkYXRhYmFzZSBidXQgd2lsbCBsZXQgaXQgYmUgaGFyZGNvZGVkIGZvciBub3cgXHJcbi8vIERPTkUhXHJcbi8vIGNvbnN0IGNsdWJzID0gW1xyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIG5hbWU6IFwiTVRVIFVuaXRlZFwiLFxyXG4vLyAgICAgICAgIHNwb3J0OiBcIkZvb3RiYWxsXCJcclxuLy8gICAgIH0sXHJcbi8vICAgICB7XHJcbi8vICAgICAgICAgbmFtZTogXCJNVFUgR0FBXCIsXHJcbi8vICAgICAgICAgc3BvcnQ6IFwiR0FBXCJcclxuLy8gICAgIH0sXHJcbi8vICAgICB7XHJcbi8vICAgICAgICAgbmFtZTogXCJNVFUgUkZDXCIsXHJcbi8vICAgICAgICAgc3BvcnQ6IFwiUnVnYnlcIlxyXG4vLyAgICAgfSxcclxuLy8gICAgIHtcclxuLy8gICAgICAgICBuYW1lOiBcIkxlaXN1cmUgV29ybGQgU3dpbW1pbmdcIixcclxuLy8gICAgICAgICBzcG9ydDogXCJTd2ltbWluZ1wiXHJcbi8vICAgICB9LFxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIG5hbWU6IFwiTVRVIEFyZW5hIEd5bVwiLFxyXG4vLyAgICAgICAgIHNwb3J0OiBcIldlaWdodGxpZnRpbmdcIlxyXG4vLyAgICAgfSxcclxuLy8gICAgIHtcclxuLy8gICAgICAgICBuYW1lOiBcIk1UVSBBdGhsZXRpY3NcIixcclxuLy8gICAgICAgICBzcG9ydDogXCJSdW5uaW5nXCJcclxuLy8gICAgIH1cclxuLy8gXTtcclxuXHJcbmxldCBjbHVicyA9IFtdO1xyXG5cclxuY29uc3QgZnVzZSA9IG5ldyBGdXNlKGNsdWJzLCB7XHJcbiAgICBrZXlzOiBbJ25hbWUnLCAnc3BvcnQnXSxcclxuICAgIHRocmVzaG9sZDogMC4zXHJcbn0pO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZENsdWJzKCkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9zaG93YWxsY2x1YnMtNzdoa2kzMnFuYS1udy5hLnJ1bi5hcHAnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBjbHVicyA9IE9iamVjdC5rZXlzKGRhdGEuY2x1YnMpLm1hcChjbHViS2V5ID0+ICh7XHJcbiAgICAgICAgICAgIG5hbWU6IGNsdWJLZXksXHJcbiAgICAgICAgICAgIHNwb3J0OiBkYXRhLmNsdWJzW2NsdWJLZXldLnNwb3J0LFxyXG4gICAgICAgICAgICBjYWxvcnlCdXJuUmF0ZTogZGF0YS5jbHVic1tjbHViS2V5XS5jYWxvcnlCdXJuUmF0ZVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnVHJhbnNmb3JtZWQgQ2x1YnM6JywgY2x1YnMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZ1c2UubGlzdCk7XHJcbiAgICAgICAgZnVzZS5zZXRDb2xsZWN0aW9uKGNsdWJzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBsb2FkIGNsdWJzXCIpO1xyXG4gICAgfVxyXG59XHJcbmxvYWRDbHVicygpO1xyXG5cclxuY29uc3QgdXNlcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJJbnB1dCcpO1xyXG5jb25zdCByZXN1bHRzRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdHMnKTtcclxuXHJcbnVzZXJJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gdXNlcklucHV0LnZhbHVlO1xyXG4gICAgY29uc3QgcmVzdWx0cyA9IGZ1c2Uuc2VhcmNoKHF1ZXJ5KTtcclxuXHJcbiAgICAvL2NsZWFyIHByZXYgcmVzdWx0c1xyXG4gICAgcmVzdWx0c0Rpdi5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAvL2Rpc3BsYXkgbmV3IHJlc3VsdHNcclxuICAgIHJlc3VsdHMuZm9yRWFjaChyZXN1bHQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNsdWIgPSByZXN1bHQuaXRlbTtcclxuICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgncmVzdWx0Jyk7XHJcbiAgICAgICAgZGl2LnRleHRDb250ZW50ID0gYCR7Y2x1Yi5uYW1lfSAtXFx0U3BvcnQ6ICR7Y2x1Yi5zcG9ydH0gLVxcdENhbG9yeSBCdXJuIFJhdGU6ICR7Y2x1Yi5jYWxvcnlCdXJuUmF0ZX1jYWwvaHJgO1xyXG4gICAgICAgIHJlc3VsdHNEaXYuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJlc3VsdHNEaXYudGV4dENvbnRlbnQgPSBcIk5vIGNsdWJzIGZvdW5kLlwiO1xyXG4gICAgfVxyXG59KTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBV0EsZUFBUyxRQUFRLFFBQVEsZ0JBQWdCO0FBQ3ZDLFlBQUksT0FBTyxPQUFPLEtBQUssTUFBTTtBQUM3QixZQUFJLE9BQU8sdUJBQXVCO0FBQ2hDLGNBQUksVUFBVSxPQUFPLHNCQUFzQixNQUFNO0FBQ2pELDZCQUFtQixVQUFVLFFBQVEsT0FBTyxTQUFVLEtBQUs7QUFDekQsbUJBQU8sT0FBTyx5QkFBeUIsUUFBUSxHQUFHLEVBQUU7QUFBQSxVQUN0RCxDQUFDLElBQUksS0FBSyxLQUFLLE1BQU0sTUFBTSxPQUFPO0FBQUEsUUFDcEM7QUFDQSxlQUFPO0FBQUEsTUFDVDtBQUNBLGVBQVMsZUFBZSxRQUFRO0FBQzlCLGlCQUFTLElBQUksR0FBRyxJQUFJLFVBQVUsUUFBUSxLQUFLO0FBQ3pDLGNBQUksU0FBUyxRQUFRLFVBQVUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7QUFDcEQsY0FBSSxJQUFJLFFBQVEsT0FBTyxNQUFNLEdBQUcsSUFBRSxFQUFFLFFBQVEsU0FBVSxLQUFLO0FBQ3pELDRCQUFnQixRQUFRLEtBQUssT0FBTyxHQUFHLENBQUM7QUFBQSxVQUMxQyxDQUFDLElBQUksT0FBTyw0QkFBNEIsT0FBTyxpQkFBaUIsUUFBUSxPQUFPLDBCQUEwQixNQUFNLENBQUMsSUFBSSxRQUFRLE9BQU8sTUFBTSxDQUFDLEVBQUUsUUFBUSxTQUFVLEtBQUs7QUFDakssbUJBQU8sZUFBZSxRQUFRLEtBQUssT0FB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O0FBRUQsUUFBSSxRQUFRLFdBQVcsR0FBRztBQUN0QixpQkFBVyxjQUFjO0FBQUEsSUFDN0I7QUFBQSxFQUNKLENBQUM7IiwKICAibmFtZXMiOiBbIm9iaiIsICJfZ2V0UHJvdG90eXBlT2YiLCAibyIsICJfc2V0UHJvdG90eXBlT2YiLCAicCIsICJMT0dJQ0FMX1NFQVJDSF9JTlZBTElEX1FVRVJZX0ZPUl9LRVkiLCAiUEFUVEVSTl9MRU5HVEhfVE9PX0xBUkdFIiwgIk1JU1NJTkdfS0VZX1BST1BFUlRZIiwgIklOVkFMSURfS0VZX1dFSUdIVF9WQUxVRSIsICJLZXlTdG9yZSIsICJnZXQiLCAiZGVlcEdldCIsICJwYXRoIiwgIm5vcm0iLCAiRnVzZUluZGV4IiwgIkJpdGFwU2VhcmNoIiwgImFkZENodW5rIiwgInBhdHRlcm4iLCAic3RhcnRJbmRleCIsICJCYXNlTWF0Y2giLCAic2VhcmNoIiwgIkV4YWN0TWF0Y2giLCAiSW52ZXJzZUV4YWN0TWF0Y2giLCAiUHJlZml4RXhhY3RNYXRjaCIsICJJbnZlcnNlUHJlZml4RXhhY3RNYXRjaCIsICJTdWZmaXhFeGFjdE1hdGNoIiwgIkludmVyc2VTdWZmaXhFeGFjdE1hdGNoIiwgIkZ1enp5TWF0Y2giLCAiSW5jbHVkZU1hdGNoIiwgIml0ZW0iLCAiRXh0ZW5kZWRTZWFyY2giLCAic2VhcmNoZXJzIiwgImlzRXhwcmVzc2lvbiIsICJpc1BhdGgiLCAiaXNMZWFmIiwgImNvbnZlcnRUb0V4cGxpY2l0IiwgIm5leHQiLCAicXVlcnkiLCAia2V5IiwgIkZ1c2UiLCAiZXZhbHVhdGUiLCAidGV4dCIsICJpc01hdGNoIiwgInNjb3JlIiwgImluZGljZXMiXQp9Cg==
