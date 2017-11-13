import flattenObject from './index';

it ('flattens an object structure as follows', () => {
  const result = flattenObject({
    a: 'a',
    b: {
      ba: 'ba',
      bb: 'bb',
      bc: {
        bca: 'bca'
      }
    }
  })

  expect(result['a']).toEqual('a');
  expect(result['b']).toBeUndefined();
  expect(result['b.ba']).toEqual('ba');
  expect(result['b.bc.bca']).toEqual('bca');
});