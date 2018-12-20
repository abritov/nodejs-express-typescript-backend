function binToBytes(bin: Array<number>) {
  const byteLen = 7;
  let bytes = new Uint8Array(bin.length / 8);
  for (let i = 0, byteIndex = 0; i < bin.length;) {
    for (let bitIndex = byteLen; bitIndex >= 0; bitIndex--) {
      bytes[byteIndex] |= bin[i + bitIndex] << (byteLen - bitIndex);
    }
    byteIndex++;
    i += 8;
  }
  return bytes;
}

function uint32BinEncode(x: number) {
  const binLength = 4;
  let bin = new Uint8Array(binLength);
  let buffer = new DataView(bin.buffer, 0);
  buffer.setUint32(0, x);
  return bin;
}

function byteToBits(bytes: Uint8Array) {
  let bits = Array<string>();
  for (let byte of bytes) {
    let chunk = Number(byte).toString(2);
    bits.push(chunk.padStart(8, '0'));
  }
  return bits.join('');
}

function getHiddenBits(text: string) {
  let bin = Array<number>();
  let textParts = text.split(' ');

  for (let i = 0; i < textParts.length;) {
    let bit = textParts[i + 1] == '' ? 1 : 0;
    bin.push(bit);
    if (textParts[i + 1] == '') i += 2;
    else i += 1;
  }
  return bin;
}

export function encryptInteger(text: string, int: number) {
  let payload = byteToBits(uint32BinEncode(int));
  let textParts = text.split(' ');
  let newText = Array<string>();

  for (let i = 0; i < textParts.length; i++) {
    newText.push(textParts[i]);
    if (payload[i] == '1') newText.push('');
  }

  return newText.join(' ');
}

export function decryptInteger(text: string) {
  let bin = getHiddenBits(text);
  let bytes = binToBytes(bin);
  return new DataView(bytes.buffer, 0).getUint32(0, false);
}