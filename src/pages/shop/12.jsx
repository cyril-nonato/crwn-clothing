import React from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  unsubscribeFromSnapshot = null;
  state = {
    loading: true
  }

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isFetchingCollections, isCollectionsLoaded } = this.props;

    return (
      <div className="shop-page">
        <Route exact 
          path={`${match.path}`} 
          render={(props) => 
            <CollectionsOverviewWithSpinner isLoading={isFetchingCollections} {...props} />} />
        <Route 
          path={`${match.path}/:collectionId`} 
          render={(props) => 
            <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />} />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: collectionsMap => dispatch(fetchCollectionsStartAsync(collectionsMap))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);