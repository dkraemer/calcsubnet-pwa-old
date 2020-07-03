import { Component, OnInit } from '@angular/core';
import { SubnetMask, DotDecimal, IpAddress } from 'calcsubnet';
import { SubnetInfo } from "./subnet-info";
import './extensions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  subnetMasks: SubnetMask[];
  selectedSubnetMask: SubnetMask;
  subnetInfo: SubnetInfo;

  constructor() {}

  public static parse(dotDecimalString: string): number {
    const regEx = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const regExMatches = regEx.exec(dotDecimalString);

    if (!regExMatches || regExMatches.length !== 5) {
      console.error('RegEx mismatch!');
      return -1;
    }

    // Conversion: '10' (string) => 10 (number) => 'a' (hex string)
    let FirstOctet = Number.parseInt(regExMatches[1], 10).toString(16);
    let SecondOctet = Number.parseInt(regExMatches[2], 10).toString(16);
    let ThirdOctet = Number.parseInt(regExMatches[3], 10).toString(16);
    let FourthOctet = Number.parseInt(regExMatches[4], 10).toString(16);

    // Add leading zero if required
    FirstOctet = FirstOctet.length === 1 ? '0' + FirstOctet : FirstOctet;
    SecondOctet = SecondOctet.length === 1 ? '0' + SecondOctet : SecondOctet;
    ThirdOctet = ThirdOctet.length === 1 ? '0' + ThirdOctet : ThirdOctet;
    FourthOctet = FourthOctet.length === 1 ? '0' + FourthOctet : FourthOctet;

    // Concat the octets
    const hexString = '0x' + FirstOctet + SecondOctet + ThirdOctet + FourthOctet;

    // Parse the hexString
    return Number.parseInt(hexString, 16);
  }

  ngOnInit(): any {
    this.subnetMasks = SubnetMask.getAll();
    this.selectedSubnetMask = this.subnetMasks[0];
    const subnetMask = SubnetMask.create(24);
  }
}
