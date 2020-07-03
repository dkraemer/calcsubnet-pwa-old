// Copyright (c) 2020, Daniel Kraemer
// All rights reserved.
// Licensed under BSD-3-clause (https://github.com/dkraemer/calcsubnet/blob/master/LICENSE)
import { Dumpable, IpAddress, SubnetMask } from 'calcsubnet';

export class SubnetInfo implements Dumpable {
  public readonly networkAddress: IpAddress;
  public readonly firstAddress: IpAddress;
  public readonly lastAddress: IpAddress;
  public readonly broadcastAddress: IpAddress;

  constructor(public readonly ipAddress: IpAddress, public readonly subnetMask: SubnetMask) {
    let networkAddress: number = (ipAddress.value & subnetMask.value) >>> 0;
    this.networkAddress = new IpAddress(networkAddress, true, false);

    let firstAddress: number = networkAddress + 1;
    this.firstAddress = new IpAddress(firstAddress);

    let broadcastAddress: number = (networkAddress | ~subnetMask.value) >>> 0;
    this.broadcastAddress = new IpAddress(broadcastAddress, false, true);

    let lastAddress: number = broadcastAddress - 1;
    this.lastAddress = new IpAddress(lastAddress);
  }

  public dump(): string[] {
    let retVal: string[] = [
      `ipAddress: ${this.ipAddress}`,
      `subnetMask: ${this.subnetMask}`,
      `networkAddress: ${this.networkAddress}`,
      `firstAddress: ${this.firstAddress}`,
      `lastAddress: ${this.lastAddress}`,
      `broadcastAddress: ${this.broadcastAddress}`,
    ];

    return retVal;
  }
}







// using System;
// using System.Collections.Generic;
// using System.Text;

// namespace DKrOSS.CalcSubnet {
//   public class SubnetInfo : IDumpable
//   {
//         public SubnetInfo(IpAddress ipAddress, SubnetMask subnetMask)
//     {

//       FirstAddress = NetworkAddress + 1;
//       BroadcastAddress = NetworkAddress | ~subnetMask;
//       LastAddress = BroadcastAddress - 1;
//     }




//         public static IReadOnlyList < IpAddress > IpAddressList(SubnetInfo subnetInfo)
//     {
//       return IpAddressList(subnetInfo.IpAddress, subnetInfo.SubnetMask);
//     }

//         public static IReadOnlyList < IpAddress > IpAddressList(IpAddress ipAddress, SubnetMask subnetMask)
//     {
//       var addresses = new List<IpAddress>();
//       var subnet = new SubnetInfo(ipAddress, subnetMask);

//       var currentIpAddress = subnet.NetworkAddress;

//       while (true) {
//         var isNetworkPrefix = false;
//         var isBroadcastAddress = false;

//         if (currentIpAddress.Value == subnet.NetworkAddress.Value) {
//           isNetworkPrefix = true;
//         }
//         else if (currentIpAddress.Value == subnet.BroadcastAddress.Value) {
//           isBroadcastAddress = true;
//         }

//         addresses.Add(new IpAddress(currentIpAddress, isNetworkPrefix, isBroadcastAddress));

//         if (isBroadcastAddress) {
//           break;
//         }

//         currentIpAddress++;
//       }

//       return addresses;
//     }

//         public string Dump()
//     {
//       var sb = new StringBuilder();
//       sb.AppendLine($"IP address: {IpAddress}");
//       sb.AppendLine($"Subnet mask: {SubnetMask}");
//       sb.AppendLine($"Network address: {NetworkAddress}");
//       sb.AppendLine($"First address {FirstAddress}");
//       sb.AppendLine($"Last address: {LastAddress}");
//       sb.AppendLine($"Broadcast address: {BroadcastAddress}");
//       return sb.ToString();
//     }
//   }
// }
