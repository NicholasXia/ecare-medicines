angular.module('medicine.directive', [])
    .directive('image', function($q) {
        'use strict'

        var URL = window.URL || window.webkitURL;

        var getResizeArea = function () {
            var resizeAreaId = 'fileupload-resize-area';

            var resizeArea = document.getElementById(resizeAreaId);

            if (!resizeArea) {
                resizeArea = document.createElement('canvas');
                resizeArea.id = resizeAreaId;
                resizeArea.style.visibility = 'hidden';
                document.body.appendChild(resizeArea);
            }

            return resizeArea;
        }

        var resizeImage = function (origImage, options) {
            var maxHeight = options.resizeMaxHeight || 300;
            var maxWidth = options.resizeMaxWidth || 250;
            var quality = options.resizeQuality || 0.7;
            var type = options.resizeType || 'image/jpg';

            var canvas = getResizeArea();

            var height = origImage.height;
            var width = origImage.width;

            // calculate the width and height, constraining the proportions *** Edited by Ege
            if(height / width < maxHeight / maxWidth) {
                width = width * (maxHeight / height);
                height = maxHeight;
            } else {
                height = height * (maxWidth / width);
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;

            //draw image on canvas
            var ctx = canvas.getContext("2d");
            ctx.drawImage(origImage, 0, 0, width, height);

            // get the data from canvas as 70% jpg (or specified type).
            return canvas.toDataURL(type, quality);
        };

        var createImage = function(url, callback) {
            var image = new Image();
            image.onload = function() {
                callback(image);
            };
            image.src = url;
        };

        var fileToDataURL = function (file) {
            var deferred = $q.defer();
            var reader = new FileReader();
            reader.onload = function (e) {
                deferred.resolve({
                    data: e.target.result,
                    file: file
                });
            };
            reader.readAsDataURL(file);
            return deferred.promise;
        };


        return {
            restrict: 'A',
            scope: {
                image: '=',
                resizeMaxHeight: '@?',
                resizeMaxWidth: '@?',
                resizeQuality: '@?',
                resizeType: '@?',
            },
            link: function postLink(scope, element, attrs, ctrl) {

                var doResizing = function(imageResult, callback) {
                    createImage(imageResult.url, function(image) {
                        var dataURL = resizeImage(image, scope);
                        imageResult.resized = {
                            dataURL: dataURL,
                            type: dataURL.match(/:(.+\/.+);/)[1],
                        };
                        callback(imageResult);
                    });
                };

                var applyScope = function(imageResults) {
                    if(attrs.multiple) {
                        for(var i in imageResults) {
                            scope.image.push(imageResults[i]);
                        }
                    }
                    else {
                        scope.$apply(function() {
                            scope.image = imageResults[0];
                        });
                    }
                };


                element.bind('change', function (evt) {
                    //when multiple always return an array of images
                    if(attrs.multiple)
                        scope.image = [];

                    var files = evt.target.files;

                    var imageResults = [];

                    var addToImageResults = function(imageResult) {
                        imageResults.push(imageResult);
                        if(imageResults.length === files.length) {
                            applyScope(imageResults);
                            imageResults = [];
                        }
                    }


                    for(var i = 0; i < files.length; i++) {
                        //create a result object for each file in files

                        fileToDataURL(files[i]).then(function (object) {
                            var file = object.file;
                            var dataURL = object.data;
                            var imageResult = {
                                file: file,
                                url: URL.createObjectURL(file),
                                dataURL: dataURL
                            };

                            if(scope.resizeMaxHeight || scope.resizeMaxWidth) { //resize image
                                doResizing(imageResult, function(imageResult) {
                                    addToImageResults(imageResult);
                                });
                            }
                            else { //no resizing
                                addToImageResults(imageResult);
                            }
                        });
                    }
                });
            }
        };
    })
    .directive('input', function($timeout) {
        return {
            restrict: 'E',
            scope: {
                'returnClose': '=',
                'onReturn': '&',
                'onFocus': '&',
                'onBlur': '&'
            },
            link: function(scope, element, attr) {
                element.bind('focus', function(e) {
                    if (scope.onFocus) {
                        $timeout(function() {
                            scope.onFocus();
                        });
                    }
                });
                element.bind('blur', function(e) {
                    if (scope.onBlur) {
                        $timeout(function() {
                            scope.onBlur();
                        });
                    }
                });
                element.bind('keydown', function(e) {
                    if (e.which == 13) {
                        if (scope.returnClose) element[0].blur();
                        if (scope.onReturn) {
                            $timeout(function() {
                                scope.onReturn();
                            });
                        }
                    }
                });
            }
        }
    })

