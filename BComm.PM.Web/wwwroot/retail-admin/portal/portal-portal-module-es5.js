function _classCallCheck(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,n){for(var a=0;a<n.length;a++){var e=n[a];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}function _createClass(t,n,a){return n&&_defineProperties(t.prototype,n),a&&_defineProperties(t,a),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"1GSM":function(t,n,a){"use strict";a.r(n),n.default=".card-counter {\n  box-shadow: 2px 2px 10px #DADADA;\n  margin: 5px;\n  padding: 20px 10px;\n  background-color: #fff;\n  height: 180px;\n  border-radius: 5px;\n  transition: 0.2s linear all;\n}\n.card-counter h3, .card-counter h5 {\n  text-align: center;\n}\n.card-counter:hover {\n  cursor: pointer;\n  box-shadow: 4px 4px 20px #8b8b8b;\n  transition: 0.2s linear all;\n}\n.card-counter.primary {\n  background-color: #2a91ff;\n  color: #FFF;\n}\n.card-counter.danger {\n  background-color: #f85c59;\n  color: #FFF;\n}\n.card-counter.success {\n  background-color: #74b978;\n  color: #FFF;\n}\n.card-counter.info {\n  background-color: #9655ff;\n  color: #FFF;\n}\n.card-counter i {\n  font-size: 5em;\n  opacity: 0.2;\n}\n.card-counter .count-numbers {\n  font-size: 5em;\n}\n.card-counter .count-name {\n  font-style: italic;\n  text-transform: capitalize;\n  font-size: 18px;\n}\n.notice {\n  padding: 15px;\n  background-color: #fafafa;\n  border-left: 6px solid #7f7f84;\n  margin-bottom: 10px;\n  box-shadow: 0 5px 8px -6px rgba(0, 0, 0, 0.2);\n}\n.notice-sm {\n  padding: 10px;\n  font-size: 80%;\n}\n.notice-lg {\n  padding: 35px;\n  font-size: large;\n}\n.notice-success {\n  border-color: #80D651;\n}\n.notice-success > strong {\n  color: #80D651;\n}\n.notice-info {\n  border-color: #45ABCD;\n}\n.notice-info > strong {\n  color: #45ABCD;\n}\n.notice-warning {\n  border-color: #FEAF20;\n}\n.notice-warning > strong {\n  color: #FEAF20;\n}\n.notice-danger {\n  border-color: #d73814;\n}\n.notice-danger > strong {\n  color: #d73814;\n}"},JJIx:function(t,n,a){"use strict";a.r(n);var e=a("mrSG"),r=a("8Y7J"),o=a("SVse"),s=a("iInd"),c=a("fIz6"),i=a("IheW"),l=function(){function t(n){_classCallCheck(this,t),this.httpClient=n}return _createClass(t,[{key:"getOrderSummary",value:function(){return this.httpClient.get(c.a+"reports/ordersummary",{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("auth_token")}})}},{key:"getMostOrderedProducts",value:function(t,n){return this.httpClient.get(c.a+"reports/mostorderedproducts",{params:{month:t.toString(),year:n.toString()},headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("auth_token")}})}},{key:"getMostPopularTags",value:function(t,n){return this.httpClient.get(c.a+"reports/mostpopulartags",{params:{month:t.toString(),year:n.toString()},headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("auth_token")}})}}]),t}();l.ctorParameters=function(){return[{type:i.a}]},l=e.a([Object(r.B)({providedIn:"root"})],l);var d=function(){function t(n){_classCallCheck(this,t),this.httpClient=n}return _createClass(t,[{key:"getStockHealth",value:function(){return this.httpClient.get(c.a+"products/stockhealth",{headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("auth_token")}})}}]),t}();d.ctorParameters=function(){return[{type:i.a}]},d=e.a([Object(r.B)({providedIn:"root"})],d);var h=function(){function t(n,a){_classCallCheck(this,t),this.reportservice=n,this.stockHealthService=a,this.stockHealthData=null,this.barChartOptions={responsive:!0,scales:{xAxes:[{}],yAxes:[{ticks:{callback:function(t){return t.toString().substring(0,5)+"..."}}}]}},this.barChartLabels=[],this.barChartType="horizontalBar",this.barChartLegend=!1,this.barChartData=[{data:[],label:"Products"}],this.pieChartOptions={responsive:!0,legend:{position:"left"}},this.pieChartLabels=[],this.pieChartData=[],this.pieChartType="pie",this.pieChartLegend=!0,this.pieChartColors=[{backgroundColor:["rgba(255,0,0,0.3)","rgba(0,255,0,0.3)","rgba(0,0,255,0.3)"]}],this.totalOrder=0,this.totalCompletedOrder=0,this.totalInprogressOrder=0,this.totalCanceledOrder=0,this.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"],this.currentMonthIndex=0}return _createClass(t,[{key:"ngOnInit",value:function(){var t=this,n=new Date;this.currentMonthIndex=n.getMonth(),this.reportservice.getOrderSummary().subscribe((function(n){t.totalOrder=n.data.totalOrder,t.totalCompletedOrder=n.data.totalCompletedOrder,t.totalInprogressOrder=n.data.totalIncompleteOrder,t.totalCanceledOrder=n.data.totalCanceledOrder})),this.reportservice.getMostOrderedProducts(this.currentMonthIndex+1,n.getFullYear()).subscribe((function(n){t.barChartLabels=[],t.barChartData[0].data=[],n.data.orderCounts.forEach((function(n){t.barChartLabels.push(n.productName),t.barChartData[0].data.push(n.orderCount)}))})),this.reportservice.getMostPopularTags(this.currentMonthIndex+1,n.getFullYear()).subscribe((function(n){n.data.forEach((function(n){t.pieChartLabels.push(n.tagName),t.pieChartData.push(n.percentage)}))})),this.stockHealthService.getStockHealth().subscribe((function(n){t.stockHealthData=n.data}))}},{key:"currentMonth",get:function(){return this.monthNames[this.currentMonthIndex]}},{key:"showSummary",get:function(){return this.totalOrder+this.totalCompletedOrder+this.totalInprogressOrder+this.totalCanceledOrder!==0}},{key:"orderManagementUrl",get:function(){return c.a+"retail-admin/order-management/"}},{key:"productManagementUrl",get:function(){return c.a+"retail-admin/product-management/"}},{key:"contentManagementUrl",get:function(){return c.a+"retail-admin/content-management/"}}]),t}();h.ctorParameters=function(){return[{type:l},{type:d}]};var u=[{path:"",pathMatch:"full",component:h=e.a([Object(r.n)({selector:"app-portal",template:e.b(a("Yg28")).default,styles:[e.b(a("1GSM")).default]})],h)}],p=function t(){_classCallCheck(this,t)};p=e.a([Object(r.J)({imports:[s.c.forChild(u)],exports:[s.c]})],p);var g=a("hrfs");a.d(n,"PortalModule",(function(){return m}));var m=function t(){_classCallCheck(this,t)};m=e.a([Object(r.J)({declarations:[h],imports:[o.b,p,g.a]})],m)},Yg28:function(t,n,a){"use strict";a.r(n),n.default='<div class="container" style="margin-top: 50px; margin-bottom: 100px;">\n    <div class="row" style="margin-bottom: 50px;">\n        <h4 style="padding-left: 15px;">Welcome to Retail Portal!</h4>\n    </div>\n    <div style="margin-bottom: 50px;">\n      <div class="w-100" style="margin-bottom: 10px;">\n          <h6 style="font-weight: 700;">Stock Health</h6>\n      </div>\n      <div class="w-100" *ngIf="!stockHealthData">\n          <p>Something went wrong. Couldn\'t fetch stock health data.</p>\n      </div>\n      <span *ngIf="stockHealthData">\n        <div class="notice notice-success" *ngIf="stockHealthData.outOfStock.length === 0 && stockHealthData.warning.length === 0">\n          <strong><i class="fas fa-check-double fa-fw"></i></strong> &nbsp; All product stock quantity is good\n        </div>\n        <div class="notice notice-danger" *ngIf="stockHealthData.outOfStock.length > 0">\n            <strong><i class="fas fa-exclamation-triangle fa-fw"></i></strong> &nbsp; <b>{{ stockHealthData.outOfStock.length }} Products are running out of stock!</b>\n        </div>\n        <div class="notice notice-warning" *ngIf="stockHealthData.warning.length > 0">\n          <strong><i class="fas fa-exclamation-circle fa-fw"></i></strong> &nbsp; <b>{{ stockHealthData.warning.length }} Product stocks are soon going to be finished</b>\n        </div>\n      </span>\n    </div>\n    <div style="margin-bottom: 50px;">\n        <div class="w-100" style="margin-bottom: 10px;">\n            <h6 style="font-weight: 700;">Analytics</h6>\n        </div>\n        <div class="w-100" *ngIf="!(barChartData[0].data.length > 0 && barChartData[0].data.length > 0)">\n            <p>No analytics data available for this month</p>\n        </div>\n        <div class="row" *ngIf="barChartData[0].data.length > 0 && barChartData[0].data.length > 0">\n            <div class="col-md-6 col-sm-12" *ngIf="barChartData[0].data.length > 0">\n                <div class="card text-center">\n                    <div class="card-body">\n                      <h5 class="card-title">Most Ordered Products</h5>\n                      <h6 style="font-weight: 700; margin-bottom: 40px;">Month: \n                        <span style="color: green;">{{ currentMonth }}</span>\n                      </h6>\n                      <canvas baseChart\n                        [datasets]="barChartData"\n                        [labels]="barChartLabels"\n                        [options]="barChartOptions"\n                        [legend]="barChartLegend"\n                        [chartType]="barChartType">\n                    </canvas>\n                    </div>\n                </div>\n            </div>\n            <div class="col-md-6 col-sm-12" *ngIf="pieChartData.length > 0">\n                <div class="card text-center">\n                    <div class="card-body">\n                      <h5 class="card-title">Most Popular Tags</h5>\n                      <h6 style="font-weight: 700; margin-bottom: 40px;">Month: \n                        <span style="color: green;">{{ currentMonth }}</span>\n                      </h6>\n                      <canvas baseChart\n                        [data]="pieChartData"\n                        [labels]="pieChartLabels"\n                        [chartType]="pieChartType"\n                        [options]="pieChartOptions"\n                        [colors]="pieChartColors"\n                        [legend]="pieChartLegend">\n                      </canvas>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div style="margin-bottom: 50px;">\n        <div class="w-100" style="margin-bottom: 10px;">\n            <h6 style="font-weight: 700;">Order Summary</h6>\n        </div>\n        <div class="w-100" *ngIf="!showSummary">\n            <p>No summary data available</p>\n        </div>\n        <div class="row" style="margin-bottom: 50px;" *ngIf="showSummary">\n            \x3c!-- <div class="col-md-3 mt-auto" style="margin: auto 0;">\n              <div class="card-counter primary">\n                  <h5 class="w-100">Total Orders</h5>\n                  <h3 class="count-numbers w-100">{{ totalOrder }}</h3>\n              </div>\n            </div>\n         --\x3e\n            <div class="col-md-4">\n              <div class="card-counter info">\n                <h5 class="w-100">In Progress Order</h5>\n                  <h3 class="count-numbers w-100">{{ totalInprogressOrder }}</h3>\n              </div>\n            </div>\n        \n            <div class="col-md-4">\n              <div class="card-counter success">\n                <h5 class="w-100">Completed Order</h5>\n                  <h3 class="count-numbers w-100">{{ totalCompletedOrder }}</h3>\n              </div>\n            </div>\n        \n            <div class="col-md-4">\n              <div class="card-counter danger">\n                <h5 class="w-100">Canceled Order</h5>\n                  <h3 class="count-numbers w-100">{{ totalCanceledOrder }}</h3>\n              </div>\n            </div>\n        </div>\n    </div>\n    <div class="row">\n        <div class="col-12" style="margin-bottom: 10px;">\n            <h6 style="font-weight: 700;">Management</h6>\n        </div>\n        <div class="col-md-4 col-sm-12">\n            <div class="card text-center">\n                <div class="card-body">\n                  <h5 class="card-title">Order Management</h5>\n                  <p class="card-text">Handle your orders in a fastest way. Keep your focus only on the orders from your precious customers</p>\n                  <a [href]="orderManagementUrl" class="btn btn-primary">Enter</a>\n                </div>\n            </div>\n        </div>\n        <div class="col-md-4 col-sm-12">\n            <div class="card text-center">\n                <div class="card-body">\n                  <h5 class="card-title">Product Management</h5>\n                  <p class="card-text">Add or update your existing product catalog. Create new catagories with tags and add new product as many as you want</p>\n                  <a [href]="productManagementUrl" class="btn btn-primary">Enter</a>\n                </div>\n            </div>\n        </div>\n        <div class="col-md-4 col-sm-12">\n          <div class="card text-center">\n              <div class="card-body">\n                <h5 class="card-title">Content Management</h5>\n                <p class="card-text">Manage your site without changing your code. Add new pages, widgets homepage content and many more.</p>\n                <a [href]="contentManagementUrl" class="btn btn-primary">Enter</a>\n              </div>\n          </div>\n      </div>\n    </div>\n</div>\n'}}]);