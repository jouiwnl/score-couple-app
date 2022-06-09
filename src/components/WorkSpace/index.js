import React from 'react'
import { WorkSpaceRows, WorkSpaceTitle, WorkSpaceWrapper, HeaderWrapper, AddColumnButton, ButtonLabel } from './styles'
import Row from '../Row'

import { RefreshControl } from 'react-native'

export default function({ 
  rows, 
  openModalMovie, 
  openModalColumn, 
  handleSelectedMovie, 
  handleSelectedColumn, 
  onRefresh, 
  navigation, 
  navigate, 
  user 
}) {

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  function handleRefresh() {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
    onRefresh();
  }

  return (
    <WorkSpaceWrapper>
      <HeaderWrapper>
        <WorkSpaceTitle>{user.username}'s WorkSpace</WorkSpaceTitle>

        <AddColumnButton onPress={openModalColumn}>
          <ButtonLabel>+</ButtonLabel>
        </AddColumnButton>
      </HeaderWrapper>

      <WorkSpaceRows 
        data={rows}
        renderItem={(row) => (
          <Row 
            handleSelectedMovie={handleSelectedMovie}
            handleSelectedColumn={handleSelectedColumn}
            openModalMovie={openModalMovie} 
            openModalColumn={openModalColumn}
            row={row.item} 
            key={row.item.id} 
            movies={row.item.movies}
            navigation={navigation}
            navigate={navigate}
          />
        )}
        keyExtractor={() => String(Math.random())}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor="#fff"
            progressViewOffset={1}
          />
        }
      />
      
    </WorkSpaceWrapper>
  )
}