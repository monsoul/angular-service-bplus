angular.module("servicesModule").factory("paginationData",["service",function(t){function e(t,e){if(this.records=[],this.pageState=null,this.pageIndex=-1,this.fetching=!1,this.dataField="data",this.dataMapping=function(t){return t},this.httpMethod="post","object"==typeof t&&1===arguments.length){var a=t;this.sourceUrl=a.sourceUrl,this.queryData=a.queryData,this.dataField=a.dataField||this.dataField,this.dataMapping=a.dataMapping||this.dataMapping,this.httpMethod=a.httpMethod||this.httpMethod}else this.sourceUrl=t,this.queryData=e}return e.prototype.getNextPage=function(e){if(this.pageIndex<this.records.length-1)this.pageIndex++;else{var a=this;t.executePromiseAvoidDuplicate(this,"fetching",function(){return t[this.httpMethod](a.sourceUrl,angular.extend({},a.queryData,e,{pageState:a.pageState})).then(function(t){t[this.dataField]&&(a.pageIndex++,a.records.push(this.dataMapping(t.data))),a.pageState=t.pageState})})}},e.prototype.getPrevPage=function(){this.pageIndex--},e.prototype.getPages=function(){return new Array(this.records.length)},e}]);