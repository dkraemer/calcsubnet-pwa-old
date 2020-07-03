interface String {
  parseDotDecimal(): number;
}

String.prototype.parseDotDecimal = function (): number {
  let regEx = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  let regExMatches = regEx.exec(this);

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
  let hexString = '0x' + FirstOctet + SecondOctet + ThirdOctet + FourthOctet;

  // Parse the hexString
  return Number.parseInt(hexString, 16);
}
