import styled from 'styled-components/native'

export const WorkSpaceWrapper = styled.View`
  margin-top: 20px;
`

export const WorkSpaceTitle = styled.Text`
  color: #fff;
  font-size: 27px;
`

export const WorkSpaceRows = styled.FlatList`
  margin-top: 30px;
  height: 84.5%;
`

export const HeaderWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 14px;
`

export const AddColumnButton = styled.TouchableOpacity`
  width: 90px;
  height: 37px;
  background-color: #9D2208;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`

export const ButtonLabel = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: 300;
`