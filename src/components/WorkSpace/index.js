import React from 'react'
import { 
  WorkSpaceRows, 
  WorkSpaceTitle, 
  WorkSpaceWrapper, 
  HeaderWrapper, 
  AddColumnButton, 
  ButtonLabel 
} from './styles'
import Row from '../Row'

import { RefreshControl } from 'react-native'
import { AuthContext } from '../../contexts/auth'

export default function({ 
  openModalMovie, 
  openModalColumn
}) {

  const { user, getUser } = React.useContext(AuthContext);

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  function handleRefresh() {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
    getUser(user.email, true);
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
        data={user.workspace.colunas}
        renderItem={(row) => (
          <Row 
            openModalMovie={openModalMovie} 
            openModalColumn={openModalColumn}
            row={row.item} 
            key={row.item.id} 
            movies={row.item.movies}
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