export const getDashboardStats = async () => {
  return Promise.resolve({
    data: {
      orders: 320,
      activeOrders: 78,
      products: 85,
      users: 960,
      admins: 6,
    },
  });
};
