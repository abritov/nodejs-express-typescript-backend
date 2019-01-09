function binToBytes(bin: number[]) {
  const byteLen = 7;
  const bytes = new Uint8Array(bin.length / 8);
  for (let i = 0, byteIndex = 0; i < bin.length; ) {
    for (let bitIndex = byteLen; bitIndex >= 0; bitIndex--) {
      // tslint:disable-next-line:no-bitwise
      bytes[byteIndex] |= bin[i + bitIndex] << (byteLen - bitIndex);
    }
    byteIndex++;
    i += 8;
  }
  return bytes;
}

function uint32BinEncode(x: number) {
  const binLength = 4;
  const bin = new Uint8Array(binLength);
  const buffer = new DataView(bin.buffer, 0);
  buffer.setUint32(0, x);
  return bin;
}

function byteToBits(bytes: Uint8Array) {
  const bits = Array<string>();
  for (const byte of bytes) {
    const chunk = Number(byte).toString(2);
    bits.push(chunk.padStart(8, "0"));
  }
  return bits.join("");
}

function getHiddenBits(text: string) {
  const bin = Array<number>();
  const textParts = text.split(" ");

  for (let i = 0; i < textParts.length; ) {
    const bit = textParts[i + 1] === "" ? 1 : 0;
    bin.push(bit);
    if (textParts[i + 1] === "") {
      i += 2;
    } else {
      i += 1;
    }
  }
  return bin;
}

export function encryptInteger(text: string, int: number) {
  const payload = byteToBits(uint32BinEncode(int));
  const textParts = text.split(" ");
  const newText = Array<string>();

  for (let i = 0; i < textParts.length; i++) {
    newText.push(textParts[i]);
    if (payload[i] === "1") {
      newText.push("");
    }
  }

  return newText.join(" ");
}

export function decryptInteger(text: string) {
  const bin = getHiddenBits(text);
  const bytes = binToBytes(bin);
  return new DataView(bytes.buffer, 0).getUint32(0, false);
}
