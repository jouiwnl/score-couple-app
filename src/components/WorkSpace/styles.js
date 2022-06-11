import styled from 'styled-components/native'

export const WorkSpaceWrapper = styled.View`
  margin-top: 20px;
  height: 88%;
`

export const WorkSpaceTitle = styled.Text`
  color: #fff;
  font-size: 23px;
`

export const WorkSpaceRows = styled.FlatList`
  margin-top: 10px;
`

export const HeaderWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 14px;
`

export const AddColumnButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`

export const ButtonLabel = styled.Text`
  color: #fff;
  font-size: 30px;
  font-weight: 600;
`