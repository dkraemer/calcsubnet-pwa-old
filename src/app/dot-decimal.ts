export abstract class DotDecimal {
  protected constructor(public readonly value: number) {}

  public toHexString() :string {
    return '0x' + (this.value == 0 ? '00000000' : this.value.toString(16));
  }
}
