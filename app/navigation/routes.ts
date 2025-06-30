export default {
  root: {
    stack: 'root/stack',
  } as const,

  products: {
    stack: 'products/stack',
    list: 'products/list',
    details: 'products/details',
    entity: 'products/entity',
  } as const,
};