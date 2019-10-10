import {createSelector} from 'reselect';


export const getPictuersSelector = createSelector(
  ({pictures}) => pictures,
  ({sortBy}) => sortBy,
  (pictures, sortBy) => {
    switch (sortBy) {
      case 'popular':
        return pictures.sort((prevItem, nextItem) =>
          nextItem.likes - prevItem.likes
        );
      case 'most-commented':
        return pictures.sort((prevItem, nextItem) =>
          nextItem.comments.length - prevItem.comments.length
        );
      default:
        return pictures;
    }
  }
);
