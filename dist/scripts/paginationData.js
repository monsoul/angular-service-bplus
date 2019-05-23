angular.module("servicesModule").factory("httpPaginationData",["$http","$q",function(i,a){function t(t,e,a){if(this.records=[],this.pageState=null,this.pageIndex=-1,this.fetching=!1,this.dataField="data",this.dataMapping=function(t){return t},this.method="get","object"==typeof t&&1===arguments.length){var i=t;this.sourceUrl=i.sourceUrl,this.queryData=i.queryData,this.dataField=i.dataField||this.dataField,this.dataMapping=i.dataMapping||this.dataMapping,this.pageSize=i.pageSize,this.dataGotCallback=i.dataGotCallback}else this.sourceUrl=t,this.queryData=e,this.pageSize=e.pageSize,this.dataGotCallback=a.dataGotCallback;console.log("data got callback = ",this.dataGotCallback),console.log("typeof callback = ",typeof this.dataGotCallback)}function n(t,e){return t.pageIndex<t.records.length-1?function(t){return t.pageIndex++,a.resolve(t.records[t.pageIndex])}(t):function(e,t){var a=angular.extend({},e.queryData,{pageState:e.pageState,pageSize:e.pageSize},t);return"get"===e.method&&(a={params:a}),i[e.method](e.sourceUrl,a).then(function(t){return(t=t.data)[e.dataField]&&(e.pageIndex++,e.records.push(e.dataMapping(t[e.dataField]))),t.pageState!==e.pageState?e.pageState=t.pageState:e.pageState=null,t[e.dataField]})}(t,e)}function r(t,e){"function"==typeof t.dataGotCallback&&t.dataGotCallback(e)}return t.prototype.getNextPage=function(t){var e=this;return n(this,t).then(function(t){return r(e,t),t})},t.prototype.getPrevPage=function(){this.pageIndex--,r(this,this.records[this.pageIndex])},t.prototype.getPages=function(){return new Array(this.records.length)},t.prototype.gotoPage=function(t){this.pageIndex=t,r(this,this.records[this.pageIndex])},t}]).factory("paginationData",["service",function(a){function t(t,e){if(this.records=[],this.pageState=null,this.pageIndex=-1,this.fetching=!1,this.dataField="data",this.dataMapping=function(t){return t},"object"==typeof t&&1===arguments.length){var a=t;this.sourceUrl=a.sourceUrl,this.queryData=a.queryData,this.dataField=a.dataField||this.dataField,this.dataMapping=a.dataMapping||this.dataMapping,this.pageSize=a.pageSize}else this.sourceUrl=t,this.queryData=e}return t.prototype.getNextPage=function(t){if(this.pageIndex<this.records.length-1)this.pageIndex++;else{var e=this;a.executePromiseAvoidDuplicate(this,"fetching",function(){return a.post(e.sourceUrl,angular.extend({},e.queryData,{pageState:e.pageState,pageSize:e.pageSize},t)).then(function(t){return t[e.dataField]&&(e.pageIndex++,e.records.push(e.dataMapping(t[e.dataField]))),e.pageState=t.pageState,t})})}},t.prototype.getPrevPage=function(){this.pageIndex--},t.prototype.getPages=function(){return new Array(this.records.length)},t}]).factory("paginationDataWithTotal",["service",function(a){function t(t,e){if(this.records=[],this.pageIndex=-1,this.fetching=!1,this.dataField="data",this.totalField="total",this.dataMapping=function(t){return t},"object"==typeof t&&1===arguments.length){var a=t;this.sourceUrl=a.sourceUrl,this.queryData=a.queryData,this.dataField=a.dataField||this.dataField,this.dataMapping=a.dataMapping||this.dataMapping,this.pageSize=a.pageSize}else this.sourceUrl=t,this.queryData=e}return t.prototype.getNextPage=function(t){if(this.pageIndex<this.records.length-1)this.pageIndex++;else{var e=this;a.executePromiseAvoidDuplicate(this,"fetching",function(){return a.post(e.sourceUrl,angular.extend({},e.queryData,{offset:e.pageSize*(e.pageIndex+1),pageSize:e.pageSize},t)).then(function(t){t[e.dataField]&&(e.pageIndex++,e.records.push(e.dataMapping(t[e.dataField]))),t[e.totalField]&&(e.total=t[e.totalField])})})}},t.prototype.getPrevPage=function(){this.pageIndex--},t.prototype.getPages=function(){return new Array(this.records.length)},t.prototype.getTotalRecords=function(){for(var t=0,e=0;e<this.records.length;e++)t+=this.records[e].length;return t},t}]);