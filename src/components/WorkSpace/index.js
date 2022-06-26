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
import { GenericContext } from '../../contexts/generic'
import { ScreenThemeContext } from '../../contexts/theme'
import { apiURL } from '../../utils/api'
import Loading from '../Loading'

export default function({ 
  openModalMedia, 
  openModalColumn
}) {

  const { user, getUser, workspace } = React.useContext(AuthContext);
  const { screenTheme } = React.useContext(ScreenThemeContext);
  const { setColumn } = React.useContext(GenericContext);

  const [isRefreshing, setIsRefreshing] = React.useState(false)  
  const [isLoading, setIsLoading] = React.useState(false);
  const [sections, setSections] = React.useState([]);

  React.useEffect(() => {
    if (user.email) {
      getData();
    }
  }, [user])

  function handleRefresh() {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
    getUser(user.email, true);
  }

  function getData() {
    setIsLoading(true);
    apiURL.get(`/workspaces/user/${user.id}`).then(response => {
      return response.data;
    }).then(workspace => {
      apiURL.get(`/colunas/workspace/${workspace.id}`).then(response => {
        setSections(response.data);
        return response.data;
      });
    }).finally(() => {
      setIsLoading(false);
    })
  }

  function handleOpenModalColumn() {
    setColumn({});
    openModalColumn();
  }

  function keyExtractor(item) {
    return item.id;
  }

  return (
    <WorkSpaceWrapper>

      {!sections.length > 0 && (<Loading size={'large'} fullwidth={true} />)}

      {sections.length > 0 && (
        <>
          <HeaderWrapper>
            <WorkSpaceTitle>{user.username}'s WorkSpace</WorkSpaceTitle>

            <AddColumnButton onPress={handleOpenModalColumn}>
              <ButtonLabel>+</ButtonLabel>
            </AddColumnButton>
          </HeaderWrapper>

          <WorkSpaceRows 
            data={sections}
            renderItem={(row) => (
              <Row 
                openModalMedia={openModalMedia} 
                openModalColumn={openModalColumn}
                row={row.item} 
                key={row.item.id}
              />
            )}
            keyExtractor={keyExtractor}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                tintColor={screenTheme === 'dark' ? "#fff" : '#000'}
                progressViewOffset={1}
              />
            }
          />
        </>
      )}
      
    </WorkSpaceWrapper>
  )
}