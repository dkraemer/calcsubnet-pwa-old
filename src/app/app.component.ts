import { Component } from '@angular/core';
import { SubnetMask } from "./subnet-mask";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  subnetMasks: SubnetMask[];
  selectedSubnetMask: SubnetMask;

  constructor() {}

  ngOnInit() {
    this.subnetMasks = SubnetMask.getAll();
    this.selectedSubnetMask = this.subnetMasks[0];
  }
}
