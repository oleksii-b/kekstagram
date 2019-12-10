const routes = {
  images: {
    path: '/images',
    children: [
      {
        path: '?new',
        title: 'Новые',
      },
      {
        path: '?popular',
        title: 'Популярные',
      },
      {
        path: '?most-commented',
        title: 'Обсуждаемые',
      },
    ],
  },
};

export default routes;
