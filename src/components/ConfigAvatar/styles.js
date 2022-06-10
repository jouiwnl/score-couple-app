import styled from 'styled-components/native'

export const AvatarConfigWrapper = styled.View`
  width: 100%;
  margin-top: 15px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 15px;
  border-top-color: #464646;
  border-top-width: 1px;
  border-bottom-color: #464646;
  border-bottom-width: 1px;
`
export const ImageWrapper = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const AvatarImage = styled.Image`
  background: #323235;
  width: 60px;
  height: 60px;
  border-radius: 30px;
`

export const AvatarPlaceholder = styled.View`
  background: #323235;
  width: 60px;
  height: 60px;
  border-radius: 30px;
`

export const AvatarInputWrapper = styled.View`
  border: 2px solid #9D2208;
  border-radius: 10px;
  color: #fff;
  height: 50px;
  font-size: 15px;
  padding-left: 15px;
  flex: 1;
  margin-left: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const AvatarInput = styled.TextInput` 
  padding-right: 10px;
  color: #fff;
  flex: 1;
`

export const AvatarInputButton = styled.TouchableOpacity`
  margin-right: 10px;
`

export const AvatarButtonLabel = styled.Text`
  color: #9D2208;
  font-weight: 600;
  font-size: 12px;
`