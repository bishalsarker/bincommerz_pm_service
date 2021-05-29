function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var a=0;a<e.length;a++){var r=e[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function _createClass(t,e,a){return e&&_defineProperties(t.prototype,e),a&&_defineProperties(t,a),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{Gfgi:function(t,e,a){"use strict";a.d(e,"a",(function(){return p}));var r=a("mrSG"),n=a("IheW"),s=a("8Y7J"),o=a("iInd"),i=a("EApP"),u=a("2Vo4"),c=a("lJxs"),l=a("LvDl"),h=a("fIz6"),p=function(){function t(e,a,r){_classCallCheck(this,t),this.httpClient=e,this.toastr=a,this.router=r,this.tags=new u.a([]),this.getAllTags().subscribe(),console.log(this.tags.value)}return _createClass(t,[{key:"resolveTags",value:function(t){var e=this;return t.map((function(t){var a=Object(l.find)(e.tags.value,(function(e){return e.id===t}));return a?a.name:"invalid_tag"}))}},{key:"getAllTags",value:function(){var t=this;return this.httpClient.get(h.a+"tags/get/all",{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("auth_token")}}).pipe(Object(c.a)((function(e){e.isSuccess?t.tags.next(e.data):t.showError()})))}},{key:"getTagById",value:function(t){var e=this;return this.httpClient.get(h.a+"tags/get/"+t,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("auth_token")}}).pipe(Object(c.a)((function(t){return t.isSuccess?t.data:(e.showError(),null)})))}},{key:"addTag",value:function(t){var e=this;return this.httpClient.post(h.a+"tags/addnew",t,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("auth_token")}}).pipe(Object(c.a)((function(a){a.isSuccess?(e.getAllTags().subscribe(),e.router.navigate(["tags"]),e.toastr.success("New tag added: "+t.name)):e.showError()})))}},{key:"updateTag",value:function(t){var e=this;return this.httpClient.put(h.a+"tags/update",t,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("auth_token")}}).pipe(Object(c.a)((function(a){a.isSuccess?(e.getAllTags().subscribe(),e.router.navigate(["tags"]),e.toastr.success("Tag updated: "+t.name)):e.showError()})))}},{key:"deleteTag",value:function(t){var e=this;return this.httpClient.delete(h.a+"tags/delete/"+t,{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("auth_token")}}).pipe(Object(c.a)((function(t){t.isSuccess?(e.getAllTags().subscribe(),e.router.navigate(["tags"]),e.toastr.success("Tag deleted")):e.showError()})))}},{key:"showError",value:function(){this.toastr.error("","Error occured")}}]),t}();p.ctorParameters=function(){return[{type:n.a},{type:i.b},{type:o.b}]},p=r.a([Object(s.C)({providedIn:"root"})],p)},k8Mo:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var r=a("mrSG"),n=a("8Y7J"),s=a("2Vo4"),o=a("LvDl"),i=function(){function t(){_classCallCheck(this,t),this.breadcrumbs=new s.a([]),this.breadcrumbs.next([])}return _createClass(t,[{key:"addBreadcrumb",value:function(t){this.hasItem(t)||this.breadcrumbs.value.push(t)}},{key:"removeLast",value:function(){this.breadcrumbs.value.pop()}},{key:"hasItem",value:function(t){return Object(o.find)(this.breadcrumbs.value,(function(e){return e.route===t.route}))}}]),t}();i=r.a([Object(n.C)({providedIn:"root"})],i)}}]);