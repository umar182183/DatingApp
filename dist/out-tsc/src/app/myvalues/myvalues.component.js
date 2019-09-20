import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let MyvaluesComponent = class MyvaluesComponent {
    constructor(http) {
        this.http = http;
    }
    ngOnInit() {
        this.getValues();
    }
    getValues() {
        this.http.get("https://localhost:44307/api/values").subscribe(x => {
            this.values = x;
        }, error => {
            console.log(error);
        });
    }
};
MyvaluesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-myvalues',
        templateUrl: './myvalues.component.html',
        styleUrls: ['./myvalues.component.css']
    })
], MyvaluesComponent);
export { MyvaluesComponent };
//# sourceMappingURL=myvalues.component.js.map