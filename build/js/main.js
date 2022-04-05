/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "be20c9041cfc30b7ba62";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3000/wp_ohpardon/wordpress/wp-content/themes/oax-ohpardon/build/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(1)(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/ansi-html/index.js":
/*!******************************************!*\
  !*** ../node_modules/ansi-html/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "../node_modules/ansi-regex/index.js":
/*!*******************************************!*\
  !*** ../node_modules/ansi-regex/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),

/***/ "../node_modules/ev-emitter/ev-emitter.js":
/*!************************************************!*\
  !*** ../node_modules/ev-emitter/ev-emitter.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));


/***/ }),

/***/ "../node_modules/headroom.js/dist/headroom.js":
/*!****************************************************!*\
  !*** ../node_modules/headroom.js/dist/headroom.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * headroom.js v0.9.4 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2017 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

(function(root, factory) {
  'use strict';

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  else {}
}(this, function() {
  'use strict';

  /* exported features */
  
  var features = {
    bind : !!(function(){}.bind),
    classList : 'classList' in document.documentElement,
    rAF : !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
  };
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
  
  /**
   * Handles debouncing of events via requestAnimationFrame
   * @see http://www.html5rocks.com/en/tutorials/speed/animations/
   * @param {Function} callback The callback to handle whichever event
   */
  function Debouncer (callback) {
    this.callback = callback;
    this.ticking = false;
  }
  Debouncer.prototype = {
    constructor : Debouncer,
  
    /**
     * dispatches the event to the supplied callback
     * @private
     */
    update : function() {
      this.callback && this.callback();
      this.ticking = false;
    },
  
    /**
     * ensures events don't get stacked
     * @private
     */
    requestTick : function() {
      if(!this.ticking) {
        requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
        this.ticking = true;
      }
    },
  
    /**
     * Attach this as the event listeners
     */
    handleEvent : function() {
      this.requestTick();
    }
  };
  /**
   * Check if object is part of the DOM
   * @constructor
   * @param {Object} obj element to check
   */
  function isDOMElement(obj) {
    return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
  }
  
  /**
   * Helper function for extending objects
   */
  function extend (object /*, objectN ... */) {
    if(arguments.length <= 0) {
      throw new Error('Missing arguments in extend function');
    }
  
    var result = object || {},
        key,
        i;
  
    for (i = 1; i < arguments.length; i++) {
      var replacement = arguments[i] || {};
  
      for (key in replacement) {
        // Recurse into object except if the object is a DOM element
        if(typeof result[key] === 'object' && ! isDOMElement(result[key])) {
          result[key] = extend(result[key], replacement[key]);
        }
        else {
          result[key] = result[key] || replacement[key];
        }
      }
    }
  
    return result;
  }
  
  /**
   * Helper function for normalizing tolerance option to object format
   */
  function normalizeTolerance (t) {
    return t === Object(t) ? t : { down : t, up : t };
  }
  
  /**
   * UI enhancement for fixed headers.
   * Hides header when scrolling down
   * Shows header when scrolling up
   * @constructor
   * @param {DOMElement} elem the header element
   * @param {Object} options options for the widget
   */
  function Headroom (elem, options) {
    options = extend(options, Headroom.options);
  
    this.lastKnownScrollY = 0;
    this.elem             = elem;
    this.tolerance        = normalizeTolerance(options.tolerance);
    this.classes          = options.classes;
    this.offset           = options.offset;
    this.scroller         = options.scroller;
    this.initialised      = false;
    this.onPin            = options.onPin;
    this.onUnpin          = options.onUnpin;
    this.onTop            = options.onTop;
    this.onNotTop         = options.onNotTop;
    this.onBottom         = options.onBottom;
    this.onNotBottom      = options.onNotBottom;
  }
  Headroom.prototype = {
    constructor : Headroom,
  
    /**
     * Initialises the widget
     */
    init : function() {
      if(!Headroom.cutsTheMustard) {
        return;
      }
  
      this.debouncer = new Debouncer(this.update.bind(this));
      this.elem.classList.add(this.classes.initial);
  
      // defer event registration to handle browser
      // potentially restoring previous scroll position
      setTimeout(this.attachEvent.bind(this), 100);
  
      return this;
    },
  
    /**
     * Unattaches events and removes any classes that were added
     */
    destroy : function() {
      var classes = this.classes;
  
      this.initialised = false;
  
      for (var key in classes) {
        if(classes.hasOwnProperty(key)) {
          this.elem.classList.remove(classes[key]);
        }
      }
  
      this.scroller.removeEventListener('scroll', this.debouncer, false);
    },
  
    /**
     * Attaches the scroll event
     * @private
     */
    attachEvent : function() {
      if(!this.initialised){
        this.lastKnownScrollY = this.getScrollY();
        this.initialised = true;
        this.scroller.addEventListener('scroll', this.debouncer, false);
  
        this.debouncer.handleEvent();
      }
    },
  
    /**
     * Unpins the header if it's currently pinned
     */
    unpin : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(classList.contains(classes.pinned) || !classList.contains(classes.unpinned)) {
        classList.add(classes.unpinned);
        classList.remove(classes.pinned);
        this.onUnpin && this.onUnpin.call(this);
      }
    },
  
    /**
     * Pins the header if it's currently unpinned
     */
    pin : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(classList.contains(classes.unpinned)) {
        classList.remove(classes.unpinned);
        classList.add(classes.pinned);
        this.onPin && this.onPin.call(this);
      }
    },
  
    /**
     * Handles the top states
     */
    top : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(!classList.contains(classes.top)) {
        classList.add(classes.top);
        classList.remove(classes.notTop);
        this.onTop && this.onTop.call(this);
      }
    },
  
    /**
     * Handles the not top state
     */
    notTop : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(!classList.contains(classes.notTop)) {
        classList.add(classes.notTop);
        classList.remove(classes.top);
        this.onNotTop && this.onNotTop.call(this);
      }
    },
  
    bottom : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(!classList.contains(classes.bottom)) {
        classList.add(classes.bottom);
        classList.remove(classes.notBottom);
        this.onBottom && this.onBottom.call(this);
      }
    },
  
    /**
     * Handles the not top state
     */
    notBottom : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(!classList.contains(classes.notBottom)) {
        classList.add(classes.notBottom);
        classList.remove(classes.bottom);
        this.onNotBottom && this.onNotBottom.call(this);
      }
    },
  
    /**
     * Gets the Y scroll position
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
     * @return {Number} pixels the page has scrolled along the Y-axis
     */
    getScrollY : function() {
      return (this.scroller.pageYOffset !== undefined)
        ? this.scroller.pageYOffset
        : (this.scroller.scrollTop !== undefined)
          ? this.scroller.scrollTop
          : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    },
  
    /**
     * Gets the height of the viewport
     * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
     * @return {int} the height of the viewport in pixels
     */
    getViewportHeight : function () {
      return window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    },
  
    /**
     * Gets the physical height of the DOM element
     * @param  {Object}  elm the element to calculate the physical height of which
     * @return {int}     the physical height of the element in pixels
     */
    getElementPhysicalHeight : function (elm) {
      return Math.max(
        elm.offsetHeight,
        elm.clientHeight
      );
    },
  
    /**
     * Gets the physical height of the scroller element
     * @return {int} the physical height of the scroller element in pixels
     */
    getScrollerPhysicalHeight : function () {
      return (this.scroller === window || this.scroller === document.body)
        ? this.getViewportHeight()
        : this.getElementPhysicalHeight(this.scroller);
    },
  
    /**
     * Gets the height of the document
     * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
     * @return {int} the height of the document in pixels
     */
    getDocumentHeight : function () {
      var body = document.body,
        documentElement = document.documentElement;
  
      return Math.max(
        body.scrollHeight, documentElement.scrollHeight,
        body.offsetHeight, documentElement.offsetHeight,
        body.clientHeight, documentElement.clientHeight
      );
    },
  
    /**
     * Gets the height of the DOM element
     * @param  {Object}  elm the element to calculate the height of which
     * @return {int}     the height of the element in pixels
     */
    getElementHeight : function (elm) {
      return Math.max(
        elm.scrollHeight,
        elm.offsetHeight,
        elm.clientHeight
      );
    },
  
    /**
     * Gets the height of the scroller element
     * @return {int} the height of the scroller element in pixels
     */
    getScrollerHeight : function () {
      return (this.scroller === window || this.scroller === document.body)
        ? this.getDocumentHeight()
        : this.getElementHeight(this.scroller);
    },
  
    /**
     * determines if the scroll position is outside of document boundaries
     * @param  {int}  currentScrollY the current y scroll position
     * @return {bool} true if out of bounds, false otherwise
     */
    isOutOfBounds : function (currentScrollY) {
      var pastTop  = currentScrollY < 0,
        pastBottom = currentScrollY + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
  
      return pastTop || pastBottom;
    },
  
    /**
     * determines if the tolerance has been exceeded
     * @param  {int} currentScrollY the current scroll y position
     * @return {bool} true if tolerance exceeded, false otherwise
     */
    toleranceExceeded : function (currentScrollY, direction) {
      return Math.abs(currentScrollY-this.lastKnownScrollY) >= this.tolerance[direction];
    },
  
    /**
     * determine if it is appropriate to unpin
     * @param  {int} currentScrollY the current y scroll position
     * @param  {bool} toleranceExceeded has the tolerance been exceeded?
     * @return {bool} true if should unpin, false otherwise
     */
    shouldUnpin : function (currentScrollY, toleranceExceeded) {
      var scrollingDown = currentScrollY > this.lastKnownScrollY,
        pastOffset = currentScrollY >= this.offset;
  
      return scrollingDown && pastOffset && toleranceExceeded;
    },
  
    /**
     * determine if it is appropriate to pin
     * @param  {int} currentScrollY the current y scroll position
     * @param  {bool} toleranceExceeded has the tolerance been exceeded?
     * @return {bool} true if should pin, false otherwise
     */
    shouldPin : function (currentScrollY, toleranceExceeded) {
      var scrollingUp  = currentScrollY < this.lastKnownScrollY,
        pastOffset = currentScrollY <= this.offset;
  
      return (scrollingUp && toleranceExceeded) || pastOffset;
    },
  
    /**
     * Handles updating the state of the widget
     */
    update : function() {
      var currentScrollY  = this.getScrollY(),
        scrollDirection = currentScrollY > this.lastKnownScrollY ? 'down' : 'up',
        toleranceExceeded = this.toleranceExceeded(currentScrollY, scrollDirection);
  
      if(this.isOutOfBounds(currentScrollY)) { // Ignore bouncy scrolling in OSX
        return;
      }
  
      if (currentScrollY <= this.offset ) {
        this.top();
      } else {
        this.notTop();
      }
  
      if(currentScrollY + this.getViewportHeight() >= this.getScrollerHeight()) {
        this.bottom();
      }
      else {
        this.notBottom();
      }
  
      if(this.shouldUnpin(currentScrollY, toleranceExceeded)) {
        this.unpin();
      }
      else if(this.shouldPin(currentScrollY, toleranceExceeded)) {
        this.pin();
      }
  
      this.lastKnownScrollY = currentScrollY;
    }
  };
  /**
   * Default options
   * @type {Object}
   */
  Headroom.options = {
    tolerance : {
      up : 0,
      down : 0
    },
    offset : 0,
    scroller: window,
    classes : {
      pinned : 'headroom--pinned',
      unpinned : 'headroom--unpinned',
      top : 'headroom--top',
      notTop : 'headroom--not-top',
      bottom : 'headroom--bottom',
      notBottom : 'headroom--not-bottom',
      initial : 'headroom'
    }
  };
  Headroom.cutsTheMustard = typeof features !== 'undefined' && features.rAF && features.bind && features.classList;

  return Headroom;
}));

/***/ }),

/***/ "../node_modules/html-entities/index.js":
/*!**********************************************!*\
  !*** ../node_modules/html-entities/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  XmlEntities: __webpack_require__(/*! ./lib/xml-entities.js */ "../node_modules/html-entities/lib/xml-entities.js"),
  Html4Entities: __webpack_require__(/*! ./lib/html4-entities.js */ "../node_modules/html-entities/lib/html4-entities.js"),
  Html5Entities: __webpack_require__(/*! ./lib/html5-entities.js */ "../node_modules/html-entities/lib/html5-entities.js"),
  AllHtmlEntities: __webpack_require__(/*! ./lib/html5-entities.js */ "../node_modules/html-entities/lib/html5-entities.js")
};


/***/ }),

/***/ "../node_modules/html-entities/lib/html4-entities.js":
/*!***********************************************************!*\
  !*** ../node_modules/html-entities/lib/html4-entities.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];

var alphaIndex = {};
var numIndex = {};

var i = 0;
var length = HTML_ALPHA.length;
while (i < length) {
    var a = HTML_ALPHA[i];
    var c = HTML_CODES[i];
    alphaIndex[a] = String.fromCharCode(c);
    numIndex[c] = a;
    i++;
}

/**
 * @constructor
 */
