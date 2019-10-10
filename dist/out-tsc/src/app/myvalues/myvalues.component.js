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
        if (!localStorage.getItem("MyValues")) {
            this.http.get("https://localhost:44307/api/values").subscribe(x => {
                localStorage.setItem("MyValues", JSON.stringify(x));
                this.valuesList = x;
            }, error => {
                console.log(error);
            });
        }
        else {
            this.valuesList = JSON.parse(localStorage.getItem("MyValues"));
        }
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