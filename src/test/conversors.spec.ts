import { convertMegabytesToBytes } from '@/helpers/conversors';

describe('🧑‍💻 should return data in megabytes', () => {
  it('✅ should convert MB to BYTES', () => {
    expect(convertMegabytesToBytes(1)).toEqual(1000000);
    expect(convertMegabytesToBytes(10)).toEqual(10000000);
    expect(convertMegabytesToBytes(15)).toEqual(15000000);
    expect(convertMegabytesToBytes(150)).toEqual(150000000);
  });
});