function Html4Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1).toLowerCase() === 'x' ?
                parseInt(entity.substr(2), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.decode = function(str) {
    return new Html4Entities().decode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var alpha = numIndex[str.charCodeAt(i)];
        result += alpha ? "&" + alpha + ";" : str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encode = function(str) {
    return new Html4Entities().encode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var cc = str.charCodeAt(i);
        var alpha = numIndex[cc];
        if (alpha) {
            result += "&" + alpha + ";";
        } else if (cc < 32 || cc > 126) {
            result += "&#" + cc + ";";
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonUTF = function(str) {
    return new Html4Entities().encodeNonUTF(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonASCII = function(str) {
    return new Html4Entities().encodeNonASCII(str);
};

module.exports = Html4Entities;


/***/ }),

/***/ "../node_modules/html-entities/lib/html5-entities.js":
/*!***********************************************************!*\
  !*** ../node_modules/html-entities/lib/html5-entities.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];

var alphaIndex = {};
var charIndex = {};

createIndexes(alphaIndex, charIndex);

/**
 * @constructor
 */
function Html5Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1) === 'x' ?
                parseInt(entity.substr(2).toLowerCase(), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.decode = function(str) {
    return new Html5Entities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var charInfo = charIndex[str.charCodeAt(i)];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        result += str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encode = function(str) {
    return new Html5Entities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var charInfo = charIndex[c];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonUTF = function(str) {
    return new Html5Entities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonASCII = function(str) {
    return new Html5Entities().encodeNonASCII(str);
 };

/**
 * @param {Object} alphaIndex Passed by reference.
 * @param {Object} charIndex Passed by reference.
 */
function createIndexes(alphaIndex, charIndex) {
    var i = ENTITIES.length;
    var _results = [];
    while (i--) {
        var e = ENTITIES[i];
        var alpha = e[0];
        var chars = e[1];
        var chr = chars[0];
        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
        var charInfo;
        if (addChar) {
            charInfo = charIndex[chr] = charIndex[chr] || {};
        }
        if (chars[1]) {
            var chr2 = chars[1];
            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
            _results.push(addChar && (charInfo[chr2] = alpha));
        } else {
            alphaIndex[alpha] = String.fromCharCode(chr);
            _results.push(addChar && (charInfo[''] = alpha));
        }
    }
}

module.exports = Html5Entities;


/***/ }),

/***/ "../node_modules/html-entities/lib/xml-entities.js":
/*!*********************************************************!*\
  !*** ../node_modules/html-entities/lib/xml-entities.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ALPHA_INDEX = {
    '&lt': '<',
    '&gt': '>',
    '&quot': '"',
    '&apos': '\'',
    '&amp': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': '\'',
    '&amp;': '&'
};

var CHAR_INDEX = {
    60: 'lt',
    62: 'gt',
    34: 'quot',
    39: 'apos',
    38: 'amp'
};

var CHAR_S_INDEX = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
    '&': '&amp;'
};

/**
 * @constructor
 */
function XmlEntities() {}

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/<|>|"|'|&/g, function(s) {
        return CHAR_S_INDEX[s];
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encode = function(str) {
    return new XmlEntities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {
        if (s.charAt(1) === '#') {
            var code = s.charAt(2).toLowerCase() === 'x' ?
                parseInt(s.substr(3), 16) :
                parseInt(s.substr(2));

            if (isNaN(code) || code < -32768 || code > 65535) {
                return '';
            }
            return String.fromCharCode(code);
        }
        return ALPHA_INDEX[s] || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.decode = function(str) {
    return new XmlEntities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var alpha = CHAR_INDEX[c];
        if (alpha) {
            result += "&" + alpha + ";";
            i++;
            continue;
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonUTF = function(str) {
    return new XmlEntities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLenght = str.length;
    var result = '';
    var i = 0;
    while (i < strLenght) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonASCII = function(str) {
    return new XmlEntities().encodeNonASCII(str);
 };

module.exports = XmlEntities;


/***/ }),

/***/ "../node_modules/imagesloaded/imagesloaded.js":
/*!****************************************************!*\
  !*** ../node_modules/imagesloaded/imagesloaded.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(/*! ev-emitter/ev-emitter */ "../node_modules/ev-emitter/ev-emitter.js")
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( EvEmitter ) {
      return factory( window, EvEmitter );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

})( typeof window !== 'undefined' ? window : this,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {

'use strict';

var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
function makeArray( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
}

// -------------------------- imagesLoaded -------------------------- //

/**
 * @param {Array, Element, NodeList, String} elem
 * @param {Object or Function} options - if function, use as callback
 * @param {Function} onAlways - callback function
 */
function ImagesLoaded( elem, options, onAlways ) {
  // coerce ImagesLoaded() without new, to be new ImagesLoaded()
  if ( !( this instanceof ImagesLoaded ) ) {
    return new ImagesLoaded( elem, options, onAlways );
  }
  // use elem as selector string
  var queryElem = elem;
  if ( typeof elem == 'string' ) {
    queryElem = document.querySelectorAll( elem );
  }
  // bail if bad element
  if ( !queryElem ) {
    console.error( 'Bad element for imagesLoaded ' + ( queryElem || elem ) );
    return;
  }

  this.elements = makeArray( queryElem );
  this.options = extend( {}, this.options );
  // shift arguments if no options set
  if ( typeof options == 'function' ) {
    onAlways = options;
  } else {
    extend( this.options, options );
  }

  if ( onAlways ) {
    this.on( 'always', onAlways );
  }

  this.getImages();

  if ( $ ) {
    // add jQuery Deferred object
    this.jqDeferred = new $.Deferred();
  }

  // HACK check async to allow time to bind listeners
  setTimeout( this.check.bind( this ) );
}

ImagesLoaded.prototype = Object.create( EvEmitter.prototype );

ImagesLoaded.prototype.options = {};

ImagesLoaded.prototype.getImages = function() {
  this.images = [];

  // filter & find items if we have an item selector
  this.elements.forEach( this.addElementImages, this );
};

/**
 * @param {Node} element
 */
ImagesLoaded.prototype.addElementImages = function( elem ) {
  // filter siblings
  if ( elem.nodeName == 'IMG' ) {
    this.addImage( elem );
  }
  // get background image on element
  if ( this.options.background === true ) {
    this.addElementBackgroundImages( elem );
  }

  // find children
  // no non-element nodes, #143
  var nodeType = elem.nodeType;
  if ( !nodeType || !elementNodeTypes[ nodeType ] ) {
    return;
  }
  var childImgs = elem.querySelectorAll('img');
  // concat childElems to filterFound array
  for ( var i=0; i < childImgs.length; i++ ) {
    var img = childImgs[i];
    this.addImage( img );
  }

  // get child background images
  if ( typeof this.options.background == 'string' ) {
    var children = elem.querySelectorAll( this.options.background );
    for ( i=0; i < children.length; i++ ) {
      var child = children[i];
      this.addElementBackgroundImages( child );
    }
  }
};

var elementNodeTypes = {
  1: true,
  9: true,
  11: true
};

ImagesLoaded.prototype.addElementBackgroundImages = function( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    // Firefox returns null if in a hidden iframe https://bugzil.la/548397
    return;
  }
  // get url inside url("...")
  var reURL = /url\((['"])?(.*?)\1\)/gi;
  var matches = reURL.exec( style.backgroundImage );
  while ( matches !== null ) {
    var url = matches && matches[2];
    if ( url ) {
      this.addBackground( url, elem );
    }
    matches = reURL.exec( style.backgroundImage );
  }
};

/**
 * @param {Image} img
 */
ImagesLoaded.prototype.addImage = function( img ) {
  var loadingImage = new LoadingImage( img );
  this.images.push( loadingImage );
};

ImagesLoaded.prototype.addBackground = function( url, elem ) {
  var background = new Background( url, elem );
  this.images.push( background );
};

ImagesLoaded.prototype.check = function() {
  var _this = this;
  this.progressedCount = 0;
  this.hasAnyBroken = false;
  // complete if no images
  if ( !this.images.length ) {
    this.complete();
    return;
  }

  function onProgress( image, elem, message ) {
    // HACK - Chrome triggers event before object properties have changed. #83
    setTimeout( function() {
      _this.progress( image, elem, message );
    });
  }

  this.images.forEach( function( loadingImage ) {
    loadingImage.once( 'progress', onProgress );
    loadingImage.check();
  });
};

ImagesLoaded.prototype.progress = function( image, elem, message ) {
  this.progressedCount++;
  this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
  // progress event
  this.emitEvent( 'progress', [ this, image, elem ] );
  if ( this.jqDeferred && this.jqDeferred.notify ) {
    this.jqDeferred.notify( this, image );
  }
  // check if completed
  if ( this.progressedCount == this.images.length ) {
    this.complete();
  }

  if ( this.options.debug && console ) {
    console.log( 'progress: ' + message, image, elem );
  }
};

ImagesLoaded.prototype.complete = function() {
  var eventName = this.hasAnyBroken ? 'fail' : 'done';
  this.isComplete = true;
  this.emitEvent( eventName, [ this ] );
  this.emitEvent( 'always', [ this ] );
  if ( this.jqDeferred ) {
    var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
    this.jqDeferred[ jqMethod ]( this );
  }
};

// --------------------------  -------------------------- //

function LoadingImage( img ) {
  this.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  // check for non-zero, non-undefined naturalWidth
  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
  return this.img.complete && this.img.naturalWidth;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});


/***/ }),

/***/ "../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!********************************************************************************!*\
  !*** ../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-env browser */

/*
  eslint-disable
  no-console,
  func-names
*/
var normalizeUrl = __webpack_require__(/*! ./normalize-url */ "../node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js");

var srcByModuleId = Object.create(null);
var noDocument = typeof document === 'undefined';
var forEach = Array.prototype.forEach;

function debounce(fn, time) {
  var timeout = 0;
  return function () {
    var self = this; // eslint-disable-next-line prefer-rest-params

    var args = arguments;

    var functionCall = function functionCall() {
      return fn.apply(self, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
}

function noop() {}

function getCurrentScriptUrl(moduleId) {
  var src = srcByModuleId[moduleId];

  if (!src) {
    if (document.currentScript) {
      src = document.currentScript.src;
    } else {
      var scripts = document.getElementsByTagName('script');
      var lastScriptTag = scripts[scripts.length - 1];

      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }

    srcByModuleId[moduleId] = src;
  }

  return function (fileMap) {
    if (!src) {
      return null;
    }

    var splitResult = src.split(/([^\\/]+)\.js$/);
    var filename = splitResult && splitResult[1];

    if (!filename) {
      return [src.replace('.js', '.css')];
    }

    if (!fileMap) {
      return [src.replace('.js', '.css')];
    }

    return fileMap.split(',').map(function (mapRule) {
      var reg = new RegExp("".concat(filename, "\\.js$"), 'g');
      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")));
    });
  };
}

function updateCss(el, url) {
  if (!url) {
    if (!el.href) {
      return;
    } // eslint-disable-next-line


    url = el.href.split('?')[0];
  }

  if (!isUrlRequest(url)) {
    return;
  }

  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }

  if (!url || !(url.indexOf('.css') > -1)) {
    return;
  } // eslint-disable-next-line no-param-reassign


  el.visited = true;
  var newEl = el.cloneNode();
  newEl.isLoaded = false;
  newEl.addEventListener('load', function () {
    if (newEl.isLoaded) {
      return;
    }

    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.addEventListener('error', function () {
    if (newEl.isLoaded) {
      return;
    }

    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.href = "".concat(url, "?").concat(Date.now());

  if (el.nextSibling) {
    el.parentNode.insertBefore(newEl, el.nextSibling);
  } else {
    el.parentNode.appendChild(newEl);
  }
}

function getReloadUrl(href, src) {
  var ret; // eslint-disable-next-line no-param-reassign

  href = normalizeUrl(href, {
    stripWWW: false
  }); // eslint-disable-next-line array-callback-return

  src.some(function (url) {
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}

function reloadStyle(src) {
  if (!src) {
    return false;
  }

  var elements = document.querySelectorAll('link');
  var loaded = false;
  forEach.call(elements, function (el) {
    if (!el.href) {
      return;
    }

    var url = getReloadUrl(el.href, src);

    if (!isUrlRequest(url)) {
      return;
    }

    if (el.visited === true) {
      return;
    }

    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });
  return loaded;
}

function reloadAll() {
  var elements = document.querySelectorAll('link');
  forEach.call(elements, function (el) {
    if (el.visited === true) {
      return;
    }

    updateCss(el);
  });
}

function isUrlRequest(url) {
  // An URL is not an request if
  // It is not http or https
  if (!/^https?:/i.test(url)) {
    return false;
  }

  return true;
}

module.exports = function (moduleId, options) {
  if (noDocument) {
    console.log('no window.document found, will not HMR CSS');
    return noop;
  }

  var getScriptSrc = getCurrentScriptUrl(moduleId);

  function update() {
    var src = getScriptSrc(options.filename);
    var reloaded = reloadStyle(src);

    if (options.locals) {
      console.log('[HMR] Detected local css modules. Reload all css');
      reloadAll();
      return;
    }

    if (reloaded) {
      console.log('[HMR] css reload %s', src.join(' '));
    } else {
      console.log('[HMR] Reload all css');
      reloadAll();
    }
  }

  return debounce(update, 50);
};

/***/ }),

/***/ "../node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!*************************************************************************!*\
  !*** ../node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable */
function normalizeUrl(pathComponents) {
  return pathComponents.reduce(function (accumulator, item) {
    switch (item) {
      case '..':
        accumulator.pop();
        break;

      case '.':
        break;

      default:
        accumulator.push(item);
    }

    return accumulator;
  }, []).join('/');
}

module.exports = function (urlString) {
  urlString = urlString.trim();

  if (/^data:/i.test(urlString)) {
    return urlString;
  }

  var protocol = urlString.indexOf('//') !== -1 ? urlString.split('//')[0] + '//' : '';
  var components = urlString.replace(new RegExp(protocol, 'i'), '').split('/');
  var host = components[0].toLowerCase().replace(/\.$/, '');
  components[0] = '';
  var path = normalizeUrl(components);
  return protocol + host + path;
};

/***/ }),

/***/ "../node_modules/querystring-es3/decode.js":
/*!*************************************************!*\
  !*** ../node_modules/querystring-es3/decode.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "../node_modules/querystring-es3/encode.js":
/*!*************************************************!*\
  !*** ../node_modules/querystring-es3/encode.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "../node_modules/querystring-es3/index.js":
/*!************************************************!*\
  !*** ../node_modules/querystring-es3/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "../node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "../node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "../node_modules/strip-ansi/index.js":
/*!*******************************************!*\
  !*** ../node_modules/strip-ansi/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(/*! ansi-regex */ "../node_modules/ansi-regex/index.js")();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),

/***/ "../node_modules/webpack-hot-middleware/client-overlay.js":
/*!****************************************************************!*\
  !*** ../node_modules/webpack-hot-middleware/client-overlay.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*eslint-env browser*/

var clientOverlay = document.createElement('div');
clientOverlay.id = 'webpack-hot-middleware-clientOverlay';
var styles = {
  background: 'rgba(0,0,0,0.85)',
  color: '#e8e8e8',
  lineHeight: '1.6',
  whiteSpace: 'pre',
  fontFamily: 'Menlo, Consolas, monospace',
  fontSize: '13px',
  position: 'fixed',
  zIndex: 9999,
  padding: '10px',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  overflow: 'auto',
  dir: 'ltr',
  textAlign: 'left',
};

var ansiHTML = __webpack_require__(/*! ansi-html */ "../node_modules/ansi-html/index.js");
var colors = {
  reset: ['transparent', 'transparent'],
  black: '181818',
  red: 'ff3348',
  green: '3fff4f',
  yellow: 'ffd30e',
  blue: '169be0',
  magenta: 'f840b7',
  cyan: '0ad8e9',
  lightgrey: 'ebe7e3',
  darkgrey: '6d7891',
};

var Entities = __webpack_require__(/*! html-entities */ "../node_modules/html-entities/index.js").AllHtmlEntities;
var entities = new Entities();

function showProblems(type, lines) {
  clientOverlay.innerHTML = '';
  lines.forEach(function(msg) {
    msg = ansiHTML(entities.encode(msg));
    var div = document.createElement('div');
    div.style.marginBottom = '26px';
    div.innerHTML = problemType(type) + ' in ' + msg;
    clientOverlay.appendChild(div);
  });
  if (document.body) {
    document.body.appendChild(clientOverlay);
  }
}

function clear() {
  if (document.body && clientOverlay.parentNode) {
    document.body.removeChild(clientOverlay);
  }
}

function problemType(type) {
  var problemColors = {
    errors: colors.red,
    warnings: colors.yellow,
  };
  var color = problemColors[type] || colors.red;
  return (
    '<span style="background-color:#' +
    color +
    '; color:#000000; padding:3px 6px; border-radius: 4px;">' +
    type.slice(0, -1).toUpperCase() +
    '</span>'
  );
}

module.exports = function(options) {
  for (var color in options.ansiColors) {
    if (color in colors) {
      colors[color] = options.ansiColors[color];
    }
    ansiHTML.setColors(colors);
  }

  for (var style in options.overlayStyles) {
    styles[style] = options.overlayStyles[style];
  }

  for (var key in styles) {
    clientOverlay.style[key] = styles[key];
  }

  return {
    showProblems: showProblems,
    clear: clear,
  };
};

module.exports.clear = clear;
module.exports.showProblems = showProblems;


/***/ }),

/***/ "../node_modules/webpack-hot-middleware/client.js?noInfo=true&timeout=20000&reload=true":
/*!**********************************************************************************************!*\
  !*** ../node_modules/webpack-hot-middleware/client.js?noInfo=true&timeout=20000&reload=true ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery, module) {/*eslint-env browser*/
/*global __resourceQuery __webpack_public_path__*/

var options = {
  path: '/__webpack_hmr',
  timeout: 20 * 1000,
  overlay: true,
  reload: false,
  log: true,
  warn: true,
  name: '',
  autoConnect: true,
  overlayStyles: {},
  overlayWarnings: false,
  ansiColors: {},
};
if (true) {
  var querystring = __webpack_require__(/*! querystring */ "../node_modules/querystring-es3/index.js");
  var overrides = querystring.parse(__resourceQuery.slice(1));
  setOverrides(overrides);
}

if (typeof window === 'undefined') {
  // do nothing
} else if (typeof window.EventSource === 'undefined') {
  console.warn(
    "webpack-hot-middleware's client requires EventSource to work. " +
      'You should include a polyfill if you want to support this browser: ' +
      'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools'
  );
} else {
  if (options.autoConnect) {
    connect();
  }
}

/* istanbul ignore next */
function setOptionsAndConnect(overrides) {
  setOverrides(overrides);
  connect();
}

function setOverrides(overrides) {
  if (overrides.autoConnect)
    options.autoConnect = overrides.autoConnect == 'true';
  if (overrides.path) options.path = overrides.path;
  if (overrides.timeout) options.timeout = overrides.timeout;
  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
  if (overrides.reload) options.reload = overrides.reload !== 'false';
  if (overrides.noInfo && overrides.noInfo !== 'false') {
    options.log = false;
  }
  if (overrides.name) {
    options.name = overrides.name;
  }
  if (overrides.quiet && overrides.quiet !== 'false') {
    options.log = false;
    options.warn = false;
  }

  if (overrides.dynamicPublicPath) {
    options.path = __webpack_require__.p + options.path;
  }

  if (overrides.ansiColors)
    options.ansiColors = JSON.parse(overrides.ansiColors);
  if (overrides.overlayStyles)
    options.overlayStyles = JSON.parse(overrides.overlayStyles);

  if (overrides.overlayWarnings) {
    options.overlayWarnings = overrides.overlayWarnings == 'true';
  }
}

function EventSourceWrapper() {
  var source;
  var lastActivity = new Date();
  var listeners = [];

  init();
  var timer = setInterval(function() {
    if (new Date() - lastActivity > options.timeout) {
      handleDisconnect();
    }
  }, options.timeout / 2);

  function init() {
    source = new window.EventSource(options.path);
    source.onopen = handleOnline;
    source.onerror = handleDisconnect;
    source.onmessage = handleMessage;
  }

  function handleOnline() {
    if (options.log) console.log('[HMR] connected');
    lastActivity = new Date();
  }

  function handleMessage(event) {
    lastActivity = new Date();
    for (var i = 0; i < listeners.length; i++) {
      listeners[i](event);
    }
  }

  function handleDisconnect() {
    clearInterval(timer);
    source.close();
    setTimeout(init, options.timeout);
  }

  return {
    addMessageListener: function(fn) {
      listeners.push(fn);
    },
  };
}

function getEventSourceWrapper() {
  if (!window.__whmEventSourceWrapper) {
    window.__whmEventSourceWrapper = {};
  }
  if (!window.__whmEventSourceWrapper[options.path]) {
    // cache the wrapper for other entries loaded on
    // the same page with the same options.path
    window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();
  }
  return window.__whmEventSourceWrapper[options.path];
}

function connect() {
  getEventSourceWrapper().addMessageListener(handleMessage);

  function handleMessage(event) {
    if (event.data == '\uD83D\uDC93') {
      return;
    }
    try {
      processMessage(JSON.parse(event.data));
    } catch (ex) {
      if (options.warn) {
        console.warn('Invalid HMR message: ' + event.data + '\n' + ex);
      }
    }
  }
}

// the reporter needs to be a singleton on the page
// in case the client is being used by multiple bundles
// we only want to report once.
// all the errors will go to all clients
var singletonKey = '__webpack_hot_middleware_reporter__';
var reporter;
if (typeof window !== 'undefined') {
  if (!window[singletonKey]) {
    window[singletonKey] = createReporter();
  }
  reporter = window[singletonKey];
}

function createReporter() {
  var strip = __webpack_require__(/*! strip-ansi */ "../node_modules/strip-ansi/index.js");

  var overlay;
  if (typeof document !== 'undefined' && options.overlay) {
    overlay = __webpack_require__(/*! ./client-overlay */ "../node_modules/webpack-hot-middleware/client-overlay.js")({
      ansiColors: options.ansiColors,
      overlayStyles: options.overlayStyles,
    });
  }

  var styles = {
    errors: 'color: #ff0000;',
    warnings: 'color: #999933;',
  };
  var previousProblems = null;
  function log(type, obj) {
    var newProblems = obj[type]
      .map(function(msg) {
        return strip(msg);
      })
      .join('\n');
    if (previousProblems == newProblems) {
      return;
    } else {
      previousProblems = newProblems;
    }

    var style = styles[type];
    var name = obj.name ? "'" + obj.name + "' " : '';
    var title = '[HMR] bundle ' + name + 'has ' + obj[type].length + ' ' + type;
    // NOTE: console.warn or console.error will print the stack trace
    // which isn't helpful here, so using console.log to escape it.
    if (console.group && console.groupEnd) {
      console.group('%c' + title, style);
      console.log('%c' + newProblems, style);
      console.groupEnd();
    } else {
      console.log(
        '%c' + title + '\n\t%c' + newProblems.replace(/\n/g, '\n\t'),
        style + 'font-weight: bold;',
        style + 'font-weight: normal;'
      );
    }
  }

  return {
    cleanProblemsCache: function() {
      previousProblems = null;
    },
    problems: function(type, obj) {
      if (options.warn) {
        log(type, obj);
      }
      if (overlay) {
        if (options.overlayWarnings || type === 'errors') {
          overlay.showProblems(type, obj[type]);
          return false;
        }
        overlay.clear();
      }
      return true;
    },
    success: function() {
      if (overlay) overlay.clear();
    },
    useCustomOverlay: function(customOverlay) {
      overlay = customOverlay;
    },
  };
}

var processUpdate = __webpack_require__(/*! ./process-update */ "../node_modules/webpack-hot-middleware/process-update.js");

var customHandler;
var subscribeAllHandler;
function processMessage(obj) {
  switch (obj.action) {
    case 'building':
      if (options.log) {
        console.log(
          '[HMR] bundle ' +
            (obj.name ? "'" + obj.name + "' " : '') +
            'rebuilding'
        );
      }
      break;
    case 'built':
      if (options.log) {
        console.log(
          '[HMR] bundle ' +
            (obj.name ? "'" + obj.name + "' " : '') +
            'rebuilt in ' +
            obj.time +
            'ms'
        );
      }
    // fall through
    case 'sync':
      if (obj.name && options.name && obj.name !== options.name) {
        return;
      }
      var applyUpdate = true;
      if (obj.errors.length > 0) {
        if (reporter) reporter.problems('errors', obj);
        applyUpdate = false;
      } else if (obj.warnings.length > 0) {
        if (reporter) {
          var overlayShown = reporter.problems('warnings', obj);
          applyUpdate = overlayShown;
        }
      } else {
        if (reporter) {
          reporter.cleanProblemsCache();
          reporter.success();
        }
      }
      if (applyUpdate) {
        processUpdate(obj.hash, obj.modules, options);
      }
      break;
    default:
      if (customHandler) {
        customHandler(obj);
      }
  }

  if (subscribeAllHandler) {
    subscribeAllHandler(obj);
  }
}

if (module) {
  module.exports = {
    subscribeAll: function subscribeAll(handler) {
      subscribeAllHandler = handler;
    },
    subscribe: function subscribe(handler) {
      customHandler = handler;
    },
    useCustomOverlay: function useCustomOverlay(customOverlay) {
      if (reporter) reporter.useCustomOverlay(customOverlay);
    },
    setOptionsAndConnect: setOptionsAndConnect,
  };
}

/* WEBPACK VAR INJECTION */}.call(this, "?noInfo=true&timeout=20000&reload=true", __webpack_require__(/*! ./../webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../node_modules/webpack-hot-middleware/process-update.js":
/*!****************************************************************!*\
  !*** ../node_modules/webpack-hot-middleware/process-update.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Based heavily on https://github.com/webpack/webpack/blob/
 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
 * Original copyright Tobias Koppers @sokra (MIT license)
 */

/* global window __webpack_hash__ */

if (false) {}

var hmrDocsUrl = 'https://webpack.js.org/concepts/hot-module-replacement/'; // eslint-disable-line max-len

var lastHash;
var failureStatuses = { abort: 1, fail: 1 };
var applyOptions = {
  ignoreUnaccepted: true,
  ignoreDeclined: true,
  ignoreErrored: true,
  onUnaccepted: function(data) {
    console.warn(
      'Ignored an update to unaccepted module ' + data.chain.join(' -> ')
    );
  },
  onDeclined: function(data) {
    console.warn(
      'Ignored an update to declined module ' + data.chain.join(' -> ')
    );
  },
  onErrored: function(data) {
    console.error(data.error);
    console.warn(
      'Ignored an error while updating module ' +
        data.moduleId +
        ' (' +
        data.type +
        ')'
    );
  },
};

function upToDate(hash) {
  if (hash) lastHash = hash;
  return lastHash == __webpack_require__.h();
}

module.exports = function(hash, moduleMap, options) {
  var reload = options.reload;
  if (!upToDate(hash) && module.hot.status() == 'idle') {
    if (options.log) console.log('[HMR] Checking for updates on the server...');
    check();
  }

  function check() {
    var cb = function(err, updatedModules) {
      if (err) return handleError(err);

      if (!updatedModules) {
        if (options.warn) {
          console.warn('[HMR] Cannot find update (Full reload needed)');
          console.warn('[HMR] (Probably because of restarting the server)');
        }
        performReload();
        return null;
      }

      var applyCallback = function(applyErr, renewedModules) {
        if (applyErr) return handleError(applyErr);

        if (!upToDate()) check();

        logUpdates(updatedModules, renewedModules);
      };

      var applyResult = module.hot.apply(applyOptions, applyCallback);
      // webpack 2 promise
      if (applyResult && applyResult.then) {
        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`
        applyResult.then(function(outdatedModules) {
          applyCallback(null, outdatedModules);
        });
        applyResult.catch(applyCallback);
      }
    };

    var result = module.hot.check(false, cb);
    // webpack 2 promise
    if (result && result.then) {
      result.then(function(updatedModules) {
        cb(null, updatedModules);
      });
      result.catch(cb);
    }
  }

  function logUpdates(updatedModules, renewedModules) {
    var unacceptedModules = updatedModules.filter(function(moduleId) {
      return renewedModules && renewedModules.indexOf(moduleId) < 0;
    });

    if (unacceptedModules.length > 0) {
      if (options.warn) {
        console.warn(
          "[HMR] The following modules couldn't be hot updated: " +
            '(Full reload needed)\n' +
            'This is usually because the modules which have changed ' +
            '(and their parents) do not know how to hot reload themselves. ' +
            'See ' +
            hmrDocsUrl +
            ' for more details.'
        );
        unacceptedModules.forEach(function(moduleId) {
          console.warn('[HMR]  - ' + (moduleMap[moduleId] || moduleId));
        });
      }
      performReload();
      return;
    }

    if (options.log) {
      if (!renewedModules || renewedModules.length === 0) {
        console.log('[HMR] Nothing hot updated.');
      } else {
        console.log('[HMR] Updated modules:');
        renewedModules.forEach(function(moduleId) {
          console.log('[HMR]  - ' + (moduleMap[moduleId] || moduleId));
        });
      }

      if (upToDate()) {
        console.log('[HMR] App is up to date.');
      }
    }
  }

  function handleError(err) {
    if (module.hot.status() in failureStatuses) {
      if (options.warn) {
        console.warn('[HMR] Cannot check for update (Full reload needed)');
        console.warn('[HMR] ' + (err.stack || err.message));
      }
      performReload();
      return;
    }
    if (options.warn) {
      console.warn('[HMR] Update check failed: ' + (err.stack || err.message));
    }
  }

  function performReload() {
    if (reload) {
      if (options.warn) console.warn('[HMR] Reloading page');
      window.location.reload();
    }
  }
};


/***/ }),

/***/ "../node_modules/webpack/buildin/module.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./build/util/hmr-client.js":
/*!**********************************!*\
  !*** ./build/util/hmr-client.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var hotMiddlewareScript = __webpack_require__(/*! webpack-hot-middleware/client?noInfo=true&timeout=20000&reload=true */ "../node_modules/webpack-hot-middleware/client.js?noInfo=true&timeout=20000&reload=true");

hotMiddlewareScript.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload();
  }
});

/***/ }),

/***/ "./css/style.scss":
/*!************************!*\
  !*** ./css/style.scss ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1649104208539
      var cssReload = __webpack_require__(/*! ../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.i, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./js/app/animations.js":
/*!******************************!*\
  !*** ./js/app/animations.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./js/app/utils.js");
/* harmony import */ var _animations_template_start__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animations/template-start */ "./js/app/animations/template-start.js");
/* eslint one-var: [0]*/

/* eslint max-len: [0]*/

/* eslint max-lines: [0]*/

/* eslint max-params: [0]*/

/* eslint complexity: [0]*/

/* eslint no-multi-assign: [0]*/


var Animations = {
  /**
   * Start Page
   */
  'template-start': _animations_template_start__WEBPACK_IMPORTED_MODULE_1__["default"],
  hasAnimation: function hasAnimation(view, fn, _type) {
    var checkAnimation = false;
    var type = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset(_type) ? _type : false; // eslint-disable-line

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset(Animations[view]) && Animations[view].hasOwnProperty(fn)) {
      checkAnimation = true;
    }

    if (checkAnimation === true && type !== false) {
      checkAnimation = true;
    }

    return checkAnimation;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Animations);

/***/ }),

/***/ "./js/app/animations/template-start.js":
/*!*********************************************!*\
  !*** ./js/app/animations/template-start.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./js/app/utils.js");
/* harmony import */ var _fixes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../fixes */ "./js/app/fixes.js");
/* eslint new-cap: [0] */

/* eslint one-var: [0] */

/* eslint max-len: [0] */


var AnimationTemplateStart = {
  enter: function enter(args) {
    console.log(args);
  },
  initViewportFx: function initViewportFx(container) {
    console.log('aniamtion', container);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (AnimationTemplateStart);

/***/ }),

/***/ "./js/app/api.js":
/*!***********************!*\
  !*** ./js/app/api.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Api; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Api =
/*#__PURE__*/
function () {
  function Api(settings) {
    _classCallCheck(this, Api);

    var defaults = {
      url_api: "".concat(OAX.config.url_api, "wp/v2/"),
      url_acf: "".concat(OAX.config.url_api, "acf/v3/"),
      url_search: "".concat(OAX.config.url_api, "swp_api/"),
      url_oax: "".concat(OAX.config.url_api, "oax/v1/"),
      url_ajax: OAX.config.url_ajax,
      path_categories: 'categories',
      path_pages: 'pages',
      path_posts: 'posts'
    };
    this.options = Object.assign(defaults, settings);
  }

  _createClass(Api, [{
    key: "getTemplatePart",
    value: function getTemplatePart(template) {
      return fetch("".concat(this.options.url_oax, "templatepart/").concat(template)).then(function (response) {
        return response.json();
      }).catch(function (error) {
        return false;
      });
    }
  }, {
    key: "getPost",
    value: function getPost(id) {
      return fetch("".concat(this.options.url_api).concat(this.options.path_posts, "/").concat(id, "?_embed")).then(function (response) {
        return response.json();
      }).catch(function (error) {
        return false;
      });
    }
  }, {
    key: "getPostsByCategory",
    value: function getPostsByCategory(categoryId, page) {
      var fetchUrl = "".concat(this.options.url_api).concat(this.options.path_posts, "?_embed");

      if (categoryId !== 0) {
        fetchUrl += "&categories=".concat(categoryId);
      }

      if (page !== -1) {
        fetchUrl += "&page=".concat(page);
      }

      return fetch("".concat(fetchUrl, "&per_page=4")).then(function (response) {
        return response.json();
      }).catch(function (error) {
        return false;
      });
    }
  }, {
    key: "getCategory",
    value: function getCategory(categoryId) {
      return fetch("".concat(this.options.url_api).concat(this.options.path_categories, "?include=").concat(categoryId)).then(function (response) {
        return response.json();
      }).catch(function (error) {
        return false;
      });
    }
  }, {
    key: "setUserLocation",
    value: function setUserLocation(userlocation) {
      return $.ajax({
        type: 'POST',
        url: this.options.url_ajax,
        cache: false,
        data: {
          action: 'oax_ajax_set_user_location',
          data: userlocation
        }
      });
    }
  }, {
    key: "setUserEventDate",
    value: function setUserEventDate(userdate) {
      return $.ajax({
        type: 'POST',
        url: this.options.url_ajax,
        cache: false,
        data: {
          action: 'oax_ajax_set_user_event_date',
          data: userdate
        }
      });
    }
  }]);

  return Api;
}();



/***/ }),

/***/ "./js/app/fixes.js":
/*!*************************!*\
  !*** ./js/app/fixes.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _skip_link_focus_fix_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../skip-link-focus-fix.js */ "./js/skip-link-focus-fix.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./js/app/utils.js");


/* eslint-disable */

var Fixes = {
  init: function init() {
    this.container = jQuery('#site__body').get(0);
    Object(_skip_link_focus_fix_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    this.loadPolyfills();
    this.iE.init.call(this);
    this.safari.init.call(this);
    this.firefox.init.call(this);
    this.chrome.init.call(this);
    this.iOS.init.call(this);
    this.android.init.call(this);
    this.mac.init.call(this);
    this.win.init.call(this);
  },
  reInit: function reInit(container) {
    this.container = container;
    this.updatePolyfills();
    this.iE.reInit.call(this);
    this.safari.reInit.call(this);
    this.firefox.reInit.call(this);
    this.chrome.reInit.call(this);
    this.iOS.reInit.call(this);
    this.android.reInit.call(this);
    this.mac.reInit.call(this);
    this.win.reInit.call(this);
  },
  loadPolyfills: function loadPolyfills() {
    var self = this;
    this.polyfills = {
      csspositionsticky: false,
      objectfit: false
    };
    Modernizr.on('csspositionsticky', function (result) {
      if (!result) {
        var stickyfillpolyfill = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].loadScript('https://cdnjs.cloudflare.com/ajax/libs/stickyfill/2.0.3/stickyfill.min.js');
        self.polyfills.csspositionsticky = 'loading';
        stickyfillpolyfill.then(function () {
          self.polyfills.csspositionsticky = true;
          var elements = document.querySelectorAll('.sticky');
          Stickyfill.add(elements);
        });
      }
    });
    Modernizr.on('objectfit', function (result) {
      if (!result) {
        var objectfitpolyfill = _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].loadScript('https://cdnjs.cloudflare.com/ajax/libs/object-fit-images/3.2.3/ofi.min.js');
        self.polyfills.objectfit = 'loading';
        objectfitpolyfill.then(function () {
          self.polyfills.objectfit = true;
          objectFitImages('img.object-fit-cover, img.object-cover');
        });
      }
    });
  },
  updatePolyfills: function updatePolyfills() {
    if (this.polyfills.objectfit === true) {
      objectFitImages('img.object-fit-cover, img.object-cover');
    }

    if (this.polyfills.csspositionsticky === true) {
      var elements = this.container.querySelectorAll('.sticky');
      Stickyfill.add(elements);
    }
  },
  iE: {
    is: function is() {
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf('MSIE ');

      if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }

      var trident = ua.indexOf('Trident/');

      if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }

      var edge = ua.indexOf('Edge/');

      if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      } // other browser


      return false;
    },
    init: function init() {
      if (this.iE.is() !== false) {
        jQuery('html').addClass('is-ie').addClass('is-ie--' + this.iE.is());
        this.fixSVGInline(this.container);
      }
    },
    reInit: function reInit() {
      if (this.iE.is() !== false) {
        this.fixSVGInline(this.container);
      }
    }
  },
  safari: {
    is: function is() {
      return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    },
    init: function init() {
      if (this.safari.is() !== false) {
        $('html').addClass('is-safari');
        this.fixViewportFontSize(this.container);
      }
    },
    reInit: function reInit() {}
  },
  firefox: {
    is: function is() {
      return !!navigator.userAgent.match(/firefox/i);
    },
    init: function init() {
      if (this.firefox.is() !== false) {
        $('html').addClass('is-firefox');
      }
    },
    reInit: function reInit() {
      if (this.firefox.is() !== false) {}
    }
  },
  chrome: {
    is: function is() {
      return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    },
    init: function init() {
      if (this.chrome.is() !== false) {
        $('html').addClass('is-chrome');
      }
    },
    reInit: function reInit() {
      if (this.chrome.is() !== false) {}
    }
  },
  iOS: {
    is: function is() {
      return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
    },
    init: function init() {
      if (this.iOS.is() !== false) {
        $('html').addClass('is-ios');
        this.fixVideoLoading(this.container);

        if (this.safari.is()) {
          this.fixViewportHeightUnit();
        }
      }
    },
    reInit: function reInit() {
      if (this.iOS.is() !== false) {
        this.fixVideoLoading(this.container);
      }
    }
  },
  android: {
    is: function is() {
      return navigator.userAgent.toLowerCase().indexOf("android") > -1;
    },
    init: function init() {
      if (this.android.is()) {
        $('html').addClass('is-android');
      }
    },
    reInit: function reInit() {}
  },
  mac: {
    is: function is() {
      return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    },
    init: function init() {
      if (this.mac.is()) {
        $('html').addClass('is-mac');
      }
    },
    reInit: function reInit() {}
  },
  win: {
    is: function is() {
      return navigator.platform.indexOf('Win') > -1;
    },
    init: function init() {
      if (this.win.is()) {
        $('html').addClass('is-windows');
      }
    },
    reInit: function reInit() {}
  },
  fixSVGUrl: function fixSVGUrl(container, url) {
    var selector_string = 'svg [mask^="url("], svg [fill^="url("], svg [clip-path^="url("]';
    var url = url || location.href;
    var currentPath, currentHash;
    jQuery(container).find(selector_string).each(function () {
      var $item = jQuery(this);

      if ($item.get(0).hasAttribute('mask')) {
        currentPath = $item.attr('mask').replace('url(', '').replace(')', '').replace(/\"/gi, "");
        currentHash = currentPath.substring(currentPath.indexOf('#') + 1);
        $item.attr('mask', 'url(' + url + '#' + currentHash + ')');
      } else if ($item.get(0).hasAttribute('clip-path')) {
        currentPath = $item.attr('clip-path').replace('url(', '').replace(')', '').replace(/\"/gi, "");
        currentHash = currentPath.substring(currentPath.indexOf('#') + 1);
        $item.attr('clip-path', 'url(' + url + '#' + currentHash + ')');
      } else if ($item.get(0).hasAttribute('fill')) {
        currentPath = $item.attr('fill').replace('url(', '').replace(')', '').replace(/\"/gi, "");
        currentHash = currentPath.substring(currentPath.indexOf('#') + 1);
        $item.attr('fill', 'url(' + url + '#' + currentHash + ')');
      }
    });
  },
  fixSVGInline: function fixSVGInline(container) {
    jQuery(container).find('svg:not(.injected-svg):not(.js--svg-inject)').each(function (i, el) {
      var svg = el,
          $svg = jQuery(svg);

      if (svg.hasAttribute('viewbox')) {
        jQuery(svg).wrap('<div class="o-svg-wrap relative"></div>');
        jQuery(svg).attr('width', '100%');
        jQuery(svg).css({
          position: 'absolute',
          top: 0,
          left: 0
        });
        var viewBox = svg.getAttribute('viewBox');

        if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(viewBox)) {
          viewBox = viewBox.replace(/\s\s+/g, ' ');
          var w = viewBox.split(' ')[2];
          var h = viewBox.split(' ')[3];
          var x = h / w * 100;
          svg.parentNode.setAttribute('style', "padding-bottom:".concat(x, "%;"));
        }
      }
    });
  },
  fixViewportFontSize: function fixViewportFontSize(container) {
    $(container).hide();
    setTimeout(function () {
      $(container).show();
    }, 10);
  },
  fixVideoLoading: function fixVideoLoading(container) {
    var $videos = $(container).find('video:not(.video-js):not(.vjs-tech)');

    if ($videos.length) {
      $videos.each(function (i, vid) {
        var playPromise = vid.play();

        if (playPromise !== undefined) {
          playPromise.then(function (_) {
            // Automatic playback started!
            // Show playing UI.
            // We can now safely pause video...
            // .. if it has no autoplay attr
            if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset($(vid).attr('autoplay'))) vid.pause();
          }).catch(function (error) {// Auto-play was prevented
            // Show paused UI.
          });
        }
      });
    }
  },
  fixViewportHeightUnit: function fixViewportHeightUnit() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

    document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
    window.addEventListener('resize', function () {
      // We execute the same script as before
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
    });
  }
};

if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(window.OAX) && !window.OAX.hasOwnProperty('Fixes')) {
  window.OAX.Fixes = Fixes;
}

/* harmony default export */ __webpack_exports__["default"] = (Fixes);

/***/ }),

/***/ "./js/app/router.js":
/*!**************************!*\
  !*** ./js/app/router.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Router; });
/* harmony import */ var _transitions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transitions.js */ "./js/app/transitions.js");
/* harmony import */ var _views__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views */ "./js/views/index.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./js/app/utils.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint one-var: [0] */

/* eslint new-cap: [0] */

/* eslint max-len: [0] */

/**
 * File router.js.
 *
 * Handles script execution for specific pages
 */


 // import barbaPrefetch from '@barba/prefetch';

var Router =
/*#__PURE__*/
function () {
  function Router(settings) {
    _classCallCheck(this, Router);

    var defaults = {
      debug: false,
      onNewContainerLoaded: null,
      onLinkClicked: null,
      onInitStateChange: null,
      onTransitionCompleted: null,
      onBrowserNav: null,
      baseTransition: null,
      preventLinks: null,
      isUpdateScripts: false,
      classes: {
        pageIsTransition: 'page--is-transition',
        pageIsLoading: 'page--is-loading',
        pageIsReady: 'page--is-ready'
      }
    };
    this.options = Object.assign({}, defaults, settings);
  }

  _createClass(Router, [{
    key: "init",
    value: function init() {
      var self = this;
      var views = _views__WEBPACK_IMPORTED_MODULE_1__["default"].getAll();
      var transitions = _transitions_js__WEBPACK_IMPORTED_MODULE_0__["default"].getAll();
      this.is_linkclick = false;
      this.prev_scrolltop = 0;
      $(document).on('click.oax::scrollTo', 'a[href^="#"]', function (event) {
        var $target = $(event.target).is('a') ? $(event.target) : $(event.target).closest('a');

        if (/^#/.test($target.attr('href')) && $target.attr('href') !== '#') {
          _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].scrollTo($target.attr('href'));
        }

        event.preventDefault();
      });
      this.initHooks(); // barba.use( barbaPrefetch );

      barba.init({
        debug: this.options.debug,
        prevent: this.preventLinks.bind(this),
        views: views,
        transitions: transitions,
        timeout: 5000
      });
    }
  }, {
    key: "initHooks",
    value: function initHooks() {
      var self = this;
      var debug = this.options.debug; // 0.

      barba.hooks.ready(function (data) {
        if (debug) {
          console.log('ready', data.current, data.next);
        }

        _views__WEBPACK_IMPORTED_MODULE_1__["default"].beforeAppearAll(data);
      }); // 1.

      barba.hooks.page(function (data) {
        if (debug) {
          console.log('page', data.next.url.href, data.current, data.next);
        }

        if (data.trigger !== 'popstate' && data.trigger !== 'barba') {
          self.is_linkclick = true;
          self.is_popstate = false;
          self.onLinkClicked(data.trigger);
        } else if (data.trigger === 'popstate') {
          self.is_linkclick = false;
          self.is_popstate = true;

          if (self.options.onBrowserNav !== null) {
            self.options.onBrowserNav(data.next.url);
          }
        }

        self.onInitStateChange(data.next.url);
      }); // 2.

      barba.hooks.before(function (data) {
        if (debug) {
          console.log('before', data.next.url.href, data.current, data.next);
        }
      }); // 3.

      barba.hooks.beforeLeave(function (data) {
        if (debug) {
          console.log('beforeLeave', data.current, data.next);
        }

        _views__WEBPACK_IMPORTED_MODULE_1__["default"].beforeLeaveAll(data);
      }); // 4.

      barba.hooks.leave(function (data) {
        if (debug) {
          console.log('leave [transition]', data.current, data.next);
        }

        _views__WEBPACK_IMPORTED_MODULE_1__["default"].onLeaveAll(data);
      }); // 5.

      barba.hooks.afterLeave(function (data) {
        if (debug) {
          console.log('afterLeave', data.current, data.next);
        }

        self._changeBodyClasses(data.next.html);

        _views__WEBPACK_IMPORTED_MODULE_1__["default"].afterLeaveAll(data);
      }); // 6.

      barba.hooks.nextAdded(function (data) {
        if (debug) {
          console.log('nextAdded', data.current, data.next);
        }

        self.onNewPageReady(data.next.container, data.next.html);
      }); // 7.

      barba.hooks.beforeEnter(function (data) {
        if (debug) {
          console.log('beforeEnter', data.current, data.next);
        }

        _views__WEBPACK_IMPORTED_MODULE_1__["default"].beforeEnterAll(data);
      }); // 8.

      barba.hooks.enter(function (data) {
        if (debug) {
          console.log('enter [transition]', data.current, data.next);
        }

        _views__WEBPACK_IMPORTED_MODULE_1__["default"].onEnterAll(data);
      }); // 9.

      barba.hooks.afterEnter(function (data) {
        if (debug) {
          console.log('afterEnter', data.current, data.next);
        }

        if (self.is_popstate) {
          _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].scrollTo(0, self.prev_scrolltop, true);
        } else if (_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isset(data.next.url.hash)) {
          var $scrollToContainer = $(data.next.container).find("#".concat(data.next.url.hash));

          if ($scrollToContainer.length) {
            _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].scrollTo(0, $scrollToContainer.offset().top, true);
          }
        }

        _views__WEBPACK_IMPORTED_MODULE_1__["default"].afterEnterAll(data);
      }); // 10.

      barba.hooks.after(function (data) {
        if (debug) {
          console.log('after', data.current, data.next);
        }

        self.onTransitionCompleted(data.next.container);
      }); // 11.

      barba.hooks.currentRemoved(function (data) {
        if (debug) {
          console.log('currentRemoved', data.current, data.next);
        }
      }); // -1 & 12.

      barba.hooks.reset(function (data) {
        if (debug) {
          console.log('reset', data.current, data.next);
        }
      });
      /*
       * dunno the order of the follow
       */

      barba.hooks.currentAdded(function (data) {
        if (debug) {
          console.log('currentAdded', data.current, data.next);
        }
      });
      barba.hooks.nextRemoved(function (data) {
        if (debug) {
          console.log('nextRemoved', data.current, data.next);
        }
      });
    }
  }, {
    key: "onLinkClicked",
    value: function onLinkClicked(HTMLElement) {
      var self = this;
      $('html').addClass(this.options.classes.pageIsTransition);

      if (OAX.template.config.is_ajax) {
        _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].scrollDisable(true); // Utils.scrollLock( true );
      }

      if (self.options.onLinkClicked !== null) {
        self.options.onLinkClicked(HTMLElement);
      }

      self.prev_scrolltop = jQuery(document).scrollTop();
    }
  }, {
    key: "onNewPageReady",
    value: function onNewPageReady(HTMLElementContainer, newPageRawHTML) {
      if (this.options.isUpdateScripts) {
        this._initPageScripts(HTMLElementContainer);
      }

      this.onNewContainerLoaded(HTMLElementContainer);
    }
  }, {
    key: "onInitStateChange",
    value: function onInitStateChange(url) {
      var self = this;

      if (OAX.template.config.is_ajax) {
        _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].scrollDisable(true);
        _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].trackPageView(url.href);
      }

      $('html').addClass(this.options.classes.pageIsLoading);

      if (this.options.onInitStateChange !== null) {
        this.options.onInitStateChange(url);
      }
    }
  }, {
    key: "onTransitionCompleted",
    value: function onTransitionCompleted(container) {
      this.is_linkclick = false;
      _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].scrollDisable(false);
      $('html').removeClass(this.options.classes.pageIsTransition);
      $('html').addClass(this.options.classes.pageIsReady);

      if (this.options.onTransitionCompleted !== null) {
        this.options.onTransitionCompleted(container);
      }
    }
  }, {
    key: "onNewContainerLoaded",
    value: function onNewContainerLoaded(container) {
      $('html').removeClass(this.options.classes.pageIsLoading);

      if (this.options.onNewContainerLoaded !== null) {
        this.options.onNewContainerLoaded(container);
      }
    }
  }, {
    key: "preventLinks",
    value: function preventLinks(_ref) {
      var el = _ref.el,
          event = _ref.event,
          href = _ref.href;
      var check = false;

      if (el.classList && el.classList.contains('no-barba')) {
        check = true;
      }

      if ($(el).attr('href').toLowerCase().match(/\.(pdf)/g)) {
        check = true;
      }

      if ($(el).attr('href').toLowerCase() === '#') {
        check = true;
      }

      if (/^#/.test($(el).attr('href'))) {
        check = true;
      }

      if ($(el).attr('target') === '_blank') {
        check = true;
      }

      if ($(el).closest('#wpadminbar').length) {
        check = true;
      }

      if (_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isset(event) && event.type === 'click' && window.location.href.includes(href)) {
        event.preventDefault();
      }

      if (check === false && this.options.preventLinks !== null) {
        check = this.options.preventLinks(el, event, href);
      }

      return check;
    }
  }, {
    key: "_changeBodyClasses",
    value: function _changeBodyClasses(newPageRawHTML) {
      var parser = new DOMParser();
      var DOC = parser.parseFromString(newPageRawHTML, 'text/html');
      var bodyClasses = DOC.body.getAttribute('class');
      $('html').removeClass(this.options.classes.pageIsReady);

      if ($('body').hasClass('overflow-hidden')) {
        bodyClasses += ' overflow-hidden';
      }

      $('body').attr('class', bodyClasses);
    }
  }, {
    key: "_initPageScripts",
    value: function _initPageScripts(container) {
      var $scriptsEl = $(container).find('.oax-js-config--page-scripts[data-page-scripts]');

      if ($scriptsEl.length) {
        var scripts = $scriptsEl.data('pageScripts');
        var $inlineScripts = $scriptsEl.find('> script');
        var isDev = location.host === 'localhost:3000';

        if (Object.keys(scripts).length) {
          var $currentScripts = $('script[id][src]');
          var currentScripts = {};
          $currentScripts.each(function (i, el) {
            currentScripts[$(el).attr('id')] = $(el).attr('src');
          }); // console.log( scripts, currentScripts );

          for (var _i = 0, _Object$entries = Object.entries(scripts); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                key = _Object$entries$_i[0],
                value = _Object$entries$_i[1];

            if (currentScripts[key] === undefined) {
              var $belongingInlineScript = $inlineScripts.filter("[data-id=\"".concat(key, "-extra\"]"));

              if ($belongingInlineScript.length) {
                console.log($belongingInlineScript[0].innerText); // eval.call( window, $belongingInlineScript[0].innerText ); // eslint-disable-line
              }

              console.log(value, key);
              _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].loadScript(value, key);
            }
          }

          $(document).trigger('ready');
        }
      }
    }
  }, {
    key: "_getNamespace",
    value: function _getNamespace(container) {
      return container.getAttribute("data-barba-namespace");
    }
  }]);

  return Router;
}();



/***/ }),

/***/ "./js/app/transitions.js":
/*!*******************************!*\
  !*** ./js/app/transitions.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transitions_default__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transitions/default */ "./js/app/transitions/default.js");
/* harmony import */ var _transitions_none__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transitions/none */ "./js/app/transitions/none.js");
/*
 * import TransitionFilter from './transitions/filter';
 */


var Transitions = {
  getAll: function getAll() {
    return [_transitions_none__WEBPACK_IMPORTED_MODULE_1__["default"]];
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Transitions);

/***/ }),

/***/ "./js/app/transitions/default.js":
/*!***************************************!*\
  !*** ./js/app/transitions/default.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./js/app/utils.js");
/* eslint new-cap: [0] */

/* eslint one-var: [0] */

/* eslint max-len: [0] */

var TransitionDefault = {
  beforeAppear: function beforeAppear() {},
  appear: function appear() {},
  afterAppear: function afterAppear() {},
  beforeLeave: function beforeLeave() {},
  leave: function leave(data) {
    var self = TransitionDefault;
    var done = this.async();
    var tlSlideIn = gsap.timeline({
      onComplete: function onComplete() {
        if (_utils__WEBPACK_IMPORTED_MODULE_0__["default"].isset(data.next.container)) {
          gsap.set(data.next.container, {
            visibility: 'visible'
          });
        }

        if (!OAX.template.config.is_ajax) {
          window.location.href = window.location.href;

          if (!_utils__WEBPACK_IMPORTED_MODULE_0__["default"].cookie.hasItem('oax_preloader')) {
            _utils__WEBPACK_IMPORTED_MODULE_0__["default"].cookie.setItem('oax_preloader', 'TRANSITION', 600, OAX.config.url_base, '');
          }
        } else {
          _utils__WEBPACK_IMPORTED_MODULE_0__["default"].scrollTo(0, 0);
          done();
        }
      }
    });
    self.$el = $('.c-page-transition');
    tlSlideIn.set(self.$el, {
      autoAlpha: 1,
      yPercent: 100
    });
    tlSlideIn.to(self.$el, {
      yPercent: 0,
      duration: 0.5,
      autoAlpha: 1,
      ease: 'circ.inOut'
    }, 0);
  },
  afterLeave: function afterLeave() {},
  beforeEnter: function beforeEnter() {},
  enter: function enter(data) {
    var self = TransitionDefault;
    var done = this.async();
    var tlSlideOut = gsap.timeline({
      paused: false,
      onStart: function onStart() {
        jQuery(data.current.container).hide();
      },
      onComplete: function onComplete() {
        gsap.set(self.$el, {
          autoAlpha: 0,
          yPercent: 100
        });
        done();
      }
    });
    tlSlideOut.to(self.$el, {
      duration: 0.75,
      yPercent: -100,
      ease: 'circ.inOut',
      delay: 0.5
    });
  },
  afterEnter: function afterEnter() {}
};
/* harmony default export */ __webpack_exports__["default"] = (TransitionDefault);

/***/ }),

/***/ "./js/app/transitions/none.js":
/*!************************************!*\
  !*** ./js/app/transitions/none.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./js/app/utils.js");
/* eslint new-cap: [0] */

/* eslint one-var: [0] */

/* eslint max-len: [0] */

var loaderTimeoutMS = 650;
var $loaderWrapper = $('<div class="c-transition--timeout-loader"></div>');
var $loader = $(OAX.template.loader.html);
gsap.set($loaderWrapper, {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(255,255,255,0.4)',
  autoAlpha: 0,
  zIndex: 999999999
});
gsap.set($loader, {
  position: 'absolute',
  top: '50%',
  left: '50%'
});
$loaderWrapper.append($loader);
var TransitionNone = {
  name: 'none',
  loaderTimeout: null,
  leave: function leave(data) {
    var self = TransitionNone;
    var done = this.async();
    this.loaderTimeout = setTimeout(function () {
      self.loaderWrapper = $loaderWrapper;
      $('body').append(self.loaderWrapper);
      gsap.to(self.loaderWrapper, {
        autoAlpha: 1,
        duration: 0.1
      });
    }, loaderTimeoutMS);

    if (_utils__WEBPACK_IMPORTED_MODULE_0__["default"].isset(data.next.container) && data.next.container !== null) {
      gsap.set(data.next.container, {
        display: 'none'
      });
    }

    done();
  },
  enter: function enter(data) {
    var self = TransitionNone;
    var done = this.async();

    if (_utils__WEBPACK_IMPORTED_MODULE_0__["default"].isset(data.next.container)) {
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].scrollTo(0, 0, false);
      gsap.set(data.next.container, {
        display: 'block'
      });

      if (this.loaderTimeout !== null) {
        clearTimeout(this.loaderTimeout);

        if ($('.c-transition--timeout-loader').length) {
          gsap.to($('.c-transition--timeout-loader'), {
            autoAlpha: 0,
            duration: 0.2,
            onComplete: function onComplete() {
              $('.c-transition--timeout-loader').remove();
            }
          });
        }
      }
    }

    done();
  }
};
/* harmony default export */ __webpack_exports__["default"] = (TransitionNone);

/***/ }),

/***/ "./js/app/utils.js":
/*!*************************!*\
  !*** ./js/app/utils.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/slider.js */ "./js/components/slider.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! imagesloaded */ "../node_modules/imagesloaded/imagesloaded.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(imagesloaded__WEBPACK_IMPORTED_MODULE_1__);
/* eslint one-var: [0]*/

/* eslint max-len: [0]*/

/* eslint max-params: [0]*/

/* eslint complexity: [0]*/

/* eslint no-multi-assign: [0]*/

/* eslint no-irregular-whitespace: [0] */

/* eslint no-useless-escape: [0] */



__webpack_require__(/*! ../lib/jquery.serializeObject.js */ "./js/lib/jquery.serializeObject.js");

__webpack_require__(/*! ../lib/jquery.scrolllock.js */ "./js/lib/jquery.scrolllock.js");

__webpack_require__(/*! ../lib/pace.min.js */ "./js/lib/pace.min.js");

var Utils = {
  isset: function isset(obj) {
    var i, max_i; // eslint-disable-line

    if (obj === undefined) {
      return false;
    }

    for (i = 1, max_i = arguments.length; i < max_i; i++) {
      // eslint-disable-line
      if (obj[arguments[i]] === undefined) {
        // eslint-disable-line
        return false;
      }

      obj = obj[arguments[i]]; // eslint-disable-line
    }

    return true;
  },
  initSliders: function initSliders(container) {
    /**
     * Swiper
     */
    _components_slider_js__WEBPACK_IMPORTED_MODULE_0__["default"].swiper.init(container);
  },
  initLightbox: function initLightbox(container) {
    if ($(container).find('.glightbox')) {
      var lightBox = new GLightbox();
      lightBox.on('open', function () {// Do something
      });
    }
  },
  scrollTo: function scrollTo(_x, _y, _animation, _duration) {
    var x = this.isset(_x) ? _x : 0;
    var y = this.isset(_y) ? _y : 0;
    var duration = this.isset(_duration) ? _duration : 500;
    var animation = this.isset(_animation) ? _animation : false;

    if (typeof _x === 'string' || _x instanceof String) {
      if ($(_x).length) {
        var headerHeight = $('#site__header').outerHeight();
        y = $(_x).offset().top - headerHeight;
        animation = true;
      }

      x = 0;
    }

    if (this.isset(OAX.Scrollbar)) {
      if (animation) {
        window.OAX.Scrollbar.scrollTo(x, y, duration);
      } else if (typeof window.OAX.Scrollbar.snapTo === 'function') {
        window.OAX.Scrollbar.snapTo(x, y);
      } else if (typeof window.OAX.Scrollbar.setPosition === 'function') {
        window.OAX.Scrollbar.setPosition(x, y);
      }
    } else if (animation) {
      $('html,body').animate({
        scrollTop: y
      }, duration);
    } else {
      window.scrollTo(x, y);
    }
  },
  scrollLock: function scrollLock(lock) {
    var _lock = typeof lock === 'undefined' ? 'auto' : lock,
        $html = jQuery('html');

    if (_lock === true) {
      if (!$html.hasClass('is-fixed')) {
        jQuery.scrollLock(true);
        $html.addClass('is-fixed');
      }
    } else if (_lock === false) {
      if ($html.hasClass('is-fixed')) {
        jQuery.scrollLock(false);
        $html.removeClass('is-fixed');
      }
    } else if (_lock === 'auto') {
      if ($html.hasClass('is-fixed')) {
        jQuery.scrollLock(false);
      } else {
        jQuery.scrollLock(true);
      }

      $html.toggleClass('is-fixed');
    }
  },
  scrollDisable: function scrollDisable(disable) {
    var $body = jQuery('body'),
        _disable = typeof disable !== 'undefined' ? disable : 'auto';

    if (_disable === true) {
      $body.addClass(' overflow-hidden ');
    } else if (_disable === false) {
      $body.removeClass(' overflow-hidden ');
    } else if (_disable === 'auto') {
      if ($body.hasClass(' overflow-hidden ')) {
        $body.removeClass(' overflow-hidden ');
      } else {
        $body.addClass(' overflow-hidden ');
      }
    }
  },
  disableLinks: function disableLinks(exceptContainer) {
    var $allLinks = jQuery('a[href]');
    $allLinks.filter(function (index, el) {
      return !jQuery(el).closest(exceptContainer.selector).length;
    }).attr('disabled', true).addClass('pointer-events-none').addClass('is-disabled');
  },
  enableLinks: function enableLinks() {
    var $allLinks = jQuery('a[href][disabled].is-disabled');
    $allLinks.removeAttr('disabled').removeClass('pointer-events-none').removeClass('is-disabled');
  },
  initVideos: function initVideos(container) {
    var self = this;

    var hideOnPlay = function hideOnPlay(vidEl, vidPlayer) {
      var $el = $(vidEl);

      if (self.isset($el.data('hideOnPlay'))) {
        var $hideEl = $($el.data('hideOnPlay'));

        if (!vidPlayer.paused()) {
          gsap.to($hideEl, {
            duration: 0.5,
            autoAlpha: 0
          });
        } else {
          gsap.to($hideEl, {
            duration: 0.5,
            autoAlpha: 1
          });
        }
      }
    };

    if ($(container).find('.js--player').length > 0) {
      $(container).find('.js--player').each(function (i, el) {
        var videoPlayer = new Plyr(el);
      });
    }
  },
  playVideo: function playVideo($el) {
    var el = $el[0];

    if ($el.hasClass('vjs-tech')) {
      var videoPlayer = videojs.getPlayer(el);

      if (videoPlayer.paused()) {
        videoPlayer.play();
      }
    } else {
      el.play();
    }
  },
  pauseVideo: function pauseVideo($el) {
    if ($el.hasClass('vjs-tech')) {
      var videoPlayer;

      if ($el.length > 0) {
        if ($el.length === 1) {
          videoPlayer = videojs.getPlayer($el[0]);
          videoPlayer.pause();
        } else if ($el.length > 1) {
          $el.each(function (i, ell) {
            videoPlayer = videojs.getPlayer(ell);
            videoPlayer.pause();
          });
        }
      }
    } else {
      $el[0].pause();
    }
  },
  progressBar: function progressBar(action) {
    if (action === 'start') {
      Pace.start();
    } else if (action === 'stop') {// Pace.stop();
    }
  },
  debounce: function debounce(func, wait) {
    // we need to save these in the closure
    var timeout, args, context, timestamp;
    return function () {
      // save details of latest call
      context = this; // eslint-disable-line

      args = [].slice.call(arguments, 0); // eslint-disable-line

      timestamp = new Date(); // this is where the magic happens

      var later = function later() {
        // eslint-disable-line
        // how long ago was the last call
        var last = new Date() - timestamp;
        /*
         * if the latest call was less that the wait period ago
         * then we reset the timeout to wait for the difference
         */

        if (last < wait) {
          timeout = setTimeout(later, wait - last); // or if not we can null out the timer and run the latest
        } else {
          timeout = null;
          func.apply(context, args); // eslint-disable-line
        }
      }; // we only need to set the timer now if one isn't already running


      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
    };
  },
  cookie: {
    getItem: function getItem(sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*".concat(encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&'), "\\s*\\=\\s*([^;]*).*$)|^.*$")), '$1')) || null;
    },
    setItem: function setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
      }

      var sExpires = '';

      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : "; max-age=".concat(vEnd);
            break;

          case String:
            sExpires = "; expires=".concat(vEnd);
            break;

          case Date:
            sExpires = "; expires=".concat(vEnd.toUTCString());
            break;
        }
      }

      document.cookie = "".concat(encodeURIComponent(sKey), "=").concat(encodeURIComponent(sValue)).concat(sExpires).concat(sDomain ? "; domain=".concat(sDomain) : '').concat(sPath ? "; path=".concat(sPath) : '').concat(bSecure ? '; secure' : '');
      return true;
    },
    removeItem: function removeItem(sKey, sPath, sDomain) {
      if (!sKey || !this.hasItem(sKey)) {
        return false;
      }

      document.cookie = "".concat(encodeURIComponent(sKey), "=; expires=Thu, 01 Jan 1970 00:00:00 GMT").concat(sDomain ? "; domain=".concat(sDomain) : '').concat(sPath ? "; path=".concat(sPath) : '');
      return true;
    },
    hasItem: function hasItem(sKey) {
      return new RegExp("(?:^|;\\s*)".concat(encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&'), "\\s*\\=")).test(document.cookie);
    },
    keys: function keys() {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);

      for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
      }

      return aKeys;
    }
  },
  responsiveIframes: function responsiveIframes(container) {
    var $iframes = jQuery(container).find('iframe:not(.c-yt__iframe):not(.no-init):not(.h5p-iframe)');

    if ($iframes.length > 0) {
      $iframes.each(function (index, el) {
        var height = jQuery(el).height(),
            width = jQuery(el).width();
        var ratio = height / width * 100;

        if (jQuery(el).attr('src').includes('youtube')) {
          ratio = 9 / 16 * 100; // 16/9
        }

        jQuery(el).addClass('absolute inset');
        jQuery(el).wrap("<div class=\"c-iframe relative\" style=\"padding-bottom: ".concat(ratio, "%\"></div>"));
      });
    }
  },
  injectYT: function injectYT(_container) {
    var container = this.isset(_container) ? _container : document;
    var youtube = container.querySelectorAll('.js--yt');

    if ($(youtube).length > 0) {
      var _loop = function _loop() {
        /*
         * Medium Quality: http://img.youtube.com/vi/{video-id}/mqdefault.jpg (320×180 pixels)
         * High Quality: http://img.youtube.com/vi/G0wGs3useV8/hqdefault.jpg (480×360 pixels)
         * Standard Definition (SD): http://img.youtube.com/vi/G0wGs3useV8/sddefault.jpg (640×480 pixels)
         * Maximum Resolution: http://img.youtube.com/vi/G0wGs3useV8/maxresdefault.jpg (1920×1080 pixels)			        
         */
        var source = "https://img.youtube.com/vi/".concat($(youtube[i]).data('embed'), "/sddefault.jpg");
        var image = new Image();
        image.src = source;
        $(image).addClass('c-yt__poster absolute left-0 top-0 w-full h-full object-fit-cover');
        image.addEventListener('load', function () {
          // eslint-disable-line
          youtube[i].appendChild(image);
        }(i));
        youtube[i].addEventListener('click', function (event) {
          // eslint-disable-line
          var iframe = document.createElement('iframe');
          var $target = $(event.target).is('.js--yt') ? $(event.target) : $(event.target).closest('.js--yt');
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allowfullscreen', '');
          $(iframe).addClass('c-yt__iframe absolute left-0 top-0 w-full h-full');
          iframe.setAttribute('src', "https://www.youtube.com/embed/".concat($target.data('embed'), "?rel=0&showinfo=0&autoplay=1"));
          $target.html('');
          $target.append(iframe);
        });
        $(youtube[i]).append('<div class="js--yt__play-button"></div>');
      };

      for (var i = 0; i < youtube.length; i++) {
        _loop();
      }
    }
  },
  injectSVG: function injectSVG(container, selector) {
    var injectEls = container.querySelectorAll(typeof selector === 'undefined' ? '.js--svg-inject' : selector);

    if (jQuery(injectEls).length) {
      SVGInjector(injectEls, {
        // eslint-disable-line
        each: function each(svg) {
          jQuery(container).trigger('OAX::svg-loaded:single', [svg]);
        }
      }, function (totalSVGsInjected) {
        jQuery(container).trigger('OAX::svg-loaded:all', [totalSVGsInjected]);
      });
    }
  },
  imagesLoaded: function imagesLoaded(_container) {
    var container = this.isset(_container) ? _container : document;
    var dfr = $.Deferred(); // eslint-disable-line

    imagesloaded__WEBPACK_IMPORTED_MODULE_1___default()(container, function () {
      dfr.resolve();
    });

    return dfr.promise();
  },
  timelinePromise: function timelinePromise(timeline, onUpdateParam) {
    var _onUpdateParam = typeof onUpdateParam === 'undefined' ? false : onUpdateParam,
        _oldOnComplete = typeof timeline.vars.onComplete !== 'undefined' ? timeline.vars.onComplete : false;

    var _triggerPromise = true;
    return new Promise(function (resolve) {
      if (_onUpdateParam === false) {
        // alternate syntax for adding a callback
        timeline.eventCallback('onComplete', function () {
          if (_oldOnComplete !== false) {
            _oldOnComplete();
          }

          resolve(true);
        });
      } else if (jQuery.isNumeric(_onUpdateParam)) {
        timeline.eventCallback('onUpdate', function (tl) {
          if (tl === '{self}') {
            tl = timeline;
          }

          var fxd = tl.progress().toFixed(1);

          if (fxd == _onUpdateParam && _triggerPromise) {
            // eslint-disable-line
            _triggerPromise = false;

            if (_oldOnComplete !== false) {
              _oldOnComplete();
            }

            resolve(true);
          }

          if (fxd == _onUpdateParam + 0.1 && _triggerPromise) {
            // eslint-disable-line
            if (_oldOnComplete !== false) {
              _oldOnComplete();
            }

            resolve(true);
          }
        }, ['{self}']);
        timeline.eventCallback('onComplete', function () {});
      }
    });
  },
  loadScript: function loadScript(url, _id) {
    var _this = this;

    var scriptPromise = new Promise(function (resolve, reject) {
      var scripts = document.getElementsByTagName('script'),
          desiredSource = url;
      var alreadyLoaded = false;
      var id = _this.isset(_id) ? _id : false;

      if (scripts.length) {
        for (var scriptIndex in scripts) {
          // eslint-disable-line
          if (!alreadyLoaded && desiredSource === scripts[scriptIndex].src) {
            alreadyLoaded = true;
            resolve(true);
          }
        }
      }

      if (!alreadyLoaded) {
        var script = document.createElement('script');
        document.head.appendChild(script);
        script.onload = resolve;
        script.onerror = reject;

        if (id !== false) {
          script.id = id;
        } // script.async = true;


        script.src = url;
      }
    });
    return scriptPromise;
  },
  loadCSS: function loadCSS(url) {},
  loadSVG: function loadSVG(url) {
    return fetch(url).then(function (response) {
      return response.text();
    });
  },
  hint: function hint(container, action) {
    var wrapper = "<div class=\"c-hint\" style=\"pointer-events:none; position: absolute; width: 5rem; height: 5rem; top: 50%; left: 50%; margin: -2.5rem 0 0 -2.5rem; background-color: rgba(255,255,255,0.5); border-radius: 100%; padding: 1rem;\"></div>";
    var icons = {
      swipe: "<svg class=\"c-hint__swipe\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 120 120\" enable-background=\"new 0 0 120 120\" xml:space=\"preserve\">\n\t\t\t\t\t\t\t\t<g>\n\t\t\t\t\t\t\t\t\t<path class=\"c-hint__swipe-arrow\" fill=\"#231F20\" d=\"M54.5,27c0-1-1-2-2-2H23v-3.125c0-0.606-0.615-1.153-1.176-1.386s-1.456-0.104-1.885,0.325L15,26.375\n\t\t\t\t\t\t\t\t\t\tc-0.586,0.586-0.586,1.414,0,2l4.939,5.561c0.429,0.429,1.324,0.558,1.885,0.325S23,33.481,23,32.875V29h29.5\n\t\t\t\t\t\t\t\t\t\tC53.5,29,54.5,28,54.5,27z\"/>\n\t\t\t\t\t\t\t\t\t<path class=\"c-hint__swipe-arrow\" fill=\"#231F20\" d=\"M27.5,19H58v3.875c0,0.606,0.115,1.153,0.676,1.386s0.956,0.104,1.385-0.325L66,18.375\n\t\t\t\t\t\t\t\t\t\tc0.586-0.586,0.586-1.414,0-2l-5.939-5.561c-0.429-0.429-0.824-0.558-1.385-0.325S58,11.268,58,11.875V15H27.5c-1,0-2,1-2,2\n\t\t\t\t\t\t\t\t\t\tS26.5,19,27.5,19z\"/>\n\t\t\t\t\t\t\t\t\t<path class=\"c-hint__swipe-hand\" fill=\"#231F20\" d=\"M98.482,60.875c-0.407,0-1.44,0.14-2.502,0.47c-0.271-3.613-3.299-6.47-6.98-6.47\n\t\t\t\t\t\t\t\t\t\tc-1.657,0-3.182,0.579-4.382,1.545c-0.887-2.708-3.232-4.545-6.136-4.545c-1.923,0-3.634,0.791-4.854,2.083l-0.664-18.583\n\t\t\t\t\t\t\t\t\t\tc0-4.276-3.011-7.5-7.004-7.5s-7.004,3.224-7.004,7.532l0.686,32.025c-0.808,0.439-2.034,1.242-3.603,2.667\n\t\t\t\t\t\t\t\t\t\tc-5.429,4.934-7.206,16.868-1.075,26.105c6.825,10.282,14.822,14.671,26.742,14.671c12.629,0,16.854-6.338,20.1-12.83\n\t\t\t\t\t\t\t\t\t\tc3.122-6.244,3.158-30.156,3.158-31.17C104.965,63.678,101.936,60.875,98.482,60.875z M99.123,96.703\n\t\t\t\t\t\t\t\t\t\tc-3.056,6.112-6.475,11.172-17.416,11.172c-10.936,0-17.959-3.862-24.242-13.33c-3.661-5.516-5.25-16.916,0.593-22.227\n\t\t\t\t\t\t\t\t\t\tc0.631-0.573,1.188-1.022,1.66-1.371l0.224,10.459c0.019,0.828,0.712,1.494,1.532,1.468c0.828-0.018,1.485-0.703,1.468-1.532\n\t\t\t\t\t\t\t\t\t\tl-0.984-45.967c0-2.649,1.646-4.5,4.004-4.5s4.004,1.851,4.005,4.554l1,28c0.027,0.77,0.633,1.393,1.4,1.443\n\t\t\t\t\t\t\t\t\t\tc0.76,0.051,1.449-0.488,1.578-1.247l0.759-4.5c0.014-0.083,0.021-0.166,0.021-0.25c0-2.28,1.616-4,3.759-4\n\t\t\t\t\t\t\t\t\t\tc2.417,0,3.518,2.073,3.518,4v3c0,0.828,0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5c0-2.206,1.794-4,4-4s4,1.794,4,4v6.5\n\t\t\t\t\t\t\t\t\t\tc0,0.828,0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5v-3.82c0.6-0.292,1.776-0.68,2.482-0.68c1.79,0,3.482,1.457,3.482,3\n\t\t\t\t\t\t\t\t\t\tC101.965,73.591,101.453,92.043,99.123,96.703z\"/>\n\t\t\t\t\t\t\t\t</g>\n\t \t\t\t\t\t\t</svg>"
    };
    var actions = {
      swipe: function swipe(_container) {
        var tl = gsap.timeline({
          yoyo: true,
          repeat: -1,
          repeatDelay: 1
        });
        tl.fromTo($(_container).find('.c-hint__swipe-hand'), 1, {
          x: 0
        }, {
          x: 15
        });
      },
      destroy: function destroy(_container) {
        if ($(_container).find('.c-hint').length > 0) {
          TweenMax.to($(_container).find('.c-hint'), 0.5, {
            autoAlpha: 0,
            onComplete: function onComplete() {
              $(_container).find('.c-hint').remove();
            }
          });
        }
      }
    };

    if (action === 'swipe') {
      $(container).append($(wrapper).append(icons.swipe));
      actions[action](container);
    } else if (action === 'destroy') {
      actions[action](container);
    }
  },
  getComputedStyle: function getComputedStyle($el, value) {
    return window.getComputedStyle($el instanceof jQuery ? $el.get(0) : $el, null).getPropertyValue(value);
  },
  onTransitionEnd: function onTransitionEnd() {
    return 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
  },
  onAnimationEnd: function onAnimationEnd() {
    var animEndEventNames = {
      WebkitAnimation: 'webkitAnimationEnd',
      MozAnimation: 'animationend',
      OAnimation: 'oanimationend',
      msAnimation: 'MSAnimationEnd',
      animation: 'animationend'
    };
    return animEndEventNames[Modernizr.prefixed('animation')];
  },
  onAnimationIteration: function onAnimationIteration() {
    return 'MSAnimationIteration webkitAnimationIteration animationiteration';
  },
  goToUrl: function goToUrl(url) {
    // Barba.Pjax.goTo( url );
    window.location = url;
  },
  trackPageView: function trackPageView(url) {
    /** Analytics */
    if (typeof ga !== 'undefined' && typeof ga === 'function') {
      ga('send', 'pageview', url);
    }

    if (typeof _gaq !== 'undefined') {
      _gaq.push(['_trackPageview', url.replace(OAX.config.url_base, '')]);
    }
    /** Facebook */


    if (typeof fbq !== 'undefined' && typeof fbq === 'function') {
      fbq('track', 'ViewContent');
    }
    /** PIWIK */


    if (typeof _paq !== 'undefined') {
      _paq.push(['trackPageView']);
    }
  },
  isMobile: function isMobile() {
    return !Modernizr.mq('(min-width: 992px)');
  }
};

if (Utils.isset(window.OAX) && !window.OAX.hasOwnProperty('Utils')) {
  window.OAX.Utils = Utils;
}

/* harmony default export */ __webpack_exports__["default"] = (Utils);

/***/ }),

/***/ "./js/components/navigation.js":
/*!*************************************!*\
  !*** ./js/components/navigation.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Navigation; });
/* harmony import */ var _app_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/utils.js */ "./js/app/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */


var Navigation =
/*#__PURE__*/
function () {
  function Navigation() {
    _classCallCheck(this, Navigation);

    this.isOffcanvas = false;
    this.container = document.getElementById('site__navigation');
    this.button = this.container.getElementsByTagName('button')[0]; // this.menu = this.container.getElementsByClassName( 'site__navigation-menu' )[0];

    this.menu = this.container.getElementsByClassName('l-navigation-main')[0];
    this.offcanvas = document.getElementsByClassName('site__navigation-offcanvas')[0];

    if (_app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset(this.offcanvas)) {
      this.container = document.body;
      this.menu = this.offcanvas;
      this.isOffcanvas = true;
    }
  }

  _createClass(Navigation, [{
    key: "setupNavigation",
    value: function setupNavigation() {
      var _this = this;

      if (!this.container || 'undefined' === typeof this.button) {
        return;
      } // Hide menu toggle button if menu is empty and return early.


      if ('undefined' === typeof this.menu) {}
      /*
       * this.button.style.display = 'none';
       * return;
       */
      // Have menu closed by default


      this.menu.setAttribute('aria-expanded', 'false');

      if (-1 === this.menu.className.indexOf('nav-menu')) {
        this.menu.className += ' nav-menu';
      }

      if (typeof this.offcanvas !== 'undefined') {
        this.isOffcanvas = true;
        this.offcanvas.setAttribute('aria-expanded', 'false');
      } // Toggle mobile navigation


      jQuery(this.button).on('click.oax::navigation-toggle', function () {
        if (-1 !== _this.container.className.indexOf('is-open')) {
          _this.closeNavigation();
        } else {
          _this.openNavigation();
        }
      });

      if (jQuery('.wpm-language-switcher').length) {
        jQuery('.wpm-language-switcher').find('a[href]').addClass('no-barba');
      }

      this.setupButtonAnimation(); // this.navAccessibilitySupport();
    }
    /**
     * Allow keyboard users to use multi-level navigation
     */

  }, {
    key: "navAccessibilitySupport",
    value: function navAccessibilitySupport() {
      // Get all the link elements within the menu.
      var links = this.menu.getElementsByTagName('a');
      /*
       * @todo test if this is working
       * Each time a menu link is focused or blurred, toggle focus.
       */

      links.forEach(function (link) {
        link.addEventListener('focus', link.toggleFocus, true);
        link.addEventListener('blur', link.toggleFocus, true);
      });
    }
    /**
     * Toggles `focus` class to allow submenu access on tablets.
     */

  }, {
    key: "enableTouchFocus",
    value: function enableTouchFocus() {
      var _this2 = this;

      var parentLink = this.container.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');

      if ('ontouchstart' in window) {
        var touchStartFn = function touchStartFn(e) {
          var menuItem = _this2.parentNode;

          if (!menuItem.classList.contains('focus')) {
            e.preventDefault();

            for (var i = 0; i < menuItem.parentNode.children.length; ++i) {
              if (menuItem !== menuItem.parentNode.children[i]) {
                menuItem.parentNode.children[i].classList.remove('focus');
              }
            }

            menuItem.classList.add('focus');
          } else {
            menuItem.classList.remove('focus');
          }
        };

        for (var i = 0; i < parentLink.length; ++i) {
          parentLink[i].addEventListener('touchstart', touchStartFn, false);
        }
      }
    }
  }, {
    key: "openNavigation",
    value: function openNavigation() {
      if (this.isOffcanvas) {// Utils.scrollLock( true );
      }

      $('body').addClass('is-navigation--open');
      this.container.className += ' is-open';
      this.button.setAttribute('aria-expanded', 'true');
      this.menu.setAttribute('aria-expanded', 'true'); // this.tl.play();	

      jQuery(this.menu).on('click.oax::navigation-link-click', 'a', jQuery.proxy(this.closeNavigation, this));
    }
  }, {
    key: "closeNavigation",
    value: function closeNavigation() {
      if (this.isOffcanvas) {// Utils.scrollLock( false );
      }

      $('body').removeClass('is-navigation--open');
      this.container.className = this.container.className.replace(' is-open', '');
      this.button.setAttribute('aria-expanded', 'false');
      this.menu.setAttribute('aria-expanded', 'false'); // this.tl.reverse();

      jQuery(this.menu).off('click.oax::navigation-link-click', 'a', jQuery.proxy(this.closeNavigation, this));
    }
    /**
     * Sets or removes .focus class on an element.
     */

  }, {
    key: "toggleFocus",
    value: function toggleFocus() {
      var self = this; // Move up through the ancestors of the current link until we hit .nav-menu.

      while (-1 === self.className.indexOf('nav-menu')) {
        // On li elements toggle the class .focus.
        if ('li' === self.tagName.toLowerCase()) {
          if (-1 !== self.className.indexOf('focus')) {
            self.className = self.className.replace(' focus', '');
          } else {
            self.className += ' focus';
          }
        }

        self = self.parentElement;
      }
    }
  }, {
    key: "setActiveState",
    value: function setActiveState() {
      var classActive = 'current-menu-item',
          $links = jQuery(this.menu).find(' a[href] ');
      $links.each(function () {
        var $el = jQuery(this); // eslint-disable-line

        $el.parent('li').removeClass(classActive);
      });
      $links.filter(function () {
        var $el = jQuery(this); // eslint-disable-line

        var href = $el.attr('href');

        if (window.location.href.includes(href)) {
          return true;
        }

        return false;
      }).parent().addClass(classActive);
    }
  }, {
    key: "setupButtonAnimation",
    value: function setupButtonAnimation() {}
  }]);

  return Navigation;
}();



/***/ }),

/***/ "./js/components/slider.js":
/*!*********************************!*\
  !*** ./js/components/slider.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/utils.js */ "./js/app/utils.js");
/* eslint one-var: [0]*/

/* eslint max-len: [0]*/

/* eslint max-params: [0]*/

/* eslint complexity: [0]*/

/* eslint no-multi-assign: [0]*/

var Slider = {
  swiper: {
    options: {
      selector_slider: '.js--slider:not([data-init-by])',
      selector_slider_inner: '.c-slider__inner',
      selector_slider_track: '.c-slider__track',
      selector_slider_item: '.c-slider__item',
      selector_pagination: '.c-pagination',
      selector_pagination_next: '.c-pagination__next',
      selector_pagination_prev: '.c-pagination__prev',
      selector_pagination_nums: '.c-pagination__nums'
    },
    breakointQuery: '(max-width: 992px)',
    sliders: [],
    init: function init(container) {
      this.options.container = container; // this.initSlider();

      var breakpoint = window.matchMedia(this.breakointQuery);
      breakpoint.addEventListener('change', $.proxy(this.breakpointChecker, this));
      this.breakpoint = breakpoint;
      this.breakpointChecker();
    },
    breakpointChecker: function breakpointChecker(event) {
      var self = this; // if larger viewport and multi-row layout needed

      if (self.breakpoint.matches === true) {
        if (self.sliders.length) {
          self.destroySliders('all');
        }

        self.restoreClasses('init'); // or/and do nothing

        return true; // else if a small viewport and single column layout needed
      } else if (self.breakpoint.matches === false) {
        // fire small viewport version of swiper
        return self.initSlider();
      }

      return true;
    },
    initSlider: function initSlider() {
      var _this = this;

      var self = this;

      if ($(this.options.container).find(this.options.selector_slider).length) {
        $(this.options.container).find(this.options.selector_slider).each(function (i, el) {
          self.prepareClasses($(el));
          var $slideInner = $(el).find(_this.options.selector_slider_inner);
          var slidesPerViewLg = getComputedStyle(el).getPropertyValue('--slider-items-show__lg');
          var slidesPerViewSm = getComputedStyle(el).getPropertyValue('--slider-items-show__sm');
          var $sliderItems = $(el).find(_this.options.selector_slider_item);

          var spaceBetweenSlides = _this.getSpaceBetween(el);

          var swiperParams = _this.getParams(el);

          var slider = new Swiper($slideInner[0], Object.assign({
            // Optional parameters
            cssMode: Modernizr.scrollsnappoints,
            direction: 'horizontal',
            loop: false,
            rewind: false,
            slidesPerView: Math.round(slidesPerViewSm),
            spaceBetween: spaceBetweenSlides,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            breakpoints: {
              992: {
                slidesPerView: Math.round(slidesPerViewLg)
              }
            },
            watchSlidesProgress: true,
            preloadImages: false,
            lazy: {
              checkInView: true,
              enabled: true,
              loadPrevNext: true
            }
          }, swiperParams));
          self.sliders.push(slider);
        });
      }
    },
    destroySliders: function destroySliders(item) {
      var self = this;
      var destroyAll = item === 'all';

      if (destroyAll) {
        this.sliders.forEach(function (slider) {
          self.restoreClasses(slider);
          slider.destroy(true, true);
        });
        this.sliders = [];
      }
    },
    getParams: function getParams(slider) {
      var $slider = $(slider);

      if (_app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($slider.attr('data-swiper'))) {
        var params = $slider.data('swiper');

        if ($slider.hasClass('js--slider--carousel')) {
          params.on = {
            init: function init() {
              this.autoplay.stop();
            }
          }; // params.centeredSlides = true;
        }

        return params;
      }

      return {};
    },
    getSpaceBetween: function getSpaceBetween(slider) {
      var $slider = $(slider);
      var $sliderItems = $slider.find(this.options.selector_slider_item);
      var sliderItem = $sliderItems[0];
      var sliderItemFigure = $(sliderItem).find('.c-image__figure')[0];
      var sliderItemStyle = sliderItemFigure.currentStyle || window.getComputedStyle(sliderItemFigure);
      var sliderItemMarginLeft = Math.round(sliderItemStyle.marginLeft.replace('px', ''));
      var sliderItemMarginRight = Math.round(sliderItemStyle.marginRight.replace('px', ''));

      if (sliderItemMarginLeft > 0 || sliderItemMarginRight > 0) {// $slider.addClass( 'is-space-between' );
      }

      return 0; // return parseInt( sliderItemMarginLeft + sliderItemMarginRight, 10 );
    },
    prepareClasses: function prepareClasses($slider) {
      $slider.addClass('is-init');
      $slider.addClass('overflow-hidden');
      var $sliderTrack = $slider.find(this.options.selector_slider_track);
      var $sliderInner = $slider.find(this.options.selector_slider_inner);
      var $sliderItems = $slider.find(this.options.selector_slider_item);
      $sliderInner.removeClass('overflow-x-scroll').removeClass('overflow-y-hidden');
      $sliderTrack.addClass('swiper-wrapper');
      $sliderTrack.removeClass('flex-wrap');
      $sliderItems.addClass('swiper-slide');
      $sliderTrack.removeAttr('style');
      $sliderItems.removeAttr('style');

      if (!$slider.hasClass('js--slider--carousel')) {
        $sliderInner.append('<div class="c-slider__button c-slider__button--prev swiper-button-prev"></div>');
        $sliderInner.append('<div class="c-slider__button c-slider__button--next swiper-button-next"></div>');
      }
    },
    restoreClasses: function restoreClasses(swiperSlider) {
      if (swiperSlider === 'init') {
        if ($(this.options.container).find(this.options.selector_slider).length) {
          $(this.options.container).find(this.options.selector_slider).each(function (i, el) {
            var $slider = $(el);
            var $sliderImgs = $slider.find('img');
            var $sliderImgsNotLoaded = $sliderImgs.filter('[data-src]:not(.swiper-lazy-loaded)');
            $sliderImgsNotLoaded.each(function (_i, _el) {
              $(_el).removeClass('swiper-lazy').addClass('js--lazy');
            });
            $slider.find('.swiper-lazy-preloader').remove();
          });
        }
      } else {
        var $sliderWrapper = $(swiperSlider.$wrapperEl);
        var $sliderEl = $(swiperSlider.$el);
        var $slider = $sliderWrapper.closest('.js--slider');
        var $sliderImg = $sliderEl.find('img');
        var $sliderImgsNotLoaded = $sliderImg.filter('[data-src]:not(.swiper-lazy-loaded)');
        $sliderImgsNotLoaded.each(function (i, el) {
          $(el).removeClass('swiper-lazy').addClass('js--lazy');
        });
        $slider.find('.swiper-lazy-preloader').remove();
      }
    }
  },
  initPagination: function initPagination(ctx, $slider, fnNextName, fnPrevName) {
    var $pagination = $slider.hasClass('c-pagination') ? $slider : $slider.find('.c-pagination');
    $pagination.on('click.oax::slider:next', '.c-pagination__next', $.proxy(ctx[fnNextName], ctx));
    $pagination.on('click.oax::slider:prev', '.c-pagination__prev', $.proxy(ctx[fnPrevName], ctx));
  },
  updatePagination: function updatePagination($slider, $items, $currentItem) {
    var $pagination = $slider.hasClass('c-pagination') ? $slider : $slider.find('.c-pagination');
    var updateValue;
    var $paginationCurrent = $pagination.find('.c-pagination__current');

    if (jQuery.isNumeric($items)) {
      updateValue = $items;
    } else {
      updateValue = $items.index($currentItem) + 1;
    }

    $paginationCurrent.text(updateValue);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Slider);

/***/ }),

/***/ "./js/components/viewportAnimations.js":
/*!*********************************************!*\
  !*** ./js/components/viewportAnimations.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewportAnimations; });
/* harmony import */ var _app_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/utils.js */ "./js/app/utils.js");
/* harmony import */ var _app_fixes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/fixes.js */ "./js/app/fixes.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint one-var: [0]*/



var ViewportAnimations =
/*#__PURE__*/
function () {
  function ViewportAnimations(settings) {
    _classCallCheck(this, ViewportAnimations);

    var defaults = {
      container: 'body',
      selector: '.js--viewport',
      selector_not: ':not(.js--slider)',
      selector_animation: {
        header: '.js--anim-header',
        body: '.js--anim-body',
        footer: '.js--anim-footer',
        xtra: '.js--anim-xtra'
      },
      data_duration: 'animationDuration',
      data_start: 'animationStart',
      data_end: 'animationEnd',
      data_reverse: 'animationReverse',
      data_animation_item_header: 'animationItemHeader',
      data_animation_item_body: 'animationItemBody',
      data_animation_item_footer: 'animationItemFooter',
      data_animation_item_xtra: 'animationItemXtra',
      data_animation: 'animation',
      data_animation_device: 'animationDevice',
      data_stagger_items: 'animationStaggerItems',
      data_offset: 'animationOffset'
    };
    this._defaults = defaults;
    this.options = Object.assign(defaults, settings);
    this.y = 0;
    this.scenes = [];
  }

  _createClass(ViewportAnimations, [{
    key: "init",
    value: function init() {
      var self = this;
      this.$items = $(this.options.container).find(this.options.selector + this.options.selector_not);
      this.tweenItems = [];
      this.initSliderAutoplay();
      this.initEvents();
      this.initInViewClass();

      if (_app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset(window.OAX)) {
        OAX.vA = this;
      }
    }
  }, {
    key: "reInit",
    value: function reInit(container) {
      var self = this;
      this.options.container = container;
      this.destroy();
      this.init();
    }
  }, {
    key: "initView",
    value: function initView() {
      var self = this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$items = null;
      this.scenes = [];
      this.removeEvents();
    }
  }, {
    key: "initInViewClass",
    value: function initInViewClass() {
      var self = this;
      var $itemsSections = $(this.options.container).find('.c-section');

      if ($itemsSections.length) {
        $itemsSections.each(function (i, el) {
          var trigger = $(el).parent('.pin-spacer').length ? $(el).parent('.pin-spacer') : el;
          ScrollTrigger.create({
            trigger: trigger,
            onToggle: function onToggle(_self) {
              $(el)[_self.isActive ? 'addClass' : 'removeClass']('is-in-view');
            },
            start: 'top bottom',
            end: 'bottom top'
          });
        });
      }

      var $addClassEls = $(this.options.container).find("".concat(this.options.selector, "--class[data-animation-class]"));

      if ($addClassEls.length) {
        $addClassEls.each(function (i, el) {
          var trigger = $(el).parent('.pin-spacer').length ? $(el).parent('.pin-spacer') : el;
          var triggerClass = $(trigger).data('animationClass');
          ScrollTrigger.create({
            trigger: trigger,
            onToggle: function onToggle(_self) {
              $(el)[_self.isActive ? 'addClass' : 'removeClass'](triggerClass);
            },
            start: 'top bottom',
            end: 'bottom top'
          });
        });
      }

      $(document).trigger('OAX::viewport-animations:init-general', [this.$items]);
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var self = this;
      var y = 0;
      var justPlayVideos = true;
      this.$items.each(function (i, el) {
        var $item = $(el);
        var isMarkers = Boolean(_app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data('animationMarkers')));
        var duration = self.getAnimationOption($item, self.options.data_duration, 0.85);
        var offset = self.getAnimationOption($item, self.options.data_offset, 0);
        var reverse = self.getAnimationOption($item, self.options.data_reverse, false);
        var animationType = self.getAnimationOption($item, self.options.data_animation, 'fadeIn');
        var tween = gsap.timeline({
          defaults: {
            duration: duration,
            ease: 'power2'
          }
        });
        var animationStart = self.getAnimationOption($item, self.options.data_start, 'top+=17.5% bottom');
        var animationEnd = self.getAnimationOption($item, self.options.data_end, 'bottom top');
        var tweenOnStart = false;
        var tweenOnToggle = false;
        var tweenOnUpdate = false;
        var tweenOverwrite = false;
        var tweenItem = el;
        var scrollTriggerOptions = {};
        var tweenOptions;
        /**
         * Animation Types (Tweens)
         */

        if (animationType === 'fadeInUp') {
          tweenOptions = {
            y: 30,
            autoAlpha: 0
          };
        } else if (animationType === 'staggerFadeInUp' && _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data(self.options.data_stagger_items))) {
          tweenItem = $($item).find($item.data(self.options.data_stagger_items));
          tweenOptions = {
            y: 30,
            autoAlpha: 0,
            stagger: self.getAnimationOption($item, "".concat(self.options.data_duration, "Item"), 0.2)
          };
        } else if (animationType === 'fadeInDown') {
          tweenOptions = {
            y: -30,
            autoAlpha: 0
          };
        } else if (animationType === 'fadeInLeft') {
          tweenOptions = {
            x: -30,
            autoAlpha: 0
          };
        } else if (animationType === 'fadeInRight') {
          tweenOptions = {
            x: 30,
            autoAlpha: 0
          };
        } else if (animationType === 'splitWords') {
          var tweenSplit;
          gsap.set(tweenItem, {
            overflow: 'hidden'
          });

          if (_app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data('animationChilds'))) {
            tweenSplit = {};
            tweenSplit.chars = [];
            tweenSplit.lines = [];
            tweenSplit.words = [];
            $item.find('> *').each(function (_i, _el) {
              var _tweenSplit = new SplitText(_el, {
                type: 'lines,words,chars',
                linesClass: 'overflow-hidden js--text-split--line',
                wordsClass: 'overflow-hidden js--text-split--word'
              });

              tweenSplit.chars.push(_tweenSplit.chars);
              tweenSplit.words.push(_tweenSplit.words);
              tweenSplit.lines.push(_tweenSplit.lines);
            });
            tweenItem = tweenSplit.words;
          } else {
            tweenSplit = new SplitText(tweenItem, {
              type: 'lines,words,chars',
              linesClass: 'overflow-hidden js--text-split--lines',
              wordsClass: 'overflow-hidden js--text-split--words'
            });
            tweenItem = tweenSplit.words;
          }

          tweenOptions = {
            y: '100%',
            stagger: 0.1
          };
        } else if (animationType === 'content') {
          tweenOverwrite = true;

          var _tweenSplit2;

          var tweenHeader = [];
          var animHeader = _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data('animationItemHeader')) ? $item.find($item.data('animationItemHeader')) : $item.find('.js--anim-header');
          var animContent = _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data('animationItemContent')) ? $item.find($item.data('animationItemContent')) : $item.find('.js--anim-content');
          var animFooter = _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data('animationItemFooter')) ? $item.find($item.data('animationItemFooter')) : $item.find('.js--anim-footer');
          var animXtra = _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data('animationItemXtra')) ? $item.find($item.data('animationItemXtra')) : $item.find('.js--anim-xtra'); // console.log( animContent, animFooter, animHeader );

          if (animHeader.length) {
            _tweenSplit2 = {};
            _tweenSplit2.chars = [];
            _tweenSplit2.lines = [];
            _tweenSplit2.words = [];
            var animHeaderItems = animHeader.find('> *');

            if (!animHeaderItems.length) {
              animHeaderItems = animHeader;
            }

            if (animHeader.find(' > br ').length) {
              animHeaderItems = animHeader;
            }

            animHeaderItems.each(function (_i, _el) {
              /*
               * const _tweenSplit = new SplitText( _el, {
               * type: 'lines,words,chars',
               * linesClass: 'overflow-hidden js--text-split--lines',
               * wordsClass: 'overflow-hidden whitespace-no-wrap js--text-split--words',      
               * } );
               * tweenSplit.chars.push( _tweenSplit.chars );
               * tweenSplit.words.push( _tweenSplit.words );
               * tweenSplit.lines.push( _tweenSplit.lines );
               */
              tweenHeader.push(_el);
            });
            tween.addLabel('start').from(tweenHeader, {
              y: 20,
              autoAlpha: 0,
              stagger: 0.075
            }, 0).addLabel('animHeader');
          }

          if (animContent.length) {
            tween.from(animContent, {
              y: 20,
              autoAlpha: 0
            }, self.getAnimationOption(animContent, 'animationContentTiming', 'start+=0.2')).addLabel('animContent');
          }

          if (animFooter.length) {
            tween.from(animFooter, {
              y: 20,
              autoAlpha: 0
            }, self.getAnimationOption(animFooter, 'animationFooterTiming', 'start+=0.35')).addLabel('animFooter');
          }

          if (animXtra.length) {
            tween.from(animXtra, {
              y: 30,
              autoAlpha: 0
            }, self.getAnimationOption(animXtra, 'animationXtraTiming', 'start+=0.2')).addLabel('animXtra');
          }
        } else {
          tweenOptions = {
            autoAlpha: 0
          };
        }

        if (!tweenOverwrite) {
          tween.from(tweenItem, tweenOptions);
        }

        scrollTriggerOptions = {
          animation: tween,
          trigger: $item,
          markers: Boolean(isMarkers),
          start: animationStart,
          end: animationEnd
        };

        if (reverse && tweenOnUpdate === false) {
          scrollTriggerOptions.toggleActions = 'play none none reverse';
        }

        if (tweenOnUpdate !== false) {
          delete scrollTriggerOptions.animation;
          scrollTriggerOptions.onUpdate = tweenOnUpdate;

          if (animationType === 'videoScrub') {
            scrollTriggerOptions.scrub = true;
            scrollTriggerOptions.pin = true;

            if (_app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset(justPlayVideos) && justPlayVideos === true) {
              scrollTriggerOptions.scrub = false;
              scrollTriggerOptions.pin = false;
              delete scrollTriggerOptions.onUpdate;
              scrollTriggerOptions.onToggle = tweenOnToggle;
            }
          }

          if (tweenOnStart !== false) {
            scrollTriggerOptions.onStart = tweenOnStart;
          }
        } // self.createScrolltrigger( scrollTriggerOptions );


        var tweenTriggerItem = ScrollTrigger.create(scrollTriggerOptions);
        self.tweenItems.push(tweenTriggerItem);
      });
      $(document).trigger('OAX::viewport-animations:init-elements', [this.$items]);
    }
  }, {
    key: "removeEvents",
    value: function removeEvents() {}
  }, {
    key: "initSliderAutoplay",
    value: function initSliderAutoplay() {
      var self = this;
      var classes = {
        autoplay: 'js--slider--carousel',
        bottomnav: 'js--slider--bottom-nav'
      };
      var $swiperSliders = $('.js--viewport.js--slider');

      if ($swiperSliders.length) {
        $swiperSliders.each(function (i, el) {
          var $slider = $(el);
          ScrollTrigger.create({
            trigger: el,
            start: 'top bottom',
            onToggle: function onToggle(_self) {
              var $sliderSlider = $(el).find('.swiper-initialized');

              if ($sliderSlider.length) {
                var swiper = $sliderSlider[0].swiper;

                if ($slider.hasClass(classes.autoplay)) {
                  if (_self.isActive) {
                    swiper.autoplay.start();
                    $slider.addClass('is-autoplay');
                  } else {
                    swiper.autoplay.stop();
                    $slider.removeClass('is-autoplay');
                  }
                }
              }
            }
          });
        });
      }
    }
  }, {
    key: "getAnimationOption",
    value: function getAnimationOption($item) {
      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var _default = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var optionsArr = _app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isset($item.data(option)) ? $item.data(option) : _default;

      var _return;

      if ($.isArray(optionsArr)) {
        if (_app_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isMobile()) {
          if (_typeof(optionsArr[1]) === 'object' && optionsArr[1] !== null) {
            _return = JSON.parse(optionsArr[1]);
          } else {
            _return = optionsArr[1];
          }
        } else if (_typeof(optionsArr[0]) === 'object' && optionsArr[0] !== null) {
          _return = JSON.parse(optionsArr[0]);
        } else {
          _return = optionsArr[0];
        }
      } else if (_typeof(optionsArr) === 'object' && optionsArr !== null) {
        _return = JSON.parse(optionsArr);
      } else {
        _return = optionsArr;
      }

      return _return;
    }
  }, {
    key: "createScrolltrigger",
    value: function createScrolltrigger() {}
  }, {
    key: "setupAnimation",
    value: function setupAnimation(item, options) {}
  }, {
    key: "addScene",
    value: function addScene(scene) {// deprecated
    }
  }]);

  return ViewportAnimations;
}();



/***/ }),

/***/ "./js/components/woocommerce.js":
/*!**************************************!*\
  !*** ./js/components/woocommerce.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WooCommerce; });
/* harmony import */ var _app_fixes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/fixes.js */ "./js/app/fixes.js");
/* harmony import */ var _app_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/utils.js */ "./js/app/utils.js");
/* harmony import */ var _lib_woocommerce_iconic_woo_linked_variations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/woocommerce/iconic-woo-linked-variations.js */ "./js/lib/woocommerce/iconic-woo-linked-variations.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint one-var: [0]*/

/* eslint max-len: [0]*/

/* eslint max-params: [0]*/

/* eslint complexity: [0]*/

/* eslint no-multi-assign: [0]*/

/* eslint require-jsdoc: [0]*/

/* eslint no-inner-declarations: [0]*/

/**
 * File woocommerce.js.
 *
 * Handles Woocommerce.
 */


 // eslint-disable-line

var WooCommerce =
/*#__PURE__*/
function () {
  function WooCommerce(settings) {
    _classCallCheck(this, WooCommerce);

    var defaults = {
      features: {
        WooVariationSwatches: 0,
        Germanized: 1,
        LinkedVariations: 1
      },
      container: 'body',
      selectors: {
        noticesWrapper: '.woocommerce-notices-wrapper'
      },
      product: {
        variationsForm: '.variations_form',
        linkedVariations: '.iconic-wlv-variations',
        linkedVariationsLink: '.iconic-wlv-terms__term-content--link',
        buyBtn: '.single_add_to_cart_button',
        swatchesLoaded: 'wvs-loaded'
      },
      cart: {
        open: 'is-open',
        trigger: '.js--cart-trigger',
        trigger_product_count: '.js--cart-trigger__desc-count',
        selector: '.c-cart',
        close: '.c-cart__close',
        remove_product: '.remove[data-product_id]',
        data_product_count: 'data-cart-product-count'
      },
      scripts: {
        base_path: 'wp-content/plugins/woocommerce/assets/js/frontend/',
        checkout: 'checkout.min.js',
        countrySelect: 'country-select.min.js',
        cart: 'cart.min.js'
      }
    };
    this._defaults = defaults;
    this.options = Object.assign(defaults, settings);

    this._addJQuerySerializeInput();

    this.addEventListener();
    window.OAX.WooCommerce = this;
  }

  _createClass(WooCommerce, [{
    key: "init",
    value: function init(_container) {
      var self = this;
      var container = _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(_container) ? _container : this.options.container;
      var $container = $(container);
      var namespace = _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset($container.data('barbaNamespace')) ? $container.data('barbaNamespace') : null;

      if (namespace !== null) {
        this.addEventListener(container);

        if (namespace === 'product') {
          this.initProductDetail($container);
        }

        if (namespace === 'archive') {
          self.initInfiniteScroll($container);
        } else {
          self.destroyInfiniteScroll();
        }

        if (namespace === 'checkout') {
          this.initCheckout();
        } else {
          wc_checkout_params.is_checkout = '0';
        }

        if (namespace === 'cart') {
          this.initCart();
        }
      } else {
        // only first init
        $container = $container.find(OAX.APP.options.selector.siteInner);
        container = $container[0];
        namespace = $container.data('barbaNamespace');

        if (namespace === 'product') {
          this.addEventListener(container);

          if (this.options.LinkedVariations) {
            var $linkedVariations = $container.find(this.options.product.linkedVariations);

            if ($linkedVariations.length) {
              _lib_woocommerce_iconic_woo_linked_variations_js__WEBPACK_IMPORTED_MODULE_2__["default"].on_ready();
            }
          }
        }

        if (namespace === 'checkout') {
          wc_checkout_params.is_ajax_init = 1;
        }
        /*
         * if ( Utils.isset( wpNotesIsJetpackClient ) && Utils.isset( wpNotesIsJetpackClientV2 ) ){
         * // console.log
         * }
         */

      }
      /*
       * --- wishlist support
       * $(document).trigger( 'yith_wcwl_init' );
       */

    }
  }, {
    key: "initProductDetail",
    value: function initProductDetail($container) {
      var $variationForm = $container.find(this.options.product.variationsForm);
      var $buyButton = $container.find(this.options.product.buyBtn);
      var $linkedVariations = $container.find(this.options.product.linkedVariations);

      if ($variationForm.length) {
        if (OAX.debug) {
          console.log('init: wc_variation_form');
        }

        $variationForm.wc_variation_form();

        if (this.options.features.Germanized) {
          if (OAX.debug) {
            console.log('init: GERMANIZED: wc_variation_form');
          }

          if (typeof wc_gzd_add_to_cart_variation_params !== 'undefined') {
            // eslint-disable-line          
            $variationForm.wc_germanized_variation_form();
          }
        }

        if (this.options.features.WooVariationSwatches && !$variationForm.hasClass(this.options.product.swatchesLoaded)) {
          if (OAX.debug) {
            console.log('init: WooVariationSwatches');
          }

          $variationForm.WooVariationSwatches(); // eslint-disable-line
        }
      }

      if (this.options.LinkedVariations) {
        if ($linkedVariations.length) {
          _lib_woocommerce_iconic_woo_linked_variations_js__WEBPACK_IMPORTED_MODULE_2__["default"].on_ready();
        }
      }
      /* eslint-disable */


      if (_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(paypal) && _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(PayPalCommerceGateway)) {
        /*
         * If PayPal Buttons Empty
         */
        if (!$.trim($container.find(PayPalCommerceGateway.button.wrapper).html()).length) {
          // paypal.Buttons( PayPalCommerceGateway.button.style ).render(	PayPalCommerceGateway.button.wrapper );
          paypal.Buttons().render(PayPalCommerceGateway.button.wrapper);
        }
      }
      /* eslint-enable */

    }
  }, {
    key: "initVariationAddToCart",
    value: function initVariationAddToCart() {
      /**
       * Stores the default text for an element so it can be reset later
       */

      /*
       * $.fn.wc_set_content
       * $.fn.wc_variations_image_update
       */
    }
  }, {
    key: "initCheckout",
    value: function initCheckout() {
      var self = this;

      if (_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(wc_checkout_params)) {
        wc_checkout_params.is_checkout = '1';
        /*
         * Init Selectboxes
         */

        if ($().selectWoo) {
          setTimeout(function () {
            $(document.body).trigger('country_to_state_changed');
          }, 200);
        }
        /*
         * Remove Eventlistener on Body if already declared
         */


        $(document.body).off('init_checkout');
        $(document.body).off('update_checkout');
        $(document.body).off('click', 'a.showcoupon');
        $(document.body).off('click', '.woocommerce-remove-coupon');
        $(document.body).off('click', 'a.showlogin');
        $(document.body).off('click', 'a.woocommerce-terms-and-conditions-link'); // Get Checkout Script and init

        jQuery.getScript("".concat(OAX.config.url_base).concat(self.options.scripts.base_path).concat(self.options.scripts.checkout), function () {
          wc_checkout_params.is_ajax_init = 1;

          if (self.options.features.Germanized) {
            germanized.checkout.init();
          }
        });
        $(document.body).trigger('wc_address_i18n_ready');
      }
    }
  }, {
    key: "initCart",
    value: function initCart() {
      var self = this;
    }
  }, {
    key: "initInfiniteScroll",
    value: function initInfiniteScroll($container) {
      if (_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(window.yith_infs)) {
        var _initInfiniteScroll = function _initInfiniteScroll() {
          $(window).off('yith_infs_start');
          var infiniteScrollArgs = {
            nextSelector: yith_infs.nextSelector,
            navSelector: yith_infs.navSelector,
            itemSelector: yith_infs.itemSelector,
            contentSelector: yith_infs.contentSelector,
            loader: "<img src=\"".concat(yith_infs.loader, "\">"),
            is_shop: '1'
          };
          $(yith_infs.contentSelector).yit_infinitescroll(infiniteScrollArgs);
        };

        setTimeout(_initInfiniteScroll, 500);
      }
    }
  }, {
    key: "destroyInfiniteScroll",
    value: function destroyInfiniteScroll() {
      $(window).off('yith_infs_start');
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(_container) {
      var container = _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(_container) ? _container : null;

      if (container === null) {
        $(document).on('click.oax::add-to-cart', "".concat(this.options.product.buyBtn, ":not(.disabled)"), this.onAddToCart);
        $(document.body).on('adding_to_cart', $.proxy(this.onAddingToCart, this));
        $(document.body).on('added_to_cart', $.proxy(this.onAddedToCard, this));
        $(document.body).on('removed_from_cart', $.proxy(this.onRemovedFromCart, this));
        $(document.body).on('wc_fragments_loaded', $.proxy(this.onFragmentsLoaded, this));
        $(document).on('click.oax::open-cart', this.options.cart.trigger, $.proxy(this.onToggleCart, this));
        $(document).on('click.oax::change-cart-qty', '.js--cart-qty-change-btn', this.onItemQtyChange);
        $(document).on('focusout.oax::change-cart-qty', '.js--cart-qty-change-input', this.onItemQtyChange);
      } else {
        var $container = $(container);
        var namespace = $container.data('barbaNamespace');
        var $variationForm = $container.find(this.options.product.variationsForm);

        if (namespace === 'product') {
          $variationForm.on('show_variation', this.onShowVariation);

          if (this.options.features.Germanized) {
            $variationForm.on('germanized_variation_data', this.onGermanizedVariationData);
          }

          var $linkedVariations = $container.find(this.options.product.linkedVariations);

          if ($linkedVariations.length) {
            /*
             * this.prefetchLinkedVariations( $linkedVariations );
             * $linkedVariations.on( 'click.oax::change-linked-variations', this.options.product.linkedVariationsLink, $.proxy( this.onLinkedVariation, this ) );
             */
          }
        }
      }
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener() {}
  }, {
    key: "onFragmentsLoaded",
    value: function onFragmentsLoaded(event) {
      if (OAX.debug) {
        console.log('onFragmentsLoaded', event);
      }

      var productCount = $(this.options.cart.selector).find("[".concat(this.options.cart.data_product_count, "]")).attr(this.options.cart.data_product_count);

      if (typeof productCount !== 'undefined') {
        $(this.options.cart.trigger_product_count).text(productCount);
      } else {
        $(this.options.cart.trigger_product_count).text('');
      }
    }
  }, {
    key: "onShowVariation",
    value: function onShowVariation(event, variationData, keineAhnung) {
      if (OAX.debug) {
        console.log(event, variationData);
      }
    }
  }, {
    key: "onGermanizedVariationData",
    value: function onGermanizedVariationData(event, variationData, $wrapper) {
      if (OAX.debug) {
        console.log(event, variationData);
      }

      var $container = $(event.target).closest('[data-barba="container"]');

      if (_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(variationData.price_html) && variationData.price_html !== '') {
        $container.find('.js--product-price').html(variationData.price_html);
      }
    }
  }, {
    key: "prefetchLinkedVariations",
    value: function prefetchLinkedVariations($linkedVariationsContainer) {
      var $variationLinks = $linkedVariationsContainer.find('a');
      var prefetchUrls = [];
      $variationLinks.each(function (i, _el) {
        prefetchUrls.push($(_el).attr('href'));
      });

      if (_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile()) {
        prefetchUrls.slice(0, 3);
      } else {
        prefetchUrls.slice(0, 10);
      }

      var _prefetchVariations = function _prefetchVariations() {
        prefetchUrls.forEach(function (href) {
          barba.prefetch(href);
        });
      };

      setTimeout(_prefetchVariations, 1000);
    } // not used

  }, {
    key: "onLinkedVariation",
    value: function onLinkedVariation(event) {
      var self = this;
      var $target = $(event.target).is('a') ? $(event.target) : $(event.target).closest('a');
      var url = $target.attr('href');
      $.ajax(url).done(function (response) {
        var $DOC = $('<div />').append(response);
        self.changeTemplateFragmentsLinkedVariations($DOC);
      });
      event.preventDefault();
    } // not used

  }, {
    key: "changeTemplateFragmentsLinkedVariations",
    value: function changeTemplateFragmentsLinkedVariations($DOC) {
      var $container = $('[data-barba="container"]');
      var templateSelectors = {
        title: '.product_title',
        form: 'form.cart',
        image: '.woocommerce-product-gallery__wrapper'
      }; // Title

      $container.find(templateSelectors.title).replaceWith($DOC.find(templateSelectors.title)); // Price

      $container.find(templateSelectors.title).replaceWith($DOC.find(templateSelectors.title)); // Image

      $container.find(templateSelectors.image).replaceWith($DOC.find(templateSelectors.image)); // Form

      $container.find(templateSelectors.form).replaceWith($DOC.find(templateSelectors.form));
      console.log($form);
    }
  }, {
    key: "onAddToCart",
    value: function onAddToCart(event) {
      var $thisbutton = $(event.target);
      var $form = $thisbutton.closest('form.cart');
      /*
       * quantity = $form.find('input[name=quantity]').val() || 1,
       * product_id = $form.find('input[name=variation_id]').val() || $thisbutton.val(),
       */

      var data = $form.find('input:not([name="product_id"]), select, button, textarea').serializeInputs() || 0;
      $.each(data, function (i, item) {
        if (item.name === 'add-to-cart') {
          item.name = 'product_id';
          item.value = $form.find('input[name=variation_id]').val() || $thisbutton.val();
        }
      });
      $(document.body).trigger('adding_to_cart', [$thisbutton, data]);
      $.ajax({
        type: 'POST',
        url: woocommerce_params.wc_ajax_url.toString().replace('%%endpoint%%', 'add_to_cart'),
        data: data,
        beforeSend: function beforeSend(response) {
          $thisbutton.removeClass('added').addClass('loading');
        },
        complete: function complete(response) {
          $thisbutton.removeClass('loading');
          setTimeout(function () {
            $thisbutton.removeClass('added').removeClass('error');
          }, 5000);
        },
        success: function success(response) {
          if (response.error && response.product_url) {
            $thisbutton.removeClass('loading');
            $thisbutton.addClass('error');
            window.location = response.product_url;
            return;
          }

          $thisbutton.addClass('added');
          $(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash, $thisbutton]);
        }
      });
      event.preventDefault();
    }
  }, {
    key: "onAddingToCart",
    value: function onAddingToCart(event, $thisbutton, data) {
      var self = this;

      if (OAX.debug) {
        console.log('onaddingtocart', event, $thisbutton, data);
      } // action

    }
  }, {
    key: "onAddedToCard",
    value: function onAddedToCard(event, fragments, cartHash, $button) {
      var self = this;

      if (OAX.debug) {
        console.log('onaddadetocart', event, fragments, cartHash, $button);
      }

      if (_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset($button) && $button.hasClass('added')) {
        setTimeout(function () {
          self.openCart();
        }, 500);
      } else {
        this.openCart();
      }
    }
    /*
     * Shopping Cart
     */

  }, {
    key: "onToggleCart",
    value: function onToggleCart(event) {
      var $target = $(event.target).hasClass(this.options.cart.trigger) ? $(event.target) : $(event.target).closest(this.options.cart.trigger);
      var $cart = $(this.options.cart.selector);
      this.toggleCart();
      event.preventDefault();
    }
  }, {
    key: "onOutsideCartClick",
    value: function onOutsideCartClick(event) {
      var $target = $(event.target);

      if ($target.is(this.options.cart.close) || !$target.closest(this.options.cart.selector).length) {
        this.closeCart();
      }
    }
  }, {
    key: "openCart",
    value: function openCart() {
      var $cart = $(this.options.cart.selector);
      $(document).on('click.oax::cart-outside', $.proxy(this.onOutsideCartClick, this));
      $cart.on('click.oax::link-inside', 'a:not(.remove_from_cart_button)', $.proxy(this.closeCart, this));
      $cart.addClass(this.options.cart.open);
    }
  }, {
    key: "closeCart",
    value: function closeCart() {
      var $cart = $(this.options.cart.selector);
      $(document).off('click.oax::cart-outside', $.proxy(this.onOutsideCartClick, this));
      $cart.off('click.oax::link-inside', 'a:not(.remove_from_cart_button)', $.proxy(this.closeCart, this));
      $cart.removeClass(this.options.cart.open);
    }
  }, {
    key: "toggleCart",
    value: function toggleCart() {
      var $cart = $(this.options.cart.selector);

      if ($cart.hasClass(this.options.cart.open)) {
        this.closeCart();
      } else {
        this.openCart();
      }
    }
  }, {
    key: "onItemQtyChange",
    value: function onItemQtyChange(event) {
      var $target = $(event.target);
      var $item = $target.closest('.woocommerce-mini-cart-item');
      var $items = $item.siblings('.woocommerce-mini-cart-item');
      var $cart = $('.c-cart');
      var $component = $target.closest('.js--cart-qty-change');
      var $siblingTargets = $item.find('.js--cart-qty-change-btn, .js--cart-qty-change-input');
      var cartItemKey = $item.data('cartItemKey');
      var cartItemQty = parseInt($item.find('.js--cart-qty-change-input').val(), 10);

      var _oldCartItemQty = $item.data('cartItemQty');

      if ($target.hasClass('js--cart-qty-change-btn')) {
        if ($target.hasClass('js--cart-qty-change-btn--minus')) {
          cartItemQty = cartItemQty - 1 <= 0 ? 0 : cartItemQty - 1;
        } else {
          cartItemQty += 1;
        }
      }

      if (cartItemQty !== _oldCartItemQty) {
        $cart.addClass('is-loading');
        var $loader = $(OAX.template.loader.html);
        $cart.append($loader.css({
          position: 'absolute',
          left: '50%',
          top: '50%'
        }));
        $siblingTargets.prop('disabled', true);
        var data = {
          action: 'oax_ajax_cart_update_qty',
          cart_item_key: cartItemKey,
          // eslint-disable-line
          cart_item_qty: cartItemQty // eslint-disable-line

        };
        $.post(OAX.config.url_ajax, data, function (response) {
          jQuery(document.body).one('wc_fragments_refreshed', function () {
            $siblingTargets.prop('disabled', false);
            $cart.find(OAX.template.loader.selector).remove();
            $cart.removeClass('is-loading');
            jQuery(document.body).trigger('wc_fragments_loaded');

            if (response.errors !== false) {
              /*
               * response.errors.errors.forEach( ( errorText ) => {
               * alert( errorText );
               * } );
               */
            }

            if ($('form.woocommerce-checkout').length) {
              jQuery(document.body).trigger('update_checkout');
            }
          });
          jQuery(document.body).trigger('wc_fragment_refresh');
        });
      }

      if (event.type === 'click') {
        event.preventDefault();
      }
    }
  }, {
    key: "onRemovedFromCart",
    value: function onRemovedFromCart(event, fragments, cartHash, $thisbutton) {
      if ($('form.woocommerce-checkout').length) {
        jQuery(document.body).trigger('update_checkout');
      }
    }
    /* eslint-disable */

  }, {
    key: "_addJQuerySerializeInput",
    value: function _addJQuerySerializeInput() {
      $.fn.serializeInputs = function () {
        var rCRLF = /\r?\n/g;
        return this.map(function () {
          return this.elements ? jQuery.makeArray(this.elements) : this;
        }).map(function (i, elem) {
          var val = jQuery(this).val();

          if (val == null) {
            return val == null;
          } else if (this.type == 'checkbox' && this.checked === false) {
            return {
              name: this.name,
              value: this.checked ? this.value : ''
            };
          }

          return jQuery.isArray(val) ? jQuery.map(val, function (val, i) {
            return {
              name: elem.name,
              value: val.replace(rCRLF, '\r\n')
            };
          }) : {
            name: elem.name,
            value: val.replace(rCRLF, '\r\n')
          };
        }).get();
      };
    }
    /* eslint-enable */

  }]);

  return WooCommerce;
}();



/***/ }),

/***/ "./js/lib/jquery.scrolllock.js":
/*!*************************************!*\
  !*** ./js/lib/jquery.scrolllock.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint new-cap: [0] */

/* eslint one-var: [0] */

/* eslint require-jsdoc: [0] */

/* eslint no-use-before-define: [0] */

/* eslint brace-style: [0] */
jQuery.scrollLock = function scrollLockClosure() {
  var $html = jQuery('html'),
      // State: unlocked by default
  locked = false,
      // State: scroll to revert to
  prevScroll = {
    scrollLeft: jQuery(window).scrollLeft(),
    scrollTop: jQuery(window).scrollTop()
  },
      // State: styles to revert to
  prevStyles = {},
      lockStyles = {
    'overflow-y': 'scroll',
    position: 'fixed',
    width: '100%'
  }; // Instantiate cache in case someone tries to unlock before locking

  saveStyles(); // Save context's inline styles in cache

  function saveStyles() {
    var styleAttr = $html.attr('style'),
        styleStrs = [],
        styleHash = {};

    if (!styleAttr) {
      return;
    }

    styleStrs = styleAttr.split(/;\s/);
    jQuery.each(styleStrs, function (styleString) {
      if (!styleString) {
        return;
      }

      var keyValue = styleString.split(/\s:\s/);

      if (keyValue.length < 2) {
        return;
      }

      styleHash[keyValue[0]] = keyValue[1];
    });
    jQuery.extend(prevStyles, styleHash);
  }

  function lock() {
    var appliedLock = {}; // Duplicate execution will break DOM statefulness

    if (locked) {
      return;
    } // Save scroll state...


    prevScroll = {
      scrollLeft: jQuery(window).scrollLeft(),
      scrollTop: jQuery(window).scrollTop()
    }; // ...and styles

    saveStyles(); // Compose our applied CSS

    jQuery.extend(appliedLock, lockStyles, {
      // And apply scroll state as styles
      left: "".concat(-prevScroll.scrollLeft, "px"),
      top: "".concat(-prevScroll.scrollTop, "px")
    }); // Then lock styles...

    $html.css(appliedLock); // ...and scroll state

    jQuery(window).scrollLeft(0).scrollTop(0);
    locked = true;
  }

  function unlock() {
    // Duplicate execution will break DOM statefulness
    if (!locked) {
      return;
    } // Revert styles


    $html.attr('style', jQuery('<x>').css(prevStyles).attr('style') || ''); // Revert scroll values

    jQuery(window).scrollLeft(prevScroll.scrollLeft).scrollTop(prevScroll.scrollTop);
    locked = false;
  }

  return function scrollLock(on) {
    // If an argument is passed, lock or unlock depending on truthiness
    if (arguments.length) {
      if (on) {
        lock();
      } else {
        unlock();
      }
    } // Otherwise, toggle
    else if (locked) {
        unlock();
      } else {
        lock();
      }
  };
}();

/***/ }),

/***/ "./js/lib/jquery.serializeObject.js":
/*!******************************************!*\
  !*** ./js/lib/jquery.serializeObject.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$.fn.serializeObject = function () {
  "use strict";

  var a = {},
      b = function b(_b, c) {
    var d = a[c.name];
    "undefined" != typeof d && d !== null ? $.isArray(d) ? d.push(c.value) : a[c.name] = [d, c.value] : a[c.name] = c.value;
  };

  return $.each(this.serializeArray(), b), a;
};

/***/ }),

/***/ "./js/lib/pace.min.js":
/*!****************************!*\
  !*** ./js/lib/pace.min.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable */

/*!
 * pace.js v1.2.4
 * https://github.com/CodeByZach/pace/
 * Licensed MIT © HubSpot, Inc.
 */
!function () {
  function o(t, e) {
    return function () {
      return t.apply(e, arguments);
    };
  }

  var u,
      c,
      i,
      s,
      n,
      y,
      t,
      l,
      v,
      r,
      a,
      p,
      e,
      h,
      w,
      b,
      f,
      g,
      _d,
      m,
      k,
      S,
      q,
      L,
      x,
      P,
      T,
      R,
      j,
      O,
      E,
      M,
      A,
      C,
      N,
      _,
      F,
      U,
      W,
      X,
      D,
      H,
      I,
      z,
      G,
      B,
      J = [].slice,
      K = {}.hasOwnProperty,
      Q = function Q(t, e) {
    for (var n in e) {
      K.call(e, n) && (t[n] = e[n]);
    }

    function r() {
      this.constructor = t;
    }

    return r.prototype = e.prototype, t.prototype = new r(), t.__super__ = e.prototype, t;
  },
      V = [].indexOf || function (t) {
    for (var e = 0, n = this.length; e < n; e++) {
      if (e in this && this[e] === t) return e;
    }

    return -1;
  };

  function Y() {}

  for (g = {
    className: "",
    catchupTime: 100,
    initialRate: .03,
    minTime: 250,
    ghostTime: 100,
    maxProgressPerFrame: 20,
    easeFactor: 1.25,
    startOnPageLoad: !0,
    restartOnPushState: !0,
    restartOnRequestAfter: 500,
    target: "body",
    elements: {
      checkInterval: 100,
      selectors: ["body"]
    },
    eventLag: {
      minSamples: 10,
      sampleCount: 3,
      lagThreshold: 3
    },
    ajax: {
      trackMethods: ["GET"],
      trackWebSockets: !0,
      ignoreURLs: []
    }
  }, P = function P() {
    var t;
    return null != (t = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? t : +new Date();
  }, R = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, f = window.cancelAnimationFrame || window.mozCancelAnimationFrame, p = function p(t, e, n) {
    if ("function" == typeof t.addEventListener) return t.addEventListener(e, n, !1);
    var r;
    "function" != typeof t["on" + e] || "object" != _typeof(t["on" + e].eventListeners) ? (r = new s(), "function" == typeof t["on" + e] && r.on(e, t["on" + e]), t["on" + e] = function (t) {
      return r.trigger(e, t);
    }, t["on" + e].eventListeners = r) : r = t["on" + e].eventListeners, r.on(e, n);
  }, null == R && (R = function R(t) {
    return setTimeout(t, 50);
  }, f = function f(t) {
    return clearTimeout(t);
  }), O = function O(e) {
    var n = P(),
        r = function r() {
      var t = P() - n;
      return 33 <= t ? (n = P(), e(t, function () {
        return R(r);
      })) : setTimeout(r, 33 - t);
    };

    return r();
  }, j = function j() {
    var t = arguments[0],
        e = arguments[1],
        n = 3 <= arguments.length ? J.call(arguments, 2) : [];
    return "function" == typeof t[e] ? t[e].apply(t, n) : t[e];
  }, _d = function d() {
    for (var t, e, n, r = arguments[0], s = 2 <= arguments.length ? J.call(arguments, 1) : [], o = 0, i = s.length; o < i; o++) {
      if (e = s[o]) for (t in e) {
        K.call(e, t) && (n = e[t], null != r[t] && "object" == _typeof(r[t]) && null != n && "object" == _typeof(n) ? _d(r[t], n) : r[t] = n);
      }
    }

    return r;
  }, h = function h(t) {
    for (var e, n, r = e = 0, s = 0, o = t.length; s < o; s++) {
      n = t[s], r += Math.abs(n), e++;
    }

    return r / e;
  }, k = function k(t, e) {
    var n, r;

    if (null == t && (t = "options"), null == e && (e = !0), r = document.querySelector("[data-pace-" + t + "]")) {
      if (n = r.getAttribute("data-pace-" + t), !e) return n;

      try {
        return JSON.parse(n);
      } catch (t) {
        return "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", t) : void 0;
      }
    }
  }, Y.prototype.on = function (t, e, n, r) {
    var s;
    return null == r && (r = !1), null == this.bindings && (this.bindings = {}), null == (s = this.bindings)[t] && (s[t] = []), this.bindings[t].push({
      handler: e,
      ctx: n,
      once: r
    });
  }, Y.prototype.once = function (t, e, n) {
    return this.on(t, e, n, !0);
  }, Y.prototype.off = function (t, e) {
    var n, r, s;

    if (null != (null != (r = this.bindings) ? r[t] : void 0)) {
      if (null == e) return delete this.bindings[t];

      for (n = 0, s = []; n < this.bindings[t].length;) {
        this.bindings[t][n].handler === e ? s.push(this.bindings[t].splice(n, 1)) : s.push(n++);
      }

      return s;
    }
  }, Y.prototype.trigger = function () {
    var t,
        e,
        n,
        r,
        s,
        o,
        i = arguments[0],
        a = 2 <= arguments.length ? J.call(arguments, 1) : [];

    if (null != (r = this.bindings) && r[i]) {
      for (n = 0, o = []; n < this.bindings[i].length;) {
        e = (s = this.bindings[i][n]).handler, t = s.ctx, s = s.once, e.apply(null != t ? t : this, a), s ? o.push(this.bindings[i].splice(n, 1)) : o.push(n++);
      }

      return o;
    }
  }, B = Y, y = window.Pace || {}, window.Pace = y, _d(y, B.prototype), T = y.options = _d({}, g, window.paceOptions, k()), X = 0, H = (z = ["ajax", "document", "eventLag", "elements"]).length; X < H; X++) {
    !0 === T[C = z[X]] && (T[C] = g[C]);
  }

  function Z() {
    return Z.__super__.constructor.apply(this, arguments);
  }

  function $() {
    this.progress = 0;
  }

  function tt() {
    this.bindings = {};
  }

  function et() {
    var e,
        o = this;
    et.__super__.constructor.apply(this, arguments), e = function e(r) {
      var s = r.open;
      return r.open = function (t, e, n) {
        return A(t) && o.trigger("request", {
          type: t,
          url: e,
          request: r
        }), s.apply(r, arguments);
      };
    }, window.XMLHttpRequest = function (t) {
      t = new W(t);
      return e(t), t;
    };

    try {
      m(window.XMLHttpRequest, W);
    } catch (t) {}

    if (null != U) {
      window.XDomainRequest = function () {
        var t = new U();
        return e(t), t;
      };

      try {
        m(window.XDomainRequest, U);
      } catch (t) {}
    }

    if (null != F && T.ajax.trackWebSockets) {
      window.WebSocket = function (t, e) {
        var n = null != e ? new F(t, e) : new F(t);
        return A("socket") && o.trigger("request", {
          type: "socket",
          url: t,
          protocols: e,
          request: n
        }), n;
      };

      try {
        m(window.WebSocket, F);
      } catch (t) {}
    }
  }

  function nt() {
    this.complete = o(this.complete, this);
    var t = this;
    this.elements = [], S().on("request", function () {
      return t.watch.apply(t, arguments);
    });
  }

  function rt(t) {
    var e, n, r, s;

    for (null == t && (t = {}), this.complete = o(this.complete, this), this.elements = [], null == t.selectors && (t.selectors = []), n = 0, r = (s = t.selectors).length; n < r; n++) {
      e = s[n], this.elements.push(new i(e, this.complete));
    }
  }

  function st(t, e) {
    this.selector = t, this.completeCallback = e, this.progress = 0, this.check();
  }

  function ot() {
    var t,
        e,
        n = this;
    this.progress = null != (e = this.states[document.readyState]) ? e : 100, t = document.onreadystatechange, document.onreadystatechange = function () {
      return null != n.states[document.readyState] && (n.progress = n.states[document.readyState]), "function" == typeof t ? t.apply(null, arguments) : void 0;
    };
  }

  function it(t) {
    this.source = t, this.last = this.sinceLastUpdate = 0, this.rate = T.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = j(this.source, "progress"));
  }

  B = Error, Q(Z, B), n = Z, $.prototype.getElement = function () {
    var t;

    if (null == this.el) {
      if (!(t = document.querySelector(T.target))) throw new n();
      this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/(pace-done )|/, "pace-running ");
      var e = "" !== T.className ? " " + T.className : "";
      this.el.innerHTML = '<div class="pace-progress' + e + '">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != t.firstChild ? t.insertBefore(this.el, t.firstChild) : t.appendChild(this.el);
    }

    return this.el;
  }, $.prototype.finish = function () {
    var t = this.getElement();
    return t.className = t.className.replace("pace-active", "pace-inactive"), document.body.className = document.body.className.replace("pace-running ", "pace-done ");
  }, $.prototype.update = function (t) {
    return this.progress = t, y.trigger("progress", t), this.render();
  }, $.prototype.destroy = function () {
    try {
      this.getElement().parentNode.removeChild(this.getElement());
    } catch (t) {
      n = t;
    }

    return this.el = void 0;
  }, $.prototype.render = function () {
    var t, e, n, r, s, o, i;
    if (null == document.querySelector(T.target)) return !1;

    for (t = this.getElement(), r = "translate3d(" + this.progress + "%, 0, 0)", s = 0, o = (i = ["webkitTransform", "msTransform", "transform"]).length; s < o; s++) {
      e = i[s], t.children[0].style[e] = r;
    }

    return (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (t.children[0].setAttribute("data-progress-text", (0 | this.progress) + "%"), 100 <= this.progress ? n = "99" : (n = this.progress < 10 ? "0" : "", n += 0 | this.progress), t.children[0].setAttribute("data-progress", "" + n)), y.trigger("change", this.progress), this.lastRenderedProgress = this.progress;
  }, $.prototype.done = function () {
    return 100 <= this.progress;
  }, c = $, tt.prototype.trigger = function (t, e) {
    var n, r, s, o, i;

    if (null != this.bindings[t]) {
      for (i = [], r = 0, s = (o = this.bindings[t]).length; r < s; r++) {
        n = o[r], i.push(n.call(this, e));
      }

      return i;
    }
  }, tt.prototype.on = function (t, e) {
    var n;
    return null == (n = this.bindings)[t] && (n[t] = []), this.bindings[t].push(e);
  }, s = tt, W = window.XMLHttpRequest, U = window.XDomainRequest, F = window.WebSocket, m = function m(t, e) {
    var n,
        r = [];

    for (n in e.prototype) {
      try {
        null == t[n] && "function" != typeof e[n] ? "function" == typeof Object.defineProperty ? r.push(Object.defineProperty(t, n, {
          get: function (t) {
            return function () {
              return e.prototype[t];
            };
          }(n),
          configurable: !0,
          enumerable: !0
        })) : r.push(t[n] = e.prototype[n]) : r.push(void 0);
      } catch (t) {
        0;
      }
    }

    return r;
  }, L = [], y.ignore = function () {
    var t = arguments[0],
        e = 2 <= arguments.length ? J.call(arguments, 1) : [];
    return L.unshift("ignore"), e = t.apply(null, e), L.shift(), e;
  }, y.track = function () {
    var t = arguments[0],
        e = 2 <= arguments.length ? J.call(arguments, 1) : [];
    return L.unshift("track"), e = t.apply(null, e), L.shift(), e;
  }, A = function A(t) {
    if (null == t && (t = "GET"), "track" === L[0]) return "force";

    if (!L.length && T.ajax) {
      if ("socket" === t && T.ajax.trackWebSockets) return !0;
      if (t = t.toUpperCase(), 0 <= V.call(T.ajax.trackMethods, t)) return !0;
    }

    return !1;
  }, Q(et, s), t = et, D = null, M = function M(t) {
    for (var e, n = T.ajax.ignoreURLs, r = 0, s = n.length; r < s; r++) {
      if ("string" == typeof (e = n[r])) {
        if (-1 !== t.indexOf(e)) return !0;
      } else if (e.test(t)) return !0;
    }

    return !1;
  }, (S = function S() {
    return D = null == D ? new t() : D;
  })().on("request", function (t) {
    var o,
        i = t.type,
        a = t.request,
        e = t.url;
    if (!M(e)) return y.running || !1 === T.restartOnRequestAfter && "force" !== A(i) ? void 0 : (o = arguments, "boolean" == typeof (e = T.restartOnRequestAfter || 0) && (e = 0), setTimeout(function () {
      var t,
          e,
          n,
          r,
          s = "socket" === i ? a.readyState < 1 : 0 < (s = a.readyState) && s < 4;

      if (s) {
        for (y.restart(), r = [], t = 0, e = (n = y.sources).length; t < e; t++) {
          if ((C = n[t]) instanceof u) {
            C.watch.apply(C, o);
            break;
          }

          r.push(void 0);
        }

        return r;
      }
    }, e));
  }), nt.prototype.watch = function (t) {
    var e = t.type,
        n = t.request,
        t = t.url;
    if (!M(t)) return n = new ("socket" === e ? r : a)(n, this.complete), this.elements.push(n);
  }, nt.prototype.complete = function (e) {
    return this.elements = this.elements.filter(function (t) {
      return t !== e;
    });
  }, u = nt, a = function a(e, n) {
    var t,
        r,
        s,
        o,
        i = this;
    if (this.progress = 0, null != window.ProgressEvent) for (p(e, "progress", function (t) {
      return t.lengthComputable ? i.progress = 100 * t.loaded / t.total : i.progress = i.progress + (100 - i.progress) / 2;
    }), t = 0, r = (o = ["load", "abort", "timeout", "error"]).length; t < r; t++) {
      p(e, o[t], function () {
        return n(i), i.progress = 100;
      });
    } else s = e.onreadystatechange, e.onreadystatechange = function () {
      var t;
      return 0 === (t = e.readyState) || 4 === t ? (n(i), i.progress = 100) : 3 === e.readyState && (i.progress = 50), "function" == typeof s ? s.apply(null, arguments) : void 0;
    };
  }, r = function r(t, e) {
    for (var n, r = this, s = this.progress = 0, o = (n = ["error", "open"]).length; s < o; s++) {
      p(t, n[s], function () {
        return e(r), r.progress = 100;
      });
    }
  }, rt.prototype.complete = function (e) {
    return this.elements = this.elements.filter(function (t) {
      return t !== e;
    });
  }, k = rt, st.prototype.check = function () {
    var t = this;
    return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
      return t.check();
    }, T.elements.checkInterval);
  }, st.prototype.done = function () {
    return this.completeCallback(this), this.completeCallback = null, this.progress = 100;
  }, i = st, ot.prototype.states = {
    loading: 0,
    interactive: 50,
    complete: 100
  }, B = ot, Q = function Q() {
    var e,
        n,
        r,
        s,
        o,
        i = this;
    this.progress = 0, o = [], s = 0, r = P(), n = setInterval(function () {
      var t = P() - r - 50;
      return r = P(), o.push(t), o.length > T.eventLag.sampleCount && o.shift(), e = h(o), ++s >= T.eventLag.minSamples && e < T.eventLag.lagThreshold ? (i.progress = 100, clearInterval(n)) : i.progress = 3 / (e + 3) * 100;
    }, 50);
  }, it.prototype.tick = function (t, e) {
    return 100 <= (e = null == e ? j(this.source, "progress") : e) && (this.done = !0), e === this.last ? this.sinceLastUpdate += t : (this.sinceLastUpdate && (this.rate = (e - this.last) / this.sinceLastUpdate), this.catchup = (e - this.progress) / T.catchupTime, this.sinceLastUpdate = 0, this.last = e), e > this.progress && (this.progress += this.catchup * t), e = 1 - Math.pow(this.progress / 100, T.easeFactor), this.progress += e * this.rate * t, this.progress = Math.min(this.lastProgress + T.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress;
  }, v = it, b = e = _ = w = E = N = null, y.running = !1, q = function q() {
    if (T.restartOnPushState) return y.restart();
  }, null != window.history.pushState && (I = window.history.pushState, window.history.pushState = function () {
    return q(), I.apply(window.history, arguments);
  }), null != window.history.replaceState && (G = window.history.replaceState, window.history.replaceState = function () {
    return q(), G.apply(window.history, arguments);
  }), l = {
    ajax: u,
    elements: k,
    document: B,
    eventLag: Q
  }, (x = function x() {
    var t, e, n, r, s, o, i, a;

    for (y.sources = N = [], e = 0, r = (o = ["ajax", "elements", "document", "eventLag"]).length; e < r; e++) {
      !1 !== T[t = o[e]] && N.push(new l[t](T[t]));
    }

    for (n = 0, s = (a = null != (i = T.extraSources) ? i : []).length; n < s; n++) {
      C = a[n], N.push(new C(T));
    }

    return y.bar = w = new c(), E = [], _ = new v();
  })(), y.stop = function () {
    return y.trigger("stop"), y.running = !1, w.destroy(), b = !0, null != e && ("function" == typeof f && f(e), e = null), x();
  }, y.restart = function () {
    return y.trigger("restart"), y.stop(), y.start();
  }, y.go = function () {
    var m;
    return y.running = !0, w.render(), m = P(), b = !1, e = O(function (t, e) {
      w.progress;

      for (var n, r, s, o, i, a, u, c, l, p, h = a = 0, f = !0, g = u = 0, d = N.length; u < d; g = ++u) {
        for (C = N[g], i = null != E[g] ? E[g] : E[g] = [], s = c = 0, l = (r = null != (p = C.elements) ? p : [C]).length; c < l; s = ++c) {
          o = r[s], f &= (o = null != i[s] ? i[s] : i[s] = new v(o)).done, o.done || (h++, a += o.tick(t));
        }
      }

      return n = a / h, w.update(_.tick(t, n)), w.done() || f || b ? (w.update(100), y.trigger("done"), setTimeout(function () {
        return w.finish(), y.running = !1, y.trigger("hide");
      }, Math.max(T.ghostTime, Math.max(T.minTime - (P() - m), 0)))) : e();
    });
  }, y.start = function (t) {
    _d(T, t), y.running = !0;

    try {
      w.render();
    } catch (t) {
      n = t;
    }

    return document.querySelector(".pace") ? (y.trigger("start"), y.go()) : setTimeout(y.start, 50);
  },  true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return y;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}.call(this);

/***/ }),

/***/ "./js/lib/woocommerce/iconic-woo-linked-variations.js":
/*!************************************************************!*\
  !*** ./js/lib/woocommerce/iconic-woo-linked-variations.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var iconic_wlv = {
  /**
   * Set up cache with common elements and vars.
   */
  cache: function cache() {
    iconic_wlv.els = [];
    iconic_wlv.els.term_link = $('.iconic-wlv-terms__term-content--link');
  },

  /**
   * Run on doc ready.
   */
  on_ready: function on_ready() {
    iconic_wlv.cache();
    iconic_wlv.setup_term_links();
  },

  /**
   * Setup term links.
   */
  setup_term_links: function setup_term_links() {
    iconic_wlv.els.term_link.on('mouseenter', function () {
      var $link = $(this),
          $term = $link.closest('.iconic-wlv-terms__term'),
          $term_label = $term.data('iconic-wlv-term-label'),
          $selected_term = $link.closest('tr').find('.iconic-wlv-variations__selection');
      $selected_term.text($term_label);
    }).on('mouseleave', function () {
      var $link = $(this),
          $selected_term = $link.closest('tr').find('.iconic-wlv-variations__selection'),
          $original_selected_term = $selected_term.data('iconic-wlv-selected-term-label');
      $selected_term.text($original_selected_term);
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (iconic_wlv);

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var headroom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! headroom.js */ "../node_modules/headroom.js/dist/headroom.js");
/* harmony import */ var headroom_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(headroom_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/utils.js */ "./js/app/utils.js");
/* harmony import */ var _app_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/api.js */ "./js/app/api.js");
/* harmony import */ var _app_router_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/router.js */ "./js/app/router.js");
/* harmony import */ var _app_fixes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/fixes.js */ "./js/app/fixes.js");
/* harmony import */ var _app_animations_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app/animations.js */ "./js/app/animations.js");
/* harmony import */ var _components_navigation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/navigation.js */ "./js/components/navigation.js");
/* harmony import */ var _components_viewportAnimations_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/viewportAnimations.js */ "./js/components/viewportAnimations.js");
/* harmony import */ var _components_woocommerce__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/woocommerce */ "./js/components/woocommerce.js");
/* eslint one-var: [0]*/

/* eslint max-len: [0]*/

/* eslint max-params: [0]*/

/* eslint complexity: [0]*/

/* eslint no-multi-assign: [0]*/

/* eslint require-jsdoc: [0]*/

/* eslint no-inner-declarations: [0]*/

/**
 * Main JavaScript file.
 */

/*
 * Libs
 */
 // import { ScrollbarPlugin } from 'smooth-scrollbar';
// App Utils


 // import Modal from './components/modal.js';



 // App Components



 // import NativeWPLightbox from './components/native-wp-lightbox.js';

/**
 * Move Preloader Bar
 */

if (OAX.config.is_preloader === 'Y') {
  OAX.preloader_bar.go(60);
}
/**
 * Helpers
 */


var initModals = function initModals(container) {};
/* eslint-disable */


var initButtons = function initButtons(container) {
  var $btns = $(container).find('button:not(.single_add_to_cart_button), .button:not(.single_add_to_cart_button), .btn');
  var mouseObj = {
    mouseCoords: null,
    mousetThreshold: 0.12,
    manageMouseLeave: function manageMouseLeave(event) {
      event.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0.2)';
    },
    manageMouseMove: function manageMouseMove(event) {
      var dot, eventDoc, doc, body, target, pageX, pageY;
      event = event || window.event; // IE-ism

      target = event.currentTarget; // (old IE)

      if (event.pageX == null && event.clientX != null) {
        eventDoc = event.target && event.target.ownerDocument || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;
        event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
      } // Use event.pageX / event.pageY here

      /*
       * normalize
       * bodyRect = document.body.getBoundingClientRect(),
       */


      var elemRect = target.getBoundingClientRect(); // let $btn.getBoundingClientRect();

      var mean = Math.round(elemRect.width / 2); // offset   = elemRect.top - bodyRect.top;
      // mouseObj.mouseCoords = {mouse_x: event.pageX - elemRect.left , mouse_y:event.pageY - elemRect.top}

      mouseObj.mouseCoords = {
        mouse_true_x: event.pageX - elemRect.left,
        mouse_x: (event.pageX - elemRect.left - mean) * mouseObj.mousetThreshold,
        mouse_true_y: event.pageY - elemRect.top,
        mouse_y: (event.pageY / 1.5 - elemRect.top / 1.5 - mean) * mouseObj.mousetThreshold
      };
      mouseObj.manageButtonShadow(-1, target);
    },
    manageButtonShadow: function manageButtonShadow(direction, target) {
      if (mouseObj.mouseCoords) {
        mouseObj.mouseCoords.mouse_x = Math.floor(mouseObj.mouseCoords.mouse_x);
        target.style.boxShadow = "".concat(direction * mouseObj.mouseCoords.mouse_x, "px 0px 0.5em rgba(0,0,0,0.1)");
      }
    }
  }; // init listeners

  for (var i = 0; i < $btns.length; i++) {
    $btns[i].addEventListener('mousemove', mouseObj.manageMouseMove, false);
    $btns[i].addEventListener('mouseleave', mouseObj.manageMouseLeave, false);
  }
};
/* eslint-enable */

/**
 * Init Classes
 */

/*
 * Extend SmoothScrollbar
 */

/*
 * class ScrollbarModalPlugin extends ScrollbarPlugin {
 * transformDelta( delta ) {
 * if ( this.options.open ){
 * return {
 * x: 0,
 * y: 0
 * };
 * }
 *
 * return delta;
 * }
 * }
 * ScrollbarModalPlugin.pluginName = 'modal';
 * ScrollbarModalPlugin.defaultOptions = {
 * open: false
 * };
 */


var navigation = new _components_navigation_js__WEBPACK_IMPORTED_MODULE_6__["default"](),
    api = new _app_api_js__WEBPACK_IMPORTED_MODULE_2__["default"](),
    vA = new _components_viewportAnimations_js__WEBPACK_IMPORTED_MODULE_7__["default"](),
    WC = new _components_woocommerce__WEBPACK_IMPORTED_MODULE_8__["default"](); // eslint-disable

var APP = {
  options: {
    selector: {
      wrapper: '#site',
      siteBody: '#site__body',
      siteInner: '.site__inner'
    },
    classes: {
      siteIsLoading: 'site--is-loading',
      siteIsReady: 'site--is-ready',
      pageIsTransition: 'page--is-transition',
      pageIsLoading: 'page--is-loading',
      pageIsReady: 'page--is-ready'
    }
  },
  init: function init() {
    /**
     * Get Container
     */
    var container = jQuery(this.options.selector.siteBody).find("> ".concat(this.options.selector.siteInner))[0];
    /**
     * Apply Fixes
     */

    _app_fixes_js__WEBPACK_IMPORTED_MODULE_4__["default"].init();
    /**
     * Init Smooth Scrollbar
     */

    if (!_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile()) {} // this.initSmoothScroll();

    /**
     * Add Global Event Listener
     */


    this.addEventListener();
    /**
     * Move Preloader Bar
     */

    if (OAX.config.is_preloader === 'Y') {
      OAX.preloader_bar.go(75);
    }
    /**
     * Init Router
     */


    this.initRouter();
    /**
     * Init Navigation
     */

    navigation.setupNavigation();
    /**
     * Init Headroom
     */

    this.initHeadroom();
    /**
     * Responsive Iframes
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].responsiveIframes(container);
    /** 
     * Inject YouTube
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].injectYT(container);
    /**
     * Init Sliders
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].initSliders(container);
    /**
     * Inject SVG's
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].injectSVG(container);
    /**
     * Init Lightbox
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].initLightbox(container);
    /**
     * Init Instafeed
     */
    // this.initInstafeed( $( '#site__footer' )[0] );

    /**
     * Init Videos
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].initVideos(container);
    /**
     * Init Modals
     */
    // initModals( container );

    /**
     * Init WooCommerce
     */

    APP.initWoocommerce();
    /**
     * Init Buttons
     */

    if (!_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile()) {
      initButtons(container);
    }
    /**
     * Init First Page Visit
     */


    $(window).on('load', this.firstPageVisit(container));
  },

  /**
   * Add Global Event Listener
   */
  addEventListener: function addEventListener() {
    /*
     * Img Loaded
     */
    document.addEventListener('lazybeforeunveil', this.viewportLazyImage); // document.addEventListener( 'lazyloaded', this.viewportLazyImage );

    /**
     * Floating Inputs Labels
     */

    $(document).on('input.oax::floating', 'p.form-row .input-text', function (event) {
      var $target = $(event.target);

      if ($target.val().length && $.trim($target.val()) !== '') {
        $target.closest('p.form-row').addClass('has-value');
      } else {
        $target.closest('p.form-row').removeClass('has-value');
      }
    });
    /**
     * Contact Form 7
     */

    $(document).on('wpcf7submit.oax::cf7', function (event) {
      gsap.to('form.wpcf7-form', {
        duration: 0.3,
        opacity: 1
      });
    });
    $(document).on('submit.oax::cf7', 'form.wpcf7-form', function (event) {
      var $form = $(event.target);
      gsap.to($form, {
        duration: 0.3,
        opacity: 0.2
      });
    });
  },
  viewportLazyImage: function viewportLazyImage(event) {
    var $target = $(event.target);
    var $wrapper = $target.parent('figure.overflow-hidden.js--img-reveal');

    if ($wrapper.length) {
      var $reveal = $('<div class="inset bg-green c-image__reveal"></div>');
      $wrapper.append($reveal);
      gsap.to($reveal, {
        duration: 1,
        yPercent: -100,
        ease: 'power2.inOut',
        scrollTrigger: $wrapper[0],
        start: 'top+=44% bottom'
      });
    }
  },
  initSmoothScroll: function initSmoothScroll() {
    var scrollContainer = document.getElementById('site');
    $(scrollContainer).addClass('fixed');

    if (_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile()) {
      $(scrollContainer).height($(window).height());
    } else {
      $(scrollContainer).addClass('h-screen');
    }

    $('html').addClass('is-fakescroll');
    Scrollbar.use(ScrollbarModalPlugin);
    window.OAX.Scrollbar = Scrollbar.init(scrollContainer, {
      damping: 0.1,
      delegateTo: document,
      alwaysShowTracks: false
    });
    window.OAX.Scrollbar.track.xAxis.element.remove();
    ScrollTrigger.scrollerProxy('#site', {
      scrollTop: function scrollTop(value) {
        if (arguments.length) {
          window.OAX.Scrollbar.scrollTop = value;
        }

        return window.OAX.Scrollbar.scrollTop;
      }
    });
    window.OAX.Scrollbar.addListener(ScrollTrigger.update);
    ScrollTrigger.defaults({
      scroller: scrollContainer
    });
  },
  initInstafeed: function initInstafeed(container) {
    if ($(container).find('[data-instafeed]').length) {
      var $feedContainer = $(container).find('[data-instafeed]');
      var username = /[^/]*$/.exec($feedContainer.data('instafeed'))[0];
      $.instagramFeed({
        username: username,
        container: $feedContainer[0],
        display_profile: false,
        display_biography: false,
        display_gallery: true,
        display_captions: false,
        max_tries: 30,
        callback: null,
        styling: true,
        items: 6,
        items_per_row: 6,
        margin: 0,
        lazy_load: true,
        on_error: console.error,
        host: "https://images".concat(Math.random() * 3333, "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/")
      });
    }
  },

  /**
   * Init Router
   */
  initRouter: function initRouter() {
    this.ROUTER = new _app_router_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
      debug: OAX.debug,
      onNewContainerLoaded: this.onNewContainerLoaded,
      onLinkClicked: this.onLinkClicked,
      onInitStateChange: this.onInitStateChange,
      onTransitionCompleted: this.onTransitionCompleted,
      onBrowserNav: this.onBrowserNav,
      preventLinks: function preventLinks(el, event, href) {
        var selectorList = ['.remove_from_wishlist', '.remove[data-product_id]', '.restore-item', WC.options.cart.trigger];
        var selectorParentList = [WC.options.selectors.noticesWrapper];

        if ($(el).closest(WC.options.selectors.noticesWrapper).length !== 0) {
          return true;
        }

        if ($(el).closest('.js--pagination').length !== 0) {
          return true;
        }

        if ($(el).closest('.woocommerce-product-gallery__image').length !== 0) {
          return true;
        }

        if ($(el).is(function () {
          // eslint-disable
          var _return = false;
          selectorList.forEach(function (sel) {
            if ($(el).is(sel)) {
              _return = true;
            }
          });
          return _return;
        })) {
          return true;
        }

        return false;
      },
      classes: {
        pageIsTransition: this.options.classes.pageIsTransition,
        pageIsReady: this.options.classes.pageIsReady,
        pageIsLoading: this.options.classes.pageIsLoading
      }
    });
    this.ROUTER.init();
  },

  /**
   * First Page Visit
   */
  firstPageVisit: function firstPageVisit(container) {
    var self = this;
    var namespace = $(container).data('barbaNamespace');
    var firstPageEnter = false;

    if (_app_animations_js__WEBPACK_IMPORTED_MODULE_5__["default"].hasAnimation(namespace, 'enter', 'tl')) {
      firstPageEnter = _app_animations_js__WEBPACK_IMPORTED_MODULE_5__["default"][namespace].enter({
        newContainer: container
      });
    }

    if (OAX.config.is_preloader === 'Y') {
      var dfrLogo = $.Deferred(); // eslint-disable-line

      var preloaderTimeout = setTimeout(function () {
        dfrLogo.resolve();
      }, 4000);
      $(OAX.preloader.options.logo).on(_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].onAnimationIteration(), function () {
        OAX.preloader_bar.go(85);
        $(OAX.preloader.options.logo).css('animation', 'none');
        clearTimeout(preloaderTimeout);
        dfrLogo.resolve();
      });
      /**
       * Remove Preloader
       */

      dfrLogo.done(function () {
        /**
         * Move Preloader Bar to 100% and remove
         */
        OAX.preloader_bar.go(100);
        self.removePreloader().then(function () {
          /**
           * Remove Preloader bar
           */
          $('html').removeClass(self.options.classes.pageIsLoading);
          self.onTransitionCompleted(container);

          if (_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(firstPageEnter) && firstPageEnter !== false) {
            firstPageEnter.play();
          }

          $(document).trigger('OAX::preloader:removed');
          $('.c-preloader__bar').remove();
        });
      });
    } else if (OAX.config.is_preloader === 'TRANSITION') {
      var preloaderTransitionDuration = 0.75;
      gsap.to($('.c-preloader .c-page-transition'), {
        duration: preloaderTransitionDuration,
        yPercent: -100,
        ease: 'circ.inOut',
        onComplete: function onComplete() {
          $(OAX.preloader.options.el).remove();
          self.onTransitionCompleted(container);

          if (!_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].cookie.hasItem('oax_preloader')) {
            _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].cookie.setItem('oax_preloader', 'TRANSITION', 600, OAX.config.url_base, '');
          }
        }
      });
      $('html').removeClass(self.options.classes.siteIsLoading);
      $('html').addClass(self.options.classes.siteIsReady);
      /**
       * Viewport Animations
       */

      vA.init();
      setTimeout(function () {
        $('html').removeClass(self.options.classes.pageIsLoading);
        $('html').addClass(self.options.classes.pageIsReady);

        if (_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(firstPageEnter) && firstPageEnter !== false) {
          firstPageEnter.play();
        }
      }, preloaderTransitionDuration * 1000 / 2); //
    } else {
      $('html').removeClass(self.options.classes.pageIsLoading);
      $('html').removeClass(self.options.classes.siteIsLoading);
      $('html').addClass(self.options.classes.pageIsReady);
      $('html').addClass(self.options.classes.siteIsReady);
      /**
       * Viewport Animations
       */

      setTimeout(function () {
        vA.init();
      }, 500);
      this.onTransitionCompleted(container);
    }
  },

  /**
   * Remove Preloader
   */
  removePreloader: function removePreloader() {
    var self = this;
    var preloaderDuration = 1.5;
    var tl = gsap.timeline({
      onComplete: function onComplete() {
        $(OAX.preloader.options.el).remove();
      }
    });
    jQuery('html').removeClass(self.options.classes.siteIsLoading);
    jQuery('html').addClass(self.options.classes.siteIsReady);
    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].scrollTo(0, 0);
    tl.to($(OAX.preloader.options.bg), {
      duration: preloaderDuration,
      yPercent: -100,
      ease: 'expo.inOut'
    }, 0);
    tl.to($(OAX.preloader.options.logo), {
      duration: 0.75,
      scale: 0,
      autoAlpha: 0,
      ease: 'expo.inOut'
    }, 0.3);
    setTimeout(function () {
      vA.init();
      $('html').addClass(self.options.classes.pageIsReady);
    }, preloaderDuration * 1000 / 2);
    return _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].timelinePromise(tl, 0.8);
  },

  /**
   * Init Headroom
   */
  initHeadroom: function initHeadroom() {
    var $siteHeader = $('#site__header');
    var $languageNav = $('.wpm-language-switcher');
    var siteHeader = $siteHeader.get(0);
    var headroom = new headroom_js__WEBPACK_IMPORTED_MODULE_0___default.a(siteHeader, {
      offset: 200,
      onPin: function onPin() {
        if ($languageNav.length) {
          $languageNav.addClass(this.classes.pinned).removeClass(this.classes.unpinned);
        }
      },
      onUnpin: function onUnpin() {
        if ($languageNav.length) {
          $languageNav.addClass(this.classes.unpinned).removeClass(this.classes.pinned);
        }
      },
      onTop: function onTop() {
        if ($languageNav.length) {
          $languageNav.addClass(this.classes.top).removeClass(this.classes.notTop);
        }
      },
      onNotTop: function onNotTop() {
        if ($languageNav.length) {
          $languageNav.addClass(this.classes.notTop).removeClass(this.classes.top);
        }
      },
      onBottom: function onBottom() {
        if ($languageNav.length) {
          $languageNav.addClass(this.classes.bottom).removeClass(this.classes.notBottom);
        }
      },
      onNotBottom: function onNotBottom() {
        if ($languageNav.length) {
          $languageNav.addClass(this.classes.notBottom).removeClass(this.classes.bottom);
        }
      }
    });
    headroom.init();
  },
  initForms: function initForms(container) {
    var $forms = $(container).find('form.wpcf7-form');

    if ($forms.length > 0 && _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isset(window.wpcf7)) {
      $forms.each(function (i, el) {
        wpcf7.init(el);
      });
    }
  },
  initWoocommerce: function initWoocommerce(container) {
    WC.init(container);
  },

  /**
   * On Link Clicked
   */
  onLinkClicked: function onLinkClicked(HTMLElement) {
    $(HTMLElement).addClass('redirecting'); // Utils.progressBar( 'start' );
  },

  /**
   * On Browser Buttons
   */
  onBrowserNav: function onBrowserNav(url) {// console.log( url );
  },

  /**
   * On Init State Change
   */
  onInitStateChange: function onInitStateChange(url) {// console.log( url );
  },

  /**
   * On Transition Completed
   */
  onTransitionCompleted: function onTransitionCompleted(container) {
    var $container = $(container);
    var namespace = $container.data('barbaNamespace');

    if (!$container.find('.c-section--header').hasClass('is-in-view')) {
      $container.find('.c-section--header').addClass('is-in-view');
    }
  },

  /**
   * On New Container Loaded
   */
  onNewContainerLoaded: function onNewContainerLoaded(container) {
    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].progressBar('stop');
    /**
     * Fixes
     */

    _app_fixes_js__WEBPACK_IMPORTED_MODULE_4__["default"].reInit(container);
    /**
     * Navigation
     */

    navigation.setActiveState();
    /**
     * Forms
     */

    APP.initForms(container);
    /**
     * Responsive Iframes
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].responsiveIframes(container);
    /** 
     * Inject YouTube
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].injectYT(container);
    /**
     * Init Sliders
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].initSliders(container);
    /**
     * Init Lightbox
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].initLightbox(container);
    /**
     * Inject SVG's
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].injectSVG(container);
    /**
     * Init Videos
     */

    _app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].initVideos(container);
    /**
     * Woocommerce
     */

    APP.initWoocommerce(container);
    /**
     * Init Buttons
     */

    if (!_app_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile()) {
      initButtons(container);
    }
  }
};
$(document).ready(function () {
  APP.init();
});
window.OAX.APP = APP;

/***/ }),

/***/ "./js/skip-link-focus-fix.js":
/*!***********************************!*\
  !*** ./js/skip-link-focus-fix.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return skipLinkFocus; });
/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
function skipLinkFocus() {
  var isIe = /(trident|msie)/i.test(navigator.userAgent);

  if (isIe && document.getElementById && window.addEventListener) {
    window.addEventListener('hashchange', function () {
      var id = location.hash.substring(1),
          element = document.getElementById(id);

      if (!/^[A-z0-9_-]+$/.test(id)) {
        return;
      }

      if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
          element.tabIndex = -1;
        }

        element.focus();
      }
    }, false);
  }
}

/***/ }),

/***/ "./js/views/home.js":
/*!**************************!*\
  !*** ./js/views/home.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_animations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/animations.js */ "./js/app/animations.js");
/* harmony import */ var _app_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/utils.js */ "./js/app/utils.js");
/* eslint-disable */

/* eslint one-var: [0]*/

/* eslint max-len: [0]*/

/* eslint max-lines: [0]*/

/* eslint max-params: [0]*/

/* eslint complexity: [0]*/

/* eslint no-multi-assign: [0]*/

/* eslint prefer-const: [0]*/

/* eslint consistent-return: [0] */


var ViewHome = {
  namespace: 'template-start',
  beforeAppear: function beforeAppear(data) {// console.log( this.namespace, 'beforeAppear', data );
  },
  afterAppear: function afterAppear(data) {// console.log( this.namespace, 'afterAppear', data );
  },
  beforeLeave: function beforeLeave(data) {// console.log( this.namespace, 'beforeLeave', data );
  },
  afterLeave: function afterLeave(data) {// console.log( this.namespace, 'afterLeave', data );
  },
  beforeEnter: function beforeEnter(data) {
    this.addEventListener(data.next.container);
  },
  afterEnter: function afterEnter(data) {// console.log( this.namespace, 'afterEnter', data );	
  },
  addEventListener: function addEventListener(container) {
    var self = this;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (ViewHome);

/***/ }),

/***/ "./js/views/index.js":
/*!***************************!*\
  !*** ./js/views/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.js */ "./js/views/home.js");
/* harmony import */ var _app_animations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/animations.js */ "./js/app/animations.js");
/* harmony import */ var _components_viewportAnimations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/viewportAnimations.js */ "./js/components/viewportAnimations.js");
/* eslint one-var: [0] */



var vA = new _components_viewportAnimations_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
var Views = {
  getAll: function getAll() {
    return [_home_js__WEBPACK_IMPORTED_MODULE_0__["default"]];
  },
  beforeAppearAll: function beforeAppearAll(data) {// console.log( 'beforeAppearAll', data ); 
  },
  afterAppearAll: function afterAppearAll(data) {// console.log( 'afterAppearAll', data ); 
  },
  beforeLeaveAll: function beforeLeaveAll(data) {// console.log( 'beforeLeaveAll', data ); 
  },
  onLeaveAll: function onLeaveAll(data) {},
  afterLeaveAll: function afterLeaveAll(data) {// console.log( 'afterLeaveAll', data ); 
  },
  beforeEnterAll: function beforeEnterAll(data) {
    var namespace = data.next.namespace;

    if (data.trigger === 'barba') {
      if (_app_animations_js__WEBPACK_IMPORTED_MODULE_1__["default"].hasAnimation(namespace, 'initViewportFx')) {
        setTimeout(function () {
          _app_animations_js__WEBPACK_IMPORTED_MODULE_1__["default"][namespace].initViewportFx(data.next.container);
        }, 300);
      }
    } // console.log( 'beforeEnterAll', data ); 

  },
  onEnterAll: function onEnterAll(data) {
    var namespace = data.next.namespace;

    if (_app_animations_js__WEBPACK_IMPORTED_MODULE_1__["default"].hasAnimation(namespace, 'initViewportFx')) {
      setTimeout(function () {
        _app_animations_js__WEBPACK_IMPORTED_MODULE_1__["default"][namespace].initViewportFx(data.next.container);
      }, 300);
    }
    /**
     * Viewport Animations
     */


    setTimeout(function () {
      vA.reInit(data.next.container);
    }, 450);

    if (_app_animations_js__WEBPACK_IMPORTED_MODULE_1__["default"].hasAnimation(namespace, 'enter')) {
      setTimeout(function () {
        _app_animations_js__WEBPACK_IMPORTED_MODULE_1__["default"][namespace].enter({
          newContainer: data.next.container
        });
      }, 500);
    }

    return true;
  },
  afterEnterAll: function afterEnterAll(data) {// console.log( 'afterEnterAll', data ); 
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Views);

/***/ }),

/***/ 1:
/*!**********************************************************************!*\
  !*** multi ./build/util/hmr-client.js ./js/main.js ./css/style.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Applications/MAMP/htdocs/wp_ohpardon/wordpress/wp-content/themes/oax-ohpardon/assets/build/util/hmr-client.js */"./build/util/hmr-client.js");
__webpack_require__(/*! ./js/main.js */"./js/main.js");
module.exports = __webpack_require__(/*! ./css/style.scss */"./css/style.scss");


/***/ })

/******/ });
//# sourceMappingURL=main.js.map