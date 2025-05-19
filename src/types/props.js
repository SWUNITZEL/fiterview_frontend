import PropTypes from 'prop-types';

export const AverageDataByCategoryPropType = PropTypes.objectOf(
  PropTypes.arrayOf(PropTypes.number)
);

export const PostUploadContentsPropTypes = {
  userName: PropTypes.string.isRequired,
  averageDataByCategory: AverageDataByCategoryPropType.isRequired,
};